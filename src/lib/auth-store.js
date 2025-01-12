import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAdmin: false,
      isPaid: false,
      isLoading: false,
      setAuth: (token, user, isAdmin = false) => set({ token, user, isAdmin }),
      updateUser: (user) => set({ user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () =>
        set({
          token: null,
          user: null,
          isAdmin: false,
          isPaid: false,
          isLoading: false,
        }),
    }),
    { name: 'auth-storage' }
  )
);

export { useAuthStore };
