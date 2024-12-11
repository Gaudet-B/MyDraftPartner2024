"use client";

import { useAtom } from "jotai";
import { useThemeAtom } from "~/app/dashboard/atoms";
import { Roster } from "~/app/dashboard/teams/_components/TeamInfo/info";
import { SettingsInputs } from "./inputs/SettingsInputs";
import { getPossibleDraftPositions } from "~/app/dashboard/teams/util";
import { SettingsValuesType } from "~/app/dashboard/teams/hooks/useTeamForm";

export default function TeamSettingsForm({
  editMode,
  teamSettings,
  handleSettingsChange,
}: {
  editMode: boolean;
  teamSettings?: SettingsValuesType;
  handleSettingsChange: (settings: SettingsValuesType) => void;
}) {
  const [themeAtom] = useAtom(useThemeAtom);

  const handleRadioChange = (
    field: keyof SettingsValuesType,
    value: SettingsValuesType[typeof field],
  ) => {
    const newSettings = teamSettings ?? ({} as SettingsValuesType);

    const newValues =
      field === "numOfTeams"
        ? {
            ...newSettings,
            [field]: value as number,
            possibleDraftPositions: getPossibleDraftPositions(value as number),
          }
        : { ...newSettings, [field]: value };

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
      handleClick={handleRadioChange}
      handleRosterChange={handleRosterChange}
      darkMode={themeAtom === "dark"}
      editMode={editMode}
    />
  );
}
