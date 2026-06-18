"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar } from "@/components/shared";

const NAV_ITEMS = [
  { id: "profile", label: "My Profile", icon: <User className="w-4 h-4" /> },
  { id: "orders", label: "My Orders", icon: <ShoppingBag className="w-4 h-4" /> },
  { id: "prescriptions", label: "My Prescriptions", icon: <FileText className="w-4 h-4" /> },
  { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" /> },
  { id: "payment", label: "Payment Methods", icon: <CreditCard className="w-4 h-4" /> },
  { id: "wallet", label: "My Wallet", icon: <Wallet className="w-4 h-4" /> },
  { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  { id: "refer", label: "Refer & Earn", icon: <Gift className="w-4 h-4" /> },
  { id: "help", label: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
];

const QUICK_ACTIONS = [
  { id: "prescriptions", label: "My\nPrescriptions", icon: <FileText className="w-5 h-5 text-green-600" /> },
  { id: "addresses", label: "My\nAddresses", icon: <MapPin className="w-5 h-5 text-green-600" /> },
  { id: "payment", label: "Payment\nMethods", icon: <CreditCard className="w-5 h-5 text-green-600" /> },
  { id: "refer", label: "Refer &\nEarn", icon: <Gift className="w-5 h-5 text-green-600" /> },
];

const USER = {
  name: "Rahul Kumar",
  email: "rahul.kumar@email.com",
  phone: "98745 67890",
  dob: "12 May 1990",
  walletBalance: 250.00,
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="min-h-screen bg-gray-50">
      <MDWHeader cartCount={2} />

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar nav */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <nav className="divide-y divide-gray-50">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all text-left ${
                      activeSection === item.id
                        ? "bg-green-50 text-green-700 font-semibold border-l-2 border-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 ${
                        activeSection === item.id ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {item.icon}
                    </span>
                    {item.label}
                  </button>
                ))}

                {/* Logout */}
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                  <LogOut className="w-4 h-4 flex-shrink-0" />
                  Logout
                </button>
              </nav>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center text-2xl border-2 border-green-200 overflow-hidden">
                    👨‍💼
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">{USER.name}</h2>
                    <p className="text-sm text-gray-500">{USER.email}</p>
                    <p className="text-sm text-gray-500">{USER.phone}</p>
                  </div>
                </div>
                <button className="flex items-center gap-1.5 text-green-600 text-sm font-medium hover:text-green-700 transition-colors">
                  <Pencil className="w-3.5 h-3.5" />
                  Edit Profile
                </button>
              </div>

              {/* Account Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Account Details</h3>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Name", value: USER.name },
                    { label: "Email", value: USER.email },
                    { label: "Mobile Number", value: USER.phone },
                    { label: "Date of Birth", value: USER.dob },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center py-2.5">
                      <span className="w-36 text-sm text-gray-500 flex-shrink-0">{row.label}</span>
                      <span className="text-sm font-medium text-gray-900">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MDW Wallet */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-3">MDW Wallet</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Available Balance</p>
                  <p className="text-2xl font-bold text-gray-900">₹{USER.walletBalance.toFixed(2)}</p>
                </div>
                <Button className="bg-green-600 hover:bg-green-700 text-white h-9 px-5 rounded-lg text-sm font-semibold gap-1.5">
                  <Plus className="w-4 h-4" />
                  Add Money
                </Button>
              </div>
            </div>

            {/* More Actions */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-900 mb-4">More Actions</h3>
              <div className="grid grid-cols-4 gap-3">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => setActiveSection(action.id)}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-green-50 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-green-50 group-hover:bg-green-100 flex items-center justify-center transition-colors">
                      {action.icon}
                    </div>
                    <span className="text-xs text-gray-600 font-medium text-center leading-tight whitespace-pre-line">
                      {action.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <MDWFooterBar />
    </div>
  );
}