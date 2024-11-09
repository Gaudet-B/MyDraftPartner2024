"use client";

import { useAtom } from "jotai";
import { useState } from "react";
import { useThemeAtom } from "~/app/dashboard/atoms";
import {
  Roster,
  TeamSettings as TeamSettingsType,
} from "~/app/dashboard/teams/_components/TeamInfo/info";
import {
  getPossibleDraftPositions,
  parsePPR,
  parseSuperflex,
} from "~/app/dashboard/teams/util";
import { SettingsInputs } from "./inputs/SettingsInputs";

export default function TeamSettings({
  editMode,
  teamSettings,
  handleSettingsChange,
}: {
  editMode: boolean;
  teamSettings: TeamSettingsType;
  handleSettingsChange: (settings: TeamSettingsType) => void;
}) {
  const [themeAtom] = useAtom(useThemeAtom);

  const [numberOfTeams, setNumberOfTeams] = useState<number>(
    teamSettings.numOfTeams,
  );

  const [ppr, setPpr] = useState<string>(parsePPR.toString(teamSettings.ppr));

  const [superflex, setSuperflex] = useState<string>(
    parseSuperflex.toString(teamSettings.superflex),
  );

  const [draftPosition, setDraftPosition] = useState<number>(
    teamSettings.draftPosition,
  );

  const [possibleDraftPositions, setPossibleDraftPositions] = useState<
    number[]
  >(getPossibleDraftPositions(teamSettings.numOfTeams));

  const handleChange = (settings: TeamSettingsType) =>
    handleSettingsChange(settings);

  const handleRadioChange = (
    field: keyof TeamSettingsType,
    value: number | boolean | string,
  ) => {
    /** @TODO why even do the check and early return? should just restrict the param type... */
    if (typeof value === "string") return;
    const newSettings = { ...teamSettings, [field]: value };
    // newSettings[field] = value
    handleChange(newSettings);
  };

  const handleTeamsClick = (value: number | boolean | string) => {
    if (typeof value !== "number") return;
    const positionsList = getPossibleDraftPositions(value);
    setPossibleDraftPositions(positionsList);
    handleRadioChange("numOfTeams", value);
  };

  const handlePPRClick = (value: string) => {
    const pprValue = parsePPR.fromString(value);
    handleRadioChange("ppr", pprValue);
  };

  const handleSuperflexClick = (value: string) => {
    const superflexValue = parseSuperflex.fromString(value);
    handleRadioChange("superflex", superflexValue);
  };

  /** @TODO there's gotta be a neater way to write this function and its conditions... */
  const handleRosterChange = (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    value: number,
  ) => {
    const newSettings = { ...teamSettings };
    const newRoster = newSettings.roster;
    let newValue: number;
    if (position === "bench") newValue = newRoster[position]["max"] += value;
    else if (position === "flex")
      newValue = newRoster[position]["starters"] += value;
    else
      newValue = newRoster[position]
        ? (newRoster[position][startersOrMax] += value)
        : value;
    handleChange({
      ...newSettings,
      roster: {
        ...newRoster,
        [position]: { ...newRoster[position], [startersOrMax]: newValue },
      },
    });
  };

  return (
    <SettingsInputs
      possibleDraftPositions={possibleDraftPositions}
      draftPosition={draftPosition}
      numberOfTeams={numberOfTeams}
      ppr={ppr}
      superflex={superflex}
      setDraftPosition={setDraftPosition}
      setNumberOfTeams={setNumberOfTeams}
      setPpr={setPpr}
      setSuperflex={setSuperflex}
      teamSettings={teamSettings}
      handleTeamsClick={handleTeamsClick}
      handlePPRClick={handlePPRClick}
      handleSuperflexClick={handleSuperflexClick}
      handleRadioChange={handleRadioChange}
      handleRosterChange={handleRosterChange}
      darkMode={themeAtom === "dark"}
      editMode={editMode}
    />
  );
}
