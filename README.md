# وب‌سایت پریسا اسدی — کلینیک فیشیال پوست 🎀

سایت رسمی **پریسا اسدی** ساخته‌شده با **Next.js 14** (App Router، JavaScript/JSX).
شامل: خدمات فیشیال پوست، فروشگاه محصولات، آموزش حضوری و آنلاین (ضبط‌شدهٔ فارسی)، وبلاگ و نوبت‌دهی.

## ویژگی‌ها
- 🇮🇷 کاملاً فارسی و راست‌به‌چپ (RTL)
- 🔴 سئوی بسیار بالا: متادیتای یکتا برای هر صفحه + داده‌های ساخت‌یافته (JSON-LD) + sitemap و robots خودکار
- ⚡ بهینه‌سازی خودکار تصاویر با `next/image` (تبدیل به WebP)
- 🛍 سبد خرید سمت‌کاربر با ذخیره در مرورگر (localStorage)
- 📱 کاملاً واکنش‌گرا (موبایل/تبلت/دسکتاپ)

## اجرا به‌صورت محلی (Development)
```bash
npm install      # فقط بار اول
npm run dev      # اجرای سرور توسعه روی http://localhost:3000
```

## ساخت نسخهٔ نهایی (Production)
```bash
npm run build    # ساخت نسخهٔ بهینه‌شده
npm start        # اجرای نسخهٔ نهایی روی http://localhost:3000
```

## ساختار صفحات
| مسیر | صفحه |
|------|------|
| `/` | خانه |
| `/services` | خدمات فیشیال پوست |
| `/courses` | آموزش (حضوری + آنلاین/ضبط‌شده) |
| `/shop` | فروشگاه محصولات |
| `/about` | دربارهٔ پریسا اسدی |
| `/blog` | وبلاگ |
| `/contact` | تماس و نوبت‌دهی |

## ⚠️ نکات مهم قبل از انتشار
1. **دامنهٔ واقعی:** آدرس سایت از یک منبع واحد خوانده می‌شود — `app/config.js` (`WEBSITE`).
   مقدار پیش‌فرض `https://parisa-asadi.ir` است و با متغیر محیطی `NEXT_PUBLIC_SITE_URL` قابل تغییر است.
   ✅ دیگر نیازی به ویرایش دستی ۸ صفحه نیست.
2. **اطلاعات تماس:** شمارهٔ اصلی `09126356218` و آدرس «تهران، پونک» و اینستاگرام `parisaasadi_skincare`
   همه از فایل مرکزی `app/config.js` خوانده می‌شوند. اگر تغییری لازم شد فقط همان فایل را ویرایش کنید.
3. **سبد خرید و پرداخت:** سمت سرور با API Route پیاده شده است: `/api/checkout` (ثبت سفارش + درگاه زرین‌پال)،
   `/api/checkout/callback` (تأیید پرداخت) و `/api/booking` (فرم نوبت‌دهی).
   تنظیمات از `.env` خوانده می‌شود (نمونه: `.env.example`):
   - `ZARINPAL_MERCHANT_ID` = شناسهٔ پذیرندگی زرین‌پال. اگر خالی باشد، سفارش به‌جای درگاه با پیام «بله» به شمارهٔ کلینیک ارسال می‌شود.
   - `ORDER_SECRET` = کلید امضای سفارش (HMAC). اگر خالی باشد از `ZARINPAL_MERCHANT_ID` استفاده می‌شود.
   - `BALE_BOT_TOKEN` و `BALE_CHAT_ID` = (اختیاری) اطلاع‌رسانی لحظه‌ای سفارش/نوبت به مدیر با ربات بله.
4. **تکمیل تصاویر:** عکس‌های کارت دوره‌ها و برخی بخش‌ها فعلاً از استوک استفاده می‌کنند؛
   می‌توانید عکس‌های واقعی‌تر جایگزین کنید (فایل را در `public/img/` بگذارید و مسیر را تغییر دهید).

---

## 🚀 راهنمای استقرار (Deploy)

### گام ۱ — آماده‌سازی (یک‌بار)
```bash
npm install          # نصب وابستگی‌ها (شامل sharp برای بهینه‌سازی تصاویر)
npm run build        # بررسی اینکه بیلد بدون خطا انجام می‌شود
npm start            # اجرای نسخهٔ production روی http://localhost:3000
node scripts/smoke-test.mjs   # تست خودکار همهٔ مسیرها و APIها
```

### گام ۲ — بهینه‌سازی تصاویر (هر وقت عکس جدید اضافه شد)
```bash
npm run optimize:images
```
تصاویر `public/img/` را به **WebP** تبدیل و فشرده می‌کند (۱۴۱MB → ۷MB) و
ارجاع‌های کد را به‌صورت خودکار به‌روز می‌کند.
گزینه‌ها: `--prune` حذف تصاویر بلااستفاده، `--dry` فقط گزارش بدون تغییر.

### گام ۳ — انتشار در Vercel (توصیه‌شده)
```bash
npm i -g vercel
vercel login
vercel                 # دیپلوی پیش‌نمایش (preview)
vercel --prod          # دیپلوی روی دامنهٔ اصلی
```
سپس متغیرهای محیطی را در داشبورد Vercel (یا با CLI) تنظیم کنید:
```bash
vercel env add NEXT_PUBLIC_SITE_URL production      # https://parisa-asadi.ir
vercel env add ZARINPAL_MERCHANT_ID production       # شناسهٔ پذیرندگی
vercel env add ORDER_SECRET production               # کلید امضا (تصادفی)
vercel env add BALE_BOT_TOKEN production
vercel env add BALE_CHAT_ID production
```

### گام ۴ — انتشار در GitHub
```bash
git init
git add -A
git commit -m "Parisa Asadi website"
gh repo create parisa-asadi --public --source=. --push
```
سپس در Vercel: **Add New → Project → Import** همان ریپو، یا در `Settings → Git` متصل کنید.
با هر `git push` روی `main`، دیپلوی خودکار انجام می‌شود.

### ⚠️ نکتهٔ مهم دربارهٔ ذخیره‌سازی روی Vercel
پوشهٔ فایل‌سیستم روی Vercel **موقتی** است و بین دو درخواست پاک می‌شود.
به همین دلیل:
- مبلغ سفارش در **توکن امضاشده (HMAC)** داخل callback URL قرار می‌گیرد
  (`app/lib/orderToken.js`) — بنابراین تأیید پرداخت حتی بدون دیتابیس هم درست کار می‌کند.
- برای نگهداری دائمی سفارش‌ها و نوبت‌ها، متغیرهای زیر را در Vercel ست کنید تا
  ذخیره‌سازی از فایل به **Upstash Redis** منتقل شود (`app/lib/store.js`):
  ```
  UPSTASH_REDIS_REST_URL
  UPSTASH_REDIS_REST_TOKEN
  ```
  بدون این مقادیر، سایت کار می‌کند ولی سابقهٔ سفارش‌ها ممکن است بین درخواست‌ها از بین برود.
  برای فعال‌سازی: [upstash.com](https://upstash.com) → ایجاد دیتابیس → کپی REST URL و Token.

---

## 🛠 ساختار پروژه
```
app/
  config.js              ← آدرس سایت، شماره تماس، لینک‌های شبکهٔ اجتماعی (منبع واحد)
  data/products*.js      ← منبع واحد محصولات (فروشگاه + محاسبهٔ قیمت سمت سرور)
  lib/store.js           ← ذخیره‌سازی سفارش/نوبت (Redis یا فایل)
  lib/orderToken.js      ← توکن امضاشدهٔ سفارش (HMAC-SHA256)
  api/checkout/          ← ثبت سفارش + درگاه زرین‌پال
  api/booking/           ← فرم نوبت‌دهی
scripts/
  optimize-images.mjs    ← فشرده‌سازی تصاویر + به‌روزرسانی ارجاع‌ها
  smoke-test.mjs         ← تست خودکار مسیرها و APIها
```

## رفع خطای رایج: `Cannot find module './xxx.js'`
اگر هنگام اجرای `npm run dev` خطای «Cannot find module» دیدید، کش خراب شده است. کافی است پوشهٔ `.next` را پاک کنید:
```bash
# PowerShell
Remove-Item -Recurse -Force .next
npm run dev
```

## دیپلوی
سایت به‌راحتی روی **Vercel** (بهترین گزینه برای Next.js) یا Netlify قابل انتشار است.
```
