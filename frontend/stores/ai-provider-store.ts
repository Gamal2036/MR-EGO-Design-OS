import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  HealthCheck,
  ProviderConfig,
  ProviderId,
  ProviderSettings,
  ProviderState,
  ProviderStatus,
  RoutingMode,
} from "@/types/ai-providers";

const defaultSettings: ProviderSettings = {
  apiKey: "",
  baseUrl: "",
  organizationId: "",
  defaultModel: "",
  temperature: 0.7,
  topP: 1,
  maxTokens: 4096,
  streaming: true,
  timeout: 30000,
  retryCount: 3,
};

const defaultHealth: HealthCheck = {
  lastChecked: null,
  latency: null,
  status: "unknown",
};

function createDefaultProviders(): ProviderConfig[] {
  const providers: Omit<ProviderConfig, "id" | "name" | "description"> = {
    status: "disconnected",
    settings: { ...defaultSettings },
    models: [],
    currentModel: "",
    latency: null,
    tokenUsage: 0,
    health: { ...defaultHealth },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return [
    { id: "openai", name: "OpenAI", description: "GPT-4o, GPT-4, GPT-3.5 models", ...providers },
    { id: "openrouter", name: "OpenRouter", description: "Unified API for multiple providers", ...providers },
    { id: "anthropic", name: "Anthropic", description: "Claude models by Anthropic", ...providers },
    { id: "google-gemini", name: "Google Gemini", description: "Gemini models by Google DeepMind", ...providers },
    { id: "groq", name: "Groq", description: "Fast inference with LPU technology", ...providers },
    { id: "ollama", name: "Ollama", description: "Local open-source models", ...providers },
    { id: "azure-openai", name: "Azure OpenAI", description: "Microsoft Azure OpenAI Service", ...providers },
    {
      id: "custom",
      name: "Custom Provider",
      description: "Bring your own API-compatible provider",
      ...providers,
    },
  ];
}

function generateModelId(providerId: ProviderId, name: string): string {
  return `${providerId}:${name.toLowerCase().replace(/\s+/g, "-")}`;
}

const defaultModels: Record<ProviderId, { id: string; name: string }[]> = {
  "openai": [
    { id: generateModelId("openai", "gpt-4o"), name: "GPT-4o" },
    { id: generateModelId("openai", "gpt-4o-mini"), name: "GPT-4o Mini" },
    { id: generateModelId("openai", "gpt-4-turbo"), name: "GPT-4 Turbo" },
    { id: generateModelId("openai", "gpt-4"), name: "GPT-4" },
    { id: generateModelId("openai", "gpt-3.5-turbo"), name: "GPT-3.5 Turbo" },
  ],
  "openrouter": [
    { id: generateModelId("openrouter", "auto"), name: "Auto (Best Match)" },
  ],
  "anthropic": [
    { id: generateModelId("anthropic", "claude-sonnet-4"), name: "Claude Sonnet 4" },
    { id: generateModelId("anthropic", "claude-opus-4"), name: "Claude Opus 4" },
    { id: generateModelId("anthropic", "claude-haiku-3.5"), name: "Claude Haiku 3.5" },
    { id: generateModelId("anthropic", "claude-sonnet-3.5"), name: "Claude Sonnet 3.5" },
  ],
  "google-gemini": [
    { id: generateModelId("google-gemini", "gemini-2.0-flash"), name: "Gemini 2.0 Flash" },
    { id: generateModelId("google-gemini", "gemini-2.0-pro"), name: "Gemini 2.0 Pro" },
    { id: generateModelId("google-gemini", "gemini-1.5-pro"), name: "Gemini 1.5 Pro" },
    { id: generateModelId("google-gemini", "gemini-1.5-flash"), name: "Gemini 1.5 Flash" },
  ],
  "groq": [
    { id: generateModelId("groq", "llama-3.3-70b"), name: "Llama 3.3 70B" },
    { id: generateModelId("groq", "mixtral-8x7b"), name: "Mixtral 8x7B" },
    { id: generateModelId("groq", "gemma2-9b"), name: "Gemma 2 9B" },
  ],
  "ollama": [
    { id: generateModelId("ollama", "llama-3.2"), name: "Llama 3.2" },
    { id: generateModelId("ollama", "mistral"), name: "Mistral" },
    { id: generateModelId("ollama", "codellama"), name: "CodeLlama" },
    { id: generateModelId("ollama", "mixtral"), name: "Mixtral" },
  ],
  "azure-openai": [
    { id: generateModelId("azure-openai", "gpt-4o"), name: "GPT-4o" },
    { id: generateModelId("azure-openai", "gpt-4"), name: "GPT-4" },
    { id: generateModelId("azure-openai", "gpt-35-turbo"), name: "GPT-3.5 Turbo" },
  ],
  "custom": [
    { id: generateModelId("custom", "default"), name: "Default Model" },
  ],
};

export const useAIProviderStore = create<ProviderState>()(
  persist(
    (set, get) => ({
      providers: createDefaultProviders().map((p) => ({
        ...p,
        models: (defaultModels[p.id] ?? []).map((m) => ({
          ...m,
          category: "chat" as const,
          contextLength: 4096,
          speed: "medium" as const,
          costPlaceholder: "—",
          favorite: false,
          recentlyUsed: false,
          recommended: false,
          description: undefined,
        })),
      })),
      router: {
        defaultProvider: null,
        fallbackProvider: null,
        priorityList: [],
        routingMode: "automatic",
      },
      expandedProvider: null,
      selectedProviderForEdit: null,

      addProvider: (provider) =>
        set((s) => ({
          providers: [...s.providers, provider],
        })),

      removeProvider: (id) =>
        set((s) => ({
          providers: s.providers.filter((p) => p.id !== id),
          router: {
            ...s.router,
            defaultProvider: s.router.defaultProvider === id ? null : s.router.defaultProvider,
            fallbackProvider: s.router.fallbackProvider === id ? null : s.router.fallbackProvider,
            priorityList: s.router.priorityList.filter((pid) => pid !== id),
          },
          expandedProvider: s.expandedProvider === id ? null : s.expandedProvider,
          selectedProviderForEdit: s.selectedProviderForEdit === id ? null : s.selectedProviderForEdit,
        })),

      updateProvider: (id, updates) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p,
          ),
        })),

      resetProvider: (id) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: "disconnected",
                  settings: { ...defaultSettings },
                  currentModel: "",
                  latency: null,
                  tokenUsage: 0,
                  health: { ...defaultHealth },
                  updatedAt: new Date().toISOString(),
                }
              : p,
          ),
        })),

      setProviderStatus: (id, status) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p,
          ),
        })),

      setExpandedProvider: (id) => set({ expandedProvider: id }),

      setSelectedProviderForEdit: (id) => set({ selectedProviderForEdit: id }),

      updateProviderSettings: (id, settings) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id
              ? { ...p, settings: { ...p.settings, ...settings }, updatedAt: new Date().toISOString() }
              : p,
          ),
        })),

      updateProviderHealth: (id, health) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id ? { ...p, health, updatedAt: new Date().toISOString() } : p,
          ),
        })),

      setCurrentModel: (id, modelId) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === id ? { ...p, currentModel: modelId, updatedAt: new Date().toISOString() } : p,
          ),
        })),

      toggleModelFavorite: (providerId, modelId) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === providerId
              ? {
                  ...p,
                  models: p.models.map((m) =>
                    m.id === modelId ? { ...m, favorite: !m.favorite } : m,
                  ),
                }
              : p,
          ),
        })),

      markModelUsed: (providerId, modelId) =>
        set((s) => ({
          providers: s.providers.map((p) =>
            p.id === providerId
              ? {
                  ...p,
                  models: p.models.map((m) =>
                    m.id === modelId ? { ...m, recentlyUsed: true } : m,
                  ),
                }
              : p,
          ),
        })),

      setDefaultProvider: (id) =>
        set((s) => ({
          router: { ...s.router, defaultProvider: id },
        })),

      setFallbackProvider: (id) =>
        set((s) => ({
          router: { ...s.router, fallbackProvider: id },
        })),

      setPriorityList: (list) =>
        set((s) => ({
          router: { ...s.router, priorityList: list },
        })),

      setRoutingMode: (mode) =>
        set((s) => ({
          router: { ...s.router, routingMode: mode },
        })),
    }),
    {
      name: "mr-ego-ai-providers",
      partialize: (state) => ({
        providers: state.providers,
        router: state.router,
        expandedProvider: state.expandedProvider,
      }),
    },
  ),
);
