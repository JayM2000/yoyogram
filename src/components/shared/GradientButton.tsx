"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ComponentProps } from "react";

type MotionButtonProps = ComponentProps<typeof motion.button>;

interface GradientButtonProps extends MotionButtonProps {
  children: React.ReactNode;
  className?: string;
  /** Show loading spinner */
  loading?: boolean;
  /** Button size variant */
  size?: "sm" | "md" | "lg";
}

export function GradientButton({
  children,
  className,
  loading = false,
  size = "md",
  disabled,
  ...props
}: GradientButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 25px rgba(168, 85, 247, 0.5)",
      }}
      whileTap={{ scale: 0.97 }}
      disabled={disabled || loading}
      className={cn(
        "relative overflow-hidden",
        "bg-gradient-to-r from-brand-purple-600 to-brand-orange-500",
        "text-white font-semibold rounded-xl w-full",
        "transition-opacity disabled:opacity-50 disabled:cursor-not-allowed",
        "cursor-pointer",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {/* Shimmer sweep on hover */}
      <span
        className={cn(
          "absolute inset-0 -translate-x-full",
          "bg-gradient-to-r from-transparent via-white/20 to-transparent",
          "transition-transform duration-700 ease-in-out",
          "group-hover:translate-x-full"
        )}
        aria-hidden
      />
      <span className="relative flex items-center justify-center gap-2">
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </span>
    </motion.button>
  );
}
