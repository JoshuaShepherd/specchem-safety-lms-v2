import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">SC</span>
              </div>
              <span className="text-xl font-bold">SpecChem Safety</span>
            </div>
            <p className="text-sm text-neutral-400">
              Professional safety training for industrial environments. Ensuring
              compliance and protecting your workforce.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons placeholder */}
              <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-xs">f</span>
              </div>
              <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-xs">t</span>
              </div>
              <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-xs">i</span>
              </div>
              <div className="h-8 w-8 rounded bg-neutral-800 flex items-center justify-center">
                <span className="text-xs">l</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Links</h3>
            <div className="space-y-2">
              <a
                href="/"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                About Us
              </a>
              <a
                href="/process"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Our Process
              </a>
              <a
                href="/services"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Services
              </a>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <div className="space-y-2">
              <a
                href="/premium"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Go Premium
              </a>
              <a
                href="/teams"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Team Plans
              </a>
              <a
                href="/refer"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Refer a Friend
              </a>
              <a
                href="/gift"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Gift Cards
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-2">
              <a
                href="/support"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Support
              </a>
              <a
                href="/updates"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Latest Updates
              </a>
              <a
                href="/newsletter"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Newsletter
              </a>
              <a
                href="/management"
                className="block text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Management
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-neutral-400">
              Copyright © 2024 SpecChem Safety. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
