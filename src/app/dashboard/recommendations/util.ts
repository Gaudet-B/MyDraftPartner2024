import { Player } from "@prisma/client";
import { Roster as RosterType } from "../teams/_components/TeamInfo/info";

const POSITIONS = ["QB", "RB", "WR", "TE", "FLEX", "DST", "K"] as const;
const FLEX_POSITIONS = ["RB", "WR", "TE"] as const;

export function getRecommendationSummary(
  recommendations: Array<Player>,
  roster: RosterType,
) {
  const starters: Array<Player> = [];

  POSITIONS.forEach((pos) => {
    const position = pos.toLowerCase() as keyof typeof roster;
    if (position !== "bench" && position !== "flex") {
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter(
        (player) => player.position === pos,
      );
      starters.push(...playersForPosition.slice(0, startersForPosition));
    }
    if (position === "flex") {
      const flexPositions = [...FLEX_POSITIONS] as Array<string>;
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter((player) =>
        flexPositions.includes(player.position),
      );
      starters.push(...playersForPosition.slice(0, startersForPosition));
    }
  });

  const bench = recommendations.filter((player) => !starters.includes(player));
  return { starters, bench };
}
