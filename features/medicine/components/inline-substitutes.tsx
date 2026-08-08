"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { PriceDisplay } from "@/components/shared"
import type { SubstituteProduct } from "@/types"

interface InlineSubstitutesProps {
  substitutes: SubstituteProduct[]
}

export default function InlineSubstitutes({
  substitutes,
}: InlineSubstitutesProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  if (!substitutes || substitutes.length === 0) {
    return null
  }

  const firstSub = substitutes[0]
  const otherSubs = substitutes.slice(1)

  return (
    <div className="relative flex flex-col justify-between rounded-xl border border-green-100 bg-green-50/10 p-2 transition-all duration-200 hover:border-green-200 hover:bg-green-50/25">
      <div>
        <div className="mb-1.5 flex items-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-green-200/30 bg-green-100/60 px-2 py-0.5 text-[9px] font-bold tracking-wider text-green-700 uppercase">
            Suggested Substitute
          </span>
        </div>

        {/* Main Substitute */}
        <div className="mt-1 flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h4
              className="truncate text-xs font-semibold text-gray-800"
              title={firstSub.name}
            >
              {firstSub.name}
            </h4>
          </div>
          <div className="flex-shrink-0 text-right">
            <PriceDisplay
              price={firstSub.price}
              mrp={firstSub.mrp || firstSub.price}
              discountedAmount={firstSub.discountedAmount}
              size="sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-green-100/60 pt-2.5">
        <button
          onClick={() => router.push(`/medicine/${firstSub._id}`)}
          className="inline-flex items-center gap-0.5 text-[10px] font-bold text-green-600 transition-colors hover:text-green-700"
        >
          View Details <ArrowRight className="h-3 w-3" />
        </button>

        {/* View More button if multiple */}
        {substitutes.length > 1 && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-0.5 text-[10px] font-bold text-gray-500 transition-colors hover:text-gray-700"
          >
            {substitutes.length - 1} More{" "}
            {isOpen ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>

      {/* Dropdown Menu / Popover List */}
      {isOpen && otherSubs.length > 0 && (
        <div className="border-gray-150/80 absolute top-full right-0 left-0 z-30 mt-1.5 max-h-40 space-y-0.5 overflow-y-auto rounded-xl border bg-white p-1.5 shadow-lg">
          {otherSubs.map((sub) => (
            <div
              key={sub.productId}
              onClick={() => router.push(`/medicine/${sub._id}`)}
              className="flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50"
            >
              <div className="min-w-0 flex-1 pr-2">
                <p className="truncate text-xs font-semibold text-gray-700">
                  {sub.name}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1.5 text-right">
                <PriceDisplay
                  price={sub.price}
                  mrp={sub.mrp || sub.price}
                  discountedAmount={sub.discountedAmount}
                  size="sm"
                />
                <ArrowRight className="h-3 w-3 text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
