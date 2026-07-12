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

function normalizeCartResponse(data: any): CartSummary | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const items: CartItemData[] = Array.isArray(data.items)
    ? data.items
    : Array.isArray(data.updatedCartItems)
      ? data.updatedCartItems
      : Array.isArray(data.cartItems)
        ? data.cartItems
        : [];

  const itemCount = typeof data.itemCount === "number"
    ? data.itemCount
    : items.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const totalAmount = typeof data.totalAmount === "number"
    ? data.totalAmount
    : typeof data.subtotal === "number"
      ? data.subtotal
      : typeof data.pricing?.subtotal === "number"
        ? data.pricing.subtotal
        : items.reduce((sum, item) => sum + (item.amount || 0), 0);

  return {
    id: data._id,
    cartId: data.cartId || data.id || data._id || "",
    itemCount,
    totalAmount,
    items,
    status: data.status,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  };
}

export async function fetchCart(): Promise<CartSummary | null> {
  const response = await fetch("/api/cart", {
    method: "GET",
    credentials: "include",
  });

  if (response.status === 404) {
    return null;
  }

  const data = await parseJson<any>(response);
  return normalizeCartResponse(data);
}

export async function addCartItem(item: { productId: string; quantity: number }): Promise<CartSummary> {
  const response = await localFetch<any>("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: [item] }),
  });
  return normalizeCartResponse(response) as CartSummary;
}

export async function updateCartItem(items: CartItemData[], cartId?: string): Promise<CartSummary> {
  const response = await localFetch<any>("/api/cart/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items, cartId }),
  });
  return normalizeCartResponse(response) as CartSummary;
}

export async function removeCartItem(productId: string): Promise<CartSummary> {
  const response = await localFetch<any>("/api/cart/remove", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  return normalizeCartResponse(response) as CartSummary;
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
