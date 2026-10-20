"use client";

import { useState } from "react";

// فرم نوبت‌دهی — ارسال به بک‌اند (/api/booking) و نمایش نتیجه
export default function BookingForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    try {
      const form = new FormData(e.target);
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "خطا در ثبت درخواست.");
      setSent(true);
      e.target.reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="form-box">
      <h2 style={{ marginBottom: "8px" }}>رزرو نوبت و درخواست مشاوره</h2>
      <p style={{ color: "var(--text-soft)", marginBottom: "20px" }}>
        کارشناسان ما در نخستین فرصت برای مشاوره رایگان با شما تماس می‌گیرند.
      </p>

      {sent && (
        <div className="form-msg" style={{ display: "block", background: "#e7f1e9", color: "#3c6b4a", padding: "14px", borderRadius: "12px", marginBottom: "16px" }}>
          ✅ درخواست شما با موفقیت ثبت شد! به‌زودی با شما تماس می‌گیریم.
        </div>
      )}
      {error && (
        <div style={{ background: "#fdeceb", color: "#a33", padding: "12px", borderRadius: "12px", marginBottom: "16px" }}>
          ⚠️ {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">نام و نام خانوادگی *</label>
            <input id="name" name="name" type="text" required placeholder="مثال: مریم رضایی" />
          </div>
          <div className="form-group">
            <label htmlFor="phone">شماره تماس *</label>
            <input id="phone" name="phone" type="tel" required placeholder="۰۹۱۲۶۳۵۶۲۱۸" />
          </div>
          <div className="form-group">
            <label htmlFor="service">نوع خدمت درخواستی</label>
            <select id="service" name="service">
              <option value="">انتخاب کنید...</option>
              <option>مشاوره تخصصی پوست</option>
              <option>پاک‌سازی تخصصی پوست</option>
              <option>میکروچنلینگ</option>
              <option>لایه‌برداری شیمیایی</option>
              <option>ماساژ مفصلی صورت</option>
              <option>ثبت‌نام دوره حضوری</option>
              <option>خرید دوره آنلاین</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">تاریخ پیشنهادی مراجعه</label>
            <input id="date" name="date" type="text" placeholder="مثال: شنبه ۲۰ آبان" />
          </div>
          <div className="form-group full">
            <label htmlFor="msg">توضیحات (نوع پوست، مشکل فعلی و...)</label>
            <textarea id="msg" name="msg" placeholder="اگر مشکل خاصی دارید اینجا بنویسید..." />
          </div>
          <div className="form-group full">
            <button type="submit" className="btn" style={{ width: "100%" }} disabled={sending}>
              {sending ? "در حال ارسال…" : "ثبت درخواست رزرو نوبت"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
