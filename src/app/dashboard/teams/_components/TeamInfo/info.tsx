"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Team } from "@prisma/client";
import Button from "@designsystem/button";
// import { ContentProps, NameAndLeague, Notes, Ranks, Settings } from "./content";
import { useThemeAtom } from "~/app/dashboard/atoms";
import { NameAndLeague, Notes, Ranks, Settings } from "./content";

/** @TODO make all field optional??? */
export type Roster = {
  qb: {
    starters: number;
    max: number;
  };
  rb: {
    starters: number;
    max: number;
  };
  wr: {
    starters: number;
    max: number;
  };
  te: {
    starters: number;
    max: number;
  };
  flex: {
    starters: number;
  };
  dst?: {
    starters: number;
    max: number;
  };
  k?: {
    starters: number;
    max: number;
  };
  bench: {
    max: number;
  };
};

export type TeamSettings = {
  roster: Roster;
  numOfTeams: number;
  draftPosition: number;
  ppr: boolean | number;
  superflex: boolean;
};

/** @TODO add a 'callback' prop to this type */
export type ContentProps = {
  // activeTab: ContentTabs;
  editMode: boolean;
  // editMode: { [key in EditModeKeys]: boolean };
  darkMode: boolean;
  // setEditMode: (editMode: { [key in EditModeKeys]: boolean }) => void;
  team: Team;
};

const CONTENT_MAP = {
  Settings: Settings,
  Ranks: Ranks,
  Notes: Notes,
  NameAndLeague: NameAndLeague,
};

export type ContentTab = keyof typeof CONTENT_MAP;
export type EditModeKeys = ContentTab | "NewTeam";

export const INITIAL_EDIT_MODES: { [key in EditModeKeys]: boolean } = {
  Settings: false,
  Ranks: false,
  Notes: false,
  NameAndLeague: false,
  NewTeam: true,
};

function OuterContainer({
  children,
  dynamicClasses = "border-gray-300 bg-gray-200",
}: PropsWithChildren<{ dynamicClasses: string }>) {
  return (
    <div className={`rounded-xl border shadow-md ${dynamicClasses}`}>
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
      className={`w-full -translate-x-0.5 rounded-xl border-y-2 border-r-4 border-double pr-4 pt-2 ${dynamicClasses}`}
    >
      {children}
    </div>
  );
}

function NotebookTabs() {
  return <div>Notebook Tabs</div>;
}

function ActionButtons() {
  return <div>Action Buttons</div>;
}

function EditMode({ buttonText = "edit" }: { buttonText: "done" | "edit" }) {
  return (
    <div className={`flex justify-end pt-1`}>
      <Button>{buttonText}</Button>
    </div>
  );
}

function InfoContent({
  editMode: editModeMap,
  darkMode,
  setEditMode,
  team,
  activeTab = "NameAndLeague",
}: {
  activeTab: ContentTab;
  darkMode: boolean;
  editMode: { [key in EditModeKeys]: boolean };
  setEditMode: (editMode: { [key in EditModeKeys]: boolean }) => void;
  team: Team;
}) {
  const editMode = useMemo(
    () => editModeMap[activeTab],
    [editModeMap, activeTab],
  );
  const Content = useMemo(() => CONTENT_MAP[activeTab], [activeTab]);
  const props: ContentProps = useMemo(() => {
    return {
      darkMode,
      team,
      editMode,
      setEditMode,
    };
  }, [darkMode, team, editMode, activeTab]);
  return <Content {...props} />;
}

export default function TeamInfo({ team }: { team: Team }) {
  const [theme] = useAtom(useThemeAtom);
  const darkMode = useMemo(() => theme === "dark", [theme]);

  const [editMode, setEditMode] = useState(INITIAL_EDIT_MODES);
  const [activeTab, setActiveTab] = useState<ContentTab>("NameAndLeague");

  return (
    // <div>Team Info</div>
    <OuterContainer
      dynamicClasses={
        darkMode ? "border-gray-800 bg-gray-900" : "border-gray-300 bg-gray-200"
      }
    >
      <InnerContainer>
        <TabsContainer>
          <NotebookTabs />
          {/** @NOTE this was called <RanksAndRoster /> */}
          <ActionButtons />
        </TabsContainer>
        <InfoContainer
          dynamicClasses={
            darkMode
              ? "border-gray-500 bg-gray-700"
              : "border-gray-200 bg-gray-100"
          }
        >
          <EditMode buttonText={editMode[activeTab] ? "done" : "edit"} />
          <InfoContent
            activeTab={activeTab}
            editMode={editMode}
            darkMode={darkMode}
            setEditMode={setEditMode}
            team={team}
          />
        </InfoContainer>
      </InnerContainer>
    </OuterContainer>
  );
}
