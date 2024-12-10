import { Roster } from "~/app/dashboard/teams/_components/TeamInfo/info";
import { ROSTER_OPTIONS } from "../const";

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
  // items: Array<keyof Roster>;
  items: typeof ROSTER_OPTIONS;
  rosterDetails: Roster;
  editMode: boolean;
  handleNumberChange: (
    position: keyof Roster,
    starterOrMax: "starters" | "max",
    value: number,
  ) => void;
}) {
  const backgroundStyle = editMode
    ? "bg-sky-900 z-10 text-white ring-2 ring-sky-300 ring-opacity-60"
    : "bg-white";
  const borderStlye = editMode
    ? "border-l border-r border-gray-400"
    : "border-l-2 border-r-2 border-gray-100";
  return (
    <div
      className={`font-mono`}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 2fr",
        gap: "1px",
        maxWidth: "80%",
      }}
    >
      <div
        className={`flex flex-col items-end rounded-tl-lg bg-sky-300 bg-opacity-70 px-2 font-semibold text-gray-700`}
      >
        <span>pos</span>
      </div>
      <div
        className={`flex flex-col items-center bg-sky-300 bg-opacity-70 font-semibold text-gray-700`}
      >
        <span>starters</span>
      </div>
      <div
        className={`flex flex-col items-center rounded-tr-lg bg-sky-300 bg-opacity-70 font-semibold text-gray-700`}
      >
        <span>max</span>
      </div>
      {items.map((item, idx) => {
        const starters =
          item === "bench" ? -1 : rosterDetails[item]?.starters || -1;
        const max = item === "flex" ? -1 : rosterDetails[item]?.max || -1;
        return (
          <>
            <div
              className={`flex flex-col items-end bg-sky-100 bg-opacity-100 font-semibold text-gray-700 ${
                idx === items.length - 1 ? "rounded-bl-lg" : ""
              }`}
            >
              <div className={`px-2`}>
                <span>{item}</span>
              </div>
            </div>
            <div
              className={`flex flex-col items-center justify-center bg-sky-100 bg-opacity-100`}
              style={{ padding: "1px" }}
            >
              <div
                className={`flex flex-row items-center gap-1 rounded-lg bg-opacity-90 px-1`}
              >
                {/* FIRST, MAKE THESE (-) AND (+) BUTTONS INTO REUSEABLE FUNCTIONS */}
                {/* NEXT, ONLY RENDER THEM WHEN IN "EDIT MODE" */}
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
                    starters < 0 ? "" : borderStlye
                  } font-semibold text-gray-800`}
                  style={{ padding: "1px" }}
                >
                  <div
                    className={`flex h-full w-full items-center justify-center ${
                      starters < 0 ? "bg-sky-100 text-sky-200" : backgroundStyle
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
            <div
              className={`flex flex-col items-center justify-center bg-sky-100 bg-opacity-100 ${
                idx === items.length - 1 ? "rounded-br-lg" : ""
              }`}
              style={{ padding: "1px" }}
            >
              <div
                className={`flex flex-row items-center gap-1 rounded-lg px-1`}
              >
                {editMode ? (
                  <DetailControlButton
                    item={item}
                    change={-1}
                    handleNumberChange={handleNumberChange}
                    number={max}
                    category={"max"}
                  />
                ) : (
                  <div></div>
                )}
                <div
                  className={`h-7 w-7 ${
                    max < 0 ? "" : borderStlye
                  } font-semibold text-gray-800`}
                  style={{ padding: "1px" }}
                >
                  <div
                    className={`flex h-full w-full items-center justify-center ${
                      max < 0 ? "bg-sky-100 text-sky-200" : backgroundStyle
                    } cursor-default`}
                  >
                    <span>{max < 0 ? "-" : max}</span>
                  </div>
                </div>
                {editMode ? (
                  <DetailControlButton
                    item={item}
                    change={1}
                    handleNumberChange={handleNumberChange}
                    number={max}
                    category={"max"}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
