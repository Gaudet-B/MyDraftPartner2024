"use client";

import { useMemo } from "react";
import { useAtom } from "jotai";
import { Team } from "@prisma/client";
import { H1 } from "~/app/_components/design-system/typography/header";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import ContentContainer from "@designsystem/container/ContentContainer";
import { NewTeamButton, TeamButtons } from "./_components/TeamButtons";
import TeamInfo from "./_components/TeamInfo";
import NewTeamForm from "../../_components/forms/NewTeam";
import { TeamSettings as TeamSettingsType } from "./_components/TeamInfo/info";
import useTeamForm, { FormValuesType } from "./hooks/useTeamForm";

export type TeamType = {
  settings: TeamSettingsType;
} & Team;

function TeamsTitle({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`w-full pt-5 text-center font-aquire ${darkMode ? "text-gray-300" : "text-gray-700"}`}
    >
      <H1>My Teams</H1>
    </div>
  );
}

type NewTeamProps = {
  newTeamFormState?: FormValuesType;
  showNewTeamSettings: boolean;
  handleCreate: (team: FormValuesType) => void;
  handleNewTeamSettingsChange: (settings: FormValuesType["settings"]) => void;
  handleNewTeamFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
};
function NewTeam({
  newTeamFormState,
  showNewTeamSettings,
  handleCreate,
  handleNewTeamSettingsChange,
  handleNewTeamFieldChange,
  handleShowSettings,
  handleHideSettings,
}: NewTeamProps) {
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

function AddNewTeam({
  create,
  showNewTeam,
  handleShowNewTeam,
  handleHideNewTeam,
}: {
  create: NewTeamProps;
  showNewTeam: boolean;
  handleShowNewTeam: () => void;
  handleHideNewTeam: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <NewTeamButton
        addTeam={showNewTeam}
        handleClick={showNewTeam ? handleHideNewTeam : handleShowNewTeam}
      />
      {showNewTeam && <NewTeam {...{ ...create }} />}
    </div>
  );
}

export default function TeamsContent({
  hasDarkMode,
}: {
  hasDarkMode: boolean;
}) {
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
  const {
    teamInfoFormState,
    activeTab,
    editMode,
    handleTeamInfoFieldChange,
    handleEdit,
    handleEditMode,
    handleActiveTab,
  } = edit;

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  /** @TODO clean up all these divs and classes by abstracting to components with children */
  return (
    <Container.Wide>
      <Container.Scrollable>
        <div className="flex h-full w-full flex-col items-center gap-6">
          <TeamsTitle darkMode={themeAtom === "dark"} />
          <TeamButtons
            teams={teamsList}
            activeTeam={activeTeam}
            handleClick={handleActiveTeam}
            darkMode={themeAtom === "dark"}
          />
          <div className="flex w-full flex-col items-center px-4 py-2">
            {team && (
              <div className="flex w-full justify-center pb-6">
                <TeamInfo
                  team={team}
                  activeTab={activeTab}
                  editMode={editMode}
                  handleFieldChange={handleTeamInfoFieldChange}
                  handleEdit={handleEdit}
                  handleEditMode={handleEditMode}
                  handleActiveTab={handleActiveTab}
                  formState={teamInfoFormState}
                />
              </div>
            )}
            {!activeTeam && (
              <AddNewTeam
                create={create}
                showNewTeam={showNewTeam}
                handleHideNewTeam={handleHideNewTeam}
                handleShowNewTeam={handleShowNewTeam}
              />
            )}
          </div>
        </div>
      </Container.Scrollable>
    </Container.Wide>
  );
}
