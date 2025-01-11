import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductState {
  typeCourse: string;
  areaId: string;
  productId?: string | null;
}

interface CourseActions {
  setAreaId: (id: string) => void;
  setTypeCourse: (type: string) => void;
  setProductId: (id?: string) => void;
}

const useProductStore = create<ProductState & CourseActions>()(
  persist(
    (set) => ({
      productId: null,
      areaId: "",
      typeCourse: "",

      setAreaId: (id) => set({ areaId: id }),
      setTypeCourse: (type) => set({ typeCourse: type }),
      setProductId: (id) => set({ productId: id }),
    }),
    {
      name: "product-ID",
    }
  )
);

export default useProductStore;
