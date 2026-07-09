"use client";

import { useId, useState } from "react";

import { Chip } from "@/components/foundation/chip";
import { cn } from "@/lib/utils";

const SUGGESTED_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Project Management",
  "Data Analysis",
  "Product Design",
  "UI/UX",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "Agile",
  "Communication",
  "Leadership",
  "SQL",
];

interface SkillsSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export function SkillsSelector({
  value,
  onChange,
  className,
}: SkillsSelectorProps) {
  const formId = useId();
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInputValue("");
  };

  const removeSkill = (skill: string) => {
    onChange(value.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && value.length > 0) {
      removeSkill(value[value.length - 1]!);
    }
  };

  const suggestedFiltered = SUGGESTED_SKILLS.filter(
    (s) => !value.includes(s)
  );

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-lg border border-input bg-background transition-all duration-normal focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        {value.map((skill) => (
          <Chip
            key={skill}
            variant="primary"
            removable
            onRemove={() => removeSkill(skill)}
          >
            {skill}
          </Chip>
        ))}
        <input
          id={`${formId}-skills`}
          type="text"
          placeholder={value.length === 0 ? "Type a skill and press Enter..." : "Add more..."}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-body text-primary placeholder:text-muted-foreground"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Add a skill"
        />
      </div>

      {suggestedFiltered.length > 0 && (
        <div>
          <p className="text-caption text-secondary font-medium mb-2">
            Suggested skills
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedFiltered.slice(0, 8).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border text-caption text-secondary hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors duration-fast"
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {value.length > 0 && (
        <p className="text-caption text-tertiary text-right">
          {value.length} skill{value.length !== 1 ? "s" : ""} added
        </p>
      )}
    </div>
  );
}
