# Theme Engine

**Phase:** DP-10 (Frontend Blueprint)
**Design Authority:** DP-1 ([Color-System.md](../02-Design-Language/Color-System.md)), DP-5 ([Color-Emotion/](../06-Visual-Foundation/Color-Emotion/)), DP-5 ([Glass/](../06-Visual-Foundation/Glass/))

---

## Purpose

Defines the theme engine — token resolution, theme provider, dark mode, custom themes, high contrast mode, and theme persistence.

---

## Theme Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    THEME ENGINE                           │
├─────────────────────────────────────────────────────────┤
│  Theme Definitions                                       │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐           │
│  │  Light    │  │  Dark     │  │  High     │           │
│  │  Theme    │  │  Theme    │  │  Contrast │           │
│  └───────────┘  └───────────┘  └───────────┘           │
│                                                          │
│  Token Resolution Pipeline                               │
│  Token ID → Theme lookup → Computed value → CSS variable │
│                                                          │
│  Provider Chain                                          │
│  ThemeProvider → TokenProvider → Component               │
└─────────────────────────────────────────────────────────┘
```

---

## Theme Definition

```typescript
// Pseudocode
interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark' | 'high-contrast' | 'custom';
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  elevation: ElevationTokens;
  motion: MotionTokens;
  radius: RadiusTokens;
  shadows: ShadowTokens;
  glass: GlassTokens;
  metadata: ThemeMetadata;
}

interface ColorTokens {
  primary: ColorScale;       // 50-950
  neutral: ColorScale;       // 50-950
  danger: ColorScale;
  warning: ColorScale;
  success: ColorScale;
  info: ColorScale;
  ai: ColorScale;
  surface: SurfaceColors;
  text: TextColors;
  border: BorderColors;
  overlay: OverlayColors;
}

interface ColorScale {
  50: string; 100: string; 200: string; 300: string;
  400: string; 500: string; 600: string; 700: string;
  800: string; 900: string; 950: string;
}
```

---

## Built-in Themes

| Theme | Type | Use Case |
|-------|------|----------|
| Light | light | Default — workspaces, reading |
| Dark | dark | Low-light environments, preference |
| High Contrast Light | high-contrast | Accessibility requirement |
| High Contrast Dark | high-contrast | Accessibility in dark mode |
| OLED Dark | dark | OLED screens, power saving |

---

## Token Resolution Pipeline

```typescript
// Pseudocode
function resolveToken(tokenPath: string, theme: Theme): string {
  // 1. Get raw value from theme
  let value = getTokenValue(tokenPath, theme);
  
  // 2. Apply any active overrides
  if (hasOverride(tokenPath)) {
    value = applyOverride(tokenPath, value);
  }
  
  // 3. Apply high contrast adjustments
  if (theme.type === 'high-contrast') {
    value = applyHighContrast(tokenPath, value);
  }
  
  // 4. Resolve any references
  value = resolveReferences(value, theme);
  
  // 5. Return computed value
  return value;
}
```

### Token Types

| Token Type | Example | Resolved Value |
|------------|---------|----------------|
| Direct | `primary.500` | `#6366F1` |
| Semantic | `text.primary` | `neutral.900` |
| Alias | `button.background` | `primary.500` |
| Computed | `surface.raised` | `lighten(surface.base, 5%)` |
| Responsive | `spacing.padding` | `{ sm: 4, md: 6, lg: 8 }` |

---

## Theme Provider

```typescript
// Pseudocode
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());
  
  // Sync with system preference
  useEffect(() => {
    if (theme.type === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mq.matches ? darkTheme : lightTheme);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme.type]);
  
  // Apply theme to document
  useEffect(() => {
    applyThemeToDocument(theme);
    persistThemePreference(theme.id);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Theme Application

```typescript
// Pseudocode
function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement;
  
  // Set CSS custom properties
  for (const [category, tokens] of Object.entries(theme)) {
    for (const [name, value] of Object.entries(tokens)) {
      root.style.setProperty(`--mr-${category}-${name}`, value);
    }
  }
  
  // Set data attributes
  root.setAttribute('data-theme', theme.id);
  root.setAttribute('data-color-scheme', theme.type === 'dark' ? 'dark' : 'light');
}
```

---

## Theme Switching

### Switch Behaviour

```
User triggers theme switch
     ↓
Transition animation (300ms)
     ↓
CSS variables updated
     ↓
Components re-render with new tokens
     ↓
Preference persisted
     ↓
No flash (prevented by inline script in HTML head)
```

### Cycle Order

```
Light → Dark → System → High Contrast → Light
```

### Transition Animation

```
1. 0ms:    Current theme → desaturate (50ms)
2. 50ms:   Fade to neutral (150ms)
3. 200ms:  Apply new theme tokens
4. 200ms:  Saturate to new theme (100ms)
5. 300ms:  Complete
```

---

## Dark Mode Strategy

| Element | Light Value | Dark Value | Adjustment |
|---------|-------------|------------|------------|
| Surface base | white | neutral.950 | Invert luminance |
| Text primary | neutral.900 | neutral.50 | Invert |
| Card surface | neutral.50 | neutral.900 | Step shift |
| Border | neutral.200 | neutral.700 | Reduce contrast |
| Shadows | Black 10% | Black 40% | Increase opacity |
| Glass blur | 8px @ white | 12px @ dark | Increase clarity |

### Dark Mode Rules

1. No pure black backgrounds (`#000`). Use `neutral.950` instead.
2. Shadows are more visible in dark mode — opacity increased by 2x.
3. Glass effects use less transparency in dark mode (85% vs 70%).
4. AI accent colors maintain vibrancy in both modes.
5. Images and illustrations should invert or have dark variants.

---

## High Contrast Mode

| Adjustment | Rule |
|------------|------|
| Text contrast | Minimum 7:1 (AAA) |
| Border contrast | Minimum 3:1 |
| Interactive elements | Minimum 3:1 from background |
| Focus indicators | 3px solid ring |
| All glass effects | Removed (solid backgrounds) |
| All decorative elements | Removed |
| All shadows | Removed |

---

## Custom Themes (Future)

```typescript
// Pseudocode
interface CustomTheme extends Theme {
  baseTheme: 'light' | 'dark';
  overrides: Partial<ColorTokens>;
  metadata: {
    isUserCreated: true;
    created: Date;
    lastModified: Date;
  };
}
```

Custom theme rules:
1. Must extend light or dark base theme.
2. All token values must pass contrast validation.
3. Custom themes are user-specific and stored in user preferences.
4. Module accent colours can be customised within brand constraints.
5. Custom themes are not available in enterprise deployments (brand consistency).

---

## Related Documents

| Document | Connection |
|----------|------------|
| [Responsive-Engine.md](Responsive-Engine.md) | Theme-aware responsive adjustments |
| [Accessibility-Architecture.md](Accessibility-Architecture.md) | High contrast mode requirements |
| [DP-1 Color System](../02-Design-Language/Color-System.md) | Source colour definitions |

---

## Validation Notes

1. All token resolution is CSS custom property driven — no runtime style recalculations.
2. Theme switching is GPU-accelerated using only `transform` and `opacity`.
3. High contrast mode removes all decorative elements (glass, shadows, gradients).
4. Dark mode maintains WCAG AA minimum contrast across all surfaces.
5. Inline script prevents flash of unstyled content on theme load.
