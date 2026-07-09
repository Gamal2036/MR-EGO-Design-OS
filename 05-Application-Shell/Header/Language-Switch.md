# Language Switch

**Phase:** DP-4 (Application Shell & Workspace Architecture)
**Version:** 1.0
**Status:** FOUNDATION — Permanent
**Design Authority:** DP-3 ([Dropdown.md](../../04-Component-Library/Navigation/Dropdown.md)), DP-0 ([Product-Constitution.md](../../01-Constitution/Product-Constitution.md) — Geographic Scalability)

---

## Purpose

Defines the language switching mechanism — how users change the application locale from the header.

---

## Language Options

| Language | Locale Code | Status |
|----------|-------------|--------|
| English (US) | en-US | Default, always available |
| English (UK) | en-GB | Available |
| Spanish | es | Available |
| French | fr | Available |
| German | de | Available |
| Japanese | ja | Available |
| Chinese (Simplified) | zh-CN | Available |
| Portuguese (Brazil) | pt-BR | Available |

Future languages are added via locale packs without code changes.

---

## Language Switch Behavior

### Header Control
- Icon button (globe icon) or language code label ("EN") in the header
- Click opens a dropdown list of available languages
- Current language is marked with a checkmark
- Language name is displayed in its native form (e.g., "Français")
- Selecting a language immediately applies the locale

### Locale Effects
- All UI text is translated
- Date, time, number, and currency formats follow locale conventions
- Text direction remains LTR (RTL support is future expansion)
- Language preference is persisted in user profile

---

## Language Switch Rules

| Rule | Description |
|------|-------------|
| Persistent | Language preference is stored and applied on every login |
| Immediate | Language change takes effect immediately without page reload |
| Partial coverage | If a translation is missing, English is shown as fallback |
| Accessible | Language switcher is keyboard accessible and screen reader compatible |
| Module translations | Modules provide their own translations in locale packs |

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Header-Architecture.md](Header-Architecture.md) | Language switch placement in header |
| [User-Menu.md](User-Menu.md) | Language also settable in user preferences |

---

*The language switch ensures MR:EGO is accessible to a global audience. It implements the Geographic Scalability principle from the Product Constitution.*
