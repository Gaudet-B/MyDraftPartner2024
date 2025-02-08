"use client";

import { PropsWithChildren, useMemo } from "react";
import { useAtom } from "jotai";
import { backgroundColors } from "@designsystem/colors";
import transition from "@designsystem/class-names/transition";
import useThemeAtom from "../theme/atoms/useThemeAtom";
import useThemeEffect from "../theme/hooks/useThemeEffect";
import ContentContainer, { ContainerType } from "./ContentContainer";

export default function ContentArea({
  children,
  outer = "None",
  inner = "None",
  hasDarkMode = false,
}: PropsWithChildren<{
  hasDarkMode?: boolean;
  outer?: ContainerType | "None";
  inner?: ContainerType | "None";
}>) {
  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  useThemeEffect(hasDarkMode, themeAtom, setThemeAtom);

  // const noContainer = outer === "None" && inner === "None";

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  const OuterContainer =
    outer === "None"
      ? ({ children }: PropsWithChildren) => <>{children}</>
      : Container[outer];
  const InnerContainer =
    inner === "None"
      ? ({ children }: PropsWithChildren) => <>{children}</>
      : Container[inner];

  return (
    <div
      className={`flex h-full w-full grow flex-col items-center p-6 ${transition.standard} ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      <OuterContainer>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    </div>
  );
}
