// authStore.ts
import { create } from 'zustand';

// Let's define the shape of our state and actions in a single interface
interface AuthState {
  isLoggedIn: boolean;
  user: { id: string; name: string; email: string; } | null;
  login: (userData: { id: string; name: string; email: string; }) => void;
  logout: () => void;
}

// We use the 'create' function to build our store.
// 'set' is the function Zustand gives us to update the state.
export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,

  login: (userData) => {
    // We use the set function to update multiple state properties at once
    set({ isLoggedIn: true, user: userData });
  },

  logout: () => {
    // We use the set function to reset the state
    set({ isLoggedIn: false, user: null });
  },
}));