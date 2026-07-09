"use client";

import { Bot, Briefcase, GraduationCap, HeadphonesIcon, Shield, User } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const roleIconMap = {
  user: User,
  ai: Bot,
  recruiter: Briefcase,
  career_coach: GraduationCap,
  support: HeadphonesIcon,
  system: Shield,
};

const roleBgMap = {
  user: "bg-primary/10 text-primary",
  ai: "bg-ai/10 text-ai",
  recruiter: "bg-job/10 text-job",
  career_coach: "bg-cv/10 text-cv",
  support: "bg-info/10 text-info",
  system: "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300",
};

interface MessageAvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  initials?: string;
  role: "user" | "ai" | "recruiter" | "career_coach" | "support" | "system";
  name: string;
  size?: "sm" | "md";
  online?: boolean;
}

const MessageAvatar = forwardRef<HTMLDivElement, MessageAvatarProps>(
  ({ className, src, initials, role, name, size = "sm", online, ...props }, ref) => {
    const Icon = roleIconMap[role];
    const sizeClass = size === "sm" ? "h-8 w-8" : "h-10 w-10";
    const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";

    return (
      <div ref={ref} className={cn("relative shrink-0", className)} {...props}>
        {src ? (
          <div className={cn("overflow-hidden rounded-full", sizeClass)}>
            <img src={src} alt={name} className="h-full w-full object-cover" />
          </div>
        ) : initials ? (
          <div
            className={cn(
              "flex items-center justify-center rounded-full font-semibold",
              sizeClass,
              "bg-neutral-200 text-neutral-600 dark:bg-neutral-700 dark:text-neutral-400",
              "text-smallest",
            )}
            aria-hidden="true"
          >
            {initials}
          </div>
        ) : (
          <div
            className={cn(
              "flex items-center justify-center rounded-full",
              sizeClass,
              roleBgMap[role],
            )}
            aria-hidden="true"
          >
            <Icon className={iconSize} />
          </div>
        )}
        {online !== undefined && (
          <span
            className={cn(
              "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background",
              online ? "bg-success" : "bg-neutral-400",
            )}
            role="status"
            aria-label={online ? `${name} is online` : `${name} is offline`}
          />
        )}
      </div>
    );
  },
);
MessageAvatar.displayName = "MessageAvatar";

export { MessageAvatar, roleBgMap, roleIconMap };
export type { MessageAvatarProps };
