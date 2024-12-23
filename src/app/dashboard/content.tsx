"use client";

import { PropsWithChildren, useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
import ContentContainer from "@designsystem/container/ContentContainer";
import useThemeEffect from "@designsystem/theme/hooks/useThemeEffect";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import { UserIcon } from "@designsystem/icons";
import {
  backgroundColors,
  borderColors,
  textColors,
} from "@designsystem/colors";
import { BgSvgBuilder } from "@components/background/SvgBuilder";
import { getDimensions } from "@components/background/dimensions";
import { BUTTON_MAP, BUTTONS } from "./sidebar";
import Link from "next/link";

const CONTENT = [...BUTTONS, "RATE-MY-TEAM"] as const;

export function BackgroundLogo({
  containerHeight,
  containerRef,
}: {
  containerHeight?: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const svgRef = useRef<SVGElement>(null);

  const [translate, setTranslate] = useState(false);

  const dimensions = useMemo(() => {
    return containerHeight ? getDimensions(containerHeight) : undefined;
  }, [containerHeight]);

  const [themeAtom] = useAtom(useThemeAtom);
  const darkMode = themeAtom === "dark";

  useEffect(() => setTranslate(true), []);

  return (
    <div
      className={`absolute flex h-full w-full items-center justify-center overflow-hidden`}
    >
      <div
        /** @TODO play around with opacity a bit more */
        className={`z-0 flex h-full w-1/2 justify-center py-[75px] opacity-50 transition-transform duration-500 ease-in ${translate ? "translate-x-[35px]" : ""}`}
      >
        <div ref={containerRef}>
          {dimensions && (
            <BgSvgBuilder
              progressBar={false}
              showSvg
              svgRef={svgRef}
              baseScale={1}
              hasBlackLines={!darkMode}
              hasColors={false}
              dimensions={dimensions}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export function BackgroundLogoContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | undefined>();

  useEffect(() => {
    setContainerHeight(containerRef.current?.getBoundingClientRect().height);
  }, [containerRef.current]);

  return (
    <BackgroundLogo
      containerHeight={containerHeight}
      containerRef={containerRef}
    />
  );
}

function DashboardLinksContainer({ children }: PropsWithChildren) {
  return (
    <div className={`flex flex-col justify-center gap-6 p-6`}>{children}</div>
  );
}

function _getLinkText(txt: (typeof CONTENT)[number]) {
  const text = txt.replaceAll("-", " ").toLowerCase();
  switch (text) {
    case "analysis":
      return "draft analysis";
    case "teams":
      return "view my teams";
    case "settings":
      return "profile / settings";
    case "recommendations":
      return "get draft recommendations";
    default:
      return text;
  }
}

function DashboardLink({
  txt,
  darkMode,
}: {
  txt: (typeof CONTENT)[number];
  darkMode: boolean;
}) {
  const text = _getLinkText(txt);
  const isRateMyTeam = txt === "RATE-MY-TEAM";
  const isInverted = isRateMyTeam ? true : !darkMode;
  const Icon = isRateMyTeam ? UserIcon : BUTTON_MAP[txt];

  const isShorter = txt === "SETTINGS" || txt === "RECOMMENDATIONS";
  const dimensions = isShorter ? { h: 140, w: 140 } : { h: 152, w: 152 };

  console.log("dimensions", dimensions);
  console.log("Link", Link);

  return (
    /** @TODO next/link is hard to query when running tests, find a better solution than this button wrapper (maybe an "id"?) */
    <button>
      <Link
        // aria-roledescription="link"
        href={`/dashboard/${txt.toLowerCase()}`}
        className={`group flex h-60 w-60 cursor-pointer flex-col items-center justify-between rounded-xl border-2 p-3 pt-4 opacity-80 transition-all duration-500 ease-in hover:opacity-100 ${darkMode ? `${borderColors.darkSecondary} ${backgroundColors.lightAccent} ${backgroundColors.hover.light}` : `${borderColors.lightSecondary} ${backgroundColors.darkAccent} ${backgroundColors.hover.darkTertiary}`} ${isRateMyTeam ? "gap-2" : ""}`}
      >
        <div
          className="flex h-44 w-44 items-center justify-center"
          style={isInverted ? { filter: "invert(100%)" } : {}}
        >
          <Icon dimensions={dimensions} />
        </div>
        <div className="h-10 text-wrap font-sans text-xl leading-5 opacity-0 transition-opacity duration-500 ease-in group-hover:opacity-100">
          <span className={darkMode ? textColors.dark : textColors.light}>
            {text}
          </span>
        </div>
      </Link>
    </button>
  );
}

function DashboardLinksRow({ children }: PropsWithChildren) {
  return <div className={`flex justify-center gap-6`}>{children}</div>;
}

export default function DashBoardContent({
  hasDarkMode,
}: {
  hasDarkMode: boolean;
}) {
  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  useThemeEffect(hasDarkMode, themeAtom, setThemeAtom);

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  const rows = Math.ceil(CONTENT.length / 3);

  return (
    <Container.Boxy>
      <DashboardLinksContainer>
        {Array.from({ length: rows }).map((_, idx) => (
          <DashboardLinksRow key={`dashboard-row-${idx}`}>
            {CONTENT.slice(idx * 3, (idx + 1) * 3).map((txt, idx) => (
              <DashboardLink
                key={`dashboard-link-${idx}-${txt}`}
                txt={txt}
                darkMode={themeAtom === "dark"}
              />
            ))}
          </DashboardLinksRow>
        ))}
      </DashboardLinksContainer>
    </Container.Boxy>
  );
}
