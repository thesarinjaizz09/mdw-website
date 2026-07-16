"use client"

import { Users, Heart, Clock } from "lucide-react"

const features = [
  { icon: Users, label: "Expert Professionals" },
  { icon: Heart, label: "Personalized Care" },
  { icon: Clock, label: "At Your Convenience" },
]

export default function WellnessBannerSection({
  theme = 2,
}: {
  theme?: number
}) {
  if (theme === 1) {
    return (
      <section className="bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="p overflow-hidden rounded-lg border border-gray-100 shadow-sm bg-[#F4568B]">
            <div className="flex flex-col min-[500px]:flex-row">
              {/* Image Side */}
              <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden sm:min-h-[250px] lg:w-[40%]">
                {/* Physiotherapy illustration placeholder */}
                <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
                  <svg viewBox="0 0 180 160" fill="none" className="h-20 w-48">
                    {/* Person 1 - therapist */}
                    <circle cx="60" cy="40" r="18" fill="#1a7a4a" />
                    <rect
                      x="42"
                      y="60"
                      width="36"
                      height="55"
                      rx="8"
                      fill="#1a7a4a"
                    />
                    <rect
                      x="78"
                      y="68"
                      width="30"
                      height="8"
                      rx="4"
                      fill="#1a7a4a"
                    />
                    {/* Person 2 - patient */}
                    <circle cx="130" cy="45" r="16" fill="#155e38" />
                    <rect
                      x="114"
                      y="63"
                      width="32"
                      height="50"
                      rx="8"
                      fill="#155e38"
                    />
                    {/* Arm reaching */}
                    <rect
                      x="76"
                      y="72"
                      width="40"
                      height="6"
                      rx="3"
                      fill="#1a7a4a"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
              </div>
              {/* Content Side */}
              <div className="flex items-center p-5 pt-0 lg:w-[60%]">
                <div className="flex-1">
                  <h2 className="mb-3 text-xl font-extrabold text-white min-[500px]:text-2xl sm:text-3xl">
                    Wellness at Your Home
                  </h2>
                  <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/90">
                    Physiotherapy, Pain Relief Therapy, Nutrition, Fitness,
                    Stress Management & more.
                  </p>
                  <button className="rounded-md bg-[#F4568B]/80 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#F4568B] hover:shadow-lg active:scale-[0.98] border border-white/20">
                    Explore Wellness Services
                  </button>
                </div>
                {/* <div className="flex flex-col gap-4 lg:min-w-[200px]">
                                    {features.map((f) => (
                                        <div key={f.label} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                                                <f.icon size={20} className="text-[#1a7a4a]" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">{f.label}</span>
                                        </div>
                                    ))}
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="p overflow-hidden rounded-2xl border border-gray-100  shadow-sm bg-[#F4568B]">
          <div className="flex flex-col lg:flex-row">
            {/* Image Side */}
            <div className="relative flex min-h-[350px] items-center justify-center overflow-hidden lg:w-[40%]">
              {/* Physiotherapy illustration placeholder */}
              <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
                <svg viewBox="0 0 180 160" fill="none" className="h-40 w-48">
                  {/* Person 1 - therapist */}
                  <circle cx="60" cy="40" r="18" fill="#1a7a4a" />
                  <rect
                    x="42"
                    y="60"
                    width="36"
                    height="55"
                    rx="8"
                    fill="#1a7a4a"
                  />
                  <rect
                    x="78"
                    y="68"
                    width="30"
                    height="8"
                    rx="4"
                    fill="#1a7a4a"
                  />
                  {/* Person 2 - patient */}
                  <circle cx="130" cy="45" r="16" fill="#155e38" />
                  <rect
                    x="114"
                    y="63"
                    width="32"
                    height="50"
                    rx="8"
                    fill="#155e38"
                  />
                  {/* Arm reaching */}
                  <rect
                    x="76"
                    y="72"
                    width="40"
                    height="6"
                    rx="3"
                    fill="#1a7a4a"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
            </div>

            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 lg:w-[60%] lg:p-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
                {/* Text block */}
                <div className="flex-1">
                  <h2 className="mb-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Wellness at Your Home
                  </h2>
                  <p className="mb-6 max-w-sm text-sm leading-relaxed text-gray-500">
                    Physiotherapy, Pain Relief Therapy, Nutrition, Fitness,
                    Stress Management & more.
                  </p>
                  <button className="rounded-lg bg-[#1a7a4a] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#155e38] hover:shadow-lg active:scale-[0.98]">
                    Explore Wellness Services
                  </button>
                </div>

                {/* Feature list */}
                <div className="flex flex-col gap-4 lg:min-w-[200px]">
                  {features.map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-100 bg-green-50">
                        <f.icon size={20} className="text-[#1a7a4a]" />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
