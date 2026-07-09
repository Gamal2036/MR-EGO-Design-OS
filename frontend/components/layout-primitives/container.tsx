"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-5 md:px-7 lg:px-8", {
  variants: {
    size: {
      sm: "max-w-container-sm",
      md: "max-w-container-md",
      lg: "max-w-container-lg",
      xl: "max-w-container-xl",
      "2xl": "max-w-container-2xl",
      full: "max-w-full",
    },
  },
  defaultVariants: {
    size: "xl",
  },
});

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, className }))}
        {...props}
      />
    );
  }
);
Container.displayName = "Container";

export { Container, containerVariants };
export type { ContainerProps };
