import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface SidebarState {
  storedNotificationCount: number;
  isOpen: boolean;
}

interface SidebarActions {
  setStoredNotificationCount: (count: number) => void;
  toggleIsOpen: () => void;
}

const useSidebar = create<SidebarState & SidebarActions>()(
  persist(
    (set, get) => ({
      storedNotificationCount: parseInt(localStorage.getItem("notificationCount") || "0", 10),
      isOpen: true,
      setStoredNotificationCount: (count) => set({ storedNotificationCount: count }),
      toggleIsOpen: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSidebar;
