"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GradientText } from "@/components/shared/GradientText";
import { GradientButton } from "@/components/shared/GradientButton";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock login delay
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-dvh flex">
      {/* ── Left Panel (Decorative) ── */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-dark-base items-center justify-center">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-40" />

        {/* Floating gradient orbs */}
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-brand-purple-600/20 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-brand-orange-500/15 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-brand-purple-400/10 blur-[80px]"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-12 max-w-lg">
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mx-auto mb-8 w-24 h-24 rounded-3xl bg-gradient-to-br from-brand-purple-600 to-brand-orange-500 flex items-center justify-center shadow-2xl animate-pulse-glow"
          >
            <span className="text-white font-bold text-4xl">A</span>
          </motion.div>

          {/* Tagline with staggered letters */}
          <motion.h1
            className="text-5xl xl:text-6xl font-bold mb-4"
            initial="hidden"
            animate="visible"
          >
            <GradientText className="text-5xl xl:text-6xl font-bold">
              Aura
            </GradientText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-gray-400 font-light tracking-wide"
          >
            Express. Connect. Evolve.
          </motion.p>

          {/* Floating mock avatars (social proof) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex justify-center -space-x-3"
          >
            {[
              "bg-brand-purple-600",
              "bg-brand-orange-500",
              "bg-brand-purple-400",
              "bg-brand-orange-400",
              "bg-brand-purple-700",
            ].map((bg, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
                className={`w-10 h-10 rounded-full ${bg} border-2 border-dark-base flex items-center justify-center`}
              >
                <span className="text-white text-xs font-semibold">
                  {String.fromCharCode(65 + i)}
                </span>
              </motion.div>
            ))}
            <div className="w-10 h-10 rounded-full bg-dark-card border-2 border-dark-base flex items-center justify-center">
              <span className="text-xs text-gray-400">+2K</span>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-3 text-sm text-gray-500"
          >
            Join 2,000+ creators already on Aura
          </motion.p>
        </div>

        {/* Abstract rotating shape */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-20 -right-20 w-64 h-64 border border-brand-purple-600/10 rounded-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-10 -right-10 w-48 h-48 border border-brand-orange-500/10 rounded-3xl"
        />
      </div>

      {/* ── Right Panel (Form) ── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-dark-base dark:bg-dark-base light:bg-light-base">
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo (shown only on mobile) */}
          <div className="lg:hidden text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-purple-600 to-brand-orange-500 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <GradientText className="text-3xl font-bold">Aura</GradientText>
          </div>

          {/* Glass card form */}
          <div className="backdrop-blur-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-white/80 border border-brand-purple-500/20 rounded-3xl p-8 shadow-2xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {/* Title */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold mb-2">
                  <GradientText>Welcome Back</GradientText>
                </h2>
                <p className="text-gray-400 dark:text-gray-400 light:text-gray-600">
                  Your universe awaits
                </p>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email field */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Email address"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border transition-all duration-300 text-sm outline-none ${
                      focusedField === "email"
                        ? "border-brand-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        : "border-dark-border dark:border-dark-border light:border-light-border"
                    }`}
                    required
                  />
                  {/* Animated label */}
                  <AnimatePresence>
                    {focusedField === "email" && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-2.5 left-3 px-2 text-xs text-brand-purple-400 bg-dark-surface dark:bg-dark-surface light:bg-light-surface"
                      >
                        Email
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password field */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="relative"
                >
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Password"
                    className={`w-full pl-12 pr-12 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border transition-all duration-300 text-sm outline-none ${
                      focusedField === "password"
                        ? "border-brand-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                        : "border-dark-border dark:border-dark-border light:border-light-border"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {focusedField === "password" && (
                      <motion.span
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute -top-2.5 left-3 px-2 text-xs text-brand-purple-400 bg-dark-surface dark:bg-dark-surface light:bg-light-surface"
                      >
                        Password
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Forgot password */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-right"
                >
                  <button
                    type="button"
                    className="text-xs text-brand-purple-400 hover:text-brand-purple-300 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <GradientButton type="submit" loading={loading} size="md">
                    Continue
                  </GradientButton>
                </motion.div>
              </form>

              {/* Divider */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="flex items-center gap-4 my-6"
              >
                <div className="flex-1 h-px bg-dark-border dark:bg-dark-border light:bg-light-border" />
                <span className="text-xs text-gray-500">or continue with</span>
                <div className="flex-1 h-px bg-dark-border dark:bg-dark-border light:bg-light-border" />
              </motion.div>

              {/* Social login */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex gap-3"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl border border-dark-border dark:border-dark-border light:border-light-border bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-light-surface hover:bg-dark-muted/50 dark:hover:bg-dark-muted/50 light:hover:bg-light-muted/30 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-sm font-medium">Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl border border-dark-border dark:border-dark-border light:border-light-border bg-dark-surface/50 dark:bg-dark-surface/50 light:bg-light-surface hover:bg-dark-muted/50 dark:hover:bg-dark-muted/50 light:hover:bg-light-muted/30 transition-colors cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="text-sm font-medium">GitHub</span>
                </motion.button>
              </motion.div>

              {/* Sign up link */}
              <motion.p
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 },
                }}
                className="text-center mt-8 text-sm text-gray-400 dark:text-gray-400 light:text-gray-600"
              >
                New here?{" "}
                <Link
                  href="/signup"
                  className="text-brand-purple-400 hover:text-brand-purple-300 font-semibold transition-colors"
                >
                  Create your universe →
                </Link>
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
