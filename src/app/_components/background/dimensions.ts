// import { getFieldCoordinates } from "./SvgBuilder";

const width = 1433 as const;
// const width = 630 as const;
const height = 2100 as const;
// const height = 930 as const;
const xPad = 143.3 as const; // 0.1 * width
// const xPad = 63 as const; // 0.1 * width
const yPad = 105 as const; // 0.05 * height
// const yPad = 46.5 as const; // 0.05 * height
const fieldWidth = 1146.4 as const; // width - 2 * xPad
// const fieldWidth = 504 as const; // width - 2 * xPad
const fieldHeight = 1890 as const; // height - 2 * yPad
// const fieldHeight = 837 as const; // height - 2 * yPad
const sectionHeight = 157.5 as const; // fieldHeight / (FIELD_SECTIONS + 2)
// const sectionHeight = 69.75 as const; // fieldHeight / (FIELD_SECTIONS + 2)
const hashSpacing = 31.5 as const; // sectionHeight / 5
// const hashSpacing = 13.95 as const; // sectionHeight / 5

// end zones handled separately
export const FIELD_SECTIONS = 10 as const;
export const TWO_YD_MARKER = 72 as const;
export const HASH_LENGTH = 24 as const;
export const HASH_POSITIONS = [0, 0.2222222222, 0.7777777778, 1] as const;
export const SVG_DIMENSIONS = {
  width,
  height,
  fieldWidth,
  fieldHeight,
  fieldCords: {
    x1: xPad,
    y1: yPad,
    x2: 1289.7 as const, // xPad + fieldWidth
    y2: 2152.5 as const, // yPad + fieldHeight
  },
  // sectionCords: getFieldCoordinates(height).sectionCords,
  sectionCords: Array.from({ length: FIELD_SECTIONS }).map((_, i) => {
    const idx = i + 1;
    const start = idx * sectionHeight;
    return [
      start,
      [
        start + hashSpacing,
        start + hashSpacing * 2,
        start + hashSpacing * 3,
        start + hashSpacing * 4,
      ],
    ] as const;
  }),
  sectionHeight,
  hashSpacing,
} as const;

export type Coordinates = readonly [
  number,
  readonly [number, number, number, number],
];

// const sectionCords = Array.from({ length: FIELD_SECTIONS }).map((_, i) => {
//   const idx = i + 1;
//   const start = idx * sectionHeight;
//   return [
//     start,
//     [
//       start + hashSpacing,
//       start + hashSpacing * 2,
//       start + hashSpacing * 3,
//       start + hashSpacing * 4,
//     ],
//   ] as const;
// });

export type Dimensions = {
  width: number;
  height: number;
  fieldWidth: number;
  fieldHeight: number;
  fieldCords: { x1: number; y1: number; x2: number; y2: number };
  sectionCords: Array<Coordinates>;
  sectionHeight: number;
  hashSpacing: number;
};
