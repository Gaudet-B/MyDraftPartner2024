"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Team } from "@prisma/client";
import useRecommendationForm, {
  RecsFormValues,
} from "../hooks/useRecommendationForm";

type RecsFormContextType = {
  formState: RecsFormValues;
  handleFormChange: (values: RecsFormValues) => void;
  getSettingsList: (teams: Team[]) => Array<{
    id: Team["id"];
    name: Team["name"];
    settings: RecsFormValues;
    handleClick: () => void;
  }>;
  activeSettings?: Team["id"];
  handleActiveSettings: (id: Team["id"]) => void;
  showRecommendations: boolean;
  handleShowRecommendations: () => void;
  handleShowSettings: () => void;
  handleBackToSettings: (r: AppRouterInstance) => void;
  handleGetRecommendations: () => string;
};

const RecsFormContext = createContext<RecsFormContextType | undefined>(
  undefined,
);

export function RecsFormProvider({ children }: PropsWithChildren) {
  const {
    formState,
    handleFormChange,
    getSettingsList,
    activeSettings,
    handleActiveSettings,
    showRecommendations,
    handleShowRecommendations,
    handleShowSettings,
    handleBackToSettings,
    handleGetRecommendations,
  } = useRecommendationForm();

  return (
    <RecsFormContext.Provider
      value={{
        formState,
        handleFormChange,
        getSettingsList,
        activeSettings,
        handleActiveSettings,
        showRecommendations,
        handleShowRecommendations,
        handleBackToSettings,
        handleShowSettings,
        handleGetRecommendations,
      }}
    >
      {children}
    </RecsFormContext.Provider>
  );
}

export function useRecsFormContext() {
  const context = useContext(RecsFormContext);
  if (!context) {
    throw new Error(
      "useRecsFormContext must be used within a RecsFormProvider",
    );
  }
  return context;
}
