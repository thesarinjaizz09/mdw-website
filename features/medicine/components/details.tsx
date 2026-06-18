"use client";

import { useState } from "react";
import { Star, ShoppingCart, Zap, ChevronRight, Shield, CheckCircle, Truck, MapPin, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, PriceDisplay, InStockBadge } from "@/components/shared";
import type { Medicine } from "@/types";
import { MEDICINES } from "@/types";

const TABS = ["Description", "How to Use", "Side Effects", "FAQs"];

const DESCRIPTION = `Crocin 650 Tablet is a pain reliever and fever reducer. It is used to relieve conditions like headache, muscle pain, joint pain, back pain, toothache, sore throat, and fever.`;

interface ProductDetailPageProps {
  medicine?: Medicine;
}

export default function MedicineDetailPage({ medicine = MEDICINES[4] }: ProductDetailPageProps) {
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [selectedImage, setSelectedImage] = useState(0);

  const CARD_COLORS = ["blue", "green", "orange", "purple"] as const;
  const thumbColors = ["blue", "green", "orange", "purple"] as const;

  return (
    <div className="bg-gray-50 flex-1 flex flex-col min-h-screen">
      <MDWHeader cartCount={2} />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6">
          {["Home", "Medicines", "Pain Relief", medicine.name].map((crumb, i, arr) => (
            <span key={crumb} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <button className="hover:text-green-600 transition-colors">{crumb}</button>
              ) : (
                <span className="text-gray-700 font-medium">{crumb}</span>
              )}
              {i < arr.length - 1 && <ChevronRight className="w-3 h-3" />}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Images + Description */}
          <div className="lg:col-span-2 space-y-4">
            {/* Product card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <div className="flex gap-8">
                {/* Images */}
                <div className="flex flex-col items-center gap-3">
                  {/* Main image */}
                  <div className="relative">
                    <MedicineImagePlaceholder
                      name={medicine.name}
                      className="w-48 h-48"
                      color={CARD_COLORS[selectedImage % 4]}
                    />
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      BEST<br />SELLER
                    </span>
                  </div>
                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {thumbColors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`w-12 h-12 rounded-lg border-2 overflow-hidden transition-all ${selectedImage === i ? "border-green-500" : "border-gray-200"
                          }`}
                      >
                        <MedicineImagePlaceholder name={medicine.name} className="w-full h-full" color={color} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{medicine.name}</h1>
                    <p className="text-sm text-gray-500">{medicine.subtitle}</p>
                    <p className="text-sm text-gray-500">{medicine.quantity}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-green-50 border border-green-200 rounded px-1.5 py-0.5">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-semibold text-gray-800">{medicine.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      ({medicine.reviews?.toLocaleString()} ratings)
                    </span>
                    <span className="text-xs text-gray-400">|</span>
                    <span className="text-xs text-gray-500">{medicine.orders} orders this month</span>
                  </div>

                  {/* Price */}
                  <div className="space-y-0.5">
                    <PriceDisplay price={medicine.price} mrp={medicine.mrp} discount={medicine.discount} size="lg" />
                    <p className="text-[10px] text-gray-400">Inclusive of all taxes</p>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2">
                    <InStockBadge inStock={medicine.inStock} />
                    <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                      <Zap className="w-3.5 h-3.5" /> Fast Delivery
                    </span>
                  </div>

                  {/* Highlights */}
                  <div>
                    <p className="text-sm font-semibold text-gray-800 mb-2">Product Highlights</p>
                    <ul className="space-y-1.5">
                      {medicine.highlights?.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Description tabs */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-5 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === tab
                        ? "text-green-700 border-green-600"
                        : "text-gray-500 border-transparent hover:text-gray-700"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-5">
                {activeTab === "Description" && (
                  <p className="text-sm text-gray-600 leading-relaxed">{DESCRIPTION}</p>
                )}
                {activeTab === "How to Use" && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Take this medication by mouth as directed. Swallow the tablet whole. Do not crush or chew. Take with
                    or without food. Do not exceed the recommended dose.
                  </p>
                )}
                {activeTab === "Side Effects" && (
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Nausea, vomiting, or stomach upset may occur. If any of these effects persist or worsen, contact your
                    doctor. Serious side effects are rare when used as directed.
                  </p>
                )}
                {activeTab === "FAQs" && (
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Can I take this on an empty stomach?</p>
                      <p className="text-sm text-gray-600 mt-0.5">Yes, it can be taken with or without food.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Delivery + Cart */}
          <div className="space-y-4">
            {/* Delivery card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-4">
              <h3 className="font-semibold text-gray-900 text-sm">Delivery Details</h3>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-500 text-xs">Deliver to</p>
                  <p className="font-medium text-gray-800">New Town, Kolkata - 700156</p>
                  <button className="text-green-600 text-xs hover:text-green-700">Change</button>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="text-gray-500 text-xs">Delivery by</p>
                  <p className="font-semibold text-green-600">Tomorrow, 21 May</p>
                  <p className="text-[10px] text-gray-500">Free Delivery above ₹199</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">Quantity</span>
                  <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-2 py-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-green-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-green-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-10 rounded-lg font-semibold gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-green-600 text-green-700 hover:bg-green-50 h-10 rounded-lg font-semibold"
                >
                  Buy Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="border-t border-gray-100 pt-3 space-y-2">
                {[
                  { icon: <Shield className="w-4 h-4 text-green-600" />, label: "100% Genuine Medicines" },
                  { icon: <Shield className="w-4 h-4 text-green-600" />, label: "Secure Payments" },
                  { icon: <Truck className="w-4 h-4 text-green-600" />, label: "Easy 20 Min Delivery" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-xs text-gray-600">
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  );
}
