import React from "react";
import { PropsWithChildren } from "react";
import transition from "../class-names/transition";

function FixedWidthContainer({
  children,
  className,
  width,
}: PropsWithChildren<{ className?: string; width?: string }>) {
  return (
    <div
      className={`h-full overflow-x-hidden ${transition.slow} ${className} ${width}`}
    >
      {children}
    </div>
  );
}

const MemoizedFixedWidthContainer = React.memo(
  FixedWidthContainer,
  (prev, next) => prev.width === next.width,
);

export default MemoizedFixedWidthContainer;
