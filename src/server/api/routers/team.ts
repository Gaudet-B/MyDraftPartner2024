import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const teamRouter = createTRPCRouter({
  /** @TODO revert back to protectedProcedure */
  // getAllTeamsByUser: publicProcedure.query(async ({ ctx }) => {
  getAllTeamsByUser: protectedProcedure.query(async ({ ctx }) => {
    const teams = await ctx.db.team.findMany({
      where: { userId: ctx.session?.user.id },
    });
    console.log("user", ctx.session?.user.id);
    return teams;
  }),
  /** @TODO revert back to protectedProcedure */
  getOne: protectedProcedure
    // getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.team.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
  /** @TODO revert back to protectedProcedure */
  createTeam: protectedProcedure
    // createTeam: publicProcedure
    .input(
      z.object({
        name: z.string(),
        settings: z.object({}),
        league: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session?.user.id;
      if (!userId) {
        /** @TODO best way to handle this potential error? */
        throw new Error("User not found");
      }
      return ctx.db.team.create({
        data: {
          name: input.name,
          settings: input.settings,
          league: input.league,
          userId,
        },
      });
    }),
  /** @TODO revert back to protectedProcedure */
  updateTeam: protectedProcedure
    // updateTeam: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        settings: z.object({}),
        league: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.team.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          settings: input.settings,
          league: input.league,
        },
      });
    }),
});
