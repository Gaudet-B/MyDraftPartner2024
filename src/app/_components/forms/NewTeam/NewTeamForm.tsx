import { useAtom } from "jotai";
import {
  Roster as RosterType,
  TeamSettings as TeamSettingsType,
} from "../../../dashboard/teams/_components/TeamInfo/info";
import {
  FormButton,
  LocalContainer,
  SettingsToggle,
  SettingsContainer,
  SettingsLabel,
  TitleContainer,
} from "./content";
import TeamSettingsForm from "~/app/_components/forms/TeamSettings/TeamSettingsForm";
import {
  FormContainer,
  FormLabel,
  FormTitle,
} from "@components/forms/form-components";
import { FormInput } from "~/app/_components/forms/form-inputs";
import { backgroundColors } from "../../design-system/colors";
import { useThemeAtom } from "~/app/dashboard/atoms";
import transition from "../../design-system/class-names/transition";
import { textColors } from "../../design-system/colors/text";
import { PropsWithChildren } from "react";
import { Player } from "@prisma/client";
import { SettingsValuesType } from "~/app/dashboard/teams/_components/TeamInfo/content";
// import { Ranking } from "@prisma/client";

export type FormValuesType = {
  name: string;
  league: string;
  ranks: Array<{ player: Player["id"]; rank: number }>;
  roster: RosterType;
  // settings: TeamSettingsType;
  settings: SettingsValuesType;
  // settings: {
  //   numOfTeams: number;
  //   draftPosition: number;
  //   ppr: boolean | number;
  //   superflex: boolean;
  //   // roster: number
  //   // scoring: string
  //   // playoffTeams: number
  //   // playoffWeeks: number
  // };
};

export default function NewTeamForm({
  formValues,
  handleFieldChange,
  handleSettingsChange,
  handleSubmit,
  handleShowSettings,
  handleHideSettings,
  isModal = false,
  showSettings = false,
}: {
  formValues?: FormValuesType;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSettingsChange: (settings: SettingsValuesType) => void;
  handleSubmit: () => void;
  // setShowSettings: (value: boolean) => void;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
  isModal: boolean;
  showSettings: boolean;
}) {
  const [themeAtom] = useAtom(useThemeAtom);
  const colorClasses =
    themeAtom === "dark"
      ? `${backgroundColors.darkSecondary} ${textColors.light}`
      : `${backgroundColors.lightSecondary} ${textColors.dark}`;

  return (
    <LocalContainer colorClasses={colorClasses} showSettings={showSettings}>
      <TitleContainer>
        <FormTitle>New Team</FormTitle>
      </TitleContainer>
      <FormContainer>
        <FormLabel for={"name"}>name of team</FormLabel>
        <FormInput
          name={"name"}
          type={"text"}
          value={formValues?.name || ""}
          handleChange={handleFieldChange}
        />

        <FormLabel for={"league"}>name of league</FormLabel>
        <FormInput
          name={"league"}
          type={"text"}
          value={formValues?.league || ""}
          handleChange={handleFieldChange}
        />

        {/* <SettingsLabel showSettings={showSettings} /> */}
        <FormLabel for={"settings"}>league settings</FormLabel>
        <SettingsToggle
          darkMode={themeAtom === "dark"}
          showSettings={showSettings}
          // setShowSettings={setShowSettings}
          handleShowSettings={handleShowSettings}
          handleHideSettings={handleHideSettings}
        />
        {showSettings && (
          <SettingsContainer>
            <TeamSettingsForm
              /** @TODO change this or keep it static? */
              editMode={true}
              teamSettings={formValues?.settings ?? ({} as SettingsValuesType)}
              handleSettingsChange={handleSettingsChange}
            />
          </SettingsContainer>
        )}
      </FormContainer>
      <FormButton handleSubmit={handleSubmit} isModal={isModal} />
    </LocalContainer>
  );
}
