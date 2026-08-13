// lib/product-availability.ts
//
// Single source of truth for computing a product's sellability from the
// actual backend product/inventory data (batches + expiry + status).
//
// Rules:
//   * A batch is sellable when it is NOT expired (expireAt in the future)
//     and has quantity > 0.
//   * A product is "In Stock" when it has at least one sellable batch.
//   * A product is "Expired" when it has batches and every batch is expired.
//   * A product is "Out of Stock" when it has no sellable batch (but isn't
//     simply all-expired), or its explicit status is "Not Available".
//   * When no batch data is present (static/legacy rows) we fall back to
//     `totalQuantity` / `inStock`.

import type { Medicine } from "@/types";

export type ProductAvailabilityState = "available" | "out_of_stock" | "expired";

export interface ProductAvailability {
  inStock: boolean;
  isOutOfStock: boolean;
  isExpired: boolean;
  state: ProductAvailabilityState;
  label: string;
}

const OUT_OF_STOCK: ProductAvailability = {
  inStock: false,
  isOutOfStock: true,
  isExpired: false,
  state: "out_of_stock",
  label: "Out of Stock",
};

function availability(
  inStock: boolean,
  isExpired: boolean,
  state: ProductAvailabilityState,
  label: string
): ProductAvailability {
  return {
    inStock,
    isOutOfStock: !inStock && !isExpired,
    isExpired,
    state,
    label,
  };
}

export function getProductAvailability(
  product?: Partial<Medicine> | null
): ProductAvailability {
  if (!product) return OUT_OF_STOCK;

  const batches = Array.isArray((product as any).batches)
    ? (product as any).batches
    : [];
  const hasBatches = batches.length > 0;

  const now = new Date();

  if (hasBatches) {
    const sellable = batches.some((batch: any) => {
      if (!batch) return false;
      const expired = batch.expireAt ? new Date(batch.expireAt) <= now : false;
      const qty = Number(batch.quantity || 0);
      return !expired && qty > 0;
    });

    if (sellable) {
      return availability(true, false, "available", "In Stock");
    }

    // No sellable batch. Prefer an explicit expiry state when all batches
    // have actually lapsed, otherwise treat it as simply out of stock.
    const allExpired =
      hasBatches &&
      batches.every((batch: any) => {
        if (!batch || !batch.expireAt) return false;
        return new Date(batch.expireAt) <= now;
      });

    if (allExpired) {
      return availability(false, true, "expired", "Expired");
    }
    return OUT_OF_STOCK;
  }

  // Explicit unavailable status (no batch context).
  if ((product as any).status === "Not Available") return OUT_OF_STOCK;

  // No batch data — fall back to totalQuantity / static inStock flag.
  const qty = typeof product.totalQuantity === "number"
    ? product.totalQuantity
    : null;
  const inStock = qty !== null ? qty > 0 : Boolean(product.inStock);
  return availability(
    inStock,
    false,
    inStock ? "available" : "out_of_stock",
    inStock ? "In Stock" : "Out of Stock"
  );
}
