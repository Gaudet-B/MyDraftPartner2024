import { z } from "zod";
import { User } from "@prisma/client";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  new: protectedProcedure
    .input(
      z.object({
        name: z.string().nullable(),
        email: z.string().email().nullable(),
        emailVerified: z.string().datetime().nullable(),
        image: z.string().nullable(),
        darkMode: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.create({
        data: {
          // id: ctx.session?.user.id,
          name: input.name,
          email: input.email,
          emailVerified: input.emailVerified,
          image: input.image,
          darkMode: input.darkMode,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        // id: z.string(),
        name: z.string().nullable(),
        email: z.string().email().nullable(),
        emailVerified: z.string().datetime().nullable(),
        image: z.string().nullable(),
        darkMode: z.boolean().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: {
          id: ctx.session?.user.id,
        },
        data: {
          name: input.name,
          email: input.email,
          emailVerified: input.emailVerified,
          image: input.image,
          darkMode: input.darkMode,
        },
      });
    }),

  // getUserIdByInputId: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     return ctx.db.user.findUnique({
  //       where: {
  //         id: input.id,
  //       },
  //     });
  //   }),

  me: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.user.findUnique({
      where: {
        id: ctx.session?.user.id,
      },
    });
  }),
});
