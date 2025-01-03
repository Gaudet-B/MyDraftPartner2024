"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Team } from "@prisma/client";
import Button from "@designsystem/button";
import { H1, H3 } from "@designsystem/typography/header";
import { FormSubmit } from "@designsystem/form/components";
import { backgroundColors, textColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import useThemeEffect from "@designsystem/theme/hooks/useThemeEffect";
import ContentContainer from "@designsystem/container/ContentContainer";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";
import useRecommendationForm, {
  RecsFormValues,
} from "./hooks/useRecommendationForm";
import useRecommendationsQuery from "./hooks/useRecommendationsQuery";
import { ProjectedRoster, RecsRoundByRound, RecsSummary } from "./results";

function RecsTitle({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`flex w-full flex-col gap-1 pt-5 text-center font-aquire ${darkMode ? "text-gray-300" : "text-gray-700"}`}
    >
      <H3>Get Draft Pick</H3>
      <H1>Recommendations</H1>
    </div>
  );
}

function RecsFlexContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6">
      {children}
    </div>
  );
}

function RecsContentCol({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4 p-4">{children}</div>;
}

function RecsSettingsRow({ children }: PropsWithChildren) {
  return <div className="flex gap-4">{children}</div>;
}

function SettingsInputsSection({
  darkMode,
  formState,
  handleShowRecommendations,
  handleFormChange,
}: {
  darkMode: boolean;
  formState: RecsFormValues;
  handleShowRecommendations: () => void;
  handleFormChange: (values: RecsFormValues) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-lg p-4 text-start ${
        darkMode
          ? backgroundColors.darkTertiary
          : backgroundColors.lightTertiary
      }`}
    >
      <span
        className={`text-lg font-semibold ${
          darkMode ? textColors.lightTertiary : textColors.darkTertiary
        }`}
      >
        enter your league's settings here:
      </span>
      <TeamSettingsForm
        editMode
        teamSettings={formState}
        handleSettingsChange={handleFormChange}
      />
      <FormSubmit
        text="Get Recommendations"
        darkMode={darkMode}
        orientation="center"
        onClick={handleShowRecommendations}
        /** @TODO need a tooltip that explains this */
        // disable button when form is incomplete
        // AKA numOfTeams or draftPosition are equal to their initial values of 0
        disabled={formState.numOfTeams === 0 || formState.draftPosition === 0}
      />
    </div>
  );
}

function TeamSettingsList({
  activeSettings,
  darkMode,
  settingsList,
  handleActiveSettings,
}: {
  activeSettings?: Team["id"];
  darkMode: boolean;
  settingsList: {
    id: Team["id"];
    name: string;
    settings: RecsFormValues;
    handleClick: () => void;
  }[];
  handleActiveSettings: (id: Team["id"]) => void;
}) {
  return (
    <div
      className={`flex max-h-fit flex-col gap-2 rounded-lg p-4 ${
        darkMode
          ? backgroundColors.darkSecondary
          : backgroundColors.lightSecondary
      }`}
    >
      <span className="text-sm text-gray-500">
        or use one of your existing team's settings:
      </span>
      <div className="flex w-full flex-col items-start gap-2 pl-2">
        {settingsList.map(({ name, id, handleClick }, idx) => (
          <Button
            onClick={() => {
              handleClick();
              handleActiveSettings(id);
            }}
            key={`settings-list-${name}-${idx}`}
            theme={"transparent-hover"}
          >
            <span
              className={`font-mono ${activeSettings === id ? "font-semibold underline" : ""}`}
            >
              {name}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

function PlayerRecommendations({
  darkMode,
  formState,
}: {
  darkMode: boolean;
  formState: RecsFormValues;
}) {
  const { recommendations } = useRecommendationsQuery({
    ...formState,
    ppr: formState.ppr === "NO" ? "0" : formState.ppr,
    superflex: formState.superflex === "YES",
  });

  return (
    <>
      <RecsSummary
        darkMode={darkMode}
        recommendations={recommendations}
        rosterSettings={formState.roster}
      />
      <RecsRoundByRound darkMode={darkMode} recommendations={recommendations} />
      <ProjectedRoster darkMode={darkMode} recommendations={recommendations} />
    </>
  );
}

export default function RecommendationsContent({
  hasDarkMode,
  teams,
}: {
  hasDarkMode: boolean;
  teams: Team[];
}) {
  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  // sync theme with user settings from server
  useThemeEffect(hasDarkMode, themeAtom, setThemeAtom);

  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleShowRecommendations = () => setShowRecommendations(true);

  const {
    formState,
    handleFormChange,
    settingsList,
    activeSettings,
    handleActiveSettings,
  } = useRecommendationForm(teams);

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  return (
    <Container.Boxy>
      <Container.Scrollable>
        <RecsFlexContainer>
          <RecsTitle darkMode={themeAtom === "dark"} />
          <RecsContentCol>
            <RecsSettingsRow>
              <SettingsInputsSection
                darkMode={themeAtom === "dark"}
                formState={formState}
                handleShowRecommendations={handleShowRecommendations}
                handleFormChange={handleFormChange}
              />
              <TeamSettingsList
                darkMode={themeAtom === "dark"}
                settingsList={settingsList}
                activeSettings={activeSettings}
                handleActiveSettings={handleActiveSettings}
              />
            </RecsSettingsRow>
            {showRecommendations && (
              <PlayerRecommendations
                darkMode={themeAtom === "dark"}
                formState={formState}
              />
            )}
          </RecsContentCol>
        </RecsFlexContainer>
      </Container.Scrollable>
    </Container.Boxy>
  );
}
