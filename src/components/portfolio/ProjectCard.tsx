"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import clsx from "clsx";
import { Project } from "@/data/projects";

const typeColors: Record<Project["project_type"], string> = {
  architecture: "#FDCA40",
  art: "#DF2935",
  personal: "#FDCA40",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

function renderFormattedTitle(title: string) {
  if (!title) return null;
  const words = title.split(/\s+/);
  return (
    <span>
      {words.map((word, i) => {
        if (!word) return null;
        const first = word.charAt(0);
        const rest = word.slice(1).toLowerCase();
        const large = i === 1 || i === 2; // enlarge 2nd and 3rd word initials
        return (
          <span key={i} className="mr-[3px]">
            <span className={large ? "cap-initial" : undefined}>{first}</span>
            <span className="small-caps">{rest}</span>
          </span>
        );
      })}
    </span>
  );
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const accent = typeColors[project.project_type] ?? "#FDCA40";
  // For specific cover images we want to adjust the focal point slightly
  // Apply the left shift to known render filenames (renderp1, prednerp1)
  const objectPosition = project.cover_image?.includes("renderp1") || project.cover_image?.includes("prednerp1")
    ? "30% 50%"
    : "50% 50%";
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: "easeOut" }}
      className="group cursor-pointer"
    >
      <Link
        href={`/projects/${project.id}`}
        aria-label={`${project.title}${project.location ? ` – ${project.location}` : ""}`}
        className="block"
      >
        <div
          className="relative mb-4 aspect-[4/5] overflow-hidden rounded-[32px] border-4 border-dark bg-dark shadow-xl transition-all duration-300 group-hover:shadow-2xl"
          style={{ backgroundColor: accent }}
        >
          <Image
            src={project.cover_image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
            style={{ objectPosition: objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end p-6">
            <div className="w-full text-white">
              <h3 className="text-xl font-semibold tracking-tight transition-opacity duration-300 group-hover:opacity-0">
                {renderFormattedTitle(project.title)}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-white/60 transition-opacity duration-300 group-hover:opacity-0">
                {project.category?.replace(/_/g, " ") ?? project.project_type}
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="flex w-full items-center justify-between text-white">
              <div>
                {project.location ? (
                  <div className="mb-2 flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                ) : (
                  <div className="mb-2 text-sm opacity-80">
                    {project.category?.replace(/_/g, " ") ?? project.project_type}
                  </div>
                )}
                {project.year && (
                  <p className="text-xs text-white/70">{project.year}</p>
                )}
              </div>
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/80 bg-white/10 backdrop-blur-sm"
                style={{ backgroundColor: accent }}
              >
                <ArrowUpRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

