/**
 * Comment router — handles comments on posts.
 * Uses mock data for now; will wire to Prisma when DB is connected.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

const mockComments = [
  {
    id: "c1",
    postId: "p1",
    userId: "u2",
    user: { id: "u2", username: "luna_design", displayName: "Luna Park", avatar: null, isVerified: false },
    text: "This is absolutely stunning! The color palette is chef's kiss 👨‍🍳💋",
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "c2",
    postId: "p1",
    userId: "u3",
    user: { id: "u3", username: "alex.codes", displayName: "Alex Rivera", avatar: null, isVerified: true },
    text: "What stack are you using for this? Looks incredible 🔥",
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: "c3",
    postId: "p1",
    userId: "u4",
    user: { id: "u4", username: "kai.music", displayName: "Kai Santos", avatar: null, isVerified: false },
    text: "The future is now 🚀",
    createdAt: new Date(Date.now() - 60 * 60 * 1000),
  },
  {
    id: "c4",
    postId: "p2",
    userId: "u1",
    user: { id: "u1", username: "sarah_dev", displayName: "Sarah Chen", avatar: null, isVerified: true },
    text: "Tokyo never disappoints! Great shot 📸",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
];

export const commentRouter = createTRPCRouter({
  // Get comments for a post
  getComments: baseProcedure
    .input(
      z.object({
        postId: z.string(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(({ input }) => {
      const comments = mockComments.filter((c) => c.postId === input.postId);
      return { comments, nextCursor: undefined };
    }),

  // Add comment
  create: baseProcedure
    .input(
      z.object({
        postId: z.string(),
        text: z.string().min(1).max(500),
      })
    )
    .mutation(({ input }) => {
      return {
        id: `c${Date.now()}`,
        postId: input.postId,
        userId: "current-user",
        user: {
          id: "current-user",
          username: "you",
          displayName: "You",
          avatar: null,
          isVerified: false,
        },
        text: input.text,
        createdAt: new Date(),
      };
    }),

  // Delete comment
  delete: baseProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(({ input }) => {
      return { deleted: true, commentId: input.commentId };
    }),
});
