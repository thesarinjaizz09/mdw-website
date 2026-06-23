"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InStockBadge, MedicineImagePlaceholder, PriceDisplay } from "@/components/shared";
import type { Medicine } from "@/types";
import { useRouter } from "next/navigation";

const CARD_COLORS = ["blue", "green", "orange", "purple", "teal"] as const;

interface MedicineCardProps {
  medicine: Medicine;
  index?: number;
  onAddToCart?: (medicine: Medicine) => void;
  variant?: "default" | "compact";
}

export function MedicineCard({ medicine, index = 0, onAddToCart, variant = "default" }: MedicineCardProps) {
  const color = CARD_COLORS[index % CARD_COLORS.length];
  const router = useRouter();

  const handleNavigation = () => router.push(`/medicine/${medicine._id}`);

  // return null;
  if (variant === "compact") {
    return (
      <div className="flex flex-col items-center text-center p-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
        <MedicineImagePlaceholder name={medicine.name} className="w-16 h-12 mb-1.5" color={color} />
        <p className="text-xs font-medium text-gray-800 line-clamp-1">{medicine.name.split(" ").slice(0, 2).join(" ")}</p>
        <p className="text-[10px] text-gray-500">{medicine.quantity}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-3.5 hover:shadow-md hover:border-green-100 transition-all group flex flex-col" onClick={handleNavigation}>
      {/* Image area */}
      <div className="relative mb-3">
        <MedicineImagePlaceholder name={medicine.name} className="w-full h-28" color={color} />
        {/* {medicine.discount && medicine.discount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            {medicine.discount}% OFF
          </span>
        )}
        {medicine.batches && medicine.batches.length > 0 && (
          <span className="absolute top-1.5 left-1.5 bg-green-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
            {medicine.batches[0].discount}% OFF
          </span>
        )} */}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-1.5">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{medicine.name}</h3>
        <p className="text-xs text-gray-500">{medicine.quantity || medicine.totalQuantity}</p>
        <PriceDisplay price={medicine.batches ? medicine.batches[0].amount : medicine.price} mrp={medicine.batches ? medicine.batches[0].mrp : medicine.mrp} discount={medicine.batches ? medicine.batches[0].discount : medicine.discount} size="sm" />
        <InStockBadge inStock={medicine.totalQuantity ? medicine.totalQuantity > 0 : medicine.inStock} />
      </div>

      {/* Add to Cart */}
      <Button
        size="sm"
        onClick={() => onAddToCart?.(medicine)}
        className="mt-3 w-full bg-white border border-green-600 text-green-700 hover:bg-green-600 hover:text-white transition-colors h-8 text-xs font-medium rounded-md border border-gray-200 gap-1.5"
      >
        <ShoppingCart className="w-3.5 h-3.5" />
        Add to Cart
      </Button>
    </div>
  );
}