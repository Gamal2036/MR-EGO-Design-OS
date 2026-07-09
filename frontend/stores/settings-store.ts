import { create } from "zustand";
import { persist } from "zustand/middleware";

import { defaultSettingsData } from "@/data/settings";
import type {
  AIPreferences,
  AppearanceSettings,
  CareerPreferences,
  DangerZoneSettings,
  GeneralSettings,
  IntegrationSettings,
  NotificationSettings,
  PrivacySettings,
  SecuritySettings,
  SettingsCategory,
  SettingsData,
  SettingsStore,
  SettingsViewState,
  StorageInfo,
} from "@/types/settings";

const INITIAL_STATE = {
  data: null as SettingsData | null,
  viewState: "loading" as SettingsViewState,
  activeCategory: "general" as SettingsCategory,
  errorMessage: null as string | null,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,

      setViewState: (state) => set({ viewState: state }),

      setData: (data) =>
        set({
          data,
          viewState: "ready",
          errorMessage: null,
        }),

      setActiveCategory: (category) => set({ activeCategory: category }),

      setErrorMessage: (message) => set({ errorMessage: message }),

      updateGeneral: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            general: { ...data.general, ...settings },
          },
        });
      },

      updateAppearance: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            appearance: { ...data.appearance, ...settings },
          },
        });
      },

      updateNotifications: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            notifications: { ...data.notifications, ...settings },
          },
        });
      },

      updatePrivacy: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            privacy: { ...data.privacy, ...settings },
          },
        });
      },

      updateAIPreferences: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            aiPreferences: { ...data.aiPreferences, ...settings },
          },
        });
      },

      updateCareerPreferences: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            careerPreferences: { ...data.careerPreferences, ...settings },
          },
        });
      },

      updateSecurity: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            security: { ...data.security, ...settings },
          },
        });
      },

      updateIntegrations: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            integrations: { ...data.integrations, ...settings },
          },
        });
      },

      updateStorage: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            storage: { ...data.storage, ...settings },
          },
        });
      },

      updateDangerZone: (settings) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            dangerZone: { ...data.dangerZone, ...settings },
          },
        });
      },

      reset: () =>
        set({
          ...INITIAL_STATE,
          data: defaultSettingsData,
          viewState: "ready",
        }),
    }),
    {
      name: "mr-ego-settings",
      partialize: (state) => ({
        data: state.data,
        activeCategory: state.activeCategory,
      }),
    },
  ),
);
