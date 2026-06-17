/**
 * This is the primary router for your server.
 *
 * All routers added in /src/server/routers should be manually added here.
 */
import { createCallerFactory, createTRPCRouter } from "@/server/trpc";
import { exampleRouter } from "@/server/routers/example";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

// Export caller factory for server-side calls
export const createCaller = createCallerFactory(appRouter);
