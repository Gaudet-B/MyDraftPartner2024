import { PropsWithChildren } from "react";
import Link, { LinkProps } from "next/link";
import LINK_THEMES from "./themes";

type Props = {
  theme?: "light" | "dark" | "standard";
  bold?: boolean;
  underlineOnHover?: boolean;
};

export default function StandardLink({
  children,
  href,
  bold = false,
  theme = "standard",
  underlineOnHover = false,
  ...props
}: PropsWithChildren<Props & LinkProps>) {
  return (
    <Link
      className={`${LINK_THEMES[theme]} ${bold ? "font-bold" : ""} ${underlineOnHover ? "hover:underline" : "underline"}`}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
