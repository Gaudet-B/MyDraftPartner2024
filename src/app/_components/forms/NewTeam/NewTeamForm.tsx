import { useAtom } from "jotai";
import {
  FormButton,
  LocalContainer,
  SettingsToggle,
  SettingsContainer,
  TitleContainer,
  FormWrapper,
} from "./content";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";
import {
  FormContainer,
  FormLabel,
  FormTitle,
} from "@components/forms/form-components";
import { FormInput } from "@components/forms/form-inputs";
import { backgroundColors, textColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import {
  FormValuesType,
  SettingsValuesType,
} from "~/app/dashboard/teams/hooks/useTeamForm";

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
      <FormWrapper>
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
                teamSettings={
                  formValues?.settings ?? ({} as SettingsValuesType)
                }
                handleSettingsChange={handleSettingsChange}
              />
            </SettingsContainer>
          )}
        </FormContainer>
      </FormWrapper>
      <FormButton handleSubmit={handleSubmit} isModal={isModal} />
    </LocalContainer>
  );
}
