"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { zoom } from "d3";
import { BgSvgBuilder } from "./SvgBuilder";
import { SVG_DIMENSIONS } from "./dimensions";
import Link from "next/link";

function MenuLink({
  children,
  href,
  className,
}: PropsWithChildren<{ href: string; className?: string }>) {
  return (
    <Link
      href={href}
      className={`w-28 text-wrap text-2xl font-semibold text-white ${className}`}
    >
      {children}
    </Link>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="330"
      height="110"
      viewBox="0 0 330 110"
    >
      {/* <g className="stroke-[#00FFCC]"> */}
      <g
        /** @TODO change font (or draw as <path> elements like below) */
        // fontFamily={"Bodoni Moda"}
        // fontStyle={"serif"}
        fontSize={96}
        // fill="white"
        // stroke={"#00FFCC"}
        strokeWidth={2}
        className="stroke-[#00ffea]"
      >
        {/* <path d="M10,70 L10,10 L30,10 L30,60 L50,60 L50,10 L70,10 L70,70 Z" />
        <path d="M80,70 L80,10 L100,10 L120,40 L100,70 Z" />
        <path d="M130,70 L130,10 L150,10 L150,50 L170,50 L170,70 Z" />
        <path d="M190,70 L190,10 L230,10 L230,70 L210,70 L210,50 L210,30 L210,70 Z" />
        <path d="M240,70 L240,10 L260,10 L260,50 L280,50 L280,70 Z" /> */}
        <text x={0} y={80}>
          MDP24
        </text>
      </g>
    </svg>
  );
}

function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  useEffect(() => {
    setTimeout(() => open(), 200);
    return close();
  }, []);
  return (
    <div className="absolute z-50 flex h-[700px] w-[700px] translate-x-2/3 translate-y-[100px] items-center justify-center rounded-full">
      <div
        className={`flex w-full items-center justify-center rounded-full border-4 border-white bg-[#374151] transition-all duration-200 ease-linear ${isOpen ? "opacity-1 h-full" : "opacity-1 h-1"}`}
      >
        <div
          className={`absolute -translate-y-[230px] transition-opacity duration-[2000ms] ${isOpen ? "opacity-1" : "opacity-0"}`}
        >
          <Logo />
        </div>
        {isOpen && (
          <div className="flex w-1/2 justify-center">
            <div className="flex flex-col items-end gap-4">
              <MenuLink className="text-end" href="/login">
                Login
              </MenuLink>
              <MenuLink className="text-end text-lg font-thin" href="/register">
                or register a new account
              </MenuLink>
            </div>
          </div>
        )}
        <div className="h-2/5 w-[2px] border-2 border-white" />
        {isOpen && (
          <div className="flex w-1/2 justify-center">
            <MenuLink href="/dashboard">
              <div className="flex flex-col">
                <span>Continue</span>
                <span className="font-thin"> as guest</span>
              </div>
            </MenuLink>
          </div>
        )}
      </div>
      {/* <div className="absolute -translate-y-[230px]">
        <Logo />
      </div> */}
    </div>
  );
}

export default function FieldBackground() {
  const [scale, setScale] = useState<number>();
  const [showSvg, setShowSvg] = useState(false);
  const [zoomFinished, setZoomFinished] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<Element>(null);

  const getScale = () => {
    // const width =
    //   containerRef?.current?.getBoundingClientRect().width ?? 0;
    const height = containerRef?.current?.getBoundingClientRect().height ?? 0;

    // console.log("height", height);
    // console.log("SVG_DIMENSIONS.height", SVG_DIMENSIONS.height);
    // console.log("scale", height / SVG_DIMENSIONS.height);

    return height / SVG_DIMENSIONS.height;

    // return {
    //   width,
    //   height,
    // };
  };

  const showSvgBody = () => setShowSvg(true);

  const showLinks = () => setZoomFinished(true);

  const zoomToField = (
    direction: "in" | "out",
    svg: d3.Selection<Element, unknown, null, undefined>,
  ) => {
    const [x, y, s] =
      direction === "in"
        ? [100, -600, scale ? scale * 5 : 5]
        : [0, -600, scale ?? 0.6];

    const zoomHandler = zoom()
      // .scaleExtent([1, 8])
      // .duration(500)
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      });

    svg
      .transition()
      // .duration(1000)
      .call(
        zoomHandler.transform,
        d3.zoomIdentity.translate(x, y).scale(s),
        // d3.zoomIdentity.scale(1).translate(0, 0),
      );
  };

  function handleClick() {
    const svg = svgRef.current
      ? d3.select<Element, unknown>(svgRef.current)
      : null;
    // console.log("svg", svg);
    if (svg) zoomToField("out", svg);
    // const zoom = zoomToField();
    // svg.transition(zoom);
    setZoomFinished(false);
  }

  useEffect(() => {
    setScale(getScale());

    const svg = svgRef.current ? d3.select(svgRef.current) : null;
    // console.log("svg", svg);
    if (svg) {
      // console.log("svg", svg);
      setTimeout(() => showSvgBody(), 1000);
      setTimeout(() => zoomToField("in", svg), 1500);
      setTimeout(() => showLinks(), 2500);
      // setTimeout(() => zoomToField("out", svg), 2000);
      // setTimeout(() => setBgColor("#4F8918"), 2000);
    }
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden">
      {zoomFinished && <Login />}
      <button className={"absolute z-10 m-4 p-2"} onClick={handleClick}>
        Click here to zoom!
      </button>
      <BgSvgBuilder
        baseScale={scale}
        showSvg={showSvg}
        svgRef={svgRef}
        // dimensions={dimensions}
      />
    </div>
  );
}
