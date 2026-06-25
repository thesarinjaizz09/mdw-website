import { cookies } from "next/headers";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";

export async function backendFetch( 
  endpoint: string,
  options?: RequestInit
) {
  const cookieStore =
    await cookies();

  let accessToken =
    cookieStore.get(
      "pharmacy_access"
    )?.value;

  // Debug: log access token presence and endpoint
  // console.log({
  //   msg: "backendFetch called",
  //   endpoint,
  //   accessTokenPresent: !!accessToken,
  // });

  let response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...options?.headers,
        Authorization:
          `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status !== 401) {
    return response;
  }

  const refreshToken =
    cookieStore.get(
      "pharmacy_refresh"
    )?.value;

  if (!refreshToken) {
    return response;
  }

  const refreshResponse =
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/refresh-token`,
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

  if (!refreshResponse.ok) {
    cookieStore.delete(
      "pharmacy_access"
    );

    cookieStore.delete(
      "pharmacy_refresh"
    );

    return response;
  }

  const refreshed =
    await refreshResponse.json();

  await setAccessToken(
    refreshed.accessToken
  );

  await setRefreshToken(
    refreshed.refreshToken
  );

  response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      ...options,
      headers: {
        ...options?.headers,
        Authorization:
          `Bearer ${refreshed.accessToken}`,
      },
    }
  );

  return response;
}
