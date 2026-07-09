"use client";

import { type HTMLAttributes, type ReactNode, createContext, forwardRef, useContext, useId } from "react";

import { cn } from "@/lib/utils";

interface FormFieldContextValue {
  id: string;
  name?: string;
  hasError?: boolean;
  errorId?: string;
  descriptionId?: string;
}

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

interface FormFieldProps {
  children: ReactNode;
  name?: string;
  hasError?: boolean;
  className?: string;
}

function FormField({ children, name, hasError = false, className }: FormFieldProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const descriptionId = `${generatedId}-description`;

  return (
    <FormFieldContext.Provider value={{ id: generatedId, name, hasError, errorId, descriptionId }}>
      <div className={cn("space-y-1.5", className)}>
        {children}
      </div>
    </FormFieldContext.Provider>
  );
}
FormField.displayName = "FormField";

interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, required, children, ...props }, ref) => {
    const ctx = useContext(FormFieldContext);

    return (
      <label
        ref={ref}
        htmlFor={ctx?.id}
        className={cn(
          "text-label text-primary font-medium block",
          ctx?.hasError && "text-danger",
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-danger" aria-hidden="true">*</span>
        )}
      </label>
    );
  }
);
FormLabel.displayName = "FormLabel";

type FormDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ className, ...props }, ref) => {
    const ctx = useContext(FormFieldContext);

    return (
      <p
        ref={ref}
        id={ctx?.descriptionId}
        className={cn("text-caption text-tertiary", className)}
        {...props}
      />
    );
  }
);
FormDescription.displayName = "FormDescription";

type FormMessageProps = HTMLAttributes<HTMLParagraphElement>;

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useContext(FormFieldContext);
    const hasError = ctx?.hasError;

    if (!hasError && !children) return null;

    return (
      <p
        ref={ref}
        id={ctx?.errorId}
        className={cn("text-caption text-danger flex items-center gap-1", className)}
        role="alert"
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export { FormField, FormLabel, FormDescription, FormMessage, FormFieldContext };
export type { FormFieldProps, FormLabelProps, FormDescriptionProps, FormMessageProps };
