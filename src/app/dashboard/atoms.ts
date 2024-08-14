import { atom } from "jotai";

const themeAtom = atom<"light" | "dark">("light");

// export const useThemeAtom = (theme?: "light" | "dark") => {
//   const getThemeAtom = () => useAtomValue(themeAtom);
//   const setThemeAtom = useSetAtom(themeAtom);
//   const toggle = () =>
//     getThemeAtom() === "light" ? setThemeAtom("dark") : "light";

//   if (theme) setThemeAtom(theme);

//   return [getThemeAtom, toggle] as const;
// };

export const useThemeAtom = atom(
  (get) => get(themeAtom),
  (get, set, theme?: "light" | "dark") => {
    if (theme) set(themeAtom, theme);
    else set(themeAtom, get(themeAtom) === "light" ? "dark" : "light");
  },
);

/** @NOTE no longer using this atom, was replaced by standard routes */

// type ContentAtom = readonly [string | null, React.ReactNode];

// const contentAtom = atom<ContentAtom>([null, null]);
// const getContentAtom = () => useAtomValue(contentAtom);
// const setContentAtom = useSetAtom(contentAtom);
// export const useContentAtom = () => [getContentAtom, setContentAtom] as const;
