# AI Components

**Phase:** DP-2 (Design System)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Project-Constitution.md](../../01-Constitution/Project-Constitution.md), [Product-Constitution.md](../../01-Constitution/Product-Constitution.md), [UX-Constitution.md](../../01-Constitution/UX-Constitution.md), [Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Elevation-System.md](../../02-Design-Language/Elevation-System.md), [Motion-System.md](../../02-Design-Language/Motion-System.md), [Feedback-System.md](../../02-Design-Language/Feedback-System.md), [Loading-System.md](../../02-Design-Language/Loading-System.md), [Iconography.md](../../02-Design-Language/Iconography.md))

---

## Purpose

AI components present AI-generated content, suggestions, and interactions in a clear, transparent, and trustworthy manner. Every AI component communicates that the content is AI-generated, provides confidence context, and allows user feedback.

---

## When to Use

- Displaying AI-generated text, suggestions, or recommendations
- Showing AI reasoning or thinking process
- Indicating confidence in AI outputs
- Allowing user feedback on AI interactions
- Streaming AI-generated content in real time
- Communicating what information AI remembers about the user

## When NOT to Use

- User-generated content — use standard content components
- System messages and confirmations — use feedback components
- Data-driven insights (non-AI) — use insight cards without AI attribution

---

## Variants

### AI Message

Primary container for AI-generated text content.

| Element | Specification |
|---------|---------------|
| Avatar | MR:EGO AI icon (20px), Primary-500 |
| Sender label | "MR:EGO AI" (Label, Primary-600) |
| Timestamp | Caption (13px), Text-Secondary |
| Content | Body (15px), line height 1.6, markdown-supported |
| Sources | Collapsible "Sources" section below content |
| Feedback | Thumbs up/down icons, 16px, Text-Secondary |
| Action | Optional CTAs within or below message |
| Background | Surface-1 |
| Left border | 3px solid Primary-300 (AI indicator) |
| Padding | 16px 20px |
| Border radius | Radius-Md (8px) |

| State | Visual |
|-------|--------|
| Default | Full content visible |
| Streaming | Content appearing progressively with cursor |
| Complete | Cursor removed, feedback shown |
| Error | "Could not generate response" with retry |
| Regenerating | Previous content fades, new content streams in |

### Thinking Card

Visualizes AI processing state.

| Property | Collapsed | Expanded |
|----------|-----------|----------|
| Visual | Sparkle icon + "Thinking..." + animated dots | Full reasoning steps |
| Content | Summary of what AI is considering | Step-by-step reasoning |
| Height | 40px | Auto (up to 300px, scrollable) |
| Animation | Dots pulse | Reasoning lines appear staggered |
| Toggle | Click to expand | Click to collapse |
| Duration | While AI processes | After AI completes |

| Element | Specification |
|---------|---------------|
| Icon | Sparkle/star icon, 16px, rotating or pulsing |
| Label | "Analyzing your profile..." or "Generating insights..." |
| Steps | Ordered list of reasoning steps (when expanded) |
| Time | Elapsed time (optional, "Analyzing for 3s") |
| Cancel | "Stop" button to cancel generation |

### Suggestion Card

AI-driven recommendation presented for user consideration.

| Element | Specification |
|---------|---------------|
| Header | "Suggestion" badge (overline, Primary-600) + sparkle icon |
| Title | The suggestion headline (Body, weight 600) |
| Body | Explanation (Body-Small, Text-Secondary) |
| Confidence | Badge showing confidence level |
| Actions | "Apply", "Dismiss", "Modify" |
| Feedback | "Why this?" link + thumbs up/down |
| Background | Primary-50 (light), Primary-900 (dark) |
| Left border | 3px solid Primary-400 |

### Reasoning Panel

In-depth view of AI reasoning for a recommendation.

| Property | Collapsed | Expanded |
|----------|-----------|----------|
| Trigger | "Show reasoning" link | "Hide reasoning" link |
| View | Summary line (1 line) | Full reasoning with steps |
| Content | "Based on 3 factors" | Evidence, data sources, logic chain |
| Animation | Expand 200ms Ease-Out | Collapse 150ms Ease-In |

| Element | Specification |
|---------|---------------|
| Section label | "How MR:EGO reached this conclusion" |
| Factors | List of factors considered, each with weight |
| Data sources | Links to relevant profile data, market data |
| Confidence | Visual breakdown of confidence per factor |
| Disclaimer | "AI recommendations are suggestions. Final decisions are yours." |

### Confidence Badge

Indicator of AI certainty level for a given output.

| Level | Color | Icon | Label |
|-------|-------|------|-------|
| High | Success-500 | Checkmark shield | "High confidence" |
| Medium | Warning-500 | Warning triangle | "Medium confidence" |
| Low | Danger-500 | Question mark | "Low confidence — review before acting" |

| Property | Value |
|----------|-------|
| Size | 16px icon + label (Caption, 12px) |
| Layout | Icon + text, horizontal |
| Placement | Below AI content or next to recommendation |
| Tooltip | "What does this mean?" link with explanation |
| Accessibility | Color + icon + text — never color alone |

### Action Recommendation

AI-suggested action presented for user approval.

| Element | Specification |
|---------|---------------|
| Icon | Action type icon (24px) |
| Title | Action description ("Apply for Senior Engineer at Acme") |
| Context | Why now? ("Strong match based on your profile and recent activity") |
| Impact | Expected outcome ("83% match — high probability of interview") |
| Risk | What to consider ("Application deadline is in 5 days") |
| Actions | "Proceed", "Dismiss", "Schedule for later" |
| Group | Multiple recommendations ranked by priority |

### Streaming Output

Real-time AI content delivery.

| Property | Value |
|----------|-------|
| Cursor | Blinking vertical bar at content end |
| Speed | ~30 chars/second (natural reading pace) |
| Reveal | Word-by-word or chunk-by-chunk |
| Completion | Cursor removed, content finalized |
| Interrupt | User can stop generation |
| Edit | User can edit after completion |
| State | Generating → Complete → Edited |

### Memory Indicator

Communicates what AI remembers about the user.

| Property | Value |
|----------|-------|
| Icon | Book or brain icon, 16px |
| Label | "MR:EGO remembers you're a [role] based in [location]" |
| Action | "Manage memory" link to preferences |
| Placement | Below first AI message in a conversation |
| Hover | Tooltip shows all memory items |
| Privacy | "You control what MR:EGO remembers" |

---

## AI Component Anatomy

```
AI Message:
┌──────────────────────────────────────────┐
│  [🤖] MR:EGO AI               2 min ago  │
├──────────────────────────────────────────┤
│  Based on your recent activity and       │
│  profile, I found 3 opportunities that   │
│  align with your career goals.           │
│                                          │
│  [Sources: Profile, Market Data]         │
│                                          │
│  [👍] [👎]  [Show reasoning ▸]           │
└──────────────────────────────────────────┘

Suggestion Card:
┌──────────────────────────────────────────┐
│  ✦ Suggestion               High confidence │
│                                          │
│  Update your profile headline             │
│  "Senior Engineer" gets 40% more views   │
│  than your current "Engineer" headline.  │
│                                          │
│  [Apply] [Dismiss]  [Why this?]          │
└──────────────────────────────────────────┘
```

---

## Spacing

| Context | Value | Token |
|---------|-------|-------|
| AI message padding | 16px 20px | Space-5 Space-6 |
| AI message left border | 3px | — |
| Avatar to header | 8px | Space-3 |
| Header to content | 12px | Space-4 |
| Content to actions | 16px | Space-5 |
| Between AI messages | 16px | Space-5 |
| Thinking card padding | 12px 16px | Space-4 Space-5 |
| Suggestion card padding | 16px 20px | Space-5 Space-6 |
| Feedback button gap | 8px | Space-3 |
| Confidence badge gap | 6px | Space-2 |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| AI attribution | `aria-label="AI generated content"` on AI messages |
| Streaming content | `aria-live="polite"` announces new content |
| Thinking state | `aria-live="polite"` "AI is processing" |
| Feedback buttons | `aria-label="Thumbs up"` / `Thumbs down"` |
| Expandable content | `aria-expanded` on reasoning panel |
| Confidence badge | Icon + text + meaningful description |
| Interrupt | `aria-label="Stop generation"` on stop button |
| Sources | `aria-controls` on collapsible sources |

---

## Responsive Behavior

| Breakpoint | Change |
|------------|--------|
| Mobile (<768px) | AI messages full-width. Reasoning panel inline (no side panel). |
| Tablet (768-1023px) | Standard. Suggestions shown inline. |
| Desktop (1024px+) | Standard. Optional side reasoning panel. |

---

## Future Expansion

- **Conversation thread** — Multi-turn AI conversation with history
- **AI persona selector** — Choose AI tone: analytical, creative, supportive
- **Comparison matrix** — AI side-by-side comparison of options
- **AI training indicator** — "AI is learning from your feedback"
- **Multi-modal output** — AI generates text + chart + image
- **AI action log** — Timeline of all AI suggestions with outcomes
- **Collaborative AI** — Multiple users viewing same AI output
- **AI custom instructions** — User-defined AI behavior preferences

---

## Related Components

- [Cards.md](Cards.md) — AI Card, Insight Card extend Card patterns
- [Buttons.md](Buttons.md) — AI Action button variant
- [Dialogs.md](Dialogs.md) — AI Dialog for AI interaction
- [Feedback.md](Feedback.md) — AI feedback collection
- [Loading.md](Loading.md) — AI Thinking, Streaming State
- [Search.md](Search.md) — AI Search with natural language
- [EmptyStates.md](EmptyStates.md) — No AI results empty state
- [Dashboard-Components.md](Dashboard-Components.md) — AI recommendation on dashboard
