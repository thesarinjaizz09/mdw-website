import { backendFetch } from "@/lib/server/backend";

export async function GET() {
  try {
    const response = await backendFetch(`/api/users/address/get-addresses`, {
      credentials: "include",
    });
    const data = await response.json();

    // Forward the backend JSON as-is so client code receives the expected shape
    // (e.g. { success, message, addresses }) instead of nesting it under `data`.
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