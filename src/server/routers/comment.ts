/**
 * Comment router — CRUD for post comments — backed by Prisma.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";
import { db } from "@/server/db";

export const commentRouter = createTRPCRouter({
  // Get comments for a post (cursor-paginated, newest first)
  getComments: baseProcedure
    .input(
      z.object({
        postId: z.string(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const { postId, cursor, limit } = input;

      const comments = await db.comment.findMany({
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        where: { postId },
        orderBy: { createdAt: "asc" },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              isVerified: true,
            },
          },
        },
      });

      let nextCursor: string | undefined;
      if (comments.length > limit) {
        const next = comments.pop();
        nextCursor = next?.id;
      }

      return { comments, nextCursor };
    }),

  // Add comment + create notification for post owner
  create: baseProcedure
    .input(
      z.object({
        postId: z.string(),
        userId: z.string(),
        text: z.string().min(1).max(500),
      })
    )
    .mutation(async ({ input }) => {
      const comment = await db.comment.create({
        data: {
          postId: input.postId,
          userId: input.userId,
          text: input.text,
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
              displayName: true,
              avatar: true,
              isVerified: true,
            },
          },
        },
      });

      // Create notification for the post owner
      const post = await db.post.findUnique({
        where: { id: input.postId },
        select: { userId: true },
      });

      if (post && post.userId !== input.userId) {
        await db.notification.create({
          data: {
            userId: post.userId,
            type: "comment",
            fromId: input.userId,
            postId: input.postId,
          },
        });
      }

      return comment;
    }),

  // Delete comment
  delete: baseProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async ({ input }) => {
      await db.comment.delete({ where: { id: input.commentId } });
      return { deleted: true, commentId: input.commentId };
    }),
});
