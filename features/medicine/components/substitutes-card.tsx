"use client"

import { useRouter } from "next/navigation"
import { ShoppingCart, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart, useCartActions } from "@/hooks/use-cart"
import { PriceDisplay } from "@/components/shared"
import type { SubstituteProduct } from "@/types"
import { useCart, useCartActions } from "@/features/cart/hooks/use-cart"

interface SubstituteMedicinesCardProps {
  substitutes: SubstituteProduct[]
}

export default function SubstituteMedicinesCard({
  substitutes,
}: SubstituteMedicinesCardProps) {
  const router = useRouter()
  const { cart, guestItems, isGuest } = useCart()
  const { addToCart, removeFromCart } = useCartActions()

  const cartItems = isGuest ? guestItems : (cart?.items ?? [])

  if (!substitutes || substitutes.length === 0) {
    return null
  }

  return (
    <Card className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <CardHeader className="border-b border-gray-50 pb-3">
        <CardTitle className="text-sm font-semibold text-gray-900">
          Substitute Medicines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="space-y-3">
          {substitutes.map((sub) => {
            const isAdded = cartItems.some((item) => item.productId === sub._id)
            const isAdding =
              addToCart.status === "pending" &&
              addToCart.variables?.productId === sub._id
            const isRemoving =
              removeFromCart.status === "pending" &&
              removeFromCart.variables === sub._id

            return (
              <div
                key={sub.productId}
                className="group hover:border-green-150 flex flex-col gap-2 rounded-lg border border-gray-100 bg-gray-50/30 p-3 transition-all hover:bg-green-50/5"
              >
                {/* Clickable Area: Title and Price */}
                <div
                  onClick={() => router.push(`/medicine/${sub.productId}`)}
                  className="flex cursor-pointer items-start justify-between"
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <h4 className="line-clamp-2 text-xs font-semibold text-gray-800 transition-colors group-hover:text-green-600">
                      {sub.name}
                    </h4>
                    <p className="mt-0.5 text-[10px] text-gray-400">
                      Same Composition
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <PriceDisplay
                      price={sub.price}
                      mrp={sub.mrp || sub.price}
                      discountedAmount={sub.discountedAmount}
                      size="sm"
                    />
                    <p className="text-[8px] text-gray-400">Cheapest Price</p>
                  </div>
                </div>

                {/* Cart Action Button */}
                <div className="mt-1 flex items-center justify-between gap-2 border-t border-gray-100/60 pt-2">
                  <button
                    onClick={() => router.push(`/medicine/${sub.productId}`)}
                    className="inline-flex items-center gap-0.5 text-[10px] font-medium text-green-600 transition-colors hover:text-green-700"
                  >
                    View Details <ArrowRight className="h-2.5 w-2.5" />
                  </button>

                  {!isAdded ? (
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={isAdding}
                      onClick={() =>
                        addToCart.mutate({
                          productId: sub._id,
                          quantity: 1,
                          productName: sub.name,
                          amount: sub.price,
                          unitPrice: sub.price,
                        })
                      }
                      className="h-7 gap-1 rounded border-green-100 bg-green-50/50 px-2.5 text-[10px] font-semibold text-green-700 transition-all hover:border-green-600 hover:bg-green-600 hover:text-white"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={isRemoving}
                      onClick={() => removeFromCart.mutate(sub._id)}
                      className="h-7 gap-1 rounded px-2.5 text-[10px] font-semibold text-red-500 transition-all hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                      {isRemoving ? "Removing..." : "Remove"}
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
