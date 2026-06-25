export type AuthUser = Record<string, any>;

export class AuthApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function postJson<T>(
  url: string,
  body: unknown
): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    credentials: "include",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new AuthApiError(
      data.message || "Something went wrong. Please try again.",
      res.status
    );
  }

  return data as T;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user: AuthUser;
}

export interface MessageResponse {
  success: boolean;
  message: string;
}

export const authApi = {
  login: (input: LoginInput) =>
    postJson<AuthResponse>("/api/auth/login", input),

  register: (input: RegisterInput) =>
    postJson<AuthResponse>("/api/auth/register", input),

  forgotPassword: (input: ForgotPasswordInput) =>
    postJson<MessageResponse>(
      "/api/auth/forgot-password",
      input
    ),

  resetPassword: (input: ResetPasswordInput) =>
    postJson<MessageResponse>(
      "/api/auth/reset-password",
      input
    ),
};