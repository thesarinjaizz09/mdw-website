"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Plus, Phone, Home, Building2 } from "lucide-react";
import { MDWHeader, MDWFooterBar } from "@/components/shared";
import { UserSidebar } from "./profile";

interface AddressRecord {
    _id?: string;
    label?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
    nearByLandmark?: string;
    phone?: string;
}

export default function AddressPage() {
    const [addresses, setAddresses] = useState<AddressRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAddresses = async () => {
            try {
                const response = await fetch("/api/address/get", { credentials: "include" });
                const data = await response.json();

                if (data?.success) {
                    setAddresses(data.addresses || []);
                } else {
                    setError(data?.message || "Unable to load your addresses right now.");
                }
            } catch {
                setError("Unable to load your addresses right now.");
            } finally {
                setLoading(false);
            }
        };

        loadAddresses();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <MDWHeader />

            <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-gray-900 mb-6">My Orders</h1>

                <div className="grid grid-cols-3 gap-5">
                    {/* Sidebar nav */}
                    <UserSidebar />
                    <div className="col-span-2">
                        <section className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Your addresses</h2>
                                    <p className="text-sm text-slate-500">Keep your delivery locations organized for fast checkout.</p>
                                </div>
                                <button className="flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700">
                                    <Plus className="h-4 w-4" />
                                    Add address
                                </button>
                            </div>

                            {loading ? (
                                <div className="rounded-md border border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">Loading your addresses…</div>
                            ) : error ? (
                                <div className="rounded-md border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">{error}</div>
                            ) : addresses.length === 0 ? (
                                <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
                                    No saved addresses yet.
                                </div>
                            ) : (
                                <div className="grid gap-4 md:grid-cols-1">
                                    {addresses.map((address, index) => (
                                        <article key={address._id || index} className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                                                        {index % 2 === 0 ? <Home className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-900">{address.label || "Home"}</p>
                                                        <p className="text-sm text-slate-500">Primary delivery spot</p>
                                                    </div>
                                                </div>
                                                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Default</span>
                                            </div>

                                            <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                                                <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
                                                <div>
                                                    <p>{address.address || "No street address provided"}</p>
                                                    <p>{[address.city, address.state, address.zipCode, address.country].filter(Boolean).join(", ")}</p>
                                                    {address.nearByLandmark ? <p className="mt-1 text-xs text-slate-500">Near {address.nearByLandmark}</p> : null}
                                                </div>
                                            </div>

                                            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                                                <Phone className="h-4 w-4 text-emerald-600" />
                                                <span>{address.phone || "No phone provided"}</span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>
                </div>
            </main>

            <MDWFooterBar />
        </div>
    );
}
