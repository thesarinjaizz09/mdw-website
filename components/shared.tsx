"use client";

import { MapPin, ShoppingCart, User, Search, Phone, ChevronDown, LocateFixed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useAddress } from "@/hooks/use-address";
import { useState } from "react";
import { useMedicineSearchStore } from "@/stores/use-medicine-search";
import { useMedicineSearch } from "@/hooks/use-medicine-search";

// ─── MDW Logo ────────────────────────────────────────────────────────────────
export function MDWLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10" };
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };
  return (
    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
      <div className={`${sizes[size]} relative`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <rect width="40" height="40" rx="6" fill="#16a34a" />
          <path d="M8 20 L16 10 L20 16 L24 10 L32 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M14 28 L20 20 L26 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-bold text-green-700 ${textSizes[size]}`}>MDW</div>
        <div className="text-[9px] text-gray-500 uppercase tracking-wide -mt-0.5">My Dawaiwala</div>
      </div>
    </Link>
  );
}

// ─── Medicine Image Placeholder ────────────────────────────────────────────────
export function MedicineImagePlaceholder({
  name,
  className = "",
  color = "blue",
}: {
  name: string;
  className?: string;
  color?: "blue" | "green" | "orange" | "purple" | "teal";
}) {
  const colors = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    green: "from-green-50 to-green-100 border-green-200",
    orange: "from-orange-50 to-orange-100 border-orange-200",
    purple: "from-purple-50 to-purple-100 border-purple-200",
    teal: "from-teal-50 to-teal-100 border-teal-200",
  };
  const abbrev = name.slice(0, 3).toUpperCase();
  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} border rounded-lg flex items-center justify-center ${className}`}
    >
      <span className="text-xs font-bold text-gray-500 opacity-60">{abbrev}</span>
    </div>
  );
}

// ─── In Stock Badge ────────────────────────────────────────────────────────────
export function InStockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span className={`flex items-center gap-1 text-xs font-medium ${inStock ? "text-green-600" : "text-red-500"}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${inStock ? "bg-green-500" : "bg-red-500"}`} />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  );
}

// ─── Price Display ─────────────────────────────────────────────────────────────
export function PriceDisplay({
  price,
  mrp,
  discount,
  size = "md",
}: {
  price: number;
  mrp: number;
  discount: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: { price: "text-sm font-bold", mrp: "text-xs", badge: "text-[9px] px-1 py-0" },
    md: { price: "text-base font-bold", mrp: "text-xs", badge: "text-[10px] px-1.5 py-0.5" },
    lg: { price: "text-2xl font-bold", mrp: "text-sm", badge: "text-xs px-2 py-0.5" },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className={`text-gray-900 ${s.price}`}>₹{price.toFixed(2)}</span>
      {/* <span className={`text-gray-400 line-through ${s.mrp}`}>₹{mrp.toFixed(2)}</span> */}
      {/* <span className={`bg-green-100 text-green-700 font-semibold rounded ${s.badge}`}>{discount}% OFF</span> */}
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function MDWHeader({ cartCount = 2 }: { cartCount?: number }) {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-5">
        <MDWLogo />

        <AddressSelector />

        {/* Right actions */}
        <div className="flex items-center gap-4 ml-auto flex-shrink-0">
          <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-green-700 transition-colors">
            <User className="w-5 h-5" />
            {/* <span className="text-[10px]">My Orders</span> */}
          </button>
          <button className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-green-700 transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-green-600 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
            {/* <span className="text-[10px]">Cart</span> */}
          </button>
        </div>
      </div>
    </header>
  );
}

// ─── Footer Trust Bar ─────────────────────────────────────────────────────────
export function MDWFooterBar() {
  const items = [
    { icon: "🛡️", label: "Drug License Approved" },
    { icon: "🔒", label: "Secure Payments" },
    { icon: "🔐", label: "100% Privacy" },
  ];
  return (
    <div className="flex items-center justify-center bg-gray-900 text-gray-300 py-3 h-12">
      <div className="flex items-center justify-center gap-8 flex-wrap">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-1.5 text-sm">
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AddressSelector() {
  const [open, setOpen] = useState(false);

  const {
    selectedAddress,
    loadingLocation,
    addresses,
    saveAddress,
    fetchCurrentLocation,
  } = useAddress();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-green-700">
          <MapPin className="w-4 h-4 text-green-600" />

          <div className="text-left">
            <div className="text-[11px] text-gray-400">
              Deliver to
            </div>

            <div className="flex items-center gap-1 font-medium text-gray-800 text-[12px]">
              {selectedAddress?.line1 ? `${selectedAddress?.line1.substring(0, 30)}...` :
                "Detecting location..."}

              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={24}
        align="start"
        className="w-60 p-0 bg-white text-black border border-gray-100 shadow-sm rounded-md overflow-hidden gap-0"
      >
        <div className="px-3 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-black text-xs">
            Delivery Address
          </h3>
        </div>

        <div className="border-t">
          {addresses.map((address) => (
            <button
              key={address.id}
              onClick={() => {
                saveAddress(address)
                setOpen(false)
              }}
              className="w-full text-left p-3 hover:bg-gray-50"
            >
              <div className="font-medium text-xs">
                {address.label}
              </div>

              <div className="text-[10px] text-gray-500">
                {address.line1}
              </div>
            </button>
          ))}
        </div>

        <div className="p-2">
          <button
            onClick={() => {
              fetchCurrentLocation()
              setOpen(false)
            }}
            disabled={loadingLocation}
            className="w-full flex items-center gap-2 rounded-md p-2 hover:bg-gray-50 border border-gray-100 text-sm"
          >
            <LocateFixed className="size-4 text-green-600" />

            <span className="text-[12px]">
              {loadingLocation
                ? "Fetching location..."
                : "Use Current Location"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function MedicineSearchInput() {
  const router = useRouter();
  const { query, setQuery } =
    useMedicineSearchStore();

  const { results, loading } =
    useMedicineSearch();

  return (
    <div className="relative">
      <div className="flex items-center border rounded-md overflow-hidden border border-gray-200">
        <input
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
          placeholder="Search medicines..."
          className="flex-1 py-3 px-3 outline-none text-black text-xs"
        />

        <button className="bg-green-600 text-white p-3">
          <Search size={18} />
        </button>
      </div>

      {(results.length > 0 ||
        loading) && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white border rounded-lg shadow-lg z-2 text-black border-gray-100 ">
            {loading && (
              <div className="p-4">
                Searching...
              </div>
            )}

            {results.map((product) => (
              <button
                key={product.productId}
                className="w-full text-left p-3 hover:bg-gray-50 border-b"
                onClick={() => {
                  setQuery("");
                  router.push(`/medicine/${product._id}`);
                }}
              >
                <div className="font-medium text-xs">
                  {product.name}
                </div>

                <div className="text-[10px] text-gray-500">
                  {product.saltName}
                </div>
              </button>
            ))}
          </div>
        )}
    </div>
  );
}