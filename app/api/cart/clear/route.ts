import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const response = await backendFetch("/api/users/cart/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => ({}));
  return NextResponse.json(data, { status: response.status });
}
