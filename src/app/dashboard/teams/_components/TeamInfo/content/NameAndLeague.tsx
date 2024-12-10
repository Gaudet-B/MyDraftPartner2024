"use client";

import { PropsWithChildren } from "react";
import { Team } from "@prisma/client";
import { ContentProps, TeamSettings } from "../info";
import { backgroundColors } from "~/app/_components/design-system/colors";
import { useAtom } from "jotai";
import { useThemeAtom } from "~/app/dashboard/atoms";
import { textColors } from "~/app/_components/design-system/colors/text";

function InfoGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-3 gap-2">{children}</div>;
}

/** @TODO replace this with designsystem component? at least with HeadlessUI component... */
function Label({
  for: htmlFor,
  children,
  darkMode,
}: PropsWithChildren<{ for: string; darkMode: boolean }>) {
  return (
    <label
      className={`flex h-8 w-full items-center justify-end text-right font-mono font-semibold ${darkMode ? textColors.lightAccent : textColors.darkSecondary}`}
      htmlFor={htmlFor}
    >
      <span>{children}</span>
    </label>
  );
}

function Value({
  for: htmlFor,
  darkMode,
  handleChange,
  team,
  editMode = false,
}: {
  editMode?: boolean;
  darkMode: boolean;
  for: "name" | "league";
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  team: Team;
}) {
  return (
    <div className="col-span-2 flex h-8 items-center">
      {editMode ? (
        <input
          className={`h-8 rounded-lg px-2 font-mono font-normal ${darkMode ? `${backgroundColors.darkTertiary} ${textColors.light}` : `bg-white ${textColors.black}`}`}
          onChange={handleChange}
          type="text"
          // value={team[htmlFor]}
          // value={values[htmlFor]}
          // defaultValue={values[htmlFor]}
          defaultValue={team[htmlFor]}
        />
      ) : (
        <span
          className={`ml-2 w-full ${darkMode ? textColors.light : textColors.black}`}
        >
          {team[htmlFor]}
        </span>
      )}
    </div>
  );
}

function TeamSummary({ settings }: { settings: TeamSettings }) {
  const { roster } = settings;
  if (!roster) return null;
  const ppr =
    settings.ppr === 1
      ? "full ppr"
      : settings.ppr === 0.5
        ? "half ppr"
        : "standard scoring (no PPR)";
  const qbs =
    roster.qb.starters && roster.qb.starters > 1
      ? "quarterbacks"
      : "quarterback";
  const rbs =
    roster.rb.starters && roster.rb.starters > 1
      ? "running backs"
      : "running back";
  const wrs =
    roster.wr.starters && roster.wr.starters > 1
      ? "wide receivers"
      : "wide receiver";
  const tes =
    roster.te.starters && roster.te.starters > 1 ? "tight ends" : "tight end";
  return (
    <>
      <span className={`w-full text-right font-mono font-normal`}>
        {`Info`}
      </span>
      <div className={"max-w-[380px]"}>
        <p className={`mt-1 text-sm font-normal`}>
          This is a {ppr} league. Rosters consist of {roster.qb.starters} {qbs},{" "}
          {roster.rb.starters} {rbs}, {roster.wr.starters} {wrs},{" "}
          {roster.te.starters} {tes} and {roster.flex.starters} flex with{" "}
          {roster.bench.max} bench spots.
        </p>
      </div>
    </>
  );
}

export function NameAndLeague({ handleChange, team, editMode }: ContentProps) {
  const [themeAtom] = useAtom(useThemeAtom);

  const handleNameAndLeagueChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    f: "name" | "league",
    v: string,
  ) => {
    e.preventDefault();
    handleChange(f, v);
  };

  return (
    <InfoGrid>
      <Label darkMode={themeAtom === "dark"} for={"name"}>
        {"Team"}
      </Label>
      <Value
        for={"name"}
        team={team}
        darkMode={themeAtom === "dark"}
        editMode={editMode.INFO}
        handleChange={(e) =>
          handleNameAndLeagueChange(e, "name", e.target.value)
        }
      />
      <Label darkMode={themeAtom === "dark"} for={"league"}>
        {"League"}
      </Label>
      <Value
        for={"league"}
        team={team}
        darkMode={themeAtom === "dark"}
        editMode={editMode.INFO}
        handleChange={(e) =>
          handleNameAndLeagueChange(e, "league", e.target.value)
        }
      />
      {!editMode && team.settings && (
        <TeamSummary settings={team.settings as TeamSettings} />
      )}
    </InfoGrid>
  );
}
