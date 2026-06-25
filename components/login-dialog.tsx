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
          className="rounded-sm text-sm bg-green-700 text-white hover:bg-green-600"
            onClick={() =>
              router.push("/auth")
            }
          >
            Login
          </Button>

          <Button
          className="rounded-sm text-sm border border-gray-200"
            onClick={() =>
              router.push("/create")
            }
          >
            Create Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}