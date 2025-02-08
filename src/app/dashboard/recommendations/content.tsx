"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useAtomValue } from "jotai";
import { Session } from "next-auth";
import { Team } from "@prisma/client";
import Button from "@designsystem/button";
import Login from "@designsystem/link/Login";
import { H1, H3 } from "@designsystem/typography/header";
import { FormSubmit } from "@designsystem/form/components";
import { backgroundColors, textColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import FixedWidthContainer from "@designsystem/container/FixedWidthContainer";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";
import {
  RecsFormProvider,
  useRecsFormContext,
} from "./context/RecsFormContext";
import { useRouter } from "next/navigation";
import transition from "~/app/_components/design-system/class-names/transition";
import {
  RESULTS_PAGE_COLORS,
  RESULTS_TAB_COLORS,
  RoundInTab,
  RoundOutTab,
} from "@designsystem/tab/RoundedTab";
import { HiddenResults, ShowResults } from "./_components/MockResults";
import { animated, useSpring } from "@react-spring/web";
import { COLUMN_WIDTHS } from "./layout";

export type PlayerColumnLabel =
  | "position"
  | "name"
  | "team"
  // | "bye"
  | "ecr"
  // | "positionalRank"
  | "currentAdp"
  // | "consistencyT1"
  // | "consistencyT2"
  | "value";

function RecsTitle({ darkMode }: { darkMode: boolean }) {
  return (
    <div
      className={`flex w-full flex-col gap-1 pt-5 text-center font-aquire ${darkMode ? "text-gray-300" : "text-gray-700"}`}
    >
      <H3>Get Draft Pick</H3>
      <H1>Recommendations</H1>
    </div>
  );
}

export function RecommendationsRow({ children }: PropsWithChildren) {
  const { showRecommendations } = useRecsFormContext();

  return (
    <div
      className={`flex w-full p-4 ${showRecommendations ? "w-[320px]" : "w-[812px]"} ${transition.standard}`}
    >
      {children}
    </div>
  );
}

export function SideTab({
  results,
  // theme = "light",
}: {
  results?: boolean;
  // theme?: "light" | "dark";
}) {
  const theme = useAtomValue(useThemeAtom);
  const { showRecommendations } = useRecsFormContext();
  const translate = showRecommendations ? "-translate-x-6" : "translate-x-9";

  return (
    <div className={`left-full z-20 h-72 w-10 pr-1 ${translate}`}>
      <div className="flex h-full w-full flex-col items-stretch">
        <RoundOutTab direction="tl" theme={theme} results={results} />
        <RoundInTab direction="bl" theme={theme} />
        <div
          className={`w-full grow rounded-br-2xl rounded-tr-2xl ${RESULTS_TAB_COLORS[theme || "light"]}`}
        />
        <RoundInTab direction="tl" theme={theme} />
      </div>
    </div>
  );
}

function BackToSettings({
  handleClick,
}: {
  handleClick: (r: AppRouterInstance) => void;
}) {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState<boolean>();
  const { x } = useSpring({
    from: { x: 0 },
    x: isHovering ? -10 : 0,
    config: { tension: 400, friction: 15, mass: 1 },
  });
  return (
    <div className="group z-20 h-8 w-0 font-semibold">
      <div
        className="group h-8 w-2 -translate-x-12 translate-y-24 hover:-translate-x-14 hover:text-sky-700"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Button
          additionalClasses="flex flex-nowrap justify-start items-center gap-4 h-8 w-10 pl-4 -translate-x-3 overflow-hidden whitespace-nowrap transition-all duration-300 ease-out bg-sky-300 bg-opacity-50 !rounded-lg group-hover:w-16 group-hover:border-transparent group-hover:bg-inherit group-hover:gap-0"
          theme="transparent"
          onClick={() => handleClick(router)}
        >
          <animated.div
            style={{ transform: x.to((x) => `translateX(${x}px)`) }}
          >
            <span>{"<"}</span>
          </animated.div>
          {/* <div className=""> */}
          <span>{"edit"}</span>
          {/* </div> */}
        </Button>
      </div>
    </div>
  );
}

export function RecommendationsSubmit() {
  const router = useRouter();
  const darkMode = useAtomValue(useThemeAtom) === "dark";
  const {
    formState,
    handleBackToSettings,
    handleShowRecommendations,
    handleGetRecommendations,
  } = useRecsFormContext();

  const handleSubmit = () => {
    const url = handleGetRecommendations();
    router.push(url);
  };

  // useEffect(() => {
  //   // handleShowRecommendations();
  //   handleBackToSettings();
  //   return () => {
  //     // handleBackToSettings();
  //   };
  // }, []);

  return (
    <FormSubmit
      text="Get Recommendations"
      darkMode={darkMode}
      orientation="stretch"
      onClick={handleSubmit}
      /** @TODO need a tooltip that explains this */
      // disable button when form is incomplete
      // AKA numOfTeams or draftPosition are equal to their initial values of 0
      disabled={formState.numOfTeams === 0 || formState.draftPosition === 0}
    />
  );
}

export function RecommendationsText() {
  const { showRecommendations } = useRecsFormContext();
  const darkMode = useAtomValue(useThemeAtom) === "dark";
  return (
    <span
      className={`text-lg font-semibold ${
        darkMode ? textColors.lightTertiary : textColors.darkTertiary
      }`}
    >
      {!showRecommendations ? "enter your league's settings here:" : ""}
    </span>
  );
}

export function RecommendationsInputs({
  widths,
}: {
  widths: typeof COLUMN_WIDTHS;
}) {
  const theme = useAtomValue(useThemeAtom);
  const darkMode = theme === "dark";

  const {
    formState,
    handleFormChange,
    showRecommendations,
    handleBackToSettings,
  } = useRecsFormContext();

  return (
    <FixedWidthContainer
      className={`flex rounded-lg ${
        darkMode ? backgroundColors.darkAccent : backgroundColors.lightAccent
      } ${showRecommendations ? "py-2 pl-2 pr-1" : ""}`}
      width={showRecommendations ? widths.show[0] : widths.hide[0]}
    >
      <div
        className={`flex min-h-[680px] w-full flex-col gap-6 rounded-lg p-4 text-start ${
          showRecommendations
            ? darkMode
              ? backgroundColors.darkTertiary
              : backgroundColors.lightTertiary
            : ""
        }`}
      >
        <RecommendationsText />
        <TeamSettingsForm
          editMode={!showRecommendations}
          hideRosterLabel={showRecommendations}
          teamSettings={formState}
          handleSettingsChange={handleFormChange}
        />
      </div>
      {/* {showRecommendations && (
        <>
          <SideTab results />
          <BackToSettings handleClick={handleBackToSettings} />
        </>
      )} */}
    </FixedWidthContainer>
  );
}

export function TeamSettingsButton({
  name,
  id,
  handleClick,
  activeSettings,
  handleActiveSettings,
}: {
  name: string;
  id: Team["id"];
  handleClick: () => void;
  activeSettings?: Team["id"];
  handleActiveSettings: (id: Team["id"]) => void;
}) {
  return (
    <Button
      onClick={() => {
        handleClick();
        handleActiveSettings(id);
      }}
      theme={"transparent-hover"}
    >
      <span
        className={`font-mono ${activeSettings === id ? "font-semibold underline" : ""}`}
      >
        {name}
      </span>
    </Button>
  );
}

export function TeamSettingsList({
  session,
  teams,
}: {
  session: Session | null;
  teams: Array<Team>;
}) {
  const darkMode = useAtomValue(useThemeAtom) === "dark";

  const { activeSettings, handleActiveSettings, getSettingsList } =
    useRecsFormContext();

  const settingsList = useMemo(() => getSettingsList(teams), [teams]);

  /** @TODO break this all out into separate components (AKA clean it up) */
  return (
    <div
      className={`flex max-h-fit flex-col gap-2 rounded-lg p-4 ${
        !session
          ? `${darkMode ? "bg-slate-700" : "bg-zinc-400"}`
          : darkMode
            ? backgroundColors.darkAccent
            : backgroundColors.lightAccent
      }`}
    >
      {session ? (
        <>
          <span className="text-sm text-gray-500">
            or use one of your existing team's settings:
          </span>
          {settingsList.length === 0 ? (
            <span className="text-sm italic text-gray-500">
              you have no saved teams
            </span>
          ) : (
            <div className="flex w-full flex-col items-start gap-2 pl-2">
              {settingsList.length === 0 ? (
                <span
                  className={`text-sm italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                >
                  {"you have no saved teams"}
                </span>
              ) : (
                settingsList.map(({ name, id, handleClick }, idx) => (
                  <TeamSettingsButton
                    key={`settings-list-${name}-${idx}`}
                    name={name}
                    id={id}
                    handleClick={handleClick}
                    activeSettings={activeSettings}
                    handleActiveSettings={handleActiveSettings}
                  />
                ))
              )}
            </div>
          )}
        </>
      ) : (
        <span
          className={`text-sm italic ${darkMode ? "text-gray-400" : "text-gray-500"}`}
        >
          <Login theme={darkMode ? "light" : undefined} /> to save your lettings
          for later.
        </span>
      )}
    </div>
  );
}

export function SettingsAndSubmit({
  teams,
  session,
  widths,
}: {
  teams: Array<Team>;
  session: Session | null;
  widths: typeof COLUMN_WIDTHS;
}) {
  const { showRecommendations } = useRecsFormContext();

  return (
    <FixedWidthContainer
      className={`flex flex-col gap-4 ${transition.standard} ${showRecommendations ? "" : "pl-4"}`}
      width={showRecommendations ? widths.show[1] : widths.hide[1]}
    >
      {!showRecommendations && (
        <>
          <TeamSettingsList teams={teams} session={session} />
          <RecommendationsSubmit />
        </>
      )}
    </FixedWidthContainer>
  );
}

export function RecommendationsContent({ children }: PropsWithChildren) {
  const darkMode = useAtomValue(useThemeAtom) === "dark";

  // const { handleShowRecommendations, handleBackToSettings, showRecommendations } =
  //   useRecsFormContext();

  // const handleToRecommendations = () => handleShowRecommendations();
  // const handleToSettings = () => handleBackToSettings();

  return (
    <RecsFormProvider>
      <RecsTitle darkMode={darkMode} />
      <div className="pr-2">
        <div className="flex items-stretch rounded-2xl border-b-2 border-t-2 border-b-zinc-300 border-t-zinc-300">
          {children}
        </div>
      </div>
    </RecsFormProvider>
  );
}

export function MockResultsContent() {
  const theme = useAtomValue(useThemeAtom);
  const { showRecommendations } = useRecsFormContext();

  return (
    /** @TODO replace this div with ResultsContainer, then move it to layout.tsx */
    <div
      className={`overflow-hidden rounded-br-2xl rounded-tr-2xl pb-2 ${!showRecommendations ? RESULTS_PAGE_COLORS[theme || "light"] : ""}`}
    >
      <div
        className={`relative flex translate-x-px flex-col ${showRecommendations ? "w-[560px] opacity-100" : "w-[72px] opacity-50"} ${transition.standard}`}
      >
        {showRecommendations ? <ShowResults /> : <HiddenResults />}
        {/* <ShowResults /> */}
      </div>
      {/* {!showRecommendations && <SideTab theme={theme} />} */}
    </div>
  );
}

export function ResultsContainer({ children }: PropsWithChildren) {
  const theme = useAtomValue(useThemeAtom);
  const { showRecommendations } = useRecsFormContext();

  return (
    <FixedWidthContainer width={showRecommendations ? "w-[546px]" : "w-[72px]"}>
      {children}
    </FixedWidthContainer>
  );
}
