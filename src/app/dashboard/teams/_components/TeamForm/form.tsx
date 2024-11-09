import {
  Roster as RosterType,
  TeamSettings as TeamSettingsType,
} from "../TeamInfo/info";
import { FormButton, SettingsButton, SettingsLabel } from "./content";
import TeamSettings from "@components/forms/TeamSettings/TeamSettings";
import { FormContainer, FormLabel } from "@components/forms/form-components";
import { FormInput } from "~/app/_components/forms/form-inputs";
import { TeamType } from "../../content";

export type FormValuesType = {
  name: string;
  league: string;
  roster: RosterType;
  settings: {
    numOfTeams: number;
    draftPosition: number;
    ppr: boolean | number;
    superflex: boolean;
    // roster: number
    // scoring: string
    // playoffTeams: number
    // playoffWeeks: number
  };
};

export default function TeamForm({
  formValues,
  handleFieldChange,
  handleSettingsChange,
  handleSubmit,
  setShowSettings,
  isModal = false,
  showSettings = false,
}: {
  formValues?: FormValuesType;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSettingsChange: (settings: TeamSettingsType) => void;
  handleSubmit: (t: FormValuesType) => void;
  setShowSettings: (value: boolean) => void;
  isModal: boolean;
  showSettings: boolean;
}) {
  return (
    <>
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

        <SettingsLabel showSettings={showSettings} />
        <SettingsButton
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        {showSettings && (
          <TeamSettings
            /** @TODO change this or keep it static? */
            editMode={true}
            teamSettings={formValues?.settings as TeamSettingsType}
            handleSettingsChange={handleSettingsChange}
          />
        )}
      </FormContainer>
      <FormButton
        handleSubmit={() => formValues && handleSubmit(formValues)}
        isModal={isModal}
      />
    </>
  );
}
