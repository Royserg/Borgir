import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface RestaurantState {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
}

export const useRestaurantStore = create<RestaurantState>()(
  devtools(
    persist(
      (set) => ({
        searchTerm: "",
        setSearchTerm: (val: string) => set(() => ({ searchTerm: val })),
      }),
      {
        name: "restaurants-storage",
      }
    )
  )
);
