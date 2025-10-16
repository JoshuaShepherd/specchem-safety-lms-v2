import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
            <span className="text-sm font-bold text-white">SC</span>
          </div>
          <span className="text-xl font-bold text-neutral-900">
            SpecChem Safety
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Home
          </a>
          <a
            href="/courses"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Courses
          </a>
          <a
            href="/instructors"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Instructors
          </a>
          <a
            href="/about"
            className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            About
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button size="sm" className="px-6">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
