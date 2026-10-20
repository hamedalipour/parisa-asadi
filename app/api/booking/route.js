// دریافت فرم نوبت‌دهی
// POST /api/booking   { name, phone, service, date, msg }
// ذخیره در .data/bookings.json + (اختیاری) اطلاع‌رسانی ربات بله
import { NextResponse } from "next/server";
import { appendRecord, notifyOwner } from "../../lib/store";

export const runtime = "nodejs";

// تبدیل ارقام فارسی/عربی به لاتین برای اعتبارسنجی شماره
function toEnDigits(s = "") {
  return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}

export async function POST(req) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = toEnDigits(String(body.phone || "")).replace(/[\s-]/g, "");

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "نام را کامل وارد کنید." }, { status: 400 });
    }
    if (!/^0\d{10}$/.test(phone)) {
      return NextResponse.json({ ok: false, error: "شماره تماس معتبر نیست. (مثال: 09126356218)" }, { status: 400 });
    }

    const record = {
      type: "booking",
      name,
      phone,
      service: String(body.service || "").trim() || "مشخص نشده",
      date: String(body.date || "").trim() || "مشخص نشده",
      msg: String(body.msg || "").trim(),
    };

    // ذخیرهٔ نوبت (اگر ذخیره‌سازی در دسترس نباشد، ثبت نوبت نباید شکست بخورد)
    try {
      await appendRecord("bookings.json", record);
    } catch (e) {
      console.error("ذخیرهٔ نوبت ناموفق بود:", e?.message);
    }

    // اگر ربات بله تنظیم شده باشد، مدیر فوراً مطلع می‌شود
    notifyOwner(
      `🧾 درخواست نوبت جدید:\nنام: ${record.name}\nتلفن: ${record.phone}\nخدمت: ${record.service}\nتاریخ: ${record.date}\nتوضیح: ${record.msg || "—"}`
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: "خطای سرور. لطفاً دوباره تلاش کنید." }, { status: 500 });
  }
}
