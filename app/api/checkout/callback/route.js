// بازگشت از درگاه زرین‌پال و تأیید پرداخت
// GET /api/checkout/callback?ref=PA-xxxx&t=<token>&Authority=xxxx&Status=OK|NOK
//
// نکته: برای اینکه پرداخت در سرورهای بدون فایل پایدار (Vercel) هم درست تأیید شود،
// مبلغ سفارش از «توکن امضاشده» خوانده می‌شود نه از فایل/دیتابیس.
// اگر توکن نامعتبر باشد، سفارش ناموفق علامت می‌خورد (پرداخت تأییدنشده باقی نمی‌ماند).
import { NextResponse } from "next/server";
import { findRecord, updateRecord, notifyOwner } from "../../../lib/store";
import { verifyOrderToken } from "../../../lib/orderToken";

export const runtime = "nodejs";

export async function GET(req) {
  const url = new URL(req.url);
  const ref = url.searchParams.get("ref") || "";
  const token = url.searchParams.get("t") || "";
  const authority = url.searchParams.get("Authority") || "";
  const status = url.searchParams.get("Status");

  // اعتبارسنجی توکن — منبع اصلی مبلغ سفارش
  const payload = verifyOrderToken(token);
  if (!payload || payload.ref !== ref) {
    return NextResponse.redirect(
      new URL(`/order/result?status=failed&ref=${encodeURIComponent(ref)}`, url.origin)
    );
  }

  // اگر سفارش در ذخیره‌سازی موجود است، وضعیتش را هم به‌روز می‌کنیم (اختیاری)
  const order = await findRecord("orders.json", (o) => o.ref === ref).catch(() => null);

  // کاربر پرداخت را کنسل کرده یا سفارش پیدا نشد
  if (status !== "OK" || !authority) {
    if (order) {
      await updateRecord("orders.json", (o) => o.ref === ref, { status: "failed" }).catch(() => null);
    }
    return NextResponse.redirect(
      new URL(`/order/result?status=failed&ref=${encodeURIComponent(ref)}`, url.origin)
    );
  }

  const totalToman = payload.total;

  // تأیید پرداخت با مبلغ ثبت‌شده در توکن امضاشده
  try {
    const res = await fetch("https://api.zarinpal.com/pg/v4/payment/verify.json", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        merchant_id: process.env.ZARINPAL_MERCHANT_ID,
        amount: totalToman * 10, // ریال
        authority,
      }),
      cache: "no-store",
    });
    const data = await res.json();
    const code = data?.data?.code;
    // 100 = تأیید موفق، 101 = قبلاً تأیید شده (به‌عنوان موفق در نظر می‌گیریم)
    if (code === 100 || code === 101) {
      const refId = data?.data?.ref_id || authority;
      await updateRecord("orders.json", (o) => o.ref === ref, { status: "paid", refId, authority }).catch(
        () => null
      );
      const itemsText = order?.items?.length
        ? order.items.map((l) => `• ${l.name} × ${l.qty}`).join("\n")
        : "—";
      notifyOwner(
        `✅ پرداخت موفق\nسفارش: ${ref}\nمبلغ: ${totalToman.toLocaleString("fa-IR")} تومان\nکد پیگیری: ${refId}\nموارد:\n${itemsText}`
      );
      return NextResponse.redirect(
        new URL(
          `/order/result?status=success&ref=${encodeURIComponent(ref)}&amount=${totalToman}&refid=${encodeURIComponent(refId)}`,
          url.origin
        )
      );
    }
  } catch (e) {
    // خطای شبکه — پایین‌تر به‌عنوان ناموفق هندل می‌شود
  }

  await updateRecord("orders.json", (o) => o.ref === ref, { status: "failed", authority }).catch(() => null);
  return NextResponse.redirect(
    new URL(`/order/result?status=failed&ref=${encodeURIComponent(ref)}`, url.origin)
  );
}
