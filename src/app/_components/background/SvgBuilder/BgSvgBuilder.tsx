import { useMemo } from "react";
import {
  Dimensions,
  getDimensions,
  SVG_DIMENSIONS,
  TWO_YD_MARKER,
} from "../dimensions";
import {
  EndZones,
  FieldLines,
  FieldNumbers,
  FieldSection,
  GoalPosts,
  HashLines,
  Midfield,
  Sidelines,
  SVG,
  YardLines,
} from "./sections";
const BACKGROUND_COLOR = "none" as const;
// const BACKGROUND_COLOR = "#4F8918" as const;

export type YdNumber = [0, 1, 2, 3, 4, 5][number];
export function getYdNumber(i: number): YdNumber {
  switch (i) {
    case 6:
      return 4;
    case 7:
      return 3;
    case 8:
      return 2;
    case 9:
      return 1;
    default:
      return i as YdNumber;
  }
}

export function get2YdMarker(i: number, j: number, w: number) {
  let is2Yd = false;
  if (i === 0 && j === 0) is2Yd = true;
  if (i === 9 && j === 3) is2Yd = true;
  const mid = w / 2;
  const half = TWO_YD_MARKER / 2;
  return [is2Yd, mid - half, mid + half] as const;
}

export function BgSvgBuilder({
  progressBar,
  showSvg,
  svgRef,
  baseScale,
  dimensions = SVG_DIMENSIONS,
  hasGoalPosts = true,
  hasEndZones = true,
  hasColors = true,
  hasBlackLines = false,
}: {
  progressBar: boolean;
  showSvg: boolean;
  svgRef: React.RefObject<SVGElement>;
  baseScale?: number;
  dimensions?: Dimensions;
  hasGoalPosts?: boolean;
  hasEndZones?: boolean;
  hasColors?: boolean;
  hasBlackLines?: boolean;
}) {
  const {
    width,
    height,
    fieldWidth,
    fieldHeight,
    fieldCords,
    sectionHeight,
    sectionCords,
  } = dimensions;

  const { x1, y1 } = fieldCords;

  const goalPostWidth = fieldWidth * 0.3333;
  const gpStart = width / 2 - goalPostWidth / 2;

  return (
    <SVG
      baseScale={baseScale}
      progressBar={progressBar}
      showSvg={showSvg}
      svgRef={svgRef as React.RefObject<SVGSVGElement>}
      width={width}
      height={height}
    >
      {/* Green Background */}
      <path d={`M 0 0 H ${width} V ${height} H 0 Z`} fill={BACKGROUND_COLOR} />

      {/* Lines */}
      <FieldLines x={x1} y={y1}>
        {/* End Zones */}
        {hasEndZones && (
          <EndZones
            fieldWidth={fieldWidth}
            sectionHeight={sectionHeight}
            hasColors={hasColors}
            hasBlackLines={hasBlackLines}
          />
        )}

        {/* Yard Lines */}
        <YardLines hasBlackLines={hasBlackLines}>
          {sectionCords.map(([start, hashes], i) => {
            const leftNum = getYdNumber(i + 1);
            const rightNum = getYdNumber(i);
            return (
              <FieldSection
                key={`field-section-${i}`}
                fieldWidth={fieldWidth}
                sectionHeight={sectionHeight}
                start={start}
                i={i}
                hasColors={hasColors}
              >
                {/* Hash Lines */}
                {hashes.map((hash, j) => (
                  <HashLines fieldWidth={fieldWidth} hash={hash} i={i} j={j} />
                ))}

                {/* Numbers */}
                <FieldNumbers
                  fieldHeight={fieldHeight}
                  fieldWidth={fieldWidth}
                  start={start}
                  i={i}
                  leftNum={leftNum}
                  rightNum={rightNum}
                  blackNums={hasBlackLines}
                />
              </FieldSection>
            );
          })}
        </YardLines>

        {/* Midfield */}
        <Midfield
          y={fieldHeight / 2}
          x={fieldWidth / 2}
          hasBlackLines={hasBlackLines}
        />

        {/* Sidelines */}
        <Sidelines
          fieldWidth={fieldWidth}
          fieldHeight={fieldHeight}
          blackLines={hasBlackLines}
        />
      </FieldLines>

      {/* Goal Posts */}
      {hasGoalPosts && hasColors && (
        <GoalPosts
          goalPostWidth={goalPostWidth}
          gpStart={gpStart}
          height={height}
          y={y1}
        />
      )}
    </SVG>
  );
}
