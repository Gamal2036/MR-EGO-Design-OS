"use client";

import { Plus, Pencil, Trash2, Clock } from "lucide-react";
import { useState, type HTMLAttributes, type FormEvent } from "react";

import type { ApplicationNote } from "@/types/application-tracker";

interface ApplicationNotesPanelProps extends HTMLAttributes<HTMLDivElement> {
  notes: ApplicationNote[];
  onAdd: (content: string) => void;
  onUpdate: (noteId: string, content: string) => void;
  onDelete: (noteId: string) => void;
}

export function ApplicationNotesPanel({
  notes,
  onAdd,
  onUpdate,
  onDelete,
  className,
  ...props
}: ApplicationNotesPanelProps) {
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    onAdd(newNote.trim());
    setNewNote("");
  };

  const handleUpdate = (noteId: string) => {
    if (!editContent.trim()) return;
    onUpdate(noteId, editContent.trim());
    setEditingId(null);
    setEditContent("");
  };

  const startEdit = (note: ApplicationNote) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  return (
    <div className={`space-y-3 ${className || ""}`} {...props}>
      <h4 className="text-label text-primary">Notes</h4>

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
          className="flex-1 rounded-lg border border-border bg-surface-0 px-3 py-2 text-caption text-primary placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="New note content"
        />
        <button
          type="submit"
          disabled={!newNote.trim()}
          className="rounded-lg bg-primary px-3 py-2 text-caption text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
          aria-label="Add note"
        >
          <Plus className="h-4 w-4" />
        </button>
      </form>

      <div className="space-y-2" role="list" aria-label="Notes">
        {notes.length === 0 ? (
          <p className="text-caption text-tertiary text-center py-4">No notes yet</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group rounded-lg border border-border bg-surface-0 p-3"
              role="listitem"
            >
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-caption text-primary placeholder:text-tertiary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                    rows={3}
                    autoFocus
                    aria-label="Edit note content"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded px-2 py-1 text-caption text-secondary hover:text-primary transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleUpdate(note.id)}
                      className="rounded bg-primary px-3 py-1 text-caption text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-caption text-primary whitespace-pre-wrap">{note.content}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-smallest text-tertiary">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {note.updatedAt}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() => startEdit(note)}
                        className="text-tertiary hover:text-primary transition-colors"
                        aria-label="Edit note"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(note.id)}
                        className="text-tertiary hover:text-danger transition-colors"
                        aria-label="Delete note"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
