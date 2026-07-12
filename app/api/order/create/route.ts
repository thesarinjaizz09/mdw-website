import { NextResponse } from "next/server";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";
import { backendFetch } from "@/lib/server/backend";

export async function POST(req: Request) {
    const body = await req.json();

    const response = await backendFetch(
        `/api/users/orders/create-order`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
}