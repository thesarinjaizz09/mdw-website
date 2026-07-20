"use client"

import Image from "next/image"

const BRANDS = [
  { name: "Abbott", src: "/images/Abbott_logo.png" },
  { name: "Alkem", src: "/images/alkem_logo.png" },
  { name: "Cipla", src: "/images/Cipla_logo.jpg.jpeg" },
  { name: "Glenmark", src: "/images/Glenmark_Pharmaceuticals_logo.png" },
  { name: "Lupin", src: "/images/lupin_ltd_logo.png" },
  { name: "Mankind", src: "/images/Mankind_Pharma_logo.png" },
  { name: "Sun Pharma", src: "/images/Sun_Pharma_logo.png" },
  { name: "Torrent", src: "/images/Torrent-Pharma-logo.png" },
  { name: "Zydus", src: "/images/Zydus_Logo.jpg.jpeg" },
]

export default function BrandCarousel() {
  return (
    <section className="w-full overflow-hidden bg-[#F4658B] py-8 rounded-sm">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-white">
          Trusted by India's Top Pharma Brands
        </h2>
        <p className="text-sm text-gray-200">
          Genuine medicines directly from the manufacturers
        </p>
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Gradient fade left */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
        {/* Gradient fade right */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

        <div className="group overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
            {/* First set */}
            {BRANDS.map((brand) => (
              <div
                key={brand.name}
                className="flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-4 shadow-sm transition-all duration-200 hover:border-[#F4568B]/30 hover:shadow-md border border-black shadow-md"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain grayscale transition-all duration-200 hover:grayscale-0"
                  style={{ filter: "brightness(0.7) contrast(0.9)" }}
                  onLoadingComplete={(img) => {
                    img.style.filter = "none"
                  }}
                />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {BRANDS.map((brand) => (
              <div
                key={`dup-${brand.name}`}
                className="flex h-20 w-36 flex-shrink-0 items-center justify-center rounded-lg border border-gray-100 bg-white px-4 shadow-sm transition-all duration-200 hover:border-[#F4568B]/30 hover:shadow-md"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={120}
                  height={48}
                  className="max-h-12 w-auto object-contain grayscale transition-all duration-200 hover:grayscale-0"
                  style={{ filter: "brightness(0.7) contrast(0.9)" }}
                  onLoadingComplete={(img) => {
                    img.style.filter = "none"
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}