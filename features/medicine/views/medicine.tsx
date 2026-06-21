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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar, MedicineImagePlaceholder, MedicineSearchInput } from "@/components/shared";
import { MedicineCard } from "../components/card";
import { MEDICINES } from "@/types";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";

const CATEGORIES = [
  { icon: "💉", label: "Diabetes\nCare", color: "bg-blue-50" },
  { icon: "❤️", label: "Blood Pressure\nCare", color: "bg-red-50" },
  { icon: "🫀", label: "Heart\nCare", color: "bg-pink-50" },
  { icon: "🦴", label: "Bone & Joint\nCare", color: "bg-purple-50" },
  { icon: "🧠", label: "Neurology\nCare", color: "bg-indigo-50" },
  { icon: "👶", label: "Baby\nCare", color: "bg-yellow-50" },
  { icon: "🧴", label: "Personal\nCare", color: "bg-teal-50" },
  { icon: "🐾", label: "Pet\nMedicines", color: "bg-green-50" },
];

const WHY_CHOOSE = [
  { icon: <UserCheck className="w-5 h-5 text-green-600" />, title: "Licensed Pharmacy", sub: "Drug License Approved" },
  { icon: <Shield className="w-5 h-5 text-green-600" />, title: "Registered Pharmacist", sub: "Always Available" },
  { icon: <CheckCircle className="w-5 h-5 text-green-600" />, title: "100% Genuine", sub: "Medicines" },
  { icon: <Truck className="w-5 h-5 text-green-600" />, title: "20 Min Delivery*", sub: "In Selected Areas" },
  { icon: <Shield className="w-5 h-5 text-green-600" />, title: "Secure Payments", sub: "100% Safe" },
];

export default function MedicinesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader cartCount={0} />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <section className="relative rounded-2xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50s min-h-[220px] flex items-center justify-between">
          {/* Content */}
          <div className="relative z-10 p-8 md:p-10 max-w-xl">
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

          <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm w-xl">
            <h2 className="font-bold text-gray-900 text-base mb-0.5">Search Medicine</h2>
            <p className="text-xs text-gray-500 mb-3">Find your medicines quickly</p>
            <div className="relative z-50">
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
        </section>

        {/* Health Categories */}
        <section className="z-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 ml-2">Shop by Health Categories</h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
              View All Categories <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                className={`${cat.color} rounded-xl p-3 flex flex-col items-center gap-2 hover:shadow-sm hover:scale-105 transition-all`}
              >
                <span className="text-2xl">{cat.icon}</span>
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

        {/* Popular Medicines */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 ml-2">Popular Medicines</h2>
            <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-0.5">
              View All Medicines <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {MEDICINES.map((med, i) => (
              <MedicineCard key={med.id} medicine={med} index={i} />
            ))}
          </div>
        </section>

        {/* Search + Upload Row */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50s min-h-[220px] flex items-center justify-center">
          <div className="bg-white rounded-xl border border-gray-100 p-5 py-7 shadow-sm w-xl">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Upload className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="font-bold text-gray-900 text-base">Upload Prescription</h2>
                </div>
                <p className="text-xs text-gray-500 mb-3 ml-10">Upload prescription and we will add all medicines for you</p>
                <Button size="sm" className="ml-10 bg-green-600 hover:bg-green-700 text-white h-8 text-xs rounded-lg">
                  Upload Prescription
                </Button>
              </div>
              <div className="flex-shrink-0 w-16 h-16 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
                <span className="text-2xl font-serif font-bold text-gray-300">Rx</span>
              </div>
            </div>
          </div>
        </section>

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
        <section className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 p-5 flex items-center gap-6">
          {/* Doctor avatar placeholder */}
          <div className="w-16 h-16 bg-green-200 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden">
            <span className="text-3xl">👨‍⚕️</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base mb-0.5">Need Help Finding Medicines?</h3>
            <p className="text-sm text-gray-500 mb-3">Our Pharmacist is here to help you.</p>
            <div className="flex gap-3">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white h-8 text-xs rounded-lg gap-1.5">
                <MessageCircle className="w-3.5 h-3.5" />
                Chat on WhatsApp
              </Button>
              <Button size="sm" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 h-8 text-xs rounded-lg gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                Call Us Now
              </Button>
            </div>
          </div>
          <div className="flex gap-6 ml-auto">
            {[
              { icon: <PackageCheck className="w-5 h-5 text-green-600" />, label: "Prescription\nAssistance" },
              { icon: <Bell className="w-5 h-5 text-green-600" />, label: "Medicine\nReminder" },
              { icon: <Truck className="w-5 h-5 text-green-600" />, label: "Order\nTracking" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                {item.icon}
                <span className="text-[10px] text-gray-600 whitespace-pre-line leading-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MDWFooterBar />
    </div>
  );
}