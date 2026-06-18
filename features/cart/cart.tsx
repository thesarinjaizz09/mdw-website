"use client";

import { useState } from "react";
import { Trash2, Plus, Minus, ShoppingBag, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, PriceDisplay } from "@/components/shared";
import type { CartItem } from "@/types";
import { MEDICINES } from "@/types";

const INITIAL_CART: CartItem[] = [
  { medicine: MEDICINES[4], quantity: 1 }, // Crocin 650
  { medicine: MEDICINES[1], quantity: 1 }, // Ecosprin 75
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [coupon, setCoupon] = useState("");

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.medicine.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.medicine.id !== id));
  };

  const itemTotal = cartItems.reduce((sum, item) => sum + item.medicine.price * item.quantity, 0);
  const mrpTotal = cartItems.reduce((sum, item) => sum + item.medicine.mrp * item.quantity, 0);
  const discount = mrpTotal - itemTotal;

  const CARD_COLORS = ["blue", "green", "orange", "purple", "teal"] as const;
  const medicineColorMap: Record<string, typeof CARD_COLORS[number]> = {
    "crocin-650": "blue",
    "ecosprin-75": "green",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader cartCount={cartItems.length} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">My Cart</h1>
        <p className="text-sm text-gray-500 mb-4">({cartItems.length} Items)</p>

        {/* Delivery address bar */}
        <div className="flex items-center justify-between bg-white rounded-lg border border-gray-100 px-4 py-2.5 mb-4 text-sm shadow-sm">
          <div className="flex items-center gap-1.5 text-gray-700">
            <span className="text-green-600">🏠</span>
            <span>Deliver to: </span>
            <span className="font-medium text-gray-900">New Town, Kolkata - 700156</span>
            <span className="text-gray-400 text-lg leading-none">🏪</span>
          </div>
          <button className="text-green-600 text-xs font-medium hover:text-green-700">Change</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Cart items */}
          <div className="lg:col-span-3 space-y-3">
            {cartItems.map((item) => (
              <div
                key={item.medicine.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4"
              >
                {/* Image */}
                <MedicineImagePlaceholder
                  name={item.medicine.name}
                  className="w-16 h-16 flex-shrink-0"
                  color={medicineColorMap[item.medicine.id] || "blue"}
                />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{item.medicine.name}</h3>
                      <p className="text-xs text-gray-500">{item.medicine.quantity}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.medicine.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <PriceDisplay
                    price={item.medicine.price}
                    mrp={item.medicine.mrp}
                    discount={item.medicine.discount}
                    size="sm"
                  />

                  {/* Qty controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.medicine.id, -1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-green-600 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-1 text-sm font-semibold text-gray-900 border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.medicine.id, 1)}
                        className="px-2.5 py-1 text-gray-500 hover:bg-gray-50 hover:text-green-600 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add more items */}
            <button className="w-full py-3 text-sm text-green-600 font-medium hover:text-green-700 border border-dashed border-green-300 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Add more Items
            </button>

            {/* Coupon */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-green-600" />
                Apply Coupon
              </h3>
              <div className="flex gap-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 h-9 px-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-400"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-green-600 font-semibold h-9 hover:bg-green-50"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>

          {/* Price details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Price Details</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>Item Total</span>
                  <span className="font-medium">₹{itemTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>MRP Total</span>
                  <span className="font-medium">₹{mrpTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Discount on MRP</span>
                  <span className="font-medium">-₹{discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="bg-green-50 text-green-700 text-xs font-medium py-1.5 px-2 rounded-lg text-center">
                  You saved ₹{discount.toFixed(2)}
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between font-bold text-gray-900 text-base">
                  <span>To Pay</span>
                  <span>₹{itemTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white h-11 rounded-lg font-semibold text-sm">
                Proceed to Checkout
              </Button>
              <Button
                variant="outline"
                className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50 h-11 rounded-lg font-semibold text-sm"
              >
                Continue Shopping
              </Button>

              <p className="text-center text-xs text-green-600 mt-3 font-medium">
                🌱 You will save ₹{discount.toFixed(2)} on this order
              </p>
            </div>
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  );
}