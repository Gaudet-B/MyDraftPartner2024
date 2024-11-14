import { useAtom } from "jotai";
import { PropsWithChildren } from "react";
import { useThemeAtom } from "~/app/dashboard/atoms";

function SVG({ children }: PropsWithChildren) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 110">
      {children}
    </svg>
  );
}

function Layer({
  start,
  fill = "black",
}: {
  fill: "black" | "white";
  start: number;
}) {
  return (
    <g transform={`translate(0,${start})`}>
      <path
        d="M 10 0 H 100 Q 110 10 100,20 H 10 Q 0 10 10,0 Z"
        fill={fill}
        className="shadow-lg"
      />
    </g>
  );
}

export default function HamburgerIcon({ layers = 3 }: { layers?: number }) {
  const [theme] = useAtom(useThemeAtom);
  const color = theme === "light" ? "black" : "white";

  return (
    <SVG>
      {Array.from({ length: layers }, (_, i) => (
        <Layer key={`hamburger-layer-${i}`} fill={color} start={i * 35 + 5} />
      ))}
    </SVG>
  );
}
