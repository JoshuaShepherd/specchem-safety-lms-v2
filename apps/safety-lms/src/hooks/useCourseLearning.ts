"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useUserProgress } from "./useUserProgress";
import { ContentBlock } from "@/components/content/ContentBlockRenderer";

export interface CourseSection {
  id: string;
  course_id: string;
  section_key: string;
  title: string;
  order_index: number;
  icon_name?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  section_id: string;
  question_key: string;
  question_type: "true-false" | "multiple-choice";
  question_text: string;
  options: Record<string, string>;
  correct_answer: string;
  explanation?: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseLearningData {
  course: {
    id: string;
    slug: string;
    title: string;
    description?: string;
    version: string;
    is_published: boolean;
  };
  sections: (CourseSection & {
    blocks: ContentBlock[];
    questions: QuizQuestion[];
  })[];
  currentSection?: CourseSection & {
    blocks: ContentBlock[];
    questions: QuizQuestion[];
  };
  progress: {
    completedSections: string[];
    currentSectionId?: string;
    overallProgress: number;
    timeSpent: number;
    lastAccessed: Date;
  };
}

export interface ContentInteraction {
  blockId: string;
  interactionType:
    | "view"
    | "click"
    | "expand"
    | "collapse"
    | "download"
    | "share";
  metadata?: Record<string, any>;
}

export interface QuizAttempt {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  attemptedAt: Date;
  timeSpent: number;
}

export function useCourseLearning(courseSlug: string) {
  const { user } = useAuth();
  const { updateProgress, getCourseStatus } = useUserProgress();

  const [learningData, setLearningData] = useState<CourseLearningData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [interactions, setInteractions] = useState<ContentInteraction[]>([]);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  // Fetch course learning data
  const fetchCourseLearningData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch course details from public API
      const courseResponse = await fetch(
        `/api/public/courses?slug=${courseSlug}`
      );
      if (!courseResponse.ok) {
        throw new Error("Failed to fetch course");
      }
      const courseData = await courseResponse.json();

      if (!courseData.success || !courseData.data.length) {
        throw new Error("Course not found");
      }

      const course = courseData.data[0];

      // Fetch course sections with content blocks and questions from public API
      const sectionsResponse = await fetch(
        `/api/public/course-sections?courseId=${course.id}`
      );
      if (!sectionsResponse.ok) {
        throw new Error("Failed to fetch course sections");
      }
      const sectionsData = await sectionsResponse.json();

      if (!sectionsData.success) {
        throw new Error("Failed to fetch course sections");
      }

      // Fetch content blocks for each section
      const sectionsWithContent = await Promise.all(
        sectionsData.data.map(async (section: CourseSection) => {
          // Fetch content blocks from public API
          const blocksResponse = await fetch(
            `/api/public/content-blocks?sectionId=${section.id}`
          );
          const blocksData = blocksResponse.ok
            ? await blocksResponse.json()
            : { success: true, data: [] };

          // Fetch quiz questions from public API
          const questionsResponse = await fetch(
            `/api/public/quiz-questions?sectionId=${section.id}`
          );
          const questionsData = questionsResponse.ok
            ? await questionsResponse.json()
            : { success: true, data: [] };

          return {
            ...section,
            blocks: blocksData.success
              ? blocksData.data.sort(
                  (a: ContentBlock, b: ContentBlock) =>
                    a.order_index - b.order_index
                )
              : [],
            questions: questionsData.success
              ? questionsData.data.sort(
                  (a: QuizQuestion, b: QuizQuestion) =>
                    a.order_index - b.order_index
                )
              : [],
          };
        })
      );

      // Sort sections by order_index
      const sortedSections = sectionsWithContent.sort(
        (a, b) => a.order_index - b.order_index
      );

      // Get user progress for this course
      const userStatus = getCourseStatus(course.id);
      const completedSections = userStatus.progress?.completedSections || [];

      const learningData: CourseLearningData = {
        course,
        sections: sortedSections,
        currentSection: sortedSections[0],
        progress: {
          completedSections,
          currentSectionId: sortedSections[0]?.id,
          overallProgress: userStatus.progressPercent,
          timeSpent: userStatus.progress?.timeSpent || 0,
          lastAccessed: userStatus.progress?.lastActiveAt
            ? new Date(userStatus.progress.lastActiveAt)
            : new Date(),
        },
      };

      setLearningData(learningData);
      setCurrentSectionIndex(0);
    } catch (err) {
      console.error("Error fetching course learning data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch course data"
      );
    } finally {
      setLoading(false);
    }
  }, [user, courseSlug, getCourseStatus]);

  // Navigate to a specific section
  const navigateToSection = useCallback(
    (sectionIndex: number) => {
      if (
        !learningData ||
        sectionIndex < 0 ||
        sectionIndex >= learningData.sections.length
      ) {
        return;
      }

      const section = learningData.sections[sectionIndex];
      setCurrentSectionIndex(sectionIndex);

      setLearningData(prev =>
        prev
          ? {
              ...prev,
              currentSection: section,
              progress: {
                ...prev.progress,
                currentSectionId: section.id,
                lastAccessed: new Date(),
              },
            }
          : null
      );

      // Track section view
      trackInteraction({
        blockId: section.id,
        interactionType: "view",
        metadata: { sectionKey: section.section_key, sectionIndex },
      });
    },
    [learningData]
  );

  // Navigate to next section
  const navigateToNextSection = useCallback(() => {
    if (
      learningData &&
      currentSectionIndex < learningData.sections.length - 1
    ) {
      navigateToSection(currentSectionIndex + 1);
    }
  }, [learningData, currentSectionIndex, navigateToSection]);

  // Navigate to previous section
  const navigateToPreviousSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      navigateToSection(currentSectionIndex - 1);
    }
  }, [currentSectionIndex, navigateToSection]);

  // Mark section as complete
  const markSectionComplete = useCallback(
    async (sectionId: string) => {
      if (!learningData) return;

      // If user is not authenticated, just update local state
      if (!user) {
        const updatedCompletedSections = [
          ...learningData.progress.completedSections,
          sectionId,
        ];
        const overallProgress =
          (updatedCompletedSections.length / learningData.sections.length) *
          100;

        setLearningData(prev =>
          prev
            ? {
                ...prev,
                progress: {
                  ...prev.progress,
                  completedSections: updatedCompletedSections,
                  overallProgress,
                },
              }
            : null
        );
        return;
      }

      try {
        const response = await fetch("/api/user-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            courseId: learningData.course.id,
            sectionId,
            isCompleted: true,
            completionPercentage: 100,
            timeSpent: 0, // This should be calculated from actual time spent
          }),
        });

        if (response.ok) {
          const updatedCompletedSections = [
            ...learningData.progress.completedSections,
            sectionId,
          ];
          const overallProgress =
            (updatedCompletedSections.length / learningData.sections.length) *
            100;

          setLearningData(prev =>
            prev
              ? {
                  ...prev,
                  progress: {
                    ...prev.progress,
                    completedSections: updatedCompletedSections,
                    overallProgress,
                  },
                }
              : null
          );

          // Update progress in user progress hook
          updateProgress(learningData.course.id, {
            status: overallProgress === 100 ? "completed" : "in_progress",
            progressPercent: overallProgress,
            completedSections: updatedCompletedSections,
          });
        }
      } catch (err) {
        console.error("Error marking section complete:", err);
      }
    },
    [learningData, user, updateProgress]
  );

  // Track content interactions
  const trackInteraction = useCallback(
    (interaction: ContentInteraction) => {
      setInteractions(prev => [...prev, interaction]);

      // Send interaction to server
      fetch("/api/content-interactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?.id,
          contentBlockId: interaction.blockId,
          interactionType: interaction.interactionType,
          metadata: interaction.metadata,
        }),
      }).catch(err => console.error("Error tracking interaction:", err));
    },
    [user]
  );

  // Submit quiz answer
  const submitQuizAnswer = useCallback(
    async (questionId: string, userAnswer: string) => {
      if (!learningData) return null;

      // If user is not authenticated, just return the result without saving
      if (!user) {
        const question = learningData.sections
          .flatMap(s => s.questions)
          .find(q => q.id === questionId);

        if (!question) {
          return null;
        }

        const isCorrect = userAnswer === question.correct_answer;
        const attempt: QuizAttempt = {
          questionId,
          userAnswer,
          isCorrect,
          attemptedAt: new Date(),
          timeSpent: 0,
        };

        setQuizAttempts(prev => [...prev, attempt]);

        return {
          isCorrect,
          correctAnswer: question.correct_answer,
          explanation: question.explanation,
        };
      }

      try {
        const question = learningData.sections
          .flatMap(s => s.questions)
          .find(q => q.id === questionId);

        if (!question) {
          throw new Error("Question not found");
        }

        const isCorrect = userAnswer === question.correct_answer;
        const attempt: QuizAttempt = {
          questionId,
          userAnswer,
          isCorrect,
          attemptedAt: new Date(),
          timeSpent: 0, // This should be calculated from actual time spent
        };

        setQuizAttempts(prev => [...prev, attempt]);

        // Send quiz attempt to server
        const response = await fetch("/api/quiz-attempts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user?.id,
            quizQuestionId: questionId,
            userAnswer,
            isCorrect,
            timeSpent: 0,
          }),
        });

        if (!response.ok) {
          console.error("Failed to save quiz attempt");
        }

        return {
          isCorrect,
          correctAnswer: question.correct_answer,
          explanation: question.explanation,
        };
      } catch (err) {
        console.error("Error submitting quiz answer:", err);
        return null;
      }
    },
    [learningData, user]
  );

  // Get quiz results for a section
  const getSectionQuizResults = useCallback(
    (sectionId: string) => {
      const section = learningData?.sections.find(s => s.id === sectionId);
      if (!section) return { total: 0, correct: 0, percentage: 0 };

      const sectionAttempts = quizAttempts.filter(attempt =>
        section.questions.some(q => q.id === attempt.questionId)
      );

      const correct = sectionAttempts.filter(
        attempt => attempt.isCorrect
      ).length;
      const total = section.questions.length;
      const percentage = total > 0 ? (correct / total) * 100 : 0;

      return { total, correct, percentage };
    },
    [learningData, quizAttempts]
  );

  // Check if section is accessible (not locked by prerequisites)
  const isSectionAccessible = useCallback(
    (sectionIndex: number) => {
      if (sectionIndex === 0) return true; // First section is always accessible

      // Check if previous section is completed
      const previousSection = learningData?.sections[sectionIndex - 1];
      if (!previousSection) return false;

      return (
        learningData?.progress.completedSections.includes(previousSection.id) ||
        false
      );
    },
    [learningData]
  );

  useEffect(() => {
    fetchCourseLearningData();
  }, [fetchCourseLearningData]);

  return {
    learningData,
    loading,
    error,
    currentSectionIndex,
    navigateToSection,
    navigateToNextSection,
    navigateToPreviousSection,
    markSectionComplete,
    trackInteraction,
    submitQuizAnswer,
    getSectionQuizResults,
    isSectionAccessible,
    interactions,
    quizAttempts,
    refetch: fetchCourseLearningData,
  };
}
