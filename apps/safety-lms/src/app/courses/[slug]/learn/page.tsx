"use client";

import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CourseNavigation,
  type CourseModule,
} from "@/components/navigation/course-navigation";
import {
  PlayCircle,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Clock,
  FileText,
} from "lucide-react";
import { useCourses } from "@/hooks/useCourses";

// Mock course modules data
const mockModules: CourseModule[] = [
  {
    id: "module-1",
    title: "Introduction to Chemical Safety",
    description: "Overview of chemical safety fundamentals and key concepts",
    duration: "15 minutes",
    type: "video",
    status: "completed",
    progress: 100,
    href: "/courses/hazmat-function-specific/learn/module-1",
  },
  {
    id: "module-2",
    title: "Chemical Hazard Identification",
    description: "Learn to identify different types of chemical hazards",
    duration: "45 minutes",
    type: "reading",
    status: "completed",
    progress: 100,
    href: "/courses/hazmat-function-specific/learn/module-2",
  },
  {
    id: "module-3",
    title: "Safe Handling Procedures",
    description: "Proper procedures for handling hazardous materials",
    duration: "60 minutes",
    type: "video",
    status: "in_progress",
    progress: 65,
    href: "/courses/hazmat-function-specific/learn/module-3",
  },
  {
    id: "module-4",
    title: "Emergency Response Protocols",
    description: "What to do in case of chemical spills or accidents",
    duration: "30 minutes",
    type: "video",
    status: "available",
    progress: 0,
    href: "/courses/hazmat-function-specific/learn/module-4",
  },
  {
    id: "module-5",
    title: "Chemical Risk Assessments",
    description: "How to conduct thorough risk assessments",
    duration: "45 minutes",
    type: "reading",
    status: "locked",
    progress: 0,
    href: "/courses/hazmat-function-specific/learn/module-5",
  },
  {
    id: "module-6",
    title: "Final Assessment",
    description: "Knowledge check and certification requirements",
    duration: "30 minutes",
    type: "quiz",
    status: "locked",
    progress: 0,
    href: "/courses/hazmat-function-specific/learn/module-6",
  },
];

export default function CourseLearningPage() {
  const params = useParams();
  const router = useRouter();
  const { courses } = useCourses();

  const slug = params.slug as string;
  const course = courses.find(c => c.slug === slug);

  // Calculate overall progress
  const overallProgress = React.useMemo(() => {
    const completedModules = mockModules.filter(
      m => m.status === "completed"
    ).length;
    const inProgressModules = mockModules.filter(
      m => m.status === "in_progress"
    ).length;
    const totalModules = mockModules.length;

    const completedProgress = (completedModules / totalModules) * 100;
    const inProgressProgress = (inProgressModules / totalModules) * 50; // Assume 50% for in-progress

    return completedProgress + inProgressProgress;
  }, []);

  if (!course) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2 text-neutral-900 dark:text-neutral-100">
          Course Not Found
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-4">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Course Navigation Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <CourseNavigation
            courseTitle={course.title}
            modules={mockModules}
            currentModuleId="module-3"
            overallProgress={overallProgress}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-8">
        {/* Course Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Current Module Content */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <PlayCircle className="h-6 w-6 text-primary-600" />
                <div>
                  <CardTitle className="text-neutral-900 dark:text-neutral-100">
                    Safe Handling Procedures
                  </CardTitle>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    Module 3 of 6 • Video • 60 minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
                <Clock className="h-4 w-4" />
                <span>45 minutes remaining</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Module Progress
                </span>
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  65%
                </span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            {/* Video Player Placeholder */}
            <div className="aspect-video bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="h-16 w-16 text-neutral-400 dark:text-neutral-500 mx-auto mb-4" />
                <p className="text-neutral-600 dark:text-neutral-400">
                  Video player would be embedded here
                </p>
              </div>
            </div>

            {/* Module Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  Learning Objectives
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-accent-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Understand proper PPE requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-accent-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Learn safe lifting and carrying techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-accent-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      Identify proper storage and labeling procedures
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-neutral-900 dark:text-neutral-100">
                  Key Topics Covered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Personal Protective Equipment
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Safe Handling Techniques
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Storage Requirements
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Labeling and Documentation
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Transportation Safety
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-primary-600" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        Cleanup Procedures
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-neutral-200 dark:border-neutral-700">
              <Button
                variant="outline"
                disabled={true} // Previous module completed
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Module
              </Button>

              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Take Notes
                </Button>
                <Button className="flex items-center gap-2">
                  Mark Complete
                  <CheckCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
