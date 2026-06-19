"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Avatar } from "@/components/shared/Avatar";
import { FadeIn } from "@/components/animations/FadeIn";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

const mockNotifications = [
  { id: "n1", type: "like", from: "luna_design", avatar: null, text: "liked your photo", timeAgo: "2m", isRead: false, postThumb: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=60&h=60&fit=crop" },
  { id: "n2", type: "follow", from: "alex.codes", avatar: null, text: "started following you", timeAgo: "15m", isRead: false },
  { id: "n3", type: "comment", from: "kai.music", avatar: null, text: "commented: \"This is incredible! 🔥\"", timeAgo: "1h", isRead: false, postThumb: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=60&h=60&fit=crop" },
  { id: "n4", type: "like", from: "maya.photo", avatar: null, text: "liked your photo", timeAgo: "2h", isRead: true, postThumb: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=60&h=60&fit=crop" },
  { id: "n5", type: "mention", from: "neo_artist", avatar: null, text: "mentioned you in a comment", timeAgo: "3h", isRead: true },
  { id: "n6", type: "follow", from: "zara.smith", avatar: null, text: "started following you", timeAgo: "5h", isRead: true },
  { id: "n7", type: "like", from: "pixel.queen", avatar: null, text: "and 4 others liked your photo", timeAgo: "8h", isRead: true, postThumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=60&h=60&fit=crop" },
];

const typeIcons: Record<string, React.ReactNode> = {
  like: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-red-500"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>,
  follow: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple-400"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" /><line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" /></svg>,
  comment: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-brand-orange-400"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  mention: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></svg>,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              <GradientText>Notifications</GradientText>
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount} new notification{unreadCount > 1 ? "s" : ""}
              </p>
            )}
          </div>
          {unreadCount > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={markAllRead}
              className="text-sm text-brand-purple-400 hover:text-brand-purple-300 font-medium transition-colors cursor-pointer"
            >
              Mark all as read
            </motion.button>
          )}
        </div>
      </FadeIn>

      {/* Notification list */}
      <StaggerChildren staggerDelay={0.06}>
        <div className="space-y-2">
          {notifications.map((notif) => (
            <StaggerItem key={notif.id}>
              <GlassCard
                className={`p-4 flex items-center gap-3 transition-colors ${
                  !notif.isRead ? "border-brand-purple-500/20 bg-brand-purple-500/[0.03]" : ""
                }`}
                hoverGlow={!notif.isRead}
              >
                {/* Avatar with type badge */}
                <div className="relative shrink-0">
                  <Avatar src={notif.avatar} alt={notif.from} size="md" />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-dark-card dark:bg-dark-card light:bg-light-card flex items-center justify-center">
                    {typeIcons[notif.type]}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{notif.from}</span>{" "}
                    <span className="text-muted-foreground">{notif.text}</span>
                  </p>
                  <span className="text-xs text-muted-foreground">{notif.timeAgo}</span>
                </div>

                {/* Post thumbnail or follow button */}
                {notif.postThumb ? (
                  <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0">
                    <img src={notif.postThumb} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : notif.type === "follow" ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 text-white text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    Follow
                  </motion.button>
                ) : null}

                {/* Unread dot */}
                {!notif.isRead && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-brand-purple-500 shrink-0"
                  />
                )}
              </GlassCard>
            </StaggerItem>
          ))}
        </div>
      </StaggerChildren>
    </div>
  );
}
