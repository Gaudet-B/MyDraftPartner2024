"use client";

import { PropsWithChildren, useState } from "react";
import { useThemeAtom } from "./atoms";
import { Navigation } from "@components/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useAtom } from "jotai";

/** @TODO ADD CONTENT HERE */
const BUTTON_MAP = {
  RECOMMENDATIONS: "",
  TEAMS: "",
  ANALYSIS: "",
  SETTINGS: "",
} as const;

function ButtonContainer({
  children,
  text,
}: PropsWithChildren<{ text: keyof typeof BUTTON_MAP }>) {
  return (
    <Link href={`/dashboard/${text.toLowerCase()}`}>
      <div className={`flex flex-col items-stretch overflow-hidden`}>
        {children}
      </div>
    </Link>
  );
}

/** @TODO change name of this component */
function Button({
  children,
  expand,
  display,
  darkMode,
}: PropsWithChildren<{
  expand?: boolean;
  display?: boolean;
  darkMode?: boolean;
}>) {
  return (
    <button
      className={`mt-1 flex flex-row gap-3 p-3 transition-all delay-75 duration-200 ease-in ${expand ? "w-full" : "w-[68px]"} items-center overflow-hidden rounded-lg border text-lg font-bold tracking-wider ${darkMode ? "bg-gray-800" : "bg-gray-200"} ${display && darkMode ? "bg-sky-900" : display ? "bg-sky-100" : ""} ${darkMode ? "border-gray-100" : "border-gray-700"} ${darkMode ? "hover:bg-sky-800" : "hover:bg-sky-100"}`}
    >
      {children}
    </button>
  );
}

function ButtonImage({
  button,
  darkMode = false,
}: {
  button: keyof typeof BUTTON_MAP;
  darkMode?: boolean;
}) {
  return (
    <img
      src={BUTTON_MAP[button]}
      height={35}
      width={35}
      className={`mx-1`}
      style={darkMode ? { filter: "invert(100%)" } : {}}
    />
  );
}

function ButtonText({
  children,
  expand,
}: PropsWithChildren<{ expand?: boolean }>) {
  return (
    <div className={`flex w-full justify-start overflow-hidden`}>
      <span className={`hover:underline`}>{children}</span>
    </div>
  );
}

function SidebarButton({
  darkMode,
  text,
  expand,
  show,
}: {
  darkMode: boolean;
  text: keyof typeof BUTTON_MAP;
  expand?: boolean;
  show?: boolean;
}) {
  const path = usePathname().split("/");
  const displayContent = path[
    path.length - 1
  ]?.toUpperCase() as keyof typeof BUTTON_MAP;
  return (
    <ButtonContainer text={text}>
      <Button
        darkMode={darkMode}
        display={text === displayContent}
        expand={expand}
      >
        <ButtonImage button={text} darkMode={darkMode} />
        {/* <ButtonText>{show ? text : null}</ButtonText> */}
        <ButtonText expand={expand}>{text}</ButtonText>
      </Button>
    </ButtonContainer>
  );
}

const SidebarContainer = ({
  children,
  expand,
  darkMode = false,
}: PropsWithChildren<{
  darkMode?: boolean;
  expand: "expand" | "contract";
}>) => {
  return (
    <div
      /** @TODO what's up with 'expand' class??? */
      /** @TODO what's up with 'backgroundColor' class? */
      /** @TODO grab styles from 'dashboard-sidebar' class */
      className={`absolute top-0 z-20 flex h-full min-h-screen flex-col items-stretch justify-start p-1 pt-[80px] transition-all delay-75 duration-200 ease-in ${expand === "expand" ? "w-[290px]" : "w-[76px]"} ${darkMode ? "bg-gray-600" : "bg-gray-300"} dashboard-sidebar`}
      style={{
        boxShadow: `${
          darkMode
            ? "3px 1px 5px rgba(0, 0, 0, 0.9)"
            : "3px 1px 5px rgba(0, 0, 0, 0.3)"
        }`,
      }}
    >
      {children}
    </div>
  );
};

export function DashboardSidebar() {
  const [expand, setExpand] = useState<"expand" | "contract">("contract");
  const [show, setShow] = useState<boolean>(false);

  const [themeAtom] = useAtom(useThemeAtom);
  const darkMode = themeAtom === "dark";

  const buttons = Object.keys(BUTTON_MAP) as (keyof typeof BUTTON_MAP)[];

  const handleExpandMenu = (status: "expand" | "contract") => {
    const newStatus = status === "expand" ? "contract" : "expand";
    setExpand(newStatus);
    if (newStatus === "expand") setShow(true);
    else setTimeout(() => setShow(false), 500);
  };

  return (
    <>
      <Navigation
        expand={expand}
        handleExpandMenu={handleExpandMenu}
        darkMode={darkMode}
      />
      <SidebarContainer darkMode={darkMode} expand={expand}>
        {buttons.map((button) => {
          return (
            <SidebarButton
              darkMode={darkMode}
              text={button}
              expand={expand === "expand"}
              show={show}
            />
          );
        })}
      </SidebarContainer>
    </>
  );
}
