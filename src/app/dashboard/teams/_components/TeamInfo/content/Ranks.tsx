import { PropsWithChildren, useMemo } from "react";
import Button from "@designsystem/button";
import { ContentProps } from "../info";
import Link from "next/link";
import { Team } from "@prisma/client";

const classes = {
  rank: `flex-1 text-right pr-3 border-r-2 py-1`,
  name: "flex-grow pl-3 py-1 font-normal",
  // style: {
  //   flex: '5',
  //   flexGrow: '100%',
  // },
  positionalRank: "flex-auto pr-5 text-right py-1",
  // style: {
  //   flex: '2',
  // },
  currentAdp: "flex-1 text-right py-1 font-normal",
  ecr: "flex-1 text-right pr-4 py-1 font-normal",
};

const _getColumnHeader = (col: keyof typeof classes) => {
  if (col === "name") return "player";
  if (col === "positionalRank") return "pos. rank";
  if (col === "currentAdp") return "adp";
  return col;
};

function RanksContainer({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full min-w-[360px] flex-col items-end py-4 pl-4">
      {children}
    </div>
  );
}

function AdvancedLink({ team }: { team: Team }) {
  return (
    <div className="flex w-full flex-row justify-end">
      <Link href={`/dashboard/teams/advanced-rankings/${team.id}`}>
        <Button theme={"transparent-hover"} children={"Advanced Rankings >"} />
      </Link>
    </div>
  );
}

function RanksHeader({ name }: { name: string }) {
  return (
    <div
      className={`mb-4 w-3/5 pr-3 text-right text-xs font-normal italic text-gray-400`}
    >
      <p>
        These are your custom ranks for <strong>{name}</strong>. Click here to{" "}
        <Button
          theme={"transparent"}
          additionalClasses={"not-italic"}
          bold
          underline
        >
          edit these ranks
        </Button>
        .
      </p>
    </div>
  );
}

function HeaderRow({
  children,
  darkMode,
}: PropsWithChildren<{ darkMode: boolean }>) {
  return (
    <div
      className={`flex w-full flex-row rounded-tl-lg rounded-tr-lg border-b-2 bg-black bg-opacity-10 ${
        darkMode ? "border-gray-700" : "border-gray-100"
      } font-mono text-sm font-light ${
        darkMode ? "text-gray-400" : "text-gray-500"
      } whitespace-nowrap`}
    >
      {children}
    </div>
  );
}

function HeaderColumn({
  children,
  class: className,
}: PropsWithChildren<{ class: string }>) {
  return <div className={className}>{children}</div>;
}

function TableHeader({
  columns,
  darkMode,
}: {
  columns: Array<keyof typeof classes>;
  darkMode: boolean;
}) {
  return (
    <HeaderRow darkMode={darkMode}>
      {columns.map((col) => {
        const column = _getColumnHeader(col);
        return (
          <HeaderColumn
            key={`header-col-${col}`}
            class={`${classes[col]} py-2`}
          >
            {column}
          </HeaderColumn>
        );
      })}
    </HeaderRow>
  );
}

function PlayerRow({
  children,
  darkMode,
}: PropsWithChildren<{ darkMode: boolean }>) {
  return (
    <div
      className={`flex w-full flex-row border-b-4 bg-black bg-opacity-10 ${
        darkMode ? "border-gray-700" : "border-gray-100"
      }`}
    >
      {children}
    </div>
  );
}

function PlayerColumn({
  children,
  class: className,
  col,
  player,
}: PropsWithChildren<{ class: string; col: string; player: PlayerRank }>) {
  return (
    <div className={className}>
      <span
        className={
          col === "positionalRank"
            ? getPositionColor(player.positionalRank.split("")[0])
            : ""
        }
      >
        {col === "positioanRank"
          ? getPositionString(player.positionalRank)
          : children}
      </span>
    </div>
  );
}

export type PlayerRank = {
  rank: number;
  name: string;
  positionalRank: string;
  currentAdp: string;
  ecr: string;
};

function Player({
  columns,
  darkMode,
  player,
  rank,
}: {
  columns: Array<keyof typeof classes>;
  darkMode: boolean;
  player: PlayerRank;
  rank: number;
}) {
  const border = useMemo(
    () => (darkMode ? "border-gray-700" : "border-gray-100"),
    [darkMode],
  );

  return (
    <PlayerRow key={`player-row-${rank}`} darkMode={darkMode}>
      {columns.map((col) => (
        <PlayerColumn
          key={`player-col-${col}`}
          class={col === "rank" ? `${classes[col]} ${border}` : classes[col]}
          col={col}
          player={player}
        >
          {col === "rank" ? rank : player[col]}
        </PlayerColumn>
      ))}
    </PlayerRow>
  );
}

function RanksTable({
  darkMode,
  rankings,
}: {
  darkMode: boolean;
  rankings: Array<PlayerRank>;
}) {
  const columns = useMemo(() => Object.keys(classes), []) as Array<
    keyof typeof classes
  >;

  return (
    <>
      <TableHeader columns={columns} darkMode={darkMode} />
      {rankings &&
        rankings.map((player, index) => (
          <Player
            columns={columns}
            darkMode={darkMode}
            player={player}
            rank={index + 1}
          />
        ))}
    </>
  );
}

export function Ranks({
  darkMode,
  team,
  // setEditMode,
  // editMode = INITIAL_EDIT_MODES,
  // activeTab = "NameAndLeague",
}: ContentProps) {
  /** @TODO need query here for ranks */
  const rankings: Array<PlayerRank> = [];

  return (
    <RanksContainer>
      <AdvancedLink team={team} />
      <RanksHeader name={team.name} />
      <RanksTable darkMode={darkMode} rankings={rankings} />
    </RanksContainer>
  );
}
