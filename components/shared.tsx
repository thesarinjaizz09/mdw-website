"use client"

import {
  MapPin,
  ShoppingCart,
  User,
  Search,
  Phone,
  ChevronDown,
  LocateFixed,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSession } from "@/hooks/use-session"
import { useCart, useCartActions } from "@/hooks/use-cart"
import LoginDialog from "@/components/login-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useAddress } from "@/hooks/use-address"
import { useState } from "react"
import { useMedicineSearchStore } from "@/stores/use-medicine-search"
import { useMedicineSearch } from "@/hooks/use-medicine-search"
import { Spinner } from "./ui/spinner"
import { NAV_USER_DROPDOWN_ITEMS } from "@/contants"

// ─── MDW Logo ────────────────────────────────────────────────────────────────
export function MDWLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-6 h-6", md: "w-8 h-8", lg: "w-10 h-10" }
  const textSizes = { sm: "text-sm", md: "text-base", lg: "text-xl" }
  return (
    <Link href="/medicine" className="flex flex-shrink-0 items-center gap-2">
      <div className={`${sizes[size]} relative`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <rect width="40" height="40" rx="6" fill="#F4568B" />
          <path
            d="M8 20 L16 10 L20 16 L24 10 L32 20"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M14 28 L20 20 L26 28"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <div className={`font-bold text-[#F4568B] ${textSizes[size]}`}>MDW</div>
        <div className="-mt-0.5 text-[9px] tracking-wide text-gray-500 uppercase">
          My Dawaiwala
        </div>
      </div>
    </Link>
  )
}

// ─── Medicine Image Placeholder ────────────────────────────────────────────────
export function MedicineImagePlaceholder({
  name,
  className = "",
  color = "blue",
}: {
  name: string
  className?: string
  color?: "blue" | "green" | "orange" | "purple" | "teal"
}) {
  const colors = {
    blue: "from-blue-50 to-blue-100 border-blue-200",
    green: "from-green-50 to-green-100 border-green-200",
    orange: "from-orange-50 to-orange-100 border-orange-200",
    purple: "from-purple-50 to-purple-100 border-purple-200",
    teal: "from-teal-50 to-teal-100 border-teal-200",
  }
  const abbrev = name.slice(0, 3).toUpperCase()
  return (
    <div
      className={`bg-gradient-to-br ${colors[color]} flex items-center justify-center rounded-lg border ${className}`}
    >
      <span className="text-xs font-bold text-gray-500 opacity-60">
        {abbrev}
      </span>
    </div>
  )
}

// ─── In Stock Badge ────────────────────────────────────────────────────────────
export function InStockBadge({ inStock }: { inStock: boolean }) {
  return (
    <span
      className={`flex items-center gap-1 text-xs font-medium ${inStock ? "text-[#F4568B]" : "text-red-500"}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${inStock ? "bg-[#F4568B]" : "bg-red-500"}`}
      />
      {inStock ? "In Stock" : "Out of Stock"}
    </span>
  )
}

// ─── Price Display ─────────────────────────────────────────────────────────────
export function PriceDisplay({
  price,
  mrp,
  discount,
  size = "md",
}: {
  price: number
  mrp: number
  discount: number
  size?: "sm" | "md" | "lg"
}) {
  const sizes = {
    sm: {
      price: "text-sm font-bold",
      mrp: "text-xs",
      badge: "text-[9px] px-1 py-0",
    },
    md: {
      price: "text-base font-bold",
      mrp: "text-xs",
      badge: "text-[10px] px-1.5 py-0.5",
    },
    lg: {
      price: "text-2xl font-bold",
      mrp: "text-sm",
      badge: "text-xs px-2 py-0.5",
    },
  }
  const s = sizes[size]
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-gray-900 ${s.price}`}>₹{price.toFixed(2)}</span>
      {/* <span className={`text-gray-400 line-through ${s.mrp}`}>₹{mrp.toFixed(2)}</span> */}
      {/* <span className={`bg-green-100 text-green-700 font-semibold rounded ${s.badge}`}>{discount}% OFF</span> */}
    </div>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function MDWHeader() {
  const [showLogin, setShowLogin] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const { cart, guestItems, isGuest, itemCount, totalAmount } = useCart()
  const { updateCart, removeFromCart } = useCartActions()

  const { user, loading } = useSession()

  const cartItems = isGuest ? guestItems : (cart?.items ?? [])

  const updateQty = (productId: string, delta: number) => {
    const nextItems = cartItems
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0)

    updateCart.mutate({ items: nextItems, cartId: cart?.cartId })
  }

  const removeItem = (productId: string) => {
    removeFromCart.mutate(productId)
  }
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      {/* Top bar */}
      <div className="h-16s mx-auto flex max-w-7xl items-center gap-5 px-4 py-2">
        <div className="flex flex-col gap-5 min-[500px]:flex-row">
          <MDWLogo />
          <AddressSelector />
        </div>

        {/* Right actions */}
        <div className="mb-auto ml-auto flex flex-shrink-0 items-center gap-4">
          {!loading ? (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center rounded-full p-2.5 text-gray-500 hover:bg-[#F4568B]/10 hover:text-[#F4568B] transition-colors">
                    <div className="relative">
                      <User size={20} />
                      <span className="absolute top-0 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#F4568B]"></span>
                    </div>
                  </button>
                </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white text-black border border-gray-200 rounded-md text-xs rounded-sm w-full" align="end">
                    {NAV_USER_DROPDOWN_ITEMS.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 text-xs hover:bg-gray-500 hover:text-white rounded-sm"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() =>
                    setShowLogin(true)
                  }
                  className="p-2.5 text-gray-500 hover:text-[#F4568B] hover:bg-[#F4568B]/10 rounded-full transition-colors"
                >
                  <User size={21} />
                </button>
              )) : (
                <Spinner className="size-5 text-gray-500" />
              )
          }
          <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetTrigger asChild>
              <button className="relative flex flex-col items-center gap-0.5 text-gray-600 transition-colors hover:text-[#F4568B]">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F4568B] text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full border-l border-gray-100 bg-white p-0 sm:max-w-md"
            >
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-gray-100 px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <SheetTitle className="text-lg font-semibold text-gray-900">
                        Your cart
                      </SheetTitle>
                      <SheetDescription className="text-sm text-gray-500">
                        {itemCount > 0
                          ? `${itemCount} item${itemCount !== 1 ? "s" : ""} ready for checkout`
                          : "Your cart is empty"}
                      </SheetDescription>
                    </div>
                    {/* <div className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {itemCount}
                    </div> */}
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {cartItems.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center">
                      <div className="rounded-full bg-[#F4568B]/10 p-3 text-[#F4568B]">
                        <ShoppingCart className="h-6 w-6" />
                      </div>
                      <h3 className="mt-4 text-sm font-semibold text-gray-800">
                        Your cart feels light
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add a few essentials to see them here.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false)
                          router.push("/medicine")
                        }}
                        className="mt-4 rounded-sm bg-[#F4568B] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#F4568B]/80"
                      >
                        Browse medicines
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div
                          key={item.productId}
                          className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
                        >
                          <div className="flex items-start gap-3">
                            <MedicineImagePlaceholder
                              name={item.productName || item.productId}
                              className="h-14 w-14 flex-shrink-0"
                              color="green"
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <h4 className="text-sm font-semibold text-gray-900">
                                    {item.productName || item.productId}
                                  </h4>
                                  <p className="mt-0.5 text-xs text-gray-500">
                                    {item.quantity} unit
                                    {item.quantity !== 1 ? "s" : ""}
                                  </p>
                                </div>
                                <button
                                  onClick={() => removeItem(item.productId)}
                                  className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>

                              <PriceDisplay
                                price={
                                  item.unitPrice ??
                                  (item.quantity > 0
                                    ? item.amount / item.quantity
                                    : item.amount)
                                }
                                mrp={
                                  item.unitPrice ??
                                  (item.quantity > 0
                                    ? item.amount / item.quantity
                                    : item.amount)
                                }
                                discount={0}
                                size="sm"
                              />

                              <div className="mt-2 flex items-center justify-between gap-3">
                                <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                                  <button
                                    onClick={() =>
                                      updateQty(item.productId, -1)
                                    }
                                    className="px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#F4568B]"
                                  >
                                    <Minus className="h-3.5 w-3.5" />
                                  </button>
                                  <span className="border-x border-gray-200 px-3 py-1 text-sm font-semibold text-gray-900">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQty(item.productId, 1)}
                                    className="px-2 py-1.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-[#F4568B]"
                                  >
                                    <Plus className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                                <span className="text-sm font-semibold text-gray-900">
                                  ₹{item.amount.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-100 bg-white p-4">
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      ₹{totalAmount.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false)
                      router.push("/cart")
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F4568B] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#F4568B]/80"
                  >
                    View full cart
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false)
                      router.push("/checkout")
                    }}
                    className="mt-2 flex w-full items-center justify-center rounded-lg border border-[#F4568B] px-4 py-2.5 text-sm font-semibold text-[#F4568B] transition-colors hover:bg-[#F4568B]/10"
                  >
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
    </header>
  )
}

// ─── Footer Trust Bar ─────────────────────────────────────────────────────────
export function MDWFooterBar() {
  const items = [
    { icon: "/images/license-approved.png", label: "Drug License Approved" },
    { icon: "/images/secure-payments.png", label: "Secure Payments" },
    { icon: "/images/privacy.png", label: "100% Privacy" },
  ]
  return (
    <div className="flex h-fit items-center justify-center bg-gray-900 py-2.5 text-gray-300">
      <div className="flex flex-wrap items-center justify-center gap-8">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 text-sm">
            <img src={item.icon} alt={item.label} className="size-3.5" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AddressSelector() {
  const [open, setOpen] = useState(false)

  const {
    selectedAddress,
    loadingLocation,
    addresses,
    saveAddress,
    fetchCurrentLocation,
  } = useAddress()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#F4568B]">
          <MapPin className="h-4 w-4 text-[#F4568B]" />

          <div className="text-left">
            <div className="text-[11px] text-gray-400">Deliver to</div>

            <div className="flex items-center gap-1 text-[12px] font-medium text-gray-800">
              {selectedAddress?.line1
                ? `${selectedAddress?.line1.substring(0, 30)}...`
                : "Detecting location..."}

              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent
        sideOffset={24}
        align="start"
        className="w-60 gap-0 overflow-hidden rounded-md border border-gray-100 bg-white p-0 text-black shadow-sm"
      >
        <div className="border-b border-gray-200 px-3 py-3">
          <h3 className="text-xs font-semibold text-black">Delivery Address</h3>
        </div>

        <div className="border-t">
          {addresses.map((address) => (
            <button
              key={address.id}
              onClick={() => {
                saveAddress(address)
                setOpen(false)
              }}
              className="w-full p-3 text-left hover:bg-gray-50"
            >
              <div className="text-xs font-medium">{address.label}</div>

              <div className="text-[10px] text-gray-500">{address.line1}</div>
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
            className="flex w-full items-center gap-2 rounded-md border border-gray-100 p-2 text-sm hover:bg-gray-50"
          >
            <LocateFixed className="size-4 text-[#F4568B]" />

            <span className="text-[12px]">
              {loadingLocation
                ? "Fetching location..."
                : "Use Current Location"}
            </span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export function MedicineSearchInput() {
  const router = useRouter()
  const { query, setQuery } = useMedicineSearchStore()

  const { results, loading } = useMedicineSearch()

  return (
    <div className="relative">
      <div className="flex items-center overflow-hidden rounded-md border border-gray-200">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search medicines..."
          className="flex-1 px-3 py-3 text-xs text-black outline-none"
        />

        <button className="bg-[#F4568B] p-3 text-white hover:bg-gray-500">
          <Search size={18} />
        </button>
      </div>

      {(results.length > 0 || loading) && (
        <div className="absolute top-full right-0 left-0 z-2 mt-2 rounded-lg border border-gray-100 bg-white text-black shadow-lg">
          {loading && <div className="p-4">Searching...</div>}

          {results.map((product) => (
            <button
              key={product.productId}
              className="w-full border-b p-3 text-left hover:bg-gray-50"
              onClick={() => {
                setQuery("")
                router.push(`/medicine/${product._id}`)
              }}
            >
              <div className="text-xs font-medium">{product.name}</div>

              <div className="text-[10px] text-gray-500">
                {product.saltName}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
