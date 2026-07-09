# Reusable Pattern Rules

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md))

---

## Purpose

Defines the patterns for creating, identifying, and reusing component compositions across the Enterprise Component Library.

---

## Pattern Categories

### Structural Patterns

Repeatable layout structures:

| Pattern | Description | Components |
|---------|-------------|------------|
| Card Grid | Grid of cards with consistent sizing | Grid, Card |
| Split Layout | Two-panel content arrangement | SplitView, ResizablePanel |
| Stack Layout | Vertical arrangement of content | Stack, Divider |
| Sidebar Layout | Navigation rail + content area | Sidebar, Topbar, ContentArea |

### Interaction Patterns

Repeatable user interaction flows:

| Pattern | Description | Components |
|---------|-------------|------------|
| Search + Filter + Results | Data discovery flow | SearchInput, Filters, Table/List, Pagination |
| Form + Validation + Submit | Data entry flow | FormGroup, Input fields, Button |
| Modal + Confirmation | Decision flow | Dialog, ConfirmationDialog, Button |
| Wizard + Progress + Steps | Multi-step flow | Stepper, FormGroup, Button |

### Data Patterns

Repeatable data presentation approaches:

| Pattern | Description | Components |
|---------|-------------|------------|
| Table + Pagination + Sort | Tabular data browsing | Table, Pagination, Sorting |
| Timeline + Events | Chronological data display | Timeline, TimelineCard |
| Hierarchy + Expand | Tree data browsing | TreeView, Accordion |
| Dashboard + Widgets | Metric overview | StatCard, MetricCard, Widget |

### AI Patterns

Repeatable AI interaction approaches:

| Pattern | Description | Components |
|---------|-------------|------------|
| Message + Response | Single-turn AI interaction | AIMessage, PromptCard |
| Conversation + History | Multi-turn AI dialogue | Conversation, AIMessage, MemoryIndicator |
| Recommendation + Actions | AI suggestions with user action | RecommendationCard, RecommendationPanel |
| Thinking + Reasoning | AI processing display | ThinkingCard, ReasoningPanel |

---

## Pattern Identification Rules

1. A pattern exists when the same component composition appears in 3+ locations.
2. A pattern is extracted when it represents a complete, reusable interaction.
3. A pattern must have a clear purpose statement.
4. A pattern must define its allowed content slots.
5. A pattern must document alternative compositions.

---

## Pattern Definition Standard

Every pattern must document:

| Section | Description |
|---------|-------------|
| Name | Pattern name in PascalCase |
| Purpose | What the pattern accomplishes |
| Composition | Component hierarchy and slots |
| When to Use | Appropriate contexts |
| When NOT to Use | Inappropriate contexts |
| Variants | Alternative pattern forms |
| Example | Typical implementation |
| Related Patterns | Cross-references |

---

## Reuse Hierarchy

```
Design Tokens (DP-1)
    ↓
Atomic Components (Individual UI elements)
    ↓
Composed Components (Grouped atomic elements)
    ↓
Patterns (Reusable composed structures)
    ↓
Page Templates (Pattern arrangements for page types)
    ↓
Pages (Content-filled templates)
```

---

## Pattern Registration

New patterns follow this process:

1. **Identify** — Same composition appears in 3+ locations.
2. **Extract** — Create the composed component from shared composition.
3. **Document** — Add to Patterns/ with full definition.
4. **Replace** — Replace all instances with the new pattern component.
5. **Register** — Cross-reference from all related components.

---

## Rules

1. No pattern may duplicate another pattern.
2. Patterns must compose existing components only — no new atomic components.
3. Patterns must not contain page-specific content or logic.
4. Patterns must be modular — any slot can accept any valid child component.
5. Patterns must handle loading, empty, and error states.
6. No pattern may have hardcoded data or business logic.
7. Patterns are registered in the Pattern Registry for discoverability.
