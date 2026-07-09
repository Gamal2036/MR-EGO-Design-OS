# Avatar

**Phase:** DP-3 (Component Library)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Design-Principles.md](../../01-Constitution/Design-Principles.md)), DP-1 ([Color-System.md](../../02-Design-Language/Color-System.md), [Typography.md](../../02-Design-Language/Typography.md), [Border-Radius.md](../../02-Design-Language/Border-Radius.md), [Spacing-System.md](../../02-Design-Language/Spacing-System.md))

---

## Purpose

Avatar represents a user or entity through an image, initials, or icon. It is used throughout MR:EGO to identify people, organizations, teams, and AI agents. Avatars provide immediate visual recognition and context for who or what is associated with content.

---

## Responsibilities

- Render a circular or rounded visual representation of a user/entity
- Display an image when provided, with fallback to initials or icon
- Generate initials from a provided name (up to 2 characters)
- Support six fixed sizes: 24px, 32px, 40px, 48px, 64px, 96px
- Render optional badge overlay for status indication (online, away, busy)
- Handle image load failures gracefully with fallback to initials
- Provide empty/placeholder state for unnamed entities

---

## Composition

```
Avatar
├── Image (optional, <img> element)
├── Initials (fallback when no image or image fails)
├── Icon (fallback when no image and no name)
└── Badge (optional, overlay at bottom-right)
```

Avatar uses:
- `Icon` — fallback representation when neither image nor name is available
- `Badge` — optional status indicator overlay

---

## Hierarchy

**Level:** 1 (Core Primitive)

**Parent:** None (consumed by Card, Sidebar, Topbar, List, AIMessage, ActivityCard, etc.)

**Children:**
- `Icon` (Level 0, optional) — fallback icon
- `Badge` (Level 1, optional) — status overlay indicator

**Siblings:** `Surface`, `Container`, `Divider`, `Badge`, `Chip`, `Tag`, `Tooltip`

---

## Props Contract

```typescript
/**
 * Avatar size in pixels.
 * - 24px: Inline with text, table cells, comment threads
 * - 32px: Compact lists, sidebar items
 * - 40px: Default avatar size, card headers
 * - 48px: Profile pages, message headers
 * - 64px: Profile cards, user settings
 * - 96px: Profile page hero, user preferences
 */
type AvatarSize = 24 | 32 | 40 | 48 | 64 | 96;

/**
 * Avatar display variant.
 * - image: Show user-provided image
 * - initials: Auto-generated initials from name (up to 2 chars)
 * - icon: Fallback icon for unnamed entities, groups, or bots
 */
type AvatarVariant = 'image' | 'initials' | 'icon';

/**
 * Avatar badge status indicating presence state.
 */
type AvatarBadgeStatus = 'online' | 'away' | 'busy' | 'offline' | 'none';

interface AvatarProps {
  /** Avatar size in pixels. @default 40 */
  size?: AvatarSize;
  /** Image URL for the avatar. */
  src?: string;
  /** Alt text for the avatar image. Required if src is provided. */
  alt?: string;
  /** Full name used to generate initials. Used as fallback and aria-label. */
  name?: string;
  /** Icon component for icon variant or fallback. */
  icon?: React.ReactNode;
  /** Background color for initials/icon fallback. Auto-assigned if not provided. */
  backgroundColor?: string;
  /** Badge status overlay. @default 'none' */
  badgeStatus?: AvatarBadgeStatus;
  /** Badge position. @default 'bottom-right' */
  badgePosition?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  /** Whether the avatar is clickable/interactive. @default false */
  isInteractive?: boolean;
  /** Click handler for interactive avatars. */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Additional class names. */
  className?: string;
  /** Inline styles. */
  style?: React.CSSProperties;
  /** Data test ID for automated testing. */
  dataTestId?: string;
  /** Ref forwarded to the root element. */
  ref?: React.Ref<HTMLDivElement>;
}
```

---

## Variants

### Image
Primary variant. Displays user-provided image URL.

| Property | Value |
|----------|-------|
| Shape | Circle (Radius-Full) |
| Image Fit | `cover` |
| Image Position | Center |
| Fallback | Initials (from `name`) or Icon (if name not provided) |
| On Error | Replace with initials or icon, log console warning |

### Initials
Auto-generated initials from the `name` prop.

| Property | Value |
|----------|-------|
| Shape | Circle (Radius-Full) |
| Initials | Max 2 characters (first character of first two words) |
| Font Size | Proportional to size (~40% of avatar diameter) |
| Font Weight | 600 (Semibold) |
| Text Color | White |
| Background | Auto-assigned color from preset palette (based on name hash) |

**Initials algorithm:**
1. Split `name` by whitespace
2. Take first character of first word (uppercase)
3. If more than one word, take first character of second word (uppercase)
4. Maximum 2 characters

**Background color palette (auto-assigned):**
```
#2563EB (Primary-600)  #7C3AED (Purple-500)  #DB2777 (Pink-500)
#DC2626 (Danger-500)   #EA580C (Orange-500)  #D97706 (Warning-600)
#059669 (Success-600)  #0891B2 (Cyan-600)    #4F46E5 (Indigo-500)
#BE185D (Pink-700)     #1D4ED8 (Primary-700) #9333EA (Purple-600)
```

### Icon
Fallback for unnamed entities, groups, bots, or system accounts.

| Property | Value |
|----------|-------|
| Shape | Circle (Radius-Full) |
| Icon Size | Proportional to avatar size (~45%) |
| Background | Neutral-200 (light), Neutral-400 (dark) |
| Icon Color | Neutral-500 (light), Neutral-600 (dark) |

---

## Sizes

| Size | Pixels | Border Radius | Initials Font | Icon Size | Badge Size | Use Case |
|------|--------|---------------|---------------|-----------|------------|----------|
| 24px | 24x24 | Radius-Full | 10px | 11px | 6px | Inline text, table cells |
| 32px | 32x32 | Radius-Full | 13px | 14px | 8px | Compact lists, sidebar |
| 40px | 40x40 | Radius-Full | 16px | 18px | 10px | Default, card headers |
| 48px | 48x48 | Radius-Full | 19px | 22px | 12px | Profile pages, messages |
| 64px | 64x64 | Radius-Full | 26px | 28px | 14px | Profile cards |
| 96px | 96x96 | Radius-Full | 38px | 44px | 18px | Profile hero |

---

## Badge Overlay

Badge is a small colored dot indicating presence or status.

| Status | Color | Description |
|--------|-------|-------------|
| Online | Success-500 | Active, available |
| Away | Warning-500 | Inactive for a period |
| Busy | Danger-500 | In a meeting, do not disturb |
| Offline | Neutral-400 | Not connected |
| None | — | No badge displayed |

| Property | Value |
|----------|-------|
| Position | Bottom-right, overlapping avatar edge |
| Border | 2px white border around badge (matches page background) |
| Size | Scales with avatar size (see size table) |

---

## States

| State | Trigger | Visual Change | Duration |
|-------|---------|--------------|----------|
| Default | — | Image, initials, or icon displayed | — |
| Hover (interactive) | Mouse enter | Slight scale (1.05), opacity change if interactive | 100ms |
| Focus (interactive) | Tab key | 2px Primary-500 focus ring, 2px offset | 100ms |
| Active (interactive) | Mouse down | Scale 0.97, brightness 0.95 | 50ms |
| Image loading | Image loading | Show placeholder (initials or icon) behind transparent image | — |
| Image error | Image load fail | Remove image, show initials or icon | Instant |

---

## Accessibility

| Requirement | Specification |
|-------------|---------------|
| Element | `<div>` with `role="img"` |
| Image alt | Required `alt` prop when `src` is provided |
| Name-based | `aria-label` set to `name` prop when initials are displayed |
| Icon-based | `aria-label` describing the entity (e.g., "User icon", "AI bot") |
| Interactive | `role="button"`, `tabIndex={0}`, Enter/Space activation |
| Badge | Badge has `aria-hidden="true"` (decorative) |
| Decorative avatars | `aria-hidden="true"` if avatar is purely decorative |
| Color not sole indicator | Status badge has different positions/sizes — color is supplemental |

---

## Responsive Rules

| Breakpoint | Behavior |
|------------|----------|
| Mobile (<768px) | 32px default size. 40px for profile pages. Badge border uses transparent (page color varies). |
| Tablet (768-1023px) | 40px default size. |
| Desktop (1024px+) | 40px default size. |
| Wide (1280px+) | 40px default size. |
| Ultra-wide (1600px+) | 40px default size, 64px for profile cards. |

Avatars maintain their pixel size regardless of viewport — they do not scale with breakpoints. Use different size props per breakpoint if needed.

---

## Animation Rules

| Action | Duration | Easing | Property |
|--------|----------|--------|----------|
| Hover (interactive) | 100ms | Ease-Out | transform, opacity |
| Active press | 50ms | Ease-Out | transform, brightness |
| Focus ring | 100ms | Ease-Out | box-shadow |

- All animations respect `prefers-reduced-motion`
- Only interactive avatars have animation — static avatars have no transitions
- Image loading has no animation (instant swap on load/error)

---

## Future Expansion

- **Group avatar** — Multiple entity avatars overlapping for team/group representation
- **Avatar with tooltip** — Show full name on hover via Tooltip
- **Uploadable avatar** — Click-to-upload with camera icon overlay
- **AI agent avatar** — Distinctive styling for AI agent entities
- **Animated avatar** — Subtle pulse for active/recording status
- **Organization logo avatar** — Square variant with Radius-Md for company logos

---

## Dependencies

| Dependency | Type | Usage |
|------------|------|-------|
| Icon | Internal (Level 0, optional) | Fallback icon for unnamed entities |
| Badge | Internal (Level 1, optional) | Status indicator overlay |
| Design Tokens | External (DP-1) | Colors, typography, spacing, border radius |

---

## Related Components

- [Badge.md](Badge.md) — Status overlay used on Avatar
- [Card.md](Card.md) — Profile card uses Avatar
- [Chip.md](Chip.md) — Chip with avatar supports Avatar inline
- [Tooltip.md](Tooltip.md) — Future tooltip integration for name display

---

## Anti-patterns

1. **Non-circular avatar** — Avatars are always circular (Radius-Full). For organizational logos, use a square variant with Radius-Md via Card or custom container.
2. **More than 2 initials** — Names longer than 2 words still produce max 2 initials for readability.
3. **Inline images without alt text** — Avatar must always have accessible label via `alt` or `name`.
4. **Badge without semantic meaning** — Badge color must correspond to a known status. Do not use for decoration.
5. **Custom sizes** — Only the six defined sizes are allowed. Custom sizes break visual consistency.
6. **Missing fallback** — Always provide `name` or `icon` prop. An avatar with no image, no name, and no icon is inaccessible.
7. **Avatar without padding** — Avatars must maintain at least 2px clearance from container edges.

---

## Performance Notes

- Single `<div>` with optional `<img>` child — minimal DOM footprint
- Image loading uses native `<img>` `onLoad`/`onError` — no external image optimization library required
- Initials generation is a pure string operation — no regex, minimal computation
- Background color assignment uses a simple hash of the name string — deterministic, no external library
- Badge is conditionally rendered — no DOM overhead when not used
- Interactive avatars add `tabIndex` and event listeners only when `isInteractive` is true
- Avatar is a good candidate for `React.memo` when `src` and `name` are stable
- Image loading state uses CSS only (opacity transition on load) — no JS state needed for fade-in
