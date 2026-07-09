export type CalendarViewMode = "month" | "week" | "day" | "agenda";

export type CalendarViewState = "loading" | "ready" | "error" | "empty";

export type EventCategory =
  | "task"
  | "interview"
  | "application_deadline"
  | "learning"
  | "career_goal"
  | "meeting"
  | "custom";

export type EventPriority = "urgent" | "high" | "medium" | "low";

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
  category: EventCategory;
  priority: EventPriority;
  location?: string;
  taskId?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CalendarDay {
  date: string;
  events: CalendarEvent[];
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}

export interface CalendarWeek {
  days: CalendarDay[];
  weekNumber: number;
}

export interface CalendarState {
  events: CalendarEvent[];
  viewMode: CalendarViewMode;
  viewState: CalendarViewState;
  currentDate: string;
  selectedDate: string | null;
  selectedEventId: string | null;
  isEventFormOpen: boolean;
  editingEventId: string | null;
}

export interface CalendarStore extends CalendarState {
  setViewState: (state: CalendarViewState) => void;
  setEvents: (events: CalendarEvent[]) => void;
  setViewMode: (mode: CalendarViewMode) => void;
  setCurrentDate: (date: string) => void;
  setSelectedDate: (date: string | null) => void;
  selectEvent: (id: string | null) => void;
  openEventForm: (eventId?: string) => void;
  closeEventForm: () => void;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => void;
  deleteEvent: (id: string) => void;
  toggleEventComplete: (id: string) => void;
  getEventsForDate: (date: string) => CalendarEvent[];
  getEventsForMonth: (year: number, month: number) => CalendarEvent[];
  getEventsForWeek: (date: string) => CalendarEvent[];
  getUpcomingEvents: (limit?: number) => CalendarEvent[];
  getTodayEvents: () => CalendarEvent[];
  getEventById: (id: string) => CalendarEvent | undefined;
}
