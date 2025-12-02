"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ProjectFilters } from "@/components/portfolio/ProjectFilters";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { listProjects } from "@/data/api";

const heroImage =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&auto=format&fit=crop&q=80";

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "architecture" | "art" | "personal">("all");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => listProjects("-created")
  });

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.project_type === activeFilter);

  return (
    <div className="min-h-screen">
      <section className="relative flex h-[60vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red/10 via-blue/10 to-yellow/10" />
        <div className="absolute inset-0 opacity-20">
          <img src={heroImage} alt="Portfolio background" className="h-full w-full object-cover" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-5xl font-light tracking-tight text-dark md:text-7xl"
          >
            All Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg font-light tracking-wide text-dark/70 md:text-xl"
          >
            Browse through all work across categories
          </motion.p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <ProjectFilters
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          projectCount={filteredProjects.length}
        />
      </div>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 className="h-8 w-8 animate-spin text-blue" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-lg font-light text-dark/60">No projects found. Add new work to see it listed here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
}

