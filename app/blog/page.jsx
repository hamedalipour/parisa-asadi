import Link from "next/link";
import Image from "next/image";
import Reveal from "@/app/components/Reveal";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import { POSTS, blogUrl } from "./posts";
import { WEBSITE as SITE } from "../config";


export const metadata = {
  title: "وبلاگ مراقبت از پوست | مقالات تخصصی فیشیال پریسا اسدی",
  description:
    "مقالات تخصصی درباره مراقبت از پوست، روتین پوستی، درمان جوش و لک، میکروچنلینگ و پیلینگ؛ نوشته‌شده توسط متخصصان کلینیک پریسا اسدی.",
  keywords: ["مقالات مراقبت از پوست", "روتین پوستی", "درمان جوش", "وبلاگ پوست", "نکات پوستی"],
  alternates: { canonical: `${SITE}/blog` },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "وبلاگ مراقبت از پوست پریسا اسدی",
  url: `${SITE}/blog`,
  blogPost: POSTS.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    description: p.excerpt,
    image: `${SITE}${p.img}`,
    url: blogUrl(p),
    datePublished: p.dateISO,
    author: { "@type": "Person", name: "پریسا اسدی" },
    articleSection: p.cat,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
    { "@type": "ListItem", position: 2, name: "وبلاگ", item: `${SITE}/blog` },
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="وبلاگ"
        title="مقالات تخصصی مراقبت از پوست"
        subtitle="دانش و تجربه ما را در قالب مقاله‌های کاربردی درباره سلامت و زیبایی پوست با شما به اشتراک می‌گذاریم."
        crumbs={[{ label: "وبلاگ" }]}
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-2">
            {POSTS.map((p, i) => (
              <Reveal key={p.id} className="card" delay={(i % 2) * 80}>
                <div className="card-img">
                  <Image src={p.img} alt={p.title} width={p.w} height={p.h} />
                </div>
                <div className="card-body">
                  <span className="tag">{p.cat} · {p.date}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <div className="card-meta">
                    <Link href={`/blog/${p.id}`} className="btn btn-outline">ادامه مطلب</Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
