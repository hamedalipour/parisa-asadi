import Link from "next/link";
import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import BookingForm from "@/app/components/BookingForm";
import Reveal from "@/app/components/Reveal";
import {
  PHONE_FA,
  ADDRESS_FA,
  INSTAGRAM_URL,
  WEBSITE as SITE,
} from "@/app/config";
import SocialIcons from "@/app/components/SocialIcons";


export const metadata = {
  title: "تماس و نوبت‌دهی | کلینیک فیشیال پوست پریسا اسدی",
  description:
    "رزرو نوبت آنلاین و مشاوره رایگان در کلینیک فیشیال پوست پریسا اسدی. آدرس، شماره تماس و ساعات کاری. برای نوبت‌دهی فرم را پر کنید یا تماس بگیرید.",
  keywords: ["رزرو نوبت فیشیال", "تماس با پریسا اسدی", "نوبت مشاوره پوست", "کلینیک پوست تهران"],
  alternates: { canonical: `${SITE}/contact` },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "پریسا اسدی",
  image: `${SITE}/img/banner-asli.webp`,
  url: `${SITE}/contact`,
  telephone: "+989126356218",
  email: "info@parisa-asadi.ir",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressRegion: "تهران",
    addressCountry: "IR",
    streetAddress: "پونک",
  },
  sameAs: [INSTAGRAM_URL],
  geo: { "@type": "GeoCoordinates", latitude: "35.7448", longitude: "51.4144" },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "20:00",
    },
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "تماس و نوبت‌دهی", item: `${SITE}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="تماس با ما"
        title="رزرو نوبت و مشاوره رایگان"
        subtitle="برای رزرو نوبت یا دریافت مشاوره تخصصی پوست، فرم را پر کنید یا با ما تماس بگیرید. مشاوره اولیه کاملاً رایگان است."
        crumbs={[{ label: "تماس و نوبت‌دهی" }]}
      />

      <section className="section">
        <div className="container">
          <div className="about-wrap" style={{ alignItems: "start" }}>
            <Reveal>
              <BookingForm />
            </Reveal>

            <Reveal delay={100}>
              <div style={{ marginBottom: "28px" }}>
                <Image
                  src="/img/pexels-elly-fairytale-3865548.webp"
                  alt="کلینیک فیشیال پوست پریسا اسدی"
                  width={3840}
                  height={5760}
                  style={{ borderRadius: "18px", width: "100%", height: "auto" }}
                />
              </div>

              <div className="feature" style={{ textAlign: "right" }}>
                <h4 style={{ marginBottom: "12px" }}>📍 اطلاعات تماس</h4>
                <p style={{ marginBottom: "8px" }}><strong>آدرس:</strong> {ADDRESS_FA}</p>
                <p style={{ marginBottom: "8px" }}><strong>تلفن:</strong> {PHONE_FA}</p>
                <p style={{ marginBottom: "8px" }}><strong>ایمیل:</strong> info@parisa-asadi.ir</p>
                <p style={{ marginBottom: "8px" }}><strong>ساعات کاری:</strong> شنبه تا پنجشنبه، ۱۰:۰۰ تا ۲۰:۰۰</p>
                <p><strong>جمعه‌ها:</strong> تعطیل</p>
              </div>

              <div className="social" style={{ marginTop: "18px" }}>
                <SocialIcons />
              </div>

              <div style={{ marginTop: "18px" }}>
                <Link href="/shop" className="btn btn-gold">رفتن به فروشگاه</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
