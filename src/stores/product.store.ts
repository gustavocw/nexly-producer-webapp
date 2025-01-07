import { create } from "zustand";

interface ProductState {
  typeCourse: string;
  areaId: string;
}

interface CourseActions {
  setAreaId: (id: string) => void;
  setTypeProduct: (type: string) => void;
}

const useProductStore = create<ProductState & CourseActions>((set) => ({
  product: null,
  areaId: "",
  typeCourse: "",

  setAreaId: (id) => set({ areaId: id }),
  setTypeProduct: (type) => set({ typeCourse: type }),
}));

export default useProductStore;
