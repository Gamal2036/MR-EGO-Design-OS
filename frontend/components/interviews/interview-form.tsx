"use client";

import { X } from "lucide-react";
import { forwardRef, type HTMLAttributes, useState } from "react";

import { Button, Card, IconButton } from "@/components/foundation";
import { cn } from "@/lib/utils";
import type {
  Interview,
  InterviewCompany,
  InterviewFormat,
  InterviewType,
} from "@/types/interview";

const interviewTypes: { value: InterviewType; label: string }[] = [
  { value: "behavioral", label: "Behavioral" },
  { value: "technical", label: "Technical" },
  { value: "hr", label: "HR" },
  { value: "culture", label: "Culture" },
  { value: "leadership", label: "Leadership" },
  { value: "problem_solving", label: "Problem Solving" },
  { value: "career", label: "Career" },
  { value: "salary", label: "Salary" },
];

const interviewFormats: { value: InterviewFormat; label: string }[] = [
  { value: "video", label: "Video Call" },
  { value: "phone", label: "Phone Call" },
  { value: "onsite", label: "On-site" },
  { value: "remote", label: "Remote" },
];

interface InterviewFormProps extends HTMLAttributes<HTMLDivElement> {
  interview?: Interview;
  onSave: (data: Partial<Interview>) => void;
  onClose: () => void;
}

const InterviewForm = forwardRef<HTMLDivElement, InterviewFormProps>(
  ({ className, interview, onSave, onClose, ...props }, ref) => {
    const [title, setTitle] = useState(interview?.title ?? "");
    const [companyName, setCompanyName] = useState(interview?.company.name ?? "");
    const [role, setRole] = useState(interview?.role ?? "");
    const [type, setType] = useState<InterviewType>(interview?.type ?? "technical");
    const [format, setFormat] = useState<InterviewFormat>(interview?.format ?? "video");
    const [location, setLocation] = useState(interview?.location ?? "");
    const [date, setDate] = useState(
      interview?.date ? (new Date(interview.date).toISOString().split("T")[0] ?? "") : "",
    );
    const [time, setTime] = useState(interview?.time ?? "");
    const [duration, setDuration] = useState(interview?.duration?.toString() ?? "60");
    const [interviewer, setInterviewer] = useState(interview?.interviewer ?? "");
    const [salary, setSalary] = useState(interview?.salary ?? "");

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const company: InterviewCompany = {
        name: companyName,
        industry: interview?.company.industry ?? "Technology",
        size: interview?.company.size ?? "Unknown",
        description: interview?.company.description,
      };
      onSave({
        title,
        company,
        role,
        type,
        format,
        location,
        date: new Date(date).toISOString(),
        time: time || undefined,
        duration: Number(duration) || undefined,
        interviewer: interviewer || undefined,
        salary: salary || undefined,
      });
      onClose();
    };

    return (
      <div
        ref={ref}
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4",
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-label={interview ? "Edit interview" : "Create interview"}
        {...props}
      >
        <Card
          variant="elevated"
          className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-heading-4 text-primary font-semibold">
              {interview ? "Edit Interview" : "New Interview"}
            </h2>
            <IconButton
              icon={X}
              label="Close form"
              variant="ghost"
              size="sm"
              onClick={onClose}
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-caption text-tertiary mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Senior Engineer Interview"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="company" className="block text-caption text-tertiary mb-1">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-caption text-tertiary mb-1">
                  Role
                </label>
                <input
                  id="role"
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Job title"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="type" className="block text-caption text-tertiary mb-1">
                  Interview Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as InterviewType)}
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {interviewTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="format" className="block text-caption text-tertiary mb-1">
                  Format
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as InterviewFormat)}
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {interviewFormats.map((f) => (
                    <option key={f.value} value={f.value}>
                      {f.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="location" className="block text-caption text-tertiary mb-1">
                Location
              </label>
              <input
                id="location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. Remote (Zoom), Company HQ"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="date" className="block text-caption text-tertiary mb-1">
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-caption text-tertiary mb-1">
                  Time
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="duration" className="block text-caption text-tertiary mb-1">
                  Duration (min)
                </label>
                <input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  min="15"
                  max="240"
                  className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interviewer" className="block text-caption text-tertiary mb-1">
                Interviewer (optional)
              </label>
              <input
                id="interviewer"
                type="text"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Name, Title"
              />
            </div>

            <div>
              <label htmlFor="salary" className="block text-caption text-tertiary mb-1">
                Salary Range (optional)
              </label>
              <input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="h-9 w-full rounded-lg border border-border bg-surface-1 px-3 text-body-small text-primary placeholder:text-tertiary transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="e.g. $150,000 - $180,000"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {interview ? "Save Changes" : "Create Interview"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  },
);
InterviewForm.displayName = "InterviewForm";

export { InterviewForm };
export type { InterviewFormProps };
