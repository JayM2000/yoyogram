/**
 * User router — profiles, follow/unfollow, search, suggestions — backed by Prisma.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  // Get user profile
  getProfile: baseProcedure
    .input(z.object({ username: z.string() }))
    .query(async ({ input }) => {
      const user = await db.user.findUnique({
        where: { username: input.username },
        select: {
          id: true,
          username: true,
          displayName: true,
          email: true,
          avatar: true,
          coverImage: true,
          bio: true,
          website: true,
          isVerified: true,
          createdAt: true,
          _count: {
            select: {
              posts: true,
              followers: true,
              following: true,
            },
          },
        },
      });

      if (!user) throw new Error("User not found");
      return user;
    }),

  // Check if currentUser follows targetUser
  isFollowing: baseProcedure
    .input(z.object({ followerId: z.string(), followingId: z.string() }))
    .query(async ({ input }) => {
      const follow = await db.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: input.followerId,
            followingId: input.followingId,
          },
        },
      });
      return { isFollowing: !!follow };
    }),

  // Toggle follow/unfollow
  follow: baseProcedure
    .input(z.object({ followerId: z.string(), followingId: z.string() }))
    .mutation(async ({ input }) => {
      if (input.followerId === input.followingId) {
        throw new Error("Cannot follow yourself");
      }

      const existing = await db.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: input.followerId,
            followingId: input.followingId,
          },
        },
      });

      if (existing) {
        await db.follow.delete({
          where: {
            followerId_followingId: {
              followerId: input.followerId,
              followingId: input.followingId,
            },
          },
        });
        return { following: false };
      }

      await db.follow.create({
        data: {
          followerId: input.followerId,
          followingId: input.followingId,
        },
      });

      // Create follow notification
      await db.notification.create({
        data: {
          userId: input.followingId,
          type: "follow",
          fromId: input.followerId,
        },
      });

      return { following: true };
    }),

  // Search users + hashtags
  search: baseProcedure
    .input(
      z.object({
        query: z.string().min(1),
        type: z.enum(["users", "hashtags", "all"]).default("all"),
      })
    )
    .query(async ({ input }) => {
      const q = input.query;

      const users =
        input.type !== "hashtags"
          ? await db.user.findMany({
              where: {
                OR: [
                  { username: { contains: q, mode: "insensitive" } },
                  { displayName: { contains: q, mode: "insensitive" } },
                ],
              },
              select: {
                id: true,
                username: true,
                displayName: true,
                avatar: true,
                isVerified: true,
              },
              take: 10,
            })
          : [];

      const hashtags =
        input.type !== "users"
          ? await db.hashtag.findMany({
              where: {
                name: { contains: q, mode: "insensitive" },
              },
              select: {
                id: true,
                name: true,
                _count: { select: { posts: true } },
              },
              take: 10,
            })
          : [];

      return { users, hashtags };
    }),

  // Suggested users (users you don't follow)
  suggestions: baseProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ input }) => {
      if (!input.userId) {
        // Unauthenticated: return popular users
        return db.user.findMany({
          select: {
            id: true,
            username: true,
            displayName: true,
            avatar: true,
            isVerified: true,
            _count: { select: { followers: true } },
          },
          orderBy: { followers: { _count: "desc" } },
          take: 5,
        });
      }

      // Exclude users the current user already follows
      const following = await db.follow.findMany({
        where: { followerId: input.userId },
        select: { followingId: true },
      });
      const followingIds = following.map((f) => f.followingId);
      followingIds.push(input.userId); // exclude self

      return db.user.findMany({
        where: { id: { notIn: followingIds } },
        select: {
          id: true,
          username: true,
          displayName: true,
          avatar: true,
          isVerified: true,
          _count: { select: { followers: true } },
        },
        orderBy: { followers: { _count: "desc" } },
        take: 5,
      });
    }),

  // Update profile
  updateProfile: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        displayName: z.string().min(1).max(50).optional(),
        bio: z.string().max(500).optional(),
        website: z.string().url().optional().or(z.literal("")),
        avatar: z.string().url().optional(),
        coverImage: z.string().url().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { userId, ...data } = input;
      const cleanData = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined)
      );

      const user = await db.user.update({
        where: { id: userId },
        data: cleanData,
      });

      return user;
    }),
});
