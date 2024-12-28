"use client";

import { PropsWithChildren } from "react";
import { useAtom } from "jotai";
import { Button as HeadlessBtn } from "@headlessui/react";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import BUTTON_THEMES from "./themes";

export default function Button({
  children,
  hoverText,
  onClick,
  bold = false,
  disabled = false,
  underline = false,
  additionalClasses = "",
  theme: buttonTheme = "action",
}: PropsWithChildren<{
  hoverText?: string;
  onClick?: () => void;
  // onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  bold?: boolean;
  disabled?: boolean;
  underline?: boolean;
  additionalClasses?: string;
  theme?: keyof typeof BUTTON_THEMES;
}>) {
  const [themeAtom] = useAtom(useThemeAtom);
  const themeClasses = BUTTON_THEMES[buttonTheme][themeAtom ?? "light"];
  const buttonClasses = `${themeClasses} ${disabled ? BUTTON_THEMES["disabled"][themeAtom ?? "light"] : ""} ${additionalClasses ? additionalClasses : ""}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <HeadlessBtn
      className={`cursor-pointer rounded-xl px-2 py-1 ${underline ? "underline" : ""} ${bold ? "font-semibold" : ""} ${buttonClasses}`}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      {children}
    </HeadlessBtn>
  );
}
