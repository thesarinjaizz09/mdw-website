import { backendFetch } from "@/lib/server/backend";

export async function GET() {
  try {
    const response = await backendFetch(`/api/users/orders/all`, {
      credentials: "include",
    });

    const data = await response.json();

    return Response.json(data, { status: response.status });
  } catch {
    return Response.json(
      {
        success: false,
        message: "Unable to load orders",
      },
      {
        status: 401,
      }
    );
  }
}
