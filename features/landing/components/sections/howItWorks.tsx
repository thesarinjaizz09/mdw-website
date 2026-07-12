"use client"

import { cn } from "@/lib/utils"

const steps = [
  {
    step: "1",
    title: "Upload / Search",
    description: "Upload Prescription or Search Medicines",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect
          x="8"
          y="4"
          width="24"
          height="32"
          rx="3"
          stroke="#1a7a4a"
          strokeWidth="2"
          fill="#f0faf4"
        />
        <path
          d="M14 14h12M14 20h8M14 26h10"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle
          cx="36"
          cy="36"
          r="8"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="2"
        />
        <path
          d="M33 36h6M36 33v6"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Confirm Order",
    description: "Our Pharmacist will review and confirm",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <rect
          x="6"
          y="10"
          width="36"
          height="28"
          rx="4"
          fill="#f0faf4"
          stroke="#1a7a4a"
          strokeWidth="2"
        />
        <path d="M6 18h36" stroke="#1a7a4a" strokeWidth="1.5" />
        <circle cx="12" cy="14" r="2" fill="#1a7a4a" />
        <circle cx="18" cy="14" r="2" fill="#1a7a4a" opacity="0.4" />
        <circle cx="24" cy="14" r="2" fill="#1a7a4a" opacity="0.2" />
        <rect
          x="12"
          y="24"
          width="10"
          height="8"
          rx="2"
          fill="#1a7a4a"
          opacity="0.2"
        />
        <path
          d="M26 26l2 2 4-4"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Fast Delivery",
    description: "Get your order delivered at your doorstep",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10">
        <path
          d="M4 28h28V18l-8-10H4v20z"
          fill="#f0faf4"
          stroke="#1a7a4a"
          strokeWidth="2"
        />
        <path
          d="M32 22h8l4 6v6H32V22z"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="2"
        />
        <circle
          cx="12"
          cy="36"
          r="4"
          fill="#1a7a4a"
          opacity="0.3"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <circle
          cx="36"
          cy="36"
          r="4"
          fill="#1a7a4a"
          opacity="0.3"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="36" r="1.5" fill="#1a7a4a" />
        <circle cx="36" cy="36" r="1.5" fill="#1a7a4a" />
        <path
          d="M8 22h10"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export default function HowItWorksSection({ theme = 2 }: { theme?: number }) {
  if (theme === 1) {
    return (
      <section className="w-full max-w-2xl rounded-md border border-gray-100 bg-gray-50 py-10 shadow-sm min-[540px]:w-[30rem] md:w-full lg:py-5">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-md sm:text-md mb-8 text-left font-extrabold text-gray-900">
            How It Works
          </h2>

          <div className="relative flex flex-col items-start justify-center gap-8 md:flex-row md:gap-0">
            <div
              className={cn(
                "absolute z-0 hidden border-t-2 border-dashed border-[#1a7a4a]/30 md:block",
                theme === 1
                  ? "top-6 right-[26.66%] left-[10.66%]"
                  : "top-10 right-[16.66%] left-[16.66%]"
              )}
            />
            <div
              className={cn(
                "absolute z-0 block border-r-2 border-dashed border-[#1a7a4a]/30 md:hidden",
                theme === 1
                  ? "top-6 bottom-[10%] left-[38px] min-[540px]:left-[9%]"
                  : "top-10 right-[16.66%] left-[16.66%]"
              )}
            />

            {steps.map((step, idx) => (
              <div
                key={step.step}
                className="text-centers relative flex flex-1 items-start gap-4 px-4 md:flex-col md:gap-0"
              >
                {/* Connector line */}
                {/* {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-[20%] left-[calc(50%+38px)] right-0 border-t-2 border-dashed border-[#1a7a4a]/30 z-0 flex flex-col items-start justify-start" />
                )} */}

                {/* Icon Circle */}
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-md border-2 border-[#1a7a4a]/20 bg-white p-1.5 shadow-md">
                  {step.icon}
                </div>

                <div>
                  <p className="mb-2 w-full text-left text-xs font-bold text-gray-900">
                    {step.step}. {step.title}
                  </p>
                  <p className="text-justifys max-w-[180px] text-[10px] leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-14 text-center text-2xl font-extrabold text-gray-900 sm:text-3xl">
          How It Works
        </h2>

        <div className="relative flex flex-col items-start justify-center gap-8 md:flex-row md:gap-0">
          <div
            className={cn(
              "absolute z-0 hidden border-t-2 border-dashed border-[#1a7a4a]/30 md:block",
              theme === 1
                ? "top-6 right-[16.66%] left-[16.66%]"
                : "top-10 right-[16.66%] left-[16.66%]"
            )}
          />
          {steps.map((step, idx) => (
            <div
              key={step.step}
              className="relative flex flex-1 flex-col items-center px-4 text-center"
            >
              {/* Connector line */}
              {/* {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+48px)] right-0 border-t-2 border-dashed border-[#1a7a4a]/30 z-0" />
              )} */}

              {/* Icon Circle */}
              <div className="relative z-10 mb-5 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#1a7a4a]/20 bg-white shadow-md">
                {step.icon}
              </div>

              <h3 className="mb-2 text-base font-bold text-gray-900">
                {step.step}. {step.title}
              </h3>
              <p className="max-w-[180px] text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
