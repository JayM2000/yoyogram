/**
 * User router — handles profiles, follow/unfollow, search, suggestions.
 * Uses mock data for now; will wire to Prisma when DB is connected.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

const mockUsers = [
  {
    id: "u1",
    username: "sarah_dev",
    displayName: "Sarah Chen",
    email: "sarah@dev.com",
    avatar: null,
    coverImage: null,
    bio: "Full-stack developer & UI enthusiast 💜 Building the future one pixel at a time.",
    website: "sarahchen.dev",
    isVerified: true,
    _count: { posts: 247, followers: 12400, following: 891 },
    isFollowing: false,
  },
  {
    id: "u2",
    username: "luna_design",
    displayName: "Luna Park",
    email: "luna@design.com",
    avatar: null,
    coverImage: null,
    bio: "UI/UX designer crafting digital experiences ✨",
    website: "lunapark.design",
    isVerified: false,
    _count: { posts: 183, followers: 8900, following: 432 },
    isFollowing: true,
  },
  {
    id: "u3",
    username: "alex.codes",
    displayName: "Alex Rivera",
    email: "alex@codes.io",
    avatar: null,
    coverImage: null,
    bio: "Open source contributor. Rust & TypeScript. Coffee addict ☕",
    website: "alexcodes.io",
    isVerified: true,
    _count: { posts: 89, followers: 5600, following: 234 },
    isFollowing: false,
  },
  {
    id: "u4",
    username: "kai.music",
    displayName: "Kai Santos",
    email: "kai@music.fm",
    avatar: null,
    coverImage: null,
    bio: "Producer & sound designer 🎧 Making beats that move souls",
    website: null,
    isVerified: false,
    _count: { posts: 312, followers: 15200, following: 567 },
    isFollowing: false,
  },
  {
    id: "u5",
    username: "maya.photo",
    displayName: "Maya Patel",
    email: "maya@photo.co",
    avatar: null,
    coverImage: null,
    bio: "Street photographer 📸 NYC based",
    website: "mayapatel.co",
    isVerified: true,
    _count: { posts: 456, followers: 22100, following: 189 },
    isFollowing: false,
  },
];

export const userRouter = createTRPCRouter({
  // Get user profile
  getProfile: baseProcedure
    .input(z.object({ username: z.string() }))
    .query(({ input }) => {
      const user = mockUsers.find((u) => u.username === input.username);
      if (!user) throw new Error("User not found");
      return user;
    }),

  // Toggle follow/unfollow
  follow: baseProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(({ input }) => {
      return { following: true, userId: input.userId };
    }),

  // Search users + hashtags
  search: baseProcedure
    .input(
      z.object({
        query: z.string().min(1),
        type: z.enum(["users", "hashtags", "all"]).default("all"),
      })
    )
    .query(({ input }) => {
      const q = input.query.toLowerCase();
      const users =
        input.type !== "hashtags"
          ? mockUsers
              .filter(
                (u) =>
                  u.username.includes(q) ||
                  u.displayName.toLowerCase().includes(q)
              )
              .slice(0, 8)
              .map((u) => ({
                id: u.id,
                username: u.username,
                displayName: u.displayName,
                avatar: u.avatar,
                isVerified: u.isVerified,
              }))
          : [];

      const hashtags =
        input.type !== "users"
          ? [
              { id: "h1", name: "aurora", _count: { posts: 124000 } },
              { id: "h2", name: "cyberpunk", _count: { posts: 89000 } },
              { id: "h3", name: "techvibes", _count: { posts: 67000 } },
            ].filter((h) => h.name.includes(q))
          : [];

      return { users, hashtags };
    }),

  // Suggested users to follow
  suggestions: baseProcedure.query(() => {
    return mockUsers
      .filter((u) => !u.isFollowing)
      .slice(0, 5)
      .map((u) => ({
        id: u.id,
        username: u.username,
        displayName: u.displayName,
        avatar: u.avatar,
        isVerified: u.isVerified,
        _count: { followers: u._count.followers },
      }));
  }),
});
