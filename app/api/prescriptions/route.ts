import { backendFetch } from "@/lib/server/backend";

export async function GET(req: Request) {
  try {
    const page = req.headers.get("page") || 1;
    const response = await backendFetch(`/prescriptions?page=${page}&limit=5`, {
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
