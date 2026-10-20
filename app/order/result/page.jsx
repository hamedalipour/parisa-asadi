"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PHONE_FA } from "../../config";

const fa = (n) => Number(n).toLocaleString("fa-IR");

function ResultInner() {
  const sp = useSearchParams();
  const status = sp.get("status");
  const ref = sp.get("ref") || "—";
  const refId = sp.get("refid") || "—";
  const amount = sp.get("amount");

  const success = status === "success";

  return (
    <section className="section">
      <div className="container">
        <div className="section-head" style={{ marginBottom: "30px" }}>
          <div className="eyebrow">وضعیت سفارش</div>
          <h2>
            {success ? <>پرداخت با <em>موفقیت</em> انجام شد</> : <>پرداخت <em>ناموفق</em> بود</>}
          </h2>
          <div className="underline" />
        </div>

        <div className="card" style={{ maxWidth: "560px", margin: "0 auto", padding: "28px" }}>
          <div style={{ fontSize: "3rem", textAlign: "center", marginBottom: "12px" }}>
            {success ? "🎉" : "😔"}
          </div>
          {success ? (
            <p style={{ textAlign: "center", color: "var(--text-soft)", lineHeight: 2 }}>
              سفارش شما با موفقیت ثبت و پرداخت شد. همکاران ما برای هماهنگی ارسال تماس می‌گیرند.
            </p>
          ) : (
            <p style={{ textAlign: "center", color: "var(--text-soft)", lineHeight: 2 }}>
              پرداخت انجام نشد یا کنسل شد. اشکالی ندارد — می‌توانید دوباره تلاش کنید یا با شماره {PHONE_FA} هماهنگ کنید.
            </p>
          )}

          <ul className="check-list" style={{ marginTop: "16px" }}>
            <li>کد سفارش: {ref}</li>
            {refId !== "—" && <li>کد پیگیری بانکی: {refId}</li>}
            {amount && <li>مبلغ: {fa(amount)} تومان</li>}
          </ul>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
            <Link href="/shop" className="btn">بازگشت به فروشگاه</Link>
            <Link href="/contact" className="btn btn-outline">تماس با ما</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Suspense لازم است چون useSearchParams در کامپوننت کلاینتی است
export default function OrderResultPage() {
  return (
    <Suspense fallback={<section className="section"><div className="container">در حال بررسی…</div></section>}>
      <ResultInner />
    </Suspense>
  );
}
