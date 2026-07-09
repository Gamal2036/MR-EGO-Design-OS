import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface MockUser {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: MockUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: { username: string; email: string; password: string }) => { success: boolean; error?: string };
  logout: () => void;
}

function generateId(): string {
  return `mock_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function setSessionCookie() {
  if (typeof document !== "undefined") {
    document.cookie = "mr-ego-session=true; path=/; max-age=86400; SameSite=Lax";
  }
}

function clearSessionCookie() {
  if (typeof document !== "undefined") {
    document.cookie = "mr-ego-session=; path=/; max-age=0; SameSite=Lax";
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (email, password) => {
        if (!emailRegex.test(email)) {
          return { success: false, error: "Please enter a valid email address" };
        }
        if (password.length < 6) {
          return { success: false, error: "Password must be at least 6 characters" };
        }

        const user: MockUser = {
          id: generateId(),
          email,
          username: email.split("@")[0] ?? "user",
        };

        set({ user, isAuthenticated: true });
        setSessionCookie();

        return { success: true };
      },

      register: (data) => {
        if (!emailRegex.test(data.email)) {
          return { success: false, error: "Please enter a valid email address" };
        }
        if (data.password.length < 6) {
          return { success: false, error: "Password must be at least 6 characters" };
        }

        const user: MockUser = {
          id: generateId(),
          email: data.email,
          username: data.username,
        };

        set({ user, isAuthenticated: true });
        setSessionCookie();

        return { success: true };
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
        clearSessionCookie();
      },
    }),
    {
      name: "mr-ego-auth",
    },
  ),
);
