"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { CourseSection } from "@/lib/types/lms-content";

export function useCourseSections(courseId?: string) {
  const { user } = useAuth();
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSections = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (courseId) {
          params.append("courseId", courseId);
        }

        const response = await fetch(`/api/course-sections?${params}`);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch course sections: ${response.statusText}`
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || "Failed to fetch course sections");
        }

        setSections(data.data || []);
      } catch (err) {
        console.error("Error fetching course sections:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch course sections"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [user, courseId]);

  const createSection = async (
    sectionData: Omit<CourseSection, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await fetch("/api/course-sections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create course section: ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create course section");
      }

      // Refresh sections
      setSections(prev => [...prev, data.data]);
      return data.data;
    } catch (err) {
      console.error("Error creating course section:", err);
      throw err;
    }
  };

  return {
    sections,
    loading,
    error,
    createSection,
    refetch: () => {
      if (user) {
        setLoading(true);
        setError(null);
      }
    },
  };
}
