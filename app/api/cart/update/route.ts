import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const body = await req.json();
  const response = await backendFetch(`/api/users/cart/update/${body.cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
