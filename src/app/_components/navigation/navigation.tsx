"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import { Button as HeadlessBtn } from "@headlessui/react";
import UserIcon from "../design-system/icons/UserIcon";
import HamburgerIcon from "../design-system/icons/HamburgerIcon";
import ThemeToggle from "../design-system/button/ThemeToggle";
import { useThemeAtom } from "~/app/dashboard/atoms";
import transition from "@designsystem/class-names/transition";

function AccountDropdown({ darkMode }: { darkMode: boolean }) {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => setShowMenu(!showMenu);
  return (
    <div className="flex h-7 w-7 flex-col">
      <div className="z-10 cursor-pointer" onClick={handleClick}>
        <UserIcon isBaller />
      </div>
      <div
        className={`absolute z-0 -translate-x-14 transition-all delay-75 duration-100 ${showMenu ? "opacity-1 translate-y-7" : "translate-y-0 opacity-0"}`}
      >
        {showMenu && (
          <div
            className={`rounded-lg p-2 shadow-lg ${darkMode ? "bg-gray-900 text-gray-100 shadow-gray-900" : "bg-white text-black"}`}
          >
            <div className="flex flex-col gap-1 p-2">
              <Link href="/account" className="flex w-full justify-end">
                Settings
              </Link>
              {/* <button className="w-full">Settings</button> */}
              <Link href="/api/auth/logout" className="flex w-full justify-end">
                Logout
              </Link>
              {/* <button className="w-full">Logout</button> */}
            </div>
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
  expand?: "expand" | "contract";
  handleExpandMenu?: (status: "expand" | "contract") => void;
  darkMode?: boolean;
}) {
  const [themeAtom] = useAtom(useThemeAtom);
  return (
    <div
      className={`flex flex-row items-center justify-between p-4 shadow-lg ${transition.standard} ${themeAtom === "dark" ? "bg-gray-900" : "bg-white"}`}
    >
      {handleExpandMenu && expand ? (
        <HeadlessBtn
          className={`z-50 flex w-14 items-center justify-center pr-3`}
          onClick={() => handleExpandMenu(expand)}
        >
          {expand === "expand" ? (
            <img
              src={"https://cdn-icons-png.flaticon.com/512/2458/2458523.png"}
              height={40}
              width={40}
              style={!darkMode ? { filter: "invert(100%)" } : {}}
              // className="z-50"
            />
          ) : (
            <div className="h-10 w-10">
              <HamburgerIcon />
            </div>
          )}
        </HeadlessBtn>
      ) : (
        <div className="h-6 w-6 opacity-0" />
      )}
      <div className="flex items-center gap-2">
        <AccountDropdown darkMode={themeAtom === "dark"} />
        <ThemeToggle />
      </div>
    </div>
  );
}
