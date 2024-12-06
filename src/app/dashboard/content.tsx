"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useAtom } from "jotai";
// import H1 from "@designsystem/typography/H1";
import { backgroundColors } from "@designsystem/colors";
import transition from "@designsystem/class-names/transition";
import { BgSvgBuilder } from "@components/background/SvgBuilder";
import { getDimensions } from "@components/background/dimensions";
import { useThemeAtom } from "./atoms";

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

  // console.log("dimensions", dimensions);
  // console.log("containerHeight", containerHeight);

  useEffect(() => setTranslate(true), []);

  return (
    <div
      // ref={ref}
      className={`absolute flex h-full w-full items-center justify-center overflow-hidden`}
      // className={`absolute h-screen w-[472px] overflow-hidden bg-cover opacity-[0.7]`}
      // style={{
      //   backgroundImage: `url(${fieldIcon})`,
      //   filter: `${darkMode ? "invert(100%)" : ""}`,
      // }}
    >
      <div
        /** @TODO play around with opacity a bit */
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
  // const containerHeight = useMemo(() => {
  //   return containerRef.current?.getBoundingClientRect().height;
  // }, [containerRef.current]);

  useEffect(() => {
    console.log("containerRef.current", containerRef.current);
    setContainerHeight(containerRef.current?.getBoundingClientRect().height);
  }, [containerRef.current]);

  return (
    <BackgroundLogo
      containerHeight={containerHeight}
      containerRef={containerRef}
    />
  );
}

export default function DashBoardContent() {
  const [themeAtom] = useAtom(useThemeAtom);

  return (
    /** @TODO THIS IS A PLACEHOLDER AND NEEDS A NEW DESIGN - old one is just an array of enlarged buttons :(  */
    <div
      className={`h-full w-full grow ${transition.standard} ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    />
  );
}
