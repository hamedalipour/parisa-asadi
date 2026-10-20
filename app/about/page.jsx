import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import { WEBSITE as SITE } from "../config";


export const metadata = {
  title: "درباره پریسا اسدی | متخصص فیشیال پوست و مدرس آموزش",
  description:
    "آشنایی با پریسا اسدی، متخصص فیشیال پوست، بنیان‌گذار کلینیک پوست و مدرس دوره‌های حضوری و آنلاین فیشیال؛ با بیش از ۱۰ سال تجربه در زیبایی و سلامت پوست.",
  keywords: ["پریسا اسدی", "متخصص فیشیال پوست", "مدرس فیشیال", "درباره ما"],
  alternates: { canonical: `${SITE}/about` },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "پریسا اسدی",
  jobTitle: "متخصص فیشیال پوست و مدرس",
  image: `${SITE}/img/custom-signature-facial-los-angeles-esthetics-la.webp`,
  url: `${SITE}/about`,
  worksFor: { "@type": "Organization", name: "کلینیک پوست پریسا اسدی" },
  knowsAbout: ["فیشیال پوست", "میکروچنلینگ", "پیلینگ", "آموزش زیبایی"],
  address: { "@type": "PostalAddress", addressLocality: "تهران", addressCountry: "IR" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "درباره من", item: `${SITE}/about` },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="درباره من"
        title="پریسا اسدی"
        subtitle="متخصص فیشیال پوست، مدرس و بنیان‌گذار کلینیک پوست پریسا اسدی. با بیش از ۱۰ سال تجربه در زیبایی و سلامت پوست."
        crumbs={[{ label: "درباره من" }]}
      />

      <section className="section">
        <div className="container">
          <div className="about-wrap">
            <Reveal className="about-img">
              <Image
                src="/img/custom-signature-facial-los-angeles-esthetics-la.webp"
                alt="پریسا اسدی، متخصص فیشیال پوست"
                width={1320}
                height={847}
              />
            </Reveal>
            <Reveal delay={100}>
              <div className="eyebrow" style={{ color: "var(--gold)", letterSpacing: 4, fontWeight: 700 }}>
                داستان من
              </div>
              <h2 style={{ margin: "8px 0 16px" }}>
                سال‌ها تجربه در <em style={{ fontFamily: "var(--font-sign)", color: "var(--primary-dark)", fontStyle: "normal", fontSize: "1.2em" }}>زیبایی پوست</em>
              </h2>
              <p style={{ color: "var(--text-soft)" }}>
                من پریسا اسدی هستم؛ متخصص فیشیال پوست و مدرس. مسیر حرفه‌ای من از سال ۱۳۹۲ آغاز شد و
                از آن زمان هزاران مراجعه‌کننده و دانشجو در کلینیک و آکادمی من آموزش دیده‌اند. اعتقاد
                دارم پوست سالم، آینه سلامت درونی است و هر فردی حق دارد بهترین نسخه از خودش باشد.
              </p>
              <ul className="check-list">
                <li>دارای گواهی‌نامه‌های تخصصی فیشیال پوست از انجمن‌های معتبر زیبایی</li>
                <li>بیش از ۱۰ سال تجربه عملی در کلینیک‌های معتبر</li>
                <li>مدرس دوره‌های حضوری و آنلاین با صدها دانشجوی موفق</li>
                <li>استفاده از دستگاه‌ها و پروتکل‌های به‌روز روز دنیا</li>
                <li>تمرکز بر درمان هدفمند بر اساس تحلیل تخصصی پوست</li>
              </ul>
              <div style={{ marginTop: "24px" }}>
                <Link href="/contact" className="btn">رزرو مشاوره رایگان</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="features">
            <Reveal className="feature"><div className="stat-num">۱۰+</div><h4>سال تجربه</h4></Reveal>
            <Reveal className="feature" delay={80}><div className="stat-num">۳۰۰۰+</div><h4>مراجعه‌کننده راضی</h4></Reveal>
            <Reveal className="feature" delay={160}><div className="stat-num">۵۰۰+</div><h4>دانشجوی دوره‌ها</h4></Reveal>
            <Reveal className="feature" delay={240}><div className="stat-num">۹۸٪</div><h4>رضایت‌مندی</h4></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
