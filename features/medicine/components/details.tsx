"use client"

import { useEffect, useState } from "react"
import { Zap, ChevronRight, CheckCircle, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MDWHeader,
  MDWFooterBar,
  MedicineImagePlaceholder,
  PriceDisplay,
  InStockBadge,
} from "@/components/shared"

import type { Medicine } from "@/types"
import { MEDICINES } from "@/types"
import { useRouter } from "next/navigation"
import { Spinner } from "@/components/ui/spinner"
import SubstituteMedicinesCard from "./substitutes-card"
import ProductInfoDetails from "./product-info-details"
import InlineSubstitutes from "./inline-substitutes"
import CartActions from "./cart-actions"

/* ---------------------------------- */
/* Types matching the actual API response */
/* ---------------------------------- */

interface ProductCreatedBy {
  name: string
  role: string
  email: string
}

interface ProductBatch {
  _id: string
  createdBy: ProductCreatedBy
  batchNumber: string
  quantity: number
  ptr: number
  taxRate: string
  amount: number
  mrp: number
  unitAmount: string
  unit: string
  expireAt: string
  marginPercent: number
  discount: number
  billNumber: string
  distributorName: string
  manufacturer?: string
  free?: number
}

interface FAQ {
  question: string
  answer: string
}

interface SubstituteProduct {
  _id: string
  productId: string
  name: string
  price: number
}

interface ProductData {
  _id: string
  createdBy: ProductCreatedBy
  productId: string
  unitAmountNumber: number[]
  unitAmount: string
  name: string
  productInformation: string
  productImage: string[]
  status: string
  category: string
  dosageType: string
  hsnCode: string
  saltName: string
  location: string
  batches: ProductBatch[]
  totalQuantity: number
  billNumber: string
  is_prescription_required: boolean
  createdAt: string
  updatedAt: string
  manufacturerName: string
  howToUse?: string
  sideEffects?: string
  faqs?: FAQ[]
  usage?: string
  benefits?: string
  howItWorks?: string
  safetyAdvice?: string
  quickTips?: string
  substitutes?: string[]
  resolvedSubstitutes?: SubstituteProduct[]
}

interface ProductApiResponse {
  success: number
  message: string
  data: ProductData
}

interface ProductDetailPageProps {
  medicine?: Medicine
  slug: string
}

export default function MedicineDetailPage({
  medicine = MEDICINES[4],
  slug,
}: ProductDetailPageProps) {
  const router = useRouter()
  const [med, setMed] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  const CARD_COLORS = ["blue", "green", "orange", "purple"] as const
  const thumbColors = ["blue", "green", "orange", "purple"] as const

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/product/${slug}`
        )
        const json: ProductApiResponse = await res.json()
        if (json?.success && json.data) {
          setMed(json.data)
        }
      } catch (err) {
        console.error("Failed to fetch product", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  if (loading || !med) {
    return (
      <div className="flex min-h-screen flex-1 flex-col bg-gray-50">
        <MDWHeader />
        <main className="mx-auto flex w-full max-w-7xl flex-1 items-center justify-center gap-2">
          <Spinner className="text-gray-800" />
          <p className="text-sm text-gray-600">Loading product...</p>
        </main>
        <MDWFooterBar />
      </div>
    )
  }

  // Pick the first (primary) batch for pricing/stock-derived info
  const primaryBatch: ProductBatch | undefined = med.batches?.[0]
  const inStock = med.status !== "Not Available" && med.totalQuantity > 0
  const price = primaryBatch?.ptr ?? 0
  const mrp = primaryBatch?.mrp ?? 0
  const discount = mrp > 0 ? Math.round(((mrp - price) / mrp) * 100) : 0

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-gray-50">
      <MDWHeader />

      <main className="mx-auto max-w-7xl flex-1 px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-1.5 text-xs text-gray-500">
          {["Medicines", med.name].map((crumb, i, arr) => (
            <span key={i} className="flex items-center gap-1.5">
              {i < arr.length - 1 ? (
                <button
                  className="transition-colors hover:text-green-600"
                  onClick={() => {
                    router.push(`/medicine`)
                  }}
                >
                  {crumb}
                </button>
              ) : (
                <span className="font-medium text-gray-700">{crumb}</span>
              )}
              {i < arr.length - 1 && <ChevronRight className="h-3 w-3" />}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left: Images + Product Information */}
          <div className="space-y-4 lg:col-span-2">
            {/* Product card */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-8 sm:flex-row">
                {/* Images */}
                <div className="flex flex-col items-center gap-3">
                  {/* Main image */}
                  <div className="relative">
                    <MedicineImagePlaceholder
                      name={med.name}
                      className="h-54 w-54"
                      color={CARD_COLORS[selectedImage % 4]}
                    />
                  </div>
                  {/* Thumbnails */}
                  <div className="flex gap-2">
                    {thumbColors.map((color, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`h-12 w-12 overflow-hidden rounded-lg border-2 transition-all ${
                          selectedImage === i
                            ? "border-[#F4568B]"
                            : "border-gray-200"
                        }`}
                      >
                        <MedicineImagePlaceholder
                          name={med.name}
                          className="h-full w-full"
                          color={color}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h1 className="text-md font-bold text-gray-900 md:text-xl">
                      {med.name}
                    </h1>
                    <p className="text-sm text-gray-500">{med.saltName}</p>
                    <p className="text-sm text-gray-500">
                      {primaryBatch
                        ? `${primaryBatch.unitAmount} ${primaryBatch.unit}`
                        : ""}
                    </p>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-2">
                    <InStockBadge inStock={inStock} />
                    <span className="flex items-center gap-1 text-xs font-medium text-[#F4568B]">
                      <Zap className="h-3.5 w-3.5" /> Fast Delivery
                    </span>
                    {med.is_prescription_required && (
                      <Badge variant="outline" className="text-[10px]">
                        Rx Required
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="space-y-0.5">
                    <PriceDisplay
                      price={mrp}
                      mrp={mrp}
                      discount={discount}
                      size="lg"
                    />
                    <p className="text-[10px] text-gray-400">
                      Inclusive of all taxes
                    </p>
                  </div>

                  {/* Highlights & Substitutes Split Container */}
                  <div className="border-gray-150/60 mt-3 flex flex-col justify-between gap-2 min-[400px]:flex-row min-[400px]:gap-0">
                    {/* Product Highlights */}
                    <div className="w-full min-[400px]:w-[40%]">
                      <p className="mb-2 text-sm font-semibold text-gray-900">
                        Product Highlights
                      </p>
                      <ul className="space-y-1.5">
                        {[
                          med.category,
                          med.dosageType !== "None" ? med.dosageType : null,
                          med.manufacturerName,
                        ]
                          .filter((h): h is string => Boolean(h))
                          .map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                              {h}
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* Inline Substitutes */}
                    <div className="w-full min-[400px]:w-[60%]">
                      <InlineSubstitutes
                        substitutes={med.resolvedSubstitutes || []}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="block space-y-4 lg:hidden">
              <CartActions
                product={{ _id: med._id, name: med.name }}
                price={price}
                inStock={inStock}
              />
            </div>

            {/* Product Details Scrolling Sections */}
            <ProductInfoDetails med={med} />
          </div>

          {/* Right: Delivery + Cart */}
          <div className="hidden space-y-4 lg:block">
            <CartActions
              product={{ _id: med._id, name: med.name }}
              price={price}
              inStock={inStock}
            />
            {/* Substitute Medicines Card (Commented out as requested) */}
            {/* <SubstituteMedicinesCard substitutes={med.resolvedSubstitutes || []} /> */}
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  )
}
