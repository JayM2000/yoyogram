/**
 * Post router — handles feed, post CRUD, likes, saves.
 * Uses mock data for now; will wire to Prisma when DB is connected.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

// Mock data matching the UI expectations
const mockUsers = [
  { id: "u1", username: "sarah_dev", displayName: "Sarah Chen", avatar: null, isVerified: true },
  { id: "u2", username: "luna_design", displayName: "Luna Park", avatar: null, isVerified: false },
  { id: "u3", username: "alex.codes", displayName: "Alex Rivera", avatar: null, isVerified: true },
  { id: "u4", username: "kai.music", displayName: "Kai Santos", avatar: null, isVerified: false },
];

const mockPosts = [
  {
    id: "p1",
    userId: "u1",
    user: mockUsers[0],
    mediaUrl: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop"],
    caption: "Building the future, one line of code at a time ✨ #coding #developer #futuristic",
    location: "San Francisco, CA",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    liked: false,
    saved: false,
    _count: { likes: 2847, comments: 142 },
  },
  {
    id: "p2",
    userId: "u2",
    user: mockUsers[1],
    mediaUrl: ["https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=600&fit=crop"],
    caption: "Neon dreams and pixel themes 🌙 Love exploring these new design concepts #design #ui",
    location: "Tokyo, Japan",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    liked: true,
    saved: true,
    _count: { likes: 5123, comments: 328 },
  },
  {
    id: "p3",
    userId: "u3",
    user: mockUsers[2],
    mediaUrl: ["https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop"],
    caption: "Retro vibes meet modern tech 🎮 The aesthetic is unmatched #retro #gaming #tech",
    location: "Austin, TX",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    liked: false,
    saved: false,
    _count: { likes: 1956, comments: 89 },
  },
  {
    id: "p4",
    userId: "u4",
    user: mockUsers[3],
    mediaUrl: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop"],
    caption: "Sound waves in the mountains 🏔️ Nature is the ultimate inspiration #music #nature",
    location: "Aspen, CO",
    createdAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
    liked: false,
    saved: false,
    _count: { likes: 3421, comments: 201 },
  },
];

export const postRouter = createTRPCRouter({
  // Infinite feed
  getFeed: baseProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(20).default(10),
      })
    )
    .query(({ input }) => {
      const { cursor, limit } = input;
      const startIndex = cursor
        ? mockPosts.findIndex((p) => p.id === cursor) + 1
        : 0;
      const posts = mockPosts.slice(startIndex, startIndex + limit);
      const nextCursor =
        startIndex + limit < mockPosts.length
          ? mockPosts[startIndex + limit - 1]?.id
          : undefined;

      return { posts, nextCursor };
    }),

  // Get single post
  getPost: baseProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ input }) => {
      const post = mockPosts.find((p) => p.id === input.postId);
      if (!post) throw new Error("Post not found");
      return post;
    }),

  // Create post (mock)
  create: baseProcedure
    .input(
      z.object({
        mediaUrls: z.array(z.string().url()).min(1).max(10),
        caption: z.string().max(2200).optional(),
        location: z.string().max(100).optional(),
      })
    )
    .mutation(({ input }) => {
      return {
        id: `p${Date.now()}`,
        userId: "current-user",
        mediaUrl: input.mediaUrls,
        caption: input.caption,
        location: input.location,
        createdAt: new Date(),
      };
    }),

  // Toggle like (mock)
  like: baseProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(({ input }) => {
      return { liked: true, postId: input.postId };
    }),

  // Toggle save (mock)
  save: baseProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(({ input }) => {
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
    .query(({ input }) => {
      const posts = mockPosts.filter(
        (p) => p.user.username === input.username
      );
      return { posts, nextCursor: undefined };
    }),

  // Delete post (mock)
  delete: baseProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(({ input }) => {
      return { deleted: true, postId: input.postId };
    }),
});
