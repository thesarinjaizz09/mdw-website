"use client";

import Image from "next/image";

interface WhatsAppFloaterProps {
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppFloater({
  phoneNumber = "919230189091",
  message = "Hello! I have a question about medicines on MDW.",
}: WhatsAppFloaterProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="mr-3 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap">
        Need Help? Chat on whatsapp
      </span>

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with MDW Pharmacist on WhatsApp"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg shadow-emerald-600/40 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-emerald-600/60 active:scale-95 focus:outline-none"
      >
        <Image
          src="/whatsapp-logo.svg"
          alt="WhatsApp Logo"
          width={32}
          height={32}
          className="w-7 h-7 object-contain drop-shadow-sm"
          priority
        />
      </a>
    </div>
  );
}

export default WhatsAppFloater;
