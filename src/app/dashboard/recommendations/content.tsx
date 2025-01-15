"use client";

import { PropsWithChildren, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { Session } from "next-auth";
import { Player, Team } from "@prisma/client";
import Button from "@designsystem/button";
import Login from "@designsystem/link/Login";
import { H1, H3 } from "@designsystem/typography/header";
import { FormSubmit } from "@designsystem/form/components";
import { backgroundColors, textColors } from "@designsystem/colors";
import useThemeAtom from "@designsystem/theme/atoms/useThemeAtom";
import useThemeEffect from "@designsystem/theme/hooks/useThemeEffect";
import ContentContainer from "@designsystem/container/ContentContainer";
import TeamSettingsForm from "@components/forms/TeamSettings/TeamSettingsForm";
import useRecommendationForm, {
  RecsFormValues,
} from "./hooks/useRecommendationForm";
import useGetRecommendations from "./hooks/useGetRecommendations";
import { ProjectedRoster, RecsRoundByRound, RecsSummary } from "./results";
import { getRecommendationSummary } from "./util";
import { ColumnInput } from "~/app/_components/design-system/table/util";

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

/** @TODO move this to the table that uses it, and have it extend a more generic column type */
// export type PlayerColumn = ColumnInput & {
//   getValue: (player: Player) => React.ReactNode;
// };

const PLAYER_COLUMNS = [
  { label: "position" },
  { label: "name" },
  // { label: "team" },
  // { label: "bye" },
  { label: "ecr" },
  // { label: "positionalRank" },
  { label: "currentAdp" },
  // { label: "consistencyT1" },
  // { label: "consistencyT2" },
  {
    label: "value",
    getValue: (p: Player) => <PlayerValue value={p.currentAdp - p.ecr} />,
  },
] as Array<ColumnInput>;

const COLOR_MAP = {
  "+": {
    dark: "text-green-400",
    light: "text-green-700",
  },
  "-": {
    dark: "text-red-400",
    light: "text-red-700",
  },
} as const;

const _getColor = (color: "+" | "-", theme: "dark" | "light") =>
  COLOR_MAP[color][theme];

function PlayerValue({ value }: { value: number }) {
  const [theme] = useAtom(useThemeAtom);
  const negative = value < 0;
  const color = theme ? _getColor(negative ? "-" : "+", theme) : "text-black";
  const val = Math.abs(value);
  return (
    <span
      className={`font-bold ${color}`}
    >{`${negative ? "-" : "+"} ${val}`}</span>
  );
}

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

function RecsFlexContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full w-full max-w-[860px] flex-col items-center gap-6">
      {children}
    </div>
  );
}

function RecsContentCol({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4 p-4">{children}</div>;
}

function RecsSettingsRow({ children }: PropsWithChildren) {
  return <div className="flex gap-4">{children}</div>;
}

function SettingsInputsSection({
  darkMode,
  formState,
  handleGetRecommendations,
  handleFormChange,
}: {
  darkMode: boolean;
  formState: RecsFormValues;
  handleGetRecommendations: () => void;
  handleFormChange: (values: RecsFormValues) => void;
}) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-lg p-4 text-start ${
        darkMode
          ? backgroundColors.darkTertiary
          : backgroundColors.lightTertiary
      }`}
    >
      <span
        className={`text-lg font-semibold ${
          darkMode ? textColors.lightTertiary : textColors.darkTertiary
        }`}
      >
        enter your league's settings here:
      </span>
      <TeamSettingsForm
        editMode
        teamSettings={formState}
        handleSettingsChange={handleFormChange}
      />
      <FormSubmit
        text="Get Recommendations"
        darkMode={darkMode}
        orientation="center"
        onClick={handleGetRecommendations}
        /** @TODO need a tooltip that explains this */
        // disable button when form is incomplete
        // AKA numOfTeams or draftPosition are equal to their initial values of 0
        disabled={formState.numOfTeams === 0 || formState.draftPosition === 0}
      />
    </div>
  );
}

function TeamSettingsList({
  activeSettings,
  darkMode,
  settingsList,
  session,
  handleActiveSettings,
}: {
  activeSettings?: Team["id"];
  darkMode: boolean;
  session: Session | null;
  settingsList: {
    id: Team["id"];
    name: string;
    settings: RecsFormValues;
    handleClick: () => void;
  }[];
  handleActiveSettings: (id: Team["id"]) => void;
}) {
  return (
    <div
      className={`flex max-h-fit flex-col gap-2 rounded-lg p-4 ${
        !session
          ? `${darkMode ? "bg-slate-700" : "bg-zinc-400"}`
          : darkMode
            ? backgroundColors.darkSecondary
            : backgroundColors.lightSecondary
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
              {settingsList.map(({ name, id, handleClick }, idx) => (
                <Button
                  onClick={() => {
                    handleClick();
                    handleActiveSettings(id);
                  }}
                  key={`settings-list-${name}-${idx}`}
                  theme={"transparent-hover"}
                >
                  <span
                    className={`font-mono ${activeSettings === id ? "font-semibold underline" : ""}`}
                  >
                    {name}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </>
      ) : (
        <span
          className={`text-sm italic ${darkMode ? "text-gray-400" : "text-gray-300"}`}
        >
          <Login theme={darkMode ? "light" : undefined} /> to save your lettings
          for later.
        </span>
      )}
    </div>
  );
}

function PlayerRecommendations({
  darkMode,
  formState,
  recommendations,
  starters,
  bench,
}: {
  darkMode: boolean;
  formState: RecsFormValues;
  recommendations: Array<{ pick: number; recommendation: Player }> | undefined;
  starters: Array<Player>;
  bench: Array<Player>;
}) {
  return (
    <>
      <RecsSummary darkMode={darkMode} starters={starters} bench={bench} />
      <RecsRoundByRound darkMode={darkMode} recommendations={recommendations} />
      <ProjectedRoster
        darkMode={darkMode}
        columns={PLAYER_COLUMNS}
        rosterSettings={formState.roster}
        starters={starters}
        bench={bench}
      />
    </>
  );
}

export default function RecommendationsContent({
  hasDarkMode,
  teams,
  session,
}: {
  hasDarkMode: boolean;
  teams: Team[];
  session: Session | null;
}) {
  const [themeAtom, setThemeAtom] = useAtom(useThemeAtom);
  // sync theme with user settings from server
  useThemeEffect(hasDarkMode, themeAtom, setThemeAtom);

  const [showRecommendations, setShowRecommendations] = useState(false);

  const {
    formState,
    handleFormChange,
    settingsList,
    activeSettings,
    handleActiveSettings,
  } = useRecommendationForm(teams);

  const { recommendations, getRecommendations } = useGetRecommendations();

  const handleGetRecommendations = () => {
    if (!showRecommendations) setShowRecommendations(true);
    getRecommendations({
      ...formState,
      ppr: formState.ppr === "NO" ? "0" : formState.ppr,
      superflex: formState.superflex === "YES",
    });
  };

  const Container = useMemo(
    () => new ContentContainer({ darkMode: themeAtom === "dark" }),
    [themeAtom],
  );

  const { starters, bench } = useMemo(() => {
    return recommendations
      ? getRecommendationSummary(recommendations, formState.roster)
      : { starters: [], bench: [] };
  }, [recommendations, formState.roster]);

  return (
    <Container.Boxy>
      <Container.Scrollable>
        <RecsFlexContainer>
          <RecsTitle darkMode={themeAtom === "dark"} />
          <RecsContentCol>
            <RecsSettingsRow>
              <SettingsInputsSection
                darkMode={themeAtom === "dark"}
                formState={formState}
                handleGetRecommendations={handleGetRecommendations}
                handleFormChange={handleFormChange}
              />
              <TeamSettingsList
                darkMode={themeAtom === "dark"}
                settingsList={settingsList}
                activeSettings={activeSettings}
                handleActiveSettings={handleActiveSettings}
                session={session}
              />
            </RecsSettingsRow>
            {showRecommendations && (
              <PlayerRecommendations
                darkMode={themeAtom === "dark"}
                formState={formState}
                recommendations={recommendations}
                starters={starters}
                bench={bench}
              />
            )}
          </RecsContentCol>
        </RecsFlexContainer>
      </Container.Scrollable>
    </Container.Boxy>
  );
}
