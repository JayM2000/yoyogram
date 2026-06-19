/**
 * Story router — 24h ephemeral content — backed by Prisma.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";
import { db } from "@/server/db";

export const storyRouter = createTRPCRouter({
  // Get active stories (not expired)
  getStories: baseProcedure.query(async () => {
    const stories = await db.story.findMany({
      where: {
        expiresAt: { gt: new Date() },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return stories;
  }),

  // Create story (expires in 24h)
  create: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        mediaUrl: z.string().url(),
      })
    )
    .mutation(async ({ input }) => {
      const story = await db.story.create({
        data: {
          userId: input.userId,
          mediaUrl: input.mediaUrl,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
            },
          },
        },
      });

      return story;
    }),

  // Delete story
  delete: baseProcedure
    .input(z.object({ storyId: z.string() }))
    .mutation(async ({ input }) => {
      await db.story.delete({ where: { id: input.storyId } });
      return { deleted: true };
    }),
});
