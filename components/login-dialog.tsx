"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}

export default function LoginDialog({
  open,
  onOpenChange,
}: Props) {
  const router = useRouter();

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="bg-white text-black rounded-sm">
        <DialogHeader>
          <DialogTitle>
            Welcome to MDW Pharmacy
          </DialogTitle>

          <DialogDescription className="text-xs">
            Sign in to order medicines,
            upload prescriptions,
            track deliveries,
            access lab reports,
            and enjoy a faster checkout
            experience.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-1 mt-4 text-xs">
          <Button
          className="rounded-sm text-sm bg-[#F4568B] text-white hover:bg-gray-500"
            onClick={() =>
              router.push("/auth")
            }
          >
            Sign In
          </Button>

          <Button
          className="rounded-sm text-sm border border-gray-200 bg-gray-500 hover:bg-[#F4568B] text-white"
            onClick={() =>
              router.push("/create")
            }
          >
            Sign Up
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}