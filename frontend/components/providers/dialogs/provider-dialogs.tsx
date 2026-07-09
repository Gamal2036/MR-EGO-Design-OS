"use client";

import { AlertTriangle, Brain, RefreshCw, Trash2 } from "lucide-react";
import { forwardRef, type HTMLAttributes } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/feedback/dialog";
import { Button } from "@/components/foundation/button";
import { cn } from "@/lib/utils";
import type { ProviderConfig, ProviderId } from "@/types/ai-providers";

interface RemoveProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: ProviderConfig | null;
  onConfirm: (id: ProviderId) => void;
}

const RemoveProviderDialog = forwardRef<HTMLDivElement, RemoveProviderDialogProps>(
  ({ open, onOpenChange, provider, onConfirm }, ref) => {
    if (!provider) return null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="sm" ref={ref}>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-danger/10 mb-2">
              <Trash2 className="h-6 w-6 text-danger" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center">Remove Provider</DialogTitle>
            <DialogDescription className="text-center">
              Are you sure you want to remove <strong>{provider.name}</strong>?
              This action will clear all its settings and it cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onConfirm(provider.id);
                onOpenChange(false);
              }}
            >
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
RemoveProviderDialog.displayName = "RemoveProviderDialog";

interface ResetProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  provider: ProviderConfig | null;
  onConfirm: (id: ProviderId) => void;
}

const ResetProviderDialog = forwardRef<HTMLDivElement, ResetProviderDialogProps>(
  ({ open, onOpenChange, provider, onConfirm }, ref) => {
    if (!provider) return null;

    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="sm" ref={ref}>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-warning/10 mb-2">
              <RefreshCw className="h-6 w-6 text-warning" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center">Reset Provider</DialogTitle>
            <DialogDescription className="text-center">
              Reset <strong>{provider.name}</strong> to default settings?
              Your API key and configuration will be cleared.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                onConfirm(provider.id);
                onOpenChange(false);
              }}
            >
              Reset
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
ResetProviderDialog.displayName = "ResetProviderDialog";

interface AddProviderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableTypes: { id: string; name: string; description: string }[];
  onConfirm: (type: string) => void;
}

const AddProviderDialog = forwardRef<HTMLDivElement, AddProviderDialogProps>(
  ({ open, onOpenChange, availableTypes, onConfirm }, ref) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="md" ref={ref}>
          <DialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-2">
              <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center">Add Provider</DialogTitle>
            <DialogDescription className="text-center">
              Select a provider type to add to your workspace.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 max-h-60 overflow-y-auto" role="listbox" aria-label="Provider types">
            {availableTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left hover:bg-surface-2 hover:border-primary/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => {
                  onConfirm(type.id);
                  onOpenChange(false);
                }}
                role="option"
                aria-selected={false}
              >
                <div className="flex-1 min-w-0">
                  <span className="text-body font-medium text-primary block">{type.name}</span>
                  <span className="text-caption text-secondary">{type.description}</span>
                </div>
              </button>
            ))}
          </div>

          <DialogFooter className="justify-center">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  },
);
AddProviderDialog.displayName = "AddProviderDialog";

interface ConfirmationDialogProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  loading?: boolean;
}

const ConfirmationDialog = forwardRef<HTMLDivElement, ConfirmationDialogProps>(
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
      loading = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent size="sm" className={cn(className)} ref={ref} {...props}>
          <DialogHeader>
            <div
              className={cn(
                "mx-auto flex h-12 w-12 items-center justify-center rounded-full mb-2",
                variant === "destructive" ? "bg-danger/10" : "bg-warning/10",
              )}
            >
              <AlertTriangle
                className={cn(
                  "h-6 w-6",
                  variant === "destructive" ? "text-danger" : "text-warning",
                )}
              />
            </div>
            <DialogTitle className="text-center">{title}</DialogTitle>
            <DialogDescription className="text-center">{description}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="justify-center">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
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
  },
);
ConfirmationDialog.displayName = "ConfirmationDialog";

export { RemoveProviderDialog, ResetProviderDialog, AddProviderDialog, ConfirmationDialog };
export type {
  RemoveProviderDialogProps,
  ResetProviderDialogProps,
  AddProviderDialogProps,
  ConfirmationDialogProps,
};
