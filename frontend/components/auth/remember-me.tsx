"use client";

import { Checkbox } from "@/components/forms/checkbox";

interface RememberMeProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  id?: string;
}

export function RememberMe({ checked, onCheckedChange, id }: RememberMeProps) {
  return (
    <div className="flex items-center justify-between">
      <Checkbox
        id={id ?? "remember-me"}
        label="Remember me"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
