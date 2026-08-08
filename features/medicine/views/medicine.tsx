"use client"

import { useRouter } from "next/navigation"
import {
  Search,
  ChevronRight,
  RefreshCw,
  ShoppingCart,
  MessageCircle,
  Phone,
  Shield,
  Truck,
  UserCheck,
  CheckCircle,
  Bell,
  PackageCheck,
  Popcorn,
  HeartPulse,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  MDWHeader,
  MDWFooterBar,
  MedicineImagePlaceholder,
  MedicineSearchInput,
} from "@/components/shared"
import { MedicineCard } from "../components/card"
import {
  Medicine,
  MEDICINES,
  CategoryMedicineEntry,
  CategoriesMedicinesResponse,
  ProductData,
  CategoryGroup,
} from "@/types"
import { FaPills, FaWhatsapp } from "react-icons/fa"
import { TbReplace } from "react-icons/tb"
import {
  GiStomach,
  GiMedicines,
  GiLiver,
  GiLoveInjection,
  GiFrontTeeth,
  GiLungs,
  GiSpiderMask,
} from "react-icons/gi"
import { PiNuclearPlantFill } from "react-icons/pi"
import { useEffect, useState } from "react"
import axios from "axios"
import {
  HowItWorksSection,
  BrandCarousel,
} from "@/features/landing/components"
import { useCartActions } from "@/features/cart/hooks/use-cart"
import PrescriptionUpload from "@/components/prescription-upload"
import { toast } from "sonner"

const CATEGORIES = [
  {
    icon: <Popcorn className="h-5 w-5" />,
    label: "Diabetes Care",
    color: "bg-blue-50",
  },
  {
    icon: <HeartPulse className="h-5 w-5" />,
    label: "Cardiac Care",
    color: "bg-red-50",
  },
  {
    icon: <GiStomach className="h-5 w-5" />,
    label: "Stomach Care",
    color: "bg-pink-50",
  },
  {
    icon: <GiMedicines className="h-5 w-5" />,
    label: "Pain Relief",
    color: "bg-purple-50",
  },
  {
    icon: <GiLiver className="h-5 w-5" />,
    label: "Liver Care",
    color: "bg-indigo-50",
  },
  {
    icon: <FaPills className="h-5 w-5" />,
    label: "Drugs",
    color: "bg-yellow-50",
  },
  {
    icon: <PiNuclearPlantFill className="h-5 w-5" />,
    label: "Nutraceuticals",
    color: "bg-teal-50",
  },
  {
    icon: <TbReplace className="h-5 w-5" />,
    label: "Substitute",
    color: "bg-green-50",
  },
  {
    icon: <GiLoveInjection className="h-5 w-5" />,
    label: "Injections",
    color: "bg-green-50",
  },
  {
    icon: <GiFrontTeeth className="h-5 w-5" />,
    label: "Oral Care",
    color: "bg-green-50",
  },
  {
    icon: <GiLungs className="h-5 w-5" />,
    label: "Respiratory Care",
    color: "bg-green-50",
  },
  {
    icon: <GiSpiderMask className="h-5 w-5" />,
    label: "Derma Care",
    color: "bg-green-50",
  },
]

const WHY_CHOOSE = [
  {
    icon: <UserCheck className="h-5 w-5 text-[#F4568B]" />,
    title: "Licensed Pharmacy",
    sub: "Drug License Approved",
  },
  {
    icon: <Shield className="h-5 w-5 text-[#F4568B]" />,
    title: "Registered Pharmacist",
    sub: "Always Available",
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-[#F4568B]" />,
    title: "100% Genuine",
    sub: "Medicines",
  },
  {
    icon: <Truck className="h-5 w-5 text-[#F4568B]" />,
    title: "20 Min Delivery*",
    sub: "In Selected Areas",
  },
  {
    icon: <Shield className="h-5 w-5 text-[#F4568B]" />,
    title: "Secure Payments",
    sub: "100% Safe",
  },
]

function toMedicine(product: ProductData): Medicine {
  const primaryBatch = product.batches?.[0]
  return {
    _id: product._id,
    name: product.name,
    saltName: product.saltName,
    totalQuantity: product.totalQuantity,
    price: primaryBatch?.amount ?? 0,
    mrp: primaryBatch?.mrp ?? 0,
    discount: primaryBatch?.discount ?? 0,
    inStock: product.status !== "Not Available" && product.totalQuantity > 0,
  } as Medicine
}

export default function MedicinesPage() {
  const router = useRouter()
  const { addToCart } = useCartActions()
  const [featuredProducts, setFeaturedProducts] =
    useState<Medicine[]>(MEDICINES)
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/featured-medicines`
      )

      setFeaturedProducts(response.data.data)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    async function fetchCategoryProducts() {
      const response = await axios.get<CategoriesMedicinesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/product/categories-medicines`
      )

      setCategoryGroups(response.data.data)
    }

    fetchCategoryProducts()
  }, [])


  const addToCartFunction = (medicine: Medicine) => {
    if (!medicine._id) {
      toast.error("Invalid medicine ID. Cannot add to cart.")
      return
    }

    addToCart.mutate({
      productId: medicine._id,
      quantity: 1,
      productName: medicine.name,
      amount: medicine.price,
      unitPrice: medicine.price,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-6">
        {/* Hero Banner */}
        <section className="to-teal-50s relative flex min-h-[220px] flex-row justify-between rounded-lg bg-gradient-to-r from-[#F4568B]-200 via-[#F4568B]-500 to-[#F4568B] px-4 py-5 max-[700px]:flex-col min-[700px]:items-center bg-[#F4568B]">
          {/* Content */}
          <div className="relative z-10 max-w-xl px-2 py-7">
            <h1 className="mb-2 text-4xl font-bold text-white">Medicines</h1>

            <p className="flex flex-wrap items-center gap-2 text-base text-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              Genuine Medicines
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              Fast Delivery
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              Trusted Care
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {/* <HowItWorksSection theme={1} /> */}
            <div className="rounded-md border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-0.5 text-base font-bold text-gray-900">
                Search Medicine
              </h2>
              <p className="mb-3 text-xs text-gray-500">
                Find your medicines quickly
              </p>
              <div className="relative">
                <MedicineSearchInput />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="text-xs text-gray-500">Popular Searches:</span>
                {["Telma 40", "Ecosprin 75", "Thyronorm 50", "Crocin 650"].map(
                  (s) => (
                    <button
                      key={s}
                      className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700 transition-colors hover:bg-green-100 hover:text-green-700"
                    >
                      {s}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <HowItWorksSection theme={1} />
          <PrescriptionUpload />
        </div>

        {/* Health Categories */}
        <section className="z-1">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-md ml-2 font-bold text-gray-900 min-[500px]:text-xl">
              Shop by Health Categories
            </h2>
            {/* <button className="flex items-center gap-0.5 text-xs font-medium text-[#F4568B] hover:text-[#F4568B]/80 min-[500px]:text-sm">
              View All Categories <ChevronRight className="h-4 w-4" />
            </button> */}
          </div>
          <div className="grid grid-cols-2 gap-3 min-[450px]:grid-cols-3 min-[650px]:grid-cols-4 min-[800px]:grid-cols-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`bg-[#F4568B] flex flex-row items-center justify-start gap-3 rounded-lg border border-gray-200 p-3 text-black transition-all hover:scale-105 hover:border-gray-100 hover:shadow-sm hover:bg-gray-500`}
                onClick={() => {
                  router.push(`/medicines/${cat.label}`)
                }}
              >
                <span className="">{cat.icon}</span>
                <span className="text-center text-xs leading-tight font-medium whitespace-pre-line text-white">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Quick Reorder */}
        {/* <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-stretch">
            <div className="bg-green-50 p-5 flex flex-col justify-center gap-3 min-w-[200px]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Quick Reorder</h3>
                  <p className="text-xs text-gray-500">Need your regular medicines again?</p>
                  <p className="text-xs text-gray-500">Reorder in just 1 click</p>
                </div>
              </div>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs rounded-lg w-fit">
                Reorder Previous Order
              </Button>
            </div>

            <div className="flex-1 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Your Last Order (20 May 2024)</span>
                <button className="text-xs text-[#F4568B] hover:text-[#F4568B]/80 font-medium flex items-center gap-0.5">
                  View All Orders <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {MEDICINES.map((med) => (
                  <MedicineCard key={med.id} medicine={med} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* Popular Medicines */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-md ml-2 font-bold text-gray-900 min-[500px]:text-xl">
              Popular Medicines
            </h2>
            <button className="flex items-center gap-0.5 text-xs font-medium text-[#F4568B] hover:text-[#F4568B]/80 min-[500px]:text-sm" onClick={() => router.push("/medicines")}>
              View All Medicines <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <div className="mx-auto grid max-w-[15rem] gap-2 min-[380px]:max-w-none min-[380px]:grid-cols-2 min-[400px]:gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {featuredProducts.map((med, i) => (
              <MedicineCard
                key={i}
                medicine={med}
                index={i}
                onAddToCart={addToCartFunction}
              />
            ))}
          </div>
        </section>

        <BrandCarousel />

        {categoryGroups
          .filter((group) => group.medicines && group.medicines.length > 0)
          .map((group) => (
            <section key={group.category}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-md ml-2 font-bold text-gray-900 min-[500px]:text-xl">
                  {group.category}
                </h2>
                <button className="flex items-center gap-0.5 text-xs font-medium text-[#F4568B] hover:text-[#F4568B]/80 min-[500px]:text-sm" onClick={() => router.push(`/medicines/${group.category}`)}>
                  View All <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="mx-auto grid max-w-[15rem] gap-2 min-[380px]:max-w-none min-[380px]:grid-cols-2 min-[400px]:gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {group.medicines.slice(0, 5).map((product, i) => (
                  <MedicineCard
                    key={product._id ?? i}
                    medicine={toMedicine(product)}
                    index={i}
                    onAddToCart={addToCartFunction}
                  />
                ))}
              </div>
            </section>
          ))}

        {/* Why Choose MDW */}
        <section className="mx-auto rounded-xl border border-gray-100 bg-white p-5 shadow-sm min-[450px]:w-full">
          <div className="flex flex-col items-center gap-8 min-[1000px]:flex-row">
            <h3 className="mx-auto min-w-fit text-sm font-bold text-gray-900">
              Why Choose MDW?
            </h3>
            <div className="flex w-min flex-1 flex-wrap items-center justify-center gap-8 min-[430px]:w-full min-[850px]:flex-nowrap min-[850px]:justify-around">
              {WHY_CHOOSE.map((item) => (
                <div
                  key={item.title}
                  className="flex w-[10rem] items-center gap-2 min-[850px]:w-fit"
                >
                  {item.icon}
                  <div>
                    <div className="text-xs font-semibold whitespace-nowrap text-gray-800">
                      {item.title}
                    </div>
                    <div className="text-[10px] whitespace-nowrap text-gray-500">
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className="mx-auto flex max-w-2xl flex-col items-start justify-between gap-6 rounded-xl bg-[#F4568B] p-8 md:flex-row">
          {/* Doctor avatar placeholder */}
          <section className="flex items-start justify-between gap-6">
            {/* <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F4568B]/90">
              <span className="text-3xl">👨‍⚕️</span>
            </div> */}
            <div className="flex-1">
              <h2 className="text-md mb-0.5 font-bold text-white min-[500px]:text-lg">
                Need Help Finding Medicines?
              </h2>
              <p className="mb-3 text-sm text-white/90">
                Our Pharmacist is here to help you.
              </p>
              <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                <Button
                  size="sm"
                  className="w-fulls h-12 gap-1.5 rounded-md bg-[#F4568B] px-5 text-xs text-white hover:bg-gray-500 sm:w-fit border border-white/20"
                  onClick={() => window.open("https://wa.me/919230189091", "_blank")}
                >
                  <FaWhatsapp className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </Button>
                <Button className="h-12 w-[10.2rem] gap-1.5 rounded-md border border-[#F4568B] bg-white px-5 text-xs text-[#F4568B] hover:bg-[#F4568B]/10 min-[468px]:w-fit hover:text-white" onClick={() => window.open("tel:+919230189091", "_blank")}>
                  <Phone className="h-3.5 w-3.5" />
                  Call Us Now
                </Button>
              </div>
            </div>
          </section>

          <div className="flex w-full flex-col justify-center rounded-md md:items-end">
            <div className="grid grid-cols-3 gap-2">
              {[
                {
                  icon: <PackageCheck className="h-5 w-5 text-white" />,
                  label: "Prescription\nAssistance",
                },
                {
                  icon: <Bell className="h-5 w-5 text-white" />,
                  label: "Medicine\nReminder",
                },
                {
                  icon: <Truck className="h-5 w-5 text-white" />,
                  label: "Order\nTracking",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-2 rounded-md border border-gray-200 p-2.5 text-center"
                >
                  {item.icon}
                  <span className="text-[10px] leading-tight whitespace-pre-line text-gray-100 text-left">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MDWFooterBar />
    </div>
  )
}
