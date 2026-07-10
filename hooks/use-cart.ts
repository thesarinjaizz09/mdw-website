"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { toast } from "sonner";
import type { CartItemData, CartSummary } from "@/types";
import { fetchCart, addCartItem, updateCartItem, removeCartItem, clearCart, mergeGuestCart } from "@/lib/apu/cart";
import { addGuestCartItem, clearGuestCartItems, getGuestCartItems, updateGuestCartItems } from "@/lib/guest-cart";
import { useAuth } from "@/providers/auth-provider";

const CART_QUERY_KEY = ["cart"];
const GUEST_CART_QUERY_KEY = ["cart", "guest"];

export function useCart() {
  const { user, loading } = useAuth();

  const cartQuery = useQuery<CartSummary | null, Error>({
    queryKey: CART_QUERY_KEY,
    queryFn: fetchCart,
    enabled: !loading && !!user,
    staleTime: 30 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const guestCartQuery = useQuery<CartItemData[], Error>({
    queryKey: GUEST_CART_QUERY_KEY,
    queryFn: () => Promise.resolve(getGuestCartItems()),
    enabled: !loading && !user,
    staleTime: 0,
  });

  const cart = cartQuery.data ?? null;
  const guestItems = guestCartQuery.data ?? [];
  const isGuest = !loading && !user;

  const itemCount = useMemo(() => {
    if (isGuest) {
      return guestItems.reduce((sum, item) => sum + item.quantity, 0);
    }
    return cart?.itemCount ?? 0;
  }, [cart, guestItems, isGuest]);

  const totalAmount = useMemo(() => {
    if (isGuest) {
      return guestItems.reduce(
        (sum, item) => sum + item.amount,
        0
      );
    }

    return cart?.totalAmount ?? cart?.pricing?.subtotal ?? 0;
  }, [cart, guestItems, isGuest]);

  return {
    cart,
    guestItems,
    isGuest,
    itemCount,
    totalAmount,
    isLoading: loading || cartQuery.isLoading || guestCartQuery.isLoading,
    isFetching: cartQuery.isFetching || guestCartQuery.isFetching,
    isError: cartQuery.isError,
    error: cartQuery.error,
    refetch: () => (isGuest ? guestCartQuery.refetch() : cartQuery.refetch()),
  };
}

export function useCartActions() {
  const qc = useQueryClient();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const guestItems = getGuestCartItems();
    if (guestItems.length === 0) {
      return;
    }

    mergeGuestCart(guestItems)
      .then((cart) => {
        qc.setQueryData(CART_QUERY_KEY, cart);
        clearGuestCartItems();
        qc.invalidateQueries({ queryKey: GUEST_CART_QUERY_KEY });
      })
      .catch(() => {
        // ignore guest merge failures until next attempt
      });
  }, [user, qc]);

  const addToCart = useMutation<CartSummary | null, Error, {
    productId: string;
    quantity: number;
    productName?: string;
    amount?: number;
    unitPrice?: number;
  }>({
    mutationFn: async ({
      productId,
      quantity,
      productName,
      amount,
    }) => {
      console.log("Adding to cart:", { productId, quantity, productName, amount });
      if (!user) {
        const currentGuest = addGuestCartItem({
          productId,
          productName: productName ?? "",
          quantity,
          amount: amount ?? 0,
        });
        updateGuestCartItems(currentGuest);
        return null;
      }
      return addCartItem({ productId, quantity });
    },
    onSuccess: () => {
      if (!user) {
        toast.success("Added to cart as guest. Sign in to save it.");
        qc.invalidateQueries({ queryKey: GUEST_CART_QUERY_KEY });
      } else {
        toast.success("Added to cart.");
        qc.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
    },
    onError: (err) => {
      toast.error(err.message || "Could not add to cart.");
    },
  });

  const updateCart = useMutation<CartSummary | null, Error, { items: CartItemData[]; cartId?: string }>({
    mutationFn: async ({ items, cartId }) => {
      if (!user) {
        updateGuestCartItems(items);
        return null;
      }
      return updateCartItem(items, cartId);
    },
    onSuccess: (data) => {
      if (data && Array.isArray(data.items) && typeof data.itemCount === "number") {
        qc.setQueryData(CART_QUERY_KEY, data);
      }
      qc.invalidateQueries({ queryKey: CART_QUERY_KEY });
      if (!user) {
        qc.invalidateQueries({ queryKey: GUEST_CART_QUERY_KEY });
      }
      toast.success("Cart updated.");
    },
    onError: (err) => {
      toast.error(err.message || "Could not update cart.");
    },
  });

  const removeFromCart = useMutation<CartSummary | null, Error, string>({
    mutationFn: async (productId: string) => {
      if (!user) {
        const updatedGuest = getGuestCartItems().filter((item) => item.productId !== productId);
        updateGuestCartItems(updatedGuest);
        return null;
      }
      return removeCartItem(productId);
    },
    onSuccess: () => {
      toast.success("Item removed from cart.");
      if (!user) {
        qc.invalidateQueries({ queryKey: GUEST_CART_QUERY_KEY });
      } else {
        qc.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
    },
    onError: (err) => {
      toast.error(err.message || "Could not remove item from cart.");
    },
  });

  const clearCartItems = useMutation<CartSummary | null, Error, void>({
    mutationFn: async () => {
      if (!user) {
        clearGuestCartItems();
        return null;
      }
      return clearCart();
    },
    onSuccess: () => {
      toast.success("Cart cleared.");
      if (!user) {
        qc.invalidateQueries({ queryKey: GUEST_CART_QUERY_KEY });
      } else {
        qc.invalidateQueries({ queryKey: CART_QUERY_KEY });
      }
    },
    onError: (err) => {
      toast.error(err.message || "Could not clear cart.");
    },
  });

  return {
    addToCart,
    updateCart,
    removeFromCart,
    clearCartItems,
  };
}
