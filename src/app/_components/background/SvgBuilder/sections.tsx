import { PropsWithChildren } from "react";
import { get2YdMarker } from "./BgSvgBuilder";
import { HASH_LENGTH, HASH_POSITIONS } from "../dimensions";

const INNER_HEIGHT = 50 as const;
const OUTER_HEIGHT = 60 as const;

const INNER_COLOR = "white" as const;
const OUTER_COLOR = "white" as const;

function LoadingProgress({
  height = 2100,
  width = 1433,
  progressBar = false,
}: {
  height: number;
  width: number;
  progressBar: boolean;
}) {
  const length = width / 2;

  return (
    <g transform={`translate(${width / 3}, ${height / 5})`}>
      <path
        d={`M 0 0 H ${length} V ${OUTER_HEIGHT} H 0 V 0 Z`}
        stroke={OUTER_COLOR}
        strokeWidth={4}
        fill="none"
      />
      <path
        d={`M 0 10 H ${progressBar ? length : "0"} V ${INNER_HEIGHT} H 0 V 10 Z`}
        stroke="none"
        fill={INNER_COLOR}
        className="ease transition-all duration-[1000ms]"
      />
    </g>
  );
}

export function SVG({
  children,
  baseScale,
  height,
  width,
  showSvg,
  svgRef,
  progressBar,
}: PropsWithChildren<{
  height: number;
  width: number;
  showSvg: boolean;
  svgRef: React.RefObject<SVGSVGElement>;
  progressBar: boolean;
  baseScale?: number;
}>) {
  return (
    <svg
      ref={svgRef}
      id={"MDP-field-image"}
      xmlns="http://www.w3.org/2000/svg"
      // width={height * 0.68}
      width={width}
      height={height}
      transform={`translate(-${0}, -${0}) scale(${baseScale ?? 1})`}
      // transform={`scale(${baseScale})`}
      // transform={`translate(${-100},${-700}) scale(0.6)`}
      // transform={`translate(${200},${500}) scale(4)`}
      // transform={transform(t)}
      className="transition-all duration-[1000ms] ease-out"
      viewBox={`0 0 ${width} ${height}`}
    >
      {showSvg ? (
        children
      ) : (
        <LoadingProgress
          height={height}
          width={width}
          progressBar={progressBar}
        />
      )}
    </svg>
  );
}

export function FieldLines({
  children,
  x,
  y,
}: PropsWithChildren<{
  x: number;
  y: number;
}>) {
  return <g transform={`translate(${x},${y})`}>{children}</g>;
}

export function EndZones({
  fieldWidth,
  sectionHeight,
  hasColors = true,
  hasBlackLines = false,
}: {
  fieldWidth: number;
  sectionHeight: number;
  hasColors?: boolean;
  hasBlackLines?: boolean;
}) {
  return (
    <g stroke={hasBlackLines ? "black" : "white"} strokeWidth={4}>
      {/* Top End Zone */}
      <path
        d={`M 0 0 H ${fieldWidth} V ${sectionHeight} H 0 Z`}
        className={hasColors ? "fill-sky-900" : "fill-none"}
        // fill="none"
        // opacity={0.6}
      />
      {/* Top Goal Line */}
      <line x1={0} y1={sectionHeight} x2={fieldWidth} y2={sectionHeight} />
      {/* Bottom End Zone */}
      <path
        d={`M 0 ${11 * sectionHeight} H ${fieldWidth} V ${12 * sectionHeight} H 0 Z`}
        className={hasColors ? "fill-red-900" : "fill-none"}
        // fill="none"
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

export function YardLines({
  children,
  hasBlackLines = false,
}: PropsWithChildren<{ hasBlackLines?: boolean }>) {
  return (
    <g stroke={hasBlackLines ? "black" : "white"} strokeWidth={2}>
      {children}
    </g>
  );
}

export function FieldSection({
  children,
  fieldWidth,
  sectionHeight,
  start,
  i,
  hasColors = true,
}: PropsWithChildren<{
  fieldWidth: number;
  sectionHeight: number;
  start: number;
  i: number;
  hasColors?: boolean;
}>) {
  const fill = i % 2 === 0 ? "#4F8918" : "#456F16";
  return (
    <g id={`field-section-${i}`} key={`field-section-${i}`}>
      {/* Section Background Color */}
      <path
        d={`M 0 ${start} H ${fieldWidth} V ${start + sectionHeight} H 0 Z`}
        fill={hasColors ? fill : "none"}
        // fill="none"
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
  // blackLines = false,
}: {
  fieldWidth: number;
  hash: number;
  i: number;
  j: number;
  // blackLines?: boolean;
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
  blackNums = false,
}: {
  fieldHeight: number;
  fieldWidth: number;
  start: number;
  i: number;
  leftNum: number;
  rightNum: number;
  blackNums?: boolean;
}) {
  return (
    <g
      transform={`translate(0,${start})`}
      fontFamily="Bodoni Moda"
      fontStyle={"serif"}
      fontSize={32}
      fill={blackNums ? "black" : "white"}
      stroke={blackNums ? "black" : "white"}
      strokeWidth={1}
    >
      <g transform="rotate(90)">
        {i !== 0 && (
          <text x={0.005 * fieldHeight} y={-(0.09 * fieldWidth)}>
            0
          </text>
        )}
        {i < 9 && (
          <text
            x={leftNum === 1 ? 0.058 * fieldHeight : 0.058 * fieldHeight - 3}
            y={-(0.09 * fieldWidth)}
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
                : -(0.025 * fieldHeight) - 3
            }
            y={0.915 * fieldWidth}
          >
            {rightNum}
          </text>
        )}
        {i < 9 && (
          <text x={-(0.078 * fieldHeight)} y={0.915 * fieldWidth}>
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
  blackLines = false,
}: {
  fieldWidth: number;
  fieldHeight: number;
  blackLines?: boolean;
}) {
  return (
    <g stroke={blackLines ? "black" : "white"} strokeWidth={4}>
      <path d={`M 0 0 H ${fieldWidth} V ${fieldHeight} H 0 V 0`} fill="none" />
    </g>
  );
}

export function Midfield({
  x,
  y,
  hasBlackLines = false,
}: {
  x: number;
  y: number;
  hasBlackLines?: boolean;
}) {
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={30}
        strokeWidth={2}
        fill="none"
        stroke={hasBlackLines ? "black" : "white"}
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
    <g transform={`translate(${x},${y - 6})`}>
      <circle
        cx={baseX}
        cy={baseY}
        r={10}
        fill="gray"
        strokeWidth={2}
        className={className}
      />
      <path d={path} fill="#CBC15D" />
      {/* 10px -> 4px */}
      <path d={`M 0 0 H ${goalPostWidth} V 4 H 0 Z`} fill="#E9BE49" />
      {/* 5px -> 2px */}
      <path d={`M 0 4 H ${goalPostWidth} V 6 H 0 Z`} fill="#FEEFAE" />
      {/* 15px -> 6px */}
      <path d={`M 0 6 H ${goalPostWidth} V 12 H 0 Z`} fill="#F6B721" />
      <circle cx={0} cy={6} r={8} fill="#CBC15D" />
      <circle cx={goalPostWidth} cy={6} r={8} fill="#CBC15D" />
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
        baseY={-16}
        goalPostWidth={goalPostWidth}
        // path={-30}
        path={`M ${baseX - 7} ${-15} A 7 7 0 0 1 ${baseX + 7} ${-15} V 12 H ${baseX - 7} V ${-15} Z`}
        className={"stroke-sky-800"}
      />
      {/** Bottom Goalposts */}
      <GoalPost
        x={gpStart}
        y={height - y}
        baseX={baseX}
        baseY={29}
        goalPostWidth={goalPostWidth}
        // path={60}
        path={`M ${baseX - 7} ${28} V 0 H ${baseX + 7} V ${28} A 7 7 0 0 1 ${baseX - 7} ${28} Z`}
        className={"stroke-red-800"}
      />
    </g>
  );
}
