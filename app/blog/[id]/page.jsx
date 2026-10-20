import Link from "next/link";
import Image from "next/image";
import PageHero from "@/app/components/PageHero";
import JsonLd from "@/app/components/JsonLd";
import Reveal from "@/app/components/Reveal";
import { POSTS } from "../posts";
import { WEBSITE as SITE } from "../../config";


// صفحات تک‌مقاله در زمان build تولید می‌شوند (سئو)
export function generateStaticParams() {
  return POSTS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.id === params.id);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE}/blog/${post.id}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.dateISO,
      images: [{ url: post.img }],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = POSTS.find((p) => p.id === params.id);
  if (!post) return null;

  const related = POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE}${post.img}`,
    url: `${SITE}/blog/${post.id}`,
    datePublished: post.dateISO,
    author: { "@type": "Person", name: "پریسا اسدی", url: `${SITE}/about` },
    publisher: { "@type": "Organization", name: "کلینیک پوست پریسا اسدی", url: SITE },
    articleSection: post.cat,
    inLanguage: "fa",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE },
      { "@type": "ListItem", position: 2, name: "وبلاگ", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.id}` },
    ],
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <PageHero
        eyebrow="وبلاگ"
        title={post.title}
        crumbs={[
          { label: "وبلاگ", href: "/blog" },
          { label: post.cat },
        ]}
      />

      <section className="section">
        <div className="container">
          <article className="about-wrap" style={{ alignItems: "start" }}>
            <div style={{ maxWidth: "720px" }}>
              <span className="tag">{post.cat} · {post.date}</span>
              <h2 style={{ margin: "12px 0 20px" }}>{post.excerpt}</h2>
              {post.body.map((par, i) => (
                <p key={i} style={{ color: "var(--text-soft)", lineHeight: "2", marginBottom: "16px" }}>
                  {par}
                </p>
              ))}

              <div style={{ marginTop: "28px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-gold">مشاوره رایگان بگیرید</Link>
                <Link href="/blog" className="btn btn-outline">مقالات دیگر</Link>
              </div>
            </div>

            <Reveal className="about-img">
              <Image
                src={post.img}
                alt={post.title}
                width={post.w}
                height={post.h}
                style={{ borderRadius: "18px" }}
                priority
              />
              <div className="eyebrow" style={{ marginTop: "10px" }}>
                نوشتهٔ تیم کلینیک پریسا اسدی
              </div>
            </Reveal>
          </article>

          <div className="section-head" style={{ marginTop: "60px" }}>
            <div className="eyebrow">ادامهٔ مطلب</div>
            <h2>مطالب <em>دیگر</em> که شاید بپسندید</h2>
            <div className="underline" />
          </div>
          <div className="grid grid-2">
            {related.map((p, i) => (
              <Reveal key={p.id} className="card" delay={i * 80}>
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
