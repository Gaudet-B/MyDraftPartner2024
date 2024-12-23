"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { useAtom } from "jotai";
import Button from "@designsystem/button";
import transition from "@designsystem/class-names/transition";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import {
  backgroundColors,
  borderColors,
  textColors,
} from "@designsystem/colors";
import { NameAndLeague, Notes, Ranks, Settings } from "./content";
import { TeamType } from "../../content";
import {
  ContentTab,
  EditMode,
  EditModeKeys,
  FormValuesType,
} from "../../hooks/useTeamForm";

/** @TODO HOVER EFFECTS ON BUTTONS */

export const CONTENT_MAP = {
  SETTINGS: Settings,
  RANKS: Ranks,
  NOTES: Notes,
  INFO: NameAndLeague,
} as const;

const NOTEBOOK_TABS = [
  {
    label: ["Team", "Info"],
    value: "INFO",
  },
  {
    label: ["League", "Settings"],
    value: "SETTINGS",
  },
  {
    label: ["Custom", "Ranks"],
    value: "RANKS",
  },
  {
    label: ["Players", "& Notes"],
    value: "NOTES",
  },
] as const;

export type Position =
  | "qb"
  | "rb"
  | "wr"
  | "te"
  | "flex"
  | "dst"
  | "k"
  | "bench";

export type Roster = {
  [key in Position]: { starters?: number; max?: number };
};

/** @TODO make this type dynamic by passing in the number of teams as a param */
export type TeamSettings = {
  roster?: Roster;
  numOfTeams: number;
  draftPosition: number;
  ppr: 0 | 0.5 | 1;
  superflex: boolean;
};

export type ContentProps = {
  darkMode: boolean;
  editMode: EditMode;
  formState?: FormValuesType;
  handleChange: (f: keyof FormValuesType, v: FormValuesType[typeof f]) => void;
  team: TeamType;
};

function OuterContainer({
  children,
  dynamicClasses = `${borderColors.lightTertiary} ${backgroundColors.lightAccent}`,
}: PropsWithChildren<{ dynamicClasses: string }>) {
  return (
    <div className={`rounded-xl border ${dynamicClasses}`}>{children}</div>
  );
}

function InnerContainer({ children }: PropsWithChildren) {
  return (
    <div className={`flex flex-row items-stretch justify-start p-2`}>
      {children}
    </div>
  );
}

function TabsContainer({ children }: PropsWithChildren) {
  return <div className={"w-fit"}>{children}</div>;
}

function InfoContainer({
  children,
  dynamicClasses = "border-gray-200 bg-gray-100",
}: PropsWithChildren<{ dynamicClasses: string }>) {
  return (
    <div
      className={`flex w-full min-w-[500px] -translate-x-0.5 flex-col gap-4 rounded-xl border-y-2 border-r-4 border-double pr-4 pt-2 ${dynamicClasses}`}
    >
      {children}
    </div>
  );
}

function InfoContentContainer({ children }: PropsWithChildren) {
  return <div className={`pl-4 pt-4`}>{children}</div>;
}

function NotebookTabs({
  darkMode,
  activeTab,
  setActiveTab,
}: {
  darkMode: boolean;
  activeTab: ContentTab;
  setActiveTab: (tab: ContentTab) => void;
}) {
  /** @TODO move these hover classes to designsystem */
  const colorClasses = darkMode
    ? `${borderColors.darkSecondary} ${backgroundColors.darkTertiary} ${textColors.darkSecondary} ${borderColors.hover.lightAccent} ${backgroundColors.hover.darkAccent} ${textColors.hover.light}`
    : `${borderColors.lightAccent} ${backgroundColors.lightTertiary} ${textColors.lightMedium} ${borderColors.hover.darkAccent} ${backgroundColors.hover.lightSecondary} ${textColors.hover.dark}`;

  const activeClasses = darkMode
    ? `${borderColors.darkAccent} ${backgroundColors.darkAccent} ${textColors.light} ${borderColors.hover.lightAccent}`
    : `${borderColors.lightAccent} ${backgroundColors.lightSecondary} ${textColors.dark} ${borderColors.hover.darkAccent}`;

  const TEMP_NOTES_CLASSES = darkMode
    ? `!cursor-not-allowed ${textColors.darkSecondary} ${borderColors.darkSecondary} ${backgroundColors.darkTertiary} ${textColors.hover.darkSecondary} ${borderColors.hover.darkSecondary} ${backgroundColors.hover.darkTertiary}`
    : `!cursor-not-allowed ${textColors.lightMedium} ${borderColors.lightAccent} ${backgroundColors.lightTertiary} ${textColors.hover.lightMedium} ${borderColors.hover.lightAccent} ${backgroundColors.hover.lightTertiary}`;

  return (
    <div className={`pt-3 text-sm`}>
      <div className="flex min-w-[50px] max-w-[100px] flex-col items-stretch justify-start">
        {NOTEBOOK_TABS.map((tab, idx) => (
          <div
            className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl border-2 p-2 ${activeTab === tab.value ? activeClasses : tab.value === "NOTES" ? TEMP_NOTES_CLASSES : colorClasses}`}
            key={`team-tab-${idx}-${tab.value}`}
            onClick={
              tab.value === "NOTES" ? undefined : () => setActiveTab(tab.value)
            }
          >
            <div className="flex flex-col">
              {tab.label.map((text) => (
                <span>{text}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActionButtons({
  darkMode,
  team,
}: {
  darkMode: boolean;
  team: TeamType;
}) {
  const [showRanksModal, setShowRanksModal] = useState<boolean>(false);
  const [showRosterModal, setShowRosterModal] = useState<boolean>(false);

  /**
   * @TODO
   *  1. add the modals
   *  2. finish these buttons
   */
  return (
    <div className="flex flex-col items-center gap-2 p-2 text-xs">
      <Button onClick={() => setShowRanksModal(true)}>
        <div className="flex flex-col">
          <span>edit ranks</span>
        </div>
      </Button>
      <Button onClick={() => setShowRosterModal(true)}>
        <div className="flex flex-col">
          <span>edit roster</span>
        </div>
      </Button>
      {showRanksModal &&
        // <EditRanksModal />
        "Ranks Modal"}
      {showRosterModal &&
        // <EditRosterModal />
        "Roster Modal"}
    </div>
  );
}

function EditModeToggle({
  onClick,
  text = "edit",
}: {
  onClick: () => void;
  text: "cancel" | "edit";
}) {
  return (
    <div className={`flex justify-end pt-1`}>
      <Button
        additionalClasses={transition.standard}
        theme={text === "cancel" ? "cancel-light" : undefined}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
}

function SaveChangesButton({ handleSave }: { handleSave: () => void }) {
  return (
    <div className={`flex justify-end pb-4 pt-1`}>
      <Button theme="submit" bold onClick={handleSave}>
        save changes
      </Button>
    </div>
  );
}

function InfoContent(props: {
  darkMode: boolean;
  editMode: { [key in EditModeKeys]: boolean };
  formState?: FormValuesType;
  handleChange: (f: keyof FormValuesType, v: FormValuesType[typeof f]) => void;
  team: TeamType;
  activeTab: ContentTab;
}) {
  const { activeTab } = props;
  const Content = useMemo(() => CONTENT_MAP[activeTab], [activeTab]);
  // const props = useMemo(() => {
  //   return {
  //     darkMode,
  //     editMode,
  //     formState,
  //     team,
  //     handleChange,
  //   };
  // }, [darkMode, team, editMode, activeTab]);
  return <Content {...props} />;
}

export default function TeamInfo({
  activeTab,
  formState,
  editMode,
  team,
  handleEdit,
  handleEditMode,
  handleActiveTab,
  handleFieldChange,
}: {
  activeTab: ContentTab;
  formState?: FormValuesType;
  editMode: EditMode;
  team: TeamType;
  handleEdit: (values: FormValuesType) => void;
  handleEditMode: () => void;
  handleActiveTab: (tab: ContentTab) => void;
  handleFieldChange: (
    f: keyof FormValuesType,
    v: FormValuesType[typeof f],
  ) => void;
}) {
  const [theme] = useAtom(useThemeAtom);
  const darkMode = useMemo(() => theme === "dark", [theme]);

  /** @TODO move this to `useTeamForm`? */
  const handleSaveChanges = () => formState && handleEdit(formState);

  console.log("formState", formState);
  /** @TODO add transition to this (and perhaps children) for smooth expanding */
  return (
    <OuterContainer
      dynamicClasses={
        darkMode
          ? `${borderColors.darkTertiary} ${backgroundColors.darkSecondary}`
          : `${borderColors.lightTertiary} ${backgroundColors.lightAccent}`
      }
    >
      <InnerContainer>
        <TabsContainer>
          <NotebookTabs
            darkMode={darkMode}
            activeTab={activeTab}
            setActiveTab={handleActiveTab}
          />
          {/** @NOTE this was called <RanksAndRoster /> */}
          <ActionButtons darkMode={darkMode} team={team} />
        </TabsContainer>
        <InfoContainer
          dynamicClasses={
            darkMode
              ? `${borderColors.darkSecondary} ${backgroundColors.darkAccent}`
              : `${borderColors.lightTertiary} ${backgroundColors.lightSecondary}`
          }
        >
          <EditModeToggle
            text={editMode[activeTab] ? "cancel" : "edit"}
            onClick={handleEditMode}
          />
          <InfoContentContainer>
            <InfoContent
              activeTab={activeTab}
              darkMode={darkMode}
              editMode={editMode}
              formState={formState}
              handleChange={handleFieldChange}
              team={team}
            />
          </InfoContentContainer>
          {editMode[activeTab] && (
            <SaveChangesButton handleSave={handleSaveChanges} />
          )}
        </InfoContainer>
      </InnerContainer>
    </OuterContainer>
  );
}
