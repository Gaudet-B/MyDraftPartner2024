const COLOR_MAP = {
  white: "stroke-white",
  black: "stroke-black",
  light: "stroke-zinc-200",
  dark: "stroke-zinc-800",
  "light-secondary": "stroke-zinc-400",
  "dark-secondary": "stroke-zinc-600",
};

// Convert border colors to background colors
const BG_COLOR_MAP = {
  white: "bg-white",
  black: "bg-black",
  light: "bg-zinc-200",
  dark: "bg-zinc-800",
  "light-secondary": "bg-zinc-400",
  "dark-secondary": "bg-zinc-600",
};

export default function Spinner({
  size,
  color,
}: {
  size: "small" | "medium" | "large";
  color:
    | "white"
    | "black"
    | "light"
    | "dark"
    | "light-secondary"
    | "dark-secondary";
}) {
  const sizes = {
    small: { size: 16, strokeWidth: 2 },
    medium: { size: 24, strokeWidth: 3 },
    large: { size: 32, strokeWidth: 4 },
  };

  const { size: pxSize, strokeWidth } = sizes[size];
  const center = pxSize / 2;
  const radius = (pxSize - strokeWidth) / 2;

  return (
    <div className="inline-block" role="status">
      <svg
        width={pxSize}
        height={pxSize}
        viewBox={`0 0 ${pxSize} ${pxSize}`}
        fill="none"
        className={`animate-spin ${COLOR_MAP[color]}`}
      >
        {/* Top arc */}
        <path
          d={`M${center} ${strokeWidth / 2} A${radius} ${radius} 0 0 1 ${pxSize - strokeWidth / 2} ${center}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Left arc */}
        <path
          d={`M${strokeWidth / 2} ${center} A${radius} ${radius} 0 0 1 ${center} ${strokeWidth / 2}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Bottom arc */}
        <path
          d={`M${center} ${pxSize - strokeWidth / 2} A${radius} ${radius} 0 0 1 ${strokeWidth / 2} ${center}`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
}
