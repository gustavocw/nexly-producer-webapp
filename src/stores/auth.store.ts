import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  stepLogin: boolean;
  producer: {
    id?: string;
    name?: string;
    createdAt?: string;
  } | null;
}

interface AuthActions {
  setIsLogged: (isLogged: boolean) => void;
  setStepLogin: (stepLogin: boolean) => void;
  setProducer: (producer: AuthState["producer"]) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isLogged: false,
      producer: null,
      stepLogin: false,
      setIsLogged: (isLogged) => set({ isLogged }),
      setStepLogin: (stepLogin) => set({ stepLogin }),
      setProducer: (producer) => set({ producer }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLogged: state.isLogged,
        producer: state.producer,
      }),
    }
  )
);

export default useAuthStore;
