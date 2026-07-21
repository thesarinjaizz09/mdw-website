import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/server/backend";

export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const response = await backendFetch(
      `/api/users/complete-profile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update profile",
      },
      { status: 500 }
    );
  }
}
