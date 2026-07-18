"use client"

import { Shield, ShoppingCart, Truck, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, useCartActions } from "@/hooks/use-cart"
import { useState } from "react"

interface CartActionsProduct {
  _id: string
  name: string
}

interface CartActionsProps {
  product: CartActionsProduct
  price: number
  inStock: boolean
}

const TRUST_BADGES = [
  {
    icon: <Shield className="h-4 w-4 text-[#F4568B]" />,
    label: "100% Genuine Medicines",
  },
  {
    icon: <Shield className="h-4 w-4 text-[#F4568B]" />,
    label: "Secure Payments",
  },
  {
    icon: <Truck className="h-4 w-4 text-[#F4568B]" />,
    label: "Easy 20 Min Delivery",
  },
] as const

export default function CartActions({
  product,
  price,
  inStock,
}: CartActionsProps) {
  const [qty, setQty] = useState(1)

  const { cart, guestItems, isGuest } = useCart()
  const { addToCart, removeFromCart } = useCartActions()

  const cartItems = isGuest ? guestItems : (cart?.items ?? [])
  const isAddedToCart = cartItems.some((item) => item.productId === product._id)

  return (
    <div className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* Quantity selector + Cart button */}
      <div>
        {!isAddedToCart && (
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 px-2 py-1">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="flex h-5 w-5 items-center justify-center text-gray-500 hover:text-green-600"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-semibold text-gray-600">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="flex h-5 w-5 items-center justify-center text-gray-500 hover:text-green-600"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {!isAddedToCart ? (
          <Button
            disabled={!inStock}
            onClick={() =>
              addToCart.mutate({
                productId: product._id,
                quantity: qty,
                productName: product.name,
                amount: price,
                unitPrice: price,
              })
            }
            className="h-10 w-full gap-2 rounded-md bg-[#F4568B] font-semibold text-white hover:bg-[#F4568B]/90"
          >
            <ShoppingCart className="h-4 w-4" />
            {addToCart.status === "pending" ? "Adding..." : "Add to Cart"}
          </Button>
        ) : (
          <Button
            onClick={() => removeFromCart.mutate(product._id)}
            className="h-10 w-full gap-2 rounded-md bg-red-300 font-semibold text-black hover:bg-red-500 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            {removeFromCart.status === "pending" ? "Removing..." : "Remove from Cart"}
          </Button>
        )}
      </div>

      {/* Trust badges */}
      <div className="space-y-2 border-t border-gray-100 pt-3">
        {TRUST_BADGES.map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 text-xs text-gray-600"
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
