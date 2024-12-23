"use client";

import { PropsWithChildren } from "react";
import Button from "@designsystem/button";
import transition from "@designsystem/class-names/transition";
import { textColors } from "@designsystem/colors";

function FormButtonContainer({
  children,
  isModal,
}: PropsWithChildren<{ isModal: boolean }>) {
  return (
    <div className={`flex flex-col items-center py-4`}>
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
  return (
    <FormButtonContainer isModal={isModal}>
      <Button bold theme="submit" onClick={handleSubmit}>
        {isModal ? "edit" : "create"}
      </Button>
    </FormButtonContainer>
  );
}

export function SettingsContainer({ children }: PropsWithChildren) {
  return <div className="col-span-3 py-4">{children}</div>;
}

function SettingsButtonContainer({
  children,
  darkMode,
  showSettings,
  handleShowSettings,
  handleHideSettings,
}: PropsWithChildren<{
  darkMode: boolean;
  showSettings: boolean;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
  // setShowSettings: (value: boolean) => void;
}>) {
  const showColors = darkMode ? textColors.light : textColors.dark;
  const hideColors = darkMode ? textColors.darkAccent : textColors.lightAccent;

  return (
    <div
      className={`col-span-2 flex cursor-pointer flex-row items-center gap-3 pl-6 font-semibold drop-shadow-none ${
        showSettings ? hideColors : showColors
      }`}
      onClick={showSettings ? handleHideSettings : handleShowSettings}
    >
      {children}
    </div>
  );
}

function SettingsButtonText({
  darkMode,
  showSettings,
  text,
}: {
  darkMode: boolean;
  showSettings: boolean;
  text: "hide" | "expand";
}) {
  return (
    <span className={`hover:underline ${showSettings ? "" : ""}`}>
      {`click to ${text}`}
    </span>
  );
}

function SettingsButtonCaret({ showSettings }: { showSettings: boolean }) {
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
      >
        league settings
      </span>
    </label>
  );
}

export function SettingsToggle({
  darkMode,
  showSettings,
  handleShowSettings,
  handleHideSettings,
}: {
  darkMode: boolean;
  showSettings: boolean;
  handleShowSettings: () => void;
  handleHideSettings: () => void;
}) {
  return (
    <SettingsButtonContainer
      darkMode={darkMode}
      showSettings={showSettings}
      handleShowSettings={handleShowSettings}
      handleHideSettings={handleHideSettings}
    >
      <SettingsButtonText
        darkMode={darkMode}
        showSettings={showSettings}
        text={showSettings ? "hide" : "expand"}
      />
      <SettingsButtonCaret showSettings={showSettings} />
    </SettingsButtonContainer>
  );
}

export function LocalContainer({
  children,
  colorClasses,
  showSettings,
}: PropsWithChildren<{ colorClasses: string; showSettings: boolean }>) {
  return (
    <div
      className={`min-w-[510px] overflow-hidden rounded-xl p-6 ${colorClasses} ${transition.standard} ${showSettings ? "h-[660px]" : "h-[330px]"}`}
    >
      {children}
    </div>
  );
}

export function TitleContainer({ children }: PropsWithChildren<{}>) {
  return <div className="flex w-full justify-center pb-6 pt-4">{children}</div>;
}

export function FormWrapper({ children }: PropsWithChildren) {
  return <div className="pl-9">{children}</div>;
}
