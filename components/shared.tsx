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
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "@/hooks/use-session"
import { useCart, useCartActions } from "@/features/cart/hooks/use-cart"
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
import { useState, useRef, useEffect } from "react"
import { useMedicineSearchStore } from "@/stores/use-medicine-search"
import { useMedicineSearch } from "@/hooks/use-medicine-search"
import { Spinner } from "./ui/spinner"
import { NAV_USER_DROPDOWN_ITEMS } from "@/contants"
import Image from "next/image"
import { NAV_ITEMS } from "@/lib/constants"

// ─── MDW Logo ────────────────────────────────────────────────────────────────
export function MDWLogo({ size = "lg" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-7.5 h-3.5", md: "w-15 h-7.5", lg: "w-20 h-10" }
  return (
    <Link href="/medicine" className="flex flex-shrink-0 items-center gap-2">
      <div className={`${sizes[size]} relative`}>
        <Image
          src="/images/logo.png"
          alt="MDW Logo"
          fill
          className="object-contain"
        />
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
  discountedAmount,
  size = "md",
}: {
  price: number
  mrp: number
  discount?: number
  discountedAmount?: number
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
  const effectivePrice =
    discountedAmount && discountedAmount > 0 && discountedAmount < mrp
      ? discountedAmount
      : price
  const hasDiscount =
    discountedAmount && discountedAmount > 0 && discountedAmount < mrp
  const calculatedDiscount =
    hasDiscount && mrp > 0
      ? Math.round(((mrp - discountedAmount) / mrp) * 100)
      : discount || 0

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={`text-gray-900 ${s.price}`}>
        ₹{effectivePrice.toFixed(2)}
      </span>
      {hasDiscount && (
        <>
          <span className={`text-gray-400 line-through ${s.mrp}`}>
            ₹{mrp.toFixed(2)}
          </span>
          {calculatedDiscount > 0 && (
            <span
              className={`rounded bg-green-100 font-semibold text-green-700 ${s.badge}`}
            >
              {calculatedDiscount}% OFF
            </span>
          )}
        </>
      )}
    </div>
  )
}

// ─── Main Header ──────────────────────────────────────────────────────────────
export function MDWHeader() {
  const [showLogin, setShowLogin] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { cart, guestItems, isGuest, itemCount, totalAmount } = useCart()
  const { updateCart, removeFromCart } = useCartActions()

  const { user, loading } = useSession()

  const isHeroSearchVisible =
    pathname === "/" ||
    pathname === "/medicine" ||
    pathname.startsWith("/medicines")

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

  const userActions = (
    <>
      {!loading ? (
        user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex flex-col items-center justify-center rounded-full p-2.5 text-gray-500 transition-colors hover:bg-[#F4568B]/10 hover:text-[#F4568B]">
                <div className="relative">
                  <User size={20} />
                  <span className="absolute top-0 -right-0.5 h-1.5 w-1.5 rounded-full bg-[#F4568B]"></span>
                </div>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-full rounded-md border border-gray-200 bg-white text-xs text-black"
              align="end"
            >
              {NAV_USER_DROPDOWN_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-sm px-4 py-2 text-xs text-gray-600 hover:bg-gray-500 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="rounded-full p-2.5 text-gray-500 transition-colors hover:bg-[#F4568B]/10 hover:text-[#F4568B]"
          >
            <User size={21} />
          </button>
        )
      ) : (
        <Spinner className="size-5 text-gray-500" />
      )}
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

                          {(() => {
                            const itemMRP = item.mrp || item.productDetails?.batches?.[0]?.mrp || (item.unitPrice ?? item.amount / Math.max(1, item.quantity));
                            const itemDiscountedAmount = item.discountedAmount || item.productDetails?.batches?.[0]?.discountedAmount;
                            const itemUnitPrice = item.unitPrice ?? (itemDiscountedAmount && itemDiscountedAmount > 0 ? itemDiscountedAmount : (item.quantity > 0 ? item.amount / item.quantity : item.amount));
                            const hasDiscount = itemDiscountedAmount && itemDiscountedAmount > 0 && itemMRP > itemDiscountedAmount;

                            return (
                              <>
                                <PriceDisplay
                                  price={itemUnitPrice}
                                  mrp={itemMRP}
                                  discountedAmount={itemDiscountedAmount}
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
                                  <div className="flex items-center gap-1.5 text-right">
                                    <span className="text-sm font-semibold text-gray-900">
                                      ₹{item.amount.toFixed(2)}
                                    </span>
                                    {hasDiscount && (
                                      <span className="text-xs text-gray-400 line-through">
                                        ₹{(itemMRP * item.quantity).toFixed(2)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </>
                            );
                          })()}
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
    </>
  )

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white shadow-sm">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl flex-col gap-2.5 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Top row on mobile / Left section on desktop */}
        <div className="flex items-center justify-between sm:justify-start sm:gap-4">
          <MDWLogo />

          {/* Desktop Address Selector */}
          <div className="hidden sm:block">
            <AddressSelector />
          </div>

          {/* Mobile Profile & Cart actions */}
          <div className="flex items-center gap-3 sm:hidden">
            {userActions}
          </div>
        </div>

        {/* Mobile Row: Location + Search Bar (beside location icon on small screens) */}
        <div className="flex w-full items-center justify-between gap-2 min-w-0 sm:hidden">
          <AddressSelector />

          {!isHeroSearchVisible && (
            <div className="flex-1 min-w-0 max-w-[20rem]">
              <MedicineSearchInput
                placeholder="Search medicines..."
                inputClassName="px-2.5 py-1.5 text-[11px]"
              />
            </div>
          )}
        </div>

        {/* Desktop Right actions (Search bar beside profile icon + Profile & Cart) */}
        <div className="hidden items-center gap-3 sm:flex">
          {!isHeroSearchVisible && (
            <div className="w-72 md:w-96 lg:w-[420px]">
              <MedicineSearchInput
                placeholder="Search medicines by name or salt..."
                inputClassName="px-3.5 py-2"
              />
            </div>
          )}

          {userActions}
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
        <button className="flex flex-shrink-0 items-center gap-1 text-sm text-gray-600 hover:text-[#F4568B]">
          <MapPin className="h-4 w-4 flex-shrink-0 text-[#F4568B]" />

          <div className="min-w-0 text-left">
            <div className="text-[10px] leading-tight text-gray-400">Deliver to</div>

            <div className="flex max-w-[75px] items-center gap-0.5 text-[11px] font-medium text-gray-800 min-[360px]:max-w-[110px] sm:max-w-none">
              <span className="truncate">
                {selectedAddress?.line1
                  ? selectedAddress?.line1
                  : "Location..."}
              </span>
              <ChevronDown className="h-3 w-3 flex-shrink-0" />
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

interface MedicineSearchInputProps {
  placeholder?: string
  className?: string
  inputClassName?: string
}

export function MedicineSearchInput({
  placeholder = "Search medicines...",
  className = "",
  inputClassName = "px-3 py-3",
}: MedicineSearchInputProps = {}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const { query, setQuery } = useMedicineSearchStore()

  const { results, loading } = useMedicineSearch()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const hasResults = results.length > 0
  const showDropdown =
    isOpen && query.trim().length >= 2 && (hasResults || loading)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="flex items-stretch overflow-hidden rounded-md border border-gray-200 bg-white">
        <input
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          placeholder={placeholder}
          className={`flex-1 min-w-0 text-xs text-black outline-none ${inputClassName}`}
        />

        <button className="flex flex-shrink-0 items-center justify-center self-stretch bg-[#F4568B] px-2 text-white transition-colors hover:bg-gray-700 sm:px-4">
          <Search size={18} />
        </button>
      </div>

      {showDropdown && (
        <div className="absolute top-full right-0 left-0 z-50 mt-2 max-h-72 overflow-y-auto rounded-lg border border-gray-100 bg-white text-black shadow-xl">
          {loading && (
            <div className="flex items-center gap-2 p-3 text-xs text-gray-500">
              <Spinner className="size-4" />
              <span>Searching medicines...</span>
            </div>
          )}

          {!loading &&
            results.map((product) => (
              <button
                key={product.productId || product._id}
                className="w-full border-b border-gray-50 p-3 text-left transition-colors last:border-b-0 hover:bg-gray-50"
                onClick={() => {
                  setQuery("")
                  setIsOpen(false)
                  router.push(`/medicine/${product._id}`)
                }}
              >
                <div className="text-xs font-semibold text-gray-900">
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
  )
}

export function UserSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const activeSection =
    pathname === "/orders"
      ? "orders"
      : pathname === "/address"
        ? "addresses"
        : pathname === "/prescriptions"
          ? "prescriptions"
          : "profile"

  return (
    <div className="md:w-[30%]">
      <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
        <nav className="divide-y divide-gray-50">
          {NAV_ITEMS.map((item) =>
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className={`flex w-full items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm transition-all ${
                  activeSection === item.id
                    ? "border border-[#F4568B]/20 bg-[#F4568B]/10 font-semibold text-[#F4568B]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span
                  className={`flex-shrink-0 ${
                    activeSection === item.id
                      ? "text-[#F4568B]"
                      : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                className={`flex w-full items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm transition-all ${
                  activeSection === item.id
                    ? "border border-[#F4568B]/20 bg-[#F4568B]/10 font-semibold text-[#F4568B]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <span
                  className={`flex-shrink-0 ${
                    activeSection === item.id
                      ? "text-[#F4568B]"
                      : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          )}

          {/* Logout */}
          <button
            className="flex w-full items-center gap-2.5 sm:gap-3 px-3.5 py-2.5 sm:px-4 sm:py-3 text-left text-xs sm:text-sm text-red-500 transition-colors hover:bg-red-50"
            onClick={() => router.push("/logout")}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}
