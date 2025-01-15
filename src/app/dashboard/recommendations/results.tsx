import { PropsWithChildren } from "react";
import { Player as PlayerType } from "@prisma/client";
import { Roster as RosterType } from "../teams/_components/TeamInfo/info";
import { positionColors, teamColors, textColors } from "@designsystem/colors";
import { RosterTable } from "@designsystem/roster";
import OuterContainer from "./_components/OuterContainer";
import InnerContainer from "./_components/InnerContainer";
import { ColumnInput } from "~/app/_components/design-system/table/util";

function Player({
  mode,
  player,
}: {
  mode: "dark" | "light";
  player: PlayerType;
}) {
  const { text, background } =
    positionColors[player.position as keyof typeof positionColors][mode];

  const teamColor =
    teamColors.text[player.team as keyof (typeof teamColors)["text"]];

  return (
    <>
      <span className={`${text} font-bold`}>{`${player.position} `}</span>
      <span
        className={
          mode === "dark" ? textColors.lightSecondary : textColors.darkSecondary
        }
      >{`${player.name}, `}</span>
      <span
        className={
          mode === "dark" ? textColors.lightSecondary : textColors.darkSecondary
        }
      >{`${player.team}`}</span>
    </>
  );
}

function Label({ children, width }: PropsWithChildren & { width: string }) {
  return (
    <div className={`pr-3 pt-1 text-end ${width}`}>
      <span>{children}</span>
    </div>
  );
}

function Starters({
  darkMode,
  starters,
}: {
  darkMode: boolean;
  starters: Array<PlayerType>;
}) {
  return (
    // <div className="flex gap-2 font-semibold">
    //   <span>starters:</span>
    <div className="flex gap-1">
      <div className="flex flex-wrap text-sm">
        {starters.map((player, idx) => (
          <div>
            <Player
              player={player}
              key={idx}
              mode={darkMode ? "dark" : "light"}
            />
            {idx < starters.length - 1 ? <span className="mx-2">|</span> : ""}
          </div>
        ))}
      </div>
    </div>
    // </div>
  );
}

function Bench({
  darkMode,
  bench,
}: {
  darkMode: boolean;
  bench: Array<PlayerType>;
}) {
  return (
    <div className="flex gap-1">
      <div className="flex flex-wrap text-sm">
        {bench.map((player, idx) => (
          <div>
            <Player
              player={player}
              key={idx}
              mode={darkMode ? "dark" : "light"}
            />
            {idx < bench.length - 1 ? <span className="mx-2">|</span> : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecsSummary({
  darkMode,
  starters,
  bench,
}: {
  darkMode: boolean;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
}) {
  return (
    <OuterContainer darkMode={darkMode}>
      <InnerContainer
        darkMode={darkMode}
        label={<Label width="w-24">starters:</Label>}
        content={<Starters darkMode={darkMode} starters={starters} />}
      />
      <InnerContainer
        darkMode={darkMode}
        label={<Label width="w-24">bench:</Label>}
        content={<Bench darkMode={darkMode} bench={bench} />}
      />
    </OuterContainer>
  );
}

function RdByRdGrid({
  darkMode,
  recommendations,
}: {
  darkMode: boolean;
  recommendations?: Array<{ pick: number; recommendation: PlayerType }>;
}) {
  return (
    <div className="grid w-full grid-cols-5 gap-2 text-sm">
      <div className="col-span-1 text-center text-base opacity-80">
        <span>Round</span>
      </div>
      <div className="col-span-1 text-center text-base opacity-80">
        <span>Pick (overall)</span>
      </div>
      <div className="col-span-3 text-center text-base opacity-80">
        <span>Player</span>
      </div>
      {recommendations?.map((player, idx) => (
        <>
          <div key={idx} className="col-span-1 text-center opacity-80">
            <span>{idx + 1}</span>
          </div>
          <div key={idx} className="col-span-1 text-center opacity-80">
            <span>{player.pick}</span>
          </div>
          <div className="col-span-3 text-center opacity-80">
            <Player
              player={player.recommendation}
              mode={darkMode ? "dark" : "light"}
            />
          </div>
        </>
      ))}
    </div>
  );
}

export function RecsRoundByRound({
  darkMode,
  recommendations,
}: {
  darkMode: boolean;
  recommendations?: Array<{ pick: number; recommendation: PlayerType }>;
}) {
  return (
    <OuterContainer darkMode={darkMode}>
      <InnerContainer
        darkMode={darkMode}
        label={<Label width="w-24">round by round:</Label>}
        content={
          <RdByRdGrid darkMode={darkMode} recommendations={recommendations} />
        }
      />
    </OuterContainer>
  );
}

export function ProjectedRoster({
  darkMode,
  columns,
  rosterSettings,
  starters,
  bench,
}: {
  darkMode: boolean;
  columns: Array<ColumnInput>;
  rosterSettings: RosterType;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
}) {
  return (
    <OuterContainer darkMode={darkMode}>
      <InnerContainer
        darkMode={darkMode}
        label={<Label width="w-24">projected roster:</Label>}
        content={
          <RosterTable
            columns={columns}
            darkMode={darkMode}
            starters={starters}
            bench={bench}
            rosterSettings={rosterSettings}
          />
        }
      />
    </OuterContainer>
  );
}
