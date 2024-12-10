import { update } from "@react-spring/web";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const rankingRouter = createTRPCRouter({
  // get unique
  getRanks: protectedProcedure
    .input(z.object({ teamId: z.number() }))
    .query(async ({ ctx, input }) => {
      const ranks = await ctx.db.ranking.findUnique({
        where: { teamId: input.teamId },
      });
      return ranks;
    }),
  // create
  createRanks: protectedProcedure
    .input(
      z.object({
        teamId: z.number(),
        ranks: z.array(z.object({ player: z.number(), rank: z.number() })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ranking.create({
        data: {
          teamId: input.teamId,
          rankings: input.ranks,
        },
      });
    }),
  // update
  updateRanks: protectedProcedure
    .input(
      z.object({
        teamId: z.number(),
        ranks: z.array(z.object({ player: z.number(), rank: z.number() })),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.ranking.update({
        where: { teamId: input.teamId },
        data: {
          rankings: input.ranks,
        },
      });
    }),
});
