# AI-Workspace-Pattern

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [AI-Constitution.md](../../01-Constitution/AI-Constitution.md)), DP-3 ([Composition-Rules.md](../Architecture/Composition-Rules.md))

---

## Purpose

Defines the AI interaction workspace layout for conversational AI assistance. Provides a structured environment for multi-turn conversations, context-aware prompting, AI recommendations, and memory management within the MR:EGO platform.

---

## Composition

```
AIWorkspace (Container)
├── WorkspaceLayout (SplitView or Panel layout)
│   ├── ConversationPanel (primary area)
│   │   ├── ConversationHeader
│   │   │   ├── ModelSelector (AI model choice)
│   │   │   ├── ConversationTitle
│   │   │   ├── ContextBadge (current AI context scope)
│   │   │   └── CloseButton / MinimizeButton
│   │   ├── MessageList (scrollable)
│   │   │   ├── PromptCard (user message, right-aligned)
│   │   │   │   ├── UserAvatar
│   │   │   │   ├── PromptText
│   │   │   │   ├── AttachmentsList (optional)
│   │   │   │   └── StatusIndicator (sent / sending / failed)
│   │   │   ├── AIMessage (AI response, left-aligned)
│   │   │   │   ├── AIIcon
│   │   │   │   ├── MessageContent (rich text / markdown)
│   │   │   │   ├── ContextBadge (response context)
│   │   │   │   ├── SourcesList (referenced data sources)
│   │   │   │   ├── FeedbackButtons (thumbs up/down)
│   │   │   │   └── ActionButtons (apply, export, etc.)
│   │   │   ├── ThinkingCard (AI processing indicator)
│   │   │   │   ├── ThinkingAnimation
│   │   │   │   └── ReasoningSteps (optional, expandable)
│   │   │   ├── StreamingMessage (real-time response)
│   │   │   │   ├── StreamingText
│   │   │   │   └── StopButton
│   │   │   └── TimestampDivider (between conversation days)
│   │   ├── InputArea (bottom)
│   │   │   ├── PromptInput (textarea, auto-resize)
│   │   │   ├── AttachButton (file upload trigger)
│   │   │   ├── SendButton (primary, disabled when empty)
│   │   │   ├── InterruptButton (visible during streaming)
│   │   │   └── CharacterCount (optional)
│   │   └── MemoryIndicator (below input)
│   │       ├── MemoryIcon
│   │       ├── MemorySummary ("Remembers you're a supply chain manager")
│   │       └── ManageMemoryLink
│   ├── ContextPanel (side panel, collapsible)
│   │   ├── PanelHeader ("Context")
│   │   ├── ContextBadge (full detail)
│   │   ├── ContextSourceList
│   │   │   └── ContextSourceItem (multiple)
│   │   │       ├── SourceIcon (per type)
│   │   │       ├── SourceName
│   │   │       └── SourceDetail
│   │   └── MemoryIndicator (expanded)
│   │       ├── MemoryItemList
│   │       │   └── MemoryItem (multiple)
│   │       └── ManageMemoryButton
│   └── RecommendationPanel (side panel, collapsible)
│       ├── PanelHeader ("Recommendations")
│       ├── SortDropdown (by confidence / date / relevance)
必要├── FilterDropdown (by confidence level / category)
│       ├── RecommendationList
│       │   └── RecommendationCard (multiple, ranked)
│       │       ├── RankNumber
│       │       ├── ConfidenceBadge
│       │       ├── RecommendationTitle
│       │       ├── RecommendationDescription
│       │       └── ActionButtons (Apply, Details, Dismiss)
│       └── ViewAllToggle
├── AISettingsPanel (optional, gear icon)
│   ├── ModelSelector
│   ├── TemperatureSlider
│   ├── ContextScopeSelector
│   └── MemoryToggle
└── NewConversationButton (floating or topbar)
    └── Button (primary, "New Conversation")
```

---

## When to Use

- Conversational AI assistant for natural language queries
- AI-powered data analysis with follow-up questions
- Context-aware recommendations with transparent source attribution
- Any interaction requiring multi-turn AI conversation with memory
- Workspace combining AI chat with contextual data and recommendations

## When NOT to Use

- Simple question-answer without conversation history (use inline AI input)
- Non-AI data entry or transaction screens
- Read-only AI-generated reports (use Analytics-Pattern instead)
- Single-turn AI actions (use AI-action Button variant)

---

## Variants

### Full Workspace
| Aspect | Specification |
|--------|---------------|
| Layout | 3-panel: Conversation (center, 50%), Context (right, 25%), Recommendations (right, 25%) |
| Capabilities | Full conversation, context exploration, ranked recommendations |
| Best for | Complex analytical tasks requiring AI assistance |

### Conversation Only
| Aspect | Specification |
|--------|---------------|
| Layout | Single panel: full-width conversation with collapsible side panels |
| Capabilities | Core conversation, context badge inline, recommendations in overlay |
| Best for | Quick Q&A, general AI assistance |

### Embedded AI
| Aspect | Specification |
|--------|---------------|
| Layout | Inline within existing page content; compact conversation widget |
| Capabilities | Single-turn or short conversation, no recommendation panel |
| Best for | AI assistance within a specific module (e.g., "Ask AI about this job") |

### Modal AI
| Aspect | Specification |
|--------|---------------|
| Layout | Full-screen overlay conversation; no side panels |
| Capabilities | Full conversation with slide-out context and recommendations |
| Best for | Temporary AI interaction while working in another module |

---

## States

| State | Visual | Behavior |
|-------|--------|----------|
| **Empty** | Welcome message in center: "Ask MR:EGO anything about your data" with suggested prompts | First interaction guidance |
| **Idle** | Message list with conversation history; input area ready | User can type or attach files |
| **Thinking** | ThinkingCard visible in message list; input disabled; InterruptButton available | AI processing query |
| **Streaming** | StreamingMessage with progressive text reveal; StopButton visible | Response generating in real-time |
| **Complete** | AIMessage fully rendered with sources and actions | User can continue conversation |
| **Error** | ErrorState in message list; PromptCard shows failed state with retry | Retry option for failed messages |
| **Loading history** | Skeleton messages (3-5) while loading previous conversation | Cannot send new messages until loaded |
| **Context updating** | ContextBadge shows pulse animation; sources being refreshed | Context panel temporarily in loading state |
| **Memory active** | MemoryIndicator shows summary text | AI has user context |
| **Memory inactive** | MemoryIndicator shows "Memory not active" | AI has no stored user context |
| **Uploading** | AttachButton shows progress; FileCard appears in input area | File being processed |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Message list | `role="log"`, `aria-live="polite"`, `aria-label="Conversation with MR:EGO AI"` |
| Messages | `role="article"` per message; `aria-label` includes sender: "Your message" / "AI response" |
| Input area | `<textarea>` with `aria-label="Message input"` |
| Send button | `aria-label="Send message"` (disabled state: `aria-disabled="true"`) |
| Attach button | `aria-label="Attach file"` |
| Interrupt/Stop | `aria-label="Stop generating"` |
| Thinking indicator | `aria-live="polite"`, `role="status"` |
| Streaming region | `aria-live="polite"` on StreamingMessage |
| AI sources | `aria-label="Sources for this response"` on source list |
| Feedback buttons | `aria-label="Mark as helpful"` / `aria-label="Mark as unhelpful"` |
| Recommendations | `role="region"`, `aria-label="AI Recommendations"` |
| Context badge | `role="status"`, `aria-label` describing context scope |
| Memory indicator | `aria-label` describing memory status; "Manage memory" focusable |
| Side panels | Collapsible with `aria-expanded` on toggle buttons |
| Keyboard | Enter to send, Shift+Enter for newline; Tab through messages; Escape to close side panels |
| Focus management | Auto-focus input on mount; return focus after message sent; new messages auto-scroll |
| Attachments | File cards in input have `aria-label` with file name and size |
| AI attribution | Every AI message labeled with "AI-generated" for transparency |

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | Modal variant forced. Single panel conversation. Context and recommendations slide up as bottom sheets. Input sticky at bottom. MemoryIndicator compact. Header collapses: title only, no model selector. |
| Tablet (768-1023px) | Single panel with slide-over side panels. Context panel slides from right. Recommendations panel separate drawer. MemoryIndicator inline compact. |
| Desktop (1024-1279px) | 2-panel: Conversation + one side panel (user's choice). Side panels toggleable. Full conversation header. |
| Wide (1280-1599px) | 3-panel layout: Conversation + Context + Recommendations. All panels visible. Full details in all panels. |
| Ultra-wide (1600px+) | 3-panel layout with max conversation width 800px. Side panels show expanded content. MemoryIndicator expanded. |

---

## Implementation Example

```typescript
<AIWorkspace conversationId={conversationId}>
  <WorkspaceLayout variant="full">
    <ConversationPanel>
      <ConversationHeader>
        <ModelSelector models={availableModels} value={model} onChange={setModel} />
        <ContextBadge scope="multiple" sources={activeSources} />
      </ConversationHeader>
      <MessageList>
        {messages.map(msg => msg.type === 'prompt' ? (
          <PromptCard key={msg.id} {...msg} onRetry={handleRetry} />
        ) : (
          <AIMessage key={msg.id} {...msg} onFeedback={handleFeedback} />
        ))}
        {aiState === 'thinking' && <ThinkingCard reasoningSteps={steps} />}
        {aiState === 'streaming' && <StreamingMessage content={streamText} />}
      </MessageList>
      <InputArea>
        <PromptInput value={input} onChange={setInput} onSend={handleSend} />
        <AttachButton onAttach={handleAttach} />
        {aiState === 'streaming' ? (
          <InterruptButton onClick={handleInterrupt} />
        ) : (
          <SendButton onClick={handleSend} disabled={!input.trim()} />
        )}
      </InputArea>
      <MemoryIndicator active summary="MR:EGO remembers you're a supply chain manager" />
    </ConversationPanel>
    <ContextPanel collapsed={contextCollapsed} onToggle={toggleContext}>
      <ContextSourceList sources={contextSources} />
      <MemoryIndicator variant="expanded" memoryItems={memoryItems} />
    </ContextPanel>
    <RecommendationPanel
      recommendations={recommendations}
      onAction={handleRecommendationAction}
    />
  </WorkspaceLayout>
</AIWorkspace>
```

---

## Related Patterns

| Pattern | Relationship |
|---------|-------------|
| [Dashboard-Pattern.md](Dashboard-Pattern.md) | AI insights on dashboard link to AI workspace for detailed exploration |
| [Search-Pattern.md](Search-Pattern.md) | AI-powered natural language search alternative |
| [Upload-Pattern.md](Upload-Pattern.md) | File attachments within AI conversation for context |
| [CRUD-Pattern.md](CRUD-Pattern.md) | AI actions may trigger CRUD operations (create document, update record) |
| [Analytics-Pattern.md](Analytics-Pattern.md) | AI can generate charts and analysis within conversation |

## Dependencies

| Component | Usage |
|-----------|-------|
| [Conversation](../AI/Conversation.md) | Core conversation container |
| [PromptCard](../AI/PromptCard.md) | User message display |
| [AIMessage](../AI/AIMessage.md) | AI response display |
| [StreamingMessage](../AI/StreamingMessage.md) | Real-time response streaming |
| [ThinkingCard](../AI/ThinkingCard.md) | Processing indicator |
| [ContextBadge](../AI/ContextBadge.md) | Context scope indicator |
| [MemoryIndicator](../AI/MemoryIndicator.md) | User memory display |
| [RecommendationPanel](../AI/RecommendationPanel.md) | AI recommendations |
| [ConfidenceBadge](../AI/ConfidenceBadge.md) | Recommendation confidence |
| [ReasoningPanel](../AI/ReasoningPanel.md) | AI reasoning breakdown |
| [FileCard](../Documents/FileCard.md) | File attachments |
| [Panel](../Core/Panel.md) | Side panels |
| [SplitView](../Layout/SplitView.md) | Workspace layout |
| [Button](../Core/Button.md) | Action buttons |
| [IconButton](../Core/IconButton.md) | Compact controls |
| [Tooltip](../Core/Tooltip.md) | Source descriptions |

## Anti-patterns

1. **No context transparency** — Always show what data the AI is referencing.
2. **Allowing empty messages** — Send button disabled until text or attachment present.
3. **Auto-scroll when user scrolls up** — Respect scroll-lock if user has scrolled through history.
4. **No feedback mechanism** — AI responses must support thumbs up/down feedback.
5. **Hiding AI attribution** — Every AI response must be clearly labeled as AI-generated.
6. **No interrupt capability** — Users must be able to stop AI generation mid-stream.
7. **Concurrent streams** — Only one AI response at a time; disable input during generation.
8. **No memory transparency** — Users must know what the AI remembers about them.
9. **Overloading input area** — Keep input area clean: text input, attach, send only.
10. **No suggestions for empty state** — Show suggested prompts to guide first interaction.
