import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  CVBuilderState,
  CVData,
  CVSectionId,
  CVAISuggestion,
  Experience,
  Education,
  Skill,
  Language,
  Project,
  Certification,
} from "@/types/cv-builder";
import { INITIAL_CV_DATA } from "@/types/cv-builder";

interface CVBuilderStore extends CVBuilderState {
  setActiveSection: (section: CVSectionId) => void;
  togglePreview: () => void;
  toggleAIPanel: () => void;
  setSelectedTemplate: (template: string) => void;

  updatePersonalInfo: (field: string, value: string) => void;
  updateSummary: (value: string) => void;

  addExperience: () => void;
  updateExperience: (id: string, field: string, value: string | boolean) => void;
  updateExperienceHighlight: (id: string, index: number, value: string) => void;
  addExperienceHighlight: (id: string) => void;
  removeExperienceHighlight: (id: string, index: number) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, field: string, value: string) => void;
  updateEducationAchievement: (id: string, index: number, value: string) => void;
  addEducationAchievement: (id: string) => void;
  removeEducationAchievement: (id: string, index: number) => void;
  removeEducation: (id: string) => void;

  addSkill: () => void;
  updateSkill: (id: string, field: string, value: string) => void;
  removeSkill: (id: string) => void;

  addLanguage: () => void;
  updateLanguage: (id: string, field: string, value: string) => void;
  removeLanguage: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, field: string, value: string | string[]) => void;
  removeProject: (id: string) => void;

  addCertification: () => void;
  updateCertification: (id: string, field: string, value: string) => void;
  removeCertification: (id: string) => void;

  markSaved: () => void;
  resetCV: () => void;

  getCompletionScore: () => number;
  getMissingSections: () => CVSectionId[];
}

const generateId = () => `cv-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

const defaultExperience = (): Experience => ({
  id: generateId(),
  company: "",
  position: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  highlights: [""],
});

const defaultEducation = (): Education => ({
  id: generateId(),
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
  achievements: [""],
});

const defaultSkill = (): Skill => ({
  id: generateId(),
  name: "",
  level: "intermediate",
  category: "",
});

const defaultLanguage = (): Language => ({
  id: generateId(),
  name: "",
  proficiency: "intermediate",
});

const defaultProject = (): Project => ({
  id: generateId(),
  name: "",
  role: "",
  description: "",
  technologies: [""],
  url: "",
  startDate: "",
  endDate: "",
});

const defaultCertification = (): Certification => ({
  id: generateId(),
  name: "",
  issuer: "",
  date: "",
  url: "",
  description: "",
});

export const useCVBuilderStore = create<CVBuilderStore>()(
  persist(
    (set, get) => ({
      cvData: { ...INITIAL_CV_DATA },
      activeSection: "personal-info",
      previewVisible: true,
      aiPanelVisible: false,
      selectedTemplate: "modern",
      suggestions: [],
      isDirty: false,
      lastSaved: null,

      setActiveSection: (section) => set({ activeSection: section }),

      togglePreview: () => set((s) => ({ previewVisible: !s.previewVisible })),

      toggleAIPanel: () => set((s) => ({ aiPanelVisible: !s.aiPanelVisible })),

      setSelectedTemplate: (template) => set({ selectedTemplate: template, isDirty: true }),

      updatePersonalInfo: (field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            personalInfo: { ...s.cvData.personalInfo, [field]: value },
          },
          isDirty: true,
        })),

      updateSummary: (value) =>
        set((s) => ({ cvData: { ...s.cvData, summary: value }, isDirty: true })),

      addExperience: () =>
        set((s) => ({
          cvData: { ...s.cvData, experience: [...s.cvData.experience, defaultExperience()] },
          isDirty: true,
        })),

      updateExperience: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            experience: s.cvData.experience.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
          isDirty: true,
        })),

      updateExperienceHighlight: (id, index, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            experience: s.cvData.experience.map((e) =>
              e.id === id
                ? { ...e, highlights: e.highlights.map((h, i) => (i === index ? value : h)) }
                : e
            ),
          },
          isDirty: true,
        })),

      addExperienceHighlight: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            experience: s.cvData.experience.map((e) =>
              e.id === id ? { ...e, highlights: [...e.highlights, ""] } : e
            ),
          },
          isDirty: true,
        })),

      removeExperienceHighlight: (id, index) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            experience: s.cvData.experience.map((e) =>
              e.id === id
                ? { ...e, highlights: e.highlights.filter((_, i) => i !== index) }
                : e
            ),
          },
          isDirty: true,
        })),

      removeExperience: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            experience: s.cvData.experience.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      addEducation: () =>
        set((s) => ({
          cvData: { ...s.cvData, education: [...s.cvData.education, defaultEducation()] },
          isDirty: true,
        })),

      updateEducation: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            education: s.cvData.education.map((e) =>
              e.id === id ? { ...e, [field]: value } : e
            ),
          },
          isDirty: true,
        })),

      updateEducationAchievement: (id, index, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            education: s.cvData.education.map((e) =>
              e.id === id
                ? {
                    ...e,
                    achievements: e.achievements.map((a, i) => (i === index ? value : a)),
                  }
                : e
            ),
          },
          isDirty: true,
        })),

      addEducationAchievement: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            education: s.cvData.education.map((e) =>
              e.id === id ? { ...e, achievements: [...e.achievements, ""] } : e
            ),
          },
          isDirty: true,
        })),

      removeEducationAchievement: (id, index) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            education: s.cvData.education.map((e) =>
              e.id === id
                ? { ...e, achievements: e.achievements.filter((_, i) => i !== index) }
                : e
            ),
          },
          isDirty: true,
        })),

      removeEducation: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            education: s.cvData.education.filter((e) => e.id !== id),
          },
          isDirty: true,
        })),

      addSkill: () =>
        set((s) => ({
          cvData: { ...s.cvData, skills: [...s.cvData.skills, defaultSkill()] },
          isDirty: true,
        })),

      updateSkill: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            skills: s.cvData.skills.map((sk) =>
              sk.id === id ? { ...sk, [field]: value } : sk
            ),
          },
          isDirty: true,
        })),

      removeSkill: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            skills: s.cvData.skills.filter((sk) => sk.id !== id),
          },
          isDirty: true,
        })),

      addLanguage: () =>
        set((s) => ({
          cvData: { ...s.cvData, languages: [...s.cvData.languages, defaultLanguage()] },
          isDirty: true,
        })),

      updateLanguage: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            languages: s.cvData.languages.map((l) =>
              l.id === id ? { ...l, [field]: value } : l
            ),
          },
          isDirty: true,
        })),

      removeLanguage: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            languages: s.cvData.languages.filter((l) => l.id !== id),
          },
          isDirty: true,
        })),

      addProject: () =>
        set((s) => ({
          cvData: { ...s.cvData, projects: [...s.cvData.projects, defaultProject()] },
          isDirty: true,
        })),

      updateProject: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            projects: s.cvData.projects.map((p) =>
              p.id === id ? { ...p, [field]: value } : p
            ),
          },
          isDirty: true,
        })),

      removeProject: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            projects: s.cvData.projects.filter((p) => p.id !== id),
          },
          isDirty: true,
        })),

      addCertification: () =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            certifications: [...s.cvData.certifications, defaultCertification()],
          },
          isDirty: true,
        })),

      updateCertification: (id, field, value) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            certifications: s.cvData.certifications.map((c) =>
              c.id === id ? { ...c, [field]: value } : c
            ),
          },
          isDirty: true,
        })),

      removeCertification: (id) =>
        set((s) => ({
          cvData: {
            ...s.cvData,
            certifications: s.cvData.certifications.filter((c) => c.id !== id),
          },
          isDirty: true,
        })),

      markSaved: () =>
        set({ isDirty: false, lastSaved: new Date().toISOString() }),

      resetCV: () =>
        set({
          cvData: { ...INITIAL_CV_DATA },
          activeSection: "personal-info",
          isDirty: false,
          lastSaved: null,
        }),

      getCompletionScore: () => {
        const { cvData } = get();
        let score = 0;
        let total = 8;

        if (cvData.personalInfo.fullName && cvData.personalInfo.email) score += 1;
        if (cvData.summary.length > 20) score += 1;
        if (cvData.experience.length > 0) score += 1;
        if (cvData.education.length > 0) score += 1;
        if (cvData.skills.length > 0) score += 1;
        if (cvData.languages.length > 0) score += 1;
        if (cvData.projects.length > 0) score += 1;
        if (cvData.certifications.length > 0) score += 1;

        return Math.round((score / total) * 100);
      },

      getMissingSections: () => {
        const { cvData } = get();
        const missing: CVSectionId[] = [];

        if (!cvData.personalInfo.fullName || !cvData.personalInfo.email) {
          if (!missing.includes("personal-info")) missing.push("personal-info");
        }
        if (cvData.summary.length < 20) missing.push("summary");
        if (cvData.experience.length === 0) missing.push("experience");
        if (cvData.education.length === 0) missing.push("education");
        if (cvData.skills.length === 0) missing.push("skills");
        if (cvData.languages.length === 0) missing.push("languages");
        if (cvData.projects.length === 0) missing.push("projects");
        if (cvData.certifications.length === 0) missing.push("certifications");

        return missing;
      },
    }),
    {
      name: "mr-ego-cv-builder",
      partialize: (state) => ({
        cvData: state.cvData,
        selectedTemplate: state.selectedTemplate,
        lastSaved: state.lastSaved,
      }),
    }
  )
);
