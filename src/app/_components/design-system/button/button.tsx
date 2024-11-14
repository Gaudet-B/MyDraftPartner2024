"use client";

import { PropsWithChildren } from "react";
import { Button as HeadlessBtn } from "@headlessui/react";
import { useAtom } from "jotai";
import { useThemeAtom } from "~/app/dashboard/atoms";

const BUTTON_THEMES = {
  action: {
    light:
      "bg-sky-100 bg-opacity-80 hover:bg-opacity-100 text-sky-900 border border-sky-900",
    dark: "bg-sky-900 hover:bg-sky-800 text-sky-100 border border-gray-400",
  },
  "action-lg": {
    light:
      "bg-sky-100 bg-opacity-80 hover:bg-opacity-100 text-sky-900 border-2 border-sky-900 font-semibold px-3 py-2",
    dark: "bg-sky-900 hover:bg-sky-800 text-sky-100 border-2 border-gray-400 font-semibold px-3 py-2",
  },
  "action-lt": {
    light:
      "pt-[2px] text-sky-400 bg-gray-200 hover:bg-gray-100 border-2 border-sky-300 hover:border-sky-200",
    dark: "pt-[2px] text-sky-600 bg-gray-900 hover:bg-gray-800 border-2 border-sky-900 hover:border-sky-800",
  },
  "modal-close": {
    light: "font-semibold hover:bg-sky-100",
    dark: "font-semibold text-gray-200 hover:bg-gray-700",
  },
  "nav-burger": {
    light: "z-20",
    dark: "z-20",
  },
  pagination: {
    light: "rounded-full py-1 px-3 hover:bg-gray-400 hover:text-white",
    dark: "rounded-full py-1 px-3 hover:bg-gray-400 hover:text-white",
  },
  submit: {
    light:
      "text-white font-semibold border border-gray-300 bg-sky-900 hover:bg-sky-700",
    dark: "text-white font-semibold border border-gray-300 bg-sky-900 hover:bg-sky-700",
  },
  "submit-secondary": {
    light: "text-white bg-sky-400 hover:bg-sky-500 px-3 py-2",
    dark: "text-white bg-sky-600 hover:bg-sky-500 px-3 py-2",
  },
  /** use 'transparent' when <Button> is a wrapper around child components */
  transparent: {
    light: "",
    dark: "",
  },
  "transparent-hover": {
    light: "hover:bg-sky-100 hover:text-sky-900",
    dark: "hover:bg-sky-900 hover:text-sky-100",
  },
  // primary: {
  //   light: 'bg-blue-500 text-white',
  //   dark: '',
  // },
  // secondary: {
  //   light: 'bg-gray-300 text-gray-800',
  //   dark: '',
  // },
  // danger: {
  //   light: 'bg-red-500 text-white',
  //   dark: '',
  // },
  // warning: {
  //   light: 'bg-yellow-500 text-white',
  //   dark: '',
  // },
} as const;

/** @TODO use this as a wrapper around headless-ui Button */
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
  const buttonClasses = BUTTON_THEMES[buttonTheme][themeAtom];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClick && onClick();
  };

  return (
    <HeadlessBtn
      // <button
      /** @TODO need all of these? specifically, 'cursor-pointer' and others that HeadlessBtn takes care of... */
      className={`cursor-pointer rounded-xl px-2 py-1 ${buttonClasses} ${underline ? "underline" : ""} ${bold ? "font-semibold" : ""} ${additionalClasses}`}
      disabled={disabled}
      onClick={(e) => handleClick(e)}
    >
      {children}
      {/* </button> */}
    </HeadlessBtn>
  );
}
