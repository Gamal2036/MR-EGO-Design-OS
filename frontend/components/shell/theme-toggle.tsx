"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { IconButton } from "@/components/foundation/icon-button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10" aria-hidden="true" />
    );
  }

  const nextTheme = theme === "dark" ? "light" : theme === "light" ? "system" : "dark";
  const icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  const label = `Current theme: ${theme}. Click to switch to ${nextTheme}.`;

  return (
    <IconButton
      icon={icon}
      variant="ghost"
      size="md"
      label={label}
      onClick={() => setTheme(nextTheme)}
    />
  );
}
