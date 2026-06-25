"use client";

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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, MedicineSearchInput } from "@/components/shared";
import { MedicineCard } from "../components/card";
import { Medicine, MEDICINES, CategoryMedicineEntry, CategoriesMedicinesResponse, ProductData, CategoryGroup } from "@/types";
import { FaPills, FaWhatsapp } from "react-icons/fa";
import { TbReplace } from "react-icons/tb";
import { GiStomach, GiMedicines, GiLiver, GiLoveInjection, GiFrontTeeth, GiLungs } from "react-icons/gi";
import { PiNuclearPlantFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import axios from "axios";
import { HowItWorksSection, WellnessBannerSection } from "@/features/landing/components";

const CATEGORIES = [
  { icon: <Popcorn className="w-5 h-5" />, label: "Diabetes Care", color: "bg-blue-50" },
  { icon: <HeartPulse className="w-5 h-5" />, label: "Cardiac Care", color: "bg-red-50" },
  { icon: <GiStomach className="w-5 h-5" />, label: "Stomach Care", color: "bg-pink-50" },
  { icon: <GiMedicines className="w-5 h-5" />, label: "Pain Relief", color: "bg-purple-50" },
  { icon: <GiLiver className="w-5 h-5" />, label: "Liver Care", color: "bg-indigo-50" },
  { icon: <FaPills className="w-5 h-5" />, label: "Drugs", color: "bg-yellow-50" },
  { icon: <PiNuclearPlantFill className="w-5 h-5" />, label: "Nutraceuticals", color: "bg-teal-50" },
  { icon: <TbReplace className="w-5 h-5" />, label: "Substitute", color: "bg-green-50" },
  { icon: <GiLoveInjection className="w-5 h-5" />, label: "Injections", color: "bg-green-50" },
  { icon: <GiFrontTeeth className="w-5 h-5" />, label: "Oral Care", color: "bg-green-50" },
  { icon: <GiLungs className="w-5 h-5" />, label: "Respiratory Care", color: "bg-green-50" },
];

const WHY_CHOOSE = [
  { icon: <UserCheck className="w-5 h-5 text-green-600" />, title: "Licensed Pharmacy", sub: "Drug License Approved" },
  { icon: <Shield className="w-5 h-5 text-green-600" />, title: "Registered Pharmacist", sub: "Always Available" },
  { icon: <CheckCircle className="w-5 h-5 text-green-600" />, title: "100% Genuine", sub: "Medicines" },
  { icon: <Truck className="w-5 h-5 text-green-600" />, title: "20 Min Delivery*", sub: "In Selected Areas" },
  { icon: <Shield className="w-5 h-5 text-green-600" />, title: "Secure Payments", sub: "100% Safe" },
];

function toMedicine(product: ProductData): Medicine {
  const primaryBatch = product.batches?.[0];
  return {
    id: product._id,
    name: product.name,
    saltName: product.saltName,
    totalQuantity: product.totalQuantity,
    price: primaryBatch?.amount ?? 0,
    mrp: primaryBatch?.mrp ?? 0,
    discount: primaryBatch?.discount ?? 0,
    inStock: product.status !== "Not Available" && product.totalQuantity > 0,
  } as Medicine;
}

export default function MedicinesPage() {
  const [featuredProducts, setFeaturedProducts] = useState<Medicine[]>(MEDICINES);
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response =
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/featured-medicines`);

      setFeaturedProducts(response.data.data);
    }

    fetchProducts();
  }, [])

  useEffect(() => {
    async function fetchCategoryProducts() {
      const response = await axios.get<CategoriesMedicinesResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/product/categories-medicines`
      );

      setCategoryGroups(response.data.data);
    }

    fetchCategoryProducts();
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader cartCount={0} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <section className="relative rounded-2xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50s min-h-[220px] flex flex-row items-center justify-between py-5 px-4">
          {/* Content */}
          <div className="relative z-10 py-7 px-2 max-w-xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Medicines
            </h1>

            <p className="text-base text-gray-600 flex flex-wrap items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Genuine Medicines

              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Fast Delivery

              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Trusted Care
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {/* <HowItWorksSection theme={1} /> */}
            <div className="bg-white rounded-md border border-gray-100 p-5 shadow-sm">
              <h2 className="font-bold text-gray-900 text-base mb-0.5">Search Medicine</h2>
              <p className="text-xs text-gray-500 mb-3">Find your medicines quickly</p>
              <div className="relative">
                <MedicineSearchInput />
              </div>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className="text-xs text-gray-500">Popular Searches:</span>
                {["Telma 40", "Ecosprin 75", "Thyronorm 50", "Crocin 650"].map((s) => (
                  <button
                    key={s}
                    className="text-xs text-gray-700 bg-gray-100 hover:bg-green-100 hover:text-green-700 px-2 py-0.5 rounded-full transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-center">
          <HowItWorksSection theme={1} />
          {/* <section className="relative overflow-hidden rounded-xl flex items-center justify-center">
            <div className="bg-white rounded-xl border border-gray-100 p-5 h-full py-7 shadow-sm w-xl">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-bold text-gray-900 text-base">Upload Prescription</h2>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Upload prescription and we will add all medicines for you</p>
                  <div className="relative mb-1">
                    <div className="flex items-center border rounded-md overflow-hidden border border-gray-200">
                      <button className="flex-1 py-3 px-3 outline-none text-black text-xs">Upload Prescription</button>

                      <button className="bg-green-600 text-white p-3">
                        <UploadIcon size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                    <span className="text-xs text-gray-500">Formats Supported:</span>
                    {["JPEG", "PNG", "PDF", "JPG"].map((s) => (
                      <button
                        key={s}
                        className="text-xs text-gray-700 bg-gray-100 hover:bg-green-100 hover:text-green-700 px-2 py-0.5 rounded-full transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section> */}
        </div>

        {/* Health Categories */}
        <section className="z-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 ml-2">Shop by Health Categories</h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
              View All Categories <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`${cat.color} rounded-lg p-3 flex flex-row items-center justify-start gap-3 hover:shadow-sm hover:scale-105 transition-all text-black border hover:border-gray-100 border-gray-200`}
              >
                {cat.icon}
                <span className="text-xs text-gray-700 font-medium text-center leading-tight whitespace-pre-line">
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
                <button className="text-xs text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
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

        <section className="relative overflow-hidden rounded-xl flex items-center justify-center p-2">
          <div className="bg-white rounded-lg border border-gray-100 p-5 h-full py-7 shadow-sm w-xl max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-bold text-gray-900 text-base">Upload Prescription</h2>
                </div>
                <p className="text-xs text-gray-500 mb-4">Upload prescription and we will add all medicines for you</p>
                <div className="relative mb-1">
                  <div className="flex items-center border rounded-md overflow-hidden border border-gray-200">
                    <button className="flex-1 py-3 px-3 outline-none text-black text-xs">Upload Prescription</button>

                    <button className="bg-green-600 text-white p-3">
                      <UploadIcon size={18} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span className="text-xs text-gray-500">Formats Supported:</span>
                  {["JPEG", "PNG", "PDF", "JPG"].map((s) => (
                    <button
                      key={s}
                      className="text-xs text-gray-700 bg-gray-100 hover:bg-green-100 hover:text-green-700 px-2 py-0.5 rounded-full transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Medicines */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 ml-2">Popular Medicines</h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
              View All Medicines <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredProducts.map((med, i) => (
              <MedicineCard key={i} medicine={med} index={i} />
            ))}
          </div>
        </section>

        <WellnessBannerSection theme={1} />

        {categoryGroups
          .filter((group) => group.medicines && group.medicines.length > 0)
          .map((group) => (
            <section key={group.category}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 ml-2">{group.category}</h2>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {group.medicines.slice(0, 5).map((product, i) => (
                  <MedicineCard key={product._id ?? i} medicine={toMedicine(product)} index={i} />
                ))}
              </div>
            </section>
          ))}

        {/* Why Choose MDW */}
        <section className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center gap-8 flex-wrap">
            <h3 className="font-bold text-gray-900 text-sm min-w-fit">Why Choose MDW?</h3>
            <div className="flex gap-8 flex-wrap flex-1 items-center justify-around">
              {WHY_CHOOSE.map((item) => (
                <div key={item.title} className="flex items-center gap-2">
                  {item.icon}
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{item.title}</div>
                    <div className="text-[10px] text-gray-500">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Need Help */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-5 flex items-start justify-between gap-6 max-w-3xl mx-auto min-h-[200px]">
          {/* Doctor avatar placeholder */}
          <div className="w-16 h-16 bg-green-200 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
            <span className="text-3xl">👨‍⚕️</span>
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-gray-900 text-lg mb-0.5">Need Help Finding Medicines?</h2>
            <p className="text-sm text-gray-500 mb-3">Our Pharmacist is here to help you.</p>
            <div className="flex gap-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-12 text-xs rounded-md gap-1.5 px-5">
                <FaWhatsapp className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </Button>
              <Button className="border border-green-900 hover:bg-green-50 text-green-700 h-12 px-5 text-xs rounded-md gap-1.5 bg-white">
                <Phone className="w-3.5 h-3.5" />
                Call Us Now
              </Button>
            </div>
          </div>
          <div className="w-full h-[150px] flex flex-col items-end justify-center rounded-md">
            <div className="grid grid-cols-3 gap-2 ">
              {[
                { icon: <PackageCheck className="w-5 h-5 text-green-600" />, label: "Prescription\nAssistance" },
                { icon: <Bell className="w-5 h-5 text-green-600" />, label: "Medicine\nReminder" },
                { icon: <Truck className="w-5 h-5 text-green-600" />, label: "Order\nTracking" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1 text-center border border-gray-200 rounded-md p-2.5">
                  {item.icon}
                  <span className="text-[10px] text-gray-600 whitespace-pre-line leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <MDWFooterBar />
    </div>
  );
}