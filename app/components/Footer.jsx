import Link from "next/link";
import {
  PHONE_FA,
  ADDRESS_FA,
} from "../config";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="logo">
              <span>پریسا اسدی</span>
            </Link>
            <p>
              کلینیک تخصصی فیشیال پوست «پریسا اسدی»؛ ارائه خدمات تخصصی پوست، فروشگاه محصولات
              اورجینال و آموزش حرفه‌ای فیشیال به‌صورت حضوری و آنلاین (ضبط‌شده) با هدف رسیدن به پوستی
              سالم و درخشان.
            </p>
            <SocialIcons className="social-footer" />
          </div>

          <div>
            <h4>دسترسی سریع</h4>
            <ul className="footer-links">
              <li><Link href="/">خانه</Link></li>
              <li><Link href="/services">خدمات فیشیال پوست</Link></li>
              <li><Link href="/courses">آموزش حضوری و آنلاین</Link></li>
              <li><Link href="/shop">فروشگاه محصولات</Link></li>
              <li><Link href="/blog">وبلاگ</Link></li>
              <li><Link href="/contact">تماس و نوبت‌دهی</Link></li>
            </ul>
          </div>

          <div>
            <h4>خدمات محبوب</h4>
            <ul className="footer-links">
              <li><Link href="/services">پاک‌سازی تخصصی پوست</Link></li>
              <li><Link href="/services">فیشیال سیگنیچر</Link></li>
              <li><Link href="/services">میکروچنلینگ</Link></li>
              <li><Link href="/services">ماساژ مفصلی صورت</Link></li>
              <li><Link href="/services">لایه‌برداری شیمیایی</Link></li>
            </ul>
          </div>

          <div>
            <h4>تماس با ما</h4>
            <ul className="footer-contact">
              <li>📍 {ADDRESS_FA}</li>
              <li>📞 {PHONE_FA}</li>
              <li>✉️ info@parisa-asadi.ir</li>
              <li>🕘 شنبه تا پنجشنبه، ۱۰ تا ۲۰</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="copyright">
        © <span className="year">{new Intl.NumberFormat("fa-IR").format(new Date().getFullYear())}</span> تمامی حقوق برای کلینیک پوست «پریسا اسدی» محفوظ است. |
        طراحی و توسعه با ❤️
      </div>
    </footer>
  );
}
