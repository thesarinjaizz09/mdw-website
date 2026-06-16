"use client";

import { Clock, Shield, UserCheck, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const trustBadges = [
  { icon: Clock, label: "20 Min", sub: "Express Delivery" },
  { icon: Shield, label: "Genuine", sub: "100% Original Medicines" },
  { icon: UserCheck, label: "Expert", sub: "Pharmacist Support" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl ">
        <div className="relative min-h-[520px] flex items-center pl-1 lg:pl-4.5">
          {/* Left Content */}
          <div className="relative z-10 w-full lg:w-[55%] py-14 lg:py-20">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Healthcare
              <br />
              at Your Doorstep
            </h1>
            <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-md">
              Medicines, Wellness & More –{" "}
              <span className="text-[#1a7a4a] font-semibold">
                Delivered Fast, Trusted by Thousands.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              {/* Order Medicine Button */}
              <button className="flex items-center gap-3 bg-[#1a7a4a] hover:bg-[#155e38] text-white px-6 py-3.5 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
                <span className="w-9 h-9 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block font-bold text-base">Order Medicine</span>
                  <span className="block text-xs text-green-200 font-normal">20-Minute Delivery</span>
                </span>
              </button>

              {/* Book Wellness Button */}
              <button className="flex items-center gap-3 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 px-6 py-3.5 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200 active:scale-[0.98]">
                <span className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a7a4a" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block font-bold text-base text-gray-800">Book Wellness Service</span>
                  <span className="block text-xs text-gray-500 font-normal">Home Service</span>
                </span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 flex flex-wrap items-center gap-6 border border-gray-200 px-4 py-4 rounded-lg z-2">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center bg-white">
                    <badge.icon size={16} className="text-[#1a7a4a]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 leading-none">{badge.label}</p>
                    <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Family Image Placeholder */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[52.5%]">
            <div className="w-full h-full bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
              {/* Decorative family illustration placeholder */}
              <div className="relative w-full h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/60 z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-[#1a7a4a]/20 select-none">
                    <svg viewBox="0 0 400 350" className="w-80 h-64 opacity-30" fill="currentColor">
                      {/* Simple family silhouette */}
                      <ellipse cx="140" cy="300" rx="40" ry="10" opacity="0.3"/>
                      <circle cx="140" cy="200" r="28" />
                      <rect x="112" y="230" width="56" height="70" rx="8"/>
                      <ellipse cx="220" cy="300" rx="35" ry="10" opacity="0.3"/>
                      <circle cx="220" cy="210" r="24" />
                      <rect x="196" y="236" width="48" height="65" rx="8"/>
                      <ellipse cx="290" cy="300" rx="32" ry="10" opacity="0.3"/>
                      <circle cx="290" cy="215" r="22" />
                      <rect x="268" y="239" width="44" height="62" rx="8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trusted by Floating Badge */}
          <div className="hidden lg:flex absolute right-30 bottom-12 z-20 bg-white rounded-lg shadow-xl px-5 py-5.5 items-center gap-3 border border-gray-100">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-green-300 to-emerald-500 flex items-center justify-center text-white text-xs font-bold"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[11px] text-gray-500 font-medium">Trusted by</p>
              <p className="text-sm font-extrabold text-gray-900">10,000+ Families</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919876543210"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform z-50"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={26} className="text-white" />
      </a>
    </section>
  );
}