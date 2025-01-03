"use client";

import { useMemo } from "react";
import { Player as PlayerType } from "@prisma/client";
import { getRecommendationSummary } from "./util";
import OuterContainer from "./_components/OuterContainer";
import InnerContainer from "./_components/InnerContainer";
import { Roster as RosterType } from "../teams/_components/TeamInfo/info";
import { positionColors, teamColors, textColors } from "@designsystem/colors";

function Player({
  mode,
  player,
}: {
  mode: "dark" | "light";
  player: PlayerType;
}) {
  const { text, background } = useMemo(
    () => positionColors[player.position as keyof typeof positionColors][mode],
    [player, mode],
  );

  const teamColor = useMemo(
    () => teamColors.text[player.team as keyof (typeof teamColors)["text"]],
    [player],
  );

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

function Starters({
  darkMode,
  starters,
}: {
  darkMode: boolean;
  starters: Array<PlayerType>;
}) {
  return (
    <div className="flex gap-2 font-semibold">
      <span>starters:</span>
      <div className="flex gap-1">
        <div>
          {starters.map((player, idx) => (
            <>
              <Player
                player={player}
                key={idx}
                mode={darkMode ? "dark" : "light"}
              />
              {idx < starters.length - 1 ? <span className="mx-2">|</span> : ""}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RecsSummary({
  darkMode,
  recommendations,
  rosterSettings,
}: {
  darkMode: boolean;
  recommendations?: Array<PlayerType>;
  rosterSettings: RosterType;
}) {
  const { starters, bench } = useMemo(() => {
    return recommendations
      ? getRecommendationSummary(recommendations, rosterSettings)
      : { starters: [], bench: [] };
  }, [recommendations, rosterSettings]);
  return (
    <OuterContainer darkMode={darkMode}>
      <InnerContainer darkMode={darkMode}>
        <Starters darkMode={darkMode} starters={starters} />
      </InnerContainer>
      <InnerContainer darkMode={darkMode}>
        <span>bench</span>
      </InnerContainer>
    </OuterContainer>
  );
}

export function RecsRoundByRound({
  darkMode,
  recommendations,
}: {
  darkMode: boolean;
  recommendations?: Array<PlayerType>;
}) {
  return (
    <OuterContainer darkMode={darkMode}>
      <div>RecsRoundByRound</div>
    </OuterContainer>
  );
}

export function ProjectedRoster({
  darkMode,
  recommendations,
}: {
  darkMode: boolean;
  recommendations?: Array<PlayerType>;
}) {
  return (
    <OuterContainer darkMode={darkMode}>
      <div>ProjectedRoster</div>
    </OuterContainer>
  );
}
