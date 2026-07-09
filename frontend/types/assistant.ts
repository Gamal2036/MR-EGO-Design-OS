export type AssistantId = string;

export type AssistantStatus = "online" | "offline" | "busy" | "away";

export type AssistantCategory =
  | "career"
  | "cv"
  | "jobs"
  | "interview"
  | "learning"
  | "skills"
  | "salary"
  | "recruiter"
  | "documents"
  | "writing"
  | "general";

export type AssistantProvider = "OpenAI" | "Anthropic" | "Google" | "Mistral" | "Cohere" | "Groq" | "Custom";

export interface AssistantCapability {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface AssistantTool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

export interface AssistantMemory {
  id: string;
  key: string;
  value: string;
  updatedAt: string;
}

export interface AssistantPrompt {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  category?: string;
}

export interface AssistantHistoryItem {
  id: string;
  query: string;
  response: string;
  timestamp: string;
  favorite: boolean;
}

export interface AssistantWorkflow {
  id?: string;
  title: string;
  description: string;
  steps: number;
  category: string;
}

export interface AssistantStats {
  totalQueries: number;
  queriesToday: number;
  avgResponseTime: number;
  satisfactionRate: number;
  tokensUsed: number;
  tokensToday: number;
}

export interface Assistant {
  id: AssistantId;
  name: string;
  description: string;
  initials: string;
  status: AssistantStatus;
  provider: AssistantProvider;
  model: string;
  category: AssistantCategory;
  lastActivity: string;
  favorite: boolean;
  pinned: boolean;
  capabilities: AssistantCapability[];
  tools: AssistantTool[];
  supportedLanguages: string[];
  memory: AssistantMemory[];
  prompts: AssistantPrompt[];
  recentHistory: AssistantHistoryItem[];
  workflows: AssistantWorkflow[];
  stats: AssistantStats;
  tokenUsage: { used: number; limit: number; unit: string };
  latency: number;
  cost: number;
  backendHook: string;
}

export interface AssistantStoreState {
  assistants: Assistant[];
  activeAssistantId: AssistantId | null;
  searchQuery: string;
  categoryFilter: AssistantCategory | "all";
  showFavoritesOnly: boolean;
  showPinnedOnly: boolean;
  sidebarOpen: boolean;
  rightPanelOpen: boolean;
  isLoading: boolean;
  error: string | null;

  setActiveAssistant: (id: AssistantId | null) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: AssistantCategory | "all") => void;
  setShowFavoritesOnly: (value: boolean) => void;
  setShowPinnedOnly: (value: boolean) => void;
  setSidebarOpen: (open: boolean) => void;
  setRightPanelOpen: (open: boolean) => void;
  toggleFavorite: (id: AssistantId) => void;
  togglePinned: (id: AssistantId) => void;
  toggleSidebar: () => void;
  toggleRightPanel: () => void;
  addPrompt: (assistantId: AssistantId, prompt: AssistantPrompt) => void;
  removePrompt: (assistantId: AssistantId, promptId: string) => void;
  togglePromptPinned: (assistantId: AssistantId, promptId: string) => void;
  addHistoryItem: (assistantId: AssistantId, item: AssistantHistoryItem) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  filteredAssistants: () => Assistant[];
  activeAssistant: () => Assistant | null;
}
