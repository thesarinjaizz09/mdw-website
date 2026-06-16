"use client";

const steps = [
  {
    step: "1",
    title: "Upload / Search",
    description: "Upload Prescription or Search Medicines",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="8" y="4" width="24" height="32" rx="3" stroke="#1a7a4a" strokeWidth="2" fill="#f0faf4"/>
        <path d="M14 14h12M14 20h8M14 26h10" stroke="#1a7a4a" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="36" cy="36" r="8" fill="#d1fae5" stroke="#1a7a4a" strokeWidth="2"/>
        <path d="M33 36h6M36 33v6" stroke="#1a7a4a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    step: "2",
    title: "Confirm Order",
    description: "Our Pharmacist will review and confirm your order",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="10" width="36" height="28" rx="4" fill="#f0faf4" stroke="#1a7a4a" strokeWidth="2"/>
        <path d="M6 18h36" stroke="#1a7a4a" strokeWidth="1.5"/>
        <circle cx="12" cy="14" r="2" fill="#1a7a4a"/>
        <circle cx="18" cy="14" r="2" fill="#1a7a4a" opacity="0.4"/>
        <circle cx="24" cy="14" r="2" fill="#1a7a4a" opacity="0.2"/>
        <rect x="12" y="24" width="10" height="8" rx="2" fill="#1a7a4a" opacity="0.2"/>
        <path d="M26 26l2 2 4-4" stroke="#1a7a4a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    step: "3",
    title: "Fast Delivery",
    description: "Get your order delivered at your doorstep",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path d="M4 28h28V18l-8-10H4v20z" fill="#f0faf4" stroke="#1a7a4a" strokeWidth="2"/>
        <path d="M32 22h8l4 6v6H32V22z" fill="#d1fae5" stroke="#1a7a4a" strokeWidth="2"/>
        <circle cx="12" cy="36" r="4" fill="#1a7a4a" opacity="0.3" stroke="#1a7a4a" strokeWidth="1.5"/>
        <circle cx="36" cy="36" r="4" fill="#1a7a4a" opacity="0.3" stroke="#1a7a4a" strokeWidth="1.5"/>
        <circle cx="12" cy="36" r="1.5" fill="#1a7a4a"/>
        <circle cx="36" cy="36" r="1.5" fill="#1a7a4a"/>
        <path d="M8 22h10" stroke="#1a7a4a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-14">
          How It Works
        </h2>

        <div className="relative flex flex-col md:flex-row items-start justify-center gap-8 md:gap-0">
          {steps.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col items-center text-center flex-1 px-4">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+48px)] right-0 border-t-2 border-dashed border-[#1a7a4a]/30 z-0" />
              )}

              {/* Icon Circle */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-[#1a7a4a]/20 shadow-md flex items-center justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-base font-bold text-gray-900 mb-2">
                {step.step}. {step.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}