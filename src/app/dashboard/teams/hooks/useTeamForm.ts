import { useMemo, useState } from "react";
import { Team } from "@prisma/client";
import { api } from "~/trpc/react";
import { FormValuesType } from "../../../_components/forms/NewTeam/NewTeamForm";
import { TeamSettings as TeamSettingsType } from "../_components/TeamInfo/info";

export type TeamType = {
  settings: TeamSettingsType;
} & Team;

export default function useTeamForm() {
  /** @TODO when (and how?) to invalidate this query? */
  const { data, isLoading, isError } = api.team.getAllTeamsByUser.useQuery();

  const [activeTeam, setActiveTeam] = useState<Team["id"]>();
  const [showNewTeam, setShowNewTeam] = useState<boolean>(false);
  const [showNewTeamSettings, setShowNewTeamSettings] =
    useState<boolean>(false);
  const [newTeamFormState, setNewTeamFormState] = useState<
    FormValuesType | undefined
  >();
  /** @TODO is it necessary to init with active team values? */
  const [teamInfoFormState, setTeamInfoFormState] = useState<
    FormValuesType | undefined
  >(
    activeTeam
      ? (data?.find((t) => t.id === activeTeam) as FormValuesType | undefined)
      : undefined,
  );

  const handleActiveTeam = (id: Team["id"]) => setActiveTeam(id);

  const handleShowNewTeam = () => setShowNewTeam(true);
  const handleHideNewTeam = () => setShowNewTeam(false);

  const handleShowSettings = () => setShowNewTeamSettings(true);
  const handleHideSettings = () => setShowNewTeamSettings(false);

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

  /**
   * @TODO edit when?
   *  - when "done" toggle is clicked?
   *  - when user clicks away from tab?
   *  - only when a separate "save" button is clicked? (disable tab switching until saved?)
   */
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

  // const handleSettingsChange = (settings: TeamSettingsType) => {
  //   if (activeTeam) {
  //     const newTeam = data?.find((t) => t.id === activeTeam) as TeamType;
  //     handleEdit({ ...newTeam, settings });
  //   }
  // };

  /** @TODO this needs work... maybe? */
  const handleNewTeamFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e?.preventDefault?.();
    const newState = newTeamFormState
      ? { ...newTeamFormState, [e.target.name]: e.target.value }
      : ({} as FormValuesType);
    setNewTeamFormState({ ...newTeamFormState, ...newState });
  };

  /** @TODO this needs work... maybe? */
  const handleTeamInfoFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    e?.preventDefault?.();
    const newState = teamInfoFormState
      ? { ...teamInfoFormState, [e.target.name]: e.target.value }
      : ({} as FormValuesType);
    setTeamInfoFormState({ ...teamInfoFormState, ...newState });
  };

  const team = useMemo(
    () => data?.find((t) => t.id === activeTeam),
    [activeTeam],
  );

  return {
    display: {
      activeTeam,
      showNewTeam,
      handleActiveTeam,
      handleShowNewTeam,
      handleHideNewTeam,
      teamsList: data as Array<TeamType> | undefined,
      team: team as TeamType | undefined,
    },
    edit: {
      teamInfoFormState,
      handleEdit,
      handleTeamInfoFieldChange,
    },
    create: {
      newTeamFormState,
      showNewTeamSettings,
      handleCreate,
      handleNewTeamFieldChange,
      handleNewTeamSettingsChange: () => {},
      handleShowSettings,
      handleHideSettings,
    },
  };
}
