# Iconography

**Phase:** DP-1 (Design Language)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-0 ([Brand-Constitution.md](../01-Constitution/Brand-Constitution.md), [Design-Principles.md](../01-Constitution/Design-Principles.md))

---

## Philosophy

Icons in MR:EGO communicate concepts quickly and consistently. They are simple, clear, and purposeful. An icon that requires explanation has failed its purpose. Icons are always secondary to text labels — they accelerate recognition, never replace understanding.

---

## Icon Style

MR:EGO uses a **consistent outline (stroke) style** for all interface icons.

| Property | Specification | Rationale |
|----------|---------------|-----------|
| Style | Outlined / Stroke | Filled icons draw too much attention. Outline is cleaner and more professional. |
| Stroke width | 1.5px | Balanced — visible at all sizes without dominating the icon shape. |
| Corner radius | 2px (mitered) | Slight rounding for approachability. Rounded caps for open strokes. |
| Internal padding | 1px minimum | Icons have breathing room within their bounding box. |
| Filled variants | Only for active states | Selected tab, toggled-on, current state indicator. |
| Color | CurrentColor — inherits from text | Icons adapt to surrounding text color automatically. |

---

## Icon Sizes

MR:EGO uses a limited set of icon sizes. Every icon renders at these exact sizes — never scaled between them.

| Token | Size | Usage |
|-------|------|-------|
| Icon-Sm | 16px | Inline with body text, table cells, small buttons |
| Icon-Md | 20px | Default icon size, menu items, list items |
| Icon-Lg | 24px | Primary actions, navigation items, empty states |
| Icon-XL | 32px | Page headers, feature icons, illustrations |

### Size Rules

1. **Prefer Icon-Md (20px) as default.** It is the most versatile size.
2. **Icons in buttons match the button text size** (Button label = 14px → Icon = 16px).
3. **Navigation icons use Icon-Lg (24px)** for comfortable tap targets.
4. **Icons are never smaller than 16px** in interactive contexts.
5. **Icons are never larger than 32px** in standard interfaces (illustrations use larger).

---

## Icon Grid

Every icon is drawn on a consistent grid:

| Size | Grid | Padding | Scale Factor |
|------|------|---------|-------------|
| 16px | 16x16 | 1px | 1x |
| 20px | 20x20 | 1px | 1x |
| 24px | 24x24 | 1.5px | 1x |
| 32px | 32x32 | 2px | 1x |

All icons are drawn at 1x resolution and scaled up — never drawn at larger size and scaled down.

---

## Icon Categories

| Category | Description | Example Icons |
|----------|-------------|---------------|
| Navigation | Primary app navigation | Home, Workspace, Career, Settings |
| Actions | User-initiated operations | Add, Edit, Delete, Save, Share |
| Objects | Content types and entities | Document, Folder, Project, Profile |
| Indicators | State and status | Checkmark, Warning, Info, Error |
| Social | Communication and people | User, Team, Message, Notification |
| Media | Files and attachments | Image, Video, Link, File |
| Controls | UI control indicators | Chevron, Menu, Close, Search |

---

## Meaning and Consistency

1. **One concept, one icon.** Never use different icons for the same concept.
2. **Icons always include a text label** in navigation, buttons, and menus.
3. **Icon-only buttons** (toolbar, table actions) include tooltips and aria labels.
4. **Status icons use semantic colors** — checkmark in Success, warning in Warning, etc.
5. **Animated icons are limited to loading states.** Loading spinner rotates. Everything else is static.

---

## What Iconography Does Not Include

- **No duotone or multicolor icons.** Single color only (CurrentColor).
- **No glyph icons** (complex illustrations at icon size). Icons are simple shapes.
- **No animated icons** except loading spinner.
- **No branded icons** mixed with interface icons (social media logos are separate).
- **No emoji as icons.** Emoji rendering varies across platforms.
- **No icon-only navigation without text labels** (exception: universally understood icons like search and menu).

---

*This Iconography specification is permanent. All icons in DP-2 components and DP-5+ pages follow these rules. Refer to [Color-System.md](Color-System.md) for icon colors, [Design-Principles.md](../01-Constitution/Design-Principles.md) for the icon philosophy foundation, and [Accessibility.md](Accessibility.md) for icon accessibility requirements.*
