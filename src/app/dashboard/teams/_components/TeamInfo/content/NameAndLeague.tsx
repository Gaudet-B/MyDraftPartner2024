"use client";

import { PropsWithChildren } from "react";
import { Team } from "@prisma/client";
import { ContentProps, TeamSettings } from "../info";

function InfoGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-2">{children}</div>;
}

function Label({ for: htmlFor, children }: PropsWithChildren<{ for: string }>) {
  return (
    <label
      className={`flex w-full items-center justify-end text-right font-mono font-normal`}
      htmlFor={htmlFor}
    >
      <span>{children}</span>
    </label>
  );
}

function Value({
  for: htmlFor,
  handleChange,
  team,
  editMode = false,
}: {
  editMode?: boolean;
  for: "name" | "league";
  handleChange: () => void;
  team: Team;
}) {
  return editMode ? (
    <input
      className={`h-8 rounded-lg px-2 font-normal text-black`}
      onChange={handleChange}
      type="text"
      value={team[htmlFor]}
    />
  ) : (
    <span className={`w-full`}>{team[htmlFor]}</span>
  );
}

function TeamSummary({ settings }: { settings: TeamSettings }) {
  const { roster } = settings;
  const ppr =
    settings.ppr === 1
      ? "full ppr"
      : settings.ppr === 0.5
        ? "half ppr"
        : "standard scoring (no PPR)";
  const qbs = roster.qb.starters > 1 ? "quarterbacks" : "quarterback";
  const rbs = roster.rb.starters > 1 ? "running backs" : "running back";
  const wrs = roster.wr.starters > 1 ? "wide receivers" : "wide receiver";
  const tes = roster.te.starters > 1 ? "tight ends" : "tight end";
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

export function NameAndLeague({
  // darkMode,
  team,
  editMode = false,
}: ContentProps) {
  return (
    <InfoGrid>
      <Label for={"name"}>{"Team"}</Label>
      <Value
        for={"name"}
        team={team}
        editMode={editMode}
        handleChange={handleChange}
      />
      <Label for={"league"}>{"League"}</Label>
      <Value
        for={"league"}
        team={team}
        editMode={editMode}
        handleChange={handleChange}
      />
      {!editMode && <TeamSummary settings={team.settings as TeamSettings} />}
    </InfoGrid>
  );
}
