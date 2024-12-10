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
  // parsePPR,
  parseSettings,
  // parseSuperflex,
} from "~/app/dashboard/teams/util";
import { SettingsValuesType } from "~/app/dashboard/teams/_components/TeamInfo/content";
import { SettingsInputs } from "./inputs/SettingsInputs";

export default function TeamSettingsForm({
  editMode,
  teamSettings,
  handleSettingsChange,
}: {
  editMode: boolean;
  teamSettings?: SettingsValuesType;
  handleSettingsChange: (settings: SettingsValuesType) => void;
}) {
  // const [values, setValues] = useState<SettingsValuesType>(
  //   parseSettings.toFormValues(teamSettings),
  // );

  const [themeAtom] = useAtom(useThemeAtom);

  const handleRadioChange = (
    field: keyof SettingsValuesType,
    // value: number | boolean,
    value: SettingsValuesType[typeof field],
  ) => {
    // const newValues = { ...values, [field]: value };
    const newSettings = teamSettings ?? ({} as SettingsValuesType);
    const newValues = { ...newSettings, [field]: value };

    // if (field === "numOfTeams") {
    //   const positionsList = getPossibleDraftPositions(value as number);
    //   setValues({ ...newValues, possibleDraftPositions: positionsList });
    // } else {
    //   setValues(newValues);
    // }

    console.log("newValues", newValues);

    // handleSettingsChange(parseSettings.fromFormValues(newValues));
    handleSettingsChange(newValues);
  };

  /** @TODO there's gotta be a neater way to write this function and its conditions... */
  const handleRosterChange = (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    value: number,
  ) => {
    // const newSettings = { ...teamSettings };
    // const newRoster = newSettings.roster;
    // let newValue: number;
    // if (position === "bench") newValue = newRoster[position]["max"] += value;
    // else if (position === "flex")
    //   newValue = newRoster[position]["starters"] += value;
    // else
    //   newValue = newRoster[position]
    //     ? (newRoster[position][startersOrMax] += value)
    //     : value;
    // handleChange({
    //   ...newSettings,
    //   roster: {
    //     ...newRoster,
    //     [position]: { ...newRoster[position], [startersOrMax]: newValue },
    //   },
    // });
  };

  return (
    <SettingsInputs
      values={teamSettings ?? ({} as SettingsValuesType)}
      // values={values}
      // setDraftPosition={setDraftPosition}
      // setNumberOfTeams={setNumberOfTeams}
      // setPpr={setPpr}
      // setSuperflex={setSuperflex}
      // teamSettings={teamSettings}
      handleClick={handleRadioChange}
      handleRosterChange={handleRosterChange}
      darkMode={themeAtom === "dark"}
      editMode={editMode}
    />
  );
}
