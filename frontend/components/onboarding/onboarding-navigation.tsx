"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";

interface OnboardingNavigationProps {
  onBack?: () => void;
  onContinue: () => void;
  backLabel?: string;
  continueLabel?: string;
  loading?: boolean;
  disabled?: boolean;
  hideBack?: boolean;
  className?: string;
}

export function OnboardingNavigation({
  onBack,
  onContinue,
  backLabel = "Back",
  continueLabel = "Continue",
  loading = false,
  disabled = false,
  hideBack = false,
  className,
}: OnboardingNavigationProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between pt-6 border-t border-border",
        className
      )}
    >
      <div>
        {!hideBack && onBack && (
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={onBack}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            {backLabel}
          </Button>
        )}
      </div>
      <Button
        type="button"
        variant="primary"
        size="lg"
        onClick={onContinue}
        loading={loading}
        disabled={disabled}
        rightIcon={!loading ? <ArrowRight className="h-4 w-4" /> : undefined}
      >
        {continueLabel}
      </Button>
    </div>
  );
}
