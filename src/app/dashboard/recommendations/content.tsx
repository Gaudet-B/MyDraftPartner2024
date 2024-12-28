"use client";

import { PropsWithChildren, useMemo } from "react";
import { useAtom } from "jotai";
import { Team } from "@prisma/client";
import { backgroundColors, textColors } from "@designsystem/colors";
import { H1, H3 } from "@designsystem/typography/header";
import { FormSubmit } from "@designsystem/form/components";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import useThemeEffect from "@designsystem/theme/hooks/useThemeEffect";
import ContentContainer from "@designsystem/container/ContentContainer";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";
import useRecommendationForm, {
  RecsFormValues,
} from "./hooks/useRecommendationForm";
import Button from "~/app/_components/design-system/button";

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
  handleFormChange,
}: {
  darkMode: boolean;
  formState: RecsFormValues;
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
                handleFormChange={handleFormChange}
              />
              <TeamSettingsList
                darkMode={themeAtom === "dark"}
                settingsList={settingsList}
                activeSettings={activeSettings}
                handleActiveSettings={handleActiveSettings}
              />
            </RecsSettingsRow>
            {/** @TODO hide this entire section when there are no active recommendations */}
            <div
              className={`flex flex-col gap-2 rounded-lg p-2 ${themeAtom === "dark" ? backgroundColors.darkSecondary : backgroundColors.lightSecondary}`}
            >
              <div
                className={`rounded px-2 py-1 text-start ${themeAtom === "dark" ? backgroundColors.darkTertiary : backgroundColors.lightTertiary}`}
              >
                <span>starters</span>
              </div>
              <div
                className={`rounded px-2 py-1 text-start ${themeAtom === "dark" ? backgroundColors.darkTertiary : backgroundColors.lightTertiary}`}
              >
                <span>bench</span>
              </div>
            </div>
          </RecsContentCol>
        </RecsFlexContainer>
      </Container.Scrollable>
    </Container.Boxy>
  );
}
