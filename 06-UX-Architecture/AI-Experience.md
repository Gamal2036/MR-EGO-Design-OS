# AI Experience

**Phase:** DP-6 (UX Architecture)
**Design Authority:** DP-0 ([Product-Constitution.md](../01-Constitution/Product-Constitution.md) — AI Integration Rules, Decision Support Rules), DP-0 ([UX-Constitution.md](../01-Constitution/UX-Constitution.md) — Rule 12), DP-3 ([AI-Workspace-Pattern.md](../04-Component-Library/Patterns/AI-Workspace-Pattern.md)), DP-5 ([AI-Visual-Language.md](../06-Visual-Foundation/AI-Language/AI-Visual-Language.md))

---

## AI Philosophy for UX

AI in MR:EGO follows three principles in every interaction:

1. **AI never interrupts** — AI surfaces when useful, never when distracting
2. **AI is transparent** — Confidence, sources, and reasoning always visible
3. **AI defers to the user** — Every suggestion can be accepted, modified, or dismissed

---

## AI Interaction Surfaces

| Surface | Trigger | Visibility | User Control |
|---------|---------|------------|--------------|
| AI Summary Card | Dashboard load | Always on dashboard | Dismiss, customize |
| Inline Suggestions | Contextual (content type) | Below/beside relevant content | Accept, dismiss, modify |
| AI Chat Panel | Ctrl+I or floating button | On-demand | Open, close, resize |
| AI Explanation | User clicks "Explain" on suggestion | Expandable section | Expand/collapse |
| Match Score | Job detail page | Always visible | View breakdown |
| Skill Recommendations | Profile/Onboarding | When relevant skills detected | Accept, dismiss |
| Application Insights | Application detail | Status-based | View, act |
| Notification Summaries | Notification center | Batch-time | Read, dismiss |

---

## Suggestion Behavior

```
                    ┌────────────────────────────────────────────┐
                    │         AI SUGGESTION LIFECYCLE             │
                    └────────────────────────────────────────────┘
                                                                  
  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐
  │  CONTEXT     │───▶│  SUGGESTION  │───▶│  USER RESPONSE    │
  │  DETECTED    │    │  DISPLAYED   │    │                   │
  └──────────────┘    └──────────────┘    │  ┌────┐ ┌───┐    │
                                          │  │ACC │ │DISM│    │
                                          │  │EPT │ │ISS │    │
                                          │  └────┘ └───┘    │
                                          │  ┌────┐           │
                                          │  │MOD │           │
                                          │  │IFY │           │
                                          │  └────┘           │
                                          └──────────────────┘
```

### Suggestion Rules

| Rule | Description |
|------|-------------|
| One at a time | Maximum 1 suggestion visible per context area |
| Three strikes | If dismissed 3x in same context, AI stops suggesting for that type |
| Confidence gate | Suggestions below 40% confidence are not shown |
| Explainable | Every suggestion has a "Why?" option |
| Actionable | Every suggestion has a clear action (accept, modify, dismiss) |

---

## AI Confidence Display

| Confidence Level | Visual | When to Show |
|-----------------|--------|--------------|
| High (80-100%) | Solid primary badge + checkmark | Clear match, strong data |
| Medium (60-79%) | Dimmed badge + dash | Partial match, some uncertainty |
| Low (40-59%) | Outline badge + question mark | Weak signals, limited data |
| Below threshold (<40%) | Not displayed | Confidence too low to be useful |

---

## AI Explanation Format

When user clicks "Explain" or "Why?" on an AI suggestion:

```
┌──────────────────────────────────────────────────┐
│  Why MR:EGO suggests this                        │
│                                                  │
│  Based on your profile, skills, and activity:    │
│                                                  │
│  • Skills match:  85%  ─ 7 of 9 required skills  │
│  • Experience:    72%  ─ 5 years in similar role │
│  • Location:      100% ─ Remote, your preference │
│  • Education:     60%  ─ Related field           │
│                                                  │
│  Sources used:                                    │
│  • Your Skills: React, TypeScript, Node.js       │
│  • Your CV: Senior Frontend at Acme Corp         │
│  • Job Description: Senior React Engineer        │
│                                                  │
│  [Hide explanation]                               │
└──────────────────────────────────────────────────┘
```

---

## AI Presence By Screen

| Screen | AI Feature | Role | Visibility |
|--------|-----------|------|------------|
| Dashboard | Summary, recommendations, insights | Guardian | Always |
| Job Search | Natural language search, smart filters | Provider | On demand |
| Job Detail | Match score, cover letter, gap analysis | Provider | Always |
| Application Form | Completeness check, CV selector | Guardian | On interaction |
| Application Detail | Timeline estimate, next steps | Provider | Contextual |
| CV Manager | Analysis, optimization suggestions | Provider | On upload |
| CV Analysis | Score, improvement plan | Provider | Always on page |
| Profile | Skill suggestions, bio improvement | Provider | On edit |
| Onboarding | Goal suggestions, skill recommendations | Provider | Per step |
| Settings | Privacy explanations, optimal config | Guardian | On demand |
| AI Workspace | Full conversation, reasoning, memory | All | On demand |
| Notifications | Smart batching, digest generation | Guardian | Background |
| Empty States | Suggestions for first action | Guardian | On empty |

---

## AI Interaction States

| State | Visual | Behavior |
|-------|--------|----------|
| Idle | AI tools available but not active | User initiates |
| Detecting | Subtle AI icon pulse (background) | AI analyzing context |
| Suggesting | Suggestion card appears inline | User can respond |
| Thinking | Pulse animation on AI component | AI generating response |
| Responding | Streaming text or progressive reveal | User reads |
| Complete | Full response with sources + actions | User acts |
| Error | Graceful error (not technical) | Retry or dismiss |
| Offline | "AI unavailable" badge | All AI surfaces hidden |
| Learning | Subtle "AI updating" indicator | Background model update |

---

## AI Deference Rules

When AI and user intention conflict:

| Scenario | AI Behavior |
|----------|-------------|
| User dismisses suggestion | AI records preference, does not show again for same context |
| User modifies suggestion | AI accepts modification as feedback |
| User ignores suggestion | AI does not repeat same suggestion in same session |
| User repeatedly dismisses type | AI stops suggesting that type (permanent, user can re-enable) |
| User disables AI per module | All AI surfaces in that module hidden |
| User disables AI globally | AI hidden everywhere (can be re-enabled in Settings) |

---

## Memory and Context

| Memory Feature | Behavior | User Control |
|---------------|----------|--------------|
| Session context | AI remembers current conversation | New session = fresh |
| User preferences | AI learns dismissed/accepted patterns | View in Settings |
| Profile data | AI references skills, experience, goals | Always available |
| Activity history | AI considers recent actions | Past 30 days |
| Explicit memory | AI stores user-stated preferences | Manage in AI Settings |
| Memory visibility | "What AI remembers about you" indicator | Always visible |

---

## AI Error Recovery

| Error Type | User-Facing Message | Recovery |
|-----------|---------------------|----------|
| AI unavailable | "AI services temporarily unavailable. Your data is saved." | Retry automatically when online |
| AI timeout | "This request is taking longer than expected." | Cancel or wait |
| AI misunderstanding | "I may not have understood. Could you rephrase?" | User rephrases |
| AI low confidence | "I'm not confident about this answer." | Skip or ask differently |
| AI error | "Something went wrong. I've noted the issue." | Dismiss or retry |
| AI safety filter | "I can't help with that request." | Alternative suggestion |

---

## AI Feature Priority

| Priority | Feature | Surface |
|----------|---------|---------|
| P0 | Match score | Job Detail |
| P0 | CV analysis + suggestions | CV Manager |
| P0 | Job recommendations | Dashboard |
| P1 | Cover letter generation | Application Form |
| P1 | Skill gap analysis | Job Detail |
| P1 | Onboarding suggestions | Onboarding |
| P2 | AI chat | AI Workspace |
| P2 | Interview prep | Application Detail |
| P2 | Salary insights | Job Detail |
| P3 | AI career insights | Dashboard |
| P3 | Smart notifications | Notification Center |
| P3 | Profile improvement | Profile |

---

## Future AI Expansion

| Feature | Phase |
|---------|-------|
| Voice interaction | Phase 14 |
| Multi-modal AI (charts, images) | Phase 14 |
| Proactive career alerts | Phase 2 |
| AI mentor / coach | Phase 6 |
| AI-powered networking suggestions | Phase 6 |
| Custom AI model selection | Phase 14 |
| AI workflow automation | Phase 14 |

---

*The AI Experience is designed to be deferential, transparent, and useful. AI never demands attention — it earns it through value. Refer to [Interaction-Patterns.md](Interaction-Patterns.md) for specific interaction designs and [Screen-Inventory.md](Screen-Inventory.md) for AI presence per screen.*
