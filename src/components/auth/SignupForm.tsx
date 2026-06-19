"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { GradientText } from "@/components/shared/GradientText";
import { GradientButton } from "@/components/shared/GradientButton";

const interests = [
  "Photography", "Art", "Music", "Travel", "Food", "Fashion",
  "Fitness", "Tech", "Gaming", "Design", "Movies", "Nature",
  "Science", "Books", "Comedy", "Sports", "Dance", "Crypto",
  "AI / ML", "Startups",
];

const steps = ["Identity", "Secure It", "Your Vibe", "Your Face", "Launch"];

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{
              scale: i === current ? 1.2 : 1,
              backgroundColor:
                i < current
                  ? "#a855f7"
                  : i === current
                  ? "#f97316"
                  : "#2a2a40",
            }}
            className="w-3 h-3 rounded-full"
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
          {i < total - 1 && (
            <motion.div
              animate={{
                backgroundColor: i < current ? "#a855f7" : "#2a2a40",
                scaleX: i < current ? 1 : 0.5,
              }}
              className="w-8 h-0.5 origin-left"
              transition={{ duration: 0.3 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function SignupForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    interests: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };
  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4); // Go to celebration
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">
                <GradientText>Choose Your Identity</GradientText>
              </h2>
              <p className="text-sm text-gray-400">This is how others will find you</p>
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-purple-400 text-sm font-mono">@</span>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => updateField("username", e.target.value.toLowerCase().replace(/[^a-z0-9._]/g, ""))}
                placeholder="username"
                className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border focus:border-brand-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm outline-none"
                maxLength={30}
              />
            </div>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) => updateField("displayName", e.target.value)}
              placeholder="Display name"
              className="w-full px-4 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border focus:border-brand-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm outline-none"
              maxLength={50}
            />
            <GradientButton
              onClick={nextStep}
              disabled={!formData.username || !formData.displayName}
            >
              Continue
            </GradientButton>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">
                <GradientText>Secure Your Account</GradientText>
              </h2>
              <p className="text-sm text-gray-400">We&apos;ll keep your data safe</p>
            </div>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border focus:border-brand-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm outline-none"
            />
            <input
              type="password"
              value={formData.password}
              onChange={(e) => updateField("password", e.target.value)}
              placeholder="Create a password"
              className="w-full px-4 py-3.5 rounded-xl bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border focus:border-brand-purple-500 focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm outline-none"
            />
            {formData.password && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-1"
              >
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        formData.password.length >= level * 3
                          ? level <= 2
                            ? "bg-red-500"
                            : level === 3
                            ? "bg-yellow-500"
                            : "bg-green-500"
                          : "bg-dark-muted"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {formData.password.length < 6
                    ? "Too short"
                    : formData.password.length < 10
                    ? "Getting better"
                    : "Strong password! 💪"}
                </p>
              </motion.div>
            )}
            <GradientButton
              onClick={nextStep}
              disabled={!formData.email || formData.password.length < 6}
            >
              Continue
            </GradientButton>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">
                <GradientText>What&apos;s Your Vibe?</GradientText>
              </h2>
              <p className="text-sm text-gray-400">
                Select 3+ interests to personalize your feed
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center">
              {interests.map((interest) => {
                const selected = formData.interests.includes(interest);
                return (
                  <motion.button
                    key={interest}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleInterest(interest)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                      selected
                        ? "bg-gradient-to-r from-brand-purple-600 to-brand-orange-500 text-white shadow-lg shadow-brand-purple-500/20"
                        : "bg-dark-surface dark:bg-dark-surface light:bg-light-surface border border-dark-border dark:border-dark-border light:border-light-border text-gray-400 hover:border-brand-purple-500/50"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block mr-1"
                      >
                        ✓
                      </motion.span>
                    )}
                    {interest}
                  </motion.button>
                );
              })}
            </div>
            <div className="text-center text-xs text-gray-500">
              {formData.interests.length} / 3 minimum selected
            </div>
            <GradientButton
              onClick={nextStep}
              disabled={formData.interests.length < 3}
            >
              Continue
            </GradientButton>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-1">
                <GradientText>Show Your Face</GradientText>
              </h2>
              <p className="text-sm text-gray-400">
                Add a profile photo (you can skip for now)
              </p>
            </div>
            {/* Avatar upload area */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple-600/20 to-brand-orange-500/20 border-2 border-dashed border-brand-purple-500/40 flex items-center justify-center cursor-pointer hover:border-brand-purple-500 transition-colors"
              >
                <div className="text-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto text-brand-purple-400 mb-1">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-xs text-gray-500">Upload</span>
                </div>
              </motion.div>
            </div>
            <GradientButton onClick={handleSubmit} loading={loading}>
              Create My Universe
            </GradientButton>
            <button
              onClick={handleSubmit}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-300 transition-colors cursor-pointer"
            >
              Skip for now
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6 py-4">
            {/* Confetti-like celebration particles */}
            <div className="relative">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0.5],
                    x: Math.cos((i * 30 * Math.PI) / 180) * 80,
                    y: Math.sin((i * 30 * Math.PI) / 180) * 80,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}
                  className={`absolute left-1/2 top-1/2 w-2.5 h-2.5 rounded-full ${
                    i % 3 === 0
                      ? "bg-brand-purple-500"
                      : i % 3 === 1
                      ? "bg-brand-orange-500"
                      : "bg-brand-purple-400"
                  }`}
                />
              ))}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-purple-600 to-brand-orange-500 flex items-center justify-center shadow-xl"
              >
                <span className="text-3xl">🎉</span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-2">
                <GradientText>Welcome to Aura!</GradientText>
              </h2>
              <p className="text-gray-400">
                Your universe is ready,{" "}
                <span className="text-brand-purple-400 font-semibold">
                  @{formData.username || "explorer"}
                </span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link href="/">
                <GradientButton>Enter Your Universe</GradientButton>
              </Link>
            </motion.div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-grid opacity-30" />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
        style={{
          background: "conic-gradient(from 0deg, rgba(168,85,247,0.05), rgba(249,115,22,0.05), rgba(168,85,247,0.05))",
        }}
      />

      {/* Form */}
      <div className="relative z-10 w-full max-w-md">
        {/* Back button + step info */}
        <div className="flex items-center justify-between mb-4">
          {step > 0 && step < 4 ? (
            <motion.button
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevStep}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back
            </motion.button>
          ) : (
            <div />
          )}
          {step < 4 && (
            <span className="text-xs text-gray-500">
              Step {step + 1} of {steps.length - 1}
            </span>
          )}
        </div>

        {step < 4 && <StepIndicator current={step} total={steps.length - 1} />}

        {/* Glass card */}
        <div className="backdrop-blur-2xl bg-white/[0.04] dark:bg-white/[0.04] light:bg-white/80 border border-brand-purple-500/20 rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Login link */}
        {step < 4 && (
          <p className="text-center mt-6 text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-brand-purple-400 hover:text-brand-purple-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
