"use client";

import * as SwitchPrimitives from "@radix-ui/react-switch";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

interface SwitchProps extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  label?: string;
  labelPosition?: "left" | "right";
}

const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, label, labelPosition = "right", id, ...props }, ref) => {
  const switchId = id || label?.toLowerCase().replace(/\s+/g, "-");

  const switchEl = (
    <SwitchPrimitives.Root
      ref={ref}
      id={switchId}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform duration-fast data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  );

  if (label) {
    return (
      <div
        className={cn(
          "flex items-center gap-2",
          labelPosition === "left" ? "flex-row" : "flex-row-reverse"
        )}
      >
        {switchEl}
        <label
          htmlFor={switchId}
          className="text-body cursor-pointer select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        >
          {label}
        </label>
      </div>
    );
  }

  return switchEl;
});
Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
