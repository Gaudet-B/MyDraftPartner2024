"use client";

import { PropsWithChildren, useState } from "react";
import { Switch } from "@headlessui/react";

import { useThemeAtom } from "../../dashboard/atoms";
import { useAtom } from "jotai";

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
      className="flex flex-row items-center justify-between"
      onClick={(e) => handleChange(e)}
    >
      {children}
    </div>
  );
}

function LightImg() {
  return (
    <img
      src={"https://cdn-icons-png.flaticon.com/512/1415/1415431.png"}
      style={{ filter: "invert(100%)" }}
      className={`ml-1`}
      height={16}
      width={16}
    />
  );
}

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
        className={`relative z-10 inline-flex h-6 w-11 items-center justify-between rounded-full border border-gray-500 ${enabled ? "bg-black" : "bg-white"} hover:border-gray-800 focus:border-gray-800 focus:outline-none`}
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
    <div className={`z-50 m-2 flex flex-row items-center justify-between p-2`}>
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
        />
      </button>
      <ThemeToggle />
    </div>
  );
}
