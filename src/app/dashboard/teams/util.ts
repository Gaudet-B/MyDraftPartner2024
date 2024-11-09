import { Player } from "@prisma/client";
import { Roster } from "./_components/TeamInfo/info";

/** @TODO remove all instances of `any` */

export const getPossibleDraftPositions = (numOfTeams: number): number[] => {
  const positions = [];
  for (let i = 1; i <= numOfTeams; i++) {
    positions.push(i);
  }
  return positions;
};

export const parsePPR = {
  toString: (value: boolean | number): string => {
    if (value === false) return "NO";
    if (value === 0.5) return "0.5";
    // if (value === 1) return '1.0'
    return "1.0";
    // return ''
  },
  fromString: (value: string): number | boolean => {
    if (value === "NO") return false;
    if (value === "0.5") return 0.5;
    // if (value === '1.0') return 1
    return 1;
    // return 0
  },
};

export const parseSuperflex = {
  toString: (value: boolean): string => {
    if (value === true) return "YES";
    return "NO";
  },
  fromString: (value: string): boolean => {
    if (value === "YES") return true;
    return false;
  },
};

export const checkForEmptyPositions = (
  playerList: any[] | undefined,
  rosterSettings: Roster | undefined,
): string[] | undefined => {
  if (!playerList || !rosterSettings) return undefined;
  const emptyPositions = [];
  for (const position of Object.keys(rosterSettings)) {
    const positionToFind = position.toUpperCase();
    if (!playerList.find((player) => player.playerPosition === positionToFind))
      emptyPositions.push(position);
  }
  // console.log(rosterSettings)
  // console.log(emptyPositions)
  // return emptyPositions.filter((position) => position !== 'flex')
  return emptyPositions;
};

export const parseStartersFromRoster = (
  playerList?: Player[],
  rosterSettings?: Roster,
  emptyPositionList?: string[],
) => {
  // console.log(rosterSettings)
  // console.log(emptyPositionList)
  if (!playerList || !rosterSettings || !emptyPositionList)
    return { starters: undefined, bench: undefined };
  let players = [...playerList];
  const starters: { [key: string]: Array<Player | undefined> } = {};
  // const playersToRemove: any[] = []
  const positions = Object.keys(rosterSettings).filter(
    (key) => !emptyPositionList.includes(key),
  ) as Array<keyof Roster>;
  for (const position of positions) {
    if (!rosterSettings[position]) continue;
    // console.log(position)
    // remove "empty" positions and add back in after
    // if (emptyPositionList.includes(position)) continue
    starters[position] = [];
    // console.log(`${position} ${rosterSettings[position].starters}`)
    while (
      (position !== "bench" &&
        starters[position].length < rosterSettings[position].starters) ||
      0
    ) {
      const positionToFind = position.toUpperCase();
      const player = players.find(
        (player) => player.position === positionToFind,
      );
      if (!player) continue;
      const playerIndex = players.indexOf(player);
      if (!starters[position].includes(player)) {
        starters[position].push(player);
      }
      players.splice(playerIndex, 1);
      // playersToRemove.push(player)
    }
  }
  for (const position of emptyPositionList) {
    starters[position] = [undefined];
  }
  // const bench = players.filter((player) => !playersToRemove.includes(player))
  const bench = [...players];
  starters["flex"] = [];
  starters.flex.push(bench.shift());
  // const flexStarter = bench.shift()
  // starters.flex.push(flexStarter)
  console.log(starters);
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
