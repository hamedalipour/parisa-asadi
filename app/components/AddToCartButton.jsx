"use client";

// دکمه افزودن به سبد خرید (سمت کاربر، ذخیره در localStorage)
export default function AddToCartButton({ product, label = "افزودن به سبد" }) {
  const add = () => {
    const KEY = "parisa_cart_v1";
    let cart = [];
    try {
      cart = JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      cart = [];
    }
    const found = cart.find((i) => i.id === product.id);
    if (found) found.qty += 1;
    else cart.push({ ...product, qty: 1 });
    localStorage.setItem(KEY, JSON.stringify(cart));
    window.dispatchEvent(new Event("cart-updated"));
    // باز کردن پنل سبد (خود پنل به‌عنوان تأیید نمایش داده می‌شود)
    window.dispatchEvent(new Event("open-cart"));
  };

  return (
    <button className="btn" onClick={add} aria-label={`${label}: ${product.name}`}>
      {label}
    </button>
  );
}
