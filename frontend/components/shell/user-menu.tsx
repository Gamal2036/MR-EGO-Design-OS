"use client";

import { HelpCircle, Keyboard, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { type HTMLAttributes, useCallback, useEffect, useRef, useState } from "react";

import { Avatar } from "@/components/foundation/avatar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

export function UserMenuShell() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
    router.push("/");
  }, [logout, router]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        className="flex items-center gap-2 rounded-lg p-1 transition-colors duration-fast hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="User menu"
      >
        <Avatar size="sm" initials={user ? user.username.slice(0, 2).toUpperCase() : "EG"} alt="User avatar" />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute right-0 top-full mt-2 w-56 origin-top-right rounded-xl border border-border bg-popover p-1 shadow-dropdown animate-scale-in",
            "z-popover",
          )}
          role="menu"
          aria-label="User options"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="text-body-small font-medium text-foreground">{user?.username ?? "User"}</p>
            <p className="text-caption text-tertiary">{user?.email ?? "user@example.com"}</p>
          </div>

          <div className="py-1" role="none">
            <MenuItem icon={User} label="Profile" onClick={() => { router.push("/dashboard/profile"); setIsOpen(false); }} />
            <MenuItem icon={Settings} label="Settings" onClick={() => { router.push("/dashboard/settings"); setIsOpen(false); }} />
            <MenuItem icon={Keyboard} label="Keyboard shortcuts" />
            <MenuItem icon={HelpCircle} label="Help & support" />
          </div>

          <div className="border-t border-border pt-1" role="none">
            <MenuItem icon={LogOut} label="Sign out" variant="danger" onClick={handleLogout} />
          </div>
        </div>
      )}
    </div>
  );
}

interface MenuItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ElementType;
  label: string;
  variant?: "default" | "danger";
}

function MenuItem({
  icon: Icon,
  label,
  variant = "default",
  className,
  ...props
}: MenuItemProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-body-small transition-colors duration-fast",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
        variant === "default" &&
          "text-foreground hover:bg-accent hover:text-accent-foreground",
        variant === "danger" && "text-danger hover:bg-danger/10",
        className,
      )}
      role="menuitem"
      {...props}
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  );
}
