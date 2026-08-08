"use client";

import { useState, useEffect } from "react";
import { Trash2, Plus, Minus, ShoppingBag, Tag, TicketPercent, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, PriceDisplay } from "@/components/shared";
import { useCart, useCartActions } from "@/features/cart/hooks/use-cart";
import {
  useAppliedCoupon,
  useAvailableCoupons,
  useValidateCoupon,
  useRemoveCoupon,
} from "@/features/coupon/hooks/use-coupon";
import { APPLIED_COUPON_QUERY_KEY } from "@/features/coupon/hooks/use-coupon";
import CouponListDialog from "@/components/coupon-list-dialog";
import type { CartItemData } from "@/types";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [couponInput, setCouponInput] = useState("");
  const [couponDialogOpen, setCouponDialogOpen] = useState(false);

  const { updateCart, removeFromCart, clearCartItems } = useCartActions();
  const { cart, guestItems, isGuest, itemCount, totalAmount, isLoading } = useCart();
  const { data: appliedCoupon } = useAppliedCoupon();
  const { data: availableCoupons, isLoading: couponsLoading } = useAvailableCoupons();
  console.log("Available Coupons:", availableCoupons);
  const validateCoupon = useValidateCoupon();
  const removeCoupon = useRemoveCoupon();

  const cartItems: CartItemData[] = isGuest ? guestItems : (cart?.items ?? []);

  // Revalidate the applied coupon whenever the cart's priced contents change,
  // so no stale discount is ever shown. The backend is the source of truth.
  useEffect(() => {
    if (!appliedCoupon?.code || isGuest || !cart?.id) {
      return;
    }
    validateCoupon.mutate(
      { code: appliedCoupon.code, cartId: cart.id },
      {
        onSuccess: (updated) => {
          if (updated) {
            queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, updated);
          }
        },
        onError: (err) => {
          queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, null);
          toast.error(err.message || "Coupon is no longer valid for your cart");
        },
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.id, totalAmount]);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;

    if (isGuest) {
      toast.error("Please sign in to apply coupons");
      router.push("/auth");
      return;
    }

    if (!cart?.id) {
      toast.error("Cart not ready yet. Please try again.");
      return;
    }

    validateCoupon.mutate(
      { code, cartId: cart.id },
      {
        onSuccess: (applied) => {
          if (applied) {
            queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, applied);
            toast.success(`Coupon "${applied.code}" applied — you saved ₹${applied.discountAmount.toFixed(2)}`);
          }
        },
        onError: (err) => {
          toast.error(err.message || "Failed to validate coupon");
        },
      }
    );
  };

  const handleSelectCoupon = (code: string) => {
    if (isGuest) {
      toast.error("Please sign in to apply coupons");
      router.push("/auth");
      return;
    }

    if (!cart?.id) {
      toast.error("Cart not ready yet. Please try again.");
      return;
    }

    validateCoupon.mutate(
      { code, cartId: cart.id },
      {
        onSuccess: (applied) => {
          if (applied) {
            queryClient.setQueryData(APPLIED_COUPON_QUERY_KEY, applied);
            toast.success(`Coupon "${applied.code}" applied — you saved ₹${applied.discountAmount.toFixed(2)}`);
          }
        },
        onError: (err) => {
          toast.error(err.message || "Failed to validate coupon");
        },
      }
    );
  };

  const handleRemoveCoupon = () => {
    removeCoupon.mutate();
  };

  const updateQty = (productId: string, delta: number) => {
    const nextItems = cartItems
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    updateCart.mutate({ items: nextItems, cartId: cart?.cartId });
  };

  const removeItem = (productId: string) => {
    removeFromCart.mutate(productId);
  };

  const getItemMRP = (item: CartItemData) =>
    item.mrp || item.productDetails?.batches?.[0]?.mrp || (item.unitPrice ?? item.amount / Math.max(1, item.quantity));

  const getItemDiscountedAmount = (item: CartItemData) =>
    item.discountedAmount || item.productDetails?.batches?.[0]?.discountedAmount;

  const getItemUnitPrice = (item: CartItemData) => {
    const d = getItemDiscountedAmount(item);
    if (d && d > 0) return d;
    return item.unitPrice ?? (item.quantity > 0 ? item.amount / item.quantity : item.amount);
  };

  const lineTotal = (item: CartItemData) => item.amount;

  const totalMRP = cartItems.reduce(
    (sum, item) => sum + getItemMRP(item) * item.quantity,
    0
  );
  const itemTotal = cartItems.reduce((sum, item) => sum + lineTotal(item), 0);
  const totalDiscount = Math.max(0, totalMRP - itemTotal);
  const handlingCharges = Math.max(0, totalAmount - itemTotal);
  const deliveryCharges: number = 0;
  const totalPayable = totalAmount ?? itemTotal + handlingCharges + deliveryCharges;
  const couponDiscount = appliedCoupon?.discountAmount ?? 0;
  const finalPayable = Math.max(0, totalPayable - couponDiscount);
  const mrpTotal = itemTotal;
  const discount = 0;

  const CARD_COLORS = ["blue", "green", "orange", "purple", "teal"] as const;
  const medicineColorMap: Record<string, typeof CARD_COLORS[number]> = {
    "crocin-650": "blue",
    "ecosprin-75": "green",
  };

  return (
    <div className=" bg-gray-50 flex-1 flex flex-col justify-between min-h-screen">
      <MDWHeader />

      <main className="w-full mx-auto max-w-7xl px-4 py-6 flex-1 flex flex-col">
        <h1 className="text-xl font-bold text-gray-900 mb-1">My Cart</h1>
        <p className="text-sm text-gray-500 mb-4">({itemCount} Items)</p>

        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-sm text-gray-600">
            Loading your cart...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-gray-700 text-lg font-semibold">Your cart is empty.</p>
            <p className="text-sm text-gray-500 mt-2">Add medicines to your cart to see them here.</p>
            <Button className="mt-4 bg-[#F4568B] hover:bg-[#F4568B]/90 text-white" onClick={() => router.push("/medicine")}>Shop Medicines</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map((item) => {
                  const itemMRP = getItemMRP(item);
                  const itemDiscountedAmount = getItemDiscountedAmount(item);
                  const unitP = getItemUnitPrice(item);
                  const hasDiscount = itemDiscountedAmount && itemDiscountedAmount > 0 && itemMRP > itemDiscountedAmount;

                  return (
                    <div
                      key={item.productId}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4"
                    >
                      <MedicineImagePlaceholder
                        name={item.productName || item.productId}
                        className="w-16 h-16 flex-shrink-0"
                        color={medicineColorMap[item.productId] || "blue"}
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{item.productName || item.productId}</h3>
                            <p className="text-xs text-gray-500">{item.quantity} unit{item.quantity !== 1 ? "s" : ""}</p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <PriceDisplay
                          price={unitP}
                          mrp={itemMRP}
                          discountedAmount={itemDiscountedAmount}
                          size="sm"
                        />

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQty(item.productId, -1)}
                              className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-green-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 text-sm font-semibold text-gray-900 border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQty(item.productId, 1)}
                              className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-green-600 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-gray-700">₹{lineTotal(item).toFixed(2)}</span>
                            {hasDiscount && (
                              <span className="text-xs text-gray-400 line-through">
                                ₹{(itemMRP * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={() => router.push("/medicine")}
                  className="w-full py-3 text-sm text-[#F4568B] font-medium hover:text-[#F4568B]/90 border border-dashed border-[#F4568B] rounded-xl hover:bg-[#F4568B]/10 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add more items
                </button>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                    <Tag className="w-4 h-4 text-[#F4568B]" />
                    Apply Coupon
                  </h3>

                  {appliedCoupon ? (
                    <div className="border border-green-200 bg-green-50/60 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        {appliedCoupon.code}
                      </div>
                      <p className="text-xs text-gray-600 mt-1.5">
                        {appliedCoupon.discountType === "percentage"
                          ? `${appliedCoupon.discountValue}% discount applied`
                          : `₹${appliedCoupon.discountValue} discount applied`}
                      </p>
                      <p className="text-xs text-green-700 font-medium mt-0.5">
                        You saved ₹{appliedCoupon.discountAmount.toFixed(2)}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2 text-red-500 font-semibold h-8 hover:bg-red-50"
                        disabled={removeCoupon.isPending}
                        onClick={handleRemoveCoupon}
                      >
                        {removeCoupon.isPending ? "Removing..." : "Remove"}
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <Input
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleApplyCoupon();
                          }}
                          placeholder="Enter coupon code"
                          disabled={isGuest || validateCoupon.isPending}
                          className="flex-1 h-9 uppercase text-black"
                        />
                        <Button
                          size="sm"
                          className="bg-[#F4568B] hover:bg-[#F4568B]/90 text-white font-semibold h-9 rounded-md"
                          disabled={isGuest || validateCoupon.isPending || !couponInput.trim()}
                          onClick={handleApplyCoupon}
                        >
                          {validateCoupon.isPending ? (
                            <span className="flex items-center gap-1.5">
                              <Spinner className="size-3" />
                              <span>Applying...</span>
                            </span>
                          ) : (
                            "Apply"
                          )}
                        </Button>
                      </div>

                      <button
                        onClick={() => setCouponDialogOpen(true)}
                        className="mt-2.5 flex items-center gap-1.5 text-xs text-[#F4568B] font-medium hover:text-[#F4568B]/80 transition-colors"
                      >
                        <TicketPercent className="w-3.5 h-3.5" />
                        View Available Coupons
                      </button>
                    </>
                  )}
                </div>

                <CouponListDialog
                  open={couponDialogOpen}
                  onOpenChange={setCouponDialogOpen}
                  coupons={availableCoupons ?? []}
                  isLoading={couponsLoading}
                  onApply={handleSelectCoupon}
                />
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-h-[380px]">
                <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
                <div className="space-y-3 text-sm">
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>Total MRP</span>
                      <span className="font-medium">₹{totalMRP.toFixed(2)}</span>
                    </div>
                  )}
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600 font-medium">
                      <span>Discount</span>
                      <span>-₹{totalDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Handling Charges</span>
                    <span className="font-medium text-gray-900">₹{handlingCharges.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Charges</span>
                    <span className="font-medium text-gray-900">{deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges.toFixed(2)}`}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span className="font-medium">−₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>₹{finalPayable.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={() => router.push("/checkout")} className="w-full mt-4 bg-[#F4568B] hover:bg-[#F4568B]/90 text-white h-11 rounded-lg font-semibold text-sm">
                  Proceed to Checkout
                </Button>
                <Button
                  // variant="outline"
                  className="bg-white w-full mt-2 text-[#F4568B] hover:bg-[#F4568B]/50 h-11 rounded-lg font-semibold text-sm hover:text-white shadow-xs"
                  onClick={() => router.push("/medicine")}
                >
                  Continue Shopping
                </Button>

                <p className="text-center text-xs text-gray-500 mt-3">
                  Prices include all applicable charges.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <MDWFooterBar />
    </div>
  );
}