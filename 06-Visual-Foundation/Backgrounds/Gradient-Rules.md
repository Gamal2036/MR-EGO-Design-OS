# Gradient Rules

**Phase:** DP-5 (Visual Foundation)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md))

---

## Philosophy

Gradients in MR:EGO are rare. They are reserved for specific functional purposes: data visualization, loading states, and AI ambient effects. Gradients are never used for background decoration.

---

## Where Gradients Are Allowed

| Context | Gradient Type | Colors | Purpose |
|---------|--------------|--------|---------|
| Data visualization | Chart area fill | Primary + semantic | Show data distribution |
| Loading skeleton | Shimmer animation | Neutral-200 → Neutral-100 → Neutral-200 | Indicate loading |
| AI panel ambient | Top-to-bottom fade | Primary-50 → transparent (light) | Subtle AI distinction |
| Progress indicator | Left-to-right fill | Primary-500 → Primary-400 | Show completion |
| Hero onboarding | Subtle background | Neutral-50 → Neutral-100 | Warm welcome (onboarding only) |

---

## Gradient Specifications

### Chart Gradient

| Property | Value |
|----------|-------|
| Direction | Bottom-to-top (from axis to data line) |
| Opacity | 30% at base → 0% at top |
| Colors | Primary-500 transparent → Primary-500 at 0% |
| Usage | Area charts, stacked area charts only |

### Loading Shimmer

| Property | Value |
|----------|-------|
| Direction | Left-to-right diagonal |
| Colors | Base (Neutral-200) → Highlight (Neutral-100) → Base |
| Duration | 1500ms loop |
| Opacity | 100% throughout |

### AI Ambient Gradient

| Property | Value |
|----------|-------|
| Direction | Top-to-bottom |
| Colors (Light) | Primary-50 (5% opacity) → transparent |
| Colors (Dark) | Primary-900 (8% opacity) → transparent |
| Height | 120px from top of AI panel |

### Progress Gradient

| Property | Value |
|----------|-------|
| Direction | Left-to-right |
| Colors | Primary-500 → Primary-400 |
| Width | Variable (based on progress percentage) |

---

## Gradient Prohibitions

| Gradient Type | Why |
|--------------|-----|
| Background gradients | Date quickly, create contrast issues |
| Card background gradients | Reduce text readability, inconsistent |
| Button background gradients | Look dated, suggest consumer app |
| Text gradients | Hard to read, inaccessible |
| Icon gradients | Inconsistent with simple icon style |
| Hover state gradients | Over-engineered feedback |
| Navigation gradient | Confuses depth hierarchy |
| Full-screen gradient | Overwhelming, amateur appearance |

---

## Gradient Rules

1. **Gradients are always subtle.** Opacity between 5-30%. Never full saturation transitions.
2. **Gradients use two colors maximum.** Never multi-stop gradients.
3. **Gradients are flat direction** (top-bottom, left-right, bottom-top). No radial, conic, or angled gradients.
4. **Text never sits on a gradient background** unless the gradient is extremely subtle and contrast is verified.
5. **Gradients respect reduced-motion.** Static versions are available.
6. **Gradients in dark mode are desaturated.** Bright gradients are jarring on dark backgrounds.

---

*These Gradient Rules are permanent. Gradients are functional tools, not decorative elements. Refer to [Background-System.md](Background-System.md) for background specifications, [Noise-and-Texture.md](Noise-and-Texture.md) for texture guidelines, and [Color-System.md](../../02-Design-Language/Color-System.md) for color values.*
