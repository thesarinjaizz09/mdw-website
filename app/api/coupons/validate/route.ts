import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

// POST /api/coupons/validate → backend POST /api/v2/coupons/validate
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const response = await backendFetch(`/api/v2/coupons/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data, { status: 200 });
}
