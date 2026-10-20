// لیست محصولات — منبع واحد برای فروشگاه، صفحهٔ اصلی و محاسبهٔ قیمت سمت سرور (درگاه پرداخت)
// برند هر محصول از روی نوشتهٔ روی بسته‌بندی خود تصویر استخراج شده است.
import { NEW_PRODUCTS } from "./products-new";

export const PRODUCTS = [
  {
    id: "p1",
    img: "/img/1000x1000_biocell_rejuvenating_shadow2-1000x1000-1.webp", w: 1000, h: 1000,
    name: "سرم بازسازی کننده Biocell",
    desc: "سرم جوان‌ساز با پپتیدهای فعال؛ محرک تولید کلاژن و رفع خطوط ریز پوست.",
    brand: "Biocell",
    price: 1250000, oldPrice: 1500000,
  },  {
    id: "p2",
    img: "/img/1000x1000_eye_wrinkle_shadow.webp", w: 1000, h: 1000,
    name: "کرم ضدچین و چروک دور چشم",
    desc: "کرم غنی‌شده برای کاهش تیرگی، پف و چین‌وچروک پوست ناحیه چشم.",
    brand: "پریسا اسدی",
    price: 980000, oldPrice: 1150000,
  },
  {
    id: "p3",
    img: "/img/1000x1000_peptide_cleanser_shadow_alt_NEW.webp", w: 1000, h: 1000,
    name: "پاک‌کننده peptidic ملایم",
    desc: "شوینده ملایم بدون آسیب به رطوبت پوست، مناسب پوست‌های حساس.",
    brand: "پریسا اسدی",
    price: 720000, oldPrice: 850000,
  },
  {
    id: "p4",
    img: "/img/iStock-1026998466.webp", w: 1500, h: 1000,
    name: "کرم آبرسان هیالورونیک اسید",
    desc: "آبرسانی عمیق و حفظ رطوبت پوست به مدت طولانی با هیالورونیک اسید خالص.",
    brand: "پریسا اسدی",
    price: 860000, oldPrice: 990000,
  },
  {
    id: "p5",
    img: "/img/iStock-1077172296.webp", w: 1500, h: 1000,
    name: "سرم روشن‌کننده ویتامین C",
    desc: "کاهش لک و یکنواختی رنگ پوست با ویتامین C پایدار، درخشان‌کننده و محافظ.",
    brand: "پریسا اسدی",
    price: 1090000, oldPrice: 1250000,
  },
  {
    id: "p6",
    img: "/img/iStock-1431679698.webp", w: 1500, h: 1000,
    name: "ضدآفتاب بی‌رنگ SPF50 (مقاوم)",
    desc: "ضدآفتاب فیزیکی-شیمیایی بدون رسوب سفید، مناسب زیر آرایش و پوست‌های چرب.",
    brand: "پریسا اسدی",
    price: 640000, oldPrice: 750000,
  },
  {
    id: "p7",
    img: "/img/ordinary-hyaluronic-acid-serum.webp", w: 1254, h: 1254,
    name: "سرم هیالورونیک اسید ۲٪ + B5 اوردینری",
    desc: "آبرسانی عمیق و حفظ رطوبت پوست با هیالورونیک اسید خالص و ویتامین B5؛ مناسب انواع پوست حتی پوست حساس.",
    brand: "The Ordinary",
    price: 690000, oldPrice: 820000,
  },
  {
    id: "p8",
    img: "/img/ordinary-buffet-serum.webp", w: 1254, h: 1254,
    name: "سرم پپتیدهای پیشرفته Buffet اوردینری",
    desc: "ترکیب چند نوع پپتید و اسید آمینه برای تحریک کلاژن، کاهش خطوط ریز و بازگشت شادابی و جوانی پوست.",
    brand: "The Ordinary",
    price: 1150000, oldPrice: 1350000,
  },
  {
    id: "p9",
    img: "/img/clinique-moisture-surge.webp", w: 1254, h: 1254,
    name: "کرم آبرسان Clinique Moisture Surge 100H",
    desc: "آبرسانی مداوم تا ۱۰۰ ساعت با تکنولوژی آلوئه‌ورا؛ پوستی شاداب، درخشان و انعطاف‌پذیر.",
    brand: "CLINIQUE",
    price: 1480000, oldPrice: 1700000,
  },
  {
    id: "p10",
    img: "/img/cidari-aha-serum.webp", w: 1224, h: 1285,
    name: "سرم لایه‌بردار AHA سیداری",
    desc: "لایه‌برداری ملایم با اسید گلیکولیک، لاکتیک و تارتاریک برای شفافیت پوست، یکنواختی رنگ و کاهش لک‌های سطحی.",
    brand: "CIDARI",
    price: 870000, oldPrice: 1050000,
  },
  ...NEW_PRODUCTS,
];

export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
