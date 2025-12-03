"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@/data/api";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Calendar, MapPin, Maximize2, User, Landmark } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { GeometricLines } from "@/components/ui/GeometricLines";
import { InPageIndex } from "@/components/ui/InPageIndex";

export default function ProjectViewPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const {
    data: project,
    isLoading
  } = useQuery({
    queryKey: ["project", params.id],
    queryFn: () => getProjectById(params.id)
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-bg text-paper-text dark:bg-ink-bg dark:text-ink-text">
        <Loader2 className="h-10 w-10 animate-spin opacity-60" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-paper-bg text-paper-text dark:bg-ink-bg dark:text-ink-text text-center">
        <p className="text-lg font-light opacity-80">Project not found</p>
        <Button variant="outline" onClick={() => router.push("/portfolio")}>
          Back to Portfolio
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper-bg text-paper-text dark:bg-ink-bg dark:text-ink-text">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-8">
        <Button variant="invert" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      {/* Intro section: full page with title + description over cover image, geometric lines */}
      <section id="overview" className="relative mx-auto mb-20 max-w-7xl px-8 scroll-mt-28">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <div className="relative h-[70vh] overflow-hidden rounded-2xl border border-paper-line dark:border-ink-line">
            {/* Use the project-specific cover for the project list, but prefer a dedicated hero
                image for arch-01 (prednerp1_copy) on the project detail page only. */}
            <Image
              src={project.id === "arch-01" ? "/images/prednerp1_copy.png" : (project.cover_image ?? "/images/renderp1.jpg")}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-paper-bg/80 to-paper-bg/10 dark:from-ink-bg/85 dark:to-ink-bg/20" />
            <div className="relative z-10 flex h-full items-end p-10 md:p-14">
              <div className="max-w-3xl">
                <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
                  {(() => {
                    const words = project.title.split(/\s+/);
                    return (
                      <span>
                        {words.map((word, i) => {
                          if (!word) return null;
                          const first = word.charAt(0);
                          const rest = word.slice(1).toLowerCase();
                          const large = i === 1 || i === 2;
                          return (
                            <span key={i} className="mr-[4px]">
                              <span className={large ? "cap-initial" : undefined}>{first}</span>
                              <span className="small-caps">{rest}</span>
                            </span>
                          );
                        })}
                      </span>
                    );
                  })()}
                </h1>
                {project.category && (
                  <p className="text-base uppercase tracking-[0.3em] text-paper-text-muted dark:text-ink-text-muted md:text-lg">
                    {project.category.replace(/_/g, " ")}
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Meta + origin/partners */}
      <section className="mx-auto mb-20 max-w-7xl px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-24 rounded-xl border border-paper-line bg-paper-surface p-6 dark:border-ink-line dark:bg-ink-surface"
          >
            <h3 className="mb-4 text-xs uppercase tracking-[0.3em] text-paper-text-muted dark:text-ink-text-muted">
              Project Details
            </h3>
            <div className="space-y-5 text-sm text-paper-text-muted dark:text-ink-text-muted">
              {project.category && (
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] opacity-70">Category</p>
                  <p className="capitalize text-paper-text dark:text-ink-text">{project.category.replace(/_/g, " ")}</p>
                </div>
              )}
              {project.location && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 opacity-60" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">Location</p>
                    <p className="text-paper-text dark:text-ink-text">{project.location}</p>
                  </div>
                </div>
              )}
              {project.year && (
                <div className="flex items-start gap-3">
                  <Calendar className="mt-1 h-4 w-4 opacity-60" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">Year</p>
                    <p className="text-paper-text dark:text-ink-text">{project.year}</p>
                  </div>
                </div>
              )}
              {project.area && (
                <div className="flex items-start gap-3">
                  <Maximize2 className="mt-1 h-4 w-4 opacity-60" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">Area</p>
                    <p className="text-paper-text dark:text-ink-text">{project.area}</p>
                  </div>
                </div>
              )}
              {project.client && (
                <div className="flex items-start gap-3">
                  <User className="mt-1 h-4 w-4 opacity-60" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">Client</p>
                    <p className="text-paper-text dark:text-ink-text">{project.client}</p>
                  </div>
                </div>
              )}
              {project.origin && (
                <div className="flex items-start gap-3">
                  <Landmark className="mt-1 h-4 w-4 opacity-60" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] opacity-70">Origin</p>
                    <p className="text-paper-text dark:text-ink-text">{project.origin}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="my-6 h-px bg-paper-line dark:bg-ink-line" />
            <InPageIndex
              items={[
                { id: "overview", label: "Overview" },
                { id: "problem", label: "Problem" },
                { id: "site-diagrams", label: "Site Diagrams" },
                { id: "solution", label: "Solution" },
                { id: "results", label: "Results" },
                { id: "partners", label: "Partners" }
              ]}
            />
          </motion.aside>

          <div className="md:col-span-2 space-y-10">
            {/* Problem */}
            {project.problem_statement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="problem"
                className="scroll-mt-28 rounded-xl border border-paper-line bg-paper-surface p-6 dark:border-ink-line dark:bg-ink-surface"
              >
                <h3 className="mb-2 text-xl font-semibold tracking-tight">Problem</h3>
                <p className="text-paper-text-muted dark:text-ink-text-muted">{project.problem_statement}</p>
              </motion.div>
            )}

            {/* Site Diagrams */}
            {project.site_diagrams && project.site_diagrams.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="site-diagrams"
                className="space-y-4 scroll-mt-28"
              >
                <h3 className="text-xl font-semibold tracking-tight">Site Diagrams</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {project.site_diagrams.map((img, i) => (
                    <div key={img} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-paper-line dark:border-ink-line">
                      <Image src={img} alt={`Site diagram ${i + 1}`} fill className="object-cover" sizes="50vw" />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Solution */}
            {project.solution && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="solution"
                className="scroll-mt-28 rounded-xl border border-paper-line bg-paper-surface p-6 dark:border-ink-line dark:bg-ink-surface"
              >
                <h3 className="mb-2 text-xl font-semibold tracking-tight">Solution</h3>
                <p className="text-paper-text-muted dark:text-ink-text-muted">{project.solution}</p>
              </motion.div>
            )}

            {/* Results */}
            {(project.results_images?.length || project.gallery_images?.length) ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="results"
                className="space-y-4 scroll-mt-28"
              >
                <h3 className="text-xl font-semibold tracking-tight">Results</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {(project.results_images ?? project.gallery_images ?? []).map((image, index) => (
                    <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-paper-line dark:border-ink-line">
                      <Image src={image} alt={`${project.title} result ${index + 1}`} fill className="object-cover" sizes="50vw" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}

            {/* Community Partners */}
            {project.partners && project.partners.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                id="partners"
                className="space-y-3 scroll-mt-28"
              >
                <h3 className="text-xl font-semibold tracking-tight">Community Partners</h3>
                <div className="flex flex-wrap gap-2">
                  {project.partners.map((p) => (
                    <span key={p} className="rounded-full border border-paper-line px-3 py-1 text-sm text-paper-text-muted dark:border-ink-line dark:text-ink-text-muted">
                      {p}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

