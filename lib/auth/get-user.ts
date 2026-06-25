import { backendFetch } from "../server/backend";

export async function getCurrentUser() {
  try {
    const response = await backendFetch("/auth/me");

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.user;
  } catch {
    return null;
  }
}