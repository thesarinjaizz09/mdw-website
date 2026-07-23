"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, CalendarDays, MapPin, CreditCard, Clock3, ShoppingBag } from "lucide-react";
import { MDWHeader, MDWFooterBar, UserSidebar } from "@/components/shared";

interface OrderSummary {
    totalItems: number;
    totalProducts: number;
    totalDiscount: number;
    deliveryCharges: number;
    handlingCharges: number;
    taxAmount: number;
    itemTotal: number;
    grandTotal: number;
}

interface OrderAddress {
    _id?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    nearByLandmark?: string;
    phone?: string;
    label?: string;
}

interface OrderItem {
    name?: string;
    qty?: number;
    price?: number;
    discount?: number;
    productId?: string;
    mrp?: number;
}

interface OrderRecord {
    _id: string;
    userOrderId?: string;
    orderStatus?: string;
    paymentStatus?: string;
    modeOfPayment?: string;
    orderType?: string;
    grandTotal?: number;
    itemTotal?: number;
    items?: OrderItem[];
    orderedAt?: string;
    addressId?: OrderAddress;
    deliveryCharges?: number;
    handlingCharges?: number;
    taxAmount?: number;
    orderSummary?: OrderSummary;
    formattedDates?: {
        orderedDate?: string;
        orderedTime?: string;
    };
    deliveryInfo?: {
        isScheduled?: boolean;
        scheduledDate?: string | null;
        scheduledTime?: string | null;
    };
}

interface PrescriptionPagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

interface Prescription {
    _id: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "FULFILLED";
    notes: string;
    rejectionReason?: string;
    images: {
        url: string;
        publicId: string;
    }[];
    createdAt: string;
    reviewedAt?: string;
}

const statusClasses: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    PACKED: "bg-violet-50 text-violet-700 border-violet-200",
    OUT_FOR_DELIVERY: "bg-cyan-50 text-cyan-700 border-cyan-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
    EXPIRED: "bg-slate-50 text-slate-700 border-slate-200",
};

const presStatusClasses = {
    PENDING:
        "bg-yellow-50 text-yellow-700 border-yellow-200",

    APPROVED:
        "bg-green-50 text-green-700 border-green-200",

    REJECTED:
        "bg-red-50 text-red-700 border-red-200",

    FULFILLED:
        "bg-blue-50 text-blue-700 border-blue-200",
};

const formatCurrency = (value?: number) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatStatus = (status?: string) =>
    (status || "PENDING").replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function PrescriptionsPage() {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<PrescriptionPagination | null>(null);

    const loadPrescriptions = async (currentPage = 1) => {
        try {
            setLoading(true);

            const response = await fetch(
                `/api/prescriptions`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        page: String(currentPage),
                    }
                }
            );

            const data = await response.json();

            if (data.status === "success") {
                setPrescriptions(data.data);
                setPagination(data.pagination);
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.log({ error })
            setError("Failed to load prescriptions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPrescriptions()
    }, []);

    useEffect(() => {
        loadPrescriptions(page);
    }, [page]);

    const metrics = useMemo(() => {
        return {
            total: pagination?.total ?? 0,

            pending: prescriptions.filter(
                x => x.status === "PENDING"
            ).length,

            approved: prescriptions.filter(
                x => x.status === "APPROVED"
            ).length,

            fulfilled: prescriptions.filter(
                x => x.status === "FULFILLED"
            ).length,
        };
    }, [prescriptions, pagination]);

    return (
        <div className="bg-gray-50 flex flex-col justify-between flex-1 min-h-screen">
            <MDWHeader />

            <main className="flex w-full max-w-7xl mx-auto flex-col px-4 py-6 flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-6">My Prescriptions</h1>

                <div className="flex gap-5 md:flex-row flex-col">
                    {/* Sidebar nav */}
                    <UserSidebar />
                    <div className="w-full md:w-[70%]">

                        <section className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-4 mb-4">
                            <div className="rounded-xl bg-[#F4568B]/10 p-4">
                                <p className="text-sm text-[#F4568B]">Total prescriptions</p>
                                <p className="mt-2 text-md sm:text-2xl font-semibold text-slate-900">{metrics.total}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">Pending review</p>
                                <p className="mt-2 text-md sm:text-2xl font-semibold text-slate-900">{metrics.pending}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">Approved</p>
                                <p className="mt-2 text-md sm:text-2xl font-semibold text-slate-900">{metrics.approved}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">Fulfilled</p>
                                <p className="mt-2 text-md sm:text-2xl font-semibold text-slate-900">{metrics.fulfilled}</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            {loading ? (
                                <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">Loading your prescriptions</div>
                            ) : error ? (
                                <div className="rounded-md border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">{error}</div>
                            ) : prescriptions.length === 0 ? (
                                <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                                    You have not uploaded any prescription yet.
                                </div>
                            ) : (
                                prescriptions.map((order) => (
                                    <article key={order._id} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                                        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-sm font-semibold text-slate-900">{order._id}</p>
                                                    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[order.status || "PENDING"] || presStatusClasses.PENDING}`}>
                                                        {formatStatus(order.status)}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{order.createdAt || "—"}</span>
                                                    {/* <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{order.formattedDates?.orderedTime || "—"}</span>
                                                    <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" />{order.modeOfPayment || "—"}</span> */}
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right h-full flex items-start justify-start">
                                                <a
                                                    href={order.images[0].url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex-shrink-0 rounded-xs bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700 transition-colors hover:bg-green-200"
                                                >
                                                    View
                                                </a>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 p-4 lg:grid-cols-[1.3fr_0.7fr]">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                    <ShoppingBag className="h-4 w-4 text-[#F4568B]" />
                                                    Prescription
                                                </div>
                                                <div className="space-y-2">
                                                    {(order.images || []).slice(0, 3).map((item, index) => (
                                                        <div key={`${item || index}-${index}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                                                            <span>{item.url}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="mt-0.5 h-4 w-4 text-[#F4568B]" />
                                                    <div>
                                                        <p className="font-medium text-slate-900">Delivery address</p>
                                                        <p>{order.addressId?.address || "Address pending"}</p>
                                                        <p>{[order.addressId?.city, order.addressId?.state, order.addressId?.zipCode].filter(Boolean).join(", ")}</p>
                                                        {order.addressId?.nearByLandmark ? <p className="text-xs text-slate-500">Landmark: {order.addressId.nearByLandmark}</p> : null}
                                                    </div>
                                                </div>
                                                {order.deliveryInfo?.isScheduled ? (
                                                    <div className="mt-3 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-amber-700">
                                                        <Package className="h-4 w-4" />
                                                        <span>Scheduled for {order.deliveryInfo.scheduledDate || "—"} • {order.deliveryInfo.scheduledTime || "—"}</span>
                                                    </div>
                                                ) : null}
                                            </div> */}
                                        </div>
                                    </article>
                                ))
                            )}
                        </section>
                    </div>
                </div>
            </main>

            <MDWFooterBar />
        </div>
    );
}
