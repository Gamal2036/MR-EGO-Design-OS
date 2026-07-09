# DP-16.1 — Landing Polish & CTA Routing

**Status:** COMPLETED
**Date:** 2026-07-08

---

## Summary

Final polish of the landing page before DP-18 Smart Onboarding. All buttons are now functional with proper route targets. Visual identity has been deepened with a darker, more premium aesthetic using true black backgrounds, graphite gray surfaces, and cyan as a controlled accent.

---

## 1. CTA Routing — All Landing Buttons Functional

| Button | Location | Route | Implementation |
|---|---|---|---|
| **Sign In** | NavBar (desktop + mobile) | `/auth/login` | `<Link>` replacing inert `<a href="#">` |
| **Get Started** | NavBar (desktop + mobile) | `/auth/register` | Button `asChild` wrapping `<Link>` |
| **Start Your Journey** | Hero section | `/auth/register` | Button `asChild` wrapping `<Link>` |
| **Learn More** | Hero section | `#features` (scroll) | Button `asChild` wrapping `<a href="#features">` |
| **Learn more →** | Announcement Banner | `#features` (scroll) | Fixed href anchor |
| **See it in action** | AI Showcase | `#how-it-works` (scroll) | Fixed href anchor |
| **Start Your Journey** | CTA Section | `/auth/register` | Button `asChild` wrapping `<Link>` |
| **Get Started** | Pricing cards | `/auth/register` | Button `asChild` wrapping `<Link>` |
| **Contact Sales** | Enterprise pricing card | `#` (placeholder) | No sales page exists yet |

### Section IDs Added

- `id="features"` → `features.tsx` section element
- `id="how-it-works"` → `how-it-works.tsx` section element

### `asChild` Fix

Radix Slot (`@radix-ui/react-slot`) requires exactly one child. The Button component previously rendered `leftIcon`/`loading`/`rightIcon` conditionals alongside `children` inside `Slot`, creating multiple children. Fixed in `button.tsx` by separating the `asChild` render path — when `asChild` is true, only `{children}` is passed to `Slot`. Icons are now embedded directly in the child element.

---

## 2. Visual Identity Improvements

### Token System (`styles/tokens.css`)

**Added Cyan Color Palette** — both light (`:root`) and dark (`.dark`) themes:

| Token | Light | Dark (inverted) |
|---|---|---|
| `--color-cyan-50` | `#ecfeff` | `#164e63` |
| `--color-cyan-400` | `#22d3ee` | `#06b6d4` |
| `--color-cyan-500` | `#06b6d4` | `#22d3ee` |
| `--color-cyan-600` | `#0891b2` | `#67e8f9` |
| `--color-cyan-900` | `#164e63` | `#ecfeff` |
| `--color-cyan-glow` | `rgba(6, 182, 212, 0.15)` | `rgba(34, 211, 238, 0.2)` |

**Dark Theme — Deep Black + Graphite Gray Surfaces:**

| Token | Before | After |
|---|---|---|
| `--color-surface-0` | `#0f172a` (slate-950) | `#000000` (pure black) |
| `--color-surface-1` | `#1e293b` (slate-900) | `#080808` (near-black) |
| `--color-surface-2` | `#334155` (slate-800) | `#0f0f0f` (graphite) |
| `--color-surface-3` | `#475569` (slate-700) | `#1a1a1a` (graphite) |

**Dark Theme — HSL Shadcn Colors:**

| Token | Before | After |
|---|---|---|
| `--background` | `222 47% 11%` | `0 0% 0%` |
| `--primary` | `217 91% 60%` | `220 70% 50%` |
| `--border` | `217 33% 17%` | `0 0% 10%` |
| `--secondary` | `217 33% 17%` | `0 0% 6%` |
| `--card` | `222 47% 11%` | `0 0% 3%` |
| `--accent` | `217 33% 17%` | `0 0% 6%` |
| `--sidebar-background` | `222 47% 11%` | `0 0% 0%` |

**Glass Morphism (Dark):**

| Token | Before | After |
|---|---|---|
| `--glass-bg` | `rgba(15, 23, 42, 0.72)` | `rgba(0, 0, 0, 0.72)` |
| `--glass-border` | `rgba(255, 255, 255, 0.08)` | `rgba(255, 255, 255, 0.06)` |

### Tailwind Config (`tailwind.config.ts`)

- Added `cyan` color family mapping to `--color-cyan-*` variables

### Hero Component — Cyan Accents

- Hero gradient text: `from-primary via-cyan-500 to-ai-500` (was `via-ai-500 to-primary`)
- Sparkle floating icon: `text-cyan-500` (was `text-primary`)
- Zap floating icon: `text-cyan-500/60` (was `text-warning-500`)
- Brain icon: `text-ai-500/70` (more subtle)
- Target icon: `text-primary/60` (more subtle)
- New subtle cyan glow orb: `bg-cyan-50/30 dark:bg-cyan-900/5 blur-3xl`
- Reduced primary glow orb opacity: `bg-primary-900/15` (was `/20`)

### Announcement Banner

- Gradient: `from-primary-600 via-cyan-600 to-primary-600` (was `via-ai-600`)

---

## 3. Files Modified

| File | Change |
|---|---|
| `frontend/styles/tokens.css` | Added cyan palette, dark surface overrides, glass improvement, reduced primary brightness |
| `frontend/tailwind.config.ts` | Added `cyan` color mapping |
| `frontend/components/foundation/button.tsx` | Fixed `asChild` render path for Radix Slot compatibility |
| `frontend/components/landing/nav-bar.tsx` | Routed Sign In → `/auth/login`, Get Started → `/auth/register` |
| `frontend/components/landing/hero.tsx` | Routed buttons, added cyan accents, reduced blue brightness |
| `frontend/components/landing/cta-section.tsx` | Routed Start Your Journey → `/auth/register` |
| `frontend/components/landing/pricing-preview.tsx` | Routed Get Started → `/auth/register` |
| `frontend/components/landing/announcement-banner.tsx` | Fixed link → `#features`, added cyan to gradient |
| `frontend/components/landing/features.tsx` | Added `id="features"` for anchor scroll |
| `frontend/components/landing/how-it-works.tsx` | Added `id="how-it-works"` for anchor scroll |
| `frontend/components/landing/ai-showcase.tsx` | Fixed link → `#how-it-works` |

---

## 4. Build Validation

| Check | Status |
|---|---|
| `pnpm typecheck` | PASS (0 errors) |
| `pnpm lint` | PASS (0 errors) |
| `pnpm build` | PASS (all 19 pages static) |

---

## 5. Design Direction

The visual identity now follows a **Linear + Arc Browser + Apple dark** ethos:
- **True black backgrounds** (`#000000`) create infinite depth
- **Graphite gray surfaces** (`#080808`, `#0f0f0f`, `#1a1a1a`) provide subtle hierarchy
- **Primary blue** is reduced from 91% → 70% saturation, 60% → 50% lightness for a controlled, premium feel
- **Cyan** (`#06b6d4` light / `#22d3ee` dark) is used sparingly — gradient text, sparkle icon, announcement banner, glow orb
- **Glass panels** use darker, more transparent backgrounds with finer borders
- **Motion** remains calm with consistent easing (`cubic-bezier(0.16, 1, 0.3, 1)`)
- **Responsive behavior** is unchanged — all breakpoints remain clean
