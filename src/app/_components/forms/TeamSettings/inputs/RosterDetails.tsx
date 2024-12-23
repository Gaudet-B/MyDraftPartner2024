import {
  Roster,
  Position,
} from "~/app/dashboard/teams/_components/TeamInfo/info";
import { ROSTER_OPTIONS } from "../const";
import { Checkbox } from "@headlessui/react";
import { PropsWithChildren, useState } from "react";
import {
  backgroundColors,
  borderColors,
  textColors,
} from "@designsystem/colors";

type ToggleKey = "all" | Position;
export type MaxToggle = {
  [key in ToggleKey]: boolean;
};

function RosterGrid({
  children,
  editMode,
}: PropsWithChildren<{ editMode: boolean }>) {
  return (
    <div
      className={`max-w-4/5 grid ${editMode ? "grid-cols-5" : "grid-cols-3"} gap-[1px] font-mono`}
    >
      {children}
    </div>
  );
}

function PosHeader({
  editMode,
  styles,
}: {
  editMode: boolean;
  styles: { edit: string; read: string };
}) {
  return (
    <div
      className={`col-span-1 flex flex-col items-end ${editMode ? styles.edit : styles.read} ${textColors.lightSecondary} rounded-tl-lg px-2 font-semibold`}
    >
      <span>pos</span>
    </div>
  );
}

function StartersHeader({
  editMode,
  styles,
}: {
  editMode: boolean;
  styles: { edit: string; read: string };
}) {
  return (
    <div
      className={`${editMode ? `col-span-2 ${styles.edit}` : `col-span-1 ${styles.read}`} flex flex-col items-center font-semibold`}
    >
      <span>starters</span>
    </div>
  );
}

function MaxHeader({
  editMode,
  styles,
  togglePosMax,
  handleTogglePosMax,
}: {
  editMode: boolean;
  styles: { edit: string; read: string };
  togglePosMax: MaxToggle;
  handleTogglePosMax: (pos: ToggleKey, checked: boolean) => void;
}) {
  return (
    <div
      className={`${editMode ? `col-span-2 ${styles.edit}` : `col-span-1 ${styles.read}`} flex flex-col items-center rounded-tr-lg font-semibold`}
    >
      <div
        className={`flex w-full items-center ${editMode ? "justify-end" : "justify-center"} gap-7 px-3`}
      >
        <span>max</span>
        {editMode && (
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
        )}
      </div>
    </div>
  );
}

function PosCell({
  editMode,
  item,
  lastItem,
  cellStyles,
}: {
  editMode: boolean;
  item: keyof Roster;
  lastItem: boolean;
  cellStyles: { edit: string; read: string };
}) {
  return (
    <div
      className={`col-span-1 flex flex-col items-end ${editMode ? cellStyles.edit : cellStyles.read} font-semibold ${
        lastItem ? "rounded-bl-lg" : ""
      }`}
    >
      <div className={`px-2`}>
        <span>{item}</span>
      </div>
    </div>
  );
}

function CellValue({
  editMode,
  players,
  styles,
}: {
  editMode: boolean;
  players: number;
  styles: { bg: string; border: string };
}) {
  return (
    <div
      className={`h-7 w-7 p-[1px] font-semibold text-gray-800 ${
        players < 0 ? "" : styles.border
      }`}
    >
      <div
        className={`flex h-full w-full cursor-default items-center justify-center ${
          players < 0 && editMode
            ? "bg-sky-100 text-sky-200"
            : players < 0
              ? textColors.light
              : styles.bg
        }`}
      >
        <span>{players < 0 ? "-" : players}</span>
      </div>
    </div>
  );
}

function StartersCell({
  darkMode,
  editMode,
  item,
  starters,
  cellStyles,
  valueStyles,
  handleNumberChange,
}: {
  darkMode: boolean;
  editMode: boolean;
  item: keyof Roster;
  starters: number;
  cellStyles: { edit: string; read: string };
  valueStyles: {
    bg: { edit: string; read: string };
    border: { edit: string; read: string };
  };
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: -1 | 1,
  ) => void;
}) {
  return (
    <div
      className={`${editMode ? `col-span-2 ${cellStyles.edit}` : `col-span-1 ${cellStyles.read}`} flex flex-col items-center justify-center bg-opacity-50`}
      style={{ padding: "1px" }}
    >
      <div
        className={`flex flex-row items-center gap-1 rounded-lg bg-opacity-90 px-1`}
      >
        {editMode ? (
          <DetailControlButton
            item={item}
            change={-1}
            darkMode={darkMode}
            handleNumberChange={handleNumberChange}
            number={starters}
            category={"starters"}
          />
        ) : (
          <div />
        )}
        <CellValue
          editMode={editMode}
          players={starters}
          styles={
            editMode
              ? { bg: valueStyles.bg.edit, border: valueStyles.border.edit }
              : { bg: valueStyles.bg.read, border: valueStyles.border.read }
          }
        />
        {editMode ? (
          <DetailControlButton
            item={item}
            change={1}
            darkMode={darkMode}
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
  darkMode,
  editMode,
  item,
  lastItem,
  max,
  cellStyles,
  valueStyles,
  togglePosMax,
  handleNumberChange,
  handleTogglePosMax,
}: {
  darkMode: boolean;
  editMode: boolean;
  item: keyof Roster;
  lastItem: boolean;
  max: number;
  cellStyles: { edit: string; read: string };
  valueStyles: {
    bg: { edit: string; read: string };
    border: { edit: string; read: string };
  };
  togglePosMax: MaxToggle;
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: -1 | 1,
  ) => void;
  handleTogglePosMax: (pos: ToggleKey, checked: boolean) => void;
}) {
  const toggleOn = togglePosMax[item];

  return (
    <div
      className={`${editMode ? `col-span-2 ${cellStyles.edit}` : `col-span-1 ${cellStyles.read}`} flex flex-col items-center justify-center bg-opacity-50 ${
        lastItem ? "rounded-br-lg" : ""
      }`}
      style={{ padding: "1px" }}
    >
      <div className={`flex flex-row items-center gap-1 rounded-lg px-1`}>
        {editMode && togglePosMax[item] ? (
          <DetailControlButton
            item={item}
            change={-1}
            darkMode={darkMode}
            handleNumberChange={handleNumberChange}
            number={max}
            category={"max"}
          />
        ) : (
          <div />
        )}
        <CellValue
          editMode={editMode}
          players={toggleOn ? max : -1}
          styles={
            editMode
              ? { bg: valueStyles.bg.edit, border: valueStyles.border.edit }
              : { bg: valueStyles.bg.read, border: valueStyles.border.read }
          }
        />
        {editMode && togglePosMax[item] ? (
          <DetailControlButton
            item={item}
            change={1}
            darkMode={darkMode}
            handleNumberChange={handleNumberChange}
            number={max}
            category={"max"}
          />
        ) : (
          <div />
        )}
        {editMode && (
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
        )}
      </div>
    </div>
  );
}

function DetailControlButton({
  item,
  change,
  darkMode,
  handleNumberChange,
  number,
  category,
}: {
  item: keyof Roster;
  change: -1 | 1;
  darkMode: boolean;
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: -1 | 1,
  ) => void;
  number: number;
  category: "starters" | "max";
}) {
  const styles = {
    inactive: darkMode ? "text-sky-700 scale-75" : "text-sky-200 scale-75",
    active: darkMode
      ? "text-sky-200 scale-75 text-lg hover:scale-100 hover:text-sky-50"
      : "text-sky-900 scale-75 text-lg hover:scale-100 hover:text-sky-600",
  };
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
          number < 0 ? `cursor-default ${styles.inactive}` : styles.active
        }`}
      >
        {change === -1 ? "-" : "+"}
      </span>
    </div>
  );
}

function GridRow({
  darkMode,
  editMode,
  item,
  items,
  idx,
  max,
  starters,
  // rosterDetails,
  togglePosMax,
  handleNumberChange,
  handleTogglePosMax,
}: {
  darkMode: boolean;
  editMode: boolean;
  item: keyof Roster;
  items: number;
  idx: number;
  max: number;
  starters: number;
  // rosterDetails: Roster;
  togglePosMax: MaxToggle;
  handleNumberChange: (
    item: keyof Roster,
    category: "starters" | "max",
    change: -1 | 1,
  ) => void;
  handleTogglePosMax: (pos: ToggleKey, checked: boolean) => void;
}) {
  // const cellBackgroundStyle = editMode
  //   ? "bg-sky-900 z-10 text-white ring-2 ring-sky-300 ring-opacity-60"
  //   : "bg-white";

  // const cellBorderStlye = editMode
  //   ? "border-l border-r border-gray-400"
  //   : "border-l-2 border-r-2 border-gray-100";

  const lightStyles = {
    cell: {
      edit: `bg-sky-300 text-gray-700`,
      read: `${backgroundColors.lightAccent}`,
    },
    value: {
      bg: {
        edit: `bg-sky-900 z-10 text-white ring-2 ring-sky-300 ring-opacity-60`,
        read: `bg-white`,
      },
      border: {
        edit: `border-l border-r border-gray-400`,
        read: `border-l-2 border-r-2 border-gray-100`,
      },
    },
  };

  const darkStyles = {
    cell: {
      edit: `bg-sky-400 ${textColors.dark}`,
      read: `${backgroundColors.darkSecondary} ${textColors.lightSecondary}`,
    },
    value: {
      bg: {
        edit: `bg-sky-100 z-10 ring-2 ring-sky-700 ring-opacity-60 ${textColors.dark}`,
        read: `${backgroundColors.dark} ${textColors.light}`,
      },
      border: {
        edit: `border-l border-r border-gray-400`,
        read: `border-l-2 border-r-2 border-black`,
      },
    },
  };

  // console.log("rosterDetails", rosterDetails);
  return (
    <>
      {/* FIRST, add checkboxes to toggle the "max" column */}
      {/* NEXT, change the (max < 0 ) check to track the checkbox instead */}
      {/* THEN, init with value equal to "starters" */}
      {/** @TODO just this last one... */}
      {/* LAST, add tooltip mentioning league settings and suggesting useage as part of draft strategy */}
      <PosCell
        editMode={editMode}
        item={item}
        lastItem={idx === items - 1}
        cellStyles={darkMode ? darkStyles.cell : lightStyles.cell}
      />
      <StartersCell
        darkMode={darkMode}
        editMode={editMode}
        item={item}
        starters={starters}
        cellStyles={darkMode ? darkStyles.cell : lightStyles.cell}
        valueStyles={darkMode ? darkStyles.value : lightStyles.value}
        handleNumberChange={handleNumberChange}
      />
      <MaxCell
        darkMode={darkMode}
        editMode={editMode}
        item={item}
        lastItem={idx === items - 1}
        max={max}
        cellStyles={darkMode ? darkStyles.cell : lightStyles.cell}
        valueStyles={darkMode ? darkStyles.value : lightStyles.value}
        togglePosMax={togglePosMax}
        handleNumberChange={handleNumberChange}
        handleTogglePosMax={handleTogglePosMax}
      />
    </>
  );
}

export default function RosterDetails({
  darkMode,
  editMode,
  items,
  rosterDetails,
  handleNumberChange,
}: {
  darkMode: boolean;
  editMode: boolean;
  items: typeof ROSTER_OPTIONS;
  rosterDetails: Roster;
  handleNumberChange: (
    position: keyof Roster,
    starterOrMax: "starters" | "max",
    change: -1 | 1,
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

  const darkStyles = {
    edit: `bg-sky-800 ${textColors.lightSecondary}`,
    read: `${backgroundColors.lightSecondary} ${textColors.darkSecondary}`,
  };

  const lightStyles = {
    edit: `bg-sky-900 ${textColors.lightSecondary}`,
    read: `bg-zinc-400 ${textColors.lightSecondary}`,
  };

  return (
    <RosterGrid editMode={editMode}>
      <PosHeader
        editMode={editMode}
        styles={darkMode ? darkStyles : lightStyles}
      />
      <StartersHeader
        editMode={editMode}
        styles={darkMode ? darkStyles : lightStyles}
      />
      <MaxHeader
        editMode={editMode}
        styles={darkMode ? darkStyles : lightStyles}
        togglePosMax={togglePosMax}
        handleTogglePosMax={handleTogglePosMax}
      />
      {items.map((item, idx) => (
        <GridRow
          key={`roster-grid-row-${idx + 1}-${item}`}
          darkMode={darkMode}
          editMode={editMode}
          item={item}
          items={items.length}
          idx={idx}
          max={rosterDetails[item]?.max ?? rosterDetails[item]?.starters ?? -1}
          starters={
            item === "bench" ? -1 : (rosterDetails[item]?.starters ?? -1)
          }
          // rosterDetails={rosterDetails}
          togglePosMax={togglePosMax}
          handleNumberChange={handleNumberChange}
          handleTogglePosMax={handleTogglePosMax}
        />
      ))}
    </RosterGrid>
  );
}
