"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, motion } from "motion/react";

interface AnimatedCounterProps {
  value: number;
  className?: string;
  /** Format large numbers (e.g., 1.2K, 3.4M) */
  compact?: boolean;
}

function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

export function AnimatedCounter({
  value,
  className,
  compact = false,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  useEffect(() => {
    motionVal.set(value);
  }, [value, motionVal]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) {
        const rounded = Math.round(latest);
        ref.current.textContent = compact
          ? formatCompact(rounded)
          : rounded.toLocaleString();
      }
    });
    return unsubscribe;
  }, [spring, compact]);

  return <span ref={ref} className={className} />;
}
