import { useMemo, useState } from "react";
import { Prisma, Team } from "@prisma/client";
import { DEFAULT_ROSTER_SETTINGS } from "@components/forms/TeamSettings/const";
import { Roster as RosterType } from "../../teams/_components/TeamInfo";
import { parseSettings } from "../../teams/util";

export type RecsFormValues = {
  ppr: "NO" | "0.5" | "1.0";
  superflex: "YES" | "NO";
  draftPosition: number;
  numOfTeams: number;
  roster: RosterType;
};

const DEFAULT_FORM_STATE = {
  ppr: "1.0",
  superflex: "NO",
  draftPosition: 0,
  numOfTeams: 0,
  roster: DEFAULT_ROSTER_SETTINGS,
} as const;

function _formatSettings(settings: Prisma.JsonObject) {
  return parseSettings.toFormValues(parseSettings.fromJson(settings));
}

export default function useRecommendationForm(teams: Team[]) {
  const [formState, setFormState] =
    useState<RecsFormValues>(DEFAULT_FORM_STATE);

  const handleFormChange = (values: RecsFormValues) => setFormState(values);

  const [activeSettings, setActiveSettings] = useState<Team["id"]>();
  const setSettings = (id: Team["id"]) => setActiveSettings(id);
  const clearSettings = () => {
    setActiveSettings(undefined);
    setFormState(DEFAULT_FORM_STATE);
  };

  const handleActiveSettings = (id: Team["id"]) => {
    if (activeSettings === id) return clearSettings();
    else return setSettings(id);
  };

  const settingsList = useMemo(() => {
    return teams.map(({ id, name, settings }) => {
      const formattedSettings = _formatSettings(settings as Prisma.JsonObject);
      return {
        id,
        name,
        settings: formattedSettings,
        handleClick: () => handleFormChange(formattedSettings),
      };
    });
  }, [teams]);

  return {
    activeSettings,
    formState,
    settingsList,
    handleActiveSettings,
    handleFormChange,
  };
}
