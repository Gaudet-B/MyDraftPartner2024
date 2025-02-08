export const RESULTS_TAB_COLORS = {
  dark: "bg-slate-950 bg-opacity-50",
  light: "bg-zinc-50 bg-opacity-50",
};

export const RESULTS_PAGE_COLORS = {
  dark: "bg-slate-700",
  light: "bg-zinc-300",
};

export const ROUND_OUT_COLORS = {
  dark: "bg-slate-900 bg-opacity-80",
  dark2: "bg-slate-800 bg-opacity-80",
  light: "bg-zinc-100 bg-opacity-80",
  light2: "bg-zinc-200 bg-opacity-80",
};

export function RoundInTab({
  direction,
  theme = "light",
}: {
  direction: "tr" | "br" | "bl" | "tl";
  theme?: "light" | "dark";
}) {
  const directionClass = {
    tr: "right-0 top-0",
    br: "right-0 bottom-0",
    bl: "left-0 bottom-0",
    tl: "left-0 top-0",
  };
  return (
    <div className="relative h-6 w-6">
      <div
        className={`absolute h-3 w-3 ${RESULTS_TAB_COLORS[theme]} ${directionClass[direction]}`}
      />
      <div
        className={`absolute h-6 w-6 rounded-full ${RESULTS_PAGE_COLORS[theme]} ${directionClass[direction]}`}
      />
    </div>
  );
}

export function RoundOutTab({
  direction,
  results,
  theme = "light",
}: {
  direction: "tr" | "br" | "bl" | "tl";
  results?: boolean;
  theme?: "light" | "dark";
}) {
  const directionClass = {
    tr: "right-0 top-0",
    br: "right-0 bottom-0",
    bl: "left-0 bottom-0",
    tl: "left-0 top-0",
  };
  const roundOutTheme = results
    ? (`${theme}2` as keyof typeof ROUND_OUT_COLORS)
    : theme;
  return (
    <div className="relative h-6 w-6 -translate-x-2">
      <div
        className={`absolute h-4 w-2 ${RESULTS_PAGE_COLORS[theme]} ${directionClass[direction]}`}
      />
      <div
        className={`absolute h-4 w-2 rounded-tr-full ${ROUND_OUT_COLORS[roundOutTheme]} ${directionClass[direction]}`}
      />
    </div>
  );
}
