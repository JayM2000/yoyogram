/**
 * tRPC API Route Handler for Next.js App Router.
 *
 * This file handles all tRPC requests via the catch-all route
 * /api/trpc/[trpc]
 *
 * @see https://trpc.io/docs/server/adapters/nextjs
 */
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/server/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
