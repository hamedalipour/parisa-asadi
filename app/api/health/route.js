// بررسی سلامت ذخیره‌سازی و وضعیت سرویس
// GET /api/health
// برمی‌گرداند: { ok, storage: "redis"|"file", redis: bool, orders: number, bookings: number, uptime: number }
//
// نکته: این endpoint عمومی است اما هیچ دادهٔ شخصی (نام/شماره/مبلغ) را برنمی‌گرداند —
// فقط نوع ذخیره‌سازی و تعداد رکوردها، برای پایش سلامت.
import { NextResponse } from "next/server";
import { countRecords, storageMode } from "../../lib/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const mode = storageMode();
  const started = Date.now();
  try {
    const [orders, bookings] = await Promise.all([
      countRecords("orders.json"),
      countRecords("bookings.json"),
    ]);
    return NextResponse.json(
      {
        ok: true,
        storage: mode,
        redis: mode === "redis",
        orders,
        bookings,
        latencyMs: Date.now() - started,
        uptime: Math.round(process.uptime()),
      },
      { headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  } catch (e) {
    return NextResponse.json(
      { ok: false, storage: mode, error: "storage-unavailable" },
      { status: 503, headers: { "Cache-Control": "no-store, no-cache, must-revalidate" } }
    );
  }
}