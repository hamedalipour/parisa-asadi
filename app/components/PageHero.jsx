import Link from "next/link";

// هدر بالای صفحات داخلی + مسیر نان (Breadcrumb) برای سئو
export default function PageHero({ eyebrow, title, subtitle, crumbs = [] }) {
  return (
    <>
      <nav className="breadcrumb container" aria-label="مسیر صفحه">
        <Link href="/">خانه</Link>
        {crumbs.map((c, i) => (
          <span key={i}>
            <span>/</span>
            {c.href ? <Link href={c.href}>{c.label}</Link> : c.label}
          </span>
        ))}
      </nav>
      <section className="page-hero">
        <div className="container">
          {eyebrow && <div className="eyebrow" style={{ color: "var(--gold)", letterSpacing: 4, fontWeight: 700 }}>{eyebrow}</div>}
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </section>
    </>
  );
}
