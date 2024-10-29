"use client";

import { Fragment, PropsWithChildren } from "react";
import { useAtom } from "jotai";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import Button from "@designsystem/button";
import { useThemeAtom } from "~/app/dashboard/atoms";

function FormRadioGroup() {
  return (
    <div
      className={`rounded-lg border border-gray-400 font-bold`}
      style={{
        textShadow: "none",
        width: "fit-content",
        height: `${form === "draft position" ? "36px" : "52px"}`,
      }}
    >
      <div
        className={`h-full rounded-lg border border-gray-400 font-bold`}
        style={{ textShadow: "none", width: "fit-content" }}
      >
        <RadioGroup
          value={selected}
          onChange={setSelected}
          className={`flex h-full flex-row gap-1 rounded-lg bg-gray-500`}
          style={{ width: "fit-content", padding: "2px", gap: "3px" }}
        >
          <Label className={"sr-only"}>{`${form} form`}</Label>
          {items.map((item: any, idx: number) => {
            return (
              <TeamFormTab
                key={`${form}-${item}`}
                index={idx}
                lastIndex={items.length - 1}
                handleClick={handleClick}
                name={`${item}`}
                form={form}
                selected={selected === item || false}
                value={item}
              />
            );
          })}
        </RadioGroup>
      </div>
    </div>
  );
}

function FormSelectGroup() {
  return (
    <div
      className={`rounded-lg border border-gray-400`}
      style={{ minHeight: "52px", width: "fit-content" }}
    >
      <Listbox value={selected} onChange={setSelected}>
        <div
          className={`relative flex h-full rounded-lg border border-gray-400 font-bold`}
          style={{ width: "fit-content", padding: "2px" }}
        >
          <ListboxButton
            className={`relative flex h-full cursor-pointer items-center justify-center ${
              selected === "-"
                ? "bg-sky-100 text-sky-900"
                : "border border-sky-100 bg-sky-900"
            } w-10 rounded-md text-left text-white focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-300`}
          >
            <span className={``}>{selected}</span>
            {/* <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <SelectorIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span> */}
          </ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              className={`absolute mt-1 w-full overflow-auto rounded-lg border-2 bg-sky-100 py-1 text-base text-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {items.map((item: any, idx: number) => (
                <ListboxOption
                  key={idx}
                  className={({ active, selected }) =>
                    `relative flex h-10 cursor-default select-none items-center justify-center rounded text-black ${
                      active ? "bg-sky-900 text-sky-100" : "text-gray-900"
                    } ${selected ? "bg-sky-400 bg-opacity-70 text-sky-900" : ""}`
                  }
                  style={{ textShadow: "none" }}
                  value={item}
                  onClick={() => handleChange(item)}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={` ${
                          selected ? "font-bold" : "font-semibold"
                        }`}
                      >
                        {item}
                      </span>
                      {/* {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null} */}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export function SettingsInputs({
  handleTeamsClick,
  handlePPRClick,
  handleSuperflexClick,
  NUM_OF_TEAMS,
  PPR_OPTIONS,
  SUPERFLEX_OPTIONS,
  ROSTER_OPTIONS,
  pprValue,
  superflexValue,
  handleRosterChange,
}: {
  handleTeamsClick: (value: number) => void;
  handlePPRClick: (value: number) => void;
  handleSuperflexClick: (value: number) => void;
  NUM_OF_TEAMS: number[];
  PPR_OPTIONS: number[];
  SUPERFLEX_OPTIONS: number[];
  ROSTER_OPTIONS: number[];
  pprValue: number;
  superflexValue: number;
  handleRosterChange: (value: number, index: number) => void;
}) {
  const [themeAtom] = useAtom(useThemeAtom);

  return (
    <>
      <label
        className={`flex flex-col justify-center leading-relaxed`}
        htmlFor={"numOfTeams"}
      >
        <span>number of teams</span>
        <span> in league</span>
      </label>
      <FormRadioGroup
        // handleChange={handleChange}
        handleClick={handleTeamsClick}
        form={`numOfTeams`}
        items={NUM_OF_TEAMS}
        selected={selectedNumTeams || values?.settings?.numOfTeams}
        setSelected={setSelectedNumTeams}
      />
      <label className={`flex flex-col justify-center`} htmlFor={"ppr"}>
        <span>PPR</span>
      </label>
      <FormRadioGroup
        // handleChange={handleChange}
        handleClick={handlePPRClick}
        form={"ppr"}
        items={PPR_OPTIONS}
        selected={selectedPPR || pprValue}
        setSelected={setSelectedPPR}
      />
      <label className={`flex flex-col justify-center`} htmlFor={"superflex"}>
        <span>Superflex</span>
      </label>
      <FormRadioGroup
        // handleChange={handleChange}
        handleClick={handleSuperflexClick}
        form={"superflex"}
        items={SUPERFLEX_OPTIONS}
        selected={selectedSuperflex || superflexValue}
        setSelected={setSelectedSuperflex}
      />
      <label
        className={`flex flex-col justify-center`}
        htmlFor={"draftPosition"}
      >
        <span>draft position</span>
      </label>
      <FormSelectGroup
        form={"draftPosition"}
        selected={
          selectedDraftPosition || values
            ? values?.settings?.draftPosition
            : "-"
        }
        setSelected={setSelectedDraftPosition}
        handleChange={handlePositionChange}
        items={draftPositionList || ["-"]}
        darkMode={themeAtom === "dark"}
      />
      <label className={`flex flex-col justify-start pt-3`} htmlFor={"roster"}>
        <span>roster</span>
      </label>
      <RosterDetails
        rosterDetails={rosterDetails || values?.settings?.roster}
        // form={'roster'}
        // setRosterDetails={setRosterDetails}
        handleNumberChange={handleRosterChange}
        items={ROSTER_OPTIONS}
        editMode={editMode["NEW_TEAM"]}
      />
      {/* <div>
        <input
          onChange={(e) => handleChange(e, e.target.value)}
          className={`w-full border border-black rounded p-1`}
          name={'name'}
          type="text"
        />
      </div> */}
    </>
  );
}

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
  handleCreate,
  isModal,
}: {
  handleCreate: () => void;
  isModal: boolean;
}) {
  // const [themeAtom] = useThemeAtom();

  return (
    <FormButtonContainer isModal={isModal}>
      <Button
        bold
        theme={"transparent-hover"}
        onClick={handleCreate}
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
  setShowSettings,
}: PropsWithChildren<{
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}>) {
  return (
    <div
      className={`flex cursor-pointer flex-row items-center gap-3 pl-6 font-semibold drop-shadow-none ${
        showSettings ? "text-gray-800" : "text-white"
      }`}
      onClick={() => setShowSettings(!showSettings)}
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
