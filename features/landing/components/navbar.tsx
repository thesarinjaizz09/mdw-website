"use client";

import { useState } from "react";
import { Search, User, ShoppingCart, Menu, X, Plus } from "lucide-react";

import { useSession } from "@/hooks/use-session";
import LoginDialog from "@/components/login-dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { label: "Home", href: "#", active: true },
  { label: "Medicines", href: "/medicine" },
  { label: "Wellness", href: "#" },
  { label: "Paws Nest", href: "#" },
  { label: "Lab Tests", href: "#" },
  { label: "Offers", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogin, setShowLogin] =
    useState(false);

  const {
    user,
    loading,
  } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-0.5 shrink-0 flex-col">
            <span className="text-[#1a7a4a] font-black text-4xl tracking-tight">
              +MDW+
            </span>
            <span className="block text-[7px] text-gray-400 font-medium leading-none ml-1 mt-1 uppercase tracking-widest">
              Health at your doorstep
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-medium rounded-md transition-colors ${link.active
                  ? "text-[#1a7a4a] font-semibold"
                  : "text-gray-600 hover:text-[#1a7a4a] hover:bg-green-50"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-gray-500 hover:text-[#1a7a4a] hover:bg-green-50 rounded-full transition-colors">
              <Search size={21} />
            </button>
            {
              !loading &&
              (user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex flex-col items-center justify-center rounded-full hover:bg-green-50 text-gray-500 p-2.5">
                      <User size={20} />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white text-black border border-gray-200 rounded-md text-xs rounded-sm w-full" align="end">
                    <DropdownMenuItem className="hover:text-blue-600 text-xs">
                      My Account
                    </DropdownMenuItem>

                    <DropdownMenuItem className="hover:text-gray-600 text-xs">
                      Orders
                    </DropdownMenuItem>

                    <DropdownMenuItem className="hover:text-gray-600 text-xs">
                      Prescriptions
                    </DropdownMenuItem>

                    <DropdownMenuItem className="hover:text-gray-600 text-xs">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() =>
                    setShowLogin(true)
                  }
                  className="p-2.5 text-gray-500 hover:text-[#1a7a4a] hover:bg-green-50 rounded-full transition-colors"
                >
                  <User size={21} />
                </button>
              ))
            }
            <button className="relative p-2.5 text-gray-500 hover:text-[#1a7a4a] hover:bg-green-50 rounded-full transition-colors">
              <ShoppingCart size={21} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#1a7a4a] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            <button
              className="lg:hidden p-2.5 text-gray-500 hover:text-[#1a7a4a] rounded-full transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block px-4 py-2.5 text-sm font-medium rounded-md transition-colors ${link.active
                  ? "text-[#1a7a4a] font-semibold bg-green-50"
                  : "text-gray-600 hover:text-[#1a7a4a] hover:bg-green-50"
                  }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
      <LoginDialog
        open={showLogin}
        onOpenChange={setShowLogin}
      />
    </header>
  );
}