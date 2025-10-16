"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookOpen,
  BarChart3,
  Users,
  Settings,
  Building2,
  FileText,
  HelpCircle,
  LogOut,
  Menu,
  GraduationCap,
  TrendingUp,
  Shield,
  UserCheck,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";

// Navigation items based on actual database schema
const navigationItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview and analytics",
    roles: ["admin", "manager", "user"],
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
    description: "Safety training courses",
    roles: ["admin", "manager", "user"],
  },
  {
    name: "My Progress",
    href: "/progress",
    icon: TrendingUp,
    description: "Track your learning progress",
    roles: ["user"],
  },
  {
    name: "Enrollments",
    href: "/enrollments",
    icon: GraduationCap,
    description: "Manage course enrollments",
    roles: ["admin", "manager"],
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    description: "User management",
    roles: ["admin", "manager"],
  },
  {
    name: "Plants",
    href: "/plants",
    icon: Building2,
    description: "Facility management",
    roles: ["admin"],
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    description: "Compliance and analytics",
    roles: ["admin", "manager"],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
    description: "System configuration",
    roles: ["admin"],
  },
];

interface MainNavProps {
  className?: string;
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname();
  const {
    user,
    profile,
    getFullName,
    getRole,
    getPermissions,
    isAuthenticated,
  } = useUser();
  const { signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  // Don't render navigation if user is not authenticated
  if (!isAuthenticated()) {
    return null;
  }

  const userRole = getRole();
  const permissions = getPermissions();

  // Filter navigation items based on user role
  const filteredNavigation = navigationItems.filter(item =>
    item.roles.includes(userRole || "user")
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      admin: "Administrator",
      manager: "Manager",
      user: "Employee",
    };
    return roleMap[role] || role;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav
      className={cn(
        "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50",
        className
      )}
    >
      <div className="container mx-auto px-container-mobile sm:px-container-tablet lg:px-container-desktop">
        <div className="flex h-navigation-desktop mobile:h-navigation-mobile items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-inline-normal">
            <Link
              href="/dashboard"
              className="flex items-center gap-inline-tight"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-5 w-5" />
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-semibold">SpecChem Safety</div>
                <div className="text-xs text-muted-foreground">
                  Learning Management System
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-navigation-group">
            {filteredNavigation.map(item => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center gap-navigation-item px-navigation-item",
                      isActive && "bg-accent text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden xl:inline">{item.name}</span>
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-inline-tight">
            {/* User Role Badge */}
            {userRole && (
              <div className="hidden md:flex items-center gap-inline-tight px-component-tight py-1 rounded-md bg-muted/50">
                <UserCheck className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {getRoleDisplayName(userRole)}
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="" alt={getFullName()} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getFullName() ? getInitials(getFullName()) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {getFullName()}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                    {userRole && (
                      <p className="text-xs leading-none text-muted-foreground">
                        {getRoleDisplayName(userRole)}
                      </p>
                    )}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/help" className="flex items-center">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="flex items-center text-destructive cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    SpecChem Safety LMS
                  </SheetTitle>
                </SheetHeader>

                {/* User Info */}
                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={getFullName()} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getFullName() ? getInitials(getFullName()) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {getFullName()}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </p>
                      {userRole && (
                        <p className="text-xs text-muted-foreground">
                          {getRoleDisplayName(userRole)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="mt-section-tight space-y-stack-tight">
                  {filteredNavigation.map(item => {
                    const isActive =
                      pathname === item.href ||
                      pathname.startsWith(item.href + "/");
                    return (
                      <Link key={item.name} href={item.href}>
                        <Button
                          variant={isActive ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start gap-inline-relaxed h-12",
                            isActive && "bg-accent text-accent-foreground"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className="h-5 w-5" />
                          <div className="flex flex-col items-start">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile Actions */}
                <div className="mt-section-normal space-y-stack-tight">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-inline-relaxed"
                    asChild
                  >
                    <Link href="/profile">
                      <Settings className="h-4 w-4" />
                      Profile Settings
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-inline-relaxed"
                    asChild
                  >
                    <Link href="/help">
                      <HelpCircle className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-inline-relaxed text-destructive hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
