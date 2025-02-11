import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

interface SidebarState {
  storedNotificationCount: number;
}

interface SidebarActions {
  setStoredNotificationCount: (count: number) => void;
}

const useSidebar = create<SidebarState & SidebarActions>()(
  persist(
    (set) => ({
      storedNotificationCount: parseInt(localStorage.getItem("notificationCount") || "0", 10),
      setStoredNotificationCount: (count) => set({ storedNotificationCount: count }),
    }),
    {
      name: "sidebar",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSidebar;
