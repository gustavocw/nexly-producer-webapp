import { create } from "zustand";

interface ProducerState {
  producer: ProducerData | null;
}

interface AuthActions {
  setProducer: (producer: ProducerState["producer"]) => void;
}

const useProducerStore = create<ProducerState & AuthActions>((set) => ({
  producer: null,
  setProducer: (producer) => set({ producer }),
}));

export default useProducerStore;
