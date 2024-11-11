"use client";

import { PropsWithChildren, useState } from "react";
import { Switch } from "@headlessui/react";

import { useThemeAtom } from "../../dashboard/atoms";
import { useAtom } from "jotai";
import UserIcon from "../design-system/icons/UserIcon";
import Link from "next/link";

/** @TODO this... */
// import burger from '../assets/burger-menu-vector.png'
const burger = "";

function SwitchWrapper({
  handleChange,
  children,
}: PropsWithChildren<{
  handleChange: (e: React.MouseEvent<HTMLDivElement>) => void;
}>) {
  return (
    <div
      className="flex h-6 w-10 flex-row items-center justify-between"
      onClick={(e) => handleChange(e)}
    >
      {children}
    </div>
  );
}

/** @TODO make these into SVGs... */
function LightImg() {
  return (
    <img
      src={"https://cdn-icons-png.flaticon.com/512/1415/1415431.png"}
      // style={{ filter: "invert(100%)" }}
      className={`ml-1`}
      height={16}
      width={16}
    />
  );
}

/** @TODO this might not work... */
function DarkImg() {
  return (
    <img
      src={"https://cdn-icons-png.flaticon.com/512/606/606795.png"}
      className={`mr-1`}
      height={16}
      width={16}
    />
  );
}

function SwitchCircle({ enabled }: { enabled: boolean }) {
  return (
    <span
      className={`${
        enabled ? "translate-x-6 bg-white" : "translate-x-1 bg-black"
      } absolute inline-block h-4 w-4 transform rounded-full`}
    />
  );
}

function SwitchText({ children }: { children: string }) {
  return <span className="sr-only">{children}</span>;
}

function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);
  const [_, setThemeAtom] = useAtom(useThemeAtom);

  // const handleToggle = () => toggle();

  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setEnabled(!enabled);
    setThemeAtom();
  };

  return (
    <SwitchWrapper handleChange={handleChange}>
      <Switch
        defaultChecked={enabled}
        // onChange={handleChange}
        className={`relative z-10 inline-flex h-6 w-11 items-center rounded-full border border-gray-500 ${enabled ? "bg-black" : "bg-white"} hover:border-gray-800 focus:border-gray-800 focus:outline-none`}
        style={{
          boxShadow: `rgb(${
            enabled ? "255 255 255 / 65%" : "0 0 0 / 25%"
          }) 0px 1px 1px 0px`,
        }}
      >
        <LightImg />
        <SwitchText>{"Enable dark mode"}</SwitchText>
        <SwitchCircle enabled={enabled} />
        <DarkImg />
      </Switch>
    </SwitchWrapper>
  );
}

function AccountDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => setShowMenu(!showMenu);
  return (
    <div className="flex h-7 w-7 flex-col">
      <div className="z-10 cursor-pointer" onClick={handleClick}>
        <UserIcon isBaller />
      </div>
      <div
        className={`absolute z-0 -translate-x-14 transition-all delay-75 duration-100 ${showMenu ? "opacity-1 translate-y-6" : "translate-y-0 opacity-0"}`}
      >
        {showMenu && (
          <div className="rounded-lg bg-white p-2 shadow-lg">
            <Link href="/account/settings" className="w-full">
              Settings
            </Link>
            {/* <button className="w-full">Settings</button> */}
            <Link href="/api/auth/logout" className="w-full">
              Logout
            </Link>
            {/* <button className="w-full">Logout</button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export function Navigation({
  expand,
  handleExpandMenu,
  darkMode = false,
}: {
  expand: "expand" | "contract";
  handleExpandMenu: (status: "expand" | "contract") => void;
  darkMode?: boolean;
}) {
  return (
    <div className={`m-2 flex flex-row items-center justify-between p-2`}>
      <button className={`z-20`}>
        <img
          src={
            expand === "expand"
              ? " https://cdn-icons-png.flaticon.com/512/2458/2458523.png"
              : burger
          }
          height={40}
          width={40}
          style={!darkMode ? { filter: "invert(100%)" } : {}}
          onClick={() => handleExpandMenu(expand)}
          className="z-50"
        />
      </button>
      <div className="flex items-center gap-2">
        <AccountDropdown />
        <ThemeToggle />
      </div>
    </div>
  );
}
