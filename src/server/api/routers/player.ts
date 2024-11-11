import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const playerRouter = createTRPCRouter({
  /** @TODO revert back to protectedProcedure */
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.player.findMany();
  }),
  /** @TODO revert back to protectedProcedure */
  getOne: protectedProcedure
    // getOne: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.player.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
