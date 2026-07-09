import type { SettingsData } from "@/types/settings";

export const defaultSettingsData: SettingsData = {
  general: {
    language: "en",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    sidebarBehavior: "expanded",
  },
  appearance: {
    mode: "dark",
    compactMode: false,
    uiDensity: "comfortable",
  },
  notifications: {
    email: true,
    push: true,
    inApp: true,
    jobAlerts: true,
    aiRecommendations: true,
    weeklySummary: false,
  },
  privacy: {
    publicProfile: true,
    recruiterVisibility: true,
    analyticsSharing: false,
    activityVisibility: true,
    dataExportEnabled: false,
  },
  aiPreferences: {
    defaultProvider: "openai",
    defaultModel: "gpt-4o",
    creativity: 0.7,
    responseLength: 1024,
    autoSuggestions: true,
    promptHistory: true,
  },
  careerPreferences: {
    preferredRoles: ["Senior AI Engineer", "ML Architect", "Tech Lead"],
    salaryRange: { min: 150000, max: 250000 },
    workType: "full-time",
    remotePreference: "hybrid",
    industries: ["Technology", "AI/ML", "SaaS"],
    seniority: "senior",
  },
  security: {
    lastPasswordChange: "2025-12-15",
    sessions: { active: 2, lastActivity: "2 hours ago" },
    devices: { count: 3, lastDevice: "Chrome on macOS" },
    mfaEnabled: false,
    loginHistory: 47,
  },
  integrations: {
    linkedin: true,
    github: true,
    google: true,
    calendar: false,
    drive: false,
  },
  storage: {
    documents: { used: 256, total: 1024 },
    profile: { used: 48, total: 512 },
    uploads: { used: 128, total: 2048 },
    total: { used: 432, total: 3584 },
  },
  dangerZone: {
    resetLocalData: false,
    clearCache: false,
  },
};
