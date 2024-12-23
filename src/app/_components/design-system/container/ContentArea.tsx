"use client";

import { PropsWithChildren, useEffect, useMemo } from "react";
import { backgroundColors } from "@designsystem/colors";
import transition from "@designsystem/class-names/transition";
import { useAtom } from "jotai";
import useThemeAtom from "../theme/atoms/useThemeAtom";
import useThemeEffect from "../theme/hooks/useThemeEffect";

export default function ContentArea({
  children,
  hasDarkMode = false,
}: PropsWithChildren<{ hasDarkMode?: boolean }>) {
  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  useThemeEffect(hasDarkMode, themeAtom, setThemeAtom);

  return (
    <div
      className={`flex h-full w-full grow flex-col items-center p-6 ${transition.standard} ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      {children}
    </div>
  );
}
