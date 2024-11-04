import { PropsWithChildren } from "react";
import { get2YdMarker } from "./BgSvgBuilder";
import { HASH_LENGTH, HASH_POSITIONS } from "../dimensions";

export function SVG({
  children,
  baseScale,
  height,
  width,
  showSvg,
  svgRef,
}: PropsWithChildren<{
  height: number;
  width: number;
  showSvg: boolean;
  svgRef: React.RefObject<SVGSVGElement>;
  baseScale?: number;
}>) {
  return (
    <svg
      ref={svgRef}
      id={"MDP-field-image"}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      // width={height * 0.68}
      height={height}
      // transform={`scale(${baseScale})`}
      transform={`translate(0, -600) scale(${baseScale ?? 0.6})`}
      // transform={`translate(${-100},${-700}) scale(0.6)`}
      // transform={`translate(${200},${500}) scale(4)`}
      // transform={transform(t)}
      className="transition-all duration-[1000ms] ease-out"
    >
      {showSvg ? children : null}
    </svg>
  );
}

export function FieldLines({
  children,
  svgRef,
  x,
  y,
}: PropsWithChildren<{
  svgRef: React.RefObject<SVGGElement>;
  x: number;
  y: number;
}>) {
  return <g transform={`translate(${x},${y})`}>{children}</g>;
}

export function EndZones({
  fieldWidth,
  sectionHeight,
}: {
  fieldWidth: number;
  sectionHeight: number;
}) {
  return (
    <g stroke="white" strokeWidth={6}>
      {/* Top End Zone */}
      <path
        d={`M 0 0 H ${fieldWidth} V ${sectionHeight} H 0 Z`}
        // className="fill-gray-700"
        // className="fill-sky-900"
        // fill="#456F16"
        fill="none"
        // opacity={0.6}
      />
      {/* Top Goal Line */}
      <line x1={0} y1={sectionHeight} x2={fieldWidth} y2={sectionHeight} />
      {/* Bottom End Zone */}
      <path
        d={`M 0 ${11 * sectionHeight} H ${fieldWidth} V ${12 * sectionHeight} H 0 Z`}
        // className="fill-gray-700"
        // className="fill-red-900"
        fill="none"
        // opacity={0.6}
      />
      {/* Bottom Goal Line */}
      <line
        x1={0}
        y1={11 * sectionHeight}
        x2={fieldWidth}
        y2={11 * sectionHeight}
      />
    </g>
  );
}

export function YardLines({ children }: PropsWithChildren) {
  return (
    <g stroke="white" strokeWidth={3}>
      {children}
    </g>
  );
}

export function FieldSection({
  // bgColor,
  children,
  fieldWidth,
  sectionHeight,
  start,
  i,
}: PropsWithChildren<{
  // bgColor: string;
  fieldWidth: number;
  sectionHeight: number;
  start: number;
  i: number;
}>) {
  // const fill = ;

  return (
    <g id={`field-section-${i}`} key={`field-section-${i}`}>
      {/* Section Background Color */}
      <path
        d={`M 0 ${start} H ${fieldWidth} V ${start + sectionHeight} H 0 Z`}
        // fill={i % 2 === 0 ? "#4F8918" : "#456F16"}
        fill="none"
        stroke="none"
      />
      <line x1={0} y1={start} x2={fieldWidth} y2={start} />
      {/* Hash Lines */}
      <g id={`field-section-${i}-hashes`}>{children}</g>
    </g>
  );
}

export function HashLines({
  fieldWidth,
  hash,
  i,
  j,
}: {
  fieldWidth: number;
  hash: number;
  i: number;
  j: number;
}) {
  const [is2Yd, s, e] = get2YdMarker(i, j, fieldWidth);
  return (
    <g id={`field-section-${i}-hashes-row-${j}`}>
      {/* 2 Yard Line Markers */}
      {is2Yd && <line x1={s} y1={hash} x2={e} y2={hash} />}
      {HASH_POSITIONS.map((pos, k) => {
        const xStart = pos * fieldWidth;
        const xEnd = xStart + HASH_LENGTH;
        return (
          <line
            key={`field-section-${i}-hash-${j}-${k}`}
            x1={k === 3 ? fieldWidth - HASH_LENGTH : xStart}
            y1={hash}
            x2={k === 3 ? fieldWidth : xEnd}
            y2={hash}
          />
        );
      })}
    </g>
  );
}

export function FieldNumbers({
  fieldHeight,
  fieldWidth,
  start,
  i,
  leftNum,
  rightNum,
}: {
  fieldHeight: number;
  fieldWidth: number;
  start: number;
  i: number;
  leftNum: number;
  rightNum: number;
}) {
  return (
    <g
      transform={`translate(0,${start})`}
      fontFamily="Bodoni Moda"
      fontStyle={"serif"}
      fontSize={96}
      fill="white"
      stroke={"white"}
      strokeWidth={2}
    >
      <g transform="rotate(90)">
        {i !== 0 && (
          <text x={0.002 * fieldHeight} y={-(0.079 * fieldWidth)}>
            0
          </text>
        )}
        {i < 9 && (
          <text
            x={leftNum === 1 ? 0.058 * fieldHeight : 0.058 * fieldHeight - 4}
            y={-(0.0785 * fieldWidth)}
          >
            {leftNum}
          </text>
        )}
      </g>
      <g transform="rotate(-90)">
        {i !== 0 && (
          <text
            x={
              rightNum === 1
                ? -(0.025 * fieldHeight)
                : -(0.025 * fieldHeight) - 4
            }
            y={0.925 * fieldWidth}
          >
            {rightNum}
          </text>
        )}
        {i < 9 && (
          <text x={-(0.08 * fieldHeight)} y={0.925 * fieldWidth}>
            0
          </text>
        )}
      </g>
    </g>
  );
}

export function Sidelines({
  fieldWidth,
  fieldHeight,
}: {
  fieldWidth: number;
  fieldHeight: number;
}) {
  return (
    <g stroke="white" strokeWidth={6}>
      <path d={`M 0 0 H ${fieldWidth} V ${fieldHeight} H 0 V 0`} fill="none" />
    </g>
  );
}

export function Midfield({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={70}
        // fill="gray"
        strokeWidth={4}
        // className={"fill-[#374151] stroke-white"}
        className={"fill-none stroke-white"}
      />
    </g>
  );
}

function GoalPost({
  goalPostWidth,
  className,
  x,
  y,
  path,
  baseX,
  baseY,
}: {
  goalPostWidth: number;
  className: string;
  x: number;
  y: number;
  path: string;
  baseX: number;
  baseY: number;
}) {
  return (
    <g transform={`translate(${x},${y - 15})`}>
      <circle
        cx={baseX}
        cy={baseY}
        r={20}
        fill="gray"
        strokeWidth={4}
        className={className}
      />
      <path d={path} fill="#CBC15D" />
      {/* 10px */}
      <path d={`M 0 0 H ${goalPostWidth} V 10 H 0 Z`} fill="#E9BE49" />
      {/* 5px */}
      <path d={`M 0 10 H ${goalPostWidth} V 15 H 0 Z`} fill="#FEEFAE" />
      {/* 15px */}
      <path d={`M 0 15 H ${goalPostWidth} V 30 H 0 Z`} fill="#F6B721" />
      <circle cx={0} cy={14} r={20} fill="#CBC15D" />
      <circle cx={goalPostWidth} cy={14} r={20} fill="#CBC15D" />
    </g>
  );
}

export function GoalPosts({
  goalPostWidth,
  gpStart,
  height,
  y,
}: {
  goalPostWidth: number;
  gpStart: number;
  height: number;
  y: number;
}) {
  const baseX = goalPostWidth / 2;
  return (
    <g>
      {/** Top Goalposts */}
      <GoalPost
        x={gpStart}
        y={y}
        baseX={baseX}
        baseY={-30}
        goalPostWidth={goalPostWidth}
        // path={-30}
        path={`M ${baseX - 10} ${-30} A 10 10 0 0 1 ${baseX + 10} ${-30} V 30 H ${baseX - 10} V ${-30} Z`}
        className={"stroke-sky-800"}
      />
      {/** Bottom Goalposts */}
      <GoalPost
        x={gpStart}
        y={height - y}
        baseX={baseX}
        baseY={64}
        goalPostWidth={goalPostWidth}
        // path={60}
        path={`M ${baseX - 10} ${60} V 0 H ${baseX + 10} V ${60} A 10 10 0 0 1 ${baseX - 10} ${60} Z`}
        className={"stroke-red-800"}
      />
    </g>
  );
}
