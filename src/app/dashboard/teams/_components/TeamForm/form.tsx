import { PropsWithChildren } from "react";
import { Roster as RosterType } from "../TeamInfo/info";
import {
  FormButton,
  SettingsButtonCaret,
  SettingsButtonContainer,
  SettingsButtonText,
  SettingsInputs,
} from "./content";

function FormContainer({ children }: PropsWithChildren) {
  return (
    <div
      className={`text-right`}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "20px",
      }}
    >
      {children}
    </div>
  );
}

function FormLabel({
  children,
  for: htmlFor,
}: PropsWithChildren<{ for: string }>) {
  return (
    <label className={`flex flex-col justify-center`} htmlFor={htmlFor}>
      <span>{children}</span>
    </label>
  );
}

function FormInput({
  name,
  type,
  value,
  handleChange,
}: {
  name: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        name={name}
        type={type}
        value={value}
        className={`w-full rounded border border-black bg-sky-100 p-1 font-semibold text-sky-900`}
        onChange={handleChange}
      />
    </div>
  );
}

function SettingsLabel({ showSettings }: { showSettings: boolean }) {
  return (
    <label>
      <span
        className={`${showSettings ? "font-semibold text-gray-800" : "text-white"} font-sans drop-shadow-none`}
        // style={{ textShadow: "none" }}
      >
        league settings
      </span>
    </label>
  );
}

function SettingsButton({
  showSettings,
  setShowSettings,
}: {
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}) {
  return (
    <SettingsButtonContainer
      showSettings={showSettings}
      setShowSettings={setShowSettings}
    >
      <SettingsButtonText
        showSettings={showSettings}
        text={showSettings ? "hide" : "expand"}
      />
      <SettingsButtonCaret showSettings={showSettings} />
    </SettingsButtonContainer>
  );
}

function TeamSettings({
  showSettings,
  setShowSettings,
}: {
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}) {
  return (
    <>
      <SettingsLabel showSettings={showSettings} />
      <SettingsButton
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />
      {showSettings && <SettingsInputs />}
    </>
  );
}

export type FormValuesType = {
  info: {
    name: string;
    league: string;
  };
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
  handleSubmit,
  setShowSettings,
  isModal = false,
  showSettings = false,
}: {
  formValues?: FormValuesType;
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
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
          value={formValues?.info.name || ""}
          handleChange={handleFieldChange}
        />

        <FormLabel for={"league"}>name of league</FormLabel>
        <FormInput
          name={"league"}
          type={"text"}
          value={formValues?.info.league || ""}
          handleChange={handleFieldChange}
        />

        <TeamSettings
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
      </FormContainer>
      <FormButton handleCreate={handleSubmit} isModal={isModal} />
    </>
  );
}
