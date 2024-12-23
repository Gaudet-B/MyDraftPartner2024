"use client";

import { PropsWithChildren, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button as HeadlessBtn } from "@headlessui/react";
import { useAtom } from "jotai";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import {
  backgroundColors,
  borderColors,
  buttonColors,
} from "@designsystem/colors";
import transition from "@designsystem/class-names/transition";
import {
  HamburgerIcon,
  LineGoUpIcon,
  RobotIcon,
  SettingsIcon,
  UsersIcon,
} from "@designsystem/icons";

export const BUTTON_MAP = {
  RECOMMENDATIONS: RobotIcon,
  TEAMS: UsersIcon,
  ANALYSIS: LineGoUpIcon,
  SETTINGS: SettingsIcon,
} as const;

export const BUTTONS = Object.keys(BUTTON_MAP) as Array<
  keyof typeof BUTTON_MAP
>;

function ExpandMenuButton({
  expand,
  handleExpandMenu,
  darkMode,
}: {
  expand: "expand" | "contract";
  handleExpandMenu: (status: "expand" | "contract") => void;
  darkMode: boolean;
}) {
  return (
    <HeadlessBtn
      className={`absolute z-50 flex w-16 -translate-y-14 items-center justify-center pl-1`}
      onClick={() => handleExpandMenu(expand)}
    >
      {expand === "expand" ? (
        <img
          data-testid="hamburger-icon"
          src={"https://cdn-icons-png.flaticon.com/512/2458/2458523.png"}
          height={40}
          width={40}
          className={`${transition.standard}`}
          style={darkMode ? { filter: "invert(100%)" } : {}}
        />
      ) : (
        <div className="h-10 w-10" data-testid="hamburger-icon">
          <HamburgerIcon />
        </div>
      )}
    </HeadlessBtn>
  );
}

function ButtonWrapper({
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

function ButtonContainer({
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
    <div
      className={`flex flex-row gap-3 p-3 ${transition.standard} ${expand ? "w-full" : "w-[66px]"} items-center overflow-hidden rounded-lg border text-lg font-bold tracking-wider ${darkMode ? backgroundColors.darkTertiary : backgroundColors.lightTertiary} ${display && darkMode ? buttonColors.dark : display ? buttonColors.light : ""} ${darkMode ? borderColors.lightTertiary : borderColors.darkTertiary} ${darkMode ? buttonColors.hover.dark : buttonColors.hover.light}`}
    >
      {children}
    </div>
  );
}

function ButtonImage({
  button,
  darkMode = false,
}: {
  button: keyof typeof BUTTON_MAP;
  darkMode?: boolean;
}) {
  const SVGIcon = BUTTON_MAP[button];
  return (
    <div
      className={`h-10 w-10`}
      style={darkMode ? { filter: "invert(100%)" } : {}}
    >
      <SVGIcon dimensions={{ h: 40, w: 40 }} />
    </div>
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
    <ButtonWrapper text={text}>
      <ButtonContainer
        darkMode={darkMode}
        display={text === displayContent}
        expand={expand}
      >
        <ButtonImage button={text} darkMode={darkMode} />
        <ButtonText expand={expand}>{text}</ButtonText>
      </ButtonContainer>
    </ButtonWrapper>
  );
}

function SidebarContainer({
  children,
  expand,
  darkMode = false,
}: PropsWithChildren<{
  darkMode?: boolean;
  expand: "expand" | "contract";
}>) {
  return (
    <div className="absolute z-20 h-full pt-[59px]">
      <div
        className={`flex h-full flex-col items-stretch justify-start gap-5 p-1 pt-2 ${transition.standard} ${expand === "expand" ? "w-[290px]" : "w-[76px]"} ${darkMode ? backgroundColors.dark : backgroundColors.light}`}
        style={{
          boxShadow: `${
            darkMode
              ? "3px 4px 5px rgba(0, 0, 0, 0.9)"
              : "3px 4px 5px rgba(0, 0, 0, 0.3)"
          }`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function ButtonsContainer({ children }: PropsWithChildren<{}>) {
  return (
    <div className={`flex flex-col items-stretch justify-start gap-2`}>
      {children}
    </div>
  );
}

export function DashboardSidebar() {
  const [expand, setExpand] = useState<"expand" | "contract">("contract");
  const [show, setShow] = useState<boolean>(false);

  const [themeAtom] = useAtom(useThemeAtom);
  const darkMode = themeAtom === "dark";

  const handleExpandMenu = (status: "expand" | "contract") => {
    const newStatus = status === "expand" ? "contract" : "expand";
    setExpand(newStatus);
    if (newStatus === "expand") setShow(true);
    else setTimeout(() => setShow(false), 500);
  };

  return (
    <>
      <SidebarContainer darkMode={darkMode} expand={expand}>
        {expand ? (
          <ExpandMenuButton
            darkMode={darkMode}
            expand={expand}
            handleExpandMenu={handleExpandMenu}
          />
        ) : (
          <div className="h-6 w-6 opacity-0" />
        )}
        <ButtonsContainer>
          {BUTTONS.map((button, idx) => {
            return (
              <SidebarButton
                key={`sidebar-button-${idx}-${button}`}
                darkMode={darkMode}
                text={button}
                expand={expand === "expand"}
                show={show}
              />
            );
          })}
        </ButtonsContainer>
      </SidebarContainer>
    </>
  );
}
