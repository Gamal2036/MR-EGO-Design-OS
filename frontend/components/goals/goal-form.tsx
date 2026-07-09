"use client";

import { X } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/forms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/forms/select";
import { Textarea } from "@/components/forms/textarea";
import { Button } from "@/components/foundation/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/foundation/card";
import { cn } from "@/lib/utils";
import type { SmartGoal, SmartGoalPriority, SmartGoalType } from "@/types/smart-goal";

export interface GoalFormProps {
  goal?: SmartGoal | null;
  className?: string;
  onClose?: () => void;
  onSubmit?: (goal: Partial<SmartGoal>) => void;
}

const goalTypes: SmartGoalType[] = [
  "career",
  "learning",
  "certification",
  "job_search",
  "language",
  "interview",
  "salary",
  "personal",
  "custom",
];

const priorities: SmartGoalPriority[] = ["low", "medium", "high", "critical"];

const difficultyOptions = ["beginner", "intermediate", "advanced", "expert"];

export function GoalForm({ goal, className, onClose, onSubmit }: GoalFormProps) {
  const [formData, setFormData] = useState<Partial<SmartGoal>>({
    title: goal?.title ?? "",
    description: goal?.description ?? "",
    type: goal?.type ?? "career",
    category: goal?.category ?? "",
    priority: goal?.priority ?? "medium",
    difficulty: goal?.difficulty ?? "beginner",
    estimatedDurationWeeks: goal?.estimatedDurationWeeks ?? 12,
    deadline: goal?.deadline ? new Date(goal.deadline).toISOString().split("T")[0] : "",
    tags: goal?.tags ?? [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deadline = formData.deadline ? new Date(formData.deadline).toISOString() : new Date().toISOString();
    onSubmit?.({
      ...formData,
      deadline,
    });
  };

  return (
    <Card className={cn("mx-auto w-full max-w-2xl", className)}>
      <CardHeader
        action={
          onClose && (
            <Button variant="ghost" size="xs" onClick={onClose} aria-label="Close form">
              <X className="h-4 w-4" />
            </Button>
          )
        }
      >
        <CardTitle>{goal ? "Edit Goal" : "Create New Goal"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-caption font-medium text-secondary" htmlFor="title">Title</label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g. Become SOC Analyst"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-caption font-medium text-secondary" htmlFor="description">Description</label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="What do you want to achieve and why?"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="type">Goal Type</label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as SmartGoalType })}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {goalTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="category">Category</label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. Cybersecurity"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="priority">Priority</label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData({ ...formData, priority: value as SmartGoalPriority })}
              >
                <SelectTrigger id="priority">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="difficulty">Difficulty</label>
              <Select
                value={formData.difficulty}
                onValueChange={(value) =>
                  setFormData({ ...formData, difficulty: value as SmartGoal["difficulty"] })
                }
              >
                <SelectTrigger id="difficulty">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficultyOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="duration">Estimated Duration (weeks)</label>
              <Input
                id="duration"
                type="number"
                min={1}
                value={formData.estimatedDurationWeeks}
                onChange={(e) =>
                  setFormData({ ...formData, estimatedDurationWeeks: parseInt(e.target.value, 10) || 1 })
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-caption font-medium text-secondary" htmlFor="deadline">Deadline</label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            {goal ? "Save Changes" : "Create Goal"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
