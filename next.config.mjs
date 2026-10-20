/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // هدرهای امنیتی (CSP سبک و سازگار با inline JSON-LD و next/font)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  images: {
    // تبدیل خودکار عکس‌های سنگین به WebP برای سرعت و سئوی بهتر
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1200, 1920],
    imageSizes: [32, 64, 96, 128, 256, 384],
    // تصاویر محصول ۱۰۰۰px هستند؛ برای کارت‌های کوچک لازم نیست بزرگ‌تر شوند
    minimumCacheTTL: 60 * 60 * 24 * 30, // ۳۰ روز کش
  },
};

export default nextConfig;
