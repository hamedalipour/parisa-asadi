import "./globals.css";
import { Vazirmatn, Great_Vibes } from "next/font/google";
import SiteChrome from "./components/SiteChrome";
import Footer from "./components/Footer";
import { INSTAGRAM_URL, WEBSITE as SITE_URL } from "./config";
// فونت‌های گوگل با بهینه‌سازی next/font (بدون پرش چیدمان)
const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["300", "400", "500", "700", "800"],
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  variable: "--font-greatvibes",
  display: "swap",
  weight: ["400"],
});

// داده ساخت‌یافته سطح سایت (سئو)
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "پریسا اسدی",
  alternateName: "کلینیک پوست پریسا اسدی",
  url: SITE_URL,
  telephone: "+989126356218",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressCountry: "IR",
    streetAddress: "پونک",
  },
  openingHours: "Sa-Th 10:00-20:00",
  priceRange: "$$",
  sameAs: [SITE_URL, INSTAGRAM_URL],
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "پریسا اسدی | خدمات فیشیال پوست، فروشگاه محصولات و آموزش تخصصی",
    template: "%s | پریسا اسدی",
  },
  description:
    "کلینیک تخصصی فیشیال پوست پریسا اسدی؛ پاک‌سازی، میکروچنلینگ، لایه‌برداری شیمیایی، فروشگاه محصولات مراقبت از پوست و آموزش فیشیال حضوری و آنلاین (ضبط‌شده).",
  keywords: [
    "فیشیال پوست",
    "پاکسازی صورت",
    "میکروچنلینگ",
    "آموزش فیشیال",
    "آموزش پوست",
    "فروشگاه لوازم آرایشی",
    "پریسا اسدی",
  ],
  authors: [{ name: "پریسا اسدی" }],
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "پریسا اسدی",
    title: "پریسا اسدی | خدمات فیشیال پوست، فروشگاه و آموزش",
    description: "مرکز تخصصی پوست، زیبایی و آموزش فیشیال پریسا اسدی.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
};

export const viewport = {
  themeColor: "#A86753",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} ${greatVibes.variable}`}>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SiteChrome>
          {children}
        </SiteChrome>
        <Footer />
      </body>
    </html>
  );
}
