// توکن سفارش امضاشده (HMAC-SHA256) — نیازی به دیتابیس ندارد
//
// مشکل: در سرورهای بدون فایل پایدار (Vercel) وضعیت سفارش بین درخواست
// «ثبت سفارش» و «بازگشت از درگاه پرداخت» از بین می‌رود و کاربر پول می‌دهد
// اما سفارشش «پرداخت‌نشده» باقی می‌ماند.
//
// راه‌حل: اطلاعات لازم سفارش (شناسه، مبلغ، زمان) داخل خود توکن قرار می‌گیرد
// و با کلید محرمانه امضا می‌شود. در callback، امضا دوباره بررسی می‌شود؛
// اگر معتبر بود، مبلغ از توکن خوانده و برای تأیید به زرین‌پال فرستاده می‌شود.
//
// کلید امضا: ZARINPAL_MERCHANT_ID در اولویت است (چون برای درگاه لازم است)،
// در غیر این صورت ORDER_SECRET و در نهایت یک مقدار پیش‌فرض.
import crypto from "crypto";

function secretKey() {
  return (
    process.env.ORDER_SECRET ||
    process.env.ZARINPAL_MERCHANT_ID ||
    "parisa-asadi-dev-secret-change-in-production"
  );
}

function b64url(buf) {
  return Buffer.from(buf).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str) {
  const s = str.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(s + "=".repeat((4 - (s.length % 4)) % 4), "base64");
}

function sign(payloadB64) {
  return b64url(crypto.createHmac("sha256", secretKey()).update(payloadB64).digest());
}

// ساخت توکن: base64url(payload).base64url(signature)
// payload = JSON.stringify({ ref, total, at })
export function createOrderToken(order) {
  const payload = b64url(
    Buffer.from(
      JSON.stringify({ ref: order.ref, total: order.totalToman, at: order.at || Date.now() }),
      "utf8"
    )
  );
  return `${payload}.${sign(payload)}`;
}

// بررسی توکن و برگرداندن payload یا null
export function verifyOrderToken(token) {
  if (!token || typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;

  const expected = sign(payload);
  // مقایسهٔ مقاوم در برابر حملهٔ زمانی
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const data = JSON.parse(b64urlDecode(payload).toString("utf8"));
    if (!data || typeof data.ref !== "string" || typeof data.total !== "number") return null;
    // توکن‌های قدیمی‌تر از ۷ روز نامعتبرند
    if (!data.at || Date.now() - data.at > 7 * 24 * 60 * 60 * 1000) return null;
    return data;
  } catch (e) {
    return null;
  }
}
