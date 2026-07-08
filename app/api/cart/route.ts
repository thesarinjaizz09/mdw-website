import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status") || "active";

  const response = await backendFetch(`/api/users/cart/get-cart?status=${encodeURIComponent(status)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  const cart = Array.isArray(data?.carts) ? data.carts[0] ?? null : null;

  return NextResponse.json({ success: true, cart, raw: data }, { status: 200 });
}
