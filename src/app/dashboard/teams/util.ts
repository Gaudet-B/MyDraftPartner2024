import { Player } from "@prisma/client";
import {
  Roster,
  TeamSettings as TeamSettingsType,
} from "./_components/TeamInfo";
import { SettingsValuesType } from "./_components/TeamInfo/content";

/** @TODO can this be moved to '@components/form/TeamSettings' ? */
export function getPossibleDraftPositions(numOfTeams: number) {
  const positions: Array<number> = [];
  for (let i = 1; i <= numOfTeams; i++) {
    positions.push(i);
  }
  return positions;
}

export const parsePPR = {
  toString: (value: boolean | number) => {
    if (value === false) return "NO";
    if (value === 0.5) return "0.5";
    return "1.0";
  },
  fromString: (value: string) => {
    if (value === "NO") return false;
    if (value === "0.5") return 0.5;
    return 1;
  },
};

export const parseSuperflex = {
  toString: (value: boolean) => {
    if (value === true) return "YES";
    return "NO";
  },
  fromString: (value: string) => {
    if (value === "YES") return true;
    return false;
  },
};

export function parseSettings(settings: TeamSettingsType): SettingsValuesType {
  const { roster, numOfTeams, draftPosition, ppr, superflex } = settings;
  return {
    draftPosition,
    numOfTeams,
    possibleDraftPositions: getPossibleDraftPositions(numOfTeams),
    ppr: parsePPR.toString(ppr),
    superflex: parseSuperflex.toString(superflex),
  };
}

export const checkForEmptyPositions = (
  playerList: Array<Player>,
  rosterSettings: Roster,
) => {
  // if (!playerList || !rosterSettings) return []

  const emptyPositions = [];
  for (const position of Object.keys(rosterSettings)) {
    if (
      !playerList.find((player) => player.position === position.toUpperCase())
    )
      emptyPositions.push(position);
  }
  return emptyPositions;
};

export const parseStartersFromRoster = (
  playerList: Array<Player>,
  rosterSettings: Roster,
  emptyPositionList: string[],
) => {
  // if (!playerList || !rosterSettings || !emptyPositionList)
  //   return { starters: undefined, bench: undefined }

  const players = [...playerList];
  const starters: { [key: string]: Array<Player> } = {};
  const positions = Object.keys(rosterSettings).filter(
    (key) => !emptyPositionList.includes(key),
  ) as Array<keyof Roster>;

  for (const position of positions) {
    starters[position] = [];
    const p = rosterSettings[position];
    const { starters: s } = p;
    if (!p || !s) continue;

    while (starters[position].length < s) {
      const positionToFind = position.toUpperCase();
      const player = players.find((p) => p.position === positionToFind);
      const playerIndex = player ? players.indexOf(player) : -1;

      if (player && !starters[position].includes(player)) {
        starters[position].push(player);
      }
      players.splice(playerIndex, 1);
    }
  }

  for (const position of emptyPositionList) {
    starters[position] = [];
  }

  const bench = [...players];
  /** @TODO need a check here for non-flex players */
  /** @TODO need to handle multiple flex spots? superflex? */
  const flex = bench.shift() as Player;
  starters["flex"] = [flex];
  return { starters, bench };
};

export const reorderPositions = (positions: string[]): string[] => {
  const flexIndex = positions.indexOf("flex");
  const newPositions = [...positions];
  newPositions.splice(flexIndex, 1);
  newPositions.splice(4, 0, "flex");
  return newPositions;
};

export const getPlayerPosition = (position: string): string => {
  if (position[0] === "K") return "K";
  if (position[0] === "D") return "DST";
  return position.slice(0, 2);
};
