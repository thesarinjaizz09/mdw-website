import type {
  Coupon,
  CouponValidationRequest,
  CouponValidationResponse,
  CouponUsage,
} from "@/types";

export class CouponApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new CouponApiError(
      data?.message || "Coupon request failed.",
      response.status
    );
  }

  return data as T;
}

async function localFetch<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    credentials: "include",
    ...options,
  });
  return parseJson<T>(response);
}

/**
 * GET /api/coupons — fetch available (active, valid) coupons.
 * When the user is authenticated the per-user usage limit is respected.
 */
export async function fetchAvailableCoupons(): Promise<Coupon[]> {
  const data = await localFetch<{ success: boolean; data: Coupon[] }>(
    "/api/coupons",
    { method: "GET" }
  );
  return data.data ?? [];
}

/**
 * GET /api/coupons/:code — fetch a single coupon by code (for browsing).
 * Returns null when the coupon does not exist or is not available.
 */
export async function fetchCouponDetails(code: string): Promise<Coupon | null> {
  try {
    const data = await localFetch<{ success: boolean; data: Coupon }>(
      `/api/coupons/${encodeURIComponent(code)}`,
      { method: "GET" }
    );
    return data.data ?? null;
  } catch (err) {
    if (err instanceof CouponApiError && err.status === 404) {
      return null;
    }
    throw err;
  }
}

/**
 * POST /api/coupons/validate — validate a coupon against the current cart.
 * The backend performs ALL eligibility checks; the frontend only displays
 * the result.
 */
export async function validateCustomerCoupon(
  payload: CouponValidationRequest
): Promise<CouponValidationResponse> {
  const data = await localFetch<CouponValidationResponse>(
    "/api/coupons/validate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  return data;
}

/**
 * GET /api/coupons/my-usage — fetch current user's coupon usage history.
 */
export async function fetchMyCouponUsage(): Promise<CouponUsage[]> {
  const data = await localFetch<{ success: boolean; data: CouponUsage[] }>(
    "/api/coupons/my-usage",
    { method: "GET" }
  );
  return data.data ?? [];
}
