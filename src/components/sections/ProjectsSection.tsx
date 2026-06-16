"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { PROJECTS } from "@/constants/portfolio";
import { Project } from "@/app/projects/types";

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeaturedProjects() {
      try {
        const db = createClient();
        const { data, error } = await db
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) {
          console.error("Error loading featured projects from Supabase:", error);
          // Fallback to static projects on error
          setProjects(PROJECTS.slice(0, 3));
        } else {
          // Map database field names to layout props
          const mapped = data.map((proj) => ({
            slug: proj.slug,
            title: proj.title,
            description: proj.description,
            longDescription: proj.long_description,
            tags: proj.tags || [],
            githubUrl: proj.github_url,
            liveUrl: proj.live_url,
            status: proj.status,
            imageUrl: proj.image_url,
            role: proj.role,
            features: proj.features || [],
            challenges: proj.challenges,
            solutions: proj.solutions,
          }));
          setProjects(mapped);
        }
      } catch (err) {
        console.error("System error loading featured projects:", err);
        setProjects(PROJECTS.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedProjects();
  }, []);

  return (
    <section className="flex flex-col gap-6 w-full mt-16">
      <div className="flex items-center justify-between border-b border-border pb-4 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Featured Projects
        </h2>
        <Link 
          href="/projects" 
          className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 group/link"
        >
          View All
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[1, 2, 3].map((n) => (
            <div 
              key={n} 
              className="border border-border/60 bg-card/50 rounded-2xl overflow-hidden h-[340px] flex flex-col justify-between p-5 animate-pulse"
            >
              <div className="w-full h-32 bg-muted rounded-xl mb-4" />
              <div className="h-5 bg-muted rounded w-2/3 mb-2" />
              <div className="h-3.5 bg-muted rounded w-full mb-1" />
              <div className="h-3.5 bg-muted rounded w-5/6 mb-4" />
              <div className="h-8 bg-muted rounded-lg w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative border border-border bg-card hover:border-zinc-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"
            >
              {/* Image Header */}
              <div className="relative w-full h-40 overflow-hidden bg-muted border-b border-border/60 shrink-0">
                <Image 
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border bg-black/60 backdrop-blur-md ${
                    project.status === "completed" 
                      ? "text-green-400 border-green-500/30" 
                      : project.status === "in-progress" 
                      ? "text-yellow-400 border-yellow-500/30" 
                      : "text-zinc-400 border-zinc-500/30"
                  }`}>
                    {project.status === "in-progress" ? "In Progress" : project.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-base font-bold text-card-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags & Link */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag: string) => (
                      <span 
                        key={tag} 
                        className="text-[9px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-medium text-muted-foreground/60 px-1.5 py-0.5">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <Link 
                    href={`/projects/${project.slug}`}
                    className="w-full mt-1 py-2 px-3 rounded-lg border border-border hover:border-blue-500/40 hover:bg-blue-500/5 text-xs font-bold text-foreground flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-[0.98] cursor-pointer"
                  >
                    Detail Proyek
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
