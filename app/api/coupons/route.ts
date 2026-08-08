import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

// GET /api/coupons → backend GET /api/v2/coupons
export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "active";

  const response = await backendFetch(`/api/v2/coupons?status=${status}`);

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  return NextResponse.json(data, { status: 200 });
}

// POST /api/coupons → backend accepts optional cart items body to filter
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  const response = await backendFetch(`/api/v2/coupons`, {
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