// تزریق داده ساخت‌یافته JSON-LD در صفحه (سئو)
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
