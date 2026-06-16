"use client";

const reasons = [
  {
    title: "Licensed Pharmacy",
    subtitle: "Registered & Compliant",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path
          d="M20 4L6 10v10c0 8.84 5.96 17.12 14 19.28C28.04 37.12 34 28.84 34 20V10L20 4z"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <path
          d="M14 20l4 4 8-8"
          stroke="#1a7a4a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Expert Pharmacists",
    subtitle: "We care for your health",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="13" r="7" fill="#d1fae5" stroke="#1a7a4a" strokeWidth="1.5" />
        <path
          d="M8 34c0-6.63 5.37-12 12-12s12 5.37 12 12"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26 20l2 2 4-3"
          stroke="#1a7a4a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Fast & Safe Delivery",
    subtitle: "Quick delivery at doorstep",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <path
          d="M4 22h22V15l-6-8H4v15z"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <path
          d="M26 18h6l3 4v5h-9V18z"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <circle cx="10" cy="29" r="3" fill="#1a7a4a" opacity="0.4" stroke="#1a7a4a" strokeWidth="1.2" />
        <circle cx="30" cy="29" r="3" fill="#1a7a4a" opacity="0.4" stroke="#1a7a4a" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    subtitle: "100% Safe & Secure",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <rect x="4" y="12" width="32" height="22" rx="4" fill="#d1fae5" stroke="#1a7a4a" strokeWidth="1.5" />
        <path d="M4 19h32" stroke="#1a7a4a" strokeWidth="1.5" />
        <rect x="8" y="24" width="8" height="4" rx="1" fill="#1a7a4a" opacity="0.4" />
        <rect x="8" y="10" width="24" height="4" rx="2" fill="#1a7a4a" opacity="0.15" stroke="#1a7a4a" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-12">
          Why Choose MDW?
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-200 border border-transparent hover:border-green-100"
            >
              <div className="shrink-0">{reason.icon}</div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-snug">{reason.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{reason.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}