"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Package, CalendarDays, MapPin, CreditCard, Clock3, ShoppingBag } from "lucide-react";
import { MDWHeader, MDWFooterBar } from "@/components/shared";
import { UserSidebar } from "./profile";

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

const statusClasses: Record<string, string> = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
    PACKED: "bg-violet-50 text-violet-700 border-violet-200",
    OUT_FOR_DELIVERY: "bg-cyan-50 text-cyan-700 border-cyan-200",
    DELIVERED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
    EXPIRED: "bg-slate-50 text-slate-700 border-slate-200",
};

const formatCurrency = (value?: number) =>
    `₹${Number(value || 0).toLocaleString("en-IN")}`;

const formatStatus = (status?: string) =>
    (status || "PENDING").replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function OrdersPage() {
    const [orders, setOrders] = useState<OrderRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrders = async () => {
            try {
                const response = await fetch("/api/order/get", { credentials: "include" });
                const data = await response.json();

                if (data?.success) {
                    setOrders(data.orders || []);
                } else {
                    setError(data?.message || "Unable to load your orders right now.");
                }
            } catch {
                setError("Unable to load your orders right now.");
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const summary = useMemo(() => {
        const totalSpent = orders.reduce((sum, order) => sum + Number(order.grandTotal || 0), 0);
        return {
            totalOrders: orders.length,
            totalSpent,
            activeOrders: orders.filter((order) => ["PENDING", "CONFIRMED", "PACKED", "OUT_FOR_DELIVERY"].includes(order.orderStatus || "")).length,
        };
    }, [orders]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <MDWHeader />

            <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:px-8">
                <h1 className="text-xl font-bold text-gray-900 mb-6">My Orders</h1>

                <div className="grid grid-cols-3 gap-5">
                    {/* Sidebar nav */}
                    <UserSidebar />
                    <div className="col-span-2">

                        <section className="grid gap-4 rounded-md border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-3 mb-4">
                            <div className="rounded-xl bg-emerald-50 p-4">
                                <p className="text-sm text-emerald-700">Total orders</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.totalOrders}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">Total spent</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">{formatCurrency(summary.totalSpent)}</p>
                            </div>
                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-sm text-slate-600">Active orders</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900">{summary.activeOrders}</p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            {loading ? (
                                <div className="rounded-md border border-slate-200 bg-white p-6 text-sm text-slate-500 shadow-sm">Loading your orders…</div>
                            ) : error ? (
                                <div className="rounded-md border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 shadow-sm">{error}</div>
                            ) : orders.length === 0 ? (
                                <div className="rounded-md border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                                    You have not placed any order yet.
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <article key={order._id} className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm">
                                        <div className="flex flex-col gap-4 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <p className="text-sm font-semibold text-slate-900">{order.userOrderId || order._id}</p>
                                                    <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[order.orderStatus || "PENDING"] || statusClasses.PENDING}`}>
                                                        {formatStatus(order.orderStatus)}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                                    <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" />{order.formattedDates?.orderedDate || "—"}</span>
                                                    <span className="flex items-center gap-1.5"><Clock3 className="h-4 w-4" />{order.formattedDates?.orderedTime || "—"}</span>
                                                    <span className="flex items-center gap-1.5"><CreditCard className="h-4 w-4" />{order.modeOfPayment || "—"}</span>
                                                </div>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-sm text-slate-500">Total amount</p>
                                                <p className="text-lg font-semibold text-slate-900">{formatCurrency(order.grandTotal)}</p>
                                            </div>
                                        </div>

                                        <div className="grid gap-4 p-4 lg:grid-cols-[1.3fr_0.7fr]">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                                    <ShoppingBag className="h-4 w-4 text-emerald-600" />
                                                    {order.items?.length ? `${order.items.length} item${order.items.length > 1 ? "s" : ""}` : "Items"}
                                                </div>
                                                <div className="space-y-2">
                                                    {(order.items || []).slice(0, 3).map((item, index) => (
                                                        <div key={`${item.productId || index}-${index}`} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-600">
                                                            <span>{item.name || "Medicine"}</span>
                                                            <span className="font-medium text-slate-900">{item.qty || 0} × {formatCurrency(item.price)}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="mt-0.5 h-4 w-4 text-emerald-600" />
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
                                            </div>
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
