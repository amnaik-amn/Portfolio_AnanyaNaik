"use client";

import { motion } from "framer-motion";

const filters = [
  { value: "all", label: "All Projects" },
  { value: "architecture", label: "Architecture" },
  { value: "art", label: "Art Projects" },
  { value: "personal", label: "Personal Projects" }
] as const;

interface ProjectFiltersProps {
  activeFilter: (typeof filters)[number]["value"];
  setActiveFilter: (value: (typeof filters)[number]["value"]) => void;
  projectCount: number;
}

export function ProjectFilters({ activeFilter, setActiveFilter, projectCount }: ProjectFiltersProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.3em] text-red/70">
          {projectCount} {projectCount === 1 ? "Project" : "Projects"}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className="relative rounded-full px-5 py-2 text-sm uppercase tracking-[0.2em] transition-colors"
          >
            <span className={activeFilter === filter.value ? "relative z-10 text-red" : "relative z-10 text-dark/50"}>
              {filter.label}
            </span>
            {activeFilter === filter.value && (
              <motion.span
                layoutId="activeFilter"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-red/10 to-blue/10 border border-red/40"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

