import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import AddToCartButton from "@/app/components/AddToCartButton";
import { PRODUCTS } from "../data/products";
import { WEBSITE as SITE } from "../config";


export const metadata = {
  title: "فروشگاه محصولات مراقبت از پوست | محصولات اورجینال پریسا اسدی",
  description:
    "خرید محصولات اورجینال و تخصصی مراقبت از پوست شامل سرم، کرم دور چشم، ضدآفتاب و پاک‌کننده با ضمانت اصالت و ارسال سریع به سراسر ایران.",
  keywords: ["فروشگاه لوازم آرایشی", "محصولات مراقبت از پوست", "سرم صورت", "کرم دور چشم", "ضدآفتاب", "خرید آنلاین محصول پوستی"],
  alternates: { canonical: `${SITE}/shop` },
};

// قیمت‌های سایت به تومان است؛ در Schema.org واحد IRR یعنی ریال، پس ×۱۰ می‌کنیم
const productSchema = PRODUCTS.map((p) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  image: `${SITE}${p.img}`,
  description: p.desc,
  brand: { "@type": "Brand", name: p.brand || "پریسا اسدی" },
  offers: {
    "@type": "Offer",
    priceCurrency: "IRR",
    price: p.price * 10,
    availability: "https://schema.org/InStock",
    url: `${SITE}/shop`,
  },
}));

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "فروشگاه", item: `${SITE}/shop` },
  ],
};

const fa = (n) => n.toLocaleString("fa-IR");

export default function ShopPage() {
  return (
    <>
      {productSchema.map((s, i) => (
        <JsonLd key={i} data={s} />
      ))}
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="فروشگاه"
        title="محصولات مراقبت از پوست"
        subtitle="محصولات اورجینال و تخصصی با ضمانت اصالت. ارسال سریع به سراسر ایران و ارسال رایگان برای خریدهای بالای ۵۰۰ هزار تومان."
        crumbs={[{ label: "فروشگاه" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} className="card product-card" delay={(i % 3) * 80}>
                <div className="card-img">
                  <Image src={p.img} alt={p.name} width={p.w} height={p.h} sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw" />
                </div>
                <div className="card-body">
                  <span className="rating">★★★★★</span>
                  {p.brand && p.brand !== "پریسا اسدی" && (
                    <span className="tag">{p.brand}</span>
                  )}
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <div className="card-meta" style={{ justifyContent: "center" }}>
                    <span className="price">
                      {fa(p.price)} <small>تومان</small>
                      <br />
                      <del style={{ color: "#bbb", fontSize: "0.8rem", fontWeight: 400 }}>
                        {fa(p.oldPrice)}
                      </del>
                    </span>
                  </div>
                  <div style={{ marginTop: "14px" }}>
                    <AddToCartButton product={{ id: p.id, name: p.name, price: p.price, img: p.img }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="section-head" style={{ marginTop: "60px", marginBottom: "0" }}>
            <h2>چرا از فروشگاه پریسا اسدی خرید کنیم؟</h2>
            <div className="underline" />
          </div>
          <div className="features" style={{ marginTop: "40px" }}>
            <Reveal className="feature">
              <div className="icon">✅</div>
              <h4>ضمانت اصالت</h4>
              <p>همه محصولات اصلی و دارای کد رهگیری.</p>
            </Reveal>
            <Reveal className="feature" delay={80}>
              <div className="icon">🚚</div>
              <h4>ارسال سریع</h4>
              <p>ارسال به سراسر کشور با پست پیشتاز.</p>
            </Reveal>
            <Reveal className="feature" delay={160}>
              <div className="icon">🔄</div>
              <h4>بازگشت ۷ روزه</h4>
              <p>امکان مرجوع‌کردن کالا تا ۷ روز پس از خرید.</p>
            </Reveal>
            <Reveal className="feature" delay={240}>
              <div className="icon">🎁</div>
              <h4>ارسال رایگان</h4>
              <p>برای خریدهای بالای ۵۰۰ هزار تومان.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

