import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import { WEBSITE as SITE } from "../config";


export const metadata = {
  title: "آموزش فیشیال پوست حضوری و آنلاین (ضبط‌شده) | دوره‌های پریسا اسدی",
  description:
    "دوره‌های آموزش فیشیال پوست در دو بخش حضوری و آنلاین (ضبط‌شده فارسی): پاک‌سازی، میکروچنلینگ، پیلینگ و مدیریت کلینیک پوست. با پشتیبانی مدرس و مدرک معتبر.",
  keywords: ["آموزش فیشیال", "آموزش پوست", "دوره حضوری فیشیال", "دوره آنلاین پوست", "آموزش میکروچنلینگ"],
  alternates: { canonical: `${SITE}/courses` },
};

// دوره‌های حضوری
const IN_PERSON = [
  {
    id: "c1",
    img: "/img/pexels-gustavo-fring-3985329.webp", w: 2500, h: 1667,
    title: "دوره حضوری پاک‌سازی و فیشیال مقدماتی",
    desc: "آموزش کامل اصول پاک‌سازی پوست، شناخت انواع پوست و محصولات، با کار عملی روی مانکن.",
    duration: "۳ جلسه (۲۴ ساعت)",
    workload: "PT24H",
    price: "۶,۵۰۰,۰۰۰ تومان",
  },
  {
    id: "c2",
    img: "/img/pexels-cripsdog-30809943.webp", w: 4160, h: 6240,
    title: "دوره حضوری میکروچنلینگ حرفه‌ای",
    desc: "آموزش تخصصی میکروچنلینگ، تنظیم عمق سوزن‌ها، پروتکل‌های درمانی و پس‌درمانی، با گواهی پایان دوره.",
    duration: "۴ جلسه (۳۲ ساعت)",
    workload: "PT32H",
    price: "۹,۸۰۰,۰۰۰ تومان",
  },
  {
    id: "c3",
    img: "/img/iStock-1026998466.webp", w: 1500, h: 1000,
    title: "دوره حضوری پیلینگ و لایه‌برداری شیمیایی",
    desc: "آموزش انواع پیلینگ، انتخاب اسید مناسب برای هر پوست و جلوگیری از عوارض.",
    duration: "۲ جلسه (۱۶ ساعت)",
    workload: "PT16H",
    price: "۵,۲۰۰,۰۰۰ تومان",
  },
];

// دوره‌های آنلاین (ضبط‌شده فارسی)
const ONLINE = [
  {
    id: "o1",
    img: "/img/unsplash-image-EfhCUc_fjrU.webp", w: 2500, h: 1667,
    title: "دوره آنلاین آشنایی با پوست و انواع آن (فارسی)",
    desc: "ویدیوهای ضبط‌شده به زبان فارسی؛ شناخت انواع پوست، مشکلات شایع و روتین پایه مراقبت.",
    duration: "۸ ساعت ویدیو",
    workload: "PT8H",
    price: "۱,۹۰۰,۰۰۰ تومان",
    lessons: "۴۲ درس",
  },
  {
    id: "o2",
    img: "/img/iStock-1077172296.webp", w: 1500, h: 1000,
    title: "دوره آنلاین پاک‌سازی تخصصی (فارسی)",
    desc: "آموزش گام‌به‌گام پاک‌سازی حرفه‌ای پوست از پایه تا پیشرفته، قابل مشاهده در هر زمان.",
    duration: "۱۴ ساعت ویدیو",
    workload: "PT14H",
    price: "۲,۸۰۰,۰۰۰ تومان",
    lessons: "۵۸ درس",
  },
  {
    id: "o3",
    img: "/img/iStock-1431679698.webp", w: 1500, h: 1000,
    title: "دوره آنلاین میکروچنلینگ و پس‌درمانی (فارسی)",
    desc: "ویدیوهای کامل تئوری و دموی عملی میکروچنلینگ همراه با پروتکل‌های پس‌درمانی.",
    duration: "۱۸ ساعت ویدیو",
    workload: "PT18H",
    price: "۳,۹۰۰,۰۰۰ تومان",
    lessons: "۷۱ درس",
  },
];

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "دوره‌های آموزش فیشیال پریسا اسدی",
  itemListElement: [...IN_PERSON, ...ONLINE].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Course",
      name: c.title,
      description: c.desc,
      inLanguage: "fa",
      provider: { "@type": "Organization", name: "آکادمی پریسا اسدی", sameAs: SITE },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: c.id.startsWith("o") ? "Online" : "Onsite",
        courseWorkload: c.workload,
      },
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "آموزش", item: `${SITE}/courses` },
  ],
};

export default function CoursesPage() {
  return (
    <>
      <JsonLd data={courseSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="آکادمی پریسا اسدی"
        title="آموزش فیشیال پوست — حضوری و آنلاین"
        subtitle="از صفر تا حرفه‌ای یاد بگیرید. دوره‌های حضوری با کار عملی، و دوره‌های آنلاین (ضبط‌شده فارسی) قابل مشاهده در هر زمان و مکان، همراه با پشتیبانی مدرس."
        crumbs={[{ label: "آموزش" }]}
      />

      {/* دوره‌های حضوری */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">حضوری</div>
            <h2>دوره‌های <em>حضوری</em> با کار عملی</h2>
            <div className="underline" />
            <p>آموزش چهره‌به‌چهره در کلینیک، با تمرین عملی روی مانکن و دریافت گواهی معتبر پایان دوره.</p>
          </div>
          <div className="grid grid-3">
            {IN_PERSON.map((c, i) => (
              <Reveal key={c.id} className="card" delay={i * 80}>
                <div className="card-img">
                  <Image src={c.img} alt={c.title} width={c.w} height={c.h} />
                </div>
                <div className="card-body">
                  <span className="tag gold">حضوری</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="card-meta">
                    <span className="price">{c.price} <small>| {c.duration}</small></span>
                    <Link href="/contact" className="btn">ثبت‌نام</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* دوره‌های آنلاین (ضبط‌شده فارسی) */}
      <section className="section" style={{ background: "#fff" }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">آنلاین / ضبط‌شده</div>
            <h2>دوره‌های <em>آنلاین</em> (ضبط‌شده فارسی)</h2>
            <div className="underline" />
            <p>
              ویدیوهای آموزشی به زبان فارسی که در هر زمان و مکان قابل مشاهده‌اند؛ همراه با دسترسی مادام‌العمر
              و پشتیبانی مدرس در گروه خصوصی.
            </p>
          </div>
          <div className="grid grid-3">
            {ONLINE.map((c, i) => (
              <Reveal key={c.id} className="card" delay={i * 80}>
                <div className="card-img">
                  <Image src={c.img} alt={c.title} width={c.w} height={c.h} />
                </div>
                <div className="card-body">
                  <span className="tag green">آنلاین · ضبط‌شده</span>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                  <div className="card-meta">
                    <span className="price">{c.price} <small>| {c.lessons} | {c.duration}</small></span>
                    <Link href="/contact" className="btn btn-gold">خرید دوره</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="features">
            <Reveal className="feature">
              <div className="icon">📜</div>
              <h4>مدرک معتبر</h4>
              <p>گواهی پایان دوره با کد رهگیری برای دوره‌های حضوری.</p>
            </Reveal>
            <Reveal className="feature" delay={80}>
              <div className="icon">💬</div>
              <h4>پشتیبانی مدرس</h4>
              <p>پاسخ به سوالات شما در گروه خصوصی هر دوره.</p>
            </Reveal>
            <Reveal className="feature" delay={160}>
              <div className="icon">♾️</div>
              <h4>دسترسی مادام‌العمر</h4>
              <p>ویدیوهای دوره‌های آنلاین برای همیشه در دسترس شماست.</p>
            </Reveal>
            <Reveal className="feature" delay={240}>
              <div className="icon">🧰</div>
              <h4>کار عملی</h4>
              <p>تمرین روی مانکن در دوره‌های حضوری.</p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

