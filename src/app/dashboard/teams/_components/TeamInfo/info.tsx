"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { useAtom } from "jotai";
import Button from "@designsystem/button";
import { backgroundColors, borderColors } from "@designsystem/colors";
import { useThemeAtom } from "~/app/dashboard/atoms";
import { NameAndLeague, Notes, Ranks, Settings } from "./content";
import { TeamType } from "../../content";
import { textColors } from "~/app/_components/design-system/colors/text";
import { FormValuesType } from "~/app/_components/forms/NewTeam";
import transition from "~/app/_components/design-system/class-names/transition";
import {
  ContentTab,
  EditMode,
  EditModeKeys,
  INITIAL_EDIT_MODES,
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
  // ppr: number;
  ppr: 0 | 0.5 | 1;
  superflex: boolean;
};

/** @TODO add a 'callback' prop to this type */
export type ContentProps = {
  // activeTab: ContentTabs;
  darkMode: boolean;
  editMode: EditMode;
  formState?: FormValuesType;
  handleChange: (f: keyof FormValuesType, v: FormValuesType[typeof f]) => void;
  // setEditMode: (editMode: { [key in EditModeKeys]: boolean }) => void;
  team: TeamType;
};

function OuterContainer({
  children,
  // dynamicClasses = "border-gray-300 bg-gray-200",
  dynamicClasses = `${borderColors.lightTertiary} ${backgroundColors.lightAccent}`,
}: PropsWithChildren<{ dynamicClasses: string }>) {
  return (
    <div className={`max-w-[60vw] rounded-xl border ${dynamicClasses}`}>
      {children}
    </div>
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

function ContentContainer({ children }: PropsWithChildren) {
  return <div className={`pt-4`}>{children}</div>;
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

function InfoContent({
  darkMode,
  // editMode: editModeMap,
  editMode,
  formState,
  handleChange,
  team,
  // setEditMode,
  activeTab = "INFO",
}: {
  darkMode: boolean;
  editMode: { [key in EditModeKeys]: boolean };
  formState?: FormValuesType;
  handleChange: (f: keyof FormValuesType, v: FormValuesType[typeof f]) => void;
  team: TeamType;
  // setEditMode: (editMode: { [key in EditModeKeys]: boolean }) => void;
  activeTab: ContentTab;
}) {
  // const editMode = useMemo(
  //   () => editModeMap[activeTab],
  //   [editModeMap, activeTab],
  // );
  const Content = useMemo(() => CONTENT_MAP[activeTab], [activeTab]);
  const props = useMemo(() => {
    return {
      darkMode,
      editMode,
      formState,
      team,
      handleChange,
      // setEditMode,
    };
  }, [darkMode, team, editMode, activeTab]);
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

  // const [editMode, setEditMode] = useState(INITIAL_EDIT_MODES);
  // const [activeTab, setActiveTab] = useState<ContentTab>("INFO");

  // const handleEditMode = () => {
  //   setEditMode((prev) => ({
  //     ...prev,
  //     [activeTab]: !prev[activeTab],
  //   }));
  // };

  /** @TODO move this to `useTeamForm`? */
  const handleFormSubmit = () => {
    console.log("formState", formState);
    formState && handleEdit(formState);
  };

  return (
    // <div>Team Info</div>
    <OuterContainer
      dynamicClasses={
        // darkMode ? "border-gray-800 bg-gray-900" : "border-gray-300 bg-gray-200"
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
              ? // ? `border-gray-500 ${backgroundColors.darkAccent}`
                `${borderColors.darkSecondary} ${backgroundColors.darkAccent}`
              : `${borderColors.lightTertiary} ${backgroundColors.lightSecondary}`
          }
        >
          <EditModeToggle
            text={editMode[activeTab] ? "cancel" : "edit"}
            onClick={handleEditMode}
          />
          <ContentContainer>
            <InfoContent
              activeTab={activeTab}
              darkMode={darkMode}
              editMode={editMode}
              formState={formState}
              handleChange={handleFieldChange}
              // setEditMode={setEditMode}
              team={team}
            />
          </ContentContainer>
          {editMode[activeTab] && (
            <SaveChangesButton handleSave={handleFormSubmit} />
          )}
        </InfoContainer>
      </InnerContainer>
    </OuterContainer>
  );
}
