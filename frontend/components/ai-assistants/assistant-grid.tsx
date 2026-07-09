"use client";

import { AssistantCard } from "./assistant-card";

import { useAssistantStore } from "@/stores/assistant-store";

export function AssistantGrid() {
  const assistants = useAssistantStore((s) => s.filteredAssistants());
  const activeAssistantId = useAssistantStore((s) => s.activeAssistantId);
  const setActiveAssistant = useAssistantStore((s) => s.setActiveAssistant);
  const toggleFavorite = useAssistantStore((s) => s.toggleFavorite);
  const togglePinned = useAssistantStore((s) => s.togglePinned);

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3"
      role="list"
      aria-label="Assistant grid"
    >
      {assistants.map((assistant) => (
        <div key={assistant.id} role="listitem">
          <AssistantCard
            assistant={assistant}
            active={assistant.id === activeAssistantId}
            onSelect={setActiveAssistant}
            onToggleFavorite={toggleFavorite}
            onTogglePinned={togglePinned}
          />
        </div>
      ))}
    </div>
  );
}
