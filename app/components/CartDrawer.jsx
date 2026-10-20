"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PHONE_LOCAL } from "../config";

const CART_KEY = "parisa_cart_v1";
// خواندن اولیه سبد از localStorage
function readCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch (e) {
    return [];
  }
}

const faNum = (n) => n.toLocaleString("fa-IR");

export default function CartDrawer({ open, onClose, onCountChange }) {
  const [items, setItems] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // هنگام باز شدن پنل، سبد را تازه کن
  useEffect(() => {
    if (open) setItems(readCart());
    setHydrated(true);
  }, [open]);

  const save = (next) => {
    localStorage.setItem(CART_KEY, JSON.stringify(next));
    setItems(next);
    onCountChange(next.reduce((s, i) => s + i.qty, 0));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const changeQty = (id, delta) => {
    const next = items
      .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
      .filter((i) => i.qty > 0);
    save(next);
  };

  const removeItem = (id) => save(items.filter((i) => i.id !== id));

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  // ثبت سفارش: قیمت همه چیز سمت سرور دوباره محاسبه می‌شود
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  const checkout = async () => {
    if (items.length === 0 || checkingOut) return;
    setCheckingOut(true);
    setCheckoutError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: items.map((i) => ({ id: i.id, qty: i.qty })) }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "خطا در ثبت سفارش.");
      // درگاه زرین‌پال یا سفارش پیامکی بله
      window.location.href = data.payUrl || data.baleUrl;
      return;
    } catch (e) {
      setCheckoutError(e.message + " — در صورت تکرار می‌توانید سفارش را از طریق «مشاوره سریع» بفرستید.");
      setCheckingOut(false);
    }
  };

  if (!hydrated) return null;

  return (
    <>
      <div className={`cart-overlay ${open ? "show" : ""}`} onClick={onClose} />
      <aside className={`cart-panel ${open ? "show" : ""}`} aria-label="سبد خرید">
        <div className="cart-head">
          <h3>🛍 سبد خرید شما</h3>
          <button className="cart-close" onClick={onClose} aria-label="بستن">
            ×
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              سبد خرید شما خالی است.
              <br />
              محصولات مورد علاقه‌تان را از فروشگاه اضافه کنید. 🌿
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={item.id}>
                <span className="thumb">
                  <Image src={item.img} alt={item.name} width={64} height={64} sizes="64px" />
                </span>
                <div className="info">
                  <h4>{item.name}</h4>
                  <span className="p">{faNum(item.price)} تومان</span>
                </div>
                <div className="qty">
                  <button onClick={() => changeQty(item.id, -1)} aria-label="کاهش">−</button>
                  <span>{faNum(item.qty)}</span>
                  <button onClick={() => changeQty(item.id, 1)} aria-label="افزایش">+</button>
                </div>
                <button className="remove-line" onClick={() => removeItem(item.id)} aria-label="حذف">
                  🗑
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-total">
            <span>جمع کل:</span>
            <span className="val">{faNum(total)} تومان</span>
          </div>
          <button
            className="btn"
            style={{ width: "100%" }}
            disabled={items.length === 0 || checkingOut}
            onClick={checkout}
          >
            {checkingOut ? "در حال انتقال به درگاه…" : "ثبت سفارش و پرداخت"}
          </button>
          {checkoutError && (
            <p style={{ color: "#a33", fontSize: "0.85rem", marginTop: "8px", textAlign: "center" }}>
              {checkoutError}
            </p>
          )}
        </div>
      </aside>
    </>
  );
}
