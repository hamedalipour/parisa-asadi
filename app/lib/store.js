// ذخیره‌سازی سفارش‌ها و نوبت‌ها — دو لایه: Redis (پایدار) یا فایل محلی
//
// نکتهٔ مهم برای سرورهای بدون فایل پایدار (مثل Vercel):
// روی Vercel پوشهٔ فایل‌سیستم فقط خواندنی است و بین درخواست‌ها پاک می‌شود.
// بنابراین این ماژول به‌صورت خودکار تشخیص می‌دهد که کجا اجرا می‌شود:
//
//  ۱) اگر متغیرهای محیطی UPSTASH_REDIS_REST_URL و UPSTASH_REDIS_REST_TOKEN تنظیم باشند
//     از Upstash Redis استفاده می‌شود (پایدار و مناسب production).
//  ۲) در غیر این صورت از فایل محلی در پوشهٔ .data/ استفاده می‌شود
//     (مناسب توسعهٔ محلی و سرور اختصاصی).
//
// فعال‌سازی Redis در Vercel:
//   vercel env add UPSTASH_REDIS_REST_URL
//   vercel env add UPSTASH_REDIS_REST_TOKEN
import fs from "fs/promises";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".data");

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const USE_REDIS = Boolean(REDIS_URL && REDIS_TOKEN);

// ---------- لایهٔ Redis (Upstash REST) ----------
//
// نکتهٔ حیاتی: در Next.js 14 (App Router) تابع fetch به‌صورت پیش‌فرض
// «force-cache» است؛ یعنی پاسخ Redis کش می‌شود و درخواست‌های بعدی همان
// دادهٔ کهنه را می‌بینند. برای ذخیره‌سازی سفارش/نوبت این فاجعه است:
// سفارش ثبت‌شده هرگز دیده نمی‌شود. بنابراین همیشه «no-store» می‌گذاریم.
async function redisCommand(command) {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

async function redisRead(name) {
  const raw = await redisCommand(["GET", `pa:${name}`]);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

async function redisWrite(name, data) {
  await redisCommand(["SET", `pa:${name}`, JSON.stringify(data)]);
}

async function redisAppend(name, record) {
  const key = `pa:${name}`;
  const raw = await redisCommand(["GET", key]);
  let list = [];
  if (raw) {
    try {
      list = JSON.parse(raw);
    } catch (e) {
      list = [];
    }
  }
  list.push(record);
  await redisCommand(["SET", key, JSON.stringify(list)]);
  return list;
}

// ---------- لایهٔ فایل محلی ----------
async function ensureDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (e) {
    // اگر ساخت پوشه ناموفق بود، خواندن/نوشتن بعدی خطای مناسب می‌دهد
  }
}

async function readJson(name, fallback = []) {
  try {
    return JSON.parse(await fs.readFile(path.join(DATA_DIR, name), "utf8"));
  } catch (e) {
    return fallback;
  }
}

async function writeJson(name, data) {
  await ensureDir();
  await fs.writeFile(path.join(DATA_DIR, name), JSON.stringify(data, null, 2), "utf8");
}

// ---------- API عمومی (یکسان برای هر دو لایه) ----------
// برای عیب‌یابی: کدام لایه فعال است؟ ("redis" یا "file")
export function storageMode() {
  return USE_REDIS ? "redis" : "file";
}

// افزودن رکورد جدید + رکوردهای قبلی را نگه می‌دارد
export async function appendRecord(file, record) {
  const entry = { ...record, at: new Date().toISOString() };
  if (USE_REDIS) {
    await redisAppend(file, entry);
    return record;
  }
  const list = await readJson(file);
  list.push(entry);
  await writeJson(file, list);
  return record;
}

export async function findRecord(file, predicate) {
  const list = USE_REDIS ? await redisRead(file) : await readJson(file);
  return list.find(predicate) || null;
}

// تعداد رکوردهای یک فایل — برای بررسی سلامت ذخیره‌سازی
export async function countRecords(file) {
  const list = USE_REDIS ? await redisRead(file) : await readJson(file);
  return Array.isArray(list) ? list.length : 0;
}

export async function updateRecord(file, predicate, patch) {
  const list = USE_REDIS ? await redisRead(file) : await readJson(file);
  const idx = list.findIndex(predicate);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch };
  if (USE_REDIS) await redisWrite(file, list);
  else await writeJson(file, list);
  return list[idx];
}

// ارسال پیام به مدیر از طریق ربات بله (اختیاری — اگر BALE_BOT_TOKEN ست شده باشد)
export async function notifyOwner(text) {
  const token = process.env.BALE_BOT_TOKEN;
  const chatId = process.env.BALE_CHAT_ID;
  if (!token || !chatId) return false;
  try {
    const res = await fetch(`https://tapi.bale.ai/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      cache: "no-store",
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}
