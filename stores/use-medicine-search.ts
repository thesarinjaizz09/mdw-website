// stores/useMedicineSearchStore.ts

import { create } from "zustand";
import { SearchProduct } from "@/types";

interface SearchState {
  query: string;
  loading: boolean;
  results: SearchProduct[];

  setQuery: (query: string) => void;

  setLoading: (loading: boolean) => void;

  setResults: (
    products: SearchProduct[]
  ) => void;

  clear: () => void;
}

export const useMedicineSearchStore =
  create<SearchState>((set) => ({
    query: "",

    loading: false,

    results: [],

    setQuery: (query) =>
      set({ query }),

    setLoading: (loading) =>
      set({ loading }),

    setResults: (results) =>
      set({ results }),

    clear: () =>
      set({
        query: "",
        results: [],
      }),
  }));