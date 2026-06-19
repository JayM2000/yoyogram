"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Avatar } from "@/components/shared/Avatar";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { FadeIn } from "@/components/animations/FadeIn";

const mockProfile = {
  username: "sarah_dev",
  displayName: "Sarah Chen",
  avatar: null,
  bio: "Full-stack developer & UI enthusiast 💜 Building the future one pixel at a time. San Francisco based.",
  website: "sarahchen.dev",
  isVerified: true,
  stats: { posts: 247, followers: 12400, following: 891 },
  isFollowing: false,
};

const mockProfilePosts = Array.from({ length: 12 }, (_, i) => ({
  id: `pp-${i}`,
  url: `https://images.unsplash.com/photo-${
    [
      "1618005182384-a83a8bd57fbe",
      "1634017839464-5c339ebe3cb4",
      "1550745165-9bc0b252726f",
      "1506905925346-21bda4d32df4",
      "1519681393784-d120267933ba",
      "1470071459604-3b5ec3a7fe05",
      "1526374965328-7f61d4dc18c5",
      "1618005198919-d3d4b5a92ead",
      "1451187580459-43490279c0fa",
      "1558618666-fcd25c85f82e",
      "1682687220742-aba13b6e50ba",
      "1618005182384-a83a8bd57fbe",
    ][i]
  }?w=400&h=400&fit=crop`,
  likes: Math.floor(Math.random() * 5000) + 100,
  comments: Math.floor(Math.random() * 200) + 10,
}));

const profileTabs = ["Posts", "Reels", "Saved", "Tagged"];

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");
  const [isFollowing, setIsFollowing] = useState(mockProfile.isFollowing);

  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto space-y-6">
      {/* Cover gradient banner */}
      <FadeIn>
        <div className="relative h-48 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-purple-700 via-brand-purple-600 to-brand-orange-500" />
          <div className="absolute inset-0 dot-grid opacity-30" />
          {/* Edit cover button */}
          <button className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/30 backdrop-blur-md text-white text-xs font-medium hover:bg-black/50 transition-colors cursor-pointer">
            Edit Cover
          </button>
        </div>
      </FadeIn>

      {/* Profile header */}
      <FadeIn delay={0.1}>
        <div className="relative -mt-16 px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
            {/* Avatar */}
            <div className="relative z-10">
              <Avatar src={mockProfile.avatar} alt={mockProfile.displayName} size="xl" ring />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 pb-2">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold truncate">{mockProfile.displayName}</h1>
                {mockProfile.isVerified && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-brand-purple-400 shrink-0">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <p className="text-sm text-brand-purple-400 font-mono">@{mockProfile.username}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  isFollowing
                    ? "border border-brand-purple-500 text-brand-purple-400 hover:bg-brand-purple-500/10"
                    : "bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 text-white shadow-lg shadow-brand-purple-500/20"
                }`}
              >
                {isFollowing ? "Following ✓" : "Follow"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl border border-dark-border dark:border-dark-border light:border-light-border flex items-center justify-center hover:bg-dark-muted/50 transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Bio */}
          <div className="mt-4 max-w-lg">
            <p className="text-sm text-gray-300 dark:text-gray-300 light:text-gray-700 leading-relaxed">
              {mockProfile.bio}
            </p>
            {mockProfile.website && (
              <a
                href={`https://${mockProfile.website}`}
                className="text-sm text-brand-purple-400 hover:underline mt-1 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                🔗 {mockProfile.website}
              </a>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-5">
            {[
              { label: "Posts", value: mockProfile.stats.posts },
              { label: "Followers", value: mockProfile.stats.followers },
              { label: "Following", value: mockProfile.stats.following },
            ].map((stat) => (
              <div key={stat.label} className="text-center md:text-left">
                <span className="font-bold text-lg">
                  <AnimatedCounter value={stat.value} compact />
                </span>
                <span className="text-sm text-muted-foreground ml-1.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.2}>
        <div className="flex gap-1 border-b border-dark-border dark:border-dark-border light:border-light-border">
          {profileTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab
                  ? "text-white dark:text-white light:text-gray-900"
                  : "text-gray-500 hover:text-gray-300 dark:hover:text-gray-300 light:hover:text-gray-700"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="profile-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-purple-500 to-brand-orange-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-1.5 md:gap-3">
        {mockProfilePosts.map((post, i) => (
          <FadeIn key={post.id} delay={i * 0.03}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group aspect-square rounded-xl md:rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={post.url}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <div className="flex items-center gap-1 text-white font-semibold text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {formatCount(post.likes)}
                </div>
                <div className="flex items-center gap-1 text-white font-semibold text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {formatCount(post.comments)}
                </div>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
