const LINK_THEMES = {
  light: "text-sky-400",
  dark: "text-sky-950",
  standard: "text-sky-800 font-semibold",
} as const;

export default LINK_THEMES;

export type LinkTheme = keyof typeof LINK_THEMES;
