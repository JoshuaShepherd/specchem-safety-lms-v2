import React from "react";

interface ImagePlaceholderProps {
  width: number;
  height: number;
  alt: string;
  className?: string;
  icon?: React.ReactNode;
  label?: string;
}

export function ImagePlaceholder({
  width,
  height,
  alt,
  className = "",
  icon,
  label,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <div className="text-center text-neutral-500">
        {icon && <div className="text-4xl mb-2">{icon}</div>}
        <div className="text-sm font-medium">{label || alt}</div>
        <div className="text-xs">Placeholder</div>
      </div>
    </div>
  );
}

// Specific placeholder components
export function HeroIllustrationPlaceholder() {
  return (
    <ImagePlaceholder
      width={400}
      height={400}
      alt="Student with books illustration"
      icon="📚"
      label="Hero Illustration"
      className="rounded-full"
    />
  );
}

export function CourseThumbnailPlaceholder({
  courseType,
}: {
  courseType: string;
}) {
  const icons = {
    safety: "🛡️",
    compliance: "📋",
    emergency: "🚨",
    technical: "⚙️",
    management: "👔",
    default: "💻",
  };

  return (
    <ImagePlaceholder
      width={300}
      height={200}
      alt={`${courseType} course thumbnail`}
      icon={icons[courseType as keyof typeof icons] || icons.default}
      label={`${courseType} Course`}
      className="rounded-lg"
    />
  );
}

export function AvatarPlaceholder({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map(n => n[0])
    .join("");

  return (
    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
      <span className="text-sm font-semibold text-primary-600">{initials}</span>
    </div>
  );
}

export function CategoryIconPlaceholder({ category }: { category: string }) {
  const icons = {
    design: "🎨",
    marketing: "📢",
    business: "📊",
    finance: "💰",
    development: "💻",
    safety: "🛡️",
    default: "📚",
  };

  return (
    <div className="h-12 w-12 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white">
      <span className="text-xl">
        {icons[category.toLowerCase() as keyof typeof icons] || icons.default}
      </span>
    </div>
  );
}

export function StatsIconPlaceholder({ statType }: { statType: string }) {
  const icons = {
    courses: "📚",
    instructors: "👨‍🏫",
    students: "👥",
    certificates: "🏆",
    default: "📊",
  };

  return (
    <div className="h-16 w-16 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center">
      <span className="text-2xl">
        {icons[statType.toLowerCase() as keyof typeof icons] || icons.default}
      </span>
    </div>
  );
}
