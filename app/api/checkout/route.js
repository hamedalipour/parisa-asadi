// ایجاد سفارش و اتصال به درگاه پرداخت زرین‌پال
// POST /api/checkout   { items: [{ id, qty }] }
// قیمت‌ها فقط از لیست محصولات سمت سرور خوانده می‌شود (قیمت ارسالی از کاربر قابل اعتماد نیست)
// اگر ZARINPAL_MERCHANT_ID تنظیم نشده باشد، به‌جای درگاه، لینک سفارش در «بله» برمی‌گردد
import { NextResponse } from "next/server";
import { productById } from "../../data/products";
import { appendRecord, notifyOwner, storageMode } from "../../lib/store";
import { createOrderToken } from "../../lib/orderToken";
import { BALE_BOOKING_URL, PHONE_LOCAL } from "../../config";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { items } = await req.json();
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ ok: false, error: "سبد خرید خالی است." }, { status: 400 });
    }

    // محاسبهٔ قیمت سمت سرور از شناسه محصول
    const lines = [];
    for (const it of items) {
      const p = productById[it?.id];
      const qty = Math.min(Math.max(parseInt(it?.qty, 10) || 0, 1), 99);
      if (!p) {
        return NextResponse.json({ ok: false, error: `محصول با شناسه «${it?.id}» یافت نشد.` }, { status: 400 });
      }
      lines.push({ id: p.id, name: p.name, price: p.price, qty });
    }

    const totalToman = lines.reduce((s, l) => s + l.price * l.qty, 0);

    // بدون merchant_id زرین‌پال → ثبت سفارش به‌روش پیام بله (رفتار فعلی)
    const merchantId = process.env.ZARINPAL_MERCHANT_ID;
    if (!merchantId) {
      const text = encodeURIComponent(
        "سلام! سفارش محصولات:\n" +
          lines.map((l) => `• ${l.name} × ${l.qty}`).join("\n") +
          `\nجمع کل: ${totalToman.toLocaleString("fa-IR")} تومان`
      );
      return NextResponse.json({
        ok: true,
        mode: "bale",
        baleUrl: `https://ble.ir/${PHONE_LOCAL}?text=${text}`,
      });
    }

    // ثبت سفارش به‌صورت پیش‌نویس و درخواست پرداخت از زرین‌پال
    const orderRef = "PA-" + Date.now().toString(36).toUpperCase();
    const now = Date.now();
    const token = createOrderToken({ ref: orderRef, totalToman, at: now });

    // ذخیرهٔ سفارش (اگر ذخیره‌سازی در دسترس نباشد، پرداخت با توکن هم قابل تأیید است)
    try {
      await appendRecord("orders.json", {
        ref: orderRef,
        items: lines,
        totalToman,
        status: "pending",
      });
    } catch (e) {
      console.error("ذخیرهٔ سفارش ناموفق بود (ادامه با توکن):", e?.message);
    }

    const description = `سفارش ${orderRef} — کلینیک پوست پریسا اسدی`;
    const amountRial = totalToman * 10; // زرین‌پال به ریال
    const res = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: merchantId,
        amount: amountRial,
        description: description,
        callback_url: `${new URL(req.url).origin}/api/checkout/callback?ref=${orderRef}&t=${encodeURIComponent(token)}`,
      }),
    });
    const data = await res.json();
    const auth = data?.data?.authority;
    const code = data?.data?.code;
    if (!auth || ![100, 101].includes(code)) {
      return NextResponse.json({ ok: false, error: "خطا در برقراری ارتباط با درگاه پرداخت." }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      mode: "zarinpal",
      payUrl: `https://www.zarinpal.com/pg/StartPay/${auth}`,
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "خطای سرور در ثبت سفارش." }, { status: 500 });
  }
}
