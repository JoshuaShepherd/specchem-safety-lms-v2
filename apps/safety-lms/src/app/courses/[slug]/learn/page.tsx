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
      <div className="text-center py-section-loose">
        <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-component-normal" />
        <h3 className="text-lg font-medium mb-2">Course Not Found</h3>
        <p className="text-muted-foreground mb-component-normal">
          The course you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/courses")}>Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-grid-relaxed">
      {/* Course Navigation Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-section-normal">
          <CourseNavigation
            courseTitle={course.title}
            modules={mockModules}
            currentModuleId="module-3"
            overallProgress={overallProgress}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3 space-y-section-tight">
        {/* Course Header */}
        <div className="flex items-center gap-inline-normal mb-component-normal">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-inline-tight"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </div>

        {/* Current Module Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-inline-normal">
                <PlayCircle className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle>Safe Handling Procedures</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Module 3 of 6 • Video • 60 minutes
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-inline-relaxed text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>45 minutes remaining</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-component-normal">
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Module Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>

            {/* Video Player Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PlayCircle className="h-16 w-16 text-muted-foreground mx-auto mb-component-tight" />
                <p className="text-muted-foreground">
                  Video player would be embedded here
                </p>
              </div>
            </div>

            {/* Module Content */}
            <div className="space-y-component-normal">
              <div>
                <h3 className="text-lg font-semibold mb-component-tight">
                  Learning Objectives
                </h3>
                <ul className="space-y-stack-tight">
                  <li className="flex items-start gap-inline-relaxed">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Understand proper PPE requirements
                    </span>
                  </li>
                  <li className="flex items-start gap-inline-relaxed">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Learn safe lifting and carrying techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-inline-relaxed">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">
                      Identify proper storage and labeling procedures
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-component-tight">
                  Key Topics Covered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-component-normal">
                  <div className="space-y-stack-tight">
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Personal Protective Equipment
                      </span>
                    </div>
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Safe Handling Techniques
                      </span>
                    </div>
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Storage Requirements
                      </span>
                    </div>
                  </div>
                  <div className="space-y-stack-tight">
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Labeling and Documentation
                      </span>
                    </div>
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Transportation Safety
                      </span>
                    </div>
                    <div className="flex items-center gap-inline-tight">
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">
                        Cleanup Procedures
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-component-normal border-t">
              <Button
                variant="outline"
                disabled={true} // Previous module completed
                className="flex items-center gap-inline-tight"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Module
              </Button>

              <div className="flex items-center gap-inline-normal">
                <Button
                  variant="outline"
                  className="flex items-center gap-inline-tight"
                >
                  <FileText className="h-4 w-4" />
                  Take Notes
                </Button>
                <Button className="flex items-center gap-inline-tight">
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
