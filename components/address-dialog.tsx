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
import { useAddress } from "@/hooks/use-address";

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  editAddress?: any;
}

export default function AddressDialog({ open, onOpenChange, editAddress }: Props) {
  const { createAddress, updateAddress } = useAddress();
  const [label, setLabel] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editAddress) {
      setLabel(editAddress.label || "");
      setLine1(editAddress.line1 || editAddress.address || "");
      setLine2(editAddress.line2 || "");
      setPincode(editAddress.pincode || editAddress.zipCode || "");
      setPhone(editAddress.phone || "");
    } else {
      setLabel("");
      setLine1("");
      setLine2("");
      setPincode("");
      setPhone("");
    }
  }, [editAddress, open]);

  const handleSave = async () => {
    setError(null);
    if (!line1) return setError("Address is required");
    if (!pincode) return setError("Pincode is required");

    setLoading(true);
    try {
      if (editAddress && editAddress.id) {
        await updateAddress(editAddress.id, {
          label: label || "Home",
          line1,
          line2,
          pincode,
          phone,
        });
      } else {
        await createAddress({
          id: Date.now().toString(),
          label: label || "Home",
          line1,
          line2,
          pincode,
          phone,
        });
      }

      onOpenChange(false);
    } catch (err: any) {
      setError(err?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black rounded-sm">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
          <DialogDescription className="text-xs">
            Save an address to speed up future checkouts.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-2 mt-4">
          <Input placeholder="Label (Home, Work)" value={label} onChange={(e) => setLabel((e.target as HTMLInputElement).value)} />
          <Input placeholder="Address line 1" value={line1} onChange={(e) => setLine1((e.target as HTMLInputElement).value)} />
          <Input placeholder="Address line 2 / City" value={line2} onChange={(e) => setLine2((e.target as HTMLInputElement).value)} />
          <Input placeholder="Pincode" value={pincode} onChange={(e) => setPincode((e.target as HTMLInputElement).value)} />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone((e.target as HTMLInputElement).value)} />
          {error && <div className="text-xs text-red-600">{error}</div>}
        </div>

        <DialogFooter>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={loading} className="bg-[#F4568B] hover:bg-[#F4568B]/90 text-white">
              {loading ? "Saving..." : "Save Address"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
