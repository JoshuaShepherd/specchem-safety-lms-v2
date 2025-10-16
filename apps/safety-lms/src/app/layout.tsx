import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { MainNav } from "@/components/navigation/main-nav";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import type { ReactNode } from "react";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "SpecChem Safety LMS",
  description:
    "SpecChem Safety Learning Management System - Comprehensive safety training for industrial excellence",
  keywords: [
    "safety",
    "training",
    "LMS",
    "SpecChem",
    "industrial",
    "compliance",
  ],
  authors: [{ name: "SpecChem" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <MainNav />
            <div className="border-b">
              <div className="container mx-auto px-container-mobile sm:px-container-tablet lg:px-container-desktop">
                <Breadcrumb className="py-component-tight" />
              </div>
            </div>
            <main className="container mx-auto px-container-mobile sm:px-container-tablet lg:px-container-desktop py-section-normal">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
