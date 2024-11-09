"use client";

import { useMemo, useState } from "react";
import { Team } from "@prisma/client";
import { api } from "~/trpc/server";
import { NewTeamButton, TeamButtons } from "./_components/TeamButtons";
import { TeamSettings as TeamSettingsType } from "./_components/TeamInfo/info";
import { FormValuesType } from "./_components/TeamForm/form";
import TeamInfo from "./_components/TeamInfo";
import TeamForm from "./_components/TeamForm";

export type TeamType = {
  settings: TeamSettingsType;
} & Team;

export default function TeamsContent({ teams }: { teams: Array<TeamType> }) {
  const [activeTeam, setActiveTeam] = useState<Team["id"]>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const [formState, setFormState] = useState<FormValuesType | undefined>(
    activeTeam
      ? (teams.find((t) => t.id === activeTeam) as FormValuesType | undefined)
      : undefined,
  );

  const handleActiveTeam = (id: Team["id"]) => setActiveTeam(id);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const handleCreate = (team: FormValuesType) => {
    // if (!formState) return;
    const { name, league, settings } = team;
    api.team.createTeam({
      name,
      league,
      settings,
    });
  };

  const handleEdit = (team: TeamType) => {
    /** @TODO handle an error here? */
    if (!activeTeam) return;
    const { name, league, settings } = team;
    // const { name, league } = info;
    api.team.updateTeam({
      id: activeTeam,
      name,
      league,
      settings,
    });
  };

  const handleSettingsChange = (settings: TeamSettingsType) => {
    if (activeTeam) {
      const newTeam = teams.find((team) => team.id === activeTeam) as TeamType;
      handleEdit({ ...newTeam, settings });
    }
  };

  /** @TODO this needs work... maybe? */
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault?.();
    const newState = formState
      ? { ...formState, [e.target.name]: e.target.value }
      : ({} as FormValuesType);
    setFormState({ ...formState, ...newState });
  };

  const team = useMemo(
    () => teams.find((team) => team.id === activeTeam),
    [activeTeam],
  );

  return (
    <>
      <TeamButtons
        teams={teams}
        activeTeam={activeTeam}
        handleClick={handleActiveTeam}
      />
      {team && <TeamInfo team={team} />}
      <NewTeamButton
        addTeam={showForm}
        handleClick={showForm ? handleHideForm : handleShowForm}
      />
      {showForm && (
        <TeamForm
          /** @TODO keep this or remove??? */
          isModal={false}
          formValues={formState}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          handleFieldChange={handleFieldChange}
          handleSettingsChange={handleSettingsChange}
          handleSubmit={handleCreate}
        />
      )}
    </>
  );
}
