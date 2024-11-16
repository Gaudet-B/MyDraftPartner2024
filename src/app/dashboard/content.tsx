"use client";

import { useThemeAtom } from "./atoms";
import { useAtom } from "jotai";
// import H1 from "@designsystem/typography/H1";
import background from "@designsystem/colors/background";
import transition from "@designsystem/class-names/transition";

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

export default function DashBoardContent({
  hasDarkMode,
}: {
  hasDarkMode: boolean;
}) {
  const [themeAtom] = useAtom(useThemeAtom);

  return (
    /** @TODO THIS IS A PLACEHOLDER AND NEEDS A NEW DESIGN - old one is just an array of enlarged buttons :(  */
    <div
      className={`h-full w-full grow ${transition.standard} ${themeAtom === "dark" ? background.darkSecondary : background.lightSecondary}`}
    />
  );
}
