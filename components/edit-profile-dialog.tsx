"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/auth-provider";
import { useUpdateProfile } from "@/hooks/use-auth-mutations";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

export default function EditProfileDialog({ open, onOpenChange }: Props) {
  const { user } = useAuth();
  const { mutateAsync: updateProfile, isPending: loading } = useUpdateProfile();

  const [userfName, setUserfName] = useState("");
  const [userlName, setUserlName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && open) {
      setUserfName(user.userfName || "");
      setUserlName(user.userlName || "");
      setUserEmail(user.userEmail || "");
      setUserPhone(user.userPhone || "");
      setError(null);
    }
  }, [user, open]);

  const handleSave = async () => {
    setError(null);

    // Simple validation
    if (!userfName.trim()) {
      setError("First Name is required");
      return;
    }
    if (!userEmail.trim()) {
      setError("Email is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (!userPhone.trim()) {
      setError("Mobile Number is required");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(userPhone.replace(/\s+/g, ""))) {
      setError("Mobile Number must be exactly 10 digits");
      return;
    }

    try {
      await updateProfile({
        userfName: userfName.trim(),
        userlName: userlName.trim(),
        userEmail: userEmail.trim(),
        userPhone: userPhone.trim(),
      });
      toast.success("Profile updated successfully.");
      onOpenChange(false);
    } catch (err: any) {
      setError(err?.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black rounded-lg max-w-md w-full p-6 shadow-xl border border-gray-100">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold text-gray-900">Edit Profile</DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Modify your account details.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* First Name & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="firstName" className="text-xs font-semibold text-gray-700">First Name</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                value={userfName}
                onChange={(e) => setUserfName(e.target.value)}
                className="h-10 text-sm border-gray-200 focus:border-[#F4568B] focus:ring-[#F4568B]"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="lastName" className="text-xs font-semibold text-gray-700">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                value={userlName}
                onChange={(e) => setUserlName(e.target.value)}
                className="h-10 text-sm border-gray-200 focus:border-[#F4568B] focus:ring-[#F4568B]"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email" className="text-xs font-semibold text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="h-10 text-sm border-gray-200 focus:border-[#F4568B] focus:ring-[#F4568B]"
            />
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <Label htmlFor="phone" className="text-xs font-semibold text-gray-700">Mobile Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Mobile Number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="h-10 text-sm border-gray-200 focus:border-[#F4568B] focus:ring-[#F4568B]"
            />
          </div>

          {/* Warning Banner */}
          <div className="p-3 bg-amber-50 rounded-lg border border-amber-100 text-xs text-amber-800 leading-relaxed">
            <strong>Warning:</strong> Updating your email address or phone number will change your primary login credentials. Make sure you use the new details for future logins.
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-xs font-medium text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              {error}
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="h-10 text-sm font-semibold border-none hover:text-gray-700 text-gray-700 hover:bg-zinc-100! bg-zinc-50! cursor-pointer shadow-sm">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="h-10 px-5 text-sm border-none font-semibold text-white bg-[#F4568B] hover:bg-[#F4568B]/80 focus:ring-[#F4568B] rounded-md transition-all shadow-md! cursor-pointer"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
