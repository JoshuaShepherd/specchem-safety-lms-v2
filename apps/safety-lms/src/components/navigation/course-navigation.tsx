"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Lock,
  PlayCircle,
  Clock,
  FileText,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  type: "video" | "reading" | "quiz" | "assignment";
  status: "locked" | "available" | "in_progress" | "completed";
  progress?: number;
  href: string;
}

export interface CourseNavigationProps {
  courseTitle: string;
  modules: CourseModule[];
  currentModuleId?: string;
  overallProgress?: number;
  className?: string;
}

const getModuleIcon = (type: CourseModule["type"]) => {
  switch (type) {
    case "video":
      return PlayCircle;
    case "reading":
      return FileText;
    case "quiz":
      return FileText;
    case "assignment":
      return FileText;
    default:
      return FileText;
  }
};

const getStatusIcon = (status: CourseModule["status"]) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "locked":
      return Lock;
    default:
      return null;
  }
};

const getStatusColor = (status: CourseModule["status"]) => {
  switch (status) {
    case "completed":
      return "text-green-500";
    case "in_progress":
      return "text-blue-500";
    case "locked":
      return "text-muted-foreground";
    default:
      return "text-muted-foreground";
  }
};

export function CourseNavigation({
  courseTitle,
  modules,
  currentModuleId,
  overallProgress = 0,
  className,
}: CourseNavigationProps) {
  const pathname = usePathname();
  const currentIndex = modules.findIndex(m => m.id === currentModuleId);

  const previousModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule =
    currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <div className={cn("space-y-component-normal", className)}>
      {/* Course Header */}
      <div className="space-y-stack-tight">
        <h2 className="text-lg font-semibold text-foreground line-clamp-2">
          {courseTitle}
        </h2>
        <div className="space-y-1">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </div>

      {/* Module Navigation */}
      <div className="space-y-stack-tight">
        <h3 className="text-sm font-medium text-foreground">Course Modules</h3>
        <nav className="space-y-stack-tight">
          {modules.map((module, index) => {
            const Icon = getModuleIcon(module.type);
            const StatusIcon = getStatusIcon(module.status);
            const isActive = module.id === currentModuleId;
            const isDisabled = module.status === "locked";

            return (
              <div key={module.id} className="relative">
                <Link
                  href={isDisabled ? "#" : module.href}
                  className={cn(
                    "flex items-center gap-inline-normal p-component-tight rounded-lg transition-colors",
                    "hover:bg-muted/50",
                    isActive && "bg-accent text-accent-foreground",
                    isDisabled && "cursor-not-allowed opacity-60"
                  )}
                  onClick={e => isDisabled && e.preventDefault()}
                >
                  <div className="flex items-center gap-inline-tight flex-1 min-w-0">
                    <div
                      className={cn(
                        "flex-shrink-0",
                        getStatusColor(module.status)
                      )}
                    >
                      {StatusIcon ? (
                        <StatusIcon className="h-4 w-4" />
                      ) : (
                        <Icon className="h-4 w-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-inline-tight">
                        <span className="text-xs text-muted-foreground">
                          {index + 1}
                        </span>
                        <p
                          className={cn(
                            "text-sm font-medium truncate",
                            isActive && "text-accent-foreground"
                          )}
                        >
                          {module.title}
                        </p>
                      </div>

                      {module.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                          {module.description}
                        </p>
                      )}

                      <div className="flex items-center gap-inline-relaxed mt-1">
                        {module.duration && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {module.duration}
                          </div>
                        )}

                        {module.progress !== undefined &&
                          module.progress > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>{module.progress}%</span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>

                  {module.progress !== undefined &&
                    module.progress > 0 &&
                    module.progress < 100 && (
                      <div className="flex-shrink-0 w-16">
                        <Progress value={module.progress} className="h-1" />
                      </div>
                    )}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-component-normal border-t">
        <Button
          variant="outline"
          size="sm"
          disabled={!previousModule || previousModule.status === "locked"}
          asChild={
            previousModule && previousModule.status !== "locked" ? true : false
          }
          className="flex items-center gap-inline-tight"
        >
          {previousModule && previousModule.status !== "locked" ? (
            <Link href={previousModule.href}>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Link>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              Previous
            </>
          )}
        </Button>

        <Button
          variant="default"
          size="sm"
          disabled={!nextModule || nextModule.status === "locked"}
          asChild={nextModule && nextModule.status !== "locked" ? true : false}
          className="flex items-center gap-inline-tight"
        >
          {nextModule && nextModule.status !== "locked" ? (
            <Link href={nextModule.href}>
              Next
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <>
              Next
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
