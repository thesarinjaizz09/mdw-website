import { cookies } from "next/headers";

export async function setAccessToken(token: string) {
    const store = await cookies();

    store.set("pharmacy_access", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60,
        priority: "high",
    });
}

export async function setRefreshToken(token: string) {
    const store = await cookies();

    store.set("pharmacy_refresh", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 30 * 24 * 60 * 60,
        priority: "high",
    });
}