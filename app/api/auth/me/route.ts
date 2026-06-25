import { backendFetch } from "@/lib/server/backend";

export async function GET() {
  try {
    const response = await backendFetch("/api/users/profile");

    const data = await response.json();

    return Response.json(data);
  } catch {
    return Response.json(
      {
        success: false,
      },
      {
        status: 401,
      }
    );
  }
}