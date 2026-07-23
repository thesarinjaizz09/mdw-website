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

export const NAV_ITEMS = [
  { id: "profile", label: "My Profile", icon: <User className="w-4 h-4" />, href: "/account" },
  { id: "orders", label: "My Orders", icon: <ShoppingBag className="w-4 h-4" />, href: "/orders" },
  { id: "prescriptions", label: "My Prescriptions", icon: <FileText className="w-4 h-4" />, href: "/prescriptions" },
  { id: "addresses", label: "Addresses", icon: <MapPin className="w-4 h-4" />, href: "/address" },
  // { id: "payment", label: "Payment Methods", icon: <CreditCard className="w-4 h-4" /> },
  // { id: "wallet", label: "My Wallet", icon: <Wallet className="w-4 h-4" /> },
  // { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
  // { id: "refer", label: "Refer & Earn", icon: <Gift className="w-4 h-4" /> },
  // { id: "help", label: "Help & Support", icon: <HelpCircle className="w-4 h-4" /> },
];

export const QUICK_ACTIONS = [
  { id: "prescriptions", label: "My\nOrders", icon: <Box className="w-5 h-5 text-[#F4568B]" />, href: "/orders" },
  { id: "addresses", label: "My\nAddresses", icon: <MapPin className="w-5 h-5 text-[#F4568B]" />, href: "/address" },
  // { id: "payment", label: "Help\nCenter", icon: <HelpCircle className="w-5 h-5 text-[#F4568B]" />, href: "/help" },
  // { id: "refer", label: "Refer &\nEarn", icon: <Gift className="w-5 h-5 text-[#F4568B]" />, href: "/refer" },
];