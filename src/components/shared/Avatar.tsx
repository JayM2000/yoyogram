import { cn } from "@/lib/utils";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Show gradient ring around avatar */
  ring?: boolean;
  /** Show online indicator */
  online?: boolean;
  className?: string;
}

const sizeMap = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-14 h-14",
  xl: "w-20 h-20",
};

const ringPadding = {
  xs: "p-[1.5px]",
  sm: "p-[2px]",
  md: "p-[2px]",
  lg: "p-[2.5px]",
  xl: "p-[3px]",
};

const onlineDot = {
  xs: "w-1.5 h-1.5 border",
  sm: "w-2 h-2 border",
  md: "w-2.5 h-2.5 border-2",
  lg: "w-3 h-3 border-2",
  xl: "w-4 h-4 border-2",
};

export function Avatar({
  src,
  alt = "Avatar",
  size = "md",
  ring = false,
  online,
  className,
}: AvatarProps) {
  const initials = alt
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarContent = (
    <div
      className={cn(
        sizeMap[size],
        "rounded-full overflow-hidden bg-dark-muted dark:bg-dark-muted light:bg-light-muted",
        "flex items-center justify-center shrink-0",
        !ring && className
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        <span className="text-xs font-semibold text-white/60">{initials}</span>
      )}
    </div>
  );

  if (ring) {
    return (
      <div className={cn("relative inline-block", className)}>
        <div
          className={cn(
            "rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-orange-500",
            ringPadding[size]
          )}
        >
          <div className="rounded-full bg-dark-base dark:bg-dark-base light:bg-light-base p-[1.5px]">
            {avatarContent}
          </div>
        </div>
        {online !== undefined && (
          <span
            className={cn(
              "absolute bottom-0 right-0 rounded-full",
              "border-dark-base dark:border-dark-base",
              online ? "bg-green-500" : "bg-gray-500",
              onlineDot[size]
            )}
          />
        )}
      </div>
    );
  }

  return (
    <div className={cn("relative inline-block", className)}>
      {avatarContent}
      {online !== undefined && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full",
            "border-dark-base dark:border-dark-base",
            online ? "bg-green-500" : "bg-gray-500",
            onlineDot[size]
          )}
        />
      )}
    </div>
  );
}
