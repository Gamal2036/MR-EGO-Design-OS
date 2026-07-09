export type ProviderId =
  | "openai"
  | "openrouter"
  | "anthropic"
  | "google-gemini"
  | "groq"
  | "ollama"
  | "azure-openai"
  | "custom";

export type ProviderStatus =
  | "connected"
  | "disconnected"
  | "disabled"
  | "testing"
  | "offline"
  | "missing-api-key"
  | "maintenance"
  | "error";

export type RoutingMode = "automatic" | "manual" | "smart";

export type ModelCategory = "chat" | "completion" | "embedding" | "image" | "code" | "reasoning";

export interface ProviderSettings {
  apiKey: string;
  baseUrl: string;
  organizationId: string;
  defaultModel: string;
  temperature: number;
  topP: number;
  maxTokens: number;
  streaming: boolean;
  timeout: number;
  retryCount: number;
}

export interface ProviderModel {
  id: string;
  name: string;
  category: ModelCategory;
  contextLength: number;
  speed: "fast" | "medium" | "slow";
  costPlaceholder: string;
  favorite: boolean;
  recentlyUsed: boolean;
  recommended: boolean;
  description?: string;
}

export interface HealthCheck {
  lastChecked: string | null;
  latency: number | null;
  status: "healthy" | "degraded" | "unhealthy" | "unknown";
  error?: string;
}

export interface ProviderConfig {
  id: ProviderId;
  name: string;
  description: string;
  status: ProviderStatus;
  settings: ProviderSettings;
  models: ProviderModel[];
  currentModel: string;
  latency: number | null;
  tokenUsage: number;
  health: HealthCheck;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderRouterConfig {
  defaultProvider: ProviderId | null;
  fallbackProvider: ProviderId | null;
  priorityList: ProviderId[];
  routingMode: RoutingMode;
}

export interface ConnectionTestResult {
  success: boolean;
  latency: number | null;
  message: string;
  timestamp: string;
}

export interface ProviderState {
  providers: ProviderConfig[];
  router: ProviderRouterConfig;
  expandedProvider: ProviderId | null;
  selectedProviderForEdit: ProviderId | null;

  addProvider: (provider: ProviderConfig) => void;
  removeProvider: (id: ProviderId) => void;
  updateProvider: (id: ProviderId, updates: Partial<ProviderConfig>) => void;
  resetProvider: (id: ProviderId) => void;
  setProviderStatus: (id: ProviderId, status: ProviderStatus) => void;
  setExpandedProvider: (id: ProviderId | null) => void;
  setSelectedProviderForEdit: (id: ProviderId | null) => void;
  updateProviderSettings: (id: ProviderId, settings: Partial<ProviderSettings>) => void;
  updateProviderHealth: (id: ProviderId, health: HealthCheck) => void;
  setCurrentModel: (id: ProviderId, modelId: string) => void;
  toggleModelFavorite: (providerId: ProviderId, modelId: string) => void;
  markModelUsed: (providerId: ProviderId, modelId: string) => void;
  setDefaultProvider: (id: ProviderId | null) => void;
  setFallbackProvider: (id: ProviderId | null) => void;
  setPriorityList: (list: ProviderId[]) => void;
  setRoutingMode: (mode: RoutingMode) => void;
}
