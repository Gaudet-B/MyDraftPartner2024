"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { zoom } from "d3";
import { BgSvgBuilder } from "./SvgBuilder";
import { SVG_DIMENSIONS } from "./dimensions";
// import Link from "next/link";
import { useRouter } from "next/navigation";

function MenuLink({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={`w-28 cursor-pointer text-wrap text-2xl font-semibold text-white ${className}`}
    >
      {children}
    </div>
  );
}

function Logo({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`absolute -translate-y-[230px] transition-opacity duration-[2000ms] ${isOpen ? "opacity-1" : "opacity-0"}`}
    >
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
    </div>
  );
}

/** @TODO add Next auth login here, preferably with multiple options, not just Discord */
function Login() {
  return <div className="flex w-full items-center justify-center">Login</div>;
}

function Register() {
  return (
    <div className="flex w-full items-center justify-center">Register</div>
  );
}

function LoginOrContinue({
  isOpen,
  handleLogin,
  handleRegister,
  handleGuest,
}: {
  isOpen: boolean;
  handleLogin: () => void;
  handleRegister: () => void;
  handleGuest: () => void;
}) {
  return (
    <div className="flex w-full items-center justify-center">
      {isOpen && (
        <div className="flex w-1/2 justify-center">
          <div className="flex flex-col items-end gap-4">
            <MenuLink className="text-end">
              <span onClick={handleLogin}>Login</span>
            </MenuLink>
            <MenuLink className="text-end text-lg font-thin">
              <span onClick={handleRegister}>or register a new account</span>
            </MenuLink>
          </div>
        </div>
      )}
      <div className="h-2/5 w-[2px] border-2 border-white" />
      {isOpen && (
        <div className="flex w-1/2 justify-center">
          <MenuLink>
            <div className="flex flex-col" onClick={handleGuest}>
              <span>Continue</span>
              <span className="font-thin"> as guest</span>
            </div>
          </MenuLink>
        </div>
      )}
    </div>
  );
}

function LandingModal({
  isOpen,
  close,
  open,
  zoomOut,
  // goToDashboard,
}: {
  isOpen: boolean;
  close: () => void;
  open: () => void;
  zoomOut: () => void;
  // goToDashboard: () => void;
}) {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleGuest = () => {
    zoomOut();
    // setTimeout(() => goToDashboard(), 2000);
  };

  const closeAndOpen = () => {
    close();
    setTimeout(() => open(), 500);
  };

  const handleLogin = () => {
    closeAndOpen();
    setShowLogin(true);
  };

  const handleRegister = () => {
    closeAndOpen();
    setShowRegister(true);
  };

  useEffect(() => {
    setTimeout(() => open(), 200);
    // return close();
  }, []);
  return (
    <div className="absolute z-50 flex h-[700px] w-[700px] translate-x-2/3 translate-y-[100px] items-center justify-center rounded-full">
      <Logo isOpen={isOpen} />
      <div
        className={`flex w-full rounded-full border-4 border-white bg-[#374151] transition-all duration-200 ease-linear ${isOpen ? "opacity-1 h-full" : "opacity-1 h-1"}`}
      >
        {showLogin ? (
          <Login />
        ) : showRegister ? (
          <Register />
        ) : (
          <LoginOrContinue
            isOpen={isOpen}
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleGuest={handleGuest}
          />
        )}
      </div>
    </div>
  );
}

function Redirect() {
  const router = useRouter();
  const handleDashboardRoute = () => router.push("/dashboard");

  useEffect(() => {
    handleDashboardRoute();
  }, []);

  return <div className="absolute h-screen w-screen opacity-0" />;
}

export default function FieldBackground() {
  const [scale, setScale] = useState<number>();
  const [showSvg, setShowSvg] = useState(false);
  const [zoomFinished, setZoomFinished] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  // const [loadingProgress, setLoadingProgress] = useState(0);
  const [progressBar, setProgressBar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<Element>(null);

  const getScale = () => {
    const height = containerRef?.current?.getBoundingClientRect().height ?? 0;
    return height / SVG_DIMENSIONS.height;
  };

  const showSvgBody = () => setShowSvg(true);
  const hideSvgBody = () => setShowSvg(false);

  const showLinks = () => setZoomFinished(true);
  const hideLinks = () => setZoomFinished(false);

  const openLogin = () => setIsOpen(true);
  const closeLogin = () => setIsOpen(false);

  const renderRedirect = () => setRedirect(true);

  function zoomToField(
    direction: "in" | "out",
    svg: d3.Selection<Element, unknown, null, undefined>,
  ) {
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
  }

  // function progressBar(delay: number) {
  //   let progress = 0.1;
  //   setLoadingProgress(progress);
  //   for (let i = 0; i < 9; i++) {
  //     setTimeout(() => {
  //       progress += 0.1;
  //       setLoadingProgress(progress);
  //     }, delay);
  //   }
  // }

  /** @TODO move these timing values to constants at top of file */
  function zoomIn(svg: d3.Selection<Element, unknown, null, undefined>) {
    setProgressBar(true);
    setTimeout(() => showSvgBody(), 1000);
    setTimeout(() => zoomToField("in", svg), 1500);
    setTimeout(() => showLinks(), 2500);
  }

  /** @TODO move these timing values to constants at top of file */
  function zoomOut(svg: d3.Selection<Element, unknown, null, undefined>) {
    closeLogin();
    setTimeout(() => hideLinks(), 500);
    setTimeout(() => zoomToField("out", svg), 500);
    // setTimeout(() => hideSvgBody(), 2000);
    // setTimeout(() => renderRedirect(), 2500);
    // setTimeout(() => handleDashboardRoute(), 2000);
  }

  function handleZoom(direction: "in" | "out") {
    const svg = svgRef.current
      ? d3.select<Element, unknown>(svgRef.current)
      : null;
    if (!svg) return;
    if (direction === "in") zoomIn(svg);
    if (direction === "out") zoomOut(svg);
  }

  useEffect(() => {
    setScale(getScale());
    if (svgRef.current) handleZoom("in");
  }, []);

  return (
    <div ref={containerRef} className="h-screen w-screen overflow-hidden">
      {redirect && <Redirect />}
      {zoomFinished && (
        <LandingModal
          isOpen={isOpen}
          zoomOut={() => {
            handleZoom("out");
            setTimeout(() => renderRedirect(), 2500);
          }}
          open={openLogin}
          close={closeLogin}
        />
      )}
      {/* <button
        className={"absolute z-10 m-4 p-2"}
        onClick={() => handleZoom("out")}
      >
        Click here to zoom!
      </button> */}
      <BgSvgBuilder
        baseScale={scale}
        progressBar={progressBar}
        showSvg={showSvg}
        svgRef={svgRef}
      />
    </div>
  );
}
