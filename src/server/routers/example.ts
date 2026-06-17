/**
 * Example router - demonstrates a basic tRPC query and mutation.
 *
 * Replace or extend this router with your own procedures.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

export const exampleRouter = createTRPCRouter({
  hello: baseProcedure
    .input(
      z.object({
        text: z.string().optional(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text ?? "world"} from tRPC!`,
      };
    }),

  getAll: baseProcedure.query(() => {
    return [
      { id: "1", name: "Example Item 1" },
      { id: "2", name: "Example Item 2" },
      { id: "3", name: "Example Item 3" },
    ];
  }),
});
