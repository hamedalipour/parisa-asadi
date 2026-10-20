"use client";

import { BALE_BOOKING_URL } from "../config";

// دکمهٔ «مشاوره سریع» — کلیک → باز شدن مستقیم بله (بدون منو و بدون پنجرهٔ اضافه)
export default function QuickConsult() {
  return (
    <a href={BALE_BOOKING_URL} className="qc-trigger">
      مشاوره سریع
    </a>
  );
}
