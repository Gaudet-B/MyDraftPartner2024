import { describe, it, expect, beforeEach } from "vitest";
import { type Player } from "@prisma/client";
import {
  type LeagueSettings,
  type RosterSettings,
} from "~/app/dashboard/recommendations/content";

// Test data setup
const mockPlayer = (override: Partial<Player> = {}): Player => ({
  id: "1",
  name: "Test Player",
  position: "rb",
  team: "TEST",
  ecr: 50,
  currentAdp: 55,
  positionalRank: "RB1",
  ...override,
});

const mockRosterSettings: RosterSettings = {
  qb: { starters: 1, max: 3 },
  rb: { starters: 2, max: 6 },
  wr: { starters: 2, max: 6 },
  te: { starters: 1, max: 3 },
  dst: { starters: 1, max: 1 },
  k: { starters: 1, max: 1 },
  flex: { starters: 1 },
  bench: { max: 7 },
};

const mockLeagueSettings: LeagueSettings = {
  ppr: 1,
  superflex: false,
  draftPosition: 5,
  numOfTeams: 12,
  roster: mockRosterSettings,
};

describe("getPlayerPosition", () => {
  it("correctly maps position ranks to positions", () => {
    expect(getPlayerPosition("QB1")).toBe("qb");
    expect(getPlayerPosition("RB12")).toBe("rb");
    expect(getPlayerPosition("WR24")).toBe("wr");
    expect(getPlayerPosition("TE8")).toBe("te");
    expect(getPlayerPosition("K1")).toBe("k");
    expect(getPlayerPosition("DST1")).toBe("dst");
  });

  it("throws error for invalid position ranks", () => {
    expect(() => getPlayerPosition("")).toThrow();
    expect(() => getPlayerPosition("XX1")).toThrow();
  });
});

describe("getDraftOrder", () => {
  it("generates correct snake draft order for first position", () => {
    const picks = getDraftOrder(4, 1, 3);
    expect(picks).toEqual([1, 8, 9]);
  });

  it("generates correct snake draft order for last position", () => {
    const picks = getDraftOrder(4, 4, 3);
    expect(picks).toEqual([4, 5, 12]);
  });

  it("handles single round drafts", () => {
    const picks = getDraftOrder(4, 2, 1);
    expect(picks).toEqual([2]);
  });
});

describe("getNumOfRounds", () => {
  it("calculates correct number of rounds based on roster settings", () => {
    const rounds = getNumOfRounds(mockRosterSettings);
    // 1 QB + 2 RB + 2 WR + 1 TE + 1 DST + 1 K + 1 FLEX + 7 BENCH = 16
    expect(rounds).toBe(16);
  });

  it("handles minimal roster settings", () => {
    const minimalRoster: RosterSettings = {
      qb: { starters: 1, max: 1 },
      rb: { starters: 1, max: 1 },
      wr: { starters: 1, max: 1 },
      te: { starters: 1, max: 1 },
      dst: { starters: 1, max: 1 },
      k: { starters: 1, max: 1 },
      flex: { starters: 0 },
      bench: { max: 0 },
    };
    expect(getNumOfRounds(minimalRoster)).toBe(6);
  });
});

describe("sortByECR", () => {
  it("sorts players by ECR in ascending order", () => {
    const players = [
      mockPlayer({ ecr: 30 }),
      mockPlayer({ ecr: 10 }),
      mockPlayer({ ecr: 20 }),
    ];
    const sorted = sortByECR(players);
    expect(sorted[0].ecr).toBe(10);
    expect(sorted[1].ecr).toBe(20);
    expect(sorted[2].ecr).toBe(30);
  });

  it("maintains original array immutability", () => {
    const original = [mockPlayer({ ecr: 30 }), mockPlayer({ ecr: 10 })];
    const sorted = sortByECR(original);
    expect(sorted).not.toBe(original);
    expect(original[0].ecr).toBe(30);
  });
});

describe("selectBestPlayer", () => {
  const mockSelected = {
    qb: 0,
    rb: 0,
    wr: 0,
    te: 0,
    dst: 0,
    k: 0,
  };

  it("prioritizes RB/WR in early rounds", () => {
    const players = [
      mockPlayer({ position: "qb", ecr: 10 }),
      mockPlayer({ position: "rb", ecr: 12 }),
      mockPlayer({ position: "wr", ecr: 11 }),
    ];
    const pick = selectBestPlayer(
      players,
      mockSelected,
      mockLeagueSettings,
      1,
      16,
    );
    expect(pick?.position).toMatch(/^(rb|wr)$/);
  });

  it("considers QB priority in superflex leagues", () => {
    const superflexSettings = { ...mockLeagueSettings, superflex: true };
    const players = [
      mockPlayer({ position: "qb", ecr: 10 }),
      mockPlayer({ position: "rb", ecr: 12 }),
    ];
    const pick = selectBestPlayer(
      players,
      mockSelected,
      superflexSettings,
      1,
      16,
    );
    expect(pick?.position).toBe("qb");
  });

  it("prioritizes K/DST in late rounds when needed", () => {
    const players = [
      mockPlayer({ position: "rb", ecr: 150 }),
      mockPlayer({ position: "k", ecr: 160 }),
    ];
    const pick = selectBestPlayer(
      players,
      mockSelected,
      mockLeagueSettings,
      13,
      16,
    );
    expect(pick?.position).toBe("k");
  });

  it("returns null for empty player list", () => {
    const pick = selectBestPlayer([], mockSelected, mockLeagueSettings, 1, 16);
    expect(pick).toBeNull();
  });
});

describe("calculatePlayerValue", () => {
  it("calculates base value with default multipliers", () => {
    const player = mockPlayer({
      position: "rb",
      currentAdp: 20,
      ecr: 10,
    });
    const value = calculatePlayerValue(player);
    // (20 - 10) * 1.2 = 12
    expect(value).toBe(12);
  });

  it("uses custom multipliers when provided", () => {
    const player = mockPlayer({
      position: "rb",
      currentAdp: 20,
      ecr: 10,
    });
    const customMultipliers = {
      rb: 2.0,
      wr: 1.0,
      te: 1.0,
      qb: 1.0,
      dst: 0.5,
      k: 0.5,
    };
    const value = calculatePlayerValue(player, customMultipliers);
    // (20 - 10) * 2.0 = 20
    expect(value).toBe(20);
  });
});

describe("getPickRecs", () => {
  it("returns correct number of recommendations", async () => {
    const mockPrisma = {
      player: {
        findMany: async () => [
          mockPlayer({ position: "rb", ecr: 1 }),
          mockPlayer({ position: "wr", ecr: 2 }),
          mockPlayer({ position: "qb", ecr: 3 }),
        ],
      },
    };

    const recs = await getPickRecs(mockPrisma as any, mockLeagueSettings);
    expect(recs.length).toBe(getNumOfRounds(mockRosterSettings));
  });

  it("respects position maximums", async () => {
    const mockPrisma = {
      player: {
        findMany: async () => Array(20).fill(mockPlayer({ position: "qb" })),
      },
    };

    const recs = await getPickRecs(mockPrisma as any, mockLeagueSettings);
    const qbCount = recs.filter((p) => p.position === "qb").length;
    expect(qbCount).toBeLessThanOrEqual(mockRosterSettings.qb.max);
  });
});
