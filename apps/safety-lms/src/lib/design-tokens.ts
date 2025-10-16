/**
 * SpecChem Safety LMS Design Tokens
 * Based on SpecChem Brand Guidelines
 */

// =============================================================================
// COLOR TOKENS
// =============================================================================

export const colors = {
  // Primary Brand Colors
  primary: {
    blue: {
      50: "#E6F2FF",
      100: "#CCE5FF",
      200: "#99CCFF",
      300: "#66B3FF",
      400: "#3399FF",
      500: "#013A81", // SpecChem Blue
      600: "#012E68",
      700: "#01224F",
      800: "#011636",
      900: "#000A1D",
    },
    yellow: {
      50: "#FFFBF0",
      100: "#FFF7E0",
      200: "#FFEFC1",
      300: "#FFE782",
      400: "#FFDF43",
      500: "#DEB408", // SpecChem Yellow
      600: "#C2A007",
      700: "#A68C06",
      800: "#8A7805",
      900: "#6E6404",
    },
  },

  // Secondary Brand Colors
  secondary: {
    darkBlue: {
      50: "#E6E7F0",
      100: "#CCCFE1",
      200: "#999FC3",
      300: "#666FA5",
      400: "#333F87",
      500: "#020747", // Dark Blue
      600: "#02063A",
      700: "#01052D",
      800: "#010420",
      900: "#000313",
    },
    coolGrey: {
      50: "#F5F5F5",
      100: "#EBEBEB",
      200: "#D7D7D7",
      300: "#C3C3C3",
      400: "#AFAFAF",
      500: "#8D8A88", // Cool Grey
      600: "#716E6C",
      700: "#555250",
      800: "#393634",
      900: "#1D1A18",
    },
  },

  // Semantic Colors
  semantic: {
    success: {
      50: "#F0FDF4",
      100: "#DCFCE7",
      200: "#BBF7D0",
      300: "#86EFAC",
      400: "#4ADE80",
      500: "#22C55E",
      600: "#16A34A",
      700: "#15803D",
      800: "#166534",
      900: "#14532D",
    },
    warning: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },
    error: {
      50: "#FEF2F2",
      100: "#FEE2E2",
      200: "#FECACA",
      300: "#FCA5A5",
      400: "#F87171",
      500: "#EF4444",
      600: "#DC2626",
      700: "#B91C1C",
      800: "#991B1B",
      900: "#7F1D1D",
    },
    info: {
      50: "#EFF6FF",
      100: "#DBEAFE",
      200: "#BFDBFE",
      300: "#93C5FD",
      400: "#60A5FA",
      500: "#3B82F6",
      600: "#2563EB",
      700: "#1D4ED8",
      800: "#1E40AF",
      900: "#1E3A8A",
    },
  },

  // Neutral Colors
  neutral: {
    0: "#FFFFFF",
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#E5E5E5",
    300: "#D4D4D4",
    400: "#A3A3A3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0A0A0A",
    1000: "#000000",
  },
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const typography = {
  fontFamily: {
    primary: ["Futura PT", "system-ui", "sans-serif"],
    secondary: ["AdelleSans", "system-ui", "sans-serif"],
    mono: ["SF Mono", "Monaco", "Inconsolata", "Roboto Mono", "monospace"],
  },

  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem" }], // 12px
    sm: ["0.875rem", { lineHeight: "1.25rem" }], // 14px
    base: ["1rem", { lineHeight: "1.5rem" }], // 16px
    lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18px
    xl: ["1.25rem", { lineHeight: "1.75rem" }], // 20px
    "2xl": ["1.5rem", { lineHeight: "2rem" }], // 24px
    "3xl": ["1.875rem", { lineHeight: "2.25rem" }], // 30px
    "4xl": ["2.25rem", { lineHeight: "2.5rem" }], // 36px
    "5xl": ["3rem", { lineHeight: "1" }], // 48px
    "6xl": ["3.75rem", { lineHeight: "1" }], // 60px
    "7xl": ["4.5rem", { lineHeight: "1" }], // 72px
    "8xl": ["6rem", { lineHeight: "1" }], // 96px
    "9xl": ["8rem", { lineHeight: "1" }], // 128px
  },

  fontWeight: {
    thin: "100",
    extralight: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  },

  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0em",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  lineHeight: {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

// Base spacing scale following 8px grid system
export const spacing = {
  // Micro spacing (2px increments)
  px: "1px", // 1px
  0.5: "0.125rem", // 2px

  // Small spacing (4px increments)
  1: "0.25rem", // 4px
  1.5: "0.375rem", // 6px
  2: "0.5rem", // 8px
  2.5: "0.625rem", // 10px
  3: "0.75rem", // 12px
  3.5: "0.875rem", // 14px

  // Medium spacing (8px increments)
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  7: "1.75rem", // 28px
  8: "2rem", // 32px
  9: "2.25rem", // 36px
  10: "2.5rem", // 40px
  11: "2.75rem", // 44px
  12: "3rem", // 48px

  // Large spacing (16px increments)
  14: "3.5rem", // 56px
  16: "4rem", // 64px
  18: "4.5rem", // 72px
  20: "5rem", // 80px
  24: "6rem", // 96px
  28: "7rem", // 112px
  32: "8rem", // 128px
  36: "9rem", // 144px
  40: "10rem", // 160px
  44: "11rem", // 176px
  48: "12rem", // 192px

  // Extra large spacing (32px increments)
  52: "13rem", // 208px
  56: "14rem", // 224px
  60: "15rem", // 240px
  64: "16rem", // 256px
  72: "18rem", // 288px
  80: "20rem", // 320px
  96: "24rem", // 384px
} as const;

// Semantic spacing tokens for consistent layouts
export const layoutSpacing = {
  // Component internal spacing
  component: {
    tight: spacing[2], // 8px - for closely related elements
    normal: spacing[4], // 16px - standard component spacing
    relaxed: spacing[6], // 24px - for sections within components
    loose: spacing[8], // 32px - for major component sections
  },

  // Section spacing (between major sections)
  section: {
    tight: spacing[8], // 32px - for related sections
    normal: spacing[12], // 48px - standard section spacing
    relaxed: spacing[16], // 64px - for distinct sections
    loose: spacing[24], // 96px - for major page sections
  },

  // Container spacing
  container: {
    padding: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
    margin: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
  },

  // Grid spacing
  grid: {
    gap: {
      tight: spacing[2], // 8px
      normal: spacing[4], // 16px
      relaxed: spacing[6], // 24px
      loose: spacing[8], // 32px
    },
  },

  // Navigation spacing
  navigation: {
    item: {
      padding: spacing[3], // 12px
      gap: spacing[2], // 8px
    },
    group: {
      gap: spacing[1], // 4px
    },
    section: {
      gap: spacing[6], // 24px
    },
  },
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  none: "0px",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "3xl": "1.5rem", // 24px
  full: "9999px",
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
} as const;

// =============================================================================
// BREAKPOINT TOKENS
// =============================================================================

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const zIndex = {
  hide: -1,
  auto: "auto",
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// =============================================================================
// COMPONENT TOKENS
// =============================================================================

export const componentTokens = {
  // Button tokens
  button: {
    height: {
      sm: "2rem", // 32px
      md: "2.5rem", // 40px
      lg: "3rem", // 48px
      xl: "3.5rem", // 56px
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`, // 8px 12px
      md: `${spacing[3]} ${spacing[4]}`, // 12px 16px
      lg: `${spacing[4]} ${spacing[6]}`, // 16px 24px
      xl: `${spacing[5]} ${spacing[8]}`, // 20px 32px
    },
    gap: spacing[2], // 8px
  },

  // Card tokens
  card: {
    padding: {
      sm: spacing[4], // 16px
      md: spacing[6], // 24px
      lg: spacing[8], // 32px
    },
    gap: spacing[4], // 16px
    borderRadius: borderRadius.lg, // 8px
  },

  // Input tokens
  input: {
    height: {
      sm: "2rem", // 32px
      md: "2.5rem", // 40px
      lg: "3rem", // 48px
    },
    padding: {
      sm: `${spacing[2]} ${spacing[3]}`, // 8px 12px
      md: `${spacing[3]} ${spacing[4]}`, // 12px 16px
      lg: `${spacing[4]} ${spacing[5]}`, // 16px 20px
    },
  },

  // Navigation tokens
  navigation: {
    height: {
      mobile: "3.5rem", // 56px
      desktop: "4rem", // 64px
    },
    itemHeight: "2.5rem", // 40px
    itemPadding: `${spacing[2]} ${spacing[3]}`, // 8px 12px
    sidebar: {
      width: "16rem", // 256px
      collapsedWidth: "4rem", // 64px
    },
  },

  // Content tokens
  content: {
    maxWidth: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    padding: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
  },
} as const;

// =============================================================================
// LAYOUT TOKENS
// =============================================================================

export const layoutTokens = {
  // Container tokens
  container: {
    maxWidth: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    padding: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
    margin: {
      mobile: spacing[4], // 16px
      tablet: spacing[6], // 24px
      desktop: spacing[8], // 32px
    },
  },

  // Grid tokens
  grid: {
    columns: {
      1: "repeat(1, minmax(0, 1fr))",
      2: "repeat(2, minmax(0, 1fr))",
      3: "repeat(3, minmax(0, 1fr))",
      4: "repeat(4, minmax(0, 1fr))",
      6: "repeat(6, minmax(0, 1fr))",
      12: "repeat(12, minmax(0, 1fr))",
    },
    gap: {
      none: spacing[0],
      tight: spacing[2], // 8px
      normal: spacing[4], // 16px
      relaxed: spacing[6], // 24px
      loose: spacing[8], // 32px
    },
  },

  // Stack tokens (vertical spacing)
  stack: {
    gap: {
      none: spacing[0],
      tight: spacing[1], // 4px
      normal: spacing[2], // 8px
      relaxed: spacing[4], // 16px
      loose: spacing[6], // 24px
    },
  },

  // Inline tokens (horizontal spacing)
  inline: {
    gap: {
      none: spacing[0],
      tight: spacing[1], // 4px
      normal: spacing[2], // 8px
      relaxed: spacing[3], // 12px
      loose: spacing[4], // 16px
    },
  },
} as const;

// =============================================================================
// MOTION TOKENS
// =============================================================================

export const motionTokens = {
  duration: {
    instant: "0ms",
    fast: "100ms",
    normal: "200ms",
    slow: "300ms",
    slower: "500ms",
    slowest: "700ms",
  },

  easing: {
    linear: "linear",
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },

  // Common animation presets
  presets: {
    fadeIn: {
      duration: "200ms",
      easing: "ease-out",
    },
    slideIn: {
      duration: "300ms",
      easing: "ease-out",
    },
    scaleIn: {
      duration: "200ms",
      easing: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    },
    bounceIn: {
      duration: "500ms",
      easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    },
  },
} as const;

// =============================================================================
// THEME TOKENS
// =============================================================================

export const theme = {
  light: {
    background: {
      primary: colors.neutral[0],
      secondary: colors.neutral[50],
      tertiary: colors.neutral[100],
      accent: colors.primary.blue[50],
    },
    foreground: {
      primary: colors.neutral[900],
      secondary: colors.neutral[700],
      tertiary: colors.neutral[500],
      accent: colors.primary.blue[500],
    },
    border: {
      primary: colors.neutral[200],
      secondary: colors.neutral[300],
      accent: colors.primary.blue[200],
    },
    surface: {
      primary: colors.neutral[0],
      secondary: colors.neutral[50],
      elevated: colors.neutral[100],
    },
  },

  dark: {
    background: {
      primary: colors.neutral[950],
      secondary: colors.neutral[900],
      tertiary: colors.neutral[800],
      accent: colors.primary.blue[900],
    },
    foreground: {
      primary: colors.neutral[50],
      secondary: colors.neutral[300],
      tertiary: colors.neutral[500],
      accent: colors.primary.blue[300],
    },
    border: {
      primary: colors.neutral[800],
      secondary: colors.neutral[700],
      accent: colors.primary.blue[700],
    },
    surface: {
      primary: colors.neutral[950],
      secondary: colors.neutral[900],
      elevated: colors.neutral[800],
    },
  },
} as const;
