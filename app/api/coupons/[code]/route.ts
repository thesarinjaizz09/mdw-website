import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

// GET /api/coupons/:code → backend GET /api/v2/coupons/:code
export async function GET(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const response = await backendFetch(`/api/v2/coupons/${encodeURIComponent(code)}`);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data, { status: 200 });
}
