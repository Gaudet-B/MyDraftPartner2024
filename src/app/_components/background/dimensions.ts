// import { getFieldCoordinates } from "./SvgBuilder";

// const width = 1433 as const;
// const width = 630 as const;
const width = 468.4 as const;
// const height = 2100 as const;
// const height = 930 as const;
const height = 686.4 as const;
// const xPad = 143.3 as const; // 0.1 * width
// const xPad = 63 as const; // 0.1 * width
const xPad = 46.84 as const; // 0.1 * width
// const yPad = 105 as const; // 0.05 * height
// const yPad = 46.5 as const; // 0.05 * height
const yPad = 34.32 as const; // 0.05 * height
// const fieldWidth = 1146.4 as const; // width - 2 * xPad
// const fieldWidth = 504 as const; // width - 2 * xPad
const fieldWidth = 374.72 as const; // width - 2 * xPad
// const fieldHeight = 1890 as const; // height - 2 * yPad
// const fieldHeight = 837 as const; // height - 2 * yPad
const fieldHeight = 617.76 as const; // height - 2 * yPad
// const sectionHeight = 157.5 as const; // fieldHeight / (FIELD_SECTIONS + 2)
// const sectionHeight = 69.75 as const; // fieldHeight / (FIELD_SECTIONS + 2)
const sectionHeight = 51.48 as const; // fieldHeight / (FIELD_SECTIONS + 2)
// const hashSpacing = 31.5 as const; // sectionHeight / 5
// const hashSpacing = 13.95 as const; // sectionHeight / 5
const hashSpacing = 10.3 as const; // sectionHeight / 5

// end zones handled separately
export const FIELD_SECTIONS = 10 as const;
export const TWO_YD_MARKER = 45 as const;
export const HASH_LENGTH = 15 as const;
export const HASH_POSITIONS = [0, 0.2222222222, 0.74, 1] as const;
export const SVG_DIMENSIONS = {
  width,
  height,
  fieldWidth,
  fieldHeight,
  fieldCords: {
    x1: xPad,
    y1: yPad,
    x2: 421.56 as const, // xPad + fieldWidth
    y2: 652.08 as const, // yPad + fieldHeight
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

export function getDimensions(h: number) {
  // width (width) is 68.24% of height
  const w = h * 0.6824;
  // x padding (xPad) is 10% of width
  const x = 0.1 * w;
  // y padding (yPad) is 5% of height
  const y = 0.05 * h;
  // field width (fieldWidth) is `width - (2 * x padding)`
  const fw = w - 2 * x;
  // field height (fieldHeight) is `height - (2 * y padding)`
  const fh = h - 2 * y;
  // section height (sectionHeight) is `field height / (number of sections + 2)`
  const sh = fh / (FIELD_SECTIONS + 2);
  // hash spacing (hashSpacing) is `section height / 5`
  const hs = sh / 5;

  return {
    width: w,
    height: h,
    fieldWidth: fw,
    fieldHeight: fh,
    fieldCords: {
      x1: x,
      y1: y,
      x2: w - x,
      y2: h - y,
    },
    sectionCords: Array.from({ length: FIELD_SECTIONS }).map((_, i) => {
      const idx = i + 1;
      const start = idx * sh;
      return [
        start,
        [start + hs, start + hs * 2, start + hs * 3, start + hs * 4],
      ] as const;
    }),
    sectionHeight: sh,
    hashSpacing: hs,
  };
}
