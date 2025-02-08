"use client";

import { useAtomValue } from "jotai";
import { backgroundColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";

export default function OuterContainer({
  // darkMode,
  children,
}: {
  // darkMode: boolean;
  children: React.ReactNode;
}) {
  const themeAtom = useAtomValue(useThemeAtom);

  return (
    <div
      className={`flex w-full flex-col justify-stretch gap-2 rounded-lg p-2 ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      {children}
    </div>
  );
}
