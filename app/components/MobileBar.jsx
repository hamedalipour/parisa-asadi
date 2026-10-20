"use client";

import Link from "next/link";
import { BALE_BOOKING_URL, INSTAGRAM_URL, PHONE_TEL } from "../config";

// نشان اینستاگرام (کوچک)
const InstaGlyph = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
    <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.25.07 1.65.07 4.85s0 3.6-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.41-1.25.06-1.65.07-4.85.07s-3.6 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.4 2.2 8.8 2.2 12 2.2zm0 1.76c-3.14 0-3.5.01-4.74.07-1.06.05-1.64.23-2.02.38-.5.19-.86.42-1.24.8-.38.38-.61.74-.8 1.24-.15.38-.33.96-.38 2.02-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.06.23 1.64.38 2.02.19.5.42.86.8 1.24.38.38.74.61 1.24.8.38.15.96.33 2.02.38 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.06-.05 1.64-.23 2.02-.38.5-.19.86-.42 1.24-.8.38-.38.61-.74.8-1.24.15-.38.33-.96.38-2.02.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.06-.23-1.64-.38-2.02a3.3 3.3 0 0 0-.8-1.24 3.3 3.3 0 0 0-1.24-.8c-.38-.15-.96-.33-2.02-.38-1.24-.06-1.6-.07-4.74-.07zM12 6.87A5.13 5.13 0 1 1 12 17.13 5.13 5.13 0 0 1 12 6.87zm0 8.46a3.33 3.33 0 1 0 0-6.66 3.33 3.33 0 0 0 0 6.66zm6.54-8.67a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" />
  </svg>
);

// کیسهٔ خرید سفید بزرگ (تکی)
const WhiteBag = () => (
  <svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6.3 7.5h11.4l-.95 12.4a1.9 1.9 0 0 1-1.9 1.75H9.15a1.9 1.9 0 0 1-1.9-1.75L6.3 7.5z" />
    <path d="M9 9.5V6.7a3 3 0 0 1 6 0v2.8" />
  </svg>
);

// نوار چسبان پایین همهٔ صفحات موبایل — همهٔ دکمه‌ها هم‌اندازه
export default function MobileBar() {
  return (
    <div className="mobile-bar" role="navigation" aria-label="عملیات سریع">
      <Link href="/shop" className="mb-btn mb-shop" aria-label="فروشگاه مراقبت از پوست">
        <WhiteBag />
        <span className="lbl">مراقبت از پوست</span>
      </Link>

      <Link href="/courses" className="mb-btn mb-course">
        <span className="ico" aria-hidden="true">🎓</span>
        آموزش
      </Link>

      <a href={BALE_BOOKING_URL} className="mb-btn mb-book" aria-label="رزرو نوبت در بله">
        <span className="ico" aria-hidden="true">🗓</span>
        رزرو نوبت
      </a>
      <a href={PHONE_TEL} className="mb-btn mb-bale" aria-label="تماس تلفنی مشاوره فوری">
        <span className="ico" aria-hidden="true">📞</span>
        مشاوره فوری
      </a>

      <a href={INSTAGRAM_URL} className="mb-btn mb-insta" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام پریسا اسدی">
        <InstaGlyph />
        اینستا
      </a>
    </div>
  );
}
