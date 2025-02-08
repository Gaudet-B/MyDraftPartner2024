import { Player, PrismaClient } from "@prisma/client";

const POSITIONS = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"] as const;
const FLEX_POSITIONS = ["RB", "WR", "TE"] as const;

// Position-based value adjustments
const POSITION_MULTIPLIERS = {
  rb: 1.2, // Slight premium on RBs
  wr: 1.1, // Small premium on WRs
  te: 1.0, // Standard for TEs
  qb: 0.9, // Slight discount on QBs (unless superflex)
  dst: 0.5, // Heavy discount on DST
  k: 0.5, // Heavy discount on Kickers
} as const;

export type RosterInput = {
  qb: { starters: number; max?: number };
  rb: { starters: number; max?: number };
  wr: { starters: number; max?: number };
  te: { starters: number; max?: number };
  dst: { starters: number; max?: number };
  k: { starters: number; max?: number };
  flex: { starters: number };
  bench: { max: number };
};

export type RosterSettings = {
  qb: { starters: number; max: number };
  rb: { starters: number; max: number };
  wr: { starters: number; max: number };
  te: { starters: number; max: number };
  dst: { starters: number; max: number };
  k: { starters: number; max: number };
  flex: { starters: number };
  bench: { max: number };
};

export type LeagueSettings = {
  ppr: 0 | 0.5 | 1;
  superflex: boolean;
  draftPosition: number;
  numOfTeams: number;
  roster: RosterSettings;
};

function getRecommendationSummary(
  recommendations: Array<{ pick: number; recommendation: Player }>,
  roster: RosterSettings,
) {
  const starters: Array<{ pick: number; recommendation: Player }> = [];

  POSITIONS.forEach((pos) => {
    const position = pos.toLowerCase() as keyof typeof roster;
    if (position !== "bench" && position !== "flex") {
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter(
        (player) => player.recommendation.position === pos,
      );
      starters.push(...playersForPosition.slice(0, startersForPosition));
    }
    if (position === "flex") {
      const flexPositions = [...FLEX_POSITIONS] as Array<string>;
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter(
        (player) =>
          flexPositions.includes(player.recommendation.position) &&
          !starters
            .map((p) => p.recommendation.id)
            .includes(player.recommendation.id),
      );
      starters.push(...playersForPosition.slice(0, startersForPosition));
    }
  });

  const bench: Array<{ pick: number; recommendation: Player }> =
    recommendations.filter(
      (player) =>
        !starters
          .map((p) => p.recommendation.id)
          .includes(player.recommendation.id),
    );

  return { starters, bench };
}

function validateAndAddMax(roster: RosterInput): RosterSettings {
  return {
    qb: { starters: roster.qb.starters, max: roster?.qb?.max ?? 2 },
    rb: {
      starters: roster.rb.starters,
      max: roster?.rb?.max ?? roster?.bench?.max,
    },
    wr: {
      starters: roster.wr.starters,
      max: roster?.wr?.max ?? roster?.bench?.max,
    },
    te: { starters: roster.te.starters, max: roster.te.max || 2 },
    dst: { starters: roster.dst.starters, max: roster.dst.max || 1 },
    k: { starters: roster.k.starters, max: roster.k.max || 1 },
    flex: { starters: roster.flex.starters },
    bench: { max: roster.bench.max },
  };
}

function getDraftOrder(teams: number, spot: number, rounds: number) {
  const picks: number[] = [];
  let round = 1;
  let pick = 1;

  for (let p = 0; p < rounds; p++) {
    // Odd rounds - ascending order
    if (round % 2 !== 0) {
      for (let i = 1; i <= teams; i++) {
        if (i === spot) {
          picks.push(pick);
        }
        pick++;
      }
    }
    // Even rounds - descending order
    else {
      for (let j = teams; j > 0; j--) {
        if (j === spot) {
          picks.push(pick);
        }
        pick++;
      }
    }
    round++;
  }

  return picks;
}

function getNumOfRounds(roster: RosterSettings) {
  let numOfRounds = 0;

  const keys = Object.keys(roster) as (keyof RosterSettings)[];
  keys.forEach((key) => {
    if (key !== "bench") {
      numOfRounds += roster[key].starters;
    } else {
      numOfRounds += roster[key].max;
    }
  });

  return numOfRounds;
}

function sortByECR(players: Player[]) {
  return [...players].sort((a, b) => a.ecr - b.ecr);
}

function getRange(pick: number, numOfTeams: number) {
  const round = Math.ceil(pick / numOfTeams);

  let start = pick,
    end = pick + 1;

  if (round > 1) start = pick - 1;
  if (round > 5) start = pick - 2;
  if (round > 9) start = pick - 5;
  if (round > 12) start = pick - 8;

  if (pick > 4) end = pick + 2;
  if (pick > 8) end = pick + 4;
  if (pick > 12) end = pick + 5;
  if (pick > 24) end = pick + numOfTeams;

  if (round > 3) end = pick + numOfTeams * 1.5;
  if (round > 6) end = pick + numOfTeams * 2;

  return [start, end];
}

function selectLateRoundPlayer(
  players: Player[],
  selected: Record<keyof typeof POSITION_MULTIPLIERS, number>,
  settings: RosterSettings,
) {
  // Check if all minimum requirements are met
  const minReqsMet = Object.entries(selected).every(([pos, count]) => {
    const position = pos as keyof typeof POSITION_MULTIPLIERS;
    return count >= settings[position].starters;
  });

  if (!minReqsMet) {
    // Find first player that fills a position below minimum requirement
    for (const player of players) {
      const position = player.position.toLowerCase() as keyof typeof selected;
      if (selected[position] < settings[position].starters) {
        return player;
      }
    }
  }

  // If all minimums are met or no players found for minimum requirements,
  // select best available player that isn't K/DST (unless we need one)
  for (const player of players) {
    const position =
      player.position.toLowerCase() as keyof typeof POSITION_MULTIPLIERS;

    // Skip K/DST unless we need one
    if (
      (position === "k" || position === "dst") &&
      selected[position] >= settings[position].starters
    ) {
      continue;
    }

    // Return first eligible player that hasn't hit position maximum
    if (selected[position] < settings[position].max) {
      return player;
    }
  }

  return players[0] || null;
}

function selectEarlyRoundPlayer(players: Player[]) {
  // Filter out K and DST
  const filteredPlayers = players.filter((player) => {
    const { position } = player;
    return position !== "k" && position !== "dst";
  });

  if (filteredPlayers.length === 0) {
    return;
  }

  // Sort by "value" (difference between ADP and ECR)
  return filteredPlayers.sort((a, b) => {
    const valueA = a.currentAdp - a.ecr;
    const valueB = b.currentAdp - b.ecr;
    return valueB - valueA; // Higher value first
  })[0];
}

// Optional: Add a value calculation helper
function calculatePlayerValue(
  player: Player,
  multipliers?: typeof POSITION_MULTIPLIERS,
) {
  const position =
    player.position.toLowerCase() as keyof typeof POSITION_MULTIPLIERS;
  const baseValue = player.currentAdp - player.ecr;

  const multiplier = multipliers
    ? multipliers[position]
    : POSITION_MULTIPLIERS[position];
  return baseValue * multiplier;
}

function selectBestPlayer(
  players: Player[],
  selected: Record<keyof typeof POSITION_MULTIPLIERS, number>,
  settings: LeagueSettings,
  currentPick: number,
  totalPicks: number,
) {
  // Late round logic
  if (currentPick >= totalPicks - 4) {
    return selectLateRoundPlayer(players, selected, settings.roster);
  }

  // Early round logic
  return selectEarlyRoundPlayer(players);

  /** @TODO add more weights and settings here */
}

export async function getPickRecs(
  prisma: PrismaClient,
  // settings: LeagueSettings & { ppr: "0" | "0.5" | "1" },
  settings: {
    ppr: "0" | "0.5" | "1.0";
    superflex: boolean;
    draftPosition: number;
    numOfTeams: number;
    roster: RosterInput;
  },
) {
  const recs: Array<{ pick: number; recommendation: Player }> = [];
  const selected = {
    players: [] as Array<Player["id"]>,
    positions: {
      qb: 0,
      rb: 0,
      wr: 0,
      te: 0,
      dst: 0,
      k: 0,
    },
  };

  const { numOfTeams, roster: unformattedRoster, draftPosition } = settings;
  console.log("numOfTeams", numOfTeams);
  console.log("draftPosition", draftPosition);
  console.log("roster", unformattedRoster);
  const roster = validateAndAddMax(unformattedRoster);
  const picks = getDraftOrder(
    numOfTeams,
    draftPosition,
    getNumOfRounds(roster),
  );

  console.log("picks", picks);
  for (const pick of picks) {
    const [start, end] = getRange(pick, numOfTeams);
    // Query range of players around current pick
    const players = await prisma.player.findMany({
      where: {
        currentAdp: {
          gt: start,
          lt: end,
        },
      },
    });

    // Filter and sort players
    const eligiblePlayers = players.filter((player) => {
      const position =
        player.position.toLowerCase() as keyof typeof selected.positions;
      return (
        !selected.players.includes(player.id) &&
        selected.positions[position] < roster[position].max
      );
    });

    const sortedPlayers = sortByECR(eligiblePlayers);

    // Select best available player following draft strategy
    const recommendation = selectBestPlayer(
      sortedPlayers,
      selected.positions,
      { ...settings, roster, ppr: Number(settings.ppr) as 0 | 0.5 | 1 },
      picks.indexOf(pick),
      picks.length,
    );

    if (recommendation) {
      const position =
        recommendation.position.toLowerCase() as keyof typeof selected.positions;
      selected.positions[position]++;
      selected.players.push(recommendation.id);
      recs.push({ pick, recommendation });
    }
  }
  console.log("recs", recs.length);
  return getRecommendationSummary(recs, roster);
}
