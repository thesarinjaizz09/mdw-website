// hooks/use-address.ts

"use client";

import { Address, ADDRESSES } from "@/types";
import { useEffect, useState } from "react";

export function useAddress() {
    const [selectedAddress, setSelectedAddress] =
        useState<Address | null>(null);

    const [loadingLocation, setLoadingLocation] =
        useState(false);

    useEffect(() => {
        const stored =
            localStorage.getItem("selected-address");

        if (stored) {
            setSelectedAddress(JSON.parse(stored));
            return;
        }

        fetchCurrentLocation();
    }, []);

    const saveAddress = (address: Address) => {
        setSelectedAddress(address);

        localStorage.setItem(
            "selected-address",
            JSON.stringify(address)
        );
    };

    const fetchCurrentLocation = async () => {
        if (!navigator.geolocation) return;

        setLoadingLocation(true);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } =
                        position.coords;

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
                    );

                    const data = await response.json();

                    const address: Address = {
                        id: Date.now().toString(),
                        label: "Current Location",
                        line1: data.display_name,
                        line2: "",
                        pincode: "",
                        phone: "",
                    };

                    saveAddress(address);
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
        addresses: ADDRESSES,
        saveAddress,
        fetchCurrentLocation,
    };
}