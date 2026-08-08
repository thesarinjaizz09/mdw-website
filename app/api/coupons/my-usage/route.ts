import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

// GET /api/coupons/my-usage → backend GET /api/v2/coupons/my-usage
export async function GET(request: Request) {
  const response = await backendFetch(`/api/v2/coupons/my-usage`);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data, { status: 200 });
}
