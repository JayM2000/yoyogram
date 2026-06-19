/**
 * Notification router — handles user notifications.
 * Uses mock data for now; will wire to Prisma when DB is connected.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";

const mockNotifications = [
  { id: "n1", userId: "current-user", type: "like", fromId: "u2", postId: "p1", isRead: false, createdAt: new Date(Date.now() - 2 * 60 * 1000) },
  { id: "n2", userId: "current-user", type: "follow", fromId: "u3", postId: null, isRead: false, createdAt: new Date(Date.now() - 15 * 60 * 1000) },
  { id: "n3", userId: "current-user", type: "comment", fromId: "u4", postId: "p1", isRead: false, createdAt: new Date(Date.now() - 60 * 60 * 1000) },
  { id: "n4", userId: "current-user", type: "like", fromId: "u5", postId: "p2", isRead: true, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: "n5", userId: "current-user", type: "mention", fromId: "u1", postId: "p3", isRead: true, createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000) },
];

export const notificationRouter = createTRPCRouter({
  // Get all notifications
  getAll: baseProcedure
    .input(
      z.object({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(({ input }) => {
      const notifications = mockNotifications.slice(0, input.limit);
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      return { notifications, unreadCount, nextCursor: undefined };
    }),

  // Mark notifications as read
  markRead: baseProcedure
    .input(
      z.object({
        notificationIds: z.array(z.string()).optional(),
        all: z.boolean().optional(),
      })
    )
    .mutation(() => {
      return { success: true };
    }),

  // Get unread count
  unreadCount: baseProcedure.query(() => {
    return { count: mockNotifications.filter((n) => !n.isRead).length };
  }),
});
