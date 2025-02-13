"use client";

import { useState } from "react";
import { useAtom } from "jotai";
import Link from "next/link";
import { UserIcon } from "@designsystem/icons";
import { backgroundColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import transition from "@designsystem/class-names/transition";
import ThemeToggle from "./ThemeToggle";

function AccountDropdown({ darkMode }: { darkMode: boolean }) {
  const [showMenu, setShowMenu] = useState(false);
  const handleClick = () => setShowMenu(!showMenu);
  return (
    <div className="flex h-7 w-7 flex-col">
      <div className="cursor-pointer" onClick={handleClick}>
        <UserIcon isBaller />
      </div>
      {/** @TODO give this transition a name and move it to 'designsystem/class-names' */}
      <div
        className={`absolute -translate-x-14 transition-all delay-75 duration-100 ${showMenu ? "opacity-1 translate-y-7" : "translate-y-0 opacity-0"}`}
      >
        {showMenu && (
          <div
            className={`rounded-lg p-2 shadow-lg ${transition.standard} ${darkMode ? backgroundColors.dark + " bg-gray-900 text-gray-100 shadow-gray-900" : backgroundColors.light + " bg-white text-black"}`}
          >
            <div className="flex flex-col gap-1 p-2">
              <Link href="/account" className="flex w-full justify-end">
                Settings
              </Link>
              <Link href="/api/auth/logout" className="flex w-full justify-end">
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [themeAtom] = useAtom(useThemeAtom);
  return (
    <div
      className={`z-20 flex flex-row items-center justify-end p-4 shadow-md ${transition.standard} ${themeAtom === "dark" ? backgroundColors.dark + " shadow-black" : backgroundColors.light}`}
    >
      <div className="flex items-center gap-2">
        <AccountDropdown darkMode={themeAtom === "dark"} />
        <ThemeToggle />
      </div>
    </div>
  );
}
