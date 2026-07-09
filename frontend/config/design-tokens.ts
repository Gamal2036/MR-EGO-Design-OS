import type {
  ColorScale,
  TypographyToken,
  MotionToken,
  BlurTokens,
  OpacityTokens,
  IconSizeTokens,
  AvatarSizeTokens,
  ButtonSizeTokens,
  InputSizeTokens,
  CardSizeTokens,
  BorderWidthTokens,
  StrokeTokens,
  ZIndexTokens,
  FocusRingTokens,
  OutlineTokens,
  AccessibilityTokens,
  ContainerTokens,
  GridTokens,
  TransitionTokens,
  BorderRadiusTokens,
} from "@/types/design-tokens";

export const COLOR_SCALES: Record<string, ColorScale> = {
  primary: {
    50: "var(--color-primary-50)",
    100: "var(--color-primary-100)",
    200: "var(--color-primary-200)",
    300: "var(--color-primary-300)",
    400: "var(--color-primary-400)",
    500: "var(--color-primary-500)",
    600: "var(--color-primary-600)",
    700: "var(--color-primary-700)",
    800: "var(--color-primary-800)",
    900: "var(--color-primary-900)",
  },
  neutral: {
    50: "var(--color-neutral-50)",
    100: "var(--color-neutral-100)",
    200: "var(--color-neutral-200)",
    300: "var(--color-neutral-300)",
    400: "var(--color-neutral-400)",
    500: "var(--color-neutral-500)",
    600: "var(--color-neutral-600)",
    700: "var(--color-neutral-700)",
    800: "var(--color-neutral-800)",
    900: "var(--color-neutral-900)",
  },
  success: {
    50: "var(--color-success-50)",
    100: "var(--color-success-100)",
    200: "var(--color-success-200)",
    300: "var(--color-success-300)",
    400: "var(--color-success-400)",
    500: "var(--color-success-500)",
    600: "var(--color-success-600)",
    700: "var(--color-success-700)",
    800: "var(--color-success-800)",
    900: "var(--color-success-900)",
  },
  warning: {
    50: "var(--color-warning-50)",
    100: "var(--color-warning-100)",
    200: "var(--color-warning-200)",
    300: "var(--color-warning-300)",
    400: "var(--color-warning-400)",
    500: "var(--color-warning-500)",
    600: "var(--color-warning-600)",
    700: "var(--color-warning-700)",
    800: "var(--color-warning-800)",
    900: "var(--color-warning-900)",
  },
  danger: {
    50: "var(--color-danger-50)",
    100: "var(--color-danger-100)",
    200: "var(--color-danger-200)",
    300: "var(--color-danger-300)",
    400: "var(--color-danger-400)",
    500: "var(--color-danger-500)",
    600: "var(--color-danger-600)",
    700: "var(--color-danger-700)",
    800: "var(--color-danger-800)",
    900: "var(--color-danger-900)",
  },
  info: {
    50: "var(--color-info-50)",
    100: "var(--color-info-100)",
    200: "var(--color-info-200)",
    300: "var(--color-info-300)",
    400: "var(--color-info-400)",
    500: "var(--color-info-500)",
    600: "var(--color-info-600)",
    700: "var(--color-info-700)",
    800: "var(--color-info-800)",
    900: "var(--color-info-900)",
  },
  ai: {
    50: "var(--color-ai-50)",
    100: "var(--color-ai-100)",
    200: "var(--color-ai-200)",
    300: "var(--color-ai-300)",
    400: "var(--color-ai-400)",
    500: "var(--color-ai-500)",
    600: "var(--color-ai-600)",
    700: "var(--color-ai-700)",
    800: "var(--color-ai-800)",
    900: "var(--color-ai-900)",
  },
  job: {
    50: "var(--color-job-50)",
    100: "var(--color-job-100)",
    200: "var(--color-job-200)",
    300: "var(--color-job-300)",
    400: "var(--color-job-400)",
    500: "var(--color-job-500)",
    600: "var(--color-job-600)",
    700: "var(--color-job-700)",
    800: "var(--color-job-800)",
    900: "var(--color-job-900)",
  },
  cv: {
    50: "var(--color-cv-50)",
    100: "var(--color-cv-100)",
    200: "var(--color-cv-200)",
    300: "var(--color-cv-300)",
    400: "var(--color-cv-400)",
    500: "var(--color-cv-500)",
    600: "var(--color-cv-600)",
    700: "var(--color-cv-700)",
    800: "var(--color-cv-800)",
    900: "var(--color-cv-900)",
  },
  analytics: {
    50: "var(--color-analytics-50)",
    100: "var(--color-analytics-100)",
    200: "var(--color-analytics-200)",
    300: "var(--color-analytics-300)",
    400: "var(--color-analytics-400)",
    500: "var(--color-analytics-500)",
    600: "var(--color-analytics-600)",
    700: "var(--color-analytics-700)",
    800: "var(--color-analytics-800)",
    900: "var(--color-analytics-900)",
  },
};

export const SURFACE_COLORS: Record<string, string> = {
  "0": "var(--color-surface-0)",
  "1": "var(--color-surface-1)",
  "2": "var(--color-surface-2)",
  "3": "var(--color-surface-3)",
};

export const TEXT_COLORS: Record<string, string> = {
  primary: "var(--color-text-primary)",
  body: "var(--color-text-body)",
  secondary: "var(--color-text-secondary)",
  tertiary: "var(--color-text-tertiary)",
  disabled: "var(--color-text-disabled)",
  inverse: "var(--color-text-inverse)",
  link: "var(--color-text-link)",
  "link-hover": "var(--color-text-link-hover)",
  success: "var(--color-text-success)",
  warning: "var(--color-text-warning)",
  danger: "var(--color-text-danger)",
};

export const TYPOGRAPHY_TOKENS: Record<string, TypographyToken> = {
  display: { fontSize: "3rem", lineHeight: "1.1", fontWeight: 700, letterSpacing: "-0.02em" },
  h1: { fontSize: "2.25rem", lineHeight: "1.15", fontWeight: 700, letterSpacing: "-0.015em" },
  h2: { fontSize: "1.75rem", lineHeight: "1.2", fontWeight: 650, letterSpacing: "-0.01em" },
  h3: { fontSize: "1.375rem", lineHeight: "1.25", fontWeight: 600, letterSpacing: "-0.005em" },
  h4: { fontSize: "1.125rem", lineHeight: "1.3", fontWeight: 600, letterSpacing: "0em" },
  subtitle: { fontSize: "1rem", lineHeight: "1.4", fontWeight: 500, letterSpacing: "0.005em" },
  "body-large": { fontSize: "1rem", lineHeight: "1.6", fontWeight: 450, letterSpacing: "0.01em" },
  body: { fontSize: "0.9375rem", lineHeight: "1.6", fontWeight: 400, letterSpacing: "0.01em" },
  "body-small": { fontSize: "0.875rem", lineHeight: "1.5", fontWeight: 400, letterSpacing: "0.01em" },
  caption: { fontSize: "0.8125rem", lineHeight: "1.4", fontWeight: 400, letterSpacing: "0.02em" },
  label: { fontSize: "0.875rem", lineHeight: "1.4", fontWeight: 500, letterSpacing: "0.01em" },
  button: { fontSize: "0.875rem", lineHeight: "1", fontWeight: 600, letterSpacing: "0.02em" },
  code: { fontSize: "0.8125rem", lineHeight: "1.5", fontWeight: 400, letterSpacing: "0em" },
  overline: { fontSize: "0.75rem", lineHeight: "1.2", fontWeight: 600, letterSpacing: "0.08em" },
  smallest: { fontSize: "0.6875rem", lineHeight: "1.3", fontWeight: 400, letterSpacing: "0.02em" },
};

export const SPACING_SCALE: Record<string, string> = {
  "0": "var(--space-0)",
  "1": "var(--space-1)",
  "2": "var(--space-2)",
  "3": "var(--space-3)",
  "4": "var(--space-4)",
  "5": "var(--space-5)",
  "6": "var(--space-6)",
  "7": "var(--space-7)",
  "8": "var(--space-8)",
  "9": "var(--space-9)",
  "10": "var(--space-10)",
  "11": "var(--space-11)",
  "12": "var(--space-12)",
  "13": "var(--space-13)",
  "14": "var(--space-14)",
};

export const BORDER_RADIUS: BorderRadiusTokens = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "var(--radius-full)",
};

export const SHADOW_TOKENS: Record<string, string> = {
  "1": "var(--shadow-1)",
  "2": "var(--shadow-2)",
  "3": "var(--shadow-3)",
  "4": "var(--shadow-4)",
  "5": "var(--shadow-5)",
  soft: "var(--shadow-soft)",
  medium: "var(--shadow-medium)",
  strong: "var(--shadow-strong)",
  floating: "var(--shadow-floating)",
  glass: "var(--shadow-glass)",
  "ai-card": "var(--shadow-ai-card)",
  dialog: "var(--shadow-dialog)",
  dropdown: "var(--shadow-dropdown)",
  modal: "var(--shadow-modal)",
  hover: "var(--shadow-hover)",
  focus: "var(--shadow-focus)",
};

export const GLASS_TOKENS = {
  bg: "var(--glass-bg)",
  border: "var(--glass-border)",
  blur: "var(--glass-blur)",
  "blur-sm": "var(--glass-blur-sm)",
  "blur-md": "var(--glass-blur-md)",
  "blur-lg": "var(--glass-blur-lg)",
};

export const BLUR_TOKENS: BlurTokens = {
  none: "var(--blur-none)",
  sm: "var(--blur-sm)",
  md: "var(--blur-md)",
  lg: "var(--blur-lg)",
  xl: "var(--blur-xl)",
  "2xl": "var(--blur-2xl)",
  "3xl": "var(--blur-3xl)",
};

export const OPACITY_TOKENS: OpacityTokens = {
  "0": "var(--opacity-0)",
  "5": "var(--opacity-5)",
  "10": "var(--opacity-10)",
  "15": "var(--opacity-15)",
  "20": "var(--opacity-20)",
  "25": "var(--opacity-25)",
  "30": "var(--opacity-30)",
  "40": "var(--opacity-40)",
  "50": "var(--opacity-50)",
  "60": "var(--opacity-60)",
  "70": "var(--opacity-70)",
  "75": "var(--opacity-75)",
  "80": "var(--opacity-80)",
  "90": "var(--opacity-90)",
  "95": "var(--opacity-95)",
  "100": "var(--opacity-100)",
};

export const ICON_SIZES: IconSizeTokens = {
  xs: "var(--icon-xs)",
  sm: "var(--icon-sm)",
  md: "var(--icon-md)",
  lg: "var(--icon-lg)",
  xl: "var(--icon-xl)",
};

export const AVATAR_SIZES: AvatarSizeTokens = {
  xs: "var(--avatar-xs)",
  sm: "var(--avatar-sm)",
  md: "var(--avatar-md)",
  lg: "var(--avatar-lg)",
  xl: "var(--avatar-xl)",
  "2xl": "var(--avatar-2xl)",
};

export const BUTTON_SIZES: ButtonSizeTokens = {
  xs: "var(--button-xs)",
  sm: "var(--button-sm)",
  md: "var(--button-md)",
  lg: "var(--button-lg)",
  xl: "var(--button-xl)",
};

export const INPUT_SIZES: InputSizeTokens = {
  sm: "var(--input-sm)",
  md: "var(--input-md)",
  lg: "var(--input-lg)",
};

export const CARD_SIZES: CardSizeTokens = {
  sm: "var(--card-sm)",
  md: "var(--card-md)",
  lg: "var(--card-lg)",
};

export const BORDER_WIDTHS: BorderWidthTokens = {
  "0": "0px",
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "8": "8px",
};

export const STROKE_WIDTHS: StrokeTokens = {
  "1": "1px",
  "1-5": "1.5px",
  "2": "2px",
  "3": "3px",
};

export const Z_INDEX: ZIndexTokens = {
  base: "0",
  dropdown: "1000",
  sticky: "1100",
  banner: "1200",
  overlay: "1300",
  modal: "1400",
  popover: "1500",
  "skip-link": "1600",
  toast: "1700",
  tooltip: "1800",
};

export const FOCUS_RING: FocusRingTokens = {
  width: "2px",
  offset: "2px",
  color: {
    default: "var(--border-focus)",
    light: "var(--color-primary-500)",
    dark: "var(--color-primary-400)",
  },
};

export const OUTLINE: OutlineTokens = {
  width: "1px",
  offset: "2px",
  color: {
    default: "var(--border-default)",
    light: "var(--color-neutral-400)",
    dark: "var(--color-neutral-500)",
  },
};

export const ACCESSIBILITY: AccessibilityTokens = {
  "touch-target": "44px",
  "min-contrast": "4.5",
  "motion-reduce-duration": "0.01ms",
};

export const CONTAINER_WIDTHS: ContainerTokens = {
  sm: "100%",
  md: "720px",
  lg: "960px",
  xl: "1140px",
  "2xl": "1440px",
};

export const GRID: GridTokens = {
  columns: "12",
  gap: "var(--grid-gap)",
  "gap-sm": "var(--grid-gap-sm)",
  "gap-md": "var(--grid-gap-md)",
  "gap-lg": "var(--grid-gap-lg)",
};

export const MOTION_TOKENS: MotionToken = {
  duration: {
    instant: "50ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    "x-slow": "500ms",
    "xx-slow": "800ms",
  },
  easing: {
    "ease-out": "cubic-bezier(0.16, 1, 0.3, 1)",
    "ease-in": "cubic-bezier(0.4, 0, 0.68, 0.06)",
    "ease-in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  distance: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
  },
  delay: {
    instant: "0ms",
    fast: "50ms",
    normal: "100ms",
    slow: "200ms",
    "x-slow": "300ms",
  },
};

export const TRANSITION_TOKENS: TransitionTokens = {
  fast: "all var(--duration-fast) var(--easing-ease-out)",
  normal: "all var(--duration-normal) var(--easing-ease-out)",
  slow: "all var(--duration-slow) var(--easing-ease-out)",
};

export const NOTIFICATION_COLORS = {
  info: {
    bg: "var(--color-info-100)",
    border: "var(--color-info-400)",
    text: "var(--color-info-700)",
    icon: "var(--color-info-500)",
  },
  success: {
    bg: "var(--color-success-100)",
    border: "var(--color-success-400)",
    text: "var(--color-success-700)",
    icon: "var(--color-success-500)",
  },
  warning: {
    bg: "var(--color-warning-100)",
    border: "var(--color-warning-400)",
    text: "var(--color-warning-700)",
    icon: "var(--color-warning-500)",
  },
  error: {
    bg: "var(--color-danger-100)",
    border: "var(--color-danger-400)",
    text: "var(--color-danger-700)",
    icon: "var(--color-danger-500)",
  },
  neutral: {
    bg: "var(--color-neutral-100)",
    border: "var(--color-neutral-400)",
    text: "var(--color-neutral-700)",
    icon: "var(--color-neutral-500)",
  },
  ai: {
    bg: "var(--color-ai-100)",
    border: "var(--color-ai-400)",
    text: "var(--color-ai-700)",
    icon: "var(--color-ai-500)",
  },
};
