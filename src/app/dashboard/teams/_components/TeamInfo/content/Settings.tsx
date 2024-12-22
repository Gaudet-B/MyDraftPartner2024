import { SettingsValuesType } from "../../../hooks/useTeamForm";
import { ContentProps } from "../info";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";

export function Settings({ editMode, formState, handleChange }: ContentProps) {
  const handleSettingsChange = (settings: SettingsValuesType) =>
    handleChange("settings", settings);

  // console.log("formState", formState);
  return (
    <div className="pb-4">
      <TeamSettingsForm
        editMode={editMode.SETTINGS}
        teamSettings={formState?.settings}
        handleSettingsChange={handleSettingsChange}
      />
    </div>
  );
}
