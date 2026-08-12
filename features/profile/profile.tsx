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
  User2Icon,
  UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { MDWHeader, MDWFooterBar, UserSidebar } from "@/components/shared";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import EditProfileDialog from "@/components/edit-profile-dialog";

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    refreshUser();
  }, [])

  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between flex-1">
      <MDWHeader />

      <main className="px-4 py-4 sm:py-6 w-full max-w-7xl mx-auto flex-1">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">My Profile</h1>

        <div className="flex gap-4 sm:gap-5 md:flex-row flex-col">
          {/* Sidebar nav */}
          <UserSidebar />

          {/* Main content */}
          <div className="space-y-4 w-full md:w-[70%]">
            {/* Profile card */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 sm:p-5">
              <div className="flex items-start justify-between mb-4 sm:mb-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#F4568B]/40 flex items-center justify-center border-2 border-[#ff6f9f] overflow-hidden flex-shrink-0">
                    <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-black"/>
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900 truncate">{`${user?.userfName || ''} ${user?.userlName || ''}`}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.userEmail}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{user?.userPhone}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditDialogOpen(true)}
                  className="flex items-center gap-1 sm:gap-1.5 text-[#F4568B] text-xs sm:text-sm font-medium hover:text-[#F4568B]/90 transition-colors p-1.5 sm:p-0 rounded-md hover:bg-[#F4568B]/10 sm:hover:bg-transparent flex-shrink-0"
                  title="Edit Profile"
                >
                  <Pencil className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">Edit Profile</span>
                </button>
              </div>

              {/* Account Details */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-xs sm:text-sm">Account Details</h3>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Name", value: `${user?.userfName || ''} ${user?.userlName || ''}` },
                    { label: "Email", value: user?.userEmail },
                    { label: "Mobile Number", value: user?.userPhone },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center py-2 sm:py-2.5 max-[400px]:flex-col max-[400px]:items-start max-[400px]:gap-1">
                      <span className="w-28 sm:w-36 text-xs sm:text-sm text-gray-500 flex-shrink-0 max-[400px]:w-full max-[400px]:font-medium">{row.label}</span>
                      <span className="text-xs sm:text-sm font-medium text-gray-900 max-[400px]:w-full break-all">{row.value}</span>
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

      <EditProfileDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />

      <MDWFooterBar />
    </div>
  );
}