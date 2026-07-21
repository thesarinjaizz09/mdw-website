"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  ShoppingBag,
  FileText,
  MapPin,
  CreditCard,
  Wallet,
  Bell,
  Gift,
  HelpCircle,
  LogOut,
  Plus,
  Pencil,
  Box,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar } from "@/components/shared";
import { useAuth } from "@/providers/auth-provider";
import { useEffect } from "react";

const NAV_ITEMS = [
  { id: "profile", label: "My Profile", icon: <User className="w-4 h-4" />, href: "/account" },
  { id: "orders", label: "My Orders", icon: <ShoppingBag className="w-4 h-4" />, href: "/orders" },
  // { id: "prescriptions", label: "My Prescriptions", icon: <FileText className="w-4 h-4" /> },
  { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" />, href: "/address" },
  // { id: "payment", label: "Payment Methods", icon: <CreditCard className="w-4 h-4" /> },
  // { id: "wallet", label: "My Wallet", icon: <Wallet className="w-4 h-4" /> },
  // { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  // { id: "refer", label: "Refer & Earn", icon: <Gift className="w-4 h-4" /> },
  // { id: "help", label: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
];

const QUICK_ACTIONS = [
  { id: "prescriptions", label: "My\nOrders", icon: <Box className="w-5 h-5 text-[#F4568B]" />, href: "/orders" },
  { id: "addresses", label: "My\nAddresses", icon: <MapPin className="w-5 h-5 text-[#F4568B]" />, href: "/address" },
  // { id: "payment", label: "Help\nCenter", icon: <HelpCircle className="w-5 h-5 text-[#F4568B]" />, href: "/help" },
  // { id: "refer", label: "Refer &\nEarn", icon: <Gift className="w-5 h-5 text-[#F4568B]" />, href: "/refer" },
];

const USER = {
  name: "Rahul Kumar",
  email: "rahul.kumar@email.com",
  phone: "98745 67890",
  dob: "12 May 1990",
  walletBalance: 0.00,
};

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();

  useEffect(() => {
    refreshUser();
  }, [])

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between flex-1">
      <MDWHeader />

      <main className="px-4 py-6 w-full max-w-7xl mx-auto flex-1">
        <h1 className="text-xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="flex gap-5 md:flex-row flex-col">
          {/* Sidebar nav */}
          <UserSidebar />

          {/* Main content */}
          <div className=" space-y-4 w-full md:w-[70%]">
            {/* Profile card */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-[#F4568B]/50  flex items-center justify-center text-2xl border-2 border-[#F4568B] overflow-hidden">
                    👨‍💼
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{`${user?.userfName} ${user?.userlName}`}</h2>
                    <p className="text-sm text-gray-500">{user?.userEmail}</p>
                    <p className="text-sm text-gray-500">{user?.userPhone}</p>
                  </div>
                </div>
                {/* <button className="flex items-center gap-1.5 text-[#F4568B] text-sm font-medium hover:text-[#F4568B]/90 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Profile
                </button> */}
              </div>

              {/* Account Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Account Details</h3>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Name", value: `${user?.userfName} ${user?.userlName}` },
                    { label: "Email", value: user?.userEmail },
                    { label: "Mobile Number", value: user?.userPhone },
                    // { label: "Date of Birth", value: user?.dob },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center py-2.5 max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-1">
                      <span className="w-36 text-sm text-gray-500 flex-shrink-0 max-[400px]:w-full max-[400px]:font-medium">{row.label}</span>
                      <span className="text-sm font-medium text-gray-900 max-[400px]:w-full">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MDW Wallet */}
            {/* <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">MDW Wallet</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-900">₹{USER.walletBalance.toFixed(2)}</p>
                </div>
                <Button className="bg-[#F4568B] hover:bg-[#F4568B]/90 text-white h-9 px-5 rounded-md text-sm font-semibold gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add Money
                </Button>
              </div>
            </div> */}

            {/* More Actions */}
            {/* <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">More Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => router.push(action.href)}
                    className="flex flex-col items-center gap-2 p-3 rounded-md hover:bg-[#F4568B]/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-md bg-[#F4568B]/10 group-hover:bg-[#F4568B]/20 flex items-center justify-center transition-colors">
                      {action.icon}
                    </div>
                    <span className="text-xs text-gray-600 font-medium text-center leading-tight whitespace-pre-line">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  );
}

export function UserSidebar() {
  const pathname = usePathname();
  const router = useRouter()

  const activeSection = pathname === "/orders"
    ? "orders"
    : pathname === "/address"
      ? "addresses"
      : "profile";

  return (
    <div className="md:w-[30%]">
      <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
        <nav className="divide-y divide-gray-50">
          {NAV_ITEMS.map((item) => (
            item.href ? (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all text-left ${activeSection === item.id
                  ? "bg-[#F4568B]/10 text-[#F4568B] font-semibold border border-[#F4568B]/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span
                  className={`flex-shrink-0 ${activeSection === item.id ? "text-[#F4568B]" : "text-gray-400"
                    }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ) : (
              <button
                key={item.id}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all text-left ${activeSection === item.id
                  ? "bg-[#F4568B]/10 text-[#F4568B] font-semibold border border-[#F4568B]/20"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span
                  className={`flex-shrink-0 ${activeSection === item.id ? "text-[#F4568B]" : "text-gray-400"
                    }`}
                >
                  {item.icon}
                </span>
                {item.label}
              </button>
            )
          ))}

          {/* Logout */}
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left" onClick={() => router.push("/logout")}>
            <LogOut className="w-4 h-4 flex-shrink-0" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  )
}