import { postRouter } from "~/server/api/routers/post";
import { playerRouter } from "./routers/player";
import { teamRouter } from "./routers/team";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { rankingRouter } from "./routers/ranking";
import { recommendationsRouter } from "./routers/recommendations";

/**
 * This is the primary router.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  player: playerRouter,
  ranking: rankingRouter,
  recommendations: recommendationsRouter,
  team: teamRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
