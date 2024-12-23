import { Player, Prisma } from "@prisma/client";
import {
  Roster as RosterType,
  TeamSettings as TeamSettingsType,
} from "./_components/TeamInfo";
import { SettingsValuesType } from "./hooks/useTeamForm";
import { DEFAULT_ROSTER_SETTINGS } from "@components/forms/TeamSettings/const";

// const DEFAULT_TEAM_SETTINGS = {
//   draftPosition: 1,
//   numOfTeams: 10,
//   possibleDraftPositions: getPossibleDraftPositions(10),
//   ppr: "1.0",
//   superflex: "NO",
// }

/** @TODO can this be moved to '@components/form/TeamSettings' ? */
export function getPossibleDraftPositions(numOfTeams: number) {
  const positions: Array<number> = [];
  for (let i = 1; i <= numOfTeams; i++) {
    positions.push(i);
  }
  return positions;
}

export const parsePPR = {
  toString: (value: TeamSettingsType["ppr"]) => {
    if (value === 0) return "NO";
    if (value === 0.5) return "0.5";
    return "1.0";
  },
  fromString: (value: SettingsValuesType["ppr"]) => {
    if (value === "NO") return 0;
    if (value === "0.5") return 0.5;
    return 1;
  },
};

export const parseSuperflex = {
  toString: (value: TeamSettingsType["superflex"]) => {
    if (value === true) return "YES";
    return "NO";
  },
  fromString: (value: SettingsValuesType["superflex"]) => {
    if (value === "YES") return true;
    return false;
  },
};

export const parseSettings = {
  toFormValues: (settings: TeamSettingsType): SettingsValuesType => {
    const { numOfTeams, draftPosition, ppr, roster, superflex } = settings;
    return {
      draftPosition,
      numOfTeams,
      // possibleDraftPositions: getPossibleDraftPositions(numOfTeams),
      ppr: parsePPR.toString(ppr),
      superflex: parseSuperflex.toString(superflex),
      roster: roster ?? DEFAULT_ROSTER_SETTINGS,
    };
  },
  fromFormValues: (values: SettingsValuesType) => {
    /** @TODO handle error here for potential undefined values */
    const { draftPosition, numOfTeams, ppr, roster, superflex } = values;
    return {
      superflex: parseSuperflex.fromString(superflex),
      ppr: parsePPR.fromString(ppr) as TeamSettingsType["ppr"],
      /** @TODO convert to JSON first? */
      roster: roster ?? ({} as RosterType),
      // roster: roster ?? DEFAULT_ROSTER_SETTINGS,
      // roster,
      draftPosition,
      numOfTeams,
    };
  },
  fromJson: (json: Prisma.JsonObject) => {
    const settings = json;
    return {
      draftPosition: settings.draftPosition as number,
      numOfTeams: settings.numOfTeams as number,
      ppr: settings.ppr as 0 | 0.5 | 1,
      roster: settings.roster as RosterType,
      superflex: settings.superflex as boolean,
    };
  },
};

export const checkForEmptyPositions = (
  playerList: Array<Player>,
  rosterSettings: RosterType,
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
  rosterSettings: RosterType,
  emptyPositionList: string[],
) => {
  // if (!playerList || !rosterSettings || !emptyPositionList)
  //   return { starters: undefined, bench: undefined }

  const players = [...playerList];
  const starters: { [key: string]: Array<Player> } = {};
  const positions = Object.keys(rosterSettings).filter(
    (key) => !emptyPositionList.includes(key),
  ) as Array<keyof RosterType>;

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
