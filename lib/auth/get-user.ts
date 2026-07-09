import { backendFetch } from "../server/backend";

export async function getCurrentUser() {
  try {
    const response = await backendFetch("/api/users/profile");
    // Log response details for debugging authentication flow
    // console.log({
    //   url: "/api/users/profile",
    //   ok: response.ok,
    //   status: response.status,
    //   statusText: response.statusText,
    // });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data;
  } catch {
    return null;
  }
}
