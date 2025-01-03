import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import { getPickRecs } from "../util/recommendations";

const positionSchema = z.object({
  starters: z.number(),
  max: z.number().optional(),
});

const rosterSchema = z.object({
  qb: positionSchema,
  rb: positionSchema,
  wr: positionSchema,
  te: positionSchema,
  dst: positionSchema,
  k: positionSchema,
  // bench has no "starters"
  bench: z.object({
    max: z.number(),
  }),
  // flex has only "starters"
  flex: z.object({
    starters: z.number(),
  }),
});

export const recommendationsRouter = createTRPCRouter({
  // getRecommendations: protectedProcedure
  getRecommendations: publicProcedure
    .input(
      z.object({
        ppr: z.enum(["0", "0.5", "1.0"]),
        superflex: z.boolean(),
        // superflex: z.enum(["YES", "NO"]),
        draftPosition: z.number(),
        numOfTeams: z.number(),
        roster: rosterSchema,
      }),
    )
    .query(async ({ ctx, input }) => {
      return await getPickRecs(ctx.db, input);
    }),
});
