"use client";

import { useState } from "react";
import { CheckCircle, Plus, MessageCircle, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar } from "@/components/shared";
import { useCart } from "@/hooks/use-cart";
import { ADDRESSES } from "@/types";

const PAYMENT_OPTIONS = [
  { id: "upi", label: "UPI", icon: "📱" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "netbanking", label: "Net Banking", icon: "🏦" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

export default function CheckoutPage() {
  const { itemCount, totalAmount } = useCart();
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [selectedPayment, setSelectedPayment] = useState("upi");

  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader />

      <main className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Left: Steps */}
          <div className="lg:col-span-3 space-y-4">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    1
                  </span>
                  <h2 className="font-semibold text-gray-900">Delivery Address</h2>
                </div>
                <button className="text-green-600 text-sm font-medium hover:text-green-700">Change</button>
              </div>

              <div className="p-4 space-y-3">
                {ADDRESSES.map((addr) => (
                  <label
                    key={addr.id}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                      selectedAddress === addr.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-900 text-sm">{addr.label}</span>
                        {selectedAddress === addr.id && (
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-0.5">{addr.line1}</p>
                      <p className="text-xs text-gray-600">{addr.line2}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Phone: {addr.phone}</p>
                    </div>
                    <input
                      type="radio"
                      name="address"
                      value={addr.id}
                      checked={selectedAddress === addr.id}
                      onChange={() => setSelectedAddress(addr.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 transition-all ${
                        selectedAddress === addr.id
                          ? "border-green-600 bg-green-600"
                          : "border-gray-300"
                      }`}
                    />
                  </label>
                ))}

                <button className="flex items-center gap-2 text-sm text-green-600 font-medium hover:text-green-700 mt-1 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add New Address
                </button>
              </div>
            </div>

            {/* Step 2: Payment */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 p-4 border-b border-gray-100">
                <span className="w-6 h-6 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  2
                </span>
                <h2 className="font-semibold text-gray-900">Payment Options</h2>
              </div>

              <div className="p-4 space-y-2">
                {PAYMENT_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-3.5 rounded-lg border cursor-pointer transition-all ${
                      selectedPayment === option.id
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{option.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{option.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedPayment === option.id && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                      <div
                        className={`w-4 h-4 rounded-full border-2 transition-all ${
                          selectedPayment === option.id
                            ? "border-green-600 bg-green-600"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={selectedPayment === option.id}
                      onChange={() => setSelectedPayment(option.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* T&C note */}
            <p className="text-xs text-gray-400 text-center px-4">
              By placing your order, you agree to MDW's{" "}
              <button className="text-green-600 hover:underline">Terms & Conditions</button> and{" "}
              <button className="text-green-600 hover:underline">Privacy Policy</button>
            </p>
          </div>

          {/* Right: Order summary */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-gray-700">
                  <span>{itemCount} Item{itemCount !== 1 ? "s" : ""}</span>
                  <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery</span>
                  <span className="font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Packaging Charges</span>
                  <span className="font-medium">-₹8.00</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Delivery Charges</span>
                  <span className="font-semibold">FREE</span>
                </div>

                <div className="bg-green-50 text-green-700 text-xs font-medium py-1.5 px-2 rounded-lg text-center">
                  You saved ₹8.00
                </div>
              </div>

              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white h-11 rounded-lg font-semibold">
                Place Order
              </Button>

              <div className="flex items-center justify-center gap-1.5 mt-2.5 text-xs text-gray-500">
                <Shield className="w-3.5 h-3.5 text-green-500" />
                100% Secure Payments
              </div>

              {/* Need Help */}
              <div className="border-t border-gray-100 mt-4 pt-4">
                <h4 className="text-xs font-semibold text-gray-700 mb-2.5">Need Help?</h4>
                <div className="space-y-2">
                  <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-green-600 transition-colors">
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    Chat on WhatsApp
                  </button>
                  <button className="flex items-center gap-2 text-xs text-gray-600 hover:text-green-600 transition-colors">
                    <Phone className="w-4 h-4 text-green-500" />
                    +91 98745 67890
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  );
}