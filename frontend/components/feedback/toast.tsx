"use client";

import { type ComponentProps, type ReactNode } from "react";
import { toast, Toaster as SonnerToaster } from "sonner";

import { cn } from "@/lib/utils";

type ToasterProps = ComponentProps<typeof SonnerToaster>;

const ToastProvider = ({
  className,
  ...props
}: ToasterProps) => {
  return (
    <SonnerToaster
      className={cn("toaster group", className)}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  );
};

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  title?: string;
  description?: string;
  action?: ToastAction;
  duration?: number;
  icon?: ReactNode;
}

function showToast(message: string, options?: ToastOptions) {
  return toast(message, {
    description: options?.description,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
    duration: options?.duration,
    icon: options?.icon,
  });
}

function showSuccessToast(message: string, options?: ToastOptions) {
  return toast.success(message, {
    description: options?.description,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
    duration: options?.duration,
  });
}

function showErrorToast(message: string, options?: ToastOptions) {
  return toast.error(message, {
    description: options?.description,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
    duration: options?.duration,
  });
}

export {
  ToastProvider,
  showToast,
  showSuccessToast,
  showErrorToast,
};
export type { ToasterProps, ToastOptions, ToastAction };
