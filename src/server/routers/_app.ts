/**
 * This is the primary router for your server.
 *
 * All routers added in /src/server/routers should be manually added here.
 */
import { createCallerFactory, createTRPCRouter } from "@/server/trpc";
import { exampleRouter } from "@/server/routers/example";
import { postRouter } from "@/server/routers/post";
import { userRouter } from "@/server/routers/user";
import { commentRouter } from "@/server/routers/comment";
import { notificationRouter } from "@/server/routers/notification";
import { storyRouter } from "@/server/routers/story";

export const appRouter = createTRPCRouter({
  example: exampleRouter,
  post: postRouter,
  user: userRouter,
  comment: commentRouter,
  notification: notificationRouter,
  story: storyRouter,
});

// Export type definition of API
export type AppRouter = typeof appRouter;

// Export caller factory for server-side calls
export const createCaller = createCallerFactory(appRouter);
