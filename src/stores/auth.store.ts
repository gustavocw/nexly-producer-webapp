import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface ProducerProps {
  token: string;
  plan: string;
  logged: boolean;
}

interface AuthState {
  producerStore: ProducerProps | null;
  stepLogin: boolean;
  savedCredentials: {
    email: string | null;
    password: string | null;
  } | null;
  rememberMe: boolean;
}

interface AuthActions {
  setProducerStore: (producer: ProducerProps | null) => void;
  setStepLogin: (stepLogin: boolean) => void;
  saveCredentials: (email: string | null, password: string | null) => void;
  setRememberMe: (rememberMe: boolean) => void;
  clearCredentials: () => void;
  resetProducerStore: () => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      producerStore: null,
      stepLogin: false,
      savedCredentials: null,
      rememberMe: false,

      setProducerStore: (producerStore) => set({ producerStore }),
      setStepLogin: (stepLogin) => set({ stepLogin }),
      saveCredentials: (email, password) => 
        set(state => ({
          savedCredentials: state.rememberMe ? { email, password } : null
        })),
      setRememberMe: (rememberMe) => set(state => ({
        rememberMe,
        savedCredentials: rememberMe ? state.savedCredentials : null
      })),
      clearCredentials: () => set({ 
        savedCredentials: null, 
        rememberMe: false 
      }),
      resetProducerStore: () => set({ 
        producerStore: null 
      }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        producerStore: state.producerStore,
        rememberMe: state.rememberMe,
        savedCredentials: state.rememberMe ? state.savedCredentials : null,
      }),
    }
  )
);

export default useAuthStore;