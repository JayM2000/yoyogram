"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child animation */
  staggerDelay?: number;
  /** Initial delay before animations start */
  delay?: number;
  once?: boolean;
}

const containerVariants = (staggerDelay: number, delay: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delay,
    },
  },
});

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      variants={containerVariants(staggerDelay, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

/** Wrap individual children in this to participate in stagger */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItemVariants} className={cn(className)}>
      {children}
    </motion.div>
  );
}
