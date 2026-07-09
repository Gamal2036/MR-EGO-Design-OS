import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoProfileData } from "@/data/profile";
import type {
  CareerIdentity,
  PersonalInfo,
  ProfessionalSummary,
  ProfileData,
  ProfilePreferences,
  ProfileStore,
  ProfileViewState,
} from "@/types/profile";

const INITIAL_STATE = {
  data: null as ProfileData | null,
  viewState: "loading" as ProfileViewState,
  isEditing: false,
  isSaving: false,
  errorMessage: null as string | null,
};

export const useProfileStore = create<ProfileStore>()(
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

      setEditing: (editing) => set({ isEditing: editing }),

      setSaving: (saving) => set({ isSaving: saving }),

      setErrorMessage: (message) => set({ errorMessage: message }),

      updatePersonalInfo: (info) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            personalInfo: { ...data.personalInfo, ...info },
          },
        });
      },

      updateCareerIdentity: (identity) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            careerIdentity: { ...data.careerIdentity, ...identity },
          },
        });
      },

      updateProfessionalSummary: (summary) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            professionalSummary: { ...data.professionalSummary, ...summary },
          },
        });
      },

      updatePreferences: (prefs) => {
        const data = get().data;
        if (!data) return;
        set({
          data: {
            ...data,
            preferences: { ...data.preferences, ...prefs },
          },
        });
      },

      resetProfile: () =>
        set({
          ...INITIAL_STATE,
          data: demoProfileData,
          viewState: "ready",
        }),
    }),
    {
      name: "mr-ego-profile",
      partialize: (state) => ({
        data: state.data,
        isEditing: state.isEditing,
      }),
    }
  )
);
