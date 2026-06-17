/**
 * tRPC React Client & Provider.
 *
 * This file sets up the tRPC + TanStack Query client for use in
 * React Client Components. It provides:
 *   - `trpc` - the tRPC hooks (useQuery, useMutation, etc.)
 *   - `TRPCProvider` - wraps the app to provide QueryClient + tRPC client
 *
 * @see https://trpc.io/docs/client/nextjs/app-router-setup
 */
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, createTRPCClient } from "@trpc/client";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { useState } from "react";
import superjson from "superjson";
import { makeQueryClient } from "@/trpc/query-client";
import type { AppRouter } from "@/server/routers/_app";

/**
 * Create the tRPC React context.
 * This gives us the `trpc` object with hooks + the Provider.
 */
export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

let clientQueryClientSingleton: ReturnType<typeof makeQueryClient> | undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= makeQueryClient());
}

function getUrl() {
  const base = (() => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
  })();
  return `${base}/api/trpc`;
}

export function TRPCReactProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
