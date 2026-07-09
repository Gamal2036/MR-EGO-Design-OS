import { create } from "zustand";
import { persist } from "zustand/middleware";

import { demoJobs, INITIAL_FILTER } from "@/data/jobs";
import type {
  Job,
  JobSearchFilter,
  JobSearchStore,
  SearchState,
  ViewMode,
} from "@/types/job-search";

function filterJobs(jobs: Job[], query: string, filters: JobSearchFilter): Job[] {
  return jobs.filter((job) => {
    if (query) {
      const q = query.toLowerCase();
      const matchesQuery =
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.tags.some((t) => t.toLowerCase().includes(q)) ||
        job.description.toLowerCase().includes(q);
      if (!matchesQuery) return false;
    }

    if (filters.company) {
      if (!job.company.toLowerCase().includes(filters.company.toLowerCase())) return false;
    }

    if (filters.location) {
      if (!job.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    }

    if (filters.locationTypes.length > 0) {
      if (!filters.locationTypes.includes(job.locationType)) return false;
    }

    if (filters.categories.length > 0) {
      if (!filters.categories.includes(job.category)) return false;
    }

    if (filters.contractTypes.length > 0) {
      if (!filters.contractTypes.includes(job.contractType)) return false;
    }

    if (filters.experienceLevels.length > 0) {
      if (!filters.experienceLevels.includes(job.experienceLevel)) return false;
    }

    if (filters.matchScoreMin > 0) {
      if (job.matchScore < filters.matchScoreMin) return false;
    }

    if (filters.matchScoreMax < 100) {
      if (job.matchScore > filters.matchScoreMax) return false;
    }

    if (filters.savedOnly) {
      if (!job.isSaved) return false;
    }

    return true;
  });
}

export const useJobSearchStore = create<JobSearchStore>()(
  persist(
    (set, get) => ({
      jobs: demoJobs,
      filteredJobs: demoJobs,
      selectedJob: null,
      savedJobIds: [],
      comparedJobIds: [],
      searchQuery: "",
      filters: { ...INITIAL_FILTER },
      viewMode: "list" as ViewMode,
      state: "results" as SearchState,
      errorMessage: null,
      showFilters: false,
      detailPanelOpen: false,
      savedJobsOpen: false,

      setSearchQuery: (query) => {
        set({ searchQuery: query });
        get().performSearch();
      },

      setFilters: (partial) => {
        const current = get().filters;
        const newFilters = { ...current, ...partial };
        set({ filters: newFilters });
        get().performSearch();
      },

      resetFilters: () => {
        set({ filters: { ...INITIAL_FILTER }, searchQuery: "" });
        get().performSearch();
      },

      setViewMode: (mode) => set({ viewMode: mode }),

      selectJob: (job) => {
        set({ selectedJob: job, detailPanelOpen: !!job });
      },

      toggleSaveJob: (jobId) => {
        const { savedJobIds, jobs } = get();
        const isSaved = savedJobIds.includes(jobId);
        const newSavedIds = isSaved
          ? savedJobIds.filter((id) => id !== jobId)
          : [...savedJobIds, jobId];

        const updatedJobs = jobs.map((j) =>
          j.id === jobId ? { ...j, isSaved: !j.isSaved } : j
        );

        set({
          savedJobIds: newSavedIds,
          jobs: updatedJobs,
          filteredJobs: filterJobs(updatedJobs, get().searchQuery, get().filters),
        });

        const selected = get().selectedJob;
        if (selected && selected.id === jobId) {
          set({ selectedJob: { ...selected, isSaved: !selected.isSaved } });
        }
      },

      toggleCompareJob: (jobId) => {
        const { comparedJobIds } = get();
        const isCompared = comparedJobIds.includes(jobId);
        const newCompared = isCompared
          ? comparedJobIds.filter((id) => id !== jobId)
          : [...comparedJobIds, jobId];

        if (newCompared.length > 3) return;
        set({ comparedJobIds: newCompared });
      },

      clearCompared: () => set({ comparedJobIds: [] }),

      performSearch: () => {
        const { jobs, searchQuery, filters } = get();
        const results = filterJobs(jobs, searchQuery, filters);

        let newState: SearchState;
        if (results.length === 0) {
          newState = searchQuery || Object.values(filters).some((v) =>
            Array.isArray(v) ? v.length > 0 : !!v
          )
            ? "no-results"
            : "empty";
        } else {
          newState = "results";
        }

        set({ filteredJobs: results, state: newState });
      },

      setShowFilters: (show) => set({ showFilters: show }),

      setDetailPanelOpen: (open) => {
        set({ detailPanelOpen: open });
        if (!open) {
          set({ selectedJob: null });
        }
      },

      setSavedJobsOpen: (open) => set({ savedJobsOpen: open }),

      loadJobs: () => {
        set({ state: "searching" });
        setTimeout(() => {
          const { searchQuery, filters } = get();
          const results = filterJobs(demoJobs, searchQuery, filters);
          set({
            jobs: demoJobs,
            filteredJobs: results,
            state: results.length > 0 ? "results" : "empty",
          });
        }, 300);
      },
    }),
    {
      name: "mr-ego-job-search",
      partialize: (state) => ({
        savedJobIds: state.savedJobIds,
        comparedJobIds: state.comparedJobIds,
        searchQuery: state.searchQuery,
        filters: state.filters,
        viewMode: state.viewMode,
      }),
    }
  )
);
