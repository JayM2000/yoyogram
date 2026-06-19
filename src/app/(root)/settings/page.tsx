"use client";

import { GlassCard } from "@/components/shared/GlassCard";
import { GradientText } from "@/components/shared/GradientText";
import { GradientButton } from "@/components/shared/GradientButton";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Avatar } from "@/components/shared/Avatar";
import { FadeIn } from "@/components/animations/FadeIn";

export default function SettingsPage() {
  return (
    <div className="px-4 lg:px-8 py-6 max-w-2xl mx-auto space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold">
          <GradientText>Settings</GradientText>
        </h1>
      </FadeIn>

      {/* Profile section */}
      <FadeIn delay={0.05}>
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <div className="flex items-center gap-4 mb-6">
            <Avatar src={null} alt="You" size="lg" ring />
            <div>
              <p className="font-semibold">Your Name</p>
              <button className="text-sm text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer">
                Change profile photo
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Display Name</label>
              <input
                type="text"
                defaultValue="Your Name"
                className="w-full px-4 py-2.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border text-sm outline-none focus:border-brand-purple-500 transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Bio</label>
              <textarea
                rows={3}
                defaultValue=""
                placeholder="Tell the world about yourself..."
                className="w-full px-4 py-2.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border text-sm outline-none focus:border-brand-purple-500 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Website</label>
              <input
                type="url"
                placeholder="https://your-site.com"
                className="w-full px-4 py-2.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border text-sm outline-none focus:border-brand-purple-500 transition-colors"
              />
            </div>
          </div>
          <div className="mt-6">
            <GradientButton size="sm">Save Changes</GradientButton>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Appearance */}
      <FadeIn delay={0.1}>
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">Switch between dark and light mode</p>
            </div>
            <ThemeToggle />
          </div>
        </GlassCard>
      </FadeIn>

      {/* Privacy */}
      <FadeIn delay={0.15}>
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold mb-4">Privacy</h2>
          <div className="space-y-4">
            {["Private account", "Show activity status", "Allow message requests"].map((label) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <button className="w-11 h-6 rounded-full bg-dark-muted dark:bg-dark-muted light:bg-light-muted relative transition-colors cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 rounded-full bg-gray-400 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Danger zone */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-6 border-red-500/20">
          <h2 className="text-lg font-semibold mb-4 text-red-400">Danger Zone</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors cursor-pointer">
              Delete
            </button>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
