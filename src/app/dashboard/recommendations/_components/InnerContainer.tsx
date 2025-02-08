"use client";

import { useAtomValue } from "jotai";
import { backgroundColors, textColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";

export default function InnerContainer({
  // darkMode,
  label,
  content,
}: {
  // darkMode: boolean;
  label: React.ReactNode;
  content: React.ReactNode;
}) {
  const themeAtom = useAtomValue(useThemeAtom);

  return (
    <div className="flex grow items-stretch gap-2 text-start font-semibold">
      <div
        className={`col-span-8 rounded-md px-2 py-1 text-start ${themeAtom === "dark" ? `${backgroundColors.darkAccent} ${textColors.lightSecondary}` : `${backgroundColors.lightAccent} ${textColors.darkSecondary}`}`}
      >
        {label}
      </div>
      <div
        className={`col-span-8 grow rounded-md px-2 py-1 text-start ${themeAtom === "dark" ? backgroundColors.darkTertiary : backgroundColors.lightTertiary}`}
      >
        {content}
      </div>
    </div>
  );
}
