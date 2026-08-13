import { cookies } from "next/headers";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";

function buildCookieHeader(accessToken?: string, refreshToken?: string) {
  const cookiesHeader = [];

  if (accessToken) cookiesHeader.push(`accessToken=${accessToken}`);
  if (refreshToken) cookiesHeader.push(`refreshToken=${refreshToken}`);

  return cookiesHeader.join("; ");
}

export async function backendFetch(endpoint: string, options?: RequestInit) {
  const cookieStore = await cookies();

  const accessToken =
    cookieStore.get("accessToken")?.value ??
    cookieStore.get("pharmacy_access")?.value;
  const refreshToken =
    cookieStore.get("refreshToken")?.value ??
    cookieStore.get("pharmacy_refresh")?.value;

  const headers = new Headers(options?.headers ?? {});

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const cookieHeader = buildCookieHeader(accessToken, refreshToken);
  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  if (!refreshToken) {
    return response;
  }

  const refreshResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    }
  );

  if (!refreshResponse.ok) {
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    cookieStore.delete("pharmacy_access");
    cookieStore.delete("pharmacy_refresh");
    return response;
  }

  const refreshed = await refreshResponse.json();

  await setAccessToken(refreshed.accessToken);
  await setRefreshToken(refreshed.refreshToken);

  const refreshedAccessToken = refreshed.accessToken ?? accessToken;
  const refreshedHeaders = new Headers(options?.headers ?? {});
  refreshedHeaders.set("Authorization", `Bearer ${refreshedAccessToken}`);
  refreshedHeaders.set(
    "Cookie",
    buildCookieHeader(refreshed.accessToken ?? accessToken, refreshed.refreshToken ?? refreshToken)
  );

  response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers: refreshedHeaders,
  });

  return response;
}
