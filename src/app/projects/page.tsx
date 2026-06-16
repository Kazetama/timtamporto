"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { projects as fallbackProjects, type Project } from "@/lib/projects";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const db = createClient();
        const { data, error } = await db
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error loading projects from Supabase:", error);
          // Fallback to static projects on error
          setProjects(fallbackProjects);
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
        console.error("System error loading projects:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <div className="relative w-full min-h-screen pt-12 md:pt-24 pb-12 px-6 md:px-12 flex flex-col items-center md:items-start overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-8 md:mt-12">
        
        {/* Header Section */}
        <div className="flex flex-col gap-4 items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            My Projects
          </h1>
          <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            A curated list of my recent web applications, systems, and open-source contributions. 
            I focus on performance, clean code, and premium user experience.
          </p>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[1, 2, 3].map((n) => (
              <div key={n} className="border border-border/60 bg-card/50 rounded-2xl overflow-hidden h-[380px] flex flex-col justify-between p-6 animate-pulse">
                <div className="w-full h-40 bg-muted rounded-xl mb-4" />
                <div className="h-6 bg-muted rounded w-2/3 mb-2" />
                <div className="h-4 bg-muted rounded w-full mb-1" />
                <div className="h-4 bg-muted rounded w-5/6 mb-4" />
                <div className="h-10 bg-muted rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {projects.map((project, idx) => (
              <div 
                key={idx}
                className="group relative border border-border bg-card hover:border-zinc-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm animate-in fade-in duration-500"
              >
                {/* Project Card Image Header */}
                <div className="relative w-full h-48 overflow-hidden bg-muted border-b border-border/60 shrink-0">
                  <Image 
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border bg-black/60 backdrop-blur-md ${
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

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-lg font-bold text-card-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Action Links */}
                  <div className="flex flex-col gap-4">
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag: string) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-medium text-muted-foreground bg-muted/60 px-2 py-0.5 rounded border border-border/40"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="text-[10px] font-medium text-muted-foreground/60 px-2 py-0.5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Navigate to Details Page Link */}
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="w-full mt-2 py-2.5 px-4 rounded-xl border border-border hover:border-blue-500/40 hover:bg-blue-500/5 text-xs font-bold text-foreground flex items-center justify-center gap-2 group/btn transition-all duration-300 active:scale-[0.98] cursor-pointer"
                    >
                      Lanjut Desain
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1">
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
      </div>
    </div>
  );
}
