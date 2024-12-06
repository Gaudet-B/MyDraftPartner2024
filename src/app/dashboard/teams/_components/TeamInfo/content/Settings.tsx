import { ContentProps } from "../info";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";

export type SettingsValuesType = {
  ppr: "NO" | "0.5" | "1.0";
  superflex: "YES" | "NO";
  draftPosition: number;
  possibleDraftPositions: Array<number>;
  numOfTeams: number;
};

export function Settings({
  team,
  // settings,
  // activeTab,
  editMode,
  // setEditMode,
  // handleSettingsChange,
}: ContentProps) {
  // }: {
  //   team: TeamType;
  //   // settings: TeamSettingsType;
  //   // activeTab: string;
  //   editMode: EditMode;
  //   // setEditMode?: (tab: keyof EditMode) => void;
  //   // handleSettingsChange: (settings: any) => void;
  // }) {
  return (
    <div className="pb-4">
      <TeamSettingsForm
        editMode={editMode.SETTINGS}
        teamSettings={team.settings}
      />
    </div>
  );
}
