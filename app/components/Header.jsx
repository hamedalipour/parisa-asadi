"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import QuickConsult from "./QuickConsult";
import SocialIcons from "./SocialIcons";
import { BALE_BOOKING_URL, PHONE_FA } from "../config";

const LINKS = [
  { href: "/", label: "خانه" },
  { href: "/services", label: "خدمات پوست" },
  { href: "/courses", label: "آموزش" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/about", label: "درباره ما" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/contact", label: "تماس" },
];

// آیکون کاشی منوی موبایل
const ICONS = {
  "/": "🏠",
  "/services": "💆",
  "/courses": "🎓",
  "/shop": "🛍",
  "/about": "💎",
  "/blog": "📝",
  "/contact": "📞",
};

export default function Header({ cartCount = 0, onCartOpen }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <a
        className="topbar"
        href={BALE_BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="رزرو نوبت و مشاوره تخصصی پوست در بله"
      >
        <span className="topbar-full">
          رزرو نوبت و مشاوره تخصصی پوست | تلفن: {PHONE_FA} | ارسال رایگان خرید بالای ۵۰۰ هزار تومان
        </span>
      </a>
      <header className="site-header">
        <div className="nav-wrap">
          <Link href="/" className="logo" aria-label="پریسا اسدی — صفحه اصلی" onClick={close}>
            <span>
              پریسا اسدی
              <span className="small">پوست · زیبایی · آموزش</span>
            </span>
          </Link>

          <nav className={`main-nav ${menuOpen ? "open" : ""}`} aria-label="منوی اصلی">
            <div className="drawer-blob b1" aria-hidden="true" />
            <div className="drawer-blob b2" aria-hidden="true" />

            <div className="drawer-head">
              <span className="drawer-sign">پریسا اسدی</span>
              <span className="drawer-tag">پوست · زیبایی · آموزش</span>
            </div>

            <ul className="drawer-grid">
              {LINKS.map((l, i) => (
                <li key={l.href} style={{ "--i": i }}>
                  <Link
                    href={l.href}
                    className={`drawer-item ${pathname === l.href ? "active" : ""}`}
                    onClick={close}
                  >
                    <span className="drawer-ico" aria-hidden="true">{ICONS[l.href]}</span>
                    <span className="drawer-label">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="nav-drawer-cta">
              <SocialIcons />
            </div>
          </nav>

          <div className="nav-cta">
            <div className="nav-cta-desktop">
              <a href={BALE_BOOKING_URL} className="qc-trigger">
                رزرو نوبت
              </a>
              <QuickConsult />
              <SocialIcons className="social-desktop" />
            </div>
            <button className="cart-btn" onClick={onCartOpen} aria-label="مشاهده سبد خرید">
              🛒
              <span className="cart-count" style={{ display: cartCount ? "flex" : "none" }}>
                {cartCount}
              </span>
            </button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="باز کردن منو"
              aria-expanded={menuOpen}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
      <div className={`menu-scrim ${menuOpen ? "show" : ""}`} onClick={close} />
    </>
  );
}