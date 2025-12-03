"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { listProjectsByType } from "@/data/api";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { Loader2 } from "lucide-react";

const copy = {
  architecture: {
    title: "Architecture",
    description: "Spaces that inspire"
  },
  art: {
    title: "Art Projects",
    description: "Creative expressions and artistic explorations"
  },
  personal: {
    title: "Personal Projects",
    description: "Passion projects and experimental work"
  }
} as const;

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const type = params.slug as keyof typeof copy;
  const meta = copy[type];

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects", type],
    queryFn: () => listProjectsByType(type),
    enabled: Boolean(meta)
  });

  if (!meta) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <p className="mb-6 text-lg opacity-70">Category not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-bg text-paper-text dark:bg-ink-bg dark:text-ink-text">
      {/* Hero (seamless white / theme background) */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 text-7xl font-extrabold tracking-tight md:text-[10rem]"
          >
            {meta.title}.
          </motion.h1>
          {meta.description && (
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="mx-auto max-w-2xl text-base font-medium uppercase tracking-[0.25em] text-paper-text-muted dark:text-ink-text-muted md:text-lg"
            >
              {meta.description}
            </motion.p>
          )}

          {/* Architecture preview strip: show up to 5 project images individually */}
          {type === "architecture" && projects.length > 0 && (
            <div className="mt-8">
              <div className="mx-auto max-w-4xl overflow-x-auto py-4 px-2">
                <div className="flex items-stretch gap-6">
                  {projects.slice(0, 5).map((p) => (
                    <div
                      key={p.id}
                      className="relative h-44 w-64 flex-shrink-0 overflow-hidden rounded-2xl border border-paper-line shadow-lg"
                    >
                      <Image
                        src={p.cover_image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 45vw, 16rem"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          {isLoading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="h-8 w-8 animate-spin opacity-60" />
            </div>
          ) : projects.length === 0 ? (
            <div className="py-32 text-center">
              <p className="mb-6 text-lg font-light opacity-70">No projects yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {projects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

