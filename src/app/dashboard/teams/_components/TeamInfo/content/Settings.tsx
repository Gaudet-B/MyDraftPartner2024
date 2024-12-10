import { ContentProps, Roster } from "../info";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";

export type SettingsValuesType = {
  ppr: "NO" | "0.5" | "1.0";
  superflex: "YES" | "NO";
  draftPosition: number;
  possibleDraftPositions: Array<number>;
  numOfTeams: number;
  roster?: Roster;
};

export function Settings({
  // team,
  // darkMode,
  editMode,
  formState,
  handleChange,
  // setEditMode,
}: ContentProps) {
  const handleSettingsChange = (settings: SettingsValuesType) =>
    handleChange("settings", settings);

  return (
    <div className="pb-4">
      <TeamSettingsForm
        editMode={editMode.SETTINGS}
        // teamSettings={team.settings}
        teamSettings={formState?.settings}
        handleSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
