"use client";

import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { DashboardErrorState, DashboardLoadingState } from "@/components/dashboard";
import { CourseDetails } from "@/components/learning";
import { Breadcrumb } from "@/components/shell/breadcrumb";
import { demoCourses } from "@/data/learning";
import { useLearningStore } from "@/stores/learning-store";
import type { Course } from "@/types/learning";

type PageState = "loading" | "ready" | "error";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params["id"] as string;
  const [pageState, setPageState] = useState<PageState>("loading");
  const [course, setCourse] = useState<Course | null>(null);
  const loadedRef = useRef(false);

  const store = useLearningStore();
  const setCourses = store.setCourses;
  const setViewState = store.setViewState;

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const timer = setTimeout(() => {
      if (store.courses.length === 0) {
        setCourses(demoCourses);
        setViewState("ready");
      }
      const found = store.getCourseById(courseId) || demoCourses.find((c) => c.id === courseId);
      if (found) {
        setCourse(found);
        setPageState("ready");
      } else {
        router.push("/dashboard/learning");
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [courseId, store, setCourses, setViewState, router]);

  const handleRetry = useCallback(() => {
    setPageState("loading");
    setTimeout(() => {
      setCourses(demoCourses);
      setViewState("ready");
      const found = demoCourses.find((c) => c.id === courseId);
      if (found) {
        setCourse(found);
        setPageState("ready");
      } else {
        router.push("/dashboard/learning");
      }
    }, 1000);
  }, [courseId, setCourses, setViewState, router]);

  if (pageState === "loading") {
    return <DashboardLoadingState message="Loading course..." />;
  }

  if (pageState === "error") {
    return <DashboardErrorState onRetry={handleRetry} />;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="min-h-0 flex-1">
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-6 md:px-7 md:py-8 lg:px-8 lg:py-10">
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Learning Center", href: "/dashboard/learning" },
              { label: course.title },
            ]}
          />
        </div>
        <CourseDetails
          course={course}
          onToggleBookmark={store.toggleBookmark}
          onToggleFavorite={store.toggleFavorite}
        />
      </div>
    </div>
  );
}
