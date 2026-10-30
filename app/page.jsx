import Link from "next/link";
import Image, { getImageProps } from "next/image";
import Reveal from "./components/Reveal";
import JsonLd from "./components/JsonLd";
import AddToCartButton from "./components/AddToCartButton";
import { PHONE_FA, ADDRESS_FA, BALE_BOOKING_URL, PHONE_TEL, WEBSITE as SITE } from "./config";
import { productById } from "./data/products";

export const metadata = {
  title: "پریسا اسدی | خدمات فیشیال پوست، فروشگاه محصولات و آموزش تخصصی",
  description:
    "کلینیک تخصصی فیشیال پوست پریسا اسدی؛ پاک‌سازی پوست، میکروچنلینگ، لایه‌برداری شیمیایی، فروشگاه محصولات اورجینال مراقبت از پوست و آموزش فیشیال حضوری و آنلاین (ضبط‌شده). رزرو نوبت آنلاین.",
  alternates: { canonical: SITE },
};

// داده ساخت‌یافته سطح سایت (سئو) — نسخهٔ کامل در layout.jsx تعریف شده است
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "هزینه فیشیال پوست چقدر است؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "هزینه فیشیال پوست در کلینیک پریسا اسدی بسته به نوع خدمت و شرایط پوست شما متفاوت است و پس از مشاوره تخصصی اعلام می‌شود. برای مشاهده نرخ به صفحه خدمات مراجعه کنید.",
      },
    },
    {
      "@type": "Question",
      name: "آیا دوره‌های آموزشی آنلاین یا ضبط‌شده دارید؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "بله. ما هم دوره‌های حضوری و هم دوره‌های آنلاین (ضبط‌شده) به زبان فارسی داریم که در هر زمان و مکان قابل مشاهده هستند و همراه با پشتیبانی مدرس ارائه می‌شوند.",
      },
    },
    {
      "@type": "Question",
      name: "برای رزرو نوبت چه کنم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: `از طریق صفحه تماس و نوبت‌دهی فرم را پر کنید یا با شماره ${PHONE_FA} تماس بگیرید. کارشناسان ما برای مشاوره رایگان با شما تماس می‌گیرند.`,
      },
    },
  ],
};

const SERVICES = [
  {
    img: "/img/deep-cleansing-facial-los-angeles-esthetics-la.webp",
    w: 1076, h: 1076,
    title: "پاک‌سازی تخصصی پوست",
    desc: "پاک‌سازی عمیق منافذ، حذف جوش سرسیه و جوان‌سازی سلول‌های مرده برای پوستی شفاف و سالم.",
    price: "از ۸۵۰,۰۰۰ تومان",
  },
  {
    img: "/img/microchanneling-facial-los-angeles-esthetics-los-angeles.webp",
    w: 1125, h: 1500,
    title: "میکروچنلینگ و رفع چین و چروک",
    desc: "تحریک تولید کلاژن با روش میکروچنلینگ برای رفع خطوط خنده و بهبود بافت پوست.",
    price: "از ۲,۴۰۰,۰۰۰ تومان",
  },
  {
    img: "/img/chemical-peel-facial-los-angeles-esthetics-la.webp",
    w: 896, h: 1200,
    title: "لایه‌برداری شیمیایی (پیلینگ)",
    desc: "رفع لک و پفیدگی پوست با پیلینگ تخصصی شیمیایی، تحت نظر اپراتور مجرب.",
    price: "از ۱,۲۰۰,۰۰۰ تومان",
  },
];

// پرفروش‌ها — از منبع واحد محصولات با ترتیب ویژهٔ صفحهٔ اصلی
// پرفروش‌ها — از منبع واحد محصولات با ترکیبی متنوع از برندها
const PRODUCTS = ["p1", "p7", "p8", "p9", "p10", "n6", "n13", "n27"].map((id) => productById[id]).filter(Boolean);

// داده ساخت‌یافته محصولات پرفروش صفحهٔ اصلی (سئو)
// قیمت سایت به تومان است؛ در Schema.org واحد IRR یعنی ریال، پس ×۱۰ می‌کنیم
const productsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "پرفروش‌ترین محصولات مراقبت از پوست",
  itemListElement: PRODUCTS.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
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
    },
  })),
};

// بنر هیرو: نسخهٔ عریض برای دسکتاپ، نسخهٔ مربع برای موبایل (art direction)
const HERO_ALT = "بنر کلینیک فیشیال پوست پریسا اسدی — مراقبت حرفه‌ای از پوست";

const heroDesktopSrcSet = getImageProps({
  src: "/img/banner-desktop.png",
  width: 1672,
  height: 941,
  alt: HERO_ALT,
  sizes: "100vw",
  priority: true,
}).props.srcSet;

const {
  props: { srcSet: heroMobileSrcSet, ...heroMobileProps },
} = getImageProps({
  src: "/img/bannerjadid.png",
  width: 1254,
  height: 1254,
  alt: HERO_ALT,
  sizes: "100vw",
  priority: true,
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={productsSchema} />
      <JsonLd data={faqSchema} />

      <section className="signature-band">
        <div className="sig">Parisa Asadi</div>
        <p className="tagline">پوستی سالم ، زندگی درخشان</p>
        <div className="divider" />
      </section>

      <section className="hero">
        <picture>
          <source media="(min-width: 769px)" srcSet={heroDesktopSrcSet} />
          <img {...heroMobileProps} srcSet={heroMobileSrcSet} />
        </picture>
        <div className="hero-overlay">
          <div className="hero-top">
            <h1>پوستی سالم و درخشان را با پریسا اسدی تجربه کنید</h1>
            <p>مرکز تخصصی فیشیال پوست، فروشگاه محصولات اورجینال و آموزش حرفه‌ای — همه در یک نقطه.</p>
          </div>
          <div className="hero-cta-row">
            <a href={BALE_BOOKING_URL} className="btn btn-gold hero-cta">
              🗓 رزرو نوبت مشاوره رایگان
            </a>
            <a href={PHONE_TEL} className="btn btn-outline hero-cta-consult" aria-label="تماس تلفنی مشاوره فوری">
              📞 مشاوره فوری
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="trio">
            <Reveal className="trio-card">
              <Link href="/contact" aria-label="رزرو نوبت فیشیال پوست">
                <div className="trio-img">
                  <Image src="/img/engin-akyurt-g-m8EDc4X6Q-unsplash.webp" alt="رزرو نوبت فیشیال پوست در کلینیک پریسا اسدی" width={6048} height={4032} />
                </div>
                <h3>رزرو نوبت فیشیال</h3>
              </Link>
              <p>نوبت مشاوره و خدمات تخصصی پوست را آنلاین رزرو کنید.</p>
              <Link href="/contact" className="btn btn-outline">رزرو نوبت</Link>
            </Reveal>

            <Reveal className="trio-card" delay={100}>
              <Link href="/shop" aria-label="فروشگاه محصولات پوستی">
                <div className="trio-img">
                  <Image src="/img/IMG_1102.webp" alt="فروشگاه محصولات مراقبت از پوست پریسا اسدی" width={1158} height={1544} />
                </div>
                <h3>فروشگاه محصولات</h3>
              </Link>
              <p>محصولات اورجینال و تخصصی مراقبت از پوست با ارسال سراسری.</p>
              <Link href="/shop" className="btn btn-outline">مشاهده فروشگاه</Link>
            </Reveal>

            <Reveal className="trio-card" delay={200}>
              <Link href="/courses" aria-label="آموزش فیشیال پوست حضوری و آنلاین">
                <div className="trio-img">
                  <Image src="/img/pexels-gustavo-fring-3985329.webp" alt="آموزش تخصصی فیشیال پوست پریسا اسدی" width={2500} height={1667} />
                </div>
                <h3>آموزش فیشیال</h3>
              </Link>
              <p>دوره‌های حضوری و آنلاین (ضبط‌شده) با پشتیبانی مدرس.</p>
              <Link href="/courses" className="btn btn-outline">مشاهده دوره‌ها</Link>
            </Reveal>
          </div>
        </div>
      </section>
      {/* خدمات */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">خدمات تخصصی</div>
            <h2>خدمات <em>فیشیال پوست</em> در کلینیک پریسا اسدی</h2>
            <div className="underline" />
            <p>
              با استفاده از دستگاه‌ها و پروتکل‌های روز دنیا، برای هر نوع پوستی درمان هدفمند و
              شخصی‌سازی‌شده ارائه می‌دهیم.
            </p>
          </div>

          <div className="grid grid-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} className="card" delay={i * 80}>
                <div className="card-img">
                  <Image src={s.img} alt={s.title} width={s.w} height={s.h} />
                </div>
                <div className="card-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="card-meta">
                    <span className="price">{s.price}</span>
                    <Link href="/services" className="btn btn-outline">جزئیات بیشتر</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/services" className="btn">مشاهده همه خدمات</Link>
          </div>
        </div>
      </section>

      {/* ویژگی‌ها */}
      <section className="section">
        <div className="container">
          <div className="features">
            <Reveal className="feature">
              <div className="icon">🧑‍⚕️</div>
              <h4>مشاوره تخصصی رایگان</h4>
              <p>پیش از هر خدمت، تحلیل تخصصی پوست شما انجام می‌شود.</p>
            </Reveal>
            <Reveal className="feature" delay={80}>
              <div className="icon">🌿</div>
              <h4>محصولات اورجینال</h4>
              <p>تمامی محصولات دارای ضمانت اصالت و سلامت هستند.</p>
            </Reveal>
            <Reveal className="feature" delay={160}>
              <div className="icon">🎓</div>
              <h4>آموزش با پشتیبانی</h4>
              <p>دوره‌های حضوری و آنلاین همراه با پشتیبانی مدرس.</p>
            </Reveal>
            <Reveal className="feature" delay={240}>
              <div className="icon">⭐</div>
              <h4>رضایت ۹۸٪ مراجعین</h4>
              <p>بیش از ۳۰۰ مراجعه‌کننده راضی در سال‌های گذشته.</p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* محصولات */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">فروشگاه</div>
            <h2>پرفروش‌ترین <em>محصولات</em> مراقبت از پوست</h2>
            <div className="underline" />
            <p>محصولات تخصصی و اورجینال، مناسب هر نوع پوستی — با ارسال سریع به سراسر کشور.</p>
          </div>

          <div className="grid grid-3">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.id} className="card product-card" delay={i * 80}>
                <div className="card-img">
                  <Image src={p.img} alt={p.name} width={p.w} height={p.h} sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 33vw" />
                </div>
                <div className="card-body">
                  <span className="rating">★★★★★</span>
                  {p.brand && p.brand !== "پریسا اسدی" && (
                    <span className="tag">{p.brand}</span>
                  )}
                  <h3>{p.name}</h3>
                  <div className="card-meta">
                    <span className="price">
                      {p.price.toLocaleString("fa-IR")} <small>تومان</small>
                    </span>
                    <AddToCartButton product={p} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px" }}>
            <Link href="/shop" className="btn">ورود به فروشگاه</Link>
          </div>
        </div>
      </section>

      {/* بنر تبلیغاتی آموزش */}
      <section className="section">
        <div className="container">
          <Reveal className="cta-band">
            <Image src="/img/1400-x-600-copy-2-1.webp" alt="آموزش فیشیال پوست حضوری و آنلاین" width={1400} height={600} />
            <div className="cta-band-overlay">
              <h2>می‌خواهید متخصص فیشیال شوید؟</h2>
              <p>دوره‌های حضوری و آنلاین (ضبط‌شده) را با پشتیبانی کامل و مدرک معتبر فرا بگیرید.</p>
              <Link href="/courses" className="btn btn-gold">مشاهده دوره‌های آموزشی</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* نظرات */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">نظر مراجعین</div>
            <h2>داستان‌های <em>درخشان</em> مشتریان ما</h2>
            <div className="underline" />
          </div>
          <div className="testimonials">
            <Reveal className="testimonial">
              <p>پس از چند جلسه پاک‌سازی تخصصی، جوش‌هایم کاملاً تسکین پیدا کرد و پوستم شفاف شد. خانم اسدی واقعاً حرفه‌ای هستند.</p>
              <div className="who">مریم ر. <small>مراجعه‌کننده فیشیال پوست</small></div>
            </Reveal>
            <Reveal className="testimonial" delay={100}>
              <p>دوره آنلاین میکروچنلینگ فوق‌العاده بود. ویدیوها با کیفیت و پشتیبانی همیشه‌پاسخ‌گو باعث شد راحت یاد بگیرم.</p>
              <div className="who">سارا ک. <small>دانشجوی دوره آنلاین</small></div>
            </Reveal>
            <Reveal className="testimonial" delay={200}>
              <p>محصولات فروشگاه همشون اورجینال بودن و ارسال هم سریع بود. کرم دور چشم واقعاً تأثیرگذار بود.</p>
              <div className="who">نگار ح. <small>خریدار محصولات پوستی</small></div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

