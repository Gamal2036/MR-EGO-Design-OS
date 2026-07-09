# AI Integration Layer

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md) — AI Rules), DP-5 ([AI-Language/](../06-Visual-Foundation/AI-Language/)), DP-6 ([AI-Experience.md](../06-UX-Architecture/AI-Experience.md))

---

## Purpose

Defines the AI integration layer — service abstraction, streaming engine, context management, suggestion pipeline, fallback handling, and AI component integration.

---

## AI Architecture

```
┌─────────────────────────────────────────────────────────┐
│                   AI INTEGRATION LAYER                    │
├─────────────────────────────────────────────────────────┤
│  AI Service Abstraction                                  │
│  ┌─────────────────┐ ┌─────────────────┐                │
│  │ Provider Adapter │ │  Model Router   │                │
│  └─────────────────┘ └─────────────────┘                │
├─────────────────────────────────────────────────────────┤
│  Streaming Engine                                        │
│  SSE connection, chunk parsing, buffer management        │
├─────────────────────────────────────────────────────────┤
│  Context Manager                                         │
│  Session, conversation, memory, profile context          │
├─────────────────────────────────────────────────────────┤
│  Suggestion Pipeline                                     │
│  Trigger detection, confidence gate, display rules       │
├─────────────────────────────────────────────────────────┤
│  AI Component Layer                                      │
│  Message, streaming, thinking, reasoning, memory         │
└─────────────────────────────────────────────────────────┘
```

---

## Service Abstraction

### Provider Adapter Pattern

```typescript
// Pseudocode
interface AIProvider {
  complete(prompt: Prompt, options?: CompletionOptions): Promise<Response>;
  stream(prompt: Prompt, options?: StreamOptions): AsyncIterable<Chunk>;
  embed(text: string): Promise<Embedding>;
  health(): Promise<ProviderHealth>;
}

interface ProviderHealth {
  status: 'healthy' | 'degraded' | 'unavailable';
  latency: number;
  model: string;
  rateLimited: boolean;
}

// Provider implementations (future)
class AnthropicProvider implements AIProvider { /* Claude API */ }
class OpenAIProvider implements AIProvider { /* GPT API */ }
class LocalProvider implements AIProvider { /* On-device model */ }
```

### Model Router

```typescript
// Pseudocode
interface ModelRouter {
  selectModel(task: AITask, context: AIContext): string;
  // Routes based on:
  // - Task type (chat, analysis, embedding, generation)
  // - Required capabilities (reasoning, speed, cost)
  // - User tier (free, pro, enterprise)
  // - Current provider health
  // - Latency requirements
}

enum AITask {
  Chat,               // Conversational AI
  Analysis,           // CV analysis, job matching
  Suggestion,         // Inline suggestions
  Generation,         // Cover letter, content
  Embedding,          // Vector search
  Classification,     // Categorisation
}
```

---

## Streaming Engine

```
Request sent to AI provider
     ↓
SSE connection established
     ↓
┌─────────────────────────────────────────────────────────┐
│                    CHUNK LOOP                             │
│                                                          │
│  Receive chunk → Parse → Buffer → Emit to subscriber    │
│                                                          │
│  Chunk types: text, done, error, usage, tool_use        │
│                                                          │
│  Buffer rules: flush every 50ms or every 5 chunks       │
└─────────────────────────────────────────────────────────┘
     ↓
Stream complete
     ↓
Final response assembled from chunks
     ↓
Emitted to subscriber
```

### Stream States

| State | UI | User Can |
|-------|-----|----------|
| Connecting | "Connecting..." | Cancel |
| Streaming | Text appearing in real-time | Cancel, pause |
| Interrupted | Partial text + "Continue?" | Continue, regenerate |
| Complete | Full response | Copy, edit, dismiss |
| Error | Error state | Retry, dismiss |

---

## Context Manager

```typescript
// Pseudocode
interface AIContext {
  session: SessionContext;
  conversation: ConversationContext;
  profile: ProfileContext;
  page: PageContext;
  explicit: ExplicitContext;
}

interface ConversationContext {
  messages: Message[];
  summary: string;
  tokens: number;           // Current token count
  maxTokens: number;        // Context window limit
  truncated: boolean;       // Whether context was summarised
}

interface PageContext {
  route: string;
  module: string;
  content: string;          // Current page content as context
  selection: string;        // User's current text selection
  action: string;           // Current user action
}
```

### Context Window Strategy

```
Conversation grows
     ↓
Token count approaches limit (80%)
     ↓
Automatic summarisation of early messages
     ↓
Summary replaces oldest messages
     ↓
Context preserved, tokens saved
     ↓
User sees "Context summarised" indicator
```

---

## Suggestion Pipeline

```
Trigger event (page load, selection, action)
     ↓
Suggestion engine evaluates context
     ↓
Confidence calculated
     ↓
┌─────────────────────────────────────────────────────────┐
│                   CONFIDENCE GATE                        │
│                                                          │
│  If confidence >= 40% → Show suggestion                 │
│  If confidence < 40%  → Do not show                     │
│  If dismissed 3x in same context → Suppress permanently │
│  If user ignored 5x in same context → Suppress for session │
└─────────────────────────────────────────────────────────┘
     ↓
Suggestion displayed in appropriate surface
     ↓
User response:
  Accept → Apply suggestion
  Modify → Edit and apply
  Dismiss → Record dismissal
  Explain → Show reasoning
```

### Suggestion Types

| Surface | Trigger | Max Frequency |
|---------|---------|---------------|
| Dashboard AI summary | Page load | Once per session |
| Job detail match score | Page load | Once per job |
| CV analysis | Upload complete | Once per analysis |
| Cover letter suggestion | Apply form opens | Once per application |
| Skill suggestion | Profile edit | Once per section |
| Application insight | Status change | Once per change |
| Search refinement | No results | Once per search |

---

## Error Handling

```typescript
// Pseudocode
interface AIError {
  type: 'unavailable' | 'timeout' | 'low-confidence' | 'safety' | 'rate-limit' | 'context-limit';
  userMessage: string;
  recovery: 'retry' | 'retry-auto' | 'dismiss' | 'simplify';
}

const errorMessages: Record<AIErrorType, string> = {
  unavailable: 'AI services are temporarily unavailable. Your data is saved.',
  timeout: 'This request is taking longer than expected.',
  lowConfidence: 'I am not confident about this answer.',
  safety: 'I cannot help with that request.',
  rateLimit: 'Please wait a moment before asking another question.',
  contextLimit: 'The conversation is getting long. Starting fresh might help.',
};
```

---

## AI Component Integration

```typescript
// Pseudocode
// Standard AI query hook
function useAIQuery(options: AIQueryOptions) {
  return {
    data: Message | null,
    isLoading: boolean,
    isStreaming: boolean,
    streamedContent: string,
    error: AIError | null,
    send: (prompt: string) => void,
    cancel: () => void,
    regenerate: () => void,
  };
}

// AI suggestion hook
function useAISuggestion(context: SuggestionContext) {
  return {
    suggestion: Suggestion | null,
    confidence: number,
    isLoading: boolean,
    accept: () => void,
    modify: (changes: Partial<Suggestion>) => void,
    dismiss: () => void,
    explain: () => void,
    reasoning: Reasoning | null,
  };
}
```

---

## AI Visual States

```typescript
// Pseudocode
enum AIVisualState {
  Idle,           // AI available but inactive
  Detecting,      // AI analysing context (subtle pulse)
  Suggesting,     // Suggestion visible (confidence badge)
  Thinking,       // AI generating response (pulse dots)
  Responding,     // Streaming text (typewriter effect)
  Complete,       // Full response shown
  Error,          // Error state
  Offline,        // AI unavailable
  Learning,       // Background model update
}
```

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Data-Flow.md](Data-Flow.md) | AI streaming data pipeline |
| [Component-Hierarchy.md](Component-Hierarchy.md) | AI components integration |
| [DP-6 AI Experience](../06-UX-Architecture/AI-Experience.md) | Source AI UX specifications |

---

## Validation Notes

1. AI provider abstraction supports any backend — Anthropic, OpenAI, local, or custom.
2. Streaming engine provides real-time response with 50ms flush intervals.
3. Context manager prevents token overflow with automatic summarisation.
4. Suggestion pipeline uses confidence gates to prevent low-quality suggestions.
5. All AI interactions follow the Guardian-Provider-Executioner model from DP-0.
