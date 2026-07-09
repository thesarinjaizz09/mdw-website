import { backendFetch } from "@/lib/server/backend";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);

    const status =
        url.searchParams.get("status") ??
        "active";

    const response = await backendFetch(
        `/api/users/cart/get-cart?status=${status}`
    );

    const data = await response.json();

    if (!response.ok) {
        return NextResponse.json(
            data,
            {
                status: response.status,
            }
        );
    }

    const cart =
        data.carts?.[0] ?? null;

    return NextResponse.json(
        cart,
        {
            status: 200,
        }
    );
}