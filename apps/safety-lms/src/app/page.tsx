import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { CourseCard } from "@/components/course/CourseCard";
import { CategoryCard } from "@/components/course/CategoryCard";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  Users,
  BookOpen,
  Code,
  Palette,
  Camera,
  BarChart3,
  DollarSign,
  Leaf,
  Star,
} from "lucide-react";

export default function HomePage() {
  const stats = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      value: "10k+",
      label: "Total Courses",
      description: "Comprehensive safety training",
    },
    {
      icon: <Users className="h-8 w-8" />,
      value: "500+",
      label: "Expert Instructors",
      description: "Industry professionals",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      value: "300k+",
      label: "Students Globally",
      description: "Worldwide safety training",
    },
  ];

  const courses = [
    {
      title: "HazMat Function-Specific Training",
      description: "Handling, Packaging, and Shipping DOT-Regulated Materials",
      instructor: "Dr. Sarah Johnson",
      rating: 4.9,
      studentCount: 1250,
      duration: "2 hours",
      price: "$149.00",
      thumbnail: "/placeholder-course-1.jpg",
      category: "Safety Training",
      level: "Intermediate" as const,
      isPopular: true,
    },
    {
      title: "OSHA Compliance Fundamentals",
      description:
        "Essential workplace safety regulations and compliance requirements",
      instructor: "Mike Rodriguez",
      rating: 4.8,
      studentCount: 890,
      duration: "1.5 hours",
      price: "$99.00",
      thumbnail: "/placeholder-course-2.jpg",
      category: "Compliance",
      level: "Beginner" as const,
      isNew: true,
    },
    {
      title: "Emergency Response Procedures",
      description: "Critical emergency protocols for industrial environments",
      instructor: "Lisa Chen",
      rating: 4.9,
      studentCount: 650,
      duration: "3 hours",
      price: "$199.00",
      thumbnail: "/placeholder-course-3.jpg",
      category: "Emergency Response",
      level: "Advanced" as const,
    },
  ];

  const categories = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Design & Development",
      courseCount: 250,
      description: "Technical skills and software development",
      color: "blue" as const,
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Marketing & Communication",
      courseCount: 300,
      description: "Brand management and communication strategies",
      color: "purple" as const,
    },
    {
      icon: <Camera className="h-6 w-6" />,
      title: "Digital Marketing",
      courseCount: 150,
      description: "Online marketing and digital strategies",
      color: "orange" as const,
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Business & Consulting",
      courseCount: 170,
      description: "Business strategy and consulting skills",
      color: "red" as const,
    },
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: "Finance Management",
      courseCount: 300,
      description: "Financial planning and management",
      color: "green" as const,
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      title: "Self Development",
      courseCount: 50,
      description: "Personal growth and skill development",
      color: "yellow" as const,
    },
  ];

  const testimonials = [
    {
      quote: "Great platform",
      author: "Joe Root",
      role: "Safety Manager",
      avatar: "/placeholder-avatar-1.jpg",
      rating: 5,
      isActive: true,
    },
    {
      quote: "Excellent course content and delivery",
      author: "Kyle Mayers",
      role: "Plant Supervisor",
      avatar: "/placeholder-avatar-2.jpg",
      rating: 5,
    },
    {
      quote: "Very comprehensive training",
      author: "Gudakesh Motie",
      role: "Operations Manager",
      avatar: "/placeholder-avatar-3.jpg",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <HeroSection
          title="Getting Quality Safety Education Is Now More Easy"
          subtitle="Professional Training"
          description="Provides you with the latest online learning system and material that help your safety knowledge growing."
          primaryAction={{
            label: "Get Started",
            href: "/courses",
          }}
          secondaryAction={{
            label: "Get Free Trial",
            href: "/trial",
          }}
          stats={stats}
        />

        {/* Statistics Section */}
        <StatsSection stats={stats} />

        {/* Popular Courses Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl mb-4">
                Popular courses for you
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Get the best course with the best price with world-class
                instructors
              </p>
              <Button variant="outline" className="px-8">
                See All Courses
              </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 lg:py-24 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl mb-4">
                What our students are saying about us
              </h2>
              <p className="text-lg text-neutral-600">
                You learn today and earn tomorrow. The roots of education are
                bitter but the fruits are sweet.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl mb-4">
                Explore courses by category
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Browse top class courses by browsing our category which will be
                more easy for you.
              </p>
              <Button variant="outline" className="px-8">
                All Categories
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <CategoryCard key={index} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold text-neutral-900 lg:text-4xl mb-4">
                Subscribe Newsletter
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                You learn today and earn tomorrow. The roots of education are
                bitter but the fruits are sweet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="flex-1"
                />
                <Button className="px-8">Subscribe</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
