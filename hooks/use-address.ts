// hooks/use-address.ts

"use client";

import { Address, ADDRESSES } from "@/types";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-provider";

export function useAddress() {
    const { user } = useAuth();
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
    const [addresses, setAddresses] = useState<Address[]>(ADDRESSES);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("selected-address");

        if (stored) {
            setSelectedAddress(JSON.parse(stored));
        }

        // load addresses from backend if user is logged in
        if (user) {
            loadAddresses();
        }
    }, [user]);

    const loadAddresses = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/address/get-addresses`, {
                credentials: "include",
            });

            if (!res.ok) return;

            const data = await res.json();
            if (data?.addresses && Array.isArray(data.addresses)) {
                // map backend shape to frontend Address
                const mapped: Address[] = data.addresses.map((a: any) => ({
                    id: a._id,
                    label: a.label || "Saved Address",
                    line1: a.address || "",
                    line2: `${a.city || ''} ${a.state || ''}`.trim(),
                    pincode: a.zipCode || a.pincode || "",
                    phone: a.phone || "",
                }));
                setAddresses(mapped);
            }
        } catch (err) {
            // ignore
        } finally {
            setLoading(false);
        }
    };

    const updateAddress = async (id: string, updates: Partial<Address>) => {
        if (!user) throw new Error('Not authenticated');
        try {
            const payload: any = {
                address: updates.line1,
                city: updates.line2 || "",
                state: "",
                country: "India",
                zipCode: updates.pincode || "",
                nearByLandmark: "",
                label: updates.label || "",
                phone: updates.phone || "",
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/address/update-address/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.message || 'Failed to update address');
            }

            await loadAddresses();
            return true;
        } catch (err) {
            throw err;
        }
    };

    const deleteAddress = async (id: string) => {
        if (!user) throw new Error('Not authenticated');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/address/delete-address/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.message || 'Failed to delete address');
            }

            await loadAddresses();
            // if deleted address was selected, clear selection
            const stored = localStorage.getItem('selected-address');
            if (stored) {
                const sel = JSON.parse(stored) as Address;
                if (sel?.id === id) {
                    localStorage.removeItem('selected-address');
                    setSelectedAddress(null);
                }
            }

            return true;
        } catch (err) {
            throw err;
        }
    };

    const saveAddressLocal = (address: Address) => {
        setSelectedAddress(address);
        localStorage.setItem("selected-address", JSON.stringify(address));
    };
    
    const createAddress = async (address: Address & { latitude?: number; longitude?: number }) => {
        // If user is logged in, persist to backend
        if (user) {
            try {
                const payload: any = {
                    address: address.line1,
                    city: address.line2 || "Unknown",
                    state: (address as any).state || "Unknown",
                    country: "India",
                    zipCode: address.pincode || "",
                    nearByLandmark: "",
                    label: address.label || "",
                    phone: address.phone || "",
                };

                if (address.latitude != null && address.longitude != null) {
                    payload.latitude = address.latitude;
                    payload.longitude = address.longitude;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/address/add-address`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err?.message || "Failed to add address");
                }

                const data = await res.json();

                // refresh addresses
                await loadAddresses();

                const created = data?.address;
                if (created) {
                    const mapped: Address = {
                        id: created._id,
                        label: created.label || "Saved Address",
                        line1: created.address || "",
                        line2: `${created.city || ''} ${created.state || ''}`.trim(),
                        pincode: created.zipCode || "",
                        phone: created.phone || "",
                    };

                    saveAddressLocal(mapped);
                    return mapped;
                }
            } catch (error) {
                throw error;
            }
        }

        // fallback: save locally
        saveAddressLocal(address);
        return address;
    };

    const fetchCurrentLocation = async () => {
        if (!navigator.geolocation) return;

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    const addrComp = data.address || {};

                    const city = addrComp.city || addrComp.town || addrComp.village || addrComp.county || "";
                    const state = addrComp.state || addrComp.region || "";
                    const country = addrComp.country || "India";
                    const postcode = addrComp.postcode || "";

                    const address: Address & { latitude?: number; longitude?: number } = {
                        id: Date.now().toString(),
                        label: "Current Location",
                        line1: data.display_name || `${city} ${state}`.trim(),
                        line2: city,
                        pincode: postcode,
                        phone: "",
                        latitude,
                        longitude,
                    };

                    // persist if logged in
                    try {
                        await createAddress(address);
                    } catch (err) {
                        saveAddressLocal(address);
                    }
                } finally {
                    setLoadingLocation(false);
                }
            },
            () => {
                setLoadingLocation(false);
            }
        );
    };

    return {
        selectedAddress,
        loadingLocation,
        addresses,
        loading,
        saveAddress: saveAddressLocal,
        createAddress,
        fetchCurrentLocation,
        loadAddresses,
    };
}