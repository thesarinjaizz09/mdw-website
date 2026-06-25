"use client";

import { Users, Heart, Clock } from "lucide-react";

const features = [
    { icon: Users, label: "Expert Professionals" },
    { icon: Heart, label: "Personalized Care" },
    { icon: Clock, label: "At Your Convenience" },
];

export default function WellnessBannerSection({ theme = 2 }: { theme?: number }) {
    if (theme === 1) {
        return (
            <section className="bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p">
                        <div className="flex flex-col lg:flex-row">
                            {/* Image Side */}
                            <div className="lg:w-[40%] min-h-[250px] relative flex items-center justify-center overflow-hidden">
                                {/* Physiotherapy illustration placeholder */}
                                <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
                                    <svg viewBox="0 0 180 160" fill="none" className="w-48 h-20">
                                        {/* Person 1 - therapist */}
                                        <circle cx="60" cy="40" r="18" fill="#1a7a4a" />
                                        <rect x="42" y="60" width="36" height="55" rx="8" fill="#1a7a4a" />
                                        <rect x="78" y="68" width="30" height="8" rx="4" fill="#1a7a4a" />
                                        {/* Person 2 - patient */}
                                        <circle cx="130" cy="45" r="16" fill="#155e38" />
                                        <rect x="114" y="63" width="32" height="50" rx="8" fill="#155e38" />
                                        {/* Arm reaching */}
                                        <rect x="76" y="72" width="40" height="6" rx="3" fill="#1a7a4a" opacity="0.7" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                            </div>
                            {/* Content Side */}
                            <div className="lg:w-[60%] flex items-center">
                                <div className="flex-1">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                                        Wellness at Your Home
                                    </h2>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                                        Physiotherapy, Pain Relief Therapy, Nutrition, Fitness, Stress Management & more.
                                    </p>
                                    <button className="bg-[#1a7a4a] hover:bg-[#155e38] text-white px-6 py-3 rounded-md font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
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
        );
    }

    return (
        <section className="py-16 lg:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p">
                    <div className="flex flex-col lg:flex-row">
                        {/* Image Side */}
                        <div className="lg:w-[40%] min-h-[350px] relative flex items-center justify-center overflow-hidden">
                            {/* Physiotherapy illustration placeholder */}
                            <div className="relative z-10 flex flex-col items-center gap-3 opacity-40">
                                <svg viewBox="0 0 180 160" fill="none" className="w-48 h-40">
                                    {/* Person 1 - therapist */}
                                    <circle cx="60" cy="40" r="18" fill="#1a7a4a" />
                                    <rect x="42" y="60" width="36" height="55" rx="8" fill="#1a7a4a" />
                                    <rect x="78" y="68" width="30" height="8" rx="4" fill="#1a7a4a" />
                                    {/* Person 2 - patient */}
                                    <circle cx="130" cy="45" r="16" fill="#155e38" />
                                    <rect x="114" y="63" width="32" height="50" rx="8" fill="#155e38" />
                                    {/* Arm reaching */}
                                    <rect x="76" y="72" width="40" height="6" rx="3" fill="#1a7a4a" opacity="0.7" />
                                </svg>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                        </div>

                        {/* Content Side */}
                        <div className="lg:w-[60%] p-8 lg:p-12 flex flex-col justify-center">
                            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                {/* Text block */}
                                <div className="flex-1">
                                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                                        Wellness at Your Home
                                    </h2>
                                    <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-sm">
                                        Physiotherapy, Pain Relief Therapy, Nutrition, Fitness, Stress Management & more.
                                    </p>
                                    <button className="bg-[#1a7a4a] hover:bg-[#155e38] text-white px-6 py-3 rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]">
                                        Explore Wellness Services
                                    </button>
                                </div>

                                {/* Feature list */}
                                <div className="flex flex-col gap-4 lg:min-w-[200px]">
                                    {features.map((f) => (
                                        <div key={f.label} className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
                                                <f.icon size={20} className="text-[#1a7a4a]" />
                                            </div>
                                            <span className="text-sm font-semibold text-gray-700">{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}