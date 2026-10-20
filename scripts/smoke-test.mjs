// تست سریع production build — مسیرها، تصاویر و API
// استفاده: node scripts/smoke-test.mjs [baseUrl]
const BASE = process.argv[2] || "http://localhost:3000";
console.log(`هدف: ${BASE}\n`);

const ROUTES = [
  "/", "/services", "/courses", "/shop", "/about", "/blog", "/contact",
  "/blog/b1", "/blog/b2", "/blog/b3", "/blog/b4",
  "/order/result", "/robots.txt", "/sitemap.xml", "/icon.svg",
];

let pass = 0;
let fail = 0;
console.log("=== مسیرها ===");
for (const r of ROUTES) {
  try {
    const res = await fetch(BASE + r, { redirect: "manual" });
    const ok = res.status >= 200 && res.status < 400;
    console.log(`  ${ok ? "OK  " : "FAIL"} ${String(res.status).padEnd(4)} ${r}`);
    ok ? pass++ : fail++;
  } catch (e) {
    console.log(`  FAIL ERR  ${r}: ${e.message}`);
    fail++;
  }
}

console.log("\n=== API: چک‌اوت ===");
// ۱) محصول نامعتبر → باید ۴۰۰ بدهد
{
  const res = await fetch(BASE + "/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "__nope__", qty: 1 }] }),
  });
  const j = await res.json();
  const ok = res.status === 400 && j.ok === false;
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} شناسهٔ نامعتبر → ${j.error || ""}`);
  ok ? pass++ : fail++;
}

// ۲) سبد خالی → ۴۰۰
{
  const res = await fetch(BASE + "/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [] }),
  });
  const ok = res.status === 400;
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} سبد خالی`);
  ok ? pass++ : fail++;
}

// ۳) محصول واقعی (بدون ZARINPAL → حالت بله)
{
  const res = await fetch(BASE + "/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: [{ id: "n1", qty: 2 }] }),
  });
  const j = await res.json();
  const ok = res.status === 200 && j.ok === true && (j.baleUrl || j.payUrl);
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} محصول n1 → mode=${j.mode} ${j.error || ""}`);
  ok ? pass++ : fail++;
}

console.log("\n=== API: نوبت‌دهی ===");
{
  const res = await fetch(BASE + "/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "تست", phone: "09126356218", service: "پاکسازی", date: "۱۴۰۴/۰۱/۰۱" }),
  });
  const j = await res.json();
  const ok = res.status === 200 && j.ok === true;
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} ثبت نوبت`);
  ok ? pass++ : fail++;
}
{
  const res = await fetch(BASE + "/api/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "تست", phone: "123" }),
  });
  const j = await res.json();
  const ok = res.status === 400;
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} شمارهٔ نامعتبر → ${j.error || ""}`);
  ok ? pass++ : fail++;
}

console.log("\n=== callback با توکن نامعتبر → باید failed باشد ===");
{
  const res = await fetch(BASE + "/api/checkout/callback?ref=PA-FAKE&t=bogus.token&Status=OK&Authority=x", {
    redirect: "manual",
  });
  const loc = res.headers.get("location") || "";
  const ok = res.status >= 300 && res.status < 400 && loc.includes("status=failed");
  console.log(`  ${ok ? "OK  " : "FAIL"} ${res.status} → ${loc}`);
  ok ? pass++ : fail++;
}

console.log("\n=== توکن سفارش: امضا و اعتبارسنجی ===");
{
  const { createOrderToken, verifyOrderToken } = await import("../app/lib/orderToken.js");
  const token = createOrderToken({ ref: "PA-TEST", totalToman: 123400, at: Date.now() });
  const good = verifyOrderToken(token);
  const okGood = good && good.ref === "PA-TEST" && good.total === 123400;

  // دست‌کاری مبلغ → باید نامعتبر شود
  const parts = token.split(".");
  const tampered = parts[0] + "." + parts[1].slice(0, -2) + (parts[1].slice(-2) === "AA" ? "BB" : "AA");
  const bad = verifyOrderToken(tampered);

  // توکن خالی/ساختگی
  const junk = verifyOrderToken("hello.world");
  // توکن قدیمی (بیش از ۷ روز)
  const old = verifyOrderToken(createOrderToken({ ref: "PA-OLD", totalToman: 1, at: Date.now() - 8 * 24 * 3600 * 1000 }));

  const ok = okGood && !bad && !junk && !old;
  console.log(`  ${ok ? "OK  " : "FAIL"} معتبر=${!!okGood} دستکاری‌شده=${!!bad} بی‌معنا=${!!junk} منقضی=${!!old}`);
  ok ? pass++ : fail++;
}

console.log(`\nنتیجه: ${pass} موفق / ${fail} ناموفق`);
process.exit(fail > 0 ? 1 : 0);
