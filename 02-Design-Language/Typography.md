# Typography

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Typography is the foundation of MR:EGO's visual identity. Every character, every line, every spacing decision exists for one purpose: **maximum readability with minimum effort.**

MR:EGO uses a restrained type palette. Two typefaces, one scale, and a consistent set of weights cover every need from dashboard headings to legal footnotes.

---

## Font Stack

### Primary: Inter

Inter is a variable, geometric sans-serif typeface designed for screen readability. It is the single voice of MR:EGO.

- **Why Inter:** Optimized for screens with tall x-height, open apertures, and generous spacing. It renders clearly at every size from 10px captions to 48px headings. The extensive weight range (300–900) provides hierarchy without switching typefaces.
- **Fallback:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

### Monospace: JetBrains Mono

JetBrains Mono is used for code, data, structured content, and any text where character alignment is critical.

- **Why JetBrains Mono:** Designed for developers with ligatures for common programming patterns, clear distinction between similar characters (1/l/I, 0/O), and consistent character widths.
- **Fallback:** `'SF Mono', 'Fira Code', 'Cascadia Code', monospace`

### Not Used

- Serif typefaces: MR:EGO is a modern digital tool. Serif typefaces belong in print, long-form reading, or traditional media.
- Display/decorative typefaces: They age quickly and add no readability value.
- Multiple primary typefaces: Two typefaces maximum. A single primary typeface creates stronger brand recognition.

---

## Type Scale

The type scale follows a **major third (1.25) modular scale** with adjustments for screen readability.

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | 48px / 3rem | 700 | 1.1 | Hero sections, empty states, brand moments |
| Heading-1 | 36px / 2.25rem | 700 | 1.15 | Page titles, primary section headings |
| Heading-2 | 28px / 1.75rem | 650 | 1.2 | Section headings |
| Heading-3 | 22px / 1.375rem | 600 | 1.25 | Subsection headings |
| Heading-4 | 18px / 1.125rem | 600 | 1.3 | Card titles, panel headings |
| Body-Large | 16px / 1rem | 450 | 1.6 | Lead paragraphs, descriptions |
| Body | 15px / 0.9375rem | 400 | 1.6 | Default body text |
| Body-Small | 14px / 0.875rem | 400 | 1.5 | Secondary content, descriptions |
| Caption | 13px / 0.8125rem | 400 | 1.4 | Metadata, timestamps, footnotes |
| Label | 14px / 0.875rem | 500 | 1.4 | Form labels, table headers |
| Button | 14px / 0.875rem | 600 | 1 | Button text, tabs |
| Code | 13px / 0.8125rem | 400 | 1.5 | Code snippets, data display |
| Overline | 12px / 0.75rem | 600 | 1.2 | Category labels, status badges |
| Smallest | 11px / 0.6875rem | 400 | 1.3 | Legal text, captions, tiny metadata |

### Scale Rationale

The 1.25 modular scale was chosen because:
- Adjacent sizes are distinguishable (1.25x) but not jarring
- It produces sizes that work well together in stacked layouts
- It aligns with the 8px spacing grid (most sizes are on 4px or 2px boundaries)
- It is the most conservative of the common modular scales, supporting the Brand Constitution's emphasis on professional restraint

---

## Weight Scale

| Weight | Token | Usage |
|--------|-------|-------|
| 300 (Light) | Weight-Light | Large display text, loading states |
| 400 (Regular) | Weight-Regular | Body text, captions, descriptions |
| 450 (Medium) | Weight-Medium | Enhanced body, lead text |
| 500 (Semibold) | Weight-SemiBold | Labels, small headings |
| 600 (Bold) | Weight-Bold | Buttons, H4, H3 |
| 650 (Bolder) | Weight-Bolder | H2 headings |
| 700 (Extrabold) | Weight-ExtraBold | H1, Display |

MR:EGO never uses weight 800 or 900. They create excessive visual weight that competes with other elements.

---

## Readability Standards

| Parameter | Requirement | Source |
|-----------|-------------|--------|
| Body size minimum | 15px (14px minimum on compact) | WCAG, screen ergonomics |
| Line height (body) | 1.5–1.6x | Readability research |
| Line height (headings) | 1.1–1.3x | Visual hierarchy |
| Max line length | 70 characters | Readability research |
| Min line length | 35 characters (avoid widows) | Readability |
| Paragraph spacing | 1.5x line height | Visual rhythm |
| Column gap | Minimum 32px | Readability |

---

## Spacing and Rhythm

- **Paragraph margin:** 1em (16px) between paragraphs
- **Heading margin:** 1.5em below heading, 0.5em above
- **List item spacing:** 8px between list items
- **Bullet/numbers:** Indented 24px from text start
- **Letter spacing:** -0.01em for headings (tighten), 0em for body, 0.02em for uppercase (small caps)

*See [Spacing-System.md](Spacing-System.md) for complete spacing specifications.*

---

## Hierarchy Rules

1. **Never use more than 3 heading levels** on a single page (H1, H2, H3). Additional levels indicate page complexity that should be split.
2. **Heading weight decreases with size.** H1 is 700 weight. H4 is 600 weight. This creates a smoother visual hierarchy.
3. **Body text weight is always 400** (Regular). Never use 300 for body — it reduces readability at small sizes.
4. **Only one Display element per page.** Display is for hero sections and empty states only.
5. **Labels are always uppercase with tracking.** `Label` token uses 0.04em letter-spacing for clarity.

---

## Color and Typography

Text colors follow the Text Hierarchy defined in [Color-System.md](Color-System.md):
- **Headings:** Text-Primary (Neutral-900 light / Neutral-900 dark)
- **Body:** Text-Body (Neutral-800 light / Neutral-700 dark)
- **Secondary:** Text-Secondary (Neutral-600 light / Neutral-500 dark)
- **Links:** Primary-600 (light) / Primary-400 (dark)

---

## Usage Examples

| Element | Token | Example |
|---------|-------|---------|
| Page title | Heading-1 | "Your Workspace" |
| Section header | Heading-2 | "Recent Activity" |
| Card title | Heading-4 | "Q3 Performance Review" |
| Form label | Label | "Full Name" |
| Body paragraph | Body | "MR:EGO helps you manage your professional journey..." |
| Timestamp | Caption | "Updated 2 hours ago" |
| Data value | Body (Semibold) | "$84,500" |
| Badge | Overline | "NEW" |

---

## What Typography Does Not Include

- Decorative or display fonts
- Serif typefaces for body text
- Variable font axes beyond weight (no optical size, width, or slant variation)
- Custom icon fonts (see [Iconography.md](Iconography.md) for icon approach)
- Text shadows or text gradients
- Rotated or vertical text (except data visualization axis labels)

---

*This Typography specification is permanent. All component typography in DP-2, page layouts in DP-5, and module content in DP-6+ derive from this system. Refer to [Design-Tokens.md](Design-Tokens.md) for token naming, [Accessibility.md](Accessibility.md) for readability requirements, and [Spacing-System.md](Spacing-System.md) for vertical rhythm.*
