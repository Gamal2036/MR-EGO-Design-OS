"use client";

import { AlertTriangle } from "lucide-react";
import { type HTMLAttributes, forwardRef } from "react";

import { Button } from "../foundation/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

import { cn } from "@/lib/utils";

interface ConfirmDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel?: () => void;
  loading?: boolean;
}

const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      confirmLabel = "Confirm",
      cancelLabel = "Cancel",
      variant = "default",
      onConfirm,
      onCancel,
      loading = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="sm" className={cn(className)} ref={ref} {...props}>
          <DialogHeader>
            <div
              className={cn(
                "mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-2",
                variant === "destructive"
                  ? "bg-danger/10"
                  : "bg-warning/10"
              )}
            >
              <AlertTriangle
                className={cn(
                  "h-6 w-6",
                  variant === "destructive"
                    ? "text-danger"
                    : "text-warning"
                )}
              />
            </div>
            <DialogTitle className="text-center">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-center">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button
              variant="outline"
              onClick={() => {
                onCancel?.();
                onOpenChange(false);
              }}
              disabled={loading}
            >
              {cancelLabel}
            </Button>
            <Button
              variant={variant === "destructive" ? "danger" : "primary"}
              onClick={onConfirm}
              loading={loading}
            >
              {confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);
ConfirmDialog.displayName = "ConfirmDialog";

export { ConfirmDialog };
export type { ConfirmDialogProps };
