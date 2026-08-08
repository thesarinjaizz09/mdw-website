"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coupon } from "@/types";

interface CouponListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coupons: Coupon[];
  isLoading: boolean;
  onApply: (code: string) => void;
}

export default function CouponListDialog({
  open,
  onOpenChange,
  coupons,
  isLoading,
  onApply,
}: CouponListDialogProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatDiscount = (coupon: Coupon) => {
    if (coupon.discountType === "percentage") {
      return `${coupon.discountValue}% OFF`;
    }
    return `₹${coupon.discountValue} OFF`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-2xl p-0 border-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Available Coupons
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Select a coupon to apply to your cart. Eligibility is checked when
            you apply.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 pb-6 max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-100 rounded-xl animate-pulse"
                />
              ))}
            </div>
          ) : coupons.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No coupons available at the moment.
            </div>
          ) : (
            <div className="space-y-3">
              {coupons.map((coupon) => (
                <div
                  key={coupon._id}
                  className="border border-gray-100 rounded-xl p-4 bg-gray-50/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-mono text-sm font-semibold text-[#F4568B]">
                      {coupon.code}
                    </div>
                    <span className="text-xs bg-[#F4568B]/10 text-[#F4568B] px-2 py-0.5 rounded-full font-medium">
                      {formatDiscount(coupon)}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-800 mb-2">
                    {coupon.name}
                  </p>
                  {coupon.description && (
                    <p className="text-xs text-gray-500 mb-2">
                      {coupon.description}
                    </p>
                  )}

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-500">
                    {coupon.minimumOrderAmount > 0 && (
                      <span>
                        Min order: ₹{coupon.minimumOrderAmount.toFixed(2)}
                      </span>
                    )}
                    {coupon.maximumDiscountAmount && (
                      <span>
                        Max discount: ₹{coupon.maximumDiscountAmount.toFixed(2)}
                      </span>
                    )}
                    <span>Valid until: {formatDate(coupon.validUntil)}</span>
                  </div>

                  <Button
                    size="sm"
                    className="mt-3 w-full bg-[#F4568B] hover:bg-[#F4568B]/90 text-white h-8 rounded-lg text-xs font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      onApply(coupon.code);
                      onOpenChange(false);
                    }}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
