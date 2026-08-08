"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import type {
  AppliedCoupon,
  CartItemData,
  Coupon,
  CouponUsage,
  CouponValidationRequest,
  CouponValidationResponse,
} from "@/types";
import {
  fetchAvailableCoupons,
  fetchCouponDetails,
  validateCustomerCoupon,
  fetchMyCouponUsage,
} from "@/lib/apu/coupon";

export const COUPONS_QUERY_KEY = ["coupons"];
export const MY_USAGE_QUERY_KEY = ["coupons", "my-usage"];
export const APPLIED_COUPON_QUERY_KEY = ["applied-coupon"];

/**
 * Fetch all available (active, currently-valid) coupons.
 */
export function useAvailableCoupons() {
  return useQuery<Coupon[], Error>({
    queryKey: COUPONS_QUERY_KEY,
    queryFn: fetchAvailableCoupons,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch details for a single coupon by code.
 */
export function useCouponDetails(code: string | null) {
  return useQuery<Coupon | null, Error>({
    queryKey: ["coupons", "detail", code ?? ""],
    queryFn: () => fetchCouponDetails(code!),
    enabled: !!code,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Fetch the current user's coupon usage history.
 */
export function useMyCouponUsage() {
  return useQuery<CouponUsage[], Error>({
    queryKey: MY_USAGE_QUERY_KEY,
    queryFn: fetchMyCouponUsage,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

/**
 * Validates a coupon code against the current cart via the backend.
 * The backend performs ALL eligibility checks. The caller decides what to do
 * with the resulting AppliedCoupon (persist to cache, show toasts, etc.).
 */
export function useValidateCoupon() {
  return useMutation<AppliedCoupon | null, Error, CouponValidationRequest>({
    mutationFn: async (payload) => {
      const response = await validateCustomerCoupon(payload);
      if (!response.success) {
        throw new Error(response.message || "Coupon validation failed");
      }
      return toAppliedCoupon(response.data);
    },
  });
}

/**
 * Reads the currently applied coupon from the React Query cache.
 * Persists across Cart → Checkout navigation (shared QueryProvider).
 */
export function useAppliedCoupon() {
  return useQuery<AppliedCoupon | null, Error>({
    queryKey: APPLIED_COUPON_QUERY_KEY,
    queryFn: () => Promise.resolve(null),
    staleTime: Infinity,
    gcTime: Infinity,
    initialData: null,
    // The cache is populated by useValidateCoupon / useApplyCoupon
    retry: 0,
    refetchOnWindowFocus: false,
  });
}

/**
 * Explicitly store an applied coupon in the cache (e.g. after selecting
 * from the available-coupons list, before full validation).
 */
export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation<AppliedCoupon, Error, AppliedCoupon>({
    mutationFn: async (coupon) => coupon,
    onSuccess: (coupon) => {
      queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, coupon);
    },
  });
}

/**
 * Remove the applied coupon from the cache.
 * No backend call is needed — usage is recorded only at order creation.
 */
export function useRemoveCoupon() {
  const queryClient = useQueryClient();

  return useMutation<true, Error, void>({
    mutationFn: async () => true,
    onSuccess: () => {
      queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: APPLIED_COUPON_QUERY_KEY });
      toast.success("Coupon removed");
    },
  });
}

// ─── Helpers ───────────────────────────────────────────────────────────────

export function toAppliedCoupon(data: CouponValidationResponse["data"]): AppliedCoupon {
  return {
    code: data.couponCode,
    name: data.name,
    discountType: data.discountType,
    discountValue: data.discountValue,
    discountAmount: data.discountAmount,
    originalAmount: data.originalAmount,
    finalAmount: data.finalAmount,
    validUntil: data.validUntil,
  };
}

/** Convenience: total discount amount of the applied coupon, or 0. */
export function useCouponDiscount(): number {
  const { data: applied } = useAppliedCoupon();
  return applied?.discountAmount ?? 0;
}

/** Convenience: the applied coupon code, or null. */
export function useAppliedCouponCode(): string | null {
  const { data: applied } = useAppliedCoupon();
  return applied?.code ?? null;
}
