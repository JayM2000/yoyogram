/**
 * tRPC Server-Side Caller.
 *
 * Use this in React Server Components to call tRPC procedures
 * directly on the server without going through HTTP.
 *
 * Usage:
 *   import { trpc } from "@/trpc/server";
 *
 *   export default async function Page() {
 *     const data = await trpc.example.hello({ text: "world" });
 *     return <div>{data.greeting}</div>;
 *   }
 *
 * @see https://trpc.io/docs/client/nextjs/server-side-helpers
 */
import "server-only";

import { createCaller } from "@/server/routers/_app";
import { cache } from "react";

/**
 * Create a server-side caller with React cache.
 * This ensures the same caller is reused within a single request.
 */
const createContext = cache(() => {
  return {};
});

export const trpc = createCaller(createContext);
