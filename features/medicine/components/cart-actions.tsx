"use client"

import { Shield, ShoppingCart, Truck, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, useCartActions } from "@/features/cart/hooks/use-cart"
import { useAddress } from "@/hooks/use-address"
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

  const { selectedAddress } = useAddress()

  // Newtown detection: prefer coordinates, fallback to pincode/address text.
  const getDeliveryLabel = () => {
    if (!selectedAddress) return "Select delivery address to see delivery time"

    const lat = (selectedAddress as any).latitude
    const lng = (selectedAddress as any).longitude

    // center point (backend fallback uses 22.5726, 88.4639 for New Town)
    const centerLat = 22.5726
    const centerLng = 88.4639

    const toRad = (v: number) => (v * Math.PI) / 180
    if (typeof lat === "number" && typeof lng === "number") {
      const R = 6371000 // meters
      const dLat = toRad(lat - centerLat)
      const dLon = toRad(lng - centerLng)
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(centerLat)) *
          Math.cos(toRad(lat)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distance = R * c

      // Assume Newtown service area ~ 15000m radius from center
      if (distance <= 15000) return "Easy 20 Min Delivery"
      return "Will be delivered within 7 to 9 PM"
    }

    // Fallback: check pincode or address text. This mirrors the backend's
    // existing geocodingService "known Kolkata areas" list — the same
    // localities the backend geocoder maps to the Newtown warehouse point
    // (22.5726, 88.4639, pincode 700156) for delivery estimation.
    const pincode = selectedAddress.pincode || ""
    const text = `${selectedAddress.label} ${selectedAddress.line1} ${selectedAddress.line2} ${pincode}`.toLowerCase()
    const approvedLocalities = ["newtown", "new town", "salt lake", "saltlake", "rajarhat"]
    const matchesNewtownArea =
      approvedLocalities.some((locality) => text.includes(locality)) ||
      pincode.includes("700156")
    if (matchesNewtownArea) {
      return "Easy 20 Min Delivery"
    }

    return "Will be delivered within 7 to 9 PM"
  }

  const deliveryLabel = getDeliveryLabel()

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
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield className="h-4 w-4 text-[#F4568B]" />
          100% Genuine Medicines
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield className="h-4 w-4 text-[#F4568B]" />
          Secure Payments
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Truck className="h-4 w-4 text-[#F4568B]" />
          {deliveryLabel}
        </div>
      </div>
    </div>
  )
}
