/**
 * Story router — handles stories (24h content).
 * Uses mock data for now; will wire to Prisma when DB is connected.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

const mockStories = [
  {
    id: "s1",
    userId: "u1",
    user: { id: "u1", username: "sarah_dev", displayName: "Sarah Chen", avatar: null },
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=700&fit=crop",
    expiresAt: new Date(Date.now() + 20 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    viewed: false,
  },
  {
    id: "s2",
    userId: "u2",
    user: { id: "u2", username: "luna_design", displayName: "Luna Park", avatar: null },
    mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=700&fit=crop",
    expiresAt: new Date(Date.now() + 18 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    viewed: false,
  },
  {
    id: "s3",
    userId: "u3",
    user: { id: "u3", username: "alex.codes", displayName: "Alex Rivera", avatar: null },
    mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=700&fit=crop",
    expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    viewed: true,
  },
];

export const storyRouter = createTRPCRouter({
  // Get active stories from followed users
  getStories: baseProcedure.query(() => {
    return mockStories.filter((s) => s.expiresAt > new Date());
  }),

  // Create story
  create: baseProcedure
    .input(
      z.object({
        mediaUrl: z.string().url(),
      })
    )
    .mutation(({ input }) => {
      return {
        id: `s${Date.now()}`,
        userId: "current-user",
        mediaUrl: input.mediaUrl,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        createdAt: new Date(),
      };
    }),

  // Mark story as viewed
  view: baseProcedure
    .input(z.object({ storyId: z.string() }))
    .mutation(({ input }) => {
      return { viewed: true, storyId: input.storyId };
    }),
});
