import type { CartItemData } from "@/types";

const GUEST_CART_KEY = "mdw_guest_cart";

export function getGuestCartItems(): CartItemData[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(GUEST_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => item && typeof item.productId === "string");
  } catch {
    return [];
  }
}

export function setGuestCartItems(items: CartItemData[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(GUEST_CART_KEY, JSON.stringify(items));
}

export function clearGuestCartItems() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(GUEST_CART_KEY);
}

export function addGuestCartItem(item: CartItemData) {
  const current = getGuestCartItems();
  const existingIndex = current.findIndex((entry) => entry.productId === item.productId);

  if (existingIndex >= 0) {
    current[existingIndex] = {
      ...current[existingIndex],
      quantity: current[existingIndex].quantity + item.quantity,
      amount: current[existingIndex].amount + item.amount,
    };
  } else {
    current.push(item);
  }

  setGuestCartItems(current);
  return current;
}

export function removeGuestCartItem(productId: string) {
  const current = getGuestCartItems();
  const next = current.filter((item) => item.productId !== productId);
  setGuestCartItems(next);
  return next;
}

export function updateGuestCartItems(items: CartItemData[]) {
  setGuestCartItems(items);
  return items;
}
