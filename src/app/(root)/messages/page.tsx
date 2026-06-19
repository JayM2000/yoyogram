"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { Avatar } from "@/components/shared/Avatar";
import { FadeIn } from "@/components/animations/FadeIn";

const mockConversations = [
  { id: "c1", user: "luna_design", displayName: "Luna Park", avatar: null, lastMessage: "That design looks amazing! 🎨", time: "2m", unread: 2, online: true },
  { id: "c2", user: "alex.codes", displayName: "Alex Rivera", avatar: null, lastMessage: "Check out this new framework", time: "15m", unread: 0, online: true },
  { id: "c3", user: "kai.music", displayName: "Kai Santos", avatar: null, lastMessage: "The concert was incredible!", time: "1h", unread: 1, online: false },
  { id: "c4", user: "maya.photo", displayName: "Maya Patel", avatar: null, lastMessage: "Sent you a photo", time: "3h", unread: 0, online: false },
  { id: "c5", user: "neo_artist", displayName: "Neo", avatar: null, lastMessage: "Let's collab on something", time: "5h", unread: 0, online: true },
];

export default function MessagesPage() {
  return (
    <div className="px-4 lg:px-8 py-6 max-w-4xl mx-auto">
      <div className="flex h-[calc(100dvh-8rem)] lg:h-[calc(100dvh-4rem)] rounded-3xl overflow-hidden border border-dark-border dark:border-dark-border light:border-light-border">
        {/* Conversation list */}
        <div className="w-full md:w-[360px] border-r border-dark-border dark:border-dark-border light:border-light-border bg-dark-surface/30 dark:bg-dark-surface/30 light:bg-light-surface/50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-dark-border dark:border-dark-border light:border-light-border">
            <FadeIn>
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-xl font-bold">
                  <GradientText>Messages</GradientText>
                </h1>
                <button className="text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-3 py-2 rounded-xl bg-dark-base dark:bg-dark-base light:bg-light-base border border-dark-border dark:border-dark-border light:border-light-border text-sm outline-none focus:border-brand-purple-500/50 transition-colors"
              />
            </FadeIn>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-center gap-3 p-4 hover:bg-dark-muted/30 dark:hover:bg-dark-muted/30 light:hover:bg-light-muted/30 transition-colors cursor-pointer text-left"
              >
                <Avatar src={conv.avatar} alt={conv.displayName} size="md" online={conv.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm truncate">{conv.displayName}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 flex items-center justify-center shrink-0">
                    <span className="text-[10px] text-white font-bold">{conv.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area (placeholder) */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-dark-base/50 dark:bg-dark-base/50 light:bg-light-base/50">
          <FadeIn>
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple-600/20 to-brand-orange-500/20 flex items-center justify-center mx-auto mb-4">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-purple-400">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-1">Your Messages</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Send private messages to your connections
              </p>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 text-white text-sm font-semibold cursor-pointer">
                Start a Conversation
              </button>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
