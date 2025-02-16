import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface ProducerProps {
  id: string;
  success: boolean;
  token: string;
  plan: string;
}

interface AuthState {
  producerStore: ProducerProps | null;
  stepLogin: boolean;
  email: string | null;
  password: string | null;
  rememberMe: string;
  plan: string;
  setPlan: (plan: string) => void;
}

interface AuthActions {
  setProducerStore: (producer: AuthState["producerStore"]) => void;
  setStepLogin: (stepLogin: AuthState["stepLogin"]) => void;
  setEmail: (email: AuthState["email"]) => void;
  setPassword: (password: AuthState["password"]) => void;
  setRememberMe: (rememberMe: string) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      producerStore: null,
      stepLogin: false,
      email: null,
      password: null,
      rememberMe: "false",
      setProducerStore: (producerStore) => set({ producerStore }),
      setStepLogin: (stepLogin) => set({ stepLogin }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
      plan: '',
      setPlan: (plan) => set({ plan: plan }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        producerStore: state.producerStore,
        email: state.rememberMe === "true" ? state.email : null,
        password: state.rememberMe === "true" ? state.password : null,
        rememberMe: state.rememberMe,
      }),
    }
  )
);

export default useAuthStore;
