"use client";

import { useAtom } from "jotai";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import { Roster } from "~/app/dashboard/teams/_components/TeamInfo/info";
import { SettingsInputs } from "./inputs/SettingsInputs";
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

    const newValues = { ...newSettings, [field]: value };

    handleSettingsChange(newValues);
  };

  const handleRosterChange = (
    position: keyof Roster,
    startersOrMax: "starters" | "max",
    change: -1 | 1,
  ) => {
    const settings = teamSettings
      ? { ...teamSettings }
      : ({} as SettingsValuesType);
    const { roster } = settings;
    const newRoster = roster ? { ...roster } : ({} as Roster);
    const value = newRoster[position][startersOrMax] ?? 0;
    const newValue = value + change;

    const newSettings = {
      ...settings,
      roster: {
        ...newRoster,
        [position]: {
          ...newRoster[position],
          [startersOrMax]: newValue,
        },
      },
    };

    handleSettingsChange(newSettings);
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
