import {
  type ElementType,
  type ReactNode,
} from "react";
import {
  LayoutDashboard,
  Brain,
  Bot,
  FileText,
  Briefcase,
  BarChart3,
  TrendingUp,
  MessageSquare,
  Bell,
  FolderOpen,
  Shield,
  Sparkles,
  Home,
  User,
  Settings,
  CheckSquare,
  Calendar,
  MessageCircleQuestion,
  GraduationCap,
  Activity,
  Route,
  Compass,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon | ElementType;
  href?: string;
  badge?: string | number;
  children?: NavItem[];
  disabled?: boolean;
  module?: string;
}

export interface NavGroup {
  label?: string;
  items: NavItem[];
}

export const SIDEBAR_NAV: NavGroup[] = [
  {
    items: [
      {
        label: "Home",
        icon: Home,
        href: "/",
        module: "landing",
      },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        module: "dashboard",
      },
      {
        label: "Tasks",
        icon: CheckSquare,
        href: "/dashboard/tasks",
        module: "tasks",
      },
      {
        label: "Goals",
        icon: Target,
        href: "/dashboard/goals",
        module: "goals",
      },
      {
        label: "Learning",
        icon: GraduationCap,
        href: "/dashboard/learning",
        module: "learning",
      },
      {
        label: "Roadmap",
        icon: Route,
        href: "/dashboard/roadmap",
        module: "roadmap",
      },
      {
        label: "Skills",
        icon: Activity,
        href: "/dashboard/skills",
        module: "skills",
      },
      {
        label: "Calendar",
        icon: Calendar,
        href: "/dashboard/calendar",
        module: "calendar",
      },
      {
        label: "Interviews",
        icon: MessageCircleQuestion,
        href: "/dashboard/interviews",
        module: "interviews",
      },
      {
        label: "AI Workspace",
        icon: Brain,
        href: "/ai",
        module: "ai-workspace",
        children: [
          { label: "Chat", icon: MessageSquare, href: "/ai/chat", disabled: true },
          { label: "Assistants", icon: Sparkles, href: "/dashboard/ai-assistants" },
          { label: "Agents", icon: Bot, href: "/ai/agents", disabled: true },
        ],
      },
      {
        label: "CV Intelligence",
        icon: FileText,
        href: "/cv",
        module: "cv",
        children: [
          { label: "CV Builder", icon: FileText, href: "/dashboard/cv-builder" },
          { label: "My CVs", icon: FolderOpen, href: "/cv/list", disabled: true },
          { label: "Analysis", icon: BarChart3, href: "/dashboard/cv-analysis" },
        ],
      },
      {
        label: "Jobs",
        icon: Briefcase,
        href: "/dashboard/jobs",
        module: "jobs",
        children: [
          { label: "Job Search", icon: Briefcase, href: "/dashboard/jobs" },
          { label: "Applications", icon: FolderOpen, href: "/dashboard/applications" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    items: [
      {
        label: "Analytics",
        icon: BarChart3,
        href: "/dashboard/analytics",
        module: "analytics",
      },
      {
        label: "Career",
        icon: TrendingUp,
        href: "/dashboard/career-progress",
        module: "career",
      },
      {
        label: "Coach",
        icon: Compass,
        href: "/dashboard/coach",
        module: "coach",
      },
    ],
  },
  {
    label: "Communication",
    items: [
      {
        label: "Messages",
        icon: MessageSquare,
        href: "/messages",
        module: "messaging",
        badge: 3,
      },
      {
        label: "Notifications",
        icon: Bell,
        href: "/dashboard/notifications",
        module: "notifications",
        badge: 12,
      },
    ],
  },
  {
    label: "Management",
    items: [
      {
        label: "Profile",
        icon: User,
        href: "/dashboard/profile",
        module: "profile",
      },
      {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        module: "settings",
      },
      {
        label: "Documents",
        icon: FolderOpen,
        href: "/dashboard/documents",
        module: "documents",
      },
      {
        label: "Admin",
        icon: Shield,
        href: "/admin",
        module: "admin",
      },
    ],
  },
];
