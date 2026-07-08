import type { CartSummary, CartItemData } from "@/types";

export class CartApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function parseJson<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new CartApiError(
      data?.message || "Cart request failed.",
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

export async function fetchCart(): Promise<CartSummary | null> {
  const response = await fetch("/api/cart", {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 404) {
    return null;
  }

  return parseJson<CartSummary>(response);
}

export async function addCartItem(item: { productId: string; quantity: number }): Promise<CartSummary> {
  return localFetch<CartSummary>("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: [item] }),
  });
}

export async function updateCartItem(items: CartItemData[]): Promise<CartSummary> {
  return localFetch<CartSummary>("/api/cart/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
}

export async function removeCartItem(productId: string): Promise<CartSummary> {
  return localFetch<CartSummary>("/api/cart/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
}

export async function clearCart(): Promise<CartSummary> {
  return localFetch<CartSummary>("/api/cart/clear", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function mergeGuestCart(items: CartItemData[]): Promise<CartSummary> {
  return localFetch<CartSummary>("/api/cart/merge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });
}
