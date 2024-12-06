"use client";

import { PropsWithChildren } from "react";
import Button from "@designsystem/button";

function FormButtonContainer({
  children,
  isModal,
}: PropsWithChildren<{ isModal: boolean }>) {
  return (
    <div className={`my-5 flex flex-col items-center`}>
      <div className={`${isModal ? "w-5/12" : ""} flex flex-col items-stretch`}>
        {children}
      </div>
    </div>
  );
}

export function FormButton({
  handleSubmit,
  isModal,
}: {
  handleSubmit: () => void;
  isModal: boolean;
}) {
  // const [themeAtom] = useThemeAtom();

  return (
    <FormButtonContainer isModal={isModal}>
      <Button
        bold
        theme={"transparent-hover"}
        onClick={handleSubmit}
        // additionalClasses={'text-white'}
      >
        {isModal ? "edit" : "create"}
      </Button>
    </FormButtonContainer>
  );
}

export function SettingsButtonContainer({
  children,
  showSettings,
  handleShowSettings,
  handleHideSettings,
}: PropsWithChildren<{
  showSettings: boolean;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
  // setShowSettings: (value: boolean) => void;
}>) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center gap-3 pl-6 font-semibold drop-shadow-none ${
        showSettings ? "text-gray-800" : "text-white"
      }`}
      onClick={showSettings ? handleHideSettings : handleShowSettings}
      // style={{ textShadow: "none" }}
    >
      {children}
    </div>
  );
}

export function SettingsButtonText({
  showSettings,
  text,
}: {
  showSettings: boolean;
  text: "hide" | "expand";
}) {
  return (
    <span className={`hover:underline ${showSettings ? "mr-4" : ""}`}>
      {`click to ${text}`}
    </span>
  );
}

export function SettingsButtonCaret({
  showSettings,
}: {
  showSettings: boolean;
}) {
  return (
    <span
      className={`font-bold`}
      style={
        showSettings
          ? { transform: "rotateZ(-90deg)", transition: ".2s transform" }
          : { transform: "rotateZ(90deg)", transition: ".2s transform" }
      }
    >
      {`>`}
    </span>
  );
}

export function SettingsLabel({ showSettings }: { showSettings: boolean }) {
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

export function SettingsButton({
  showSettings,
  handleShowSettings,
  handleHideSettings,
}: {
  showSettings: boolean;
  // setShowSettings: (value: boolean) => void;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
}) {
  return (
    <SettingsButtonContainer
      showSettings={showSettings}
      handleShowSettings={handleShowSettings}
      handleHideSettings={handleHideSettings}
    >
      <SettingsButtonText
        showSettings={showSettings}
        text={showSettings ? "hide" : "expand"}
      />
      <SettingsButtonCaret showSettings={showSettings} />
    </SettingsButtonContainer>
  );
}
