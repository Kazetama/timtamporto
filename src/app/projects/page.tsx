"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export default function ProjectsPage() {
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

        {/* Projects Grid - Optimized to 3 Columns on Large Screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {projects.map((project, idx) => (
            <div 
              key={idx}
              className="group relative border border-border bg-card hover:border-zinc-500 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-sm"
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
                    {project.tags.slice(0, 3).map((tag) => (
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

      </div>
    </div>
  );
}
