"use client";

import { ArrowRight } from "lucide-react";

const services = [
  {
    id: "medicine",
    title: "Medicine Delivery",
    description: "Upload Prescription or Order Medicines",
    accentColor: "#1a7a4a",
    bgColor: "#f0faf4",
    iconBg: "#d1fae5",
    arrowBg: "#1a7a4a",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <rect x="12" y="8" width="24" height="40" rx="4" fill="#1a7a4a" opacity="0.15"/>
        <rect x="16" y="12" width="16" height="32" rx="2" fill="#1a7a4a" opacity="0.3"/>
        <circle cx="44" cy="44" r="14" fill="#22c55e" opacity="0.2"/>
        <circle cx="44" cy="44" r="10" fill="#22c55e" opacity="0.4"/>
        <path d="M40 44h8M44 40v8" stroke="#1a7a4a" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="18" y="18" width="12" height="3" rx="1.5" fill="#1a7a4a" opacity="0.5"/>
        <rect x="18" y="24" width="8" height="3" rx="1.5" fill="#1a7a4a" opacity="0.5"/>
      </svg>
    ),
  },
  {
    id: "wellness",
    title: "Wellness at Home",
    description: "Therapy, Physiotherapy, Nutrition & More",
    accentColor: "#7c3aed",
    bgColor: "#f5f3ff",
    iconBg: "#ede9fe",
    arrowBg: "#7c3aed",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <circle cx="32" cy="32" r="22" fill="#7c3aed" opacity="0.1"/>
        <circle cx="32" cy="18" r="7" fill="#7c3aed" opacity="0.4"/>
        <path d="M18 50c0-7.73 6.27-14 14-14s14 6.27 14 14" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.5"/>
        <path d="M24 34l8-4 8 4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6"/>
        <circle cx="32" cy="32" r="4" fill="#7c3aed" opacity="0.3"/>
      </svg>
    ),
  },
  {
    id: "paws",
    title: "Paws Nest",
    description: "Pet Medicines & Pet Care Products",
    accentColor: "#f97316",
    bgColor: "#fff7ed",
    iconBg: "#ffedd5",
    arrowBg: "#f97316",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <ellipse cx="32" cy="44" rx="16" ry="12" fill="#f97316" opacity="0.15"/>
        <circle cx="22" cy="28" r="5" fill="#f97316" opacity="0.4"/>
        <circle cx="42" cy="28" r="5" fill="#f97316" opacity="0.4"/>
        <ellipse cx="32" cy="38" rx="12" ry="9" fill="#f97316" opacity="0.3"/>
        <circle cx="28" cy="36" r="2" fill="#f97316" opacity="0.6"/>
        <circle cx="36" cy="36" r="2" fill="#f97316" opacity="0.6"/>
        <path d="M28 42c1.33 1.33 6.67 1.33 8 0" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <circle cx="15" cy="20" r="3.5" fill="#f97316" opacity="0.3"/>
        <circle cx="49" cy="20" r="3.5" fill="#f97316" opacity="0.3"/>
        <circle cx="20" cy="16" r="3" fill="#f97316" opacity="0.25"/>
        <circle cx="44" cy="16" r="3" fill="#f97316" opacity="0.25"/>
      </svg>
    ),
  },
  {
    id: "lab",
    title: "Lab Tests",
    description: "Book Home Collection for Lab Tests",
    accentColor: "#2563eb",
    bgColor: "#eff6ff",
    iconBg: "#dbeafe",
    arrowBg: "#2563eb",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16">
        <rect x="26" y="10" width="12" height="28" rx="3" fill="#2563eb" opacity="0.2"/>
        <rect x="28" y="12" width="8" height="20" rx="2" fill="#2563eb" opacity="0.3"/>
        <ellipse cx="32" cy="46" rx="14" ry="10" fill="#2563eb" opacity="0.15"/>
        <ellipse cx="32" cy="46" rx="10" ry="7" fill="#2563eb" opacity="0.25"/>
        <path d="M24 34l-4 8a10 10 0 0 0 24 0l-4-8" fill="#2563eb" opacity="0.2"/>
        <rect x="20" y="8" width="5" height="2" rx="1" fill="#2563eb" opacity="0.4" transform="rotate(-30 20 8)"/>
        <rect x="39" y="8" width="5" height="2" rx="1" fill="#2563eb" opacity="0.4" transform="rotate(30 39 8)"/>
        <circle cx="32" cy="46" r="4" fill="#2563eb" opacity="0.4"/>
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10">
          What would you like to do today?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative flex flex-col rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg border border-transparent hover:border-gray-100"
              style={{ backgroundColor: service.bgColor }}
            >
              {/* Icon */}
              <div className="mb-4">{service.icon}</div>

              {/* Text */}
              <h3 className="text-base font-bold text-gray-900 mb-1.5">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Arrow Button */}
              <div className="mt-5">
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:shadow-md"
                  style={{ backgroundColor: service.arrowBg }}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}