"use client";

// import ContentContainer from "@designsystem/container/ContentContainer";
import { getServerAuthSession } from "~/server/auth";
import { useThemeAtom } from "./atoms";
import { useAtom } from "jotai";
import { useMemo } from "react";

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

  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  const darkMode = useMemo(() => {
    const theme = hasDarkMode ? "dark" : "light";
    if (themeAtom !== theme) setThemeAtom(theme);
    return theme === "dark";
  }, [hasDarkMode]);

  return (
    /** @TODO THIS IS A PLACEHOLDER AND NEEDS A NEW DESIGN - old one is just an array of enlarged buttons :(  */
    <div>
      <h1>Dashboard</h1>
    </div>
  );

  // return <ContentContainer children={content} darkMode={darkMode} />;
}
