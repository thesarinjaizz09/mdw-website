import { getCurrentUser } from "@/lib/auth/get-user";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return Response.json({
      authenticated: false,
    });
  }

  return Response.json({
    authenticated: true,
    user,
  });
}