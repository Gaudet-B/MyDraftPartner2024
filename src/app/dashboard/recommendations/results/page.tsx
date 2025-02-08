import { PropsWithChildren } from "react";
import { api } from "~/trpc/server";
import { ResultsContent } from "./content";
import FixedWidthContainer from "@designsystem/container/FixedWidthContainer";
import { ProjectedRoster, RecsRoundByRound, RecsSummary } from "./results";
import { Roster as RosterType } from "../../teams/_components/TeamInfo";

const POSITIONS = ["qb", "rb", "wr", "te", "flex", "dst", "k", "bench"];

function ResultsContainer({ children }: PropsWithChildren) {
  return (
    <FixedWidthContainer className="flex grow flex-col gap-4 rounded-br-lg rounded-tr-lg border-r-2 border-r-zinc-200 py-3 pr-3">
      {children}
    </FixedWidthContainer>
  );
}

function _parseRoster(roster: string) {
  const result: RosterType = {
    qb: { starters: 0 },
    rb: { starters: 0 },
    wr: { starters: 0 },
    te: { starters: 0 },
    dst: { starters: 0 },
    k: { starters: 0 },
    flex: { starters: 0 },
    bench: { max: 0 },
  };

  // Split into position groups
  const positions = roster.split("&");
  let currentPosition: keyof RosterType | null = null;

  positions.forEach((value) => {
    // Check if this is a new position definition
    POSITIONS.forEach((pos) => {
      if (value.startsWith(pos)) {
        currentPosition = pos as keyof RosterType;
        const [_, category, num] = value.split("=");
        if (category === "starters" && currentPosition !== "bench") {
          result[currentPosition].starters = num ? parseInt(num) : 0;
        } else if (category === "max" && currentPosition !== "flex") {
          result[currentPosition].max = num ? parseInt(num) : 0;
        }
      }
    });

    // If this is a continuation of the current position (max value)
    if (
      value.startsWith("max") &&
      currentPosition &&
      currentPosition !== "flex"
    ) {
      const [_, num] = value.split("=");
      result[currentPosition].max = num ? parseInt(num) : 0;
    }
  });

  return result;
}

function _parseSearchParams(searchParams: {
  ppr: string;
  superflex: string;
  draftPosition: string;
  numOfTeams: string;
  roster: string;
}) {
  return {
    ppr: searchParams.ppr as "0" | "0.5" | "1.0",
    superflex: searchParams.superflex === "NO" ? false : true,
    draftPosition: parseInt(searchParams.draftPosition),
    numOfTeams: parseInt(searchParams.numOfTeams),
    roster: _parseRoster(searchParams.roster) as RosterType,
  };
}

export default async function Results({
  searchParams,
}: {
  searchParams: {
    ppr: string;
    superflex: string;
    draftPosition: string;
    numOfTeams: string;
    roster: string;
  };
}) {
  const params = _parseSearchParams(searchParams);
  const recs = await api.recommendations.getRecommendations(params);
  const { starters, bench } = recs;

  return (
    <ResultsContainer>
      <ResultsContent>
        <RecsSummary
          starters={starters.map((s) => s.recommendation)}
          bench={bench.map((b) => b.recommendation)}
        />
        <RecsRoundByRound recommendations={recs} />
        <ProjectedRoster
          rosterSettings={params.roster}
          starters={starters.map((s) => s.recommendation)}
          bench={bench.map((b) => b.recommendation)}
        />
      </ResultsContent>
    </ResultsContainer>
  );
}
