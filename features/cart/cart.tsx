"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, PriceDisplay } from "@/components/shared";
import { useCart, useCartActions } from "@/hooks/use-cart";
import type { CartItemData } from "@/types";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cart, guestItems, isGuest, itemCount, totalAmount, isLoading } = useCart();
  const { updateCart, removeFromCart, clearCartItems } = useCartActions();
  const [coupon, setCoupon] = useState("");

  const cartItems: CartItemData[] = isGuest ? guestItems : (cart?.items ?? []);

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

  const lineTotal = (item: CartItemData) => item.amount;
  const unitPrice = (item: CartItemData) =>
    item.unitPrice ?? (item.quantity > 0 ? item.amount / item.quantity : item.amount);

  const itemTotal = cartItems.reduce((sum, item) => sum + lineTotal(item), 0);
  const handlingCharges = Math.max(0, totalAmount - itemTotal);
  const deliveryCharges: number = 0;
  const totalPayable = totalAmount ?? itemTotal + handlingCharges + deliveryCharges;
  const mrpTotal = itemTotal;
  const discount = 0;

  const CARD_COLORS = ["blue", "green", "orange", "purple", "teal"] as const;
  const medicineColorMap: Record<string, typeof CARD_COLORS[number]> = {
    "crocin-650": "blue",
    "ecosprin-75": "green",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex-1 flex flex-col justify-between">
      <MDWHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">
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
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={() => router.push("/medicine")}>Shop Medicines</Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 space-y-3">
                {cartItems.map((item) => (
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
                        price={unitPrice(item)}
                        mrp={unitPrice(item)}
                        discount={0}
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
                        <span className="text-sm font-medium text-gray-700">₹{lineTotal(item).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => router.push("/medicine")}
                  className="w-full py-3 text-sm text-green-600 font-medium hover:text-green-700 border border-dashed border-green-300 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add more items
                </button>

                {/* <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-green-600" />
                  Apply Coupon
                </h3>
                <div className="flex gap-2">
                  <Input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 h-9"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-green-600 font-semibold h-9 hover:bg-green-50"
                  >
                    Apply
                  </Button>
                </div>
              </div> */}
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 max-h-[350px]">
                <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
                <div className="space-y-3 text-sm">
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
                  <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                    <span>Total</span>
                    <span>₹{totalPayable.toFixed(2)}</span>
                  </div>
                </div>

                <Button onClick={() => router.push("/checkout") } className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white h-11 rounded-lg font-semibold text-sm">
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50 h-11 rounded-lg font-semibold text-sm"
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