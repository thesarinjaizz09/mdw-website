"use client";

import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";

const quickLinks = ["About Us", "Contact Us", "FAQs", "Refund Policy", "Terms & Conditions"];
const services = ["Medicine Delivery", "Wellness at Home", "Lab Tests", "Paws Nest", "Health Packages"];

export default function Footer() {
  return (
    <footer className="bg-[#1a3a2a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-white font-black text-4xl tracking-tight">+MDW+</span>
            </div>
            <p className="text-sm text-green-200/70 leading-relaxed mb-6">
              Your trusted healthcare partner for medicines, wellness and more – delivered to your doorstep.
            </p>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, label: "Facebook" },
                { icon: FaInstagram, label: "Instagram" },
                { icon: MessageCircle, label: "WhatsApp" },
                { icon: FaYoutube, label: "YouTube" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-sm text-green-200/70 hover:text-white transition-colors">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-green-200/70 hover:text-white transition-colors">
                  <Phone size={15} className="shrink-0 text-[#22c55e]" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a href="mailto:care@mydawaiwala.com" className="flex items-center gap-3 text-sm text-green-200/70 hover:text-white transition-colors">
                  <Mail size={15} className="shrink-0 text-[#22c55e]" />
                  care@mydawaiwala.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-green-200/70">
                  <MapPin size={15} className="shrink-0 mt-0.5 text-[#22c55e]" />
                  New Town, Kolkata – 700156<br />West Bengal, India
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-green-200/50">
            © 2024 My Dawaiwala (MDW). All Rights Reserved.
          </p>
          <p className="text-xs text-green-200/50">
            Made with <span className="text-red-400">♥</span> for a healthier you
          </p>
        </div>
      </div>
    </footer>
  );
}