// بهینه‌سازی تصاویر public/img — تبدیل به WebP + به‌روزرسانی خودکار ارجاع‌ها در کد
// اجرا: node scripts/optimize-images.mjs
// گزینه‌ها: --prune  (حذف فایل‌های بلااستفاده)  --dry  (فقط گزارش، بدون تغییر)
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, "public", "img");
const APP_DIR = path.join(ROOT, "app");
const PRUNE = process.argv.includes("--prune");
const DRY = process.argv.includes("--dry");

// حداکثر عرض تصاویر محصول (کارت فروشگاه) و تصاویر محتوایی (هیرو/بلاگ)
const MAX_PRODUCT = 1000;
const MAX_CONTENT = 1600;

// ---------- ۱) جمع‌آوری ارجاع‌های تصویر از کل کد اپ ----------
async function walk(dir, acc = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, acc);
    else if (/\.(js|jsx|mjs)$/.test(e.name)) acc.push(p);
  }
  return acc;
}

const codeFiles = await walk(APP_DIR);
const refMap = new Map(); // نام فایل -> تعداد ارجاع
for (const f of codeFiles) {
  const t = await fs.readFile(f, "utf8");
  for (const m of t.matchAll(/\/img\/([^"'\s)]+)/g)) {
    const n = m[1];
    refMap.set(n, (refMap.get(n) || 0) + 1);
  }
}

// ---------- ۲) فهرست فایل‌های موجود ----------
const allFiles = await fs.readdir(IMG_DIR);
const images = allFiles.filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
const referenced = new Set(refMap.keys());
const unused = images.filter((f) => !referenced.has(f));

console.log(`تصاویر موجود: ${images.length} | ارجاع‌شده: ${images.length - unused.length} | بلااستفاده: ${unused.length}\n`);

if (unused.length) {
  console.log("فایل‌های بلااستفاده:");
  for (const f of unused) {
    const st = await fs.stat(path.join(IMG_DIR, f));
    console.log(`  ${f}  (${(st.size / 1024).toFixed(0)} KB)`);
  }
  console.log("");
}

// ---------- ۳) تبدیل به WebP ----------
const renameMap = new Map(); // نام قدیمی -> نام جدید
let before = 0;
let after = 0;
let changed = 0;

for (const f of images) {
  if (unused.includes(f)) continue; // تکلیف به پاکسازی بعدی
  const src = path.join(IMG_DIR, f);
  const st = await fs.stat(src);
  const ext = path.extname(f).toLowerCase();
  const base = path.basename(f, ext);

  // تصاویر محصول = نام‌های کوتاه لاتین (بدون پسوند تاریخ/استوک)
  const isProduct = /^[a-z0-9]+(-[a-z0-9]+)*$/.test(base);
  const maxW = isProduct ? MAX_PRODUCT : MAX_CONTENT;

  try {
    const buf = await fs.readFile(src);
    const img = sharp(buf, { failOn: "none" });
    const meta = await img.metadata();

    // اگر قبلاً webp است و کوچک و به‌اندازهٔ لازم است، دست نمی‌زنیم
    if (ext === ".webp" && buf.length < 150 * 1024 && (meta.width || 0) <= maxW) {
      before += buf.length;
      after += buf.length;
      continue;
    }

    const outName = base + ".webp";
    const pipeline = sharp(buf, { failOn: "none" })
      .rotate()
      .resize({ width: maxW, withoutEnlargement: true });
    pipeline.webp({ quality: isProduct ? 80 : 78, effort: 5, alphaQuality: 90 });
    const out = await pipeline.toBuffer();

    before += buf.length;
    after += out.length;

    if (out.length >= buf.length && ext === ".webp") {
      console.log(`  keep ${outName.padEnd(46)} ${(buf.length / 1024).toFixed(0).padStart(5)} KB`);
      continue;
    }

    changed++;
    renameMap.set(f, outName);
    const pct = Math.round((1 - out.length / buf.length) * 100);
    console.log(
      `  opt  ${f.padEnd(46)} ${(buf.length / 1024).toFixed(0).padStart(5)} KB -> ${(out.length / 1024).toFixed(0).padStart(4)} KB  (${pct}%)`
    );

    if (!DRY) {
      await fs.writeFile(path.join(IMG_DIR, outName), out);
      if (ext !== ".webp") await fs.unlink(src);
    }
  } catch (e) {
    console.log(`  FAIL ${f}: ${e.message}`);
    before += st.size;
    after += st.size;
  }
}

// ---------- ۴) به‌روزرسانی ارجاع‌ها در کد ----------
let touched = 0;
for (const f of codeFiles) {
  const t = await fs.readFile(f, "utf8");
  let nt = t;
  for (const [oldName, newName] of renameMap) {
    const re = new RegExp("/img/" + oldName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    nt = nt.replace(re, "/img/" + newName);
  }
  if (nt !== t) {
    touched++;
    if (!DRY) await fs.writeFile(f, nt, "utf8");
    console.log(`  refs updated: ${path.relative(ROOT, f)}`);
  }
}

// ---------- ۵) حذف فایل‌های بلااستفاده (اختیاری) ----------
if (PRUNE && !DRY) {
  for (const f of unused) {
    await fs.unlink(path.join(IMG_DIR, f));
  }
  console.log(`\nحذف ${unused.length} فایل بلااستفاده.`);
}

// ---------- گزارش ----------
console.log(`\nتغییر کردند   : ${changed} فایل`);
console.log(`فایل‌های کد   : ${touched} فایل به‌روزرسانی شد`);
console.log(`حجم قبل      : ${(before / 1024 / 1024).toFixed(1)} MB`);
console.log(`حجم بعد      : ${(after / 1024 / 1024).toFixed(1)} MB`);
if (before > 0) {
  console.log(`صرفه‌جویی     : ${((before - after) / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - after / before) * 100)}%)`);
}
