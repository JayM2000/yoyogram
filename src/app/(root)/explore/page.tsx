"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { GlassCard } from "@/components/shared/GlassCard";
import { FadeIn } from "@/components/animations/FadeIn";

const filterTags = [
  "All", "Photography", "Art", "Nature", "Tech", "Fashion", "Travel", "Food",
];

const mockExploreImages = [
  { id: "e1", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop", likes: 3200, comments: 89, aspect: "square" },
  { id: "e2", url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop", likes: 5400, comments: 210, aspect: "tall" },
  { id: "e3", url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=400&h=400&fit=crop", likes: 1800, comments: 45, aspect: "square" },
  { id: "e4", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop", likes: 8900, comments: 320, aspect: "tall" },
  { id: "e5", url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=400&fit=crop", likes: 2100, comments: 67, aspect: "square" },
  { id: "e6", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop", likes: 4600, comments: 134, aspect: "square" },
  { id: "e7", url: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400&h=600&fit=crop", likes: 7200, comments: 256, aspect: "tall" },
  { id: "e8", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=400&fit=crop", likes: 1500, comments: 34, aspect: "square" },
  { id: "e9", url: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400&h=400&fit=crop", likes: 3800, comments: 98, aspect: "square" },
  { id: "e10", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=600&fit=crop", likes: 6100, comments: 187, aspect: "tall" },
  { id: "e11", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop", likes: 2900, comments: 76, aspect: "square" },
  { id: "e12", url: "https://images.unsplash.com/photo-1515879218367-8466d910auj9?w=400&h=400&fit=crop", likes: 4100, comments: 112, aspect: "square" },
];

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="px-4 lg:px-8 py-6 space-y-6">
      {/* Search Bar */}
      <FadeIn>
        <div className="relative max-w-2xl mx-auto">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search users, hashtags, places..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border focus:border-brand-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 text-sm outline-none"
          />
        </div>
      </FadeIn>

      {/* Filter pills */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
          {filterTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeFilter === tag
                  ? "bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 text-white shadow-lg"
                  : "bg-dark-surface dark:bg-dark-surface light:bg-light-card border border-dark-border dark:border-dark-border light:border-light-border text-gray-400 hover:border-brand-purple-500/50"
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Masonry Grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {mockExploreImages.map((img, i) => (
          <FadeIn key={img.id} delay={i * 0.05}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group break-inside-avoid rounded-2xl overflow-hidden cursor-pointer"
            >
              <img
                src={img.url}
                alt=""
                className={`w-full object-cover rounded-2xl ${
                  img.aspect === "tall" ? "aspect-[2/3]" : "aspect-square"
                }`}
                loading="lazy"
              />
              {/* Hover overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center gap-6 rounded-2xl"
              >
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {formatCount(img.likes)}
                </div>
                <div className="flex items-center gap-1.5 text-white font-semibold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  {formatCount(img.comments)}
                </div>
              </motion.div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
