import { create } from "zustand";

interface ProductState {
  productStates: Record<
    string,
    {
      currentImage: string;
      hover: boolean;
    }
  >;
  setProductImage: (productId: string, image: string) => void;
  setProductHover: (productId: string, hover: boolean) => void;
  initializeProduct: (productId: string, initialImage: string) => void;
}

interface FilterState {
  selectedCountries: string[];
  selectedColors: string[];
  selectedPriceRange: { min: number; max: number } | null;
  setSelectedCountries: (countries: string[]) => void;
  setSelectedColors: (colors: string[]) => void;
  setSelectedPriceRange: (range: { min: number; max: number } | null) => void;
  clearFilters: () => void;
}

export const useProducStore = create<ProductState>((set) => ({
  // state
  productStates: {},

  //   action
  setProductImage: (productId, image) =>
    set((state) => ({
      productStates: {
        ...state.productStates,
        [productId]: { ...state.productStates[productId], currentImage: image },
      },
    })),

  setProductHover: (productId, hover) =>
    set((state) => ({
      productStates: {
        ...state.productStates,
        [productId]: { ...state.productStates[productId], hover },
      },
    })),

  initializeProduct: (productId, initaiImage) =>
    set((state) => ({
      productStates: {
        ...state.productStates,
        [productId]: { currentImage: initaiImage, hover: false },
      },
    })),
}));

export const useFilterStore = create<FilterState>((set) => ({
  // state
  selectedCountries: [],
  selectedColors: [],
  selectedPriceRange: null,

  // action
  setSelectedCountries: (countries) => set({ selectedCountries: countries }),
  setSelectedColors: (colors) => set({ selectedColors: colors }),
  setSelectedPriceRange: (range) => set({ selectedPriceRange: range }),
  clearFilters: () =>
    set({
      selectedCountries: [],
      selectedColors: [],
      selectedPriceRange: null,
    }),
}));
