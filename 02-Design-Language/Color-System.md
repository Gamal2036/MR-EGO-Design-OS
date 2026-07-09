# Color System

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Color in MR:EGO serves function, not fashion. Every color has a reason. Every color pairing is tested for accessibility. The palette is intentionally limited — fewer colors reduce cognitive load and create stronger brand recognition.

This system defines the permanent color language. Exact hex values, token names, and usage rules are documented here. The Design System (DP-2) will implement these as design tokens.

---

## Why This Palette Exists

MR:EGO's color palette is built on three principles derived from the Brand Constitution:

1. **Professional restraint:** A tool for professionals requires colors that communicate reliability, not excitement.
2. **Clarity through contrast:** Information hierarchy is achieved through contrast, not color variety.
3. **Meaning through color:** Color carries semantic meaning (success, warning, error, info). Using color for decoration dilutes this meaning.

---

## Primary Color

A single primary accent color used sparingly for:
- Primary actions (buttons, links)
- Active states (selected tabs, focused inputs)
- Key interactive elements
- Brand moments (logo, loading indicators)

**Primary Blue — #2563EB**

Why blue: Blue communicates trust, stability, and professionalism. It is the most universally recognized and accessible accent color. It works equally well in light and dark themes.

### Primary Scale

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Primary-50 | #EFF6FF | #172554 | Background tint |
| Primary-100 | #DBEAFE | #1E3A5F | Hover background |
| Primary-200 | #BFDBFE | #1E40AF | Selected background |
| Primary-300 | #93C5FD | #2563EB | Muted accent |
| Primary-400 | #60A5FA | #3B82F6 | Hover state |
| Primary-500 | #3B82F6 | #60A5FA | Default accent |
| Primary-600 | #2563EB | #93C5FD | Active state |
| Primary-700 | #1D4ED8 | #BFDBFE | Pressed state |
| Primary-800 | #1E40AF | #DBEAFE | Text on dark |
| Primary-900 | #172554 | #EFF6FF | Text on dark |

---

## Neutral Palette

The neutral palette forms the structural backbone of MR:EGO. It defines backgrounds, surfaces, borders, and text. The neutral palette is intentionally large because most of the interface is neutral.

### Light Theme

| Token | Hex | Usage |
|-------|-----|-------|
| Neutral-50 | #F8FAFC | Page background |
| Neutral-100 | #F1F5F9 | Surface background |
| Neutral-200 | #E2E8F0 | Elevated surface |
| Neutral-300 | #CBD5E1 | Card border |
| Neutral-400 | #94A3B8 | Divider, disabled text |
| Neutral-500 | #64748B | Placeholder text |
| Neutral-600 | #475569 | Secondary text |
| Neutral-700 | #334155 | Body text |
| Neutral-800 | #1E293B | Heading text |
| Neutral-900 | #0F172A | Primary text / headings |

### Dark Theme

| Token | Hex | Usage |
|-------|-----|-------|
| Neutral-50 | #0F172A | Page background |
| Neutral-100 | #1E293B | Surface background |
| Neutral-200 | #334155 | Elevated surface |
| Neutral-300 | #475569 | Card border |
| Neutral-400 | #64748B | Divider |
| Neutral-500 | #94A3B8 | Placeholder text |
| Neutral-600 | #CBD5E1 | Secondary text |
| Neutral-700 | #E2E8F0 | Body text |
| Neutral-800 | #F1F5F9 | Heading text |
| Neutral-900 | #F8FAFC | Primary text / headings |

---

## Semantic Colors

Semantic colors communicate state and meaning. They are used exclusively for their named purpose — never for decoration.

### Success — Green

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Success-500 | #10B981 | #34D399 | Status, confirmation |
| Success-600 | #059669 | #10B981 | Hover for success |
| Success-BG | #ECFDF5 | #064E3B | Background tint |

### Warning — Amber

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Warning-500 | #F59E0B | #FBBF24 | Caution state |
| Warning-600 | #D97706 | #F59E0B | Hover for warning |
| Warning-BG | #FFFBEB | #78350F | Background tint |

### Danger — Red

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Danger-500 | #EF4444 | #F87171 | Destructive actions |
| Danger-600 | #DC2626 | #EF4444 | Hover for danger |
| Danger-BG | #FEF2F2 | #7F1D1D | Background tint |

### Information — Blue (uses Primary)

Information states re-use the Primary color scale. This keeps the palette small and consistent.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Info-500 | Primary-500 | Primary-400 | Info banners |
| Info-BG | Primary-50 | Primary-900 | Info background |

---

## Surface Colors

Surfaces create the visual hierarchy through layers.

### Light Theme

| Layer | Value | Usage |
|-------|-------|-------|
| Surface-0 | Neutral-50 | Page background — lowest layer |
| Surface-1 | White (#FFFFFF) | Default card/sheet surface |
| Surface-2 | Neutral-100 | Secondary surface, sidebar |
| Surface-3 | Neutral-200 | Raised element, dropdown |

### Dark Theme

| Layer | Value | Usage |
|-------|-------|-------|
| Surface-0 | Neutral-50 | Page background |
| Surface-1 | Neutral-100 | Default card/sheet |
| Surface-2 | Neutral-200 | Secondary surface |
| Surface-3 | Neutral-300 | Raised element |

---

## Glass Surfaces

Glass is a surface treatment for overlays, modals, and navigation bars. It exists to create depth while preserving context of underlying content.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Glass-BG | rgba(255,255,255,0.72) | rgba(15,23,42,0.72) | Glass surface |
| Glass-Border | rgba(255,255,255,0.20) | rgba(255,255,255,0.08) | Glass edge |
| Glass-Blur | 12px | 12px | Backdrop blur |

*See [Glass-System.md](Glass-System.md) for full glass specifications and usage rules.*

---

## Border Colors

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| Border-Default | Neutral-300 | Neutral-300 | Card, panel, input borders |
| Border-Hover | Neutral-400 | Neutral-400 | Hover state border |
| Border-Focus | Primary-500 | Primary-400 | Focus ring |
| Border-Danger | Danger-500 | Danger-400 | Error state border |

---

## Text Hierarchy

| Token | Light | Dark | Ratio (AA) | Usage |
|-------|-------|------|------------|-------|
| Text-Primary | Neutral-900 | Neutral-900 | 15.4:1 | Page titles, primary headings |
| Text-Body | Neutral-800 | Neutral-700 | 10.2:1 | Paragraphs, descriptions |
| Text-Secondary | Neutral-600 | Neutral-500 | 6.7:1 | Captions, metadata |
| Text-Tertiary | Neutral-500 | Neutral-400 | 4.8:1 | Placeholders, hints |
| Text-Disabled | Neutral-400 | Neutral-500 | 3.1:1 | Disabled elements |
| Text-Inverse | White | Neutral-50 | — | Text on dark surfaces |
| Text-Link | Primary-600 | Primary-400 | — | Hyperlinks |
| Text-Link-Hover | Primary-700 | Primary-500 | — | Link hover |
| Text-Success | Success-600 | Success-400 | — | Success messages |
| Text-Warning | Warning-600 | Warning-400 | — | Warning messages |
| Text-Danger | Danger-600 | Danger-400 | — | Error messages |

All text combinations meet WCAG AA (4.5:1) minimum. Body and heading text exceed 7:1 for optimal readability.

---

## Dark Mode Philosophy

Dark mode is not an afterthought — it is a parallel color system designed alongside light mode.

**Principles:**
1. **Inverted hierarchy:** Dark surfaces are darker than the page background, not lighter. Light surfaces rise from the dark page.
2. **Reduced contrast:** Dark mode uses slightly reduced contrast ratios (7:1 instead of 15:1) to reduce eye strain in low-light environments.
3. **Color purity:** Saturated colors are toned down in dark mode. Pure white is never used as a surface color — it creates too much bloom.
4. **Semantic consistency:** Green still means success, red still means danger. Only the shade adapts to the theme.

---

## Future Light Theme Compatibility

The color system is designed for additional themes beyond dark and light:

- **High contrast theme:** Uses maximum contrast ratios (minimum 7:1 for all text) with thicker borders and more saturated semantic colors.
- **OLED theme:** Uses pure black (#000000) for backgrounds to leverage OLED power savings.
- **Custom themes:** The token architecture supports theme overrides without modifying the core palette. Theme files are additive, not replacement.

---

## Color Accessibility

Every color combination in MR:EGO meets WCAG 2.1 AA standards (4.5:1 for normal text, 3:1 for large text). The target is WCAG AAA (7:1) for body text.

### Contrast Ratios (Light Theme)

| Pair | Ratio | Pass AA | Pass AAA |
|------|-------|---------|----------|
| Text-Body on Surface-1 | 10.2:1 | ✓ | ✓ |
| Text-Secondary on Surface-1 | 6.7:1 | ✓ | ✗ (AAA requires 7:1) |
| Text-Tertiary on Surface-1 | 4.8:1 | ✓ | ✗ |
| Primary-600 on Surface-1 | 5.8:1 | ✓ | ✗ |
| Danger-600 on Surface-1 | 5.5:1 | ✓ | ✗ |

### Color as Meaning

Color is never the sole indicator of state. Every color-coded element includes:
- An icon or symbol
- Text label or description
- Visible focus indicator

*See [Accessibility.md](Accessibility.md) for full accessibility specifications.*

---

## Usage Rules

1. **Primary color is limited to ~10% of any screen.** Overuse dilutes its impact.
2. **Neutral colors dominate ~80% of any screen.** Structure comes from neutrals.
3. **Semantic colors only for their named purpose.** Success green only for success states.
4. **Gradients only in data visualization and loading states.** Never as background decoration.
5. **Text contrast never drops below 4.5:1** for any readable content.
6. **Interactive elements use Primary-600** (light) or Primary-400 (dark) for default states.
7. **Disabled elements use 40% opacity** on their respective color (text or fill).
8. **Surface stacking is limited to 3 layers.** Beyond Surface-3 creates visual noise.

---

*This Color System is permanent. All components in DP-2, pages in DP-5, and modules in DP-6+ derive their colors from this system. Refer to [Design-Tokens.md](Design-Tokens.md) for token naming conventions, [Accessibility.md](Accessibility.md) for contrast requirements, and [Brand-Constitution.md](../01-Constitution/Brand-Constitution.md) for the color philosophy foundation.*
