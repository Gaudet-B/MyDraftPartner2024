import {
  Roster,
  Position,
} from "~/app/dashboard/teams/_components/TeamInfo/info";
import { ROSTER_OPTIONS } from "../const";
import { Checkbox } from "@headlessui/react";
import { useState } from "react";
import {
  backgroundColors,
  borderColors,
} from "~/app/_components/design-system/colors";

type ToggleKey = "all" | Position;
export type MaxToggle = {
  [key in ToggleKey]: boolean;
};

function RosterGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className={`max-w-4/5 grid grid-cols-5 gap-[1px] font-mono`}>
      {children}
    </div>
  );
}

function PosHeader() {
  return (
    <div
      className={`col-span-1 flex flex-col items-end rounded-tl-lg bg-sky-300 bg-opacity-70 px-2 font-semibold text-gray-700`}
    >
      <span>pos</span>
    </div>
  );
}

function StartersHeader() {
  return (
    <div
      className={`col-span-2 flex flex-col items-center bg-sky-300 bg-opacity-70 font-semibold text-gray-700`}
    >
      <span>starters</span>
    </div>
  );
}

function MaxHeader({
  togglePosMax,
  handleTogglePosMax,
}: {
  togglePosMax: MaxToggle;
  handleTogglePosMax: (pos: ToggleKey, checked: boolean) => void;
}) {
  return (
    <div
      className={`col-span-2 flex flex-col items-center rounded-tr-lg bg-sky-300 bg-opacity-70 font-semibold text-gray-700`}
    >
      <div className="flex w-full items-center justify-end gap-7 px-3">
        <span>max</span>
        <Checkbox
          checked={togglePosMax.all}
          onChange={(c) => handleTogglePosMax("all", c)}
          className={`group h-5 w-5 rounded border-2 ${borderColors.lightSecondary} ${backgroundColors.light} data-[checked]:bg-sky-400`}
        >
          <svg
            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
      </div>
    </div>
  );
}

function PosCell({
  item,
  lastItem,
}: {
  item: keyof Roster;
  lastItem: boolean;
}) {
  return (
    <div
      className={`col-span-1 flex flex-col items-end bg-sky-100 bg-opacity-100 font-semibold text-gray-700 ${
        lastItem ? "rounded-bl-lg" : ""
      }`}
    >
      <div className={`px-2`}>
        <span>{item}</span>
      </div>
    </div>
  );
}

function StartersCell({
  editMode,
  item,
  starters,
  styles,
  handleNumberChange,
}: {
  editMode: boolean;
  item: keyof Roster;
  starters: number;
  styles: { bg: string; border: string };
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: number,
  ) => void;
}) {
  return (
    <div
      className={`col-span-2 flex flex-col items-center justify-center bg-sky-100 bg-opacity-100`}
      style={{ padding: "1px" }}
    >
      <div
        className={`flex flex-row items-center gap-1 rounded-lg bg-opacity-90 px-1`}
      >
        {editMode ? (
          <DetailControlButton
            item={item}
            change={-1}
            handleNumberChange={handleNumberChange}
            number={starters}
            category={"starters"}
          />
        ) : (
          <div></div>
        )}
        <div
          className={`h-7 w-7 ${
            starters < 0 ? "" : styles.border
          } font-semibold text-gray-800`}
          style={{ padding: "1px" }}
        >
          <div
            className={`flex h-full w-full items-center justify-center ${
              starters < 0 ? "bg-sky-100 text-sky-200" : styles.bg
            } cursor-default`}
          >
            <span>{starters < 0 ? "-" : starters}</span>
          </div>
        </div>
        {editMode ? (
          <DetailControlButton
            item={item}
            change={1}
            handleNumberChange={handleNumberChange}
            number={starters}
            category={"starters"}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

function MaxCell({
  editMode,
  item,
  lastItem,
  max,
  styles,
  togglePosMax,
  handleNumberChange,
  handleTogglePosMax,
}: {
  editMode: boolean;
  item: keyof Roster;
  lastItem: boolean;
  max: number;
  styles: { bg: string; border: string };
  togglePosMax: MaxToggle;
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: number,
  ) => void;
  handleTogglePosMax: (pos: ToggleKey, checked: boolean) => void;
}) {
  const toggleOn = togglePosMax[item];

  return (
    <div
      className={`col-span-2 flex flex-col items-center justify-center bg-sky-100 bg-opacity-100 ${
        lastItem ? "rounded-br-lg" : ""
      }`}
      style={{ padding: "1px" }}
    >
      <div className={`flex flex-row items-center gap-1 rounded-lg px-1`}>
        {editMode && togglePosMax[item] ? (
          <DetailControlButton
            item={item}
            change={-1}
            handleNumberChange={handleNumberChange}
            number={max}
            category={"max"}
          />
        ) : (
          <div className="w-5" />
        )}
        <div
          className={`h-7 w-7 ${
            toggleOn ? styles.border : ""
          } font-semibold text-gray-800`}
          style={{ padding: "1px" }}
        >
          <div
            className={`flex h-full w-full items-center justify-center ${
              toggleOn ? styles.bg : "bg-sky-100 text-sky-200"
            } cursor-default`}
          >
            <span>{toggleOn ? max : "-"}</span>
          </div>
        </div>
        {editMode && togglePosMax[item] ? (
          <DetailControlButton
            item={item}
            change={1}
            handleNumberChange={handleNumberChange}
            number={max}
            category={"max"}
          />
        ) : (
          <div className="w-5" />
        )}
        <Checkbox
          checked={togglePosMax[item]}
          onChange={(c) => handleTogglePosMax(item, c)}
          className={`group h-5 w-5 rounded border-2 ${borderColors.lightSecondary} ${backgroundColors.light} data-[checked]:bg-sky-200`}
          disabled={item === "bench"}
        >
          <svg
            className="stroke-white opacity-0 group-data-[checked]:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 8L6 11L11 3.5"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Checkbox>
      </div>
    </div>
  );
}

function DetailControlButton({
  item,
  change,
  handleNumberChange,
  number,
  category,
}: {
  item: keyof Roster;
  change: number;
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: number,
  ) => void;
  number: number;
  category: "starters" | "max";
}) {
  return (
    <div
      onClick={
        number < 0
          ? (e) => e.preventDefault
          : () => handleNumberChange(item, category, change)
      }
      className={`flex h-3 w-5 cursor-pointer flex-col items-center justify-center rounded-lg font-semibold`}
    >
      <span
        className={`flex h-3 w-5 flex-col items-center justify-center ${
          number < 0
            ? "cursor-default text-sky-200"
            : "text-sky-900 hover:text-sky-600"
        }`}
      >
        {change === -1 ? "-" : "+"}
      </span>
    </div>
  );
}

export default function RosterDetails({
  items,
  rosterDetails,
  editMode,
  handleNumberChange,
}: {
  items: typeof ROSTER_OPTIONS;
  rosterDetails: Roster;
  editMode: boolean;
  handleNumberChange: (
    position: keyof Roster,
    starterOrMax: "starters" | "max",
    value: number,
  ) => void;
}) {
  const [togglePosMax, setTogglePosMax] = useState<MaxToggle>({
    all: false,
    qb: false,
    rb: false,
    wr: false,
    te: false,
    flex: false,
    dst: false,
    k: false,
    bench: true as const,
  });

  const backgroundStyle = editMode
    ? "bg-sky-900 z-10 text-white ring-2 ring-sky-300 ring-opacity-60"
    : "bg-white";

  const borderStlye = editMode
    ? "border-l border-r border-gray-400"
    : "border-l-2 border-r-2 border-gray-100";

  const handleTogglePosMax = (pos: ToggleKey, checked: boolean) => {
    if (pos === "all") {
      setTogglePosMax({
        all: checked,
        qb: checked,
        rb: checked,
        wr: checked,
        te: checked,
        flex: checked,
        dst: checked,
        k: checked,
        bench: true,
      });
    } else {
      setTogglePosMax({ ...togglePosMax, [pos]: checked });
    }
  };

  return (
    <RosterGrid>
      <PosHeader />
      <StartersHeader />
      <MaxHeader
        togglePosMax={togglePosMax}
        handleTogglePosMax={handleTogglePosMax}
      />

      {items.map((item, idx) => {
        const starters =
          item === "bench" ? -1 : rosterDetails[item]?.starters || -1;

        const max = rosterDetails[item]?.max || starters;

        return (
          <>
            {/* FIRST, add checkboxes to toggle the "max" column */}
            {/* NEXT, change the (max < 0 ) check to track the checkbox instead */}
            {/* THEN, init with value equal to "starters" */}
            {/** @TODO just this last one... */}
            {/* LAST, add tooltip mentioning league settings and suggesting useage as part of draft strategy */}
            <PosCell item={item} lastItem={idx === items.length - 1} />
            <StartersCell
              editMode={editMode}
              item={item}
              starters={starters}
              styles={{ bg: backgroundStyle, border: borderStlye }}
              handleNumberChange={handleNumberChange}
            />
            <MaxCell
              editMode={editMode}
              item={item}
              lastItem={idx === items.length - 1}
              max={max}
              styles={{ bg: backgroundStyle, border: borderStlye }}
              togglePosMax={togglePosMax}
              handleNumberChange={handleNumberChange}
              handleTogglePosMax={handleTogglePosMax}
            />
          </>
        );
      })}
    </RosterGrid>
  );
}
