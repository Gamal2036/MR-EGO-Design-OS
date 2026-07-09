export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface TypographyToken {
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
}

export interface ShadowToken {
  layer: number;
  value: string;
}

export interface MotionToken {
  duration: Record<string, string>;
  easing: Record<string, string>;
  distance?: Record<string, string>;
  delay?: Record<string, string>;
}

export interface SpacingToken {
  [key: string]: string;
}

export interface GlassToken {
  bg: string;
  border: string;
  blur: string;
}

export interface ThemeModeTokens {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface BorderRadiusTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
}

export interface BlurTokens {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface OpacityTokens {
  0: string;
  5: string;
  10: string;
  15: string;
  20: string;
  25: string;
  30: string;
  40: string;
  50: string;
  60: string;
  70: string;
  75: string;
  80: string;
  90: string;
  95: string;
  100: string;
}

export interface IconSizeTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface AvatarSizeTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface ButtonSizeTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface InputSizeTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface CardSizeTokens {
  sm: string;
  md: string;
  lg: string;
}

export interface BorderWidthTokens {
  0: string;
  1: string;
  2: string;
  4: string;
  8: string;
}

export interface StrokeTokens {
  1: string;
  "1-5": string;
  2: string;
  3: string;
}

export interface ZIndexTokens {
  base: string;
  dropdown: string;
  sticky: string;
  banner: string;
  overlay: string;
  modal: string;
  popover: string;
  "skip-link": string;
  toast: string;
  tooltip: string;
}

export interface FocusRingTokens {
  width: string;
  offset: string;
  color: Record<string, string>;
}

export interface OutlineTokens {
  width: string;
  offset: string;
  color: Record<string, string>;
}

export interface AccessibilityTokens {
  "touch-target": string;
  "min-contrast": string;
  "motion-reduce-duration": string;
}

export interface ContainerTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface GridTokens {
  columns: string;
  gap: string;
  "gap-sm": string;
  "gap-md": string;
  "gap-lg": string;
}

export interface TransitionTokens {
  fast: string;
  normal: string;
  slow: string;
}

export interface NotificationColorTokens {
  info: Record<string, string>;
  success: Record<string, string>;
  warning: Record<string, string>;
  error: Record<string, string>;
  neutral: Record<string, string>;
  ai: Record<string, string>;
}

export interface DesignTokens {
  colors: {
    primary: ColorScale;
    neutral: ColorScale;
    success: ColorScale;
    warning: ColorScale;
    danger: ColorScale;
    info: ColorScale;
    ai: ColorScale;
    job: ColorScale;
    cv: ColorScale;
    analytics: ColorScale;
    surface: Record<string, string>;
    text: Record<string, string>;
    border: Record<string, string>;
    notification: NotificationColorTokens;
    chart: Record<string, string>;
  };
  typography: Record<string, TypographyToken>;
  spacing: SpacingToken;
  radius: BorderRadiusTokens;
  shadows: Record<string, string>;
  glass: GlassToken;
  blur: BlurTokens;
  opacity: OpacityTokens;
  icon: IconSizeTokens;
  avatar: AvatarSizeTokens;
  button: ButtonSizeTokens;
  input: InputSizeTokens;
  card: CardSizeTokens;
  borderWidth: BorderWidthTokens;
  stroke: StrokeTokens;
  zIndex: ZIndexTokens;
  focusRing: FocusRingTokens;
  outline: OutlineTokens;
  accessibility: AccessibilityTokens;
  container: ContainerTokens;
  grid: GridTokens;
  motion: MotionToken;
  transition: TransitionTokens;
}
