"use client"

import { Zap, AlertCircleIcon } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

interface ProductData {
  _id: string
  name: string
  productInformation?: string
  howToUse?: string
  sideEffects?: string
  faqs?: FAQ[]
  usage?: string
  benefits?: string
  howItWorks?: string
  safetyAdvice?: string
  quickTips?: string
}

interface ProductInfoDetailsProps {
  med: ProductData
}

export default function ProductInfoDetails({ med }: ProductInfoDetailsProps) {
  const sections = [
    {
      id: "description",
      label: "PRODUCT INFORMATION",
      show: Boolean(med.productInformation),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Description</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
            {med.productInformation}
          </p>
        </div>
      ),
    },
    {
      id: "benefits",
      label: "MEDICAL BENEFITS",
      show: Boolean(med.benefits),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Key Benefits</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
            {med.benefits}
          </p>
        </div>
      ),
    },
    {
      id: "how-it-works",
      label: "HOW IT WORKS",
      show: Boolean(med.howItWorks),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">How It Works</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
            {med.howItWorks}
          </p>
        </div>
      ),
    },
    {
      id: "how-to-use",
      label: "DIRECTIONS FOR USE",
      show: Boolean(med.howToUse || med.usage),
      render: () => (
        <div className="space-y-4">
          <h3 className="text-base font-bold text-gray-900">
            Directions for Use
          </h3>
          {med.howToUse && (
            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
              {med.howToUse}
            </p>
          )}
          {med.usage && (
            <div className="pt-1">
              <p className="text-base font-bold text-gray-900">Common Usage:</p>
              <p className="mt-1 text-sm leading-relaxed whitespace-pre-line text-gray-600">
                {med.usage}
              </p>
            </div>
          )}
        </div>
      ),
    },
    {
      id: "side-effects",
      label: "SIDE EFFECTS",
      show: Boolean(med.sideEffects),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Side Effects</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
            {med.sideEffects}
          </p>
        </div>
      ),
    },
    {
      id: "safety-advice",
      label: "SAFETY INFORMATION",
      show: Boolean(med.safetyAdvice),
      render: () => (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertCircleIcon className="h-5 w-5 shrink-0 text-red-500" />
            <h3 className="text-base font-bold text-gray-900">Safety Advice</h3>
          </div>
          <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
            {med.safetyAdvice}
          </p>
        </div>
      ),
    },
    {
      id: "quick-tips",
      label: "QUICK TIPS",
      show: Boolean(med.quickTips),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">Quick Tips</h3>
          <div>
            <p className="text-sm leading-relaxed whitespace-pre-line text-gray-600">
              {med.quickTips}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "faqs",
      label: "FAQS",
      show: Boolean(med.faqs && med.faqs.length > 0),
      render: () => (
        <div className="space-y-3">
          <h3 className="text-base font-bold text-gray-900">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4 pt-2">
            {med.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-gray-100 pb-3 last:border-0 last:pb-0"
              >
                <p className="text-sm font-semibold text-gray-800">
                  Q: {faq.question}
                </p>
                <p className="mt-1 text-sm text-gray-600">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ]

  const visibleSections = sections.filter((s) => s.show)

  if (visibleSections.length === 0) {
    return null
  }

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(`section-${id}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      {/* Sticky Navigation Bar */}
      <div className="sticky top-0 z-20 border-b border-gray-100 bg-white px-6 py-4">
        <div className="overflow-hidden">
          <div className="-ml-6 flex flex-wrap items-center gap-y-3">
            {visibleSections.map((sec) => (
              <div
                key={sec.id}
                className="flex items-center before:inline-flex before:w-6 before:items-center before:justify-center before:text-xs before:text-gray-300 before:content-['|'] before:select-none"
              >
                <button
                  onClick={() => handleScrollToSection(sec.id)}
                  className="text-[10px] font-bold tracking-wider whitespace-nowrap text-gray-600 uppercase transition-all hover:text-green-600 md:text-xs"
                >
                  {sec.label}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Content Sections */}
      <div className="space-y-2 p-6">
        {visibleSections.map((sec, idx) => (
          <div
            key={sec.id}
            id={`section-${sec.id}`}
            style={{ scrollMarginTop: "150px" }}
            className={idx > 0 ? "pt-8" : ""}
          >
            {sec.render()}
          </div>
        ))}
      </div>
    </div>
  )
}
