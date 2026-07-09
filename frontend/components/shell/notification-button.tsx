"use client";

import { Bell } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/foundation/badge";
import { IconButton } from "@/components/foundation/icon-button";

export function NotificationButton() {
  return (
    <div className="relative">
      <Link href="/dashboard/notifications" aria-label="Open notifications">
        <IconButton
          icon={Bell}
          variant="ghost"
          size="md"
          label="Open notifications"
        />
      </Link>
      <Badge
        variant="danger"
        size="xs"
        className="absolute -right-0.5 -top-0.5 min-w-[18px] px-1 pointer-events-none"
      >
        3
      </Badge>
    </div>
  );
}
