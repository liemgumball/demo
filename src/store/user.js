import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set((state) => ({ ...state, user: user })),
      removeUser: () => set((state) => ({ ...state, user: null })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
