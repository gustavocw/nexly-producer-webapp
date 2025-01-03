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
}

interface AuthActions {
  setProducerStore: (producer: AuthState["producerStore"]) => void;
  setStepLogin: (stepLogin: AuthState["stepLogin"]) => void;
}

const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      producerStore: null,
      stepLogin: false,
      setProducerStore: (producerStore) => set({ producerStore }),
      setStepLogin: (stepLogin) => set({ stepLogin }),
    }),
    {
      name: "producer-me",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        producerStore: state.producerStore,
        stepLogin: state.stepLogin,
      }),
    }
  )
);

export default useAuthStore;
