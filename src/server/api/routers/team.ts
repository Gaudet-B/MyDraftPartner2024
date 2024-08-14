import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  /** @TODO revert back to protectedProcedure */
  getAllTeamsByPlayer: publicProcedure.query(async ({ ctx }) => {
    // getAllTeamsByPlayer: protectedProcedure.query(async ({ ctx }) => {
    // .input(z.object({ userId: z.string() }))
    /** @TODO would it be better to get 'userId' from server? */
    const teams = await ctx.db.team.findMany({
      where: { userId: ctx.session?.user.id },
    });
    return teams;
  }),
  /** @TODO revert back to protectedProcedure */
  // getOne: protectedProcedure
  getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.team.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
