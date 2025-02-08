import { PropsWithChildren } from "react";
import { Player, Player as PlayerType } from "@prisma/client";
import { RosterTable } from "@designsystem/roster";
import { ColumnInput } from "@designsystem/table/util";
import { positionColors, teamColors, textColors } from "@designsystem/colors";
import { Roster as RosterType } from "../../teams/_components/TeamInfo/info";
import OuterContainer from "../_components/OuterContainer";
import InnerContainer from "../_components/InnerContainer";

const PLAYER_COLUMNS = (theme: "dark" | "light") =>
  [
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
      getValue: (p: Player) => (
        <PlayerValue theme={theme} value={p.currentAdp - p.ecr} />
      ),
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

function PlayerValue({
  theme,
  value,
}: {
  theme: "dark" | "light";
  value: number;
}) {
  // const theme = useAtomValue(useThemeAtom);
  const negative = value < 0;
  const color = theme ? _getColor(negative ? "-" : "+", theme) : "text-black";
  const val = Math.abs(value);
  return (
    <span
      className={`font-bold ${color}`}
    >{`${negative ? "-" : "+"} ${val}`}</span>
  );
}

function PlayerText({
  // mode,
  player,
  colors,
}: {
  // mode: "dark" | "light";
  player: PlayerType;
  colors: (typeof positionColors)["light" | "dark"];
}) {
  const { text } =
    colors[player.position as keyof (typeof positionColors)["dark" | "light"]];

  const teamColor =
    teamColors.text[player.team as keyof (typeof teamColors)["text"]];

  return (
    <>
      <span className={`${text} font-bold`}>{`${player.position} `}</span>
      <span>{`${player.name}, `}</span>
      <span className={`${teamColor}`}>{`${player.team}`}</span>
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
  // darkMode,
  colors,
  starters,
}: {
  // darkMode: boolean;
  colors: (typeof positionColors)["light" | "dark"];
  starters: Array<PlayerType>;
}) {
  return (
    // <div className="flex gap-2 font-semibold">
    //   <span>starters:</span>
    <div className="flex gap-1">
      <div className="flex flex-wrap text-sm">
        {starters.map((player, idx) => (
          <div>
            <PlayerText
              player={player}
              key={idx}
              colors={colors}
              // mode={darkMode ? "dark" : "light"}
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
  // darkMode,
  colors,
  bench,
}: {
  // darkMode: boolean;
  colors: (typeof positionColors)["light" | "dark"];
  bench: Array<PlayerType>;
}) {
  return (
    <div className="flex gap-1">
      <div className="flex flex-wrap text-sm">
        {bench.map((player, idx) => (
          <div>
            <PlayerText
              player={player}
              key={idx}
              // mode={darkMode ? "dark" : "light"}
              colors={colors}
            />
            {idx < bench.length - 1 ? <span className="mx-2">|</span> : ""}
          </div>
        ))}
      </div>
    </div>
  );
}

export async function RecsSummary({
  // darkMode,
  starters,
  bench,
  theme = "light",
}: {
  // darkMode: boolean;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
  theme?: "light" | "dark";
}) {
  console.log("theme", theme);
  const colors = positionColors[theme];
  // console.log("colors", colors);

  return (
    <OuterContainer>
      <InnerContainer
        label={<Label width="w-24">starters:</Label>}
        content={<Starters starters={starters} colors={colors} />}
      />
      <InnerContainer
        label={<Label width="w-24">bench:</Label>}
        content={<Bench bench={bench} colors={colors} />}
      />
    </OuterContainer>
  );
}

function RdByRdGrid({
  // darkMode,
  colors,
  recommendations,
}: {
  // darkMode: boolean;
  colors: (typeof positionColors)["light" | "dark"];
  recommendations: {
    starters: Array<{ pick: number; recommendation: PlayerType }>;
    bench: Array<{ pick: number; recommendation: PlayerType }>;
  };
}) {
  const recs = [...recommendations.starters, ...recommendations.bench].sort(
    (a, b) => a.pick - b.pick,
  );

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
      {recs.map((player, idx) => (
        <>
          <div key={idx} className="col-span-1 text-center opacity-80">
            <span>{idx + 1}</span>
          </div>
          <div key={idx} className="col-span-1 text-center opacity-80">
            <span>{player.pick}</span>
          </div>
          <div className="col-span-3 text-center opacity-80">
            <PlayerText
              player={player.recommendation}
              colors={colors}
              // mode={darkMode ? "dark" : "light"}
            />
          </div>
        </>
      ))}
    </div>
  );
}

export async function RecsRoundByRound({
  // darkMode,
  recommendations,
  theme = "light",
}: {
  // darkMode: boolean;
  recommendations: {
    starters: Array<{ pick: number; recommendation: PlayerType }>;
    bench: Array<{ pick: number; recommendation: PlayerType }>;
  };
  theme?: "light" | "dark";
}) {
  const colors = positionColors[theme];

  return (
    <OuterContainer>
      <InnerContainer
        // darkMode={darkMode}
        label={<Label width="w-24">round by round:</Label>}
        content={
          <RdByRdGrid recommendations={recommendations} colors={colors} />
        }
      />
    </OuterContainer>
  );
}

export async function ProjectedRoster({
  // darkMode,
  // columns,
  rosterSettings,
  starters,
  bench,
  theme = "light",
}: {
  // darkMode: boolean;
  // columns: Array<ColumnInput>;
  rosterSettings: RosterType;
  starters: Array<PlayerType>;
  bench: Array<PlayerType>;
  theme?: "light" | "dark";
}) {
  return (
    <OuterContainer>
      <InnerContainer
        label={<Label width="w-24">projected roster:</Label>}
        content={
          <RosterTable
            // columns={PLAYER_COLUMNS(theme)}
            columns={PLAYER_COLUMNS}
            // darkMode={theme === "dark"}
            theme={theme}
            starters={starters}
            bench={bench}
            rosterSettings={rosterSettings}
          />
        }
      />
    </OuterContainer>
  );
}
