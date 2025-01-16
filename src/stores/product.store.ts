import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProductState {
  typeCourse: string;
  areaId: string;
  productId?: string | null;
  moduleId?: string | null;
  search?: string | null;
}

interface CourseActions {
  setAreaId: (id: string) => void;
  setTypeCourse: (type: string) => void;
  setProductId: (id?: string) => void;
  setModuleId: (id?: string) => void;
  setSearch: (value?: string) => void;
}

const useProductStore = create<ProductState & CourseActions>()(
  persist(
    (set) => ({
      productId: null,
      areaId: "",
      typeCourse: "",
      search: "", 
      setAreaId: (id) => set({ areaId: id }),
      setSearch: (value) => set({ search: value }),
      setTypeCourse: (type) => set({ typeCourse: type }),
      setProductId: (id) => set({ productId: id }),
      setModuleId: (id) => set({ moduleId: id }),
    }),
    {
      name: "product-ID",
      partialize: (state) => ({
        productId: state.productId,
        areaId: state.areaId,
        typeCourse: state.typeCourse,
        moduleId: state.moduleId,
      }), 
    }
  )
);

export default useProductStore;
