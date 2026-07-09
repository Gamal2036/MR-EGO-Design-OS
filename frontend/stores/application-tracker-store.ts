import { create } from "zustand";

import type {
  Application,
  ApplicationFilters,
  ApplicationPriority,
  ApplicationState,
  ApplicationStatus,
  ApplicationTrackerStore,
  ApplicationViewMode,
  TimelineEvent,
} from "@/types/application-tracker";
import { INITIAL_APPLICATION_FILTERS } from "@/types/application-tracker";

const DEMO_APPLICATIONS: Application[] = [
  {
    id: "app-001",
    company: "Nexus Technologies",
    role: "Senior AI Engineer",
    location: "San Francisco, CA",
    locationType: "remote",
    status: "interview",
    priority: "high",
    matchScore: 94,
    salaryLabel: "$180k - $220k",
    appliedDate: "2026-06-28",
    lastUpdated: "2026-07-05",
    nextAction: "Technical Interview",
    nextActionDate: "2026-07-12",
    notes: [
      { id: "note-001", content: "Strong company culture fit. Hiring manager was impressed with my transformer project.", createdAt: "2026-07-01", updatedAt: "2026-07-01" },
    ],
    timeline: [
      { id: "evt-001", type: "applied", title: "Application Submitted", description: "Applied via company portal", date: "2026-06-28" },
      { id: "evt-002", type: "viewed", title: "Application Viewed", description: "HR reviewed application", date: "2026-06-30" },
      { id: "evt-003", type: "interview", title: "HR Screening Call", description: "30-min phone screen with recruiter", date: "2026-07-03" },
      { id: "evt-004", type: "interview", title: "Technical Interview Scheduled", description: "System design + coding interview", date: "2026-07-05" },
    ],
    tasks: [
      { id: "task-001", text: "Review transformer architecture papers", completed: true, priority: "high", dueDate: "2026-07-10" },
      { id: "task-002", text: "Prepare system design for ML pipeline", completed: false, priority: "high", dueDate: "2026-07-11" },
      { id: "task-003", text: "Practice coding problems (medium/hard)", completed: false, priority: "medium", dueDate: "2026-07-11" },
    ],
    documents: [
      { id: "doc-001", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-28" },
      { id: "doc-002", name: "Cover_Letter_Nexus.pdf", type: "cover-letter", uploadedAt: "2026-06-28" },
    ],
    contactName: "Sarah Chen",
    contactEmail: "sarah.chen@nexus.tech",
    jobUrl: "https://nexus.tech/careers/senior-ai-engineer",
    aiRecommendation: "Strong match. Highlight your end-to-end ML pipeline experience and transformer-based projects in the interview.",
    aiInsights: ["Your profile matches 94% of requirements", "Consider discussing MLOps experience", "Company values publications - mention your research"],
  },
  {
    id: "app-002",
    company: "Quantum Dynamics",
    role: "Machine Learning Lead",
    location: "New York, NY",
    locationType: "hybrid",
    status: "applied",
    priority: "high",
    matchScore: 87,
    salaryLabel: "$195k - $240k",
    appliedDate: "2026-07-02",
    lastUpdated: "2026-07-02",
    nextAction: "Follow up",
    nextActionDate: "2026-07-09",
    notes: [],
    timeline: [
      { id: "evt-005", type: "applied", title: "Application Submitted", description: "Applied via LinkedIn Easy Apply", date: "2026-07-02" },
    ],
    tasks: [
      { id: "task-004", text: "Follow up with recruiter on LinkedIn", completed: false, priority: "high", dueDate: "2026-07-09" },
      { id: "task-005", text: "Research company recent ML publications", completed: false, priority: "medium" },
    ],
    documents: [
      { id: "doc-003", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-07-02" },
    ],
    contactName: "Mike Rivera",
    aiRecommendation: "Good match. Your leadership experience aligns well. Prepare talking points about team management and ML strategy.",
    aiInsights: ["87% match - strong leadership profile", "Company uses PyTorch extensively", "Recent funding round suggests growth"],
  },
  {
    id: "app-003",
    company: "CloudCore Systems",
    role: "AI Solutions Architect",
    location: "Austin, TX",
    locationType: "remote",
    status: "prepared",
    priority: "medium",
    matchScore: 82,
    salaryLabel: "$170k - $210k",
    appliedDate: "",
    lastUpdated: "2026-07-04",
    nextAction: "Submit application",
    nextActionDate: "2026-07-10",
    notes: [
      { id: "note-002", content: "Need to tailor cover letter for solutions architect role.", createdAt: "2026-07-04", updatedAt: "2026-07-04" },
    ],
    timeline: [
      { id: "evt-006", type: "note", title: "Application Preparation Started", description: "Gathering materials and tailoring CV", date: "2026-07-04" },
    ],
    tasks: [
      { id: "task-006", text: "Tailor CV for solutions architect role", completed: false, priority: "high", dueDate: "2026-07-09" },
      { id: "task-007", text: "Write cover letter highlighting architecture experience", completed: false, priority: "medium", dueDate: "2026-07-10" },
      { id: "task-008", text: "Prepare portfolio of architecture diagrams", completed: true, priority: "low" },
    ],
    documents: [],
    aiRecommendation: "Prepare to discuss your experience designing scalable ML infrastructure. Highlight client-facing and consulting skills.",
    aiInsights: ["Solutions architect roles value breadth over depth", "82% match - strong infrastructure background", "Consider getting AWS Solutions Architect cert"],
  },
  {
    id: "app-004",
    company: "Lingua AI",
    role: "NLP Research Engineer",
    location: "Boston, MA",
    locationType: "on-site",
    status: "viewed",
    priority: "medium",
    matchScore: 76,
    salaryLabel: "$160k - $200k",
    appliedDate: "2026-06-25",
    lastUpdated: "2026-07-01",
    nextAction: "Wait for response",
    notes: [],
    timeline: [
      { id: "evt-007", type: "applied", title: "Application Submitted", description: "Applied via company career page", date: "2026-06-25" },
      { id: "evt-008", type: "viewed", title: "Application Viewed", description: "Hiring manager reviewed application", date: "2026-07-01" },
    ],
    tasks: [
      { id: "task-009", text: "Review recent NLP papers from ACL 2026", completed: false, priority: "medium" },
    ],
    documents: [
      { id: "doc-004", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-25" },
      { id: "doc-005", name: "Publications_List.pdf", type: "other", uploadedAt: "2026-06-25" },
    ],
    aiRecommendation: "Decent match. Your NLP background is relevant. Consider publishing more research to strengthen academic fit.",
    aiInsights: ["76% match - good NLP foundation", "Academic publications would strengthen application", "Company focused on LLM research"],
  },
  {
    id: "app-005",
    company: "Visionary Labs",
    role: "Computer Vision Engineer",
    location: "Seattle, WA",
    locationType: "remote",
    status: "technical-test",
    priority: "high",
    matchScore: 71,
    salaryLabel: "$155k - $195k",
    appliedDate: "2026-06-20",
    lastUpdated: "2026-07-06",
    nextAction: "Complete coding challenge",
    nextActionDate: "2026-07-14",
    notes: [
      { id: "note-003", content: "Coding challenge is a take-home CV project. They asked for object detection pipeline.", createdAt: "2026-07-06", updatedAt: "2026-07-06" },
    ],
    timeline: [
      { id: "evt-009", type: "applied", title: "Application Submitted", date: "2026-06-20" },
      { id: "evt-010", type: "viewed", title: "Application Viewed", date: "2026-06-22" },
      { id: "evt-011", type: "interview", title: "Initial Screening Call", description: "30-min call with engineering manager", date: "2026-06-28" },
      { id: "evt-012", type: "technical-test", title: "Technical Challenge Sent", description: "Take-home CV project - 1 week deadline", date: "2026-07-06" },
    ],
    tasks: [
      { id: "task-010", text: "Complete take-home CV project", completed: false, priority: "high", dueDate: "2026-07-13" },
      { id: "task-011", text: "Review YOLO and transformer-based detection", completed: false, priority: "high", dueDate: "2026-07-11" },
      { id: "task-012", text: "Set up development environment with sample data", completed: true, priority: "medium" },
    ],
    documents: [
      { id: "doc-006", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-20" },
    ],
    contactName: "Dr. James Park",
    contactEmail: "jpark@visionarylabs.io",
    aiRecommendation: "Focus on your real-time inference optimization experience. The take-home project is a chance to showcase your MLOps skills.",
    aiInsights: ["71% match - good foundation in CV", "Take-home project is critical for evaluation", "Company uses PyTorch and ONNX"],
  },
  {
    id: "app-006",
    company: "DataFlow Inc",
    role: "Data Engineering Lead",
    location: "Chicago, IL",
    locationType: "hybrid",
    status: "rejected",
    priority: "low",
    matchScore: 58,
    salaryLabel: "$175k - $215k",
    appliedDate: "2026-06-15",
    lastUpdated: "2026-07-02",
    nextAction: "Review feedback",
    notes: [
      { id: "note-004", content: "Rejected - role required more data engineering specific experience. Received polite rejection with encouragement to reapply for ML roles.", createdAt: "2026-07-02", updatedAt: "2026-07-02" },
    ],
    timeline: [
      { id: "evt-013", type: "applied", title: "Application Submitted", date: "2026-06-15" },
      { id: "evt-014", type: "viewed", title: "Application Viewed", date: "2026-06-17" },
      { id: "evt-015", type: "rejected", title: "Application Rejected", description: "Position requires stronger data engineering background", date: "2026-07-02" },
    ],
    tasks: [
      { id: "task-013", text: "Review rejection feedback and identify gaps", completed: false, priority: "low" },
    ],
    documents: [
      { id: "doc-007", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-15" },
    ],
    aiRecommendation: "Lower match. Consider upskilling in data engineering (Spark, Airflow, Kafka) before reapplying to similar roles.",
    aiInsights: ["58% match - data engineering gap identified", "Consider Spark/Airflow certification", "ML background valued but insufficient for this role"],
  },
  {
    id: "app-007",
    company: "InnovateAI",
    role: "AI Product Manager",
    location: "San Francisco, CA",
    locationType: "on-site",
    status: "draft",
    priority: "low",
    matchScore: 45,
    salaryLabel: "$190k - $250k",
    appliedDate: "",
    lastUpdated: "2026-07-03",
    nextAction: "Assess fit",
    notes: [],
    timeline: [],
    tasks: [
      { id: "task-014", text: "Assess career interest in product management", completed: false, priority: "medium" },
      { id: "task-015", text: "Research typical PM interview process", completed: false, priority: "low" },
    ],
    documents: [],
    aiRecommendation: "This is a pivot from engineering to product. Consider if this aligns with your long-term career goals before investing time.",
    aiInsights: ["45% match - role requires PM not engineering skills", "Your AI knowledge is valuable for PM role", "Consider informational interviews first"],
  },
  {
    id: "app-008",
    company: "ScaleML",
    role: "ML Platform Engineer",
    location: "Remote",
    locationType: "remote",
    status: "offer",
    priority: "high",
    matchScore: 68,
    salaryLabel: "$150k - $190k",
    appliedDate: "2026-06-10",
    lastUpdated: "2026-07-07",
    nextAction: "Review offer letter",
    nextActionDate: "2026-07-11",
    notes: [
      { id: "note-005", content: "Received verbal offer! Waiting for written offer letter. Salary discussion at $175k + equity.", createdAt: "2026-07-07", updatedAt: "2026-07-07" },
    ],
    timeline: [
      { id: "evt-016", type: "applied", title: "Application Submitted", date: "2026-06-10" },
      { id: "evt-017", type: "viewed", title: "Application Viewed", date: "2026-06-12" },
      { id: "evt-018", type: "interview", title: "Technical Phone Screen", description: "1-hour technical discussion with platform team", date: "2026-06-18" },
      { id: "evt-019", type: "technical-test", title: "Take-home Assignment", description: "Build a simple ML pipeline orchestration tool", date: "2026-06-22" },
      { id: "evt-020", type: "interview", title: "On-site Interviews (4 rounds)", description: "System design, coding, behavioral, hiring manager", date: "2026-07-01" },
      { id: "evt-021", type: "offer", title: "Verbal Offer Extended", description: "Competitive offer with good equity package", date: "2026-07-07" },
    ],
    tasks: [
      { id: "task-016", text: "Review written offer letter", completed: false, priority: "high", dueDate: "2026-07-11" },
      { id: "task-017", text: "Research total compensation benchmarks", completed: false, priority: "high", dueDate: "2026-07-10" },
      { id: "task-018", text: "Prepare negotiation points", completed: false, priority: "medium", dueDate: "2026-07-11" },
      { id: "task-019", text: "Check benefits summary", completed: false, priority: "medium" },
    ],
    documents: [
      { id: "doc-008", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-10" },
      { id: "doc-009", name: "Portfolio_ML_Projects.pdf", type: "portfolio", uploadedAt: "2026-06-10" },
    ],
    contactName: "Emily Torres",
    contactEmail: "emily@scaleml.io",
    aiRecommendation: "Excellent progress. The offer validates your platform engineering skills. Prepare a negotiation strategy based on market research.",
    aiInsights: ["68% match but strong interview performance", "Company culture is engineering-first", "Good growth potential in ML platform space"],
  },
  {
    id: "app-009",
    company: "FairML Institute",
    role: "AI Ethics Researcher",
    location: "Washington, DC",
    locationType: "hybrid",
    status: "archived",
    priority: "low",
    matchScore: 28,
    salaryLabel: "$120k - $160k",
    appliedDate: "2026-05-20",
    lastUpdated: "2026-06-15",
    nextAction: "",
    notes: [
      { id: "note-006", content: "Archived - role requires PhD and specific ethics research background. Not a good fit at this time.", createdAt: "2026-06-15", updatedAt: "2026-06-15" },
    ],
    timeline: [
      { id: "evt-022", type: "applied", title: "Application Submitted", date: "2026-05-20" },
      { id: "evt-023", type: "rejected", title: "Not Selected", description: "Position requires PhD-level research background", date: "2026-06-15" },
    ],
    tasks: [],
    documents: [
      { id: "doc-010", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-05-20" },
    ],
    aiRecommendation: "Low match. This career path requires significant academic credentials. Consider if this aligns with your long-term goals.",
  },
  {
    id: "app-010",
    company: "TechGiants Corp",
    role: "Principal AI Engineer",
    location: "Seattle, WA",
    locationType: "hybrid",
    status: "rejected",
    priority: "medium",
    matchScore: 42,
    salaryLabel: "$250k - $350k",
    appliedDate: "2026-06-01",
    lastUpdated: "2026-06-28",
    nextAction: "",
    notes: [
      { id: "note-007", content: "Rejected after initial screen. Role required more years of leadership experience. Good learning experience.", createdAt: "2026-06-28", updatedAt: "2026-06-28" },
    ],
    timeline: [
      { id: "evt-024", type: "applied", title: "Application Submitted", date: "2026-06-01" },
      { id: "evt-025", type: "viewed", title: "Application Viewed", date: "2026-06-05" },
      { id: "evt-026", type: "rejected", title: "Not Moving Forward", description: "Seeking candidates with more organizational leadership experience", date: "2026-06-28" },
    ],
    tasks: [
      { id: "task-020", text: "Identify leadership development opportunities", completed: false, priority: "low" },
    ],
    documents: [
      { id: "doc-011", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-06-01" },
    ],
    aiRecommendation: "Consider targeting senior-level roles first and building toward principal level over time. Seek mentorship opportunities.",
    aiInsights: ["42% match - leadership gap identified", "Consider internal leadership opportunities", "Build cross-team collaboration experience"],
  },
  {
    id: "app-011",
    company: "SecureML",
    role: "AI Security Engineer",
    location: "Remote",
    locationType: "remote",
    status: "applied",
    priority: "medium",
    matchScore: 38,
    salaryLabel: "$165k - $210k",
    appliedDate: "2026-07-05",
    lastUpdated: "2026-07-05",
    nextAction: "Wait for response",
    notes: [],
    timeline: [
      { id: "evt-027", type: "applied", title: "Application Submitted", description: "Applied via company career portal", date: "2026-07-05" },
    ],
    tasks: [
      { id: "task-021", text: "Review adversarial ML fundamentals", completed: false, priority: "medium" },
    ],
    documents: [
      { id: "doc-012", name: "CV_2026.pdf", type: "cv", uploadedAt: "2026-07-05" },
    ],
    aiRecommendation: "Lower match but good learning opportunity. The security angle is growing in importance for ML engineers.",
    aiInsights: ["38% match - security specialization needed", "Growing field with high demand", "Consider security certifications"],
  },
  {
    id: "app-012",
    company: "StartupAI",
    role: "Junior ML Engineer",
    location: "Denver, CO",
    locationType: "on-site",
    status: "accepted",
    priority: "low",
    matchScore: 35,
    salaryLabel: "$90k - $120k",
    appliedDate: "2026-04-01",
    lastUpdated: "2026-05-01",
    nextAction: "",
    notes: [
      { id: "note-008", content: "Accepted offer but declined - role was too junior. Good company for early career.", createdAt: "2026-05-01", updatedAt: "2026-05-01" },
    ],
    timeline: [
      { id: "evt-028", type: "applied", title: "Application Submitted", date: "2026-04-01" },
      { id: "evt-029", type: "interview", title: "Phone Interview", date: "2026-04-08" },
      { id: "evt-030", type: "interview", title: "On-site Interview", date: "2026-04-15" },
      { id: "evt-031", type: "offer", title: "Offer Extended", date: "2026-04-20" },
      { id: "evt-032", type: "accepted", title: "Offer Accepted (Declined)", description: "Accepted offer but later declined - too junior", date: "2026-05-01" },
    ],
    tasks: [],
    documents: [],
    aiRecommendation: "Role was below your experience level. Good to have in your history as a data point for career progression.",
  },
];

function filterApplications(
  apps: Application[],
  filters: ApplicationFilters
): Application[] {
  return apps.filter((app) => {
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      const matches =
        app.company.toLowerCase().includes(q) ||
        app.role.toLowerCase().includes(q) ||
        app.location.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (filters.status.length > 0) {
      if (!filters.status.includes(app.status)) return false;
    }

    if (filters.priority.length > 0) {
      if (!filters.priority.includes(app.priority)) return false;
    }

    if (filters.matchScoreMin > 0) {
      if (app.matchScore < filters.matchScoreMin) return false;
    }

    if (filters.dateRange !== "all") {
      if (!app.appliedDate) return false;
      const applied = new Date(app.appliedDate);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24));
      if (filters.dateRange === "week" && diffDays > 7) return false;
      if (filters.dateRange === "month" && diffDays > 30) return false;
      if (filters.dateRange === "quarter" && diffDays > 90) return false;
    }

    return true;
  });
}

export const useApplicationTrackerStore = create<ApplicationTrackerStore>()(
  (set, get) => ({
    applications: DEMO_APPLICATIONS,
    filteredApplications: DEMO_APPLICATIONS,
    selectedApplication: null,
    filters: { ...INITIAL_APPLICATION_FILTERS },
    viewMode: "pipeline" as ApplicationViewMode,
    state: "ready" as ApplicationState,
    errorMessage: null,
    detailPanelOpen: false,

    selectApplication: (app) => {
      set({ selectedApplication: app, detailPanelOpen: !!app });
    },

    setFilters: (partial) => {
      const current = get().filters;
      const newFilters = { ...current, ...partial };
      set({ filters: newFilters });
      get().performFilter();
    },

    resetFilters: () => {
      set({ filters: { ...INITIAL_APPLICATION_FILTERS } });
      get().performFilter();
    },

    setViewMode: (mode) => set({ viewMode: mode }),

    updateStatus: (appId, status) => {
      const { applications } = get();
      const updated = applications.map((app) =>
        app.id === appId
          ? {
              ...app,
              status,
              lastUpdated: new Date().toISOString().split("T")[0]!,
              timeline: [
                ...app.timeline,
                {
                  id: `evt-${Date.now()}`,
                  type: (status === "rejected" ? "rejected" : status === "accepted" ? "accepted" : "other") as TimelineEvent["type"],
                  title: `Status changed to ${status}`,
                  date: new Date().toISOString().split("T")[0]!,
                } satisfies TimelineEvent,
              ],
            }
          : app
      );
      set({ applications: updated });
      get().performFilter();

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        const updatedSelected = updated.find((a) => a.id === appId);
        set({ selectedApplication: updatedSelected || null });
      }
    },

    addNote: (appId, content) => {
      const { applications } = get();
      const note = {
        id: `note-${Date.now()}`,
        content,
        createdAt: new Date().toISOString().split("T")[0]!,
        updatedAt: new Date().toISOString().split("T")[0]!,
      };
      const updated = applications.map((app) =>
        app.id === appId ? { ...app, notes: [...app.notes, note], lastUpdated: note.createdAt } : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({ selectedApplication: { ...selected, notes: [...selected.notes, note] } });
      }
    },

    updateNote: (appId, noteId, content) => {
      const { applications } = get();
      const updated = applications.map((app) =>
        app.id === appId
          ? {
              ...app,
              notes: app.notes.map((n) =>
                n.id === noteId ? { ...n, content, updatedAt: new Date().toISOString().split("T")[0]! } : n
              ),
            }
          : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({
          selectedApplication: {
            ...selected,
            notes: selected.notes.map((n) =>
              n.id === noteId ? { ...n, content, updatedAt: new Date().toISOString().split("T")[0]! } : n
            ),
          },
        });
      }
    },

    deleteNote: (appId, noteId) => {
      const { applications } = get();
      const updated = applications.map((app) =>
        app.id === appId ? { ...app, notes: app.notes.filter((n) => n.id !== noteId) } : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({ selectedApplication: { ...selected, notes: selected.notes.filter((n) => n.id !== noteId) } });
      }
    },

    toggleTask: (appId, taskId) => {
      const { applications } = get();
      const updated = applications.map((app) =>
        app.id === appId
          ? {
              ...app,
              tasks: app.tasks.map((t) =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              ),
            }
          : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({
          selectedApplication: {
            ...selected,
            tasks: selected.tasks.map((t) =>
              t.id === taskId ? { ...t, completed: !t.completed } : t
            ),
          },
        });
      }
    },

    addTask: (appId, text, priority, dueDate) => {
      const { applications } = get();
      const task = {
        id: `task-${Date.now()}`,
        text,
        completed: false,
        priority,
        dueDate,
      };
      const updated = applications.map((app) =>
        app.id === appId ? { ...app, tasks: [...app.tasks, task] } : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({ selectedApplication: { ...selected, tasks: [...selected.tasks, task] } });
      }
    },

    deleteTask: (appId, taskId) => {
      const { applications } = get();
      const updated = applications.map((app) =>
        app.id === appId ? { ...app, tasks: app.tasks.filter((t) => t.id !== taskId) } : app
      );
      set({ applications: updated });

      const selected = get().selectedApplication;
      if (selected && selected.id === appId) {
        set({ selectedApplication: { ...selected, tasks: selected.tasks.filter((t) => t.id !== taskId) } });
      }
    },

    performFilter: () => {
      const { applications, filters } = get();
      const results = filterApplications(applications, filters);

      let newState: ApplicationState;
      if (results.length === 0) {
        newState = "empty";
      } else {
        newState = "ready";
      }

      set({ filteredApplications: results, state: newState });
    },

    loadApplications: () => {
      set({ state: "loading" });
      setTimeout(() => {
        const { filters } = get();
        const results = filterApplications(DEMO_APPLICATIONS, filters);
        set({
          applications: DEMO_APPLICATIONS,
          filteredApplications: results,
          state: results.length > 0 ? "ready" : "empty",
        });
      }, 400);
    },

    setDetailPanelOpen: (open) => {
      set({ detailPanelOpen: open });
      if (!open) {
        set({ selectedApplication: null });
      }
    },
  })
);
