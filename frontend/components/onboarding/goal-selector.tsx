"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Briefcase,
  Compass,
  GraduationCap,
  type LucideIcon,
  Rocket,
  Users,
} from "lucide-react";

import { Badge } from "@/components/foundation/badge";
import { Card } from "@/components/foundation/card";
import { cn } from "@/lib/utils";

interface GoalOption {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

const GOALS: GoalOption[] = [
  {
    id: "advance",
    icon: ArrowUpRight,
    title: "Advance my career",
    description: "Get promoted or move to a senior role in my current field",
    badge: "Popular",
  },
  {
    id: "switch",
    icon: Compass,
    title: "Switch industries",
    description: "Pivot to a new industry or role I'm passionate about",
  },
  {
    id: "first-job",
    icon: GraduationCap,
    title: "Find my first job",
    description: "Land my first professional role after school or training",
    badge: "New grad",
  },
  {
    id: "freelance",
    icon: Rocket,
    title: "Start freelancing",
    description: "Build a freelance career with flexible opportunities",
  },
  {
    id: "leadership",
    icon: Users,
    title: "Move into leadership",
    description: "Transition from individual contributor to management",
  },
  {
    id: "explore",
    icon: Briefcase,
    title: "Explore opportunities",
    description: "Keep an open mind and see what's out there",
  },
];

interface GoalSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function GoalSelector({ value, onChange, className }: GoalSelectorProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-3", className)}>
      {GOALS.map((goal, index) => {
        const Icon = goal.icon;
        const isSelected = value === goal.id;

        return (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <Card
              variant={isSelected ? "elevated" : "interactive"}
              padding="md"
              className={cn(
                "relative h-full transition-all duration-normal",
                isSelected && "ring-2 ring-primary shadow-medium"
              )}
              onClick={() => onChange(goal.id)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(goal.id);
                }
              }}
            >
              {goal.badge && (
                <Badge
                  variant="primary"
                  size="xs"
                  className="absolute top-3 right-3"
                >
                  {goal.badge}
                </Badge>
              )}
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg mb-3 transition-colors duration-normal",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-label font-semibold text-primary mb-1">
                {goal.title}
              </h3>
              <p className="text-body-small text-secondary">
                {goal.description}
              </p>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
