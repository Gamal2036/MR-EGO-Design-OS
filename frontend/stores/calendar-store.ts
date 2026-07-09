import { create } from "zustand";
import { demoCalendarEvents } from "@/data/calendar";
import type {
  CalendarEvent,
  CalendarStore,
} from "@/types/calendar";

function generateId(): string {
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameWeek(date: Date, weekDate: Date): boolean {
  const startOfWeek = new Date(weekDate);
  startOfWeek.setDate(weekDate.getDate() - weekDate.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return date >= startOfWeek && date <= endOfWeek;
}

export const useCalendarStore = create<CalendarStore>()((set, get) => ({
  events: [],
  viewMode: "month",
  viewState: "loading",
  currentDate: new Date().toISOString(),
  selectedDate: null,
  selectedEventId: null,
  isEventFormOpen: false,
  editingEventId: null,

  setViewState: (viewState) => set({ viewState }),

  setEvents: (events) => set({ events }),

  setViewMode: (viewMode) => set({ viewMode }),

  setCurrentDate: (currentDate) => set({ currentDate }),

  setSelectedDate: (selectedDate) => set({ selectedDate }),

  selectEvent: (selectedEventId) => set({ selectedEventId }),

  openEventForm: (eventId) =>
    set({ isEventFormOpen: true, editingEventId: eventId ?? null }),

  closeEventForm: () => set({ isEventFormOpen: false, editingEventId: null }),

  addEvent: (event) =>
    set((state) => ({
      events: [
        {
          ...event,
          id: event.id || generateId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        ...state.events,
      ],
    })),

  updateEvent: (id, updates) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, ...updates, updatedAt: new Date().toISOString() } : e,
      ),
    })),

  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  toggleEventComplete: (id) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === id ? { ...e, completed: !e.completed, updatedAt: new Date().toISOString() } : e,
      ),
    })),

  getEventsForDate: (date) => {
    const target = new Date(date);
    return get().events.filter((e) => {
      const start = new Date(e.start);
      return isSameDay(start, target);
    });
  },

  getEventsForMonth: (year, month) => {
    return get().events.filter((e) => {
      const d = new Date(e.start);
      return d.getFullYear() === year && d.getMonth() === month;
    });
  },

  getEventsForWeek: (date) => {
    const weekDate = new Date(date);
    return get().events.filter((e) => {
      const d = new Date(e.start);
      return isSameWeek(d, weekDate);
    });
  },

  getUpcomingEvents: (limit = 5) => {
    const now = new Date();
    return get().events
      .filter((e) => new Date(e.start) >= now && !e.completed)
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .slice(0, limit);
  },

  getTodayEvents: () => {
    const now = new Date();
    return get().events.filter((e) => {
      const start = new Date(e.start);
      return isSameDay(start, now) && !e.completed;
    });
  },

  getEventById: (id) => {
    return get().events.find((e) => e.id === id);
  },
}));
