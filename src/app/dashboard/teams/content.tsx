"use client";

import { useMemo, useState } from "react";
import { Team } from "@prisma/client";
// import { api } from "~/utils/api";
import { api } from "~/trpc/react";
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
  // const [teamsList, setTeamsList] = useState<Array<TeamType>>(teams);

  /** @TODO when (and how?) to invalidate this query? */
  const { data, isLoading, isError } = api.team.getAllTeamsByUser.useQuery();
  // data && setTeamsList(data as Array<TeamType>);
  const teamsList = useMemo(() => {
    return data ? (data as Array<TeamType>) : teams;
  }, [data]);

  /** @TODO is it necessary to init with active team values? */
  const [formState, setFormState] = useState<FormValuesType | undefined>(
    activeTeam
      ? (teamsList.find((t) => t.id === activeTeam) as
          | FormValuesType
          | undefined)
      : undefined,
  );

  const handleActiveTeam = (id: Team["id"]) => setActiveTeam(id);

  const handleShowForm = () => setShowForm(true);
  const handleHideForm = () => setShowForm(false);

  const createMutation = api.team.createTeam.useMutation();
  const updateMutation = api.team.updateTeam.useMutation();

  const handleCreate = (team: FormValuesType) => {
    const { name, league, settings } = team;
    const newSettings = settings ? settings : {};
    createMutation.mutate(
      {
        name,
        league,
        settings: newSettings,
      },
      {
        onSuccess: (data) => {
          setActiveTeam(data.id);
          // setShowForm(false);
        },
        /** @TODO need real error handling here... */
        onError: (error) => {
          console.error("Error creating team:", error);
        },
      },
    );
  };

  const handleEdit = (team: TeamType) => {
    const { id, name, league, settings } = team;
    updateMutation.mutate(
      {
        id,
        name,
        league,
        settings,
      },
      {
        onSuccess: (data) => {
          setActiveTeam(data.id);
          // setShowForm(false);
        },
        /** @TODO need real error handling here... */
        onError: (error) => {
          console.error("Error updating team:", error);
        },
      },
    );
  };

  const handleSettingsChange = (settings: TeamSettingsType) => {
    if (activeTeam) {
      const newTeam = teamsList.find(
        (team) => team.id === activeTeam,
      ) as TeamType;
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
    () => teamsList.find((team) => team.id === activeTeam),
    [activeTeam],
  );

  return (
    <>
      <TeamButtons
        teams={teamsList}
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
          handleSubmit={() => formState && handleCreate(formState)}
        />
      )}
    </>
  );
}
