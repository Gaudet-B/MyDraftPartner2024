import { PropsWithChildren } from "react";
import Spinner from "@designsystem/loading/Spinner";

function InnerColumn({ children }: PropsWithChildren) {
  return <div className="">{children}</div>;
}

function RightSideColumn({
  children,
  height,
}: PropsWithChildren<{ height: "h-[90%]" | "h-[88%]" | "h-full" }>) {
  return (
    <div className={`${height} w-4 border-r-[12px] border-zinc-100`}>
      {children}
    </div>
  );
}

function TopBorder() {
  return (
    <div className="h-2 w-1/2 -translate-y-2 translate-x-3.5 rounded-tr-lg border-t-8 border-zinc-100" />
  );
}

function BottomBorder({ fullWidth }: { fullWidth?: boolean }) {
  return (
    <div
      className={`h-2 ${fullWidth ? "w-full" : "w-1/2"} -translate-y-2.5 translate-x-[15px] rounded-br-lg border-b-8 border-zinc-100`}
    />
  );
}

function OuterBorder({
  children,
  fullTopBorder,
  height,
  rightHeight,
}: PropsWithChildren<{
  fullTopBorder?: boolean;
  height: string;
  rightHeight: "h-[90%]" | "h-[88%]" | "h-full";
}>) {
  return (
    <div
      className={`flex ${height} w-14 justify-end rounded-br-lg rounded-tr-lg ${fullTopBorder && "border-t-[12px]"} border-zinc-100`}
    >
      <div className="flex h-full w-full flex-col items-end">{children}</div>
      <RightSideColumn height={rightHeight} />
    </div>
  );
}

function MockSection({ fullTopBorder }: { fullTopBorder?: boolean }) {
  return (
    <>
      <OuterBorder
        height="h-[380px]"
        rightHeight={"h-[90%]"}
        fullTopBorder={fullTopBorder}
      >
        <TopBorder />
        <div
          className={`h-5 ${fullTopBorder ? "w-[115%]" : "w-3"} -translate-y-2.5 translate-x-1.5 rounded-tr-lg bg-zinc-300`}
        />
        <div className="h-full w-3 -translate-y-2.5 translate-x-1.5 bg-zinc-300" />
        <div className="h-4 w-3 -translate-y-2.5 translate-x-1.5 rounded-br-lg bg-zinc-300" />
      </OuterBorder>
      <div className="-translate-x-[15px] -translate-y-7">
        <BottomBorder fullWidth />
      </div>
    </>
  );
}

function MockStarters() {
  return (
    <div className="flex h-full w-full flex-col items-end">
      <div className="h-4 w-[115%] -translate-y-1 translate-x-1.5 rounded-tr-lg bg-zinc-300" />
      <div className="h-full w-2 -translate-y-1 translate-x-1.5 bg-zinc-300" />
      <div className="h-4 w-2 -translate-y-1 translate-x-1.5 rounded-br-lg bg-zinc-300" />
      <div className="h-4 w-1/3 -translate-y-1.5 translate-x-2 bg-zinc-100" />
    </div>
  );
}

function MockBench() {
  return (
    <div className="flex h-full w-full flex-col items-end">
      <div className="h-4 w-3 -translate-y-2 translate-x-1.5 rounded-tr-lg bg-zinc-300" />
      <div className="h-full w-3 -translate-y-2 translate-x-1.5 bg-zinc-300" />
      <div className="h-6 w-3 -translate-y-2 translate-x-1.5 rounded-br-lg bg-zinc-300" />
      {/* <div className="h-4 w-1/2 -translate-y-2.5 translate-x-1.5 bg-zinc-100" /> */}
    </div>
  );
}

function MockSummary() {
  return (
    <div className="absolute pt-2">
      <OuterBorder height="h-44" fullTopBorder rightHeight={"h-[90%]"}>
        <MockStarters />
        <MockBench />
        <BottomBorder />
      </OuterBorder>
    </div>
  );
}

function MockRdByRd() {
  return (
    <div className="absolute translate-y-44 py-4">
      <MockSection />
    </div>
  );
}

function MockProjectedRoster() {
  return (
    // was originally [472px]
    <div className="absolute translate-y-[546px] py-4">
      <MockSection fullTopBorder />
    </div>
  );
}

function MockFullSection({ children, h }: PropsWithChildren<{ h: string }>) {
  return (
    <div
      className={`flex flex-col gap-2 ${h} w-[546px] justify-stretch rounded-lg bg-zinc-100 p-2`}
    >
      {children}
    </div>
  );
}

function MockCell({
  bg,
  w,
}: {
  bg: "bg-zinc-200" | "bg-zinc-300";
  w: "w-[112px]" | "w-[410px]";
}) {
  return (
    <>
      <div className={`h-full ${bg} ${w}`} />
      {/* <Loading /> */}
    </>
  );
}

function Loading({
  x,
  h,
  size,
}: {
  x: string;
  h: string;
  size: "small" | "medium";
}) {
  return (
    <div className={`absolute flex ${h} ${x} items-center justify-center`}>
      <Spinner size={size} color="light-secondary" />
    </div>
  );
}

function Mask({ h, y }: { h: string; y?: string }) {
  return (
    <div
      className={`absolute inset-x-0 inset-y-3 z-10 rounded-lg bg-black/15 ${h} ${y || ""}`}
    />
  );
}

function MockInnerRow({ h }: { h: string }) {
  return (
    <div className={`flex grow items-stretch gap-2 ${h}`}>
      <MockCell bg="bg-zinc-300" w="w-[112px]" />
      <Loading x="translate-x-12" h={h} size="small" />
      <MockCell bg="bg-zinc-200" w="w-[410px]" />
      <Loading x="translate-x-72" h={h} size="medium" />
    </div>
  );
}

function ExpandedSummary() {
  return (
    <MockFullSection h="h-[180px]">
      {/* <Mask h={"h-[180px]"} /> */}
      <MockInnerRow h="h-[88px]" />
      <MockInnerRow h="h-[68px]" />
      {/* <Loading /> */}
    </MockFullSection>
  );
}

function ExpandedRdByRd() {
  return (
    <MockFullSection h="h-[380px]">
      {/* <Mask h={"h-[380px]"} y="translate-y-[196px]" /> */}
      <MockInnerRow h="h-[364px]" />
      {/* <MockInnerRow h="h-[68px]" /> */}
    </MockFullSection>
  );
}

function ExpandedProjectedRoster() {
  return (
    <MockFullSection h="h-[368px]">
      {/* <Mask h={"h-[368px]"} y="translate-y-[592px]" /> */}
      <MockInnerRow h="h-[352px]" />
    </MockFullSection>
  );
}

export function HiddenResults() {
  return (
    <>
      <MockSummary />
      <MockRdByRd />
      <MockProjectedRoster />
    </>
  );
}

export function ShowResults() {
  return (
    <div className="absolute right-3 flex flex-col gap-4 pt-3">
      <ExpandedSummary />
      <ExpandedRdByRd />
      <ExpandedProjectedRoster />
    </div>
  );
}
