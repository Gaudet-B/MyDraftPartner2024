"use client";

import { useThemeAtom } from "./atoms";
import { useAtom } from "jotai";
import { useMemo } from "react";
import UserIcon from "../_components/design-system/icons/UserIcon";

/** @TODO import 'fieldIcon' */
const fieldIcon = "";
export function BackgroundLogo() {
  const [themeAtom] = useAtom(useThemeAtom);
  const darkMode = themeAtom === "dark";

  return (
    <div
      className={`absolute h-[472px] w-[700px] translate-y-[120px] overflow-hidden bg-cover opacity-[0.7]`}
      style={{
        backgroundImage: `url(${fieldIcon})`,
        filter: `${darkMode ? "invert(100%)" : ""}`,
      }}
    />
  );
}

export default async function DashBoardContent({
  hasDarkMode,
}: {
  hasDarkMode: boolean;
}) {
  // const [getContentAtom] = useContentAtom();
  // const [_, c] = getContentAtom();
  // const content = c ?? Default();

  // const session = await getServerAuthSession();
  // const hasDarkMode = session?.user.darkMode;

  const [themeAtom] = useAtom(useThemeAtom);
  // const darkMode = useMemo(() => {
  //   const theme = hasDarkMode ? "dark" : "light";
  //   if (themeAtom !== theme) setThemeAtom(theme);
  //   return theme === "dark";
  // }, [hasDarkMode]);

  return (
    /** @TODO THIS IS A PLACEHOLDER AND NEEDS A NEW DESIGN - old one is just an array of enlarged buttons :(  */
    <div className="h-full w-full">
      <h1>Dashboard</h1>
      <div className="flex h-full w-full justify-center">
        {/* <UserIcon />
        <UserIcon isBaller />
        <UserIcon /> */}
      </div>
    </div>
  );
}
