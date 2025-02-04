import { Player } from "@prisma/client";
import { Roster as RosterType } from "../teams/_components/TeamInfo/info";

const POSITIONS = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"] as const;
const FLEX_POSITIONS = ["RB", "WR", "TE"] as const;

export function getRecommendationSummary(
  recommendations: Array<{ pick: number; recommendation: Player }>,
  roster: RosterType,
) {
  const starters: Array<Player> = [];

  POSITIONS.forEach((pos) => {
    const position = pos.toLowerCase() as keyof typeof roster;
    if (position !== "bench" && position !== "flex") {
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter(
        (player) => player.recommendation.position === pos,
      );
      starters.push(
        ...playersForPosition
          .slice(0, startersForPosition)
          .map((p) => p.recommendation),
      );
    }
    if (position === "flex") {
      const flexPositions = [...FLEX_POSITIONS] as Array<string>;
      const startersForPosition = roster[position].starters;
      const playersForPosition = recommendations.filter(
        (player) =>
          flexPositions.includes(player.recommendation.position) &&
          !starters.map((p) => p.id).includes(player.recommendation.id),
      );
      starters.push(
        ...playersForPosition
          .slice(0, startersForPosition)
          .map((p) => p.recommendation),
      );
    }
  });

  const bench = recommendations
    .filter(
      (player) => !starters.map((p) => p.id).includes(player.recommendation.id),
    )
    .map((p) => p.recommendation);
  return { starters, bench };
}
