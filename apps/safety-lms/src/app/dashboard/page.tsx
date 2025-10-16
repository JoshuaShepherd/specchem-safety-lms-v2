"use client";

import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const {
    user,
    profile,
    isAuthenticated,
    getFullName,
    getRole,
    getPermissions,
  } = useUser();
  const { signOut } = useAuth();

  if (!isAuthenticated()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Loading...
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we load your dashboard.
          </p>
        </div>
      </div>
    );
  }

  const permissions = getPermissions();

  return (
    <div className="space-y-section-normal">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome back, {getFullName()}!
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-card rounded-lg shadow p-component-normal">
        <h2 className="text-xl font-semibold text-card-foreground mb-component-normal">
          Account Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-component-normal">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="text-card-foreground font-medium">{getFullName()}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="text-card-foreground font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="text-card-foreground font-medium capitalize">
              {getRole()}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Plant</p>
            <p className="text-card-foreground font-medium">
              {profile?.plant_id || "Not assigned"}
            </p>
          </div>
        </div>
      </div>

      {/* Permissions Card */}
      {permissions && (
        <div className="bg-card rounded-lg shadow p-component-normal">
          <h2 className="text-xl font-semibold text-card-foreground mb-component-normal">
            Your Permissions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-component-normal">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canManageUsers ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">Manage Users</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canManageCourses ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">Manage Courses</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canManagePlants ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">Manage Plants</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canViewReports ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">View Reports</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canManageEnrollments ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">Manage Enrollments</span>
            </div>
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-3 ${permissions.canViewAllData ? "bg-green-500" : "bg-muted"}`}
              ></div>
              <span className="text-card-foreground">View All Data</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-card rounded-lg shadow p-component-normal">
        <h2 className="text-xl font-semibold text-card-foreground mb-component-normal">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-component-normal">
          <a
            href="/courses"
            className="bg-primary-500 hover:bg-primary-600 text-primary-foreground p-component-normal rounded-lg text-center transition-colors"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-medium">View Courses</div>
          </a>
          {permissions?.canViewReports && (
            <a
              href="/reports"
              className="bg-semantic-success-600 hover:bg-semantic-success-700 text-white p-component-normal rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">View Reports</div>
            </a>
          )}
          {permissions?.canManageUsers && (
            <a
              href="/users"
              className="bg-secondary-darkBlue-600 hover:bg-secondary-darkBlue-700 text-white p-component-normal rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">👥</div>
              <div className="font-medium">Manage Users</div>
            </a>
          )}
          {permissions?.canManagePlants && (
            <a
              href="/plants"
              className="bg-semantic-warning-600 hover:bg-semantic-warning-700 text-white p-component-normal rounded-lg text-center transition-colors"
            >
              <div className="text-2xl mb-2">🏭</div>
              <div className="font-medium">Manage Plants</div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
