"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Avatar } from "@/components/shared/Avatar";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { FadeIn } from "@/components/animations/FadeIn";

/* ── Mock data for post detail ── */
const mockPost = {
  id: "p1",
  user: { username: "sarah_dev", displayName: "Sarah Chen", avatar: null, isVerified: true },
  mediaUrl: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&h=900&fit=crop"],
  caption: "Building the future, one line of code at a time ✨ #coding #developer #futuristic",
  location: "San Francisco, CA",
  likes: 2847,
  comments: 142,
  liked: false,
  saved: false,
  timeAgo: "2h ago",
};

const mockComments = [
  { id: "c1", user: { username: "luna_design", avatar: null, isVerified: false }, text: "This is absolutely stunning! The color palette is chef's kiss 👨‍🍳💋", timeAgo: "30m" },
  { id: "c2", user: { username: "alex.codes", avatar: null, isVerified: true }, text: "What stack are you using for this? Looks incredible 🔥", timeAgo: "45m" },
  { id: "c3", user: { username: "kai.music", avatar: null, isVerified: false }, text: "The future is now 🚀", timeAgo: "1h" },
  { id: "c4", user: { username: "maya.photo", avatar: null, isVerified: true }, text: "Can't stop staring at this composition!", timeAgo: "2h" },
  { id: "c5", user: { username: "neo_artist", avatar: null, isVerified: false }, text: "Bookmarked for inspiration ✨", timeAgo: "3h" },
];

export default function PostDetailPage() {
  const [liked, setLiked] = useState(mockPost.liked);
  const [saved, setSaved] = useState(mockPost.saved);
  const [likeCount, setLikeCount] = useState(mockPost.likes);
  const [commentText, setCommentText] = useState("");

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="px-4 lg:px-8 py-6 max-w-5xl mx-auto">
      <FadeIn>
        {/* Back button */}
        <Link href="/">
          <motion.button
            whileHover={{ x: -4 }}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Feed
          </motion.button>
        </Link>

        <div className="flex flex-col lg:flex-row gap-0 lg:gap-0 rounded-3xl overflow-hidden border border-dark-border dark:border-dark-border light:border-light-border bg-dark-card dark:bg-dark-card light:bg-light-card">
          {/* Image section */}
          <div className="lg:w-[60%] bg-black flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
            <img
              src={mockPost.mediaUrl[0]}
              alt={mockPost.caption ?? "Post image"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Comment section */}
          <div className="flex-1 flex flex-col lg:w-[40%]">
            {/* Post header */}
            <div className="flex items-center gap-3 p-4 border-b border-dark-border dark:border-dark-border light:border-light-border">
              <Avatar src={mockPost.user.avatar} alt={mockPost.user.displayName} size="md" ring />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <Link href={`/profile/${mockPost.user.username}`} className="font-semibold text-sm hover:underline">
                    {mockPost.user.username}
                  </Link>
                  {mockPost.user.isVerified && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple-400 shrink-0">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                {mockPost.location && (
                  <p className="text-xs text-muted-foreground">{mockPost.location}</p>
                )}
              </div>
              <button className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>
            </div>

            {/* Comments list */}
            <div className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-4 max-h-[400px] lg:max-h-none">
              {/* Caption as first comment */}
              <div className="flex gap-3">
                <Avatar src={mockPost.user.avatar} alt={mockPost.user.username} size="sm" />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold mr-1.5">{mockPost.user.username}</span>
                    {mockPost.caption?.split(/(#\w+|@\w+)/g).map((part, i) => {
                      if (part.startsWith("#"))
                        return <span key={i} className="text-brand-orange-400 cursor-pointer hover:underline">{part}</span>;
                      if (part.startsWith("@"))
                        return <span key={i} className="text-brand-purple-400 cursor-pointer hover:underline">{part}</span>;
                      return part;
                    })}
                  </p>
                  <span className="text-xs text-muted-foreground">{mockPost.timeAgo}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-dark-border dark:bg-dark-border light:bg-light-border" />

              {/* Comments */}
              {mockComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 group"
                >
                  <Avatar src={comment.user.avatar} alt={comment.user.username} size="sm" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <Link href={`/profile/${comment.user.username}`} className="font-semibold mr-1.5 hover:underline">
                        {comment.user.username}
                      </Link>
                      {comment.user.isVerified && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple-400 inline mr-1">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {comment.text}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Reply</button>
                      <button className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Action bar */}
            <div className="border-t border-dark-border dark:border-dark-border light:border-light-border p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.12 }}
                    onClick={toggleLike}
                    className={`cursor-pointer ${liked ? "text-red-500" : "text-gray-300 hover:text-red-400"} transition-colors`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </motion.button>
                  <motion.button whileTap={{ scale: 0.9 }} className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </motion.button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  whileHover={{ scale: 1.12 }}
                  onClick={() => setSaved(!saved)}
                  className={`cursor-pointer ${saved ? "text-brand-orange-500" : "text-gray-300 hover:text-brand-orange-400"} transition-colors`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </motion.button>
              </div>

              <p className="text-sm font-semibold">
                <AnimatedCounter value={likeCount} compact /> <span className="text-muted-foreground font-normal">likes</span>
              </p>

              {/* Comment input */}
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <AnimatePresence>
                  {commentText.trim() && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="text-sm font-semibold text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer"
                    >
                      Post
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
