"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-gray-50 py-12 lg:py-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-8 py-12 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center shrink-0">
            <Mail size={50} className="text-[#1a7a4a]" />
          </div>

          {/* Text */}
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-extrabold text-gray-900">
              Stay Updated with Health Tips & Offers
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Subscribe to our newsletter and never miss our best offers and health updates.
            </p>
          </div>

          {/* Input + Button */}
          {subscribed ? (
            <div className="flex items-center gap-2 text-[#1a7a4a] font-semibold text-sm">
              <CheckCircle2 size={20} />
              <span>You're subscribed!</span>
            </div>
          ) : (
            <div className="flex w-full md:w-auto gap-2 shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Enter your email address"
                className="flex-1 md:w-64 h-15 px-4 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a7a4a]/30 focus:border-[#1a7a4a] transition-all"
              />
              <button
                onClick={handleSubscribe}
                className="h-15 px-6 bg-[#1a7a4a] hover:bg-[#155e38] text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] whitespace-nowrap"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}