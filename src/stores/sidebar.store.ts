import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  isOpen: boolean;
}

interface AuthActions {
  setIsOpen: (isOpen: boolean) => void;
}

const useSidebar = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSidebar;
