import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import { WEBSITE as SITE } from "../config";


export const metadata = {
  title: "خدمات فیشیال پوست | پاک‌سازی، میکروچنلینگ، پیلینگ و لیفت صورت",
  description:
    "انواع خدمات تخصصی فیشیال پوست در کلینیک پریسا اسدی: پاک‌سازی عمیق، میکروچنلینگ، لایه‌برداری شیمیایی، ماساژ مفصلی صورت و فیشیال سیگنیچر. نرخ و مشاوره رایگان.",
  keywords: ["فیشیال پوست", "پاکسازی صورت", "میکروچنلینگ", "پیلینگ", "لیفت صورت", "خدمات پوست"],
  alternates: { canonical: `${SITE}/services` },
};

const SERVICES = [
  {
    slug: "pak-zayi",
    img: "/img/deep-cleansing-facial-los-angeles-esthetics-la.webp", w: 1076, h: 1076,
    title: "پاک‌سازی تخصصی پوست (Deep Cleansing)",
    desc: "پاک‌سازی عمیق منافذ، حذف آلتراسیون‌ها و جوش سرسیه، لایه‌برداری ملایم و آبرسانی عمیق. مناسب پوست‌های چرب و مستعد جوش.",
    price: "از ۸۵۰,۰۰۰ تومان",
    duration: "۶۰ دقیقه",
  },
  {
    slug: "microchanneling",
    img: "/img/microchanneling-facial-los-angeles-esthetics-los-angeles.webp", w: 1125, h: 1500,
    title: "میکروچنلینگ و رفع چین و چروک",
    desc: "تحریک طبیعی تولید کلاژن با میکروکانال‌های ریز؛ مؤثر در رفع خطوط خنده، جای جوش و شلولگی پوست.",
    price: "از ۲,۴۰۰,۰۰۰ تومان",
    duration: "۹۰ دقیقه",
  },
  {
    slug: "chemical-peel",
    img: "/img/chemical-peel-facial-los-angeles-esthetics-la.webp", w: 896, h: 1200,
    title: "لایه‌برداری شیمیایی (پیلینگ)",
    desc: "رفع لک، پفیدگی و ناهمواری بافت پوست با پیلینگ تخصصی شیمیایی، تحت نظر اپراتور مجرب و با پروتکل ایمن.",
    price: "از ۱,۲۰۰,۰۰۰ تومان",
    duration: "۴۵ دقیقه",
  },
  {
    slug: "myofascial-massage",
    img: "/img/myofascial-massage-los-angeles-esthetics-la--1152x1536.webp", w: 1152, h: 1536,
    title: "ماساژ مفصلی صورت (لیفت طبیعی)",
    desc: "لیفت طبیعی صورت، بهبود گردش خون و کاهش کبودی زیر چشم با ماساژ مفصلی تخصصی؛ بدون جراحی و تزریق.",
    price: "از ۱,۵۰۰,۰۰۰ تومان",
    duration: "۷۵ دقیقه",
  },
  {
    slug: "signature-facial",
    img: "/img/custom-signature-facial-los-angeles-esthetics-la.webp", w: 1320, h: 847,
    title: "فیشیال سیگنیچر پریسا اسدی",
    desc: "پروتکل اختصاصی و امضای کلینیک؛ ترکیبی از پاک‌سازی، ماسک آبرسانی و ماساژ برای درخشش فوری پوست.",
    price: "از ۱,۹۰۰,۰۰۰ تومان",
    duration: "۸۰ دقیقه",
  },
  {
    slug: "hydration",
    img: "/img/1000x1000_biocell_rejuvenating_shadow2-1000x1000-1.webp", w: 1000, h: 1000,
    title: "آبرسانی و جوان‌سازی عمیق (هیدرودرم)",
    desc: "تزریق مواد مغذی و هیدراسیون عمیق با روش‌های مدرن؛ برای پوست‌های خشک و پژمرده ایده‌آل است.",
    price: "از ۱,۷۰۰,۰۰۰ تومان",
    duration: "۶۰ دقیقه",
  },
];

const serviceListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "خدمات فیشیال پوست پریسا اسدی",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.title,
      description: s.desc,
      provider: { "@type": "HealthAndBeautyBusiness", name: "پریسا اسدی" },
      areaServed: "تهران",
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "خدمات", item: `${SITE}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceListSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="خدمات ما"
        title="خدمات تخصصی فیشیال پوست"
        subtitle="در کلینیک پریسا اسدی، برای هر مشکل پوستی از جوش و لک تا پژمردگی، یک پروتکل درمانی اختصاصی داریم. ابتدا پوست شما تحلیل و سپس بهترین خدمت انتخاب می‌شود."
        crumbs={[{ label: "خدمات" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {SERVICES.map((s, i) => (
              <Reveal key={s.slug} className="card" delay={(i % 2) * 80}>
                <div className="card-img">
                  <Image src={s.img} alt={s.title} width={s.w} height={s.h} />
                </div>
                <div className="card-body">
                  <span className="tag">{s.duration}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="card-meta">
                    <span className="price">{s.price}</span>
                    <Link href="/contact" className="btn">رزرو این خدمت</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">مشاوره</div>
            <h2>نمی‌دانید کدام خدمت مناسب پوست شماست؟</h2>
            <div className="underline" />
            <p>فرم مشاوره رایگان را پر کنید تا کارشنوان ما نوع پوست شما را تحلیل و بهترین گزینه را پیشنهاد دهد.</p>
            <div style={{ marginTop: "20px" }}>
              <Link href="/contact" className="btn btn-gold">دریافت مشاوره رایگان</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
