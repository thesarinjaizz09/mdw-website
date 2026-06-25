import { backendFetch } from "@/lib/server/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";

export async function POST() {
    const cookieStore = await cookies();

    const refreshToken =
        cookieStore.get("pharmacy_refresh")?.value;

    if (!refreshToken) {
        return NextResponse.json(
            {
                success: false,
            },
            {
                status: 401,
            }
        );
    }

    const response = await backendFetch(
        `/api/users/refresh-token`,
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                refreshToken,
            }),
        }
    );

    if (!response.ok) {
        cookieStore.delete("pharmacy_access");
        cookieStore.delete("pharmacy_refresh");

        return NextResponse.json({
            success: false,
        }, {
            status: 401,
        }
        );
    }

    const data =
        await response.json();

    await setAccessToken(data.accessToken);
    await setRefreshToken(data.refreshToken);

    return NextResponse.json({
        success: true,
    });
}