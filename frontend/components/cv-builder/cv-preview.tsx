"use client";

import { cn } from "@/lib/utils";
import { useCVBuilderStore } from "@/stores/cv-builder-store";

interface CVPreviewProps {
  className?: string;
}

export function CVPreview({ className }: CVPreviewProps) {
  const cvData = useCVBuilderStore((s) => s.cvData);
  const selectedTemplate = useCVBuilderStore((s) => s.selectedTemplate);
  const previewVisible = useCVBuilderStore((s) => s.previewVisible);

  if (!previewVisible) return null;

  const hasContent =
    cvData.personalInfo.fullName ||
    cvData.summary ||
    cvData.experience.length > 0 ||
    cvData.education.length > 0 ||
    cvData.skills.length > 0 ||
    cvData.languages.length > 0 ||
    cvData.projects.length > 0 ||
    cvData.certifications.length > 0;

  if (!hasContent) {
    return (
      <div className={cn("flex flex-col items-center justify-center py-16 text-center", className)}>
        <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center mb-4">
          <svg className="h-6 w-6 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <p className="text-body text-secondary">Your CV preview will appear here</p>
        <p className="text-caption text-tertiary mt-1">Start adding content to see the live preview</p>
      </div>
    );
  }

  return (
    <div className={cn("bg-white text-gray-900 rounded-xl shadow-medium overflow-hidden", className)}>
      <div className="sr-only" role="status">
        CV preview updated
      </div>

      <div className={cn(
        "p-6 space-y-5",
        selectedTemplate === "minimal" && "p-5 space-y-4",
        selectedTemplate === "modern" && "p-6 space-y-5",
        selectedTemplate === "professional" && "p-7 space-y-6",
        selectedTemplate === "classic" && "p-8 space-y-6",
      )}>
        {cvData.personalInfo.fullName && (
          <div className={cn(
            "border-b border-gray-200 pb-4",
            selectedTemplate === "modern" && "text-center",
            selectedTemplate === "minimal" && "pb-3",
            selectedTemplate === "professional" && "pb-5 border-b-2",
          )}>
            <h2 className={cn(
              "font-bold text-gray-900",
              selectedTemplate === "modern" && "text-2xl",
              selectedTemplate === "classic" && "text-xl uppercase tracking-wide",
              selectedTemplate === "professional" && "text-2xl",
              selectedTemplate === "minimal" && "text-xl",
            )}>
              {cvData.personalInfo.fullName}
            </h2>
            {cvData.personalInfo.title && (
              <p className={cn(
                "text-gray-600 mt-0.5",
                selectedTemplate === "professional" && "text-sm font-medium text-blue-700",
                selectedTemplate === "modern" && "text-sm",
                selectedTemplate === "classic" && "text-xs uppercase tracking-wider",
              )}>
                {cvData.personalInfo.title}
              </p>
            )}
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-gray-500">
              {cvData.personalInfo.email && <span>{cvData.personalInfo.email}</span>}
              {cvData.personalInfo.phone && <span>{cvData.personalInfo.phone}</span>}
              {cvData.personalInfo.location && <span>{cvData.personalInfo.location}</span>}
              {cvData.personalInfo.linkedIn && (
                <span className="truncate max-w-[150px]">{cvData.personalInfo.linkedIn}</span>
              )}
            </div>
          </div>
        )}

        {cvData.summary && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Professional Summary
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{cvData.summary}</p>
          </div>
        )}

        {cvData.experience.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Experience
            </h3>
            <div className="space-y-3">
              {cvData.experience.filter((e) => e.company || e.position).map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {exp.position || "Position"}
                      </p>
                      <p className="text-sm text-gray-600">{exp.company}{exp.location ? ` — ${exp.location}` : ""}</p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : exp.current ? " — Present" : ""}
                    </p>
                  </div>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-1">{exp.description}</p>
                  )}
                  {exp.highlights.some((h) => h.trim()) && (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-600 space-y-0.5">
                      {exp.highlights.filter((h) => h.trim()).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {cvData.education.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Education
            </h3>
            <div className="space-y-2">
              {cvData.education.filter((e) => e.institution).map((edu) => (
                <div key={edu.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{edu.institution}</p>
                      <p className="text-sm text-gray-600">
                        {edu.degree}{edu.field ? ` in ${edu.field}` : ""}{edu.gpa ? ` — GPA: ${edu.gpa}` : ""}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {edu.startDate}{edu.endDate ? ` — ${edu.endDate}` : ""}
                    </p>
                  </div>
                  {edu.achievements.some((a) => a.trim()) && (
                    <ul className="list-disc list-inside mt-1 text-sm text-gray-600 space-y-0.5">
                      {edu.achievements.filter((a) => a.trim()).map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {cvData.skills.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.filter((s) => s.name).map((skill) => (
                <span
                  key={skill.id}
                  className={cn(
                    "inline-block text-xs px-2 py-0.5 rounded",
                    selectedTemplate === "modern" && "bg-blue-50 text-blue-700",
                    selectedTemplate === "professional" && "bg-gray-100 text-gray-700",
                    selectedTemplate === "classic" && "border border-gray-300 text-gray-700",
                    selectedTemplate === "minimal" && "text-gray-700 underline decoration-dotted underline-offset-2",
                  )}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {cvData.languages.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Languages
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {cvData.languages.filter((l) => l.name).map((lang) => (
                <span key={lang.id} className="text-sm text-gray-700">
                  {lang.name}
                  <span className="text-gray-400"> ({lang.proficiency})</span>
                </span>
              ))}
            </div>
          </div>
        )}

        {cvData.projects.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Projects
            </h3>
            <div className="space-y-2">
              {cvData.projects.filter((p) => p.name).map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{proj.name}</p>
                      {proj.role && <p className="text-sm text-gray-600">{proj.role}</p>}
                    </div>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {proj.startDate}{proj.endDate ? ` — ${proj.endDate}` : ""}
                    </p>
                  </div>
                  {proj.description && (
                    <p className="text-sm text-gray-600 mt-1">{proj.description}</p>
                  )}
                  {proj.technologies.length > 0 && proj.technologies[0] && (
                    <p className="text-xs text-gray-500 mt-0.5">
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {cvData.certifications.length > 0 && (
          <div>
            <h3 className={cn(
              "text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2",
              selectedTemplate === "professional" && "text-blue-700 text-xs",
              selectedTemplate === "modern" && "text-gray-400",
              selectedTemplate === "classic" && "border-b border-gray-300 pb-1 mb-2",
            )}>
              Certifications
            </h3>
            <div className="space-y-1.5">
              {cvData.certifications.filter((c) => c.name).map((cert) => (
                <div key={cert.id}>
                  <p className="text-sm font-semibold text-gray-800">{cert.name}</p>
                  <p className="text-sm text-gray-600">
                    {cert.issuer}{cert.date ? ` — ${cert.date}` : ""}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 text-center">
        <p className="text-xs text-gray-400">CV Preview</p>
      </div>
    </div>
  );
}
