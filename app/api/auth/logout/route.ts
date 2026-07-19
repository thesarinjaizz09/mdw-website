import { NextResponse } from "next/server";
import { setAccessToken, setRefreshToken } from "@/lib/auth/cookies";

export async function GET(req: Request) {
  await setAccessToken("");
  await setRefreshToken("");

  return NextResponse.json({
    success: true
  });
}