import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import type { Product } from "types/product";

interface ProductState {
  product: Product | null;
  typeCourse: string;
}

interface CourseActions {
  setProduct: (product: Product) => void;
  setTypeProduct: (type: any) => void;
}

const useProductStore = create<ProductState & CourseActions>()(
  persist(
    (set) => ({
      product: null,
      typeCourse: "",

      setProduct: (product) => set({ product }),
      setTypeProduct: (type) => set({ typeCourse: type }),
    }),
    {
      name: "product-draft",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useProductStore;
