import type { CalendarEvent } from "@/types/calendar";

const now = Date.now();
const MS_HOUR = 3600000;
const MS_DAY = 86400000;

function hoursFromNow(h: number): string {
  return new Date(now + h * MS_HOUR).toISOString();
}

function hoursAgo(h: number): string {
  return new Date(now - h * MS_HOUR).toISOString();
}

function daysFromNow(d: number): string {
  return new Date(now + d * MS_DAY).toISOString();
}

function todayAt(hour: number, min = 0): string {
  const d = new Date();
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
}

function todayEndAt(hour: number, min = 0): string {
  const d = new Date();
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
}

function futureDayAt(dayOffset: number, hour: number, min = 0): string {
  const d = new Date(now + dayOffset * MS_DAY);
  d.setHours(hour, min, 0, 0);
  return d.toISOString();
}

export const demoCalendarEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Interview: Quantum Dynamics",
    description: "Technical interview for Machine Learning Lead position. Round 2 - System Design.",
    start: futureDayAt(2, 10, 0),
    end: futureDayAt(2, 11, 30),
    allDay: false,
    category: "interview",
    priority: "urgent",
    location: "Google Meet",
    taskId: "task-3",
    completed: false,
    createdAt: daysFromNow(-7),
    updatedAt: hoursAgo(2),
  },
  {
    id: "event-2",
    title: "CV Update Deadline",
    description: "Deadline to update CV for Senior AI Engineer application.",
    start: futureDayAt(3, 23, 59),
    end: futureDayAt(3, 23, 59),
    allDay: true,
    category: "application_deadline",
    priority: "high",
    taskId: "task-1",
    completed: false,
    createdAt: daysFromNow(-5),
    updatedAt: hoursAgo(3),
  },
  {
    id: "event-3",
    title: "TensorFlow Study Session",
    description: "Complete module 6: Transformers architecture study session.",
    start: futureDayAt(1, 14, 0),
    end: futureDayAt(1, 16, 0),
    allDay: false,
    category: "learning",
    priority: "medium",
    taskId: "task-4",
    completed: false,
    createdAt: daysFromNow(-10),
    updatedAt: daysFromNow(-1),
  },
  {
    id: "event-4",
    title: "AI Career Goal Review",
    description: "Quarterly review of career goals and roadmap adjustments.",
    start: futureDayAt(5, 9, 0),
    end: futureDayAt(5, 10, 0),
    allDay: false,
    category: "career_goal",
    priority: "high",
    completed: false,
    createdAt: daysFromNow(-30),
    updatedAt: daysFromNow(-2),
  },
  {
    id: "event-5",
    title: "Submit Nexus Application",
    description: "Deadline to submit Senior AI Engineer application at Nexus Technologies.",
    start: futureDayAt(1, 23, 59),
    end: futureDayAt(1, 23, 59),
    allDay: true,
    category: "application_deadline",
    priority: "urgent",
    taskId: "task-2",
    completed: false,
    createdAt: daysFromNow(-2),
    updatedAt: hoursAgo(5),
  },
  {
    id: "event-6",
    title: "Mock Interview Practice",
    description: "AI-powered mock interview session for behavioral questions.",
    start: futureDayAt(4, 15, 0),
    end: futureDayAt(4, 16, 0),
    allDay: false,
    category: "interview",
    priority: "high",
    taskId: "task-10",
    completed: false,
    createdAt: daysFromNow(-3),
    updatedAt: daysFromNow(-1),
  },
  {
    id: "event-7",
    title: "Portfolio Upload Reminder",
    description: "Reminder to upload updated portfolio documents.",
    start: daysFromNow(-1),
    end: daysFromNow(-1),
    allDay: true,
    category: "task",
    priority: "low",
    taskId: "task-7",
    completed: true,
    createdAt: daysFromNow(-8),
    updatedAt: hoursAgo(12),
  },
  {
    id: "event-8",
    title: "LinkedIn Profile Update",
    description: "Set aside time to refresh LinkedIn profile with latest achievements.",
    start: futureDayAt(6, 11, 0),
    end: futureDayAt(6, 12, 30),
    allDay: false,
    category: "task",
    priority: "medium",
    taskId: "task-6",
    completed: false,
    createdAt: daysFromNow(-10),
    updatedAt: daysFromNow(-10),
  },
];
