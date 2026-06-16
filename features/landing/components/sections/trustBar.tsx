"use client";

const credentials = [
  {
    title: "Drug License",
    subtitle: "Approved",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="24" r="20" fill="#f0faf4" stroke="#1a7a4a" strokeWidth="1.5" />
        <path d="M24 10a14 14 0 1 1 0 28A14 14 0 0 1 24 10z" fill="#d1fae5" />
        <path d="M18 24l4 4 8-8" stroke="#1a7a4a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="24" cy="10" r="3" fill="#1a7a4a" opacity="0.3" />
        <path d="M20 8h8" stroke="#1a7a4a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "GST Registered",
    subtitle: "Business",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="8" width="36" height="32" rx="4" fill="#f0faf4" stroke="#1a7a4a" strokeWidth="1.5" />
        <path d="M6 18h36" stroke="#1a7a4a" strokeWidth="1.2" />
        <rect x="12" y="24" width="10" height="4" rx="1" fill="#1a7a4a" opacity="0.3" />
        <rect x="26" y="24" width="10" height="4" rx="1" fill="#1a7a4a" opacity="0.3" />
        <rect x="12" y="31" width="6" height="3" rx="1" fill="#1a7a4a" opacity="0.2" />
        <rect x="30" y="12" width="8" height="3" rx="1" fill="#1a7a4a" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "100% Genuine",
    subtitle: "Medicines",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path
          d="M24 4L8 12v12c0 10.6 7.15 20.54 16 23C32.85 44.54 40 34.6 40 24V12L24 4z"
          fill="#f0faf4"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <path
          d="M17 24l5 5 9-9"
          stroke="#1a7a4a"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Secure & Safe",
    subtitle: "Payments",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <rect x="6" y="16" width="36" height="24" rx="4" fill="#f0faf4" stroke="#1a7a4a" strokeWidth="1.5" />
        <path d="M6 24h36" stroke="#1a7a4a" strokeWidth="1.2" />
        <rect x="10" y="29" width="8" height="5" rx="1.5" fill="#1a7a4a" opacity="0.35" />
        <path
          d="M16 12a8 8 0 0 1 16 0v4H16v-4z"
          fill="#d1fae5"
          stroke="#1a7a4a"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="14" r="2" fill="#1a7a4a" opacity="0.4" />
      </svg>
    ),
  },
];

export default function TrustBarSection() {
  return (
    <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-12">
          Your Health, Our Priority
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {credentials.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-gray-50 hover:bg-green-50 transition-colors duration-200 border border-transparent hover:border-green-100"
            >
              <div>{item.icon}</div>
              <div>
                <p className="text-sm font-bold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}