"use client";

export function LearningLoadingState({ message = "Loading Learning Center..." }: { message?: string }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      role="status"
      aria-label={message}
    >
      <div className="mb-4 flex items-center gap-1">
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "0ms" }} />
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "150ms" }} />
        <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-primary" style={{ animationDelay: "300ms" }} />
      </div>
      <p className="text-body-small text-tertiary">{message}</p>
    </div>
  );
}
