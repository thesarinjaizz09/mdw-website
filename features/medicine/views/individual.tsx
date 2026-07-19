"use client"

import {
    Search,
    Upload,
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
    UploadIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
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
    WellnessBannerSection,
} from "@/features/landing/components"
import { useCartActions } from "@/hooks/use-cart"
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

export default function IndividualPage({ category }: { category?: string }) {
    const router = useRouter()
    const { addToCart } = useCartActions()
    const [loading, setLoading] = useState(false)
    const [featuredProducts, setFeaturedProducts] =
        useState<Medicine[]>([])

    useEffect(() => {
        async function fetchProductsForCategory() {
            setLoading(true)
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/product/category/${category}`
            )

            setFeaturedProducts(response.data.data)
            setLoading(false)
        }
        async function fetchProducts() {
            setLoading(true)
            const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/product/getproducts`
            )

            setFeaturedProducts(response.data.data)
            setLoading(false)
        }

        if (!category) {
            fetchProducts()
            return
        }

        fetchProductsForCategory()
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
        <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
            <MDWHeader />

            <main className="max-w-7xl space-y-8 px-4 py-6">
                {/* Hero Banner */}
                <section className="to-teal-50s relative flex min-h-[220px] flex-row justify-between rounded-lg bg-gradient-to-r from-[#F4568B]-200 via-[#F4568B]-500 to-[#F4568B] px-4 py-5 max-[700px]:flex-col min-[700px]:items-center bg-[#F4568B]">
                    {/* Content */}
                    <div className="relative z-10 max-w-xl px-2 py-7">
                        <h1 className="mb-2 text-4xl font-bold text-white">
                            {category ? category : "Medicines"}
                        </h1>

                        <p className="flex flex-wrap items-center gap-2 text-base text-gray-100">
                            {category
                                ? `Browse all medicines in ${category}`
                                : "Genuine Medicines • Fast Delivery • Trusted Care"}
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

                {/* Health Categories */}
                <section className="z-1">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-md ml-2 font-bold text-gray-900 min-[500px]:text-xl">
                            More Categories
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
                                onClick={() => router.push(`/medicines/${cat.label}`)}
                            >
                                <span className="">{cat.icon}</span>
                                <span className="text-center text-xs leading-tight font-medium whitespace-pre-line text-white">
                                    {cat.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Medicines */}
                <section>
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-md ml-2 font-bold text-gray-900 min-[500px]:text-xl">
                            Medicines
                        </h2>
                    </div>
                    {
                        loading ? (
                            <div className="rounded-md border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500 flex items-center gap-2">
                                <Spinner className="h-4 w-4" />
                                Loading medicines…
                            </div>
                        ) :
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
                    }

                </section>
            </main>

            <MDWFooterBar />
        </div>
    )
}
