import { NextResponse } from "next/server";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";
import { backendFetch } from "@/lib/server/backend";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await backendFetch(
    `/api/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      { message: data.message },
      { status: response.status }
    );
  }

  await setAccessToken(data.accessToken);
  await setRefreshToken(data.refreshToken);

  return NextResponse.json({
    success: true,
    user: data.user,
  });
}