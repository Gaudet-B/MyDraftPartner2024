"use client";

import { useAtom } from "jotai";
import { Team } from "@prisma/client";
import { backgroundColors } from "@designsystem/colors";
import transition from "@designsystem/class-names/transition";
import { NewTeamButton, TeamButtons } from "./_components/TeamButtons";
import TeamInfo from "./_components/TeamInfo";
/** @TODO change to `NewTeamForm` ??? */
import NewTeamForm, { FormValuesType } from "../../_components/forms/NewTeam";
import { TeamSettings as TeamSettingsType } from "./_components/TeamInfo/info";
import useTeamForm from "./hooks/useTeamForm";
import { useThemeAtom } from "../atoms";
import H1 from "~/app/_components/design-system/typography/H1";
import { textColors } from "~/app/_components/design-system/colors/text";

export type TeamType = {
  settings: TeamSettingsType;
} & Team;

const scrollbarStyles = {
  scrollbarWidth: "thin",
};

function NewTeam({
  newTeamFormState,
  showNewTeamSettings,
  handleCreate,
  handleNewTeamSettingsChange,
  handleNewTeamFieldChange,
  handleShowSettings,
  handleHideSettings,
}: {
  newTeamFormState?: FormValuesType;
  showNewTeamSettings: boolean;
  handleCreate: (team: FormValuesType) => void;
  handleNewTeamSettingsChange: (settings: FormValuesType["settings"]) => void;
  handleNewTeamFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
}) {
  return (
    <NewTeamForm
      /** @TODO keep this `isModal` prop or remove??? */
      isModal={false}
      formValues={newTeamFormState}
      showSettings={showNewTeamSettings}
      handleShowSettings={handleShowSettings}
      handleHideSettings={handleHideSettings}
      handleFieldChange={handleNewTeamFieldChange}
      handleSettingsChange={handleNewTeamSettingsChange}
      handleSubmit={() => newTeamFormState && handleCreate(newTeamFormState)}
    />
  );
}

export default function TeamsContent() {
  const [themeAtom] = useAtom(useThemeAtom);

  const { display, edit, create } = useTeamForm();

  const {
    activeTeam,
    showNewTeam,
    handleActiveTeam,
    handleShowNewTeam,
    handleHideNewTeam,
    teamsList,
    team,
  } = display;
  const { teamInfoFormState, handleTeamInfoFieldChange, handleEdit } = edit;

  const colorClasses =
    themeAtom === "dark"
      ? `${backgroundColors.darkAccent}`
      : `${backgroundColors.lightAccent}`;

  /** @TODO clean up all these divs and classes by abstracting to components with children */
  return (
    <div
      className={`flex h-full w-full grow flex-col items-center ${transition.standard} ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
    >
      <div
        className={`z-10 w-4/5 translate-y-8 rounded-3xl bg-opacity-80 px-[1px] py-3 shadow-lg ${transition.standard} ${colorClasses}`}
        // style={{
        //   scrollbarWidth: "thin",
        //   scrollbarColor: "rgba(0, 0, 0, 0.5) rgba(0, 0, 0, 0.1)",
        //   scrollbarGutter: "auto",
        // }}
      >
        <div className="h-[80vh] overflow-auto">
          <div
            className={`w-full pt-5 text-center ${themeAtom === "dark" ? "text-gray-300" : "text-gray-700"}`}
          >
            {/** @TODO change font - just here or all H1s? */}
            <H1>My Teams</H1>
          </div>
          <div className="flex w-full flex-col items-center p-4">
            <div className="w-4/5">
              <TeamButtons
                teams={teamsList}
                activeTeam={activeTeam}
                handleClick={handleActiveTeam}
              />
            </div>
            <div className="flex w-full justify-center py-2">
              {team && (
                <TeamInfo
                  team={team}
                  handleFieldChange={handleTeamInfoFieldChange}
                  handleEdit={handleEdit}
                  formState={teamInfoFormState}
                />
              )}
            </div>
            <div className="pt-4">
              <NewTeamButton
                addTeam={showNewTeam}
                handleClick={
                  showNewTeam ? handleHideNewTeam : handleShowNewTeam
                }
              />
            </div>
            {showNewTeam && <NewTeam {...{ ...create }} />}
          </div>
        </div>
      </div>
    </div>
  );
}
