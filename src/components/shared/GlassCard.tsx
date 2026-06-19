import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  /** Add animated gradient border on hover */
  hoverGlow?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverGlow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "backdrop-blur-xl rounded-2xl shadow-xl",
        "bg-white/5 dark:bg-white/[0.03]",
        "border border-white/10 dark:border-white/[0.08]",
        "light:bg-light-card light:border-light-border",
        hoverGlow &&
          "transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
