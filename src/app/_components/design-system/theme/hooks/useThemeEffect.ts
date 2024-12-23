import { useEffect, useMemo } from "react";

const useThemeEffect = (
  hasDarkMode: boolean,
  themeAtom: "dark" | "light" | undefined,
  setThemeAtom: (t: "dark" | "light") => void,
) => {
  useEffect(() => {
    if (!themeAtom) {
      const darkMode = hasDarkMode ? "dark" : "light";
      if (themeAtom !== darkMode) {
        setThemeAtom(darkMode);
      }
    }
  }, [hasDarkMode]);
};

export default useThemeEffect;
