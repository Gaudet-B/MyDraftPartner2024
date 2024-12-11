import { useMemo, useState } from "react";
import { Player, Prisma, Team } from "@prisma/client";
import { api } from "~/trpc/react";
import { Roster as RosterType } from "../../../dashboard/teams/_components/TeamInfo/info";
import {
  CONTENT_MAP,
  TeamSettings as TeamSettingsType,
} from "../_components/TeamInfo/info";
import { parseSettings } from "../util";

export type SettingsValuesType = {
  ppr: "NO" | "0.5" | "1.0";
  superflex: "YES" | "NO";
  draftPosition: number;
  // possibleDraftPositions: Array<number>;
  numOfTeams: number;
  roster: RosterType;
};

export type FormValuesType = {
  name: string;
  league: string;
  ranks?: Array<{ player: Player["id"]; rank: number }>;
  roster?: RosterType;
  settings: SettingsValuesType;
};

export type TeamType = {
  settings: TeamSettingsType;
} & Team;

/** @TODO typeof settings??? */
type TeamMutation = {
  name: string;
  league: string;
  settings: TeamSettingsType;
};

export type ContentTab = keyof typeof CONTENT_MAP;
export type EditModeKeys = ContentTab | "NEW_TEAM";

export const INITIAL_EDIT_MODES: { [key in EditModeKeys]: boolean } = {
  SETTINGS: false,
  RANKS: false,
  NOTES: false,
  INFO: false,
  NEW_TEAM: true,
};
export type EditMode = typeof INITIAL_EDIT_MODES;

export default function useTeamForm() {
  const teamsQuery = api.team.getAllTeamsByUser.useQuery();
  const { data } = teamsQuery;

  const [editMode, setEditMode] = useState(INITIAL_EDIT_MODES);
  const [activeTab, setActiveTab] = useState<ContentTab>("INFO");
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

  const handleEditMode = () => {
    setEditMode((prev) => ({
      ...prev,
      [activeTab]: !prev[activeTab],
    }));
  };

  const handleActiveTab = (tab: ContentTab) => setActiveTab(tab);

  const handleActiveTeam = (id: Team["id"] | undefined) => {
    setActiveTeam(id);
    if (!teamInfoFormState)
      setTeamInfoFormState(
        data?.find((t) => t.id === id) as FormValuesType | undefined,
      );
  };

  const handleShowNewTeam = () => setShowNewTeam(true);
  const handleHideNewTeam = () => setShowNewTeam(false);

  const handleShowSettings = () => setShowNewTeamSettings(true);
  const handleHideSettings = () => setShowNewTeamSettings(false);

  const createTeamMutation = api.team.createTeam.useMutation();
  const updateTeamMutation = api.team.updateTeam.useMutation();
  const createRanksMutation = api.ranking.createRanks.useMutation();
  const updateRanksMutation = api.ranking.updateRanks.useMutation();

  const createTeam = (t: TeamMutation) => {
    let newId = -1;
    createTeamMutation.mutate(t, {
      onSuccess: (data) => {
        setActiveTeam(data.id);
        newId = data.id;
        api.team.getAllTeamsByUser.useQuery().refetch();
      },
      /** @TODO need real error handling here... */
      onError: (error) => {
        console.error("Error creating team:", error);
      },
    });
    return newId;
  };

  const updateTeam = (t: TeamMutation & { id: number }) =>
    updateTeamMutation.mutate(t, {
      onSuccess: (data) => {
        setActiveTeam(data.id);
        handleEditMode();
        teamsQuery.refetch();
      },
      /** @TODO need real error handling here... */
      onError: (error) => {
        console.error("Error updating team:", error);
      },
    });

  const handleCreate = (team: FormValuesType) => {
    const { name, league, ranks, roster, settings } = team;
    const newRoster = roster ? roster : ({} as RosterType);
    const newSettings = settings
      ? parseSettings.fromFormValues(settings)
      : ({} as TeamSettingsType);

    const newId = createTeam({
      name,
      league,
      settings: { ...newSettings, roster: { ...newRoster } },
    });

    if (ranks) {
      const { data } = api.ranking.getRanks.useQuery({ teamId: newId });
      if (data) updateRanksMutation.mutate({ ...data, ranks });
      else createRanksMutation.mutate({ teamId: newId, ranks });
    }
  };

  /**
   * @TODO edit when?
   *  - when "done" toggle is clicked?
   *  - when user clicks away from tab?
   *  - only when a separate "save" button is clicked? (disable tab switching until saved?)
   */
  const handleEdit = (team: FormValuesType) => {
    /** @TODO error here? */
    if (!activeTeam) return;

    const { name, league, ranks, roster, settings } = team;
    const newRoster = roster ? roster : ({} as RosterType);
    const newSettings = settings
      ? parseSettings.fromFormValues(settings)
      : ({} as TeamSettingsType);

    updateTeam({
      id: activeTeam,
      name,
      league,
      settings: { ...newSettings, roster: { ...newRoster } },
    });

    if (ranks) {
      const { data } = api.ranking.getRanks.useQuery({ teamId: activeTeam });
      if (data) updateRanksMutation.mutate({ ...data, ranks });
      else createRanksMutation.mutate({ teamId: activeTeam, ranks });
    }
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

  const handleTeamInfoFieldChange = (
    field: keyof FormValuesType,
    value: FormValuesType[typeof field],
  ) => {
    const newState = teamInfoFormState
      ? { ...teamInfoFormState }
      : ({} as FormValuesType);

    /** @TODO this doesn't handle ROSTER */
    if (field === "settings") {
      const newVal = value as FormValuesType["settings"];

      const newSettings =
        teamInfoFormState?.settings ?? ({} as FormValuesType["settings"]);

      const newInfo = { ...newState, settings: { ...newSettings, ...newVal } };
      setTeamInfoFormState(newInfo);
    } else {
      setTeamInfoFormState({ ...newState, [field]: value });
    }
  };

  const team = useMemo(() => {
    const t = data?.find((t) => t.id === activeTeam);
    const settings = parseSettings.fromJson(
      (t?.settings as Prisma.JsonObject) ?? ({} as Prisma.JsonObject),
    );
    t &&
      setTeamInfoFormState({
        name: t.name,
        league: t.league,
        settings: parseSettings.toFormValues(settings),
      });
    return t;
  }, [activeTeam, data]);

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
      activeTab,
      editMode,
      teamInfoFormState,
      handleEdit,
      handleEditMode,
      handleActiveTab,
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
