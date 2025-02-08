"use client";

import { useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
  draftPosition: 10,
  numOfTeams: 12,
  roster: DEFAULT_ROSTER_SETTINGS,
} as const;

function _formatSettings(settings: Prisma.JsonObject) {
  return parseSettings.toFormValues(parseSettings.fromJson(settings));
}

// export default function useRecommendationForm(teams: Team[]) {
export default function useRecommendationForm() {
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

  const getSettingsList = (teams: Team[]) => {
    if (teams.length === 0) return [];
    return teams.map(({ id, name, settings }) => {
      const formattedSettings = _formatSettings(settings as Prisma.JsonObject);
      return {
        id,
        name,
        settings: formattedSettings,
        handleClick: () => handleFormChange(formattedSettings),
      };
    });
  };

  const [showRecommendations, setShowRecommendations] = useState(false);
  const handleShowRecommendations = () => setShowRecommendations(true);
  const handleShowSettings = () => setShowRecommendations(false);

  const handleGetRecommendations = () => {
    const params = new URLSearchParams();
    Object.entries(formState).forEach(([key, value]) => {
      if (typeof value === "object") {
        // recursively traverse the object and stringify each value
        const recursiveStringify = (obj: object | string): string => {
          if (typeof obj === "object") {
            return Object.entries(obj)
              .map(([key, value]) => {
                return `${key}=${recursiveStringify(value)}`;
              })
              .join("&");
          }
          return String(obj);
        };
        params.set(key, recursiveStringify(value));
      } else {
        params.set(key, String(value));
      }
    });
    handleShowRecommendations();
    // router.push(`/dashboard/recommendations/results?${params}`);
    return `/dashboard/recommendations/results?${params}`;
  };

  const handleBackToSettings = (router: AppRouterInstance) => {
    handleShowSettings();
    /** @TODO add params to this route for settings !!! */
    router.push("/dashboard/recommendations");
  };

  return {
    activeSettings,
    formState,
    getSettingsList,
    handleActiveSettings,
    handleFormChange,
    showRecommendations,
    handleShowRecommendations,
    handleShowSettings,
    handleGetRecommendations,
    handleBackToSettings,
  };
}
