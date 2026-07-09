export type SettingsViewState = "loading" | "ready" | "error" | "empty";

export type SettingsCategory =
  | "general"
  | "appearance"
  | "notifications"
  | "privacy"
  | "ai-preferences"
  | "career-preferences"
  | "security"
  | "integrations"
  | "storage"
  | "danger-zone";

export interface GeneralSettings {
  language: string;
  timezone: string;
  dateFormat: string;
  sidebarBehavior: "expanded" | "collapsed" | "auto";
}

export interface AppearanceSettings {
  mode: "dark" | "light" | "system";
  compactMode: boolean;
  uiDensity: "comfortable" | "compact" | "cozy";
}

export interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
  jobAlerts: boolean;
  aiRecommendations: boolean;
  weeklySummary: boolean;
}

export interface PrivacySettings {
  publicProfile: boolean;
  recruiterVisibility: boolean;
  analyticsSharing: boolean;
  activityVisibility: boolean;
  dataExportEnabled: boolean;
}

export interface AIPreferences {
  defaultProvider: string;
  defaultModel: string;
  creativity: number;
  responseLength: number;
  autoSuggestions: boolean;
  promptHistory: boolean;
}

export interface CareerPreferences {
  preferredRoles: string[];
  salaryRange: { min: number; max: number };
  workType: string;
  remotePreference: string;
  industries: string[];
  seniority: string;
}

export interface SecuritySettings {
  lastPasswordChange: string | null;
  sessions: { active: number; lastActivity: string };
  devices: { count: number; lastDevice: string };
  mfaEnabled: boolean;
  loginHistory: number;
}

export interface IntegrationSettings {
  linkedin: boolean;
  github: boolean;
  google: boolean;
  calendar: boolean;
  drive: boolean;
}

export interface StorageInfo {
  documents: { used: number; total: number };
  profile: { used: number; total: number };
  uploads: { used: number; total: number };
  total: { used: number; total: number };
}

export interface DangerZoneSettings {
  resetLocalData: boolean;
  clearCache: boolean;
}

export interface SettingsData {
  general: GeneralSettings;
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  aiPreferences: AIPreferences;
  careerPreferences: CareerPreferences;
  security: SecuritySettings;
  integrations: IntegrationSettings;
  storage: StorageInfo;
  dangerZone: DangerZoneSettings;
}

export interface SettingsState {
  data: SettingsData | null;
  viewState: SettingsViewState;
  activeCategory: SettingsCategory;
  errorMessage: string | null;
}

export interface SettingsStore extends SettingsState {
  setViewState: (state: SettingsViewState) => void;
  setData: (data: SettingsData) => void;
  setActiveCategory: (category: SettingsCategory) => void;
  setErrorMessage: (message: string | null) => void;
  updateGeneral: (settings: Partial<GeneralSettings>) => void;
  updateAppearance: (settings: Partial<AppearanceSettings>) => void;
  updateNotifications: (settings: Partial<NotificationSettings>) => void;
  updatePrivacy: (settings: Partial<PrivacySettings>) => void;
  updateAIPreferences: (settings: Partial<AIPreferences>) => void;
  updateCareerPreferences: (settings: Partial<CareerPreferences>) => void;
  updateSecurity: (settings: Partial<SecuritySettings>) => void;
  updateIntegrations: (settings: Partial<IntegrationSettings>) => void;
  updateStorage: (settings: Partial<StorageInfo>) => void;
  updateDangerZone: (settings: Partial<DangerZoneSettings>) => void;
  reset: () => void;
}

export interface SettingsCategoryInfo {
  id: SettingsCategory;
  label: string;
  description: string;
}
