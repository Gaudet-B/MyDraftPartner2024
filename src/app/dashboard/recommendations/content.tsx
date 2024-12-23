"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import ContentContainer from "@designsystem/container/ContentContainer";
import { H1, H2, H3 } from "~/app/_components/design-system/typography/header";

function RecsTitle({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`flex w-full flex-col gap-1 pt-5 text-center font-aquire ${darkMode ? "text-gray-300" : "text-gray-700"}`}
    >
      {/* <div
        className={`w-full pt-5 text-center font-aquire ${darkMode ? "text-gray-300" : "text-gray-700"}`}
      > */}
      <H3>Get Draft</H3>
      <H1>Recommendations</H1>
      {/* </div> */}
    </div>
  );
}

export default function RecommendationsContent({
  hasDarkMode,
}: {
  hasDarkMode: boolean;
}) {
  const [themeAtom] = useAtom(useThemeAtom);

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  return (
    <Container.Wide>
      <Container.Scrollable>
        <div className="flex h-full w-full flex-col items-center gap-6">
          <RecsTitle darkMode={themeAtom === "dark"} />
        </div>
      </Container.Scrollable>
    </Container.Wide>
  );
}
