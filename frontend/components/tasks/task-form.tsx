"use client";

import { X } from "lucide-react";
import {
  type FormEvent,
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type HTMLAttributes,
} from "react";

import {
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@/components/forms";
import { Button, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/task-store";
import type {
  Subtask,
  Task,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "@/types/task";

const defaultFormState = {
  title: "",
  description: "",
  status: "todo" as TaskStatus,
  priority: "medium" as TaskPriority,
  category: "custom" as TaskCategory,
  deadline: "",
  estimatedTime: 0,
  tags: [] as string[],
  notes: "",
  subtasks: [] as Subtask[],
};

interface TaskFormProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  onSuccess?: () => void;
}

const TaskForm = forwardRef<HTMLDivElement, TaskFormProps>(
  ({ className, onClose, onSuccess, ...props }, ref) => {
    const isFormOpen = useTasksStore((s) => s.isFormOpen);
    const editingTaskId = useTasksStore((s) => s.editingTaskId);
    const closeForm = useTasksStore((s) => s.closeForm);
    const addTask = useTasksStore((s) => s.addTask);
    const updateTask = useTasksStore((s) => s.updateTask);
    const tasks = useTasksStore((s) => s.tasks);

    const [form, setForm] = useState(defaultFormState);
    const [tagInput, setTagInput] = useState("");
    const [subtaskTitle, setSubtaskTitle] = useState("");

    const isEditing = !!editingTaskId;

    useEffect(() => {
      const id = editingTaskId;
      if (id) {
        const existing = tasks.find((t: Task) => t.id === id);
        if (existing) {
          setForm({
            title: existing.title,
            description: existing.description,
            status: existing.status,
            priority: existing.priority,
            category: existing.category,
            deadline: existing.deadline.split("T")[0] || "",
            estimatedTime: existing.estimatedTime,
            tags: [...existing.tags],
            notes: existing.notes,
            subtasks: existing.subtasks.map((st: Subtask) => ({ ...st })),
          });
        }
      } else {
        setForm(defaultFormState);
      }
    }, [editingTaskId, tasks]);

    const handleClose = useCallback(() => {
      closeForm();
      onClose?.();
    }, [closeForm, onClose]);

    const handleSubmit = useCallback(
      (e: FormEvent) => {
        e.preventDefault();
        if (!form.title.trim()) return;

        if (isEditing && editingTaskId) {
          updateTask(editingTaskId, {
            title: form.title,
            description: form.description,
            status: form.status,
            priority: form.priority,
            category: form.category,
            deadline: new Date(form.deadline).toISOString(),
            estimatedTime: form.estimatedTime,
            tags: form.tags,
            notes: form.notes,
            subtasks: form.subtasks,
          });
        } else {
          const newTask: Task = {
            id: "",
            title: form.title,
            description: form.description,
            status: form.status,
            priority: form.priority,
            category: form.category,
            deadline: new Date(form.deadline).toISOString(),
            estimatedTime: form.estimatedTime,
            actualTime: 0,
            progress: 0,
            pinned: false,
            isAISuggested: false,
            tags: form.tags,
            notes: form.notes,
            subtasks: form.subtasks,
            reminder: null,
            createdAt: "",
            updatedAt: "",
          };
          addTask(newTask);
        }

        handleClose();
        onSuccess?.();
      },
      [form, isEditing, editingTaskId, addTask, updateTask, handleClose, onSuccess],
    );

    const addTag = useCallback(() => {
      const tag = tagInput.trim().toLowerCase();
      if (tag && !form.tags.includes(tag)) {
        setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
      }
      setTagInput("");
    }, [tagInput, form.tags]);

    const removeTag = useCallback((tag: string) => {
      setForm((f) => ({ ...f, tags: f.tags.filter((t: string) => t !== tag) }));
    }, []);

    const addSubtask = useCallback(() => {
      const title = subtaskTitle.trim();
      if (title) {
        setForm((f) => ({
          ...f,
          subtasks: [
            ...f.subtasks,
            { id: `st-${Date.now()}`, title, done: false },
          ],
        }));
        setSubtaskTitle("");
      }
    }, [subtaskTitle]);

    const removeSubtask = useCallback((id: string) => {
      setForm((f) => ({
        ...f,
        subtasks: f.subtasks.filter((s: Subtask) => s.id !== id),
      }));
    }, []);

    if (!isFormOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        role="dialog"
        aria-modal="true"
        aria-label={isEditing ? "Edit task" : "Create task"}
        onClick={handleClose}
      >
        <div
          ref={ref}
          className={cn(
            "w-full max-w-lg rounded-xl border border-border bg-background shadow-strong",
            "max-h-[90vh] flex flex-col",
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h2 className="text-heading-4 text-primary font-semibold">
              {isEditing ? "Edit Task" : "New Task"}
            </h2>
            <IconButton
              icon={X}
              label="Close form"
              variant="ghost"
              size="sm"
              onClick={handleClose}
            />
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="task-title" className="text-label text-secondary">Title</label>
              <Input
                id="task-title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Enter task title"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="task-desc" className="text-label text-secondary">Description</label>
              <Textarea
                id="task-desc"
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="task-status" className="text-label text-secondary">Status</label>
                <Select
                  value={form.status}
                  onValueChange={(value: string) => setForm((f) => ({ ...f, status: value as TaskStatus }))}
                >
                  <SelectTrigger id="task-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="task-priority" className="text-label text-secondary">Priority</label>
                <Select
                  value={form.priority}
                  onValueChange={(value: string) => setForm((f) => ({ ...f, priority: value as TaskPriority }))}
                >
                  <SelectTrigger id="task-priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="task-category" className="text-label text-secondary">Category</label>
                <Select
                  value={form.category}
                  onValueChange={(value: string) => setForm((f) => ({ ...f, category: value as TaskCategory }))}
                >
                  <SelectTrigger id="task-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="career">Career</SelectItem>
                    <SelectItem value="learning">Learning</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="task-deadline" className="text-label text-secondary">Deadline</label>
                <Input
                  id="task-deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="task-estimate" className="text-label text-secondary">
                Estimated Time (minutes)
              </label>
              <Input
                id="task-estimate"
                type="number"
                min={0}
                value={form.estimatedTime || ""}
                onChange={(e) => setForm((f) => ({ ...f, estimatedTime: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="task-tags" className="text-label text-secondary">Tags</label>
              <div className="flex gap-2">
                <Input
                  id="task-tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Type and press Add"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                />
                <Button type="button" variant="outline" size="sm" onClick={addTag}>
                  Add
                </Button>
              </div>
              {form.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-surface-2 px-2.5 py-0.5 text-caption text-secondary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-foreground"
                        aria-label={`Remove tag ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="task-notes" className="text-label text-secondary">Notes</label>
              <Textarea
                id="task-notes"
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Additional notes"
                rows={2}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-label text-secondary">Subtasks</label>
              <div className="flex gap-2">
                <Input
                  value={subtaskTitle}
                  onChange={(e) => setSubtaskTitle(e.target.value)}
                  placeholder="Subtask title"
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSubtask(); } }}
                />
                <Button type="button" variant="outline" size="sm" onClick={addSubtask}>
                  Add
                </Button>
              </div>
              {form.subtasks.length > 0 && (
                <div className="space-y-1 mt-2">
                  {form.subtasks.map((st: Subtask) => (
                    <div key={st.id} className="flex items-center gap-2 rounded-lg bg-surface-1 px-3 py-2">
                      <Checkbox checked={st.done} disabled />
                      <span className="flex-1 text-body-small text-secondary">{st.title}</span>
                      <button
                        type="button"
                        onClick={() => removeSubtask(st.id)}
                        className="text-tertiary hover:text-danger"
                        aria-label={`Remove subtask: ${st.title}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <div className="flex items-center justify-end gap-3 border-t border-border px-5 py-4">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              {isEditing ? "Save Changes" : "Create Task"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
);
TaskForm.displayName = "TaskForm";

export { TaskForm };
export type { TaskFormProps };
