// stores/use-selected-address-store.ts
//
// Shared, persisted source of truth for the user's currently selected
// delivery address. Keeping it in a single zustand store (instead of the
// per-instance state of the `useAddress()` hook) means every consumer —
// e.g. the product-details delivery message, the header location picker and
// the checkout address selector — re-renders immediately when the address
// changes, so the "Newtown vs. outside Newtown" delivery label never goes
// stale.

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address } from "@/types";

interface SelectedAddressState {
  selectedAddress: Address | null;
  setSelectedAddress: (address: Address | null) => void;
}

export const useSelectedAddressStore = create<SelectedAddressState>()(
  persist(
    (set) => ({
      selectedAddress: null,
      setSelectedAddress: (address) => set({ selectedAddress: address }),
    }),
    {
      name: "mdw-selected-address",
      // Only the selected address needs to survive a page reload.
      partialize: (state) => ({ selectedAddress: state.selectedAddress }),
    }
  )
);
