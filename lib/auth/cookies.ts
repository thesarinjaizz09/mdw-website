import { cookies } from "next/headers";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
    priority: "high" as const,
};

export async function setAccessToken(token: string) {
    const store = await cookies();

    for (const cookieName of ["accessToken", "pharmacy_access"]) {
        store.set(cookieName, token, cookieOptions);
    }
}

export async function setRefreshToken(token: string) {
    const store = await cookies();

    for (const cookieName of ["refreshToken", "pharmacy_refresh"]) {
        store.set(cookieName, token, cookieOptions);
    }
}