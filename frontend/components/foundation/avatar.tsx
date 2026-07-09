"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { User } from "lucide-react";
import { type HTMLAttributes, forwardRef, useState } from "react";

import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 font-semibold shrink-0",
  {
    variants: {
      size: {
        xs: "h-avatar-xs w-avatar-xs text-smallest",
        sm: "h-avatar-sm w-avatar-sm text-caption",
        md: "h-avatar-md w-avatar-md text-body-small",
        lg: "h-avatar-lg w-avatar-lg text-body",
        xl: "h-avatar-xl w-avatar-xl text-heading-4",
        "2xl": "h-avatar-2xl w-avatar-2xl text-heading-3",
      },
      variant: {
        circular: "rounded-full",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "circular",
    },
  }
);

interface AvatarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  initials?: string;
  fallback?: string;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, src, alt = "", initials, fallback, ...props }, ref) => {
    const [imgError, setImgError] = useState(false);
    const hasImage = src && !imgError;

    return (
      <div
        ref={ref}
        className={cn(avatarVariants({ size, variant, className }))}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
        {...props}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : initials ? (
          <span aria-hidden="true">{initials}</span>
        ) : fallback ? (
          <span aria-hidden="true">{fallback}</span>
        ) : (
          <User className="h-1/2 w-1/2" aria-hidden="true" />
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
}

const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, max = 4, size, ...props }, ref) => {
    const items = Array.isArray(children) ? children : [children];
    const visible = items.slice(0, max);
    const remaining = items.length - max;

    return (
      <div
        ref={ref}
        className={cn("flex -space-x-2", className)}
        {...props}
      >
        {visible.map((child, index) => (
          <div key={index} className="ring-2 ring-background rounded-full">
            {child}
          </div>
        ))}
        {remaining > 0 && (
          <div
            className={cn(
              avatarVariants({ size, variant: "circular" }),
              "ring-2 ring-background bg-neutral-300 dark:bg-neutral-600"
            )}
            aria-label={`${remaining} more`}
          >
            <span className="text-smallest font-medium">+{remaining}</span>
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
export type { AvatarProps, AvatarGroupProps };
