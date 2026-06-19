"use client";

import { motion } from "motion/react";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Avatar } from "@/components/shared/Avatar";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import {
  StaggerChildren,
  StaggerItem,
} from "@/components/animations/StaggerChildren";

/* ── Mock Data ── */
const mockStories = [
  { id: "add", username: "Your Story", avatar: null, hasNew: false, isAdd: true },
  { id: "1", username: "sarah_dev", avatar: null, hasNew: true },
  { id: "2", username: "alex.codes", avatar: null, hasNew: true },
  { id: "3", username: "luna_design", avatar: null, hasNew: true },
  { id: "4", username: "kai.music", avatar: null, hasNew: false },
  { id: "5", username: "maya.photo", avatar: null, hasNew: true },
  { id: "6", username: "zen_art", avatar: null, hasNew: false },
  { id: "7", username: "nova_tech", avatar: null, hasNew: true },
];

const mockPosts = [
  {
    id: "1",
    user: { username: "sarah_dev", displayName: "Sarah Chen", avatar: null, isVerified: true },
    mediaUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop",
    caption: "Building the future, one line of code at a time ✨ #coding #developer #futuristic",
    location: "San Francisco, CA",
    likes: 2847,
    comments: 142,
    liked: false,
    saved: false,
    timeAgo: "2h",
  },
  {
    id: "2",
    user: { username: "luna_design", displayName: "Luna Park", avatar: null, isVerified: false },
    mediaUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=600&fit=crop",
    caption: "Neon dreams and pixel themes 🌙 Love exploring these new design concepts #design #ui",
    location: "Tokyo, Japan",
    likes: 5123,
    comments: 328,
    liked: true,
    saved: true,
    timeAgo: "4h",
  },
  {
    id: "3",
    user: { username: "alex.codes", displayName: "Alex Rivera", avatar: null, isVerified: true },
    mediaUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=600&fit=crop",
    caption: "Retro vibes meet modern tech 🎮 The aesthetic is unmatched #retro #gaming #tech",
    location: "Austin, TX",
    likes: 1956,
    comments: 89,
    liked: false,
    saved: false,
    timeAgo: "6h",
  },
];

const mockSuggestions = [
  { username: "zara.smith", displayName: "Zara Smith", avatar: null, followers: 12400, mutual: 5 },
  { username: "neo_artist", displayName: "Neo", avatar: null, followers: 8900, mutual: 3 },
  { username: "pixel.queen", displayName: "Pixel Queen", avatar: null, followers: 23100, mutual: 8 },
];

const trendingTags = [
  { name: "aurora", posts: 124000 },
  { name: "cyberpunk", posts: 89000 },
  { name: "techvibes", posts: 67000 },
  { name: "neonart", posts: 45000 },
];

/* ── Stories Bar ── */
function StoriesBar() {
  return (
    <div className="overflow-x-auto scrollbar-hide -mx-4 px-4">
      <div className="flex gap-4 py-4">
        {mockStories.map((story) => (
          <motion.button
            key={story.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center gap-1.5 min-w-[72px] cursor-pointer"
          >
            <div className="relative">
              {story.isAdd ? (
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-dark-muted dark:border-dark-muted flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-dark-card dark:bg-dark-card flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-purple-400">
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </div>
                </div>
              ) : (
                <Avatar
                  src={story.avatar}
                  alt={story.username}
                  size="lg"
                  ring={story.hasNew}
                />
              )}
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-400 truncate max-w-[72px]">
              {story.isAdd ? "Add" : story.username}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ── Post Card ── */
function PostCard({ post }: { post: typeof mockPosts[0] }) {
  return (
    <GlassCard className="overflow-hidden" hoverGlow>
      {/* Header */}
      <div className="flex items-center gap-3 p-4">
        <Avatar src={post.user.avatar} alt={post.user.displayName} size="md" ring />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm truncate">{post.user.username}</span>
            {post.user.isVerified && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple-400 shrink-0">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {post.location && <span>{post.location}</span>}
            <span>·</span>
            <span>{post.timeAgo}</span>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative aspect-square bg-dark-surface dark:bg-dark-surface overflow-hidden">
        <img
          src={post.mediaUrl}
          alt={post.caption ?? "Post image"}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Action Bar */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.82 }}
              whileHover={{ scale: 1.12 }}
              className={`cursor-pointer ${post.liked ? "text-red-500" : "text-gray-300 dark:text-gray-300 hover:text-red-400"} transition-colors`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={post.liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="text-gray-300 dark:text-gray-300 hover:text-white transition-colors cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} className="text-gray-300 dark:text-gray-300 hover:text-white transition-colors cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </motion.button>
          </div>
          <motion.button
            whileTap={{ scale: 0.82 }}
            whileHover={{ scale: 1.12 }}
            className={`cursor-pointer ${post.saved ? "text-brand-orange-500" : "text-gray-300 dark:text-gray-300 hover:text-brand-orange-400"} transition-colors`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={post.saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </motion.button>
        </div>

        {/* Like count */}
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-sm">
            <AnimatedCounter value={post.likes} compact /> 
          </span>
          <span className="text-sm text-muted-foreground">likes</span>
        </div>

        {/* Caption */}
        {post.caption && (
          <p className="text-sm leading-relaxed">
            <span className="font-semibold mr-1.5">{post.user.username}</span>
            {post.caption.split(/(#\w+|@\w+)/g).map((part, i) => {
              if (part.startsWith("#")) {
                return (
                  <span key={i} className="text-brand-orange-400 cursor-pointer hover:underline">
                    {part}
                  </span>
                );
              }
              if (part.startsWith("@")) {
                return (
                  <span key={i} className="text-brand-purple-400 cursor-pointer hover:underline">
                    {part}
                  </span>
                );
              }
              return part;
            })}
          </p>
        )}

        {/* Comments preview */}
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          View all {post.comments} comments
        </button>
      </div>
    </GlassCard>
  );
}

/* ── Right Panel ── */
function RightPanel() {
  return (
    <div className="hidden xl:block w-[320px] shrink-0 space-y-6 sticky top-6">
      {/* Suggestions */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-muted-foreground">Suggested for you</span>
          <button className="text-xs font-semibold text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer">
            See All
          </button>
        </div>
        <div className="space-y-4">
          {mockSuggestions.map((user) => (
            <div key={user.username} className="flex items-center gap-3">
              <Avatar src={user.avatar} alt={user.displayName} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user.username}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.mutual} mutual followers
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-xs font-semibold text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer"
              >
                Follow
              </motion.button>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Trending */}
      <GlassCard className="p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Trending</h3>
        <div className="space-y-3">
          {trendingTags.map((tag) => (
            <motion.button
              key={tag.name}
              whileHover={{ x: 4 }}
              className="flex items-center justify-between w-full text-left cursor-pointer"
            >
              <span className="text-sm">
                <span className="text-brand-orange-400">#</span>
                {tag.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {(tag.posts / 1000).toFixed(0)}K
              </span>
            </motion.button>
          ))}
        </div>
      </GlassCard>

      {/* Footer */}
      <div className="text-xs text-muted-foreground/50 space-y-2 px-1">
        <p>About · Help · Press · API · Jobs · Privacy · Terms</p>
        <p>© 2025 <GradientText className="text-xs">Aura</GradientText></p>
      </div>
    </div>
  );
}

/* ── Home Page ── */
export default function HomePage() {
  return (
    <div className="flex gap-8 px-4 lg:px-8 py-6">
      {/* Feed Column */}
      <div className="flex-1 max-w-[600px] mx-auto xl:mx-0 space-y-6">
        {/* Stories */}
        <GlassCard className="px-4">
          <StoriesBar />
        </GlassCard>

        {/* Posts */}
        <StaggerChildren staggerDelay={0.15} className="space-y-6">
          {mockPosts.map((post) => (
            <StaggerItem key={post.id}>
              <PostCard post={post} />
            </StaggerItem>
          ))}
        </StaggerChildren>

        {/* End of feed */}
        <div className="text-center py-8">
          <p className="text-muted-foreground text-sm">You&apos;re all caught up ✨</p>
        </div>
      </div>

      {/* Right Panel */}
      <RightPanel />
    </div>
  );
}
