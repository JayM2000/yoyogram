/**
 * Notification router — user notifications — backed by Prisma.
 */
import { z } from "zod";
import { createTRPCRouter, baseProcedure } from "@/server/trpc";
import { db } from "@/server/db";

export const notificationRouter = createTRPCRouter({
  // Get all notifications for a user
  getAll: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        cursor: z.string().optional(),
        limit: z.number().min(1).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const { userId, cursor, limit } = input;

      const notifications = await db.notification.findMany({
        take: limit + 1,
        ...(cursor && { cursor: { id: cursor }, skip: 1 }),
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      let nextCursor: string | undefined;
      if (notifications.length > limit) {
        const next = notifications.pop();
        nextCursor = next?.id;
      }

      const unreadCount = await db.notification.count({
        where: { userId, isRead: false },
      });

      return { notifications, unreadCount, nextCursor };
    }),

  // Mark notifications as read
  markRead: baseProcedure
    .input(
      z.object({
        userId: z.string(),
        notificationIds: z.array(z.string()).optional(),
        all: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      if (input.all) {
        await db.notification.updateMany({
          where: { userId: input.userId, isRead: false },
          data: { isRead: true },
        });
      } else if (input.notificationIds?.length) {
        await db.notification.updateMany({
          where: {
            id: { in: input.notificationIds },
            userId: input.userId,
          },
          data: { isRead: true },
        });
      }

      return { success: true };
    }),

  // Get unread count
  unreadCount: baseProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const count = await db.notification.count({
        where: { userId: input.userId, isRead: false },
      });
      return { count };
    }),
});
