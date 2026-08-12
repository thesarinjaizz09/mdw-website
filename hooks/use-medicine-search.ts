// hooks/useMedicineSearch.ts

"use client";

import { useEffect } from "react";
import axios from "axios";

import { useDebounce } from "./use-debounce";
import { useMedicineSearchStore } from "@/stores/use-medicine-search";
import { normalizeSearchTerm } from "@/lib/search-normalize";

export function useMedicineSearch() {
    const {
        query,
        results,
        loading,
        setLoading,
        setResults,
    } = useMedicineSearchStore();

    const debouncedQuery =
        useDebounce(query, 350);

    useEffect(() => {
        // Preserve the visible query; only validate/harden internally.
        const trimmed = (debouncedQuery || "").trim();

        // Skip pure-punctuation / too-short queries: nothing meaningful to
        // search for (the backend would only return an empty list anyway).
        if (
            trimmed.length < 2 ||
            !normalizeSearchTerm(trimmed)
        ) {
            setResults([]);
            return;
        }

        const controller =
            new AbortController();

        async function search() {
            try {
                setLoading(true);

                const response =
                    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/search`,
                        {
                            params: {
                                q: debouncedQuery,
                            },
                            signal: controller.signal,
                        }
                    );

                setResults(
                    response.data.data ?? []
                );
            } catch (error: any) {
                if (
                    error.name !== "CanceledError"
                ) {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        }

        search();

        return () => controller.abort();
    }, [debouncedQuery]);

    return {
        results,
        loading,
    };
}