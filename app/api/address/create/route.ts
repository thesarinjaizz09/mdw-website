import { NextResponse } from "next/server";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";
import { backendFetch } from "@/lib/server/backend";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await backendFetch(
    `/api/users/address/add-address`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return NextResponse.json({
    success: true,
    data: response,
  });
}