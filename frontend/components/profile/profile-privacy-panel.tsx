"use client";

import { Download, Eye, EyeOff, Shield, Share2 } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Switch } from "@/components/forms/switch";
import { Button } from "@/components/foundation/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { ProfilePreferences } from "@/types/profile";

interface ProfilePrivacyPanelProps extends HTMLAttributes<HTMLDivElement> {
  preferences: ProfilePreferences;
  isEditing?: boolean;
  onUpdate?: (prefs: Partial<ProfilePreferences>) => void;
}

const ProfilePrivacyPanel = forwardRef<HTMLDivElement, ProfilePrivacyPanelProps>(
  ({ className, preferences, isEditing, onUpdate, ...props }, ref) => {
    const controls = [
      {
        key: "publicProfile" as const,
        label: "Public Profile",
        description: "Allow others to view your public profile",
        icon: Eye,
      },
      {
        key: "recruiterVisibility" as const,
        label: "Recruiter Visibility",
        description: "Make your profile visible to recruiters",
        icon: EyeOff,
      },
      {
        key: "dataSharing" as const,
        label: "Data Sharing",
        description: "Share anonymized data for better AI recommendations",
        icon: Share2,
      },
    ];

    return (
      <Card
        ref={ref}
        variant="default"
        padding="md"
        className={cn("", className)}
        role="region"
        aria-label="Privacy and Visibility"
        {...props}
      >
        <CardHeader>
          <CardTitle>Privacy & Visibility</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 rounded-lg bg-cyan-500/5 border border-cyan-500/20 p-3">
              <Shield className="h-5 w-5 text-cyan shrink-0" aria-hidden="true" />
              <p className="text-body-small text-secondary">
                Control how your profile is shared and who can see it.
              </p>
            </div>

            <div className="space-y-3">
              {controls.map((control) => {
                const Icon = control.icon;
                return (
                  <div
                    key={control.key}
                    className="flex items-start justify-between gap-3 rounded-lg border border-border bg-surface-0 p-3"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Icon className="h-4 w-4 text-tertiary mt-0.5 shrink-0" aria-hidden="true" />
                      <div className="min-w-0">
                        <p className="text-body-small font-medium text-primary">{control.label}</p>
                        <p className="text-smallest text-tertiary">{control.description}</p>
                      </div>
                    </div>
                    {isEditing ? (
                      <Switch
                        checked={preferences[control.key]}
                        onCheckedChange={(checked) =>
                          onUpdate?.({ [control.key]: checked })
                        }
                        aria-label={control.label}
                        className="shrink-0"
                      />
                    ) : (
                      <span
                        className={cn(
                          "shrink-0 text-smallest font-medium rounded-full px-2 py-0.5",
                          preferences[control.key]
                            ? "bg-success/10 text-success"
                            : "bg-neutral-100 text-tertiary dark:bg-neutral-800"
                        )}
                      >
                        {preferences[control.key] ? "On" : "Off"}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-3">
              <Button
                variant="outline"
                size="sm"
                disabled
                title="Coming Soon"
                className="w-full"
                leftIcon={<Download className="h-4 w-4" />}
              >
                Export Profile Data
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProfilePrivacyPanel.displayName = "ProfilePrivacyPanel";

export { ProfilePrivacyPanel };
export type { ProfilePrivacyPanelProps };
