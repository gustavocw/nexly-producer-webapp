import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface AuthState {
  isLogged: boolean;
  stepLogin: boolean;
  user: {
    id?: string;
    name?: string;
    createdAt?: string;
  } | null;
  producer: {
    id?: string;
    name?: string;
    createdAt?: string;
  } | null;
}

interface AuthActions {
  setIsLogged: (isLogged: boolean) => void;
  setStepLogin: (stepLogin: boolean) => void;
  setUser: (user: AuthState["user"]) => void;
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
      setUser: (user) => set({ user }),
      setProducer: (producer) => set({ producer }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLogged: state.isLogged,
        user: state.user,
        producer: state.producer,
      }),
    }
  )
);

export default useAuthStore;
