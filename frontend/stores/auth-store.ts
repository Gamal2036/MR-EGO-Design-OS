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
  registeredUsers: Record<string, string>;
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
const initialRegisteredUsers = {
  "alex.chen@example.com": "password123",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: initialRegisteredUsers,

      login: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (!emailRegex.test(normalizedEmail)) {
          set({ user: null, isAuthenticated: false });
          clearSessionCookie();
          return { success: false, error: "Invalid credentials" };
        }

        const storedPassword = get().registeredUsers[normalizedEmail];
        if (!storedPassword || storedPassword !== password) {
          set({ user: null, isAuthenticated: false });
          clearSessionCookie();
          return { success: false, error: "Invalid credentials" };
        }

        const user: MockUser = {
          id: generateId(),
          email: normalizedEmail,
          username: normalizedEmail.split("@")[0] ?? "user",
        };

        set({ user, isAuthenticated: true });
        setSessionCookie();

        return { success: true };
      },

      register: (data) => {
        const normalizedEmail = data.email.trim().toLowerCase();
        if (!emailRegex.test(normalizedEmail)) {
          return { success: false, error: "Please enter a valid email address" };
        }
        if (data.password.length < 6) {
          return { success: false, error: "Password must be at least 6 characters" };
        }

        const user: MockUser = {
          id: generateId(),
          email: normalizedEmail,
          username: data.username,
        };

        set({
          user,
          isAuthenticated: true,
          registeredUsers: {
            ...get().registeredUsers,
            [normalizedEmail]: data.password,
          },
        });
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
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers,
      }),
    },
  ),
);
