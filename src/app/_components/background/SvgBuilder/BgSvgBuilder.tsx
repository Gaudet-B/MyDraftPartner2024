import {
  SVG_DIMENSIONS,
  Dimensions,
  FIELD_SECTIONS,
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
// import * as d3 from "d3";
// import { zoom } from "d3";

// const FIELD_SECTIONS = 10 as const;

// const BACKGROUND_COLOR = "#4F8918" as const;
// const BACKGROUND_COLOR = "#374151" as const;
const BACKGROUND_COLOR = "none" as const;

// function transform(t: number) {
//   const start = [200, 500, 4] as [number, number, number];
//   const end = [50, 200, 1] as [number, number, number];

//   const interpolator = d3.interpolateZoom(start, end);

//   const view = interpolator(t);

//   const w = 1433;
//   const h = 2100;
//   /** @TODO swap next two lines and programatically determine 'k' */
//   const k = 4;
//   // const k = Math.min(w, h) / view[2]; // scale
//   const translate = [w / 2 - view[0] * k, h / 2 - view[1] * k]; // translate

//   return `translate(${translate}) scale(${k})`;
// }

// export function getFieldCoordinates(height: number) {
//   const width = height * 0.68;
//   const xPad = 0.1 * width;
//   const yPad = 0.05 * height;
//   const fieldWidth = width - 2 * xPad;
//   const fieldHeight = height - 2 * yPad;
//   const fieldCords = {
//     x1: xPad,
//     y1: yPad,
//     x2: xPad + fieldWidth,
//     y2: yPad + fieldHeight,
//   };

//   // add the end zones back in
//   const sections = FIELD_SECTIONS + 2;
//   const sectionHeight = fieldHeight / sections;
//   const hashSpacing = sectionHeight / 5;

//   const sectionCords = Array.from({ length: FIELD_SECTIONS }).map((_, i) => {
//     const idx = i + 1;
//     const start = idx * sectionHeight;
//     return [
//       start,
//       [
//         start + hashSpacing,
//         start + hashSpacing * 2,
//         start + hashSpacing * 3,
//         start + hashSpacing * 4,
//       ],
//     ] as const;
//   });

//   return {
//     width,
//     height,
//     fieldCords,
//     fieldWidth,
//     fieldHeight,
//     sectionCords,
//     sectionHeight,
//     hashSpacing,
//   };
// }

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
  // dimensions,
  showSvg,
  svgRef,
  baseScale,
  // bgColor = "none",
  // dimensions = DEFAULT_DIMENSIONS,
}: {
  // dimensions: { width: number; height: number };
  showSvg: boolean;
  svgRef: React.RefObject<Element>;
  baseScale?: number;
  // bgColor?: string;
  // dimensions?: Dimensions;
}) {
  const {
    // width: dWidth,
    width,
    height,
    fieldWidth,
    fieldHeight,
    fieldCords,
    sectionHeight,
    sectionCords,
  } = SVG_DIMENSIONS;

  // const width = height * 0.68;

  // const scale = height / dimensions.height;
  // console.log(scale);

  const { x1, y1 } = fieldCords;

  // const goalPostWidth = fieldWidth * 0.3333;
  // const gpStart = width / 2 - goalPostWidth / 2;
  // const gpEnd = gpStart + goalPostWidth;

  return (
    <SVG
      // <svg
      baseScale={baseScale}
      showSvg={showSvg}
      svgRef={svgRef as React.RefObject<SVGSVGElement>}
      // id={"MDP-field-image"}
      // xmlns="http://www.w3.org/2000/svg"
      width={width}
      // width={height * 0.68}
      height={height}
      // transform={`scale(${baseScale})`}
      // transform={`translate(0, ${-height / 4}) scale(${baseScale})`}
      // transform={`translate(${-100},${-700}) scale(0.6)`}
      // transform={`translate(${200},${500}) scale(4)`}
      // transform={transform(t)}
      // className="transition-all duration-[1000ms] ease-out"
    >
      {/* Green Background */}
      <path d={`M 0 0 H ${width} V ${height} H 0 Z`} fill={BACKGROUND_COLOR} />

      {/* Lines */}
      <FieldLines
        svgRef={svgRef as React.RefObject<SVGSVGElement>}
        x={x1}
        y={y1}
      >
        {/* End Zones */}
        <EndZones fieldWidth={fieldWidth} sectionHeight={sectionHeight} />

        {/* Yard Lines */}
        <YardLines>
          {sectionCords.map(([start, hashes], i) => {
            const leftNum = getYdNumber(i + 1);
            const rightNum = getYdNumber(i);
            return (
              <FieldSection
                key={`field-section-${i}`}
                // bgColor={bgColor}
                fieldWidth={fieldWidth}
                sectionHeight={sectionHeight}
                start={start}
                i={i}
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
                />
              </FieldSection>
            );
          })}
        </YardLines>

        {/* Midfield */}
        <Midfield y={fieldHeight / 2} x={fieldWidth / 2} />

        {/* Sidelines */}
        <Sidelines fieldWidth={fieldWidth} fieldHeight={fieldHeight} />
      </FieldLines>

      {/* Goal Posts */}
      {/* <GoalPosts
        goalPostWidth={goalPostWidth}
        gpStart={gpStart}
        height={height}
        y={y1}
      /> */}
      {/* </svg> */}
    </SVG>
  );
}
