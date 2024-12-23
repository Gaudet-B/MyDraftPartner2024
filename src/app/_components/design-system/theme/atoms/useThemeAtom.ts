import { atom } from "jotai";

// const themeAtom = atom<"light" | "dark">(localStorage.getItem("theme") as "light" | "dark" || "light");
const themeAtom = atom<"light" | "dark">();

const useThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, theme?: "light" | "dark") => {
    if (theme) set(themeAtom, theme);
    else set(themeAtom, get(themeAtom) === "light" ? "dark" : "light");
  },
);

export default useThemeAtom;
