// پیکربندی مشترک سایت — اطلاعات تماس و آدرس فقط از اینجا خوانده می‌شود
// آدرس سایت از متغیر محیطی NEXT_PUBLIC_SITE_URL خوانده می‌شود
// تا در staging/preview دامنهٔ اصلی به‌هم نریزد. مقدار پیش‌فرض = دامنهٔ اصلی.
export const WEBSITE = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://parisa-asadi.ir"
).replace(/\/$/, "");

// شماره اصلی (همه کانال‌ها) + شماره نمایشی فارسی
export const PHONE_LOCAL = "09126356218";
export const PHONE_INTL = "989126356218";
export const PHONE_FA = "۰۹۱۲۶۳۵۶۲۱۸";

// آدرس کلینیک
export const ADDRESS_FA = "تهران، پونک";

// لینک‌های ارتباطی و شبکه‌های اجتماعی
export const INSTAGRAM_URL = "https://www.instagram.com/parisaasadi_skincare/";
export const BALE_BOOKING_URL =
  `https://ble.ir/${PHONE_LOCAL}?text=` + encodeURIComponent("سلام یک رزرو نوبت می خواستم");
export const TELEGRAM_URL = `https://t.me/+${PHONE_INTL}`;
export const WHATSAPP_URL = `https://wa.me/${PHONE_INTL}`;
// تماس مستقیم تلفنی (tap-to-call در موبایل)
export const PHONE_TEL = `tel:+${PHONE_INTL}`;
