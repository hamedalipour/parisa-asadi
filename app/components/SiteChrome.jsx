"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import CartDrawer from "./CartDrawer";
import MobileBar from "./MobileBar";

const CART_KEY = "parisa_cart_v1";

// پل کلاینتی: وضعیت سبد خرید را بین هدر و پنل سبد هم‌سان‌سازی می‌کند
export default function SiteChrome({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        setCartCount(cart.reduce((s, i) => s + i.qty, 0));
      } catch (e) {
        setCartCount(0);
      }
    };
    const openCart = () => setCartOpen(true);
    update();
    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);
    window.addEventListener("open-cart", openCart);
    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
      window.removeEventListener("open-cart", openCart);
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">رفتن به محتوای اصلی</a>
      <Header cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <main id="main">{children}</main>
      <MobileBar />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} onCountChange={setCartCount} />
    </>
  );
}
