/**
 * Post router — feed, CRUD, likes, saves — backed by Neon PostgreSQL via Prisma.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";
import { db } from "@/server/db";

export const postRouter = createTRPCRouter({
  // Infinite feed (all posts, newest first)
  getFeed: baseProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(async ({ input }) => {
      const { cursor, limit } = input;

      const posts = await db.post.findMany({
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        orderBy: { createdAt: "desc" },
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
          _count: {
            select: { likes: true, comments: true },
          },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > limit) {
        const next = posts.pop();
        nextCursor = next?.id;
      }

      return { posts, nextCursor };
    }),

  // Get single post with comments
  getPost: baseProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ input }) => {
      const post = await db.post.findUnique({
        where: { id: input.postId },
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
          comments: {
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
            orderBy: { createdAt: "asc" },
            take: 50,
          },
          _count: {
            select: { likes: true, comments: true },
          },
        },
      });

      if (!post) throw new Error("Post not found");
      return post;
    }),

  // Create post
  create: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        mediaUrls: z.array(z.string().url()).min(1).max(10),
        caption: z.string().max(2200).optional(),
        location: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const post = await db.post.create({
        data: {
          userId: input.userId,
          mediaUrl: input.mediaUrls,
          caption: input.caption,
          location: input.location,
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

      // Extract and upsert hashtags from caption
      if (input.caption) {
        const tags = input.caption.match(/#(\w+)/g);
        if (tags) {
          for (const tag of tags) {
            const name = tag.replace("#", "").toLowerCase();
            const hashtag = await db.hashtag.upsert({
              where: { name },
              create: { name },
              update: {},
            });
            await db.postHashtag.create({
              data: { postId: post.id, hashtagId: hashtag.id },
            });
          }
        }
      }

      return post;
    }),

  // Toggle like
  like: baseProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const existing = await db.like.findUnique({
        where: {
          userId_postId: {
            userId: input.userId,
            postId: input.postId,
          },
        },
      });

      if (existing) {
        await db.like.delete({
          where: {
            userId_postId: {
              userId: input.userId,
              postId: input.postId,
            },
          },
        });
        return { liked: false, postId: input.postId };
      }

      await db.like.create({
        data: {
          userId: input.userId,
          postId: input.postId,
        },
      });

      return { liked: true, postId: input.postId };
    }),

  // Toggle save
  save: baseProcedure
    .input(z.object({ postId: z.string(), userId: z.string() }))
    .mutation(async ({ input }) => {
      const existing = await db.savedPost.findUnique({
        where: {
          userId_postId: {
            userId: input.userId,
            postId: input.postId,
          },
        },
      });

      if (existing) {
        await db.savedPost.delete({
          where: {
            userId_postId: {
              userId: input.userId,
              postId: input.postId,
            },
          },
        });
        return { saved: false, postId: input.postId };
      }

      await db.savedPost.create({
        data: {
          userId: input.userId,
          postId: input.postId,
        },
      });

      return { saved: true, postId: input.postId };
    }),

  // Get posts by user (profile grid)
  getByUser: baseProcedure
    .input(
      z.object({
        username: z.string(),
        cursor: z.string().optional(),
        limit: z.number().default(12),
      })
    )
    .query(async ({ input }) => {
      const posts = await db.post.findMany({
        take: input.limit + 1,
        ...(input.cursor && { cursor: { id: input.cursor }, skip: 1 }),
        where: { user: { username: input.username } },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          mediaUrl: true,
          createdAt: true,
          _count: { select: { likes: true, comments: true } },
        },
      });

      let nextCursor: string | undefined;
      if (posts.length > input.limit) {
        const next = posts.pop();
        nextCursor = next?.id;
      }

      return { posts, nextCursor };
    }),

  // Delete post
  delete: baseProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ input }) => {
      await db.post.delete({ where: { id: input.postId } });
      return { deleted: true, postId: input.postId };
    }),
});
