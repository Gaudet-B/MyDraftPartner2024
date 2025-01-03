export const NUM_OF_TEAMS = [8, 10, 12, 14, 16] as const;
export const PPR_OPTIONS = ["NO", "0.5", "1.0"] as const;
export const SUPERFLEX_OPTIONS = ["NO", "YES"] as const;

export const ROSTER_OPTIONS = [
  "qb",
  "rb",
  "wr",
  "te",
  "flex",
  "dst",
  "k",
  "bench",
] as const;

export const DEFAULT_ROSTER_SETTINGS = {
  qb: { starters: 1, max: 2 },
  rb: { starters: 2, max: 6 },
  wr: { starters: 2, max: 6 },
  te: { starters: 1, max: 2 },
  flex: { starters: 1 },
  dst: { starters: 1, max: 1 },
  k: { starters: 1, max: 1 },
  bench: { max: 6 },
};
