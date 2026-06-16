import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createDbClient } from "@/lib/supabase/db";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  let project = null;

  try {
    const db = createDbClient();
    const { data, error } = await db
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error loading project details from Supabase:", error);
    } else if (data) {
      project = {
        slug: data.slug,
        title: data.title,
        description: data.description,
        longDescription: data.long_description,
        tags: data.tags || [],
        githubUrl: data.github_url,
        liveUrl: data.live_url,
        status: data.status,
        imageUrl: data.image_url,
        role: data.role,
        features: data.features || [],
        challenges: data.challenges,
        solutions: data.solutions,
      };
    }
  } catch (err) {
    console.error("System error loading project details:", err);
  }

  if (!project) {
    notFound();
  }

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
      <div className="relative z-10 w-full max-w-5xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-4">
        
        {/* Back Navigation Button */}
        <Link 
          href="/projects" 
          className="inline-flex items-center gap-2 mb-8 text-xs font-bold text-muted-foreground hover:text-foreground border border-border bg-card px-4 py-2.5 rounded-xl transition-all duration-300 active:scale-95 shadow-sm group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Kembali ke Project
        </Link>

        {/* Header Block */}
        <div className="flex flex-col gap-4 items-start mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm">
            <span className={`text-[10px] font-bold tracking-wider uppercase ${
              project.status === "completed" ? "text-green-400" : "text-yellow-400"
            }`}>
              {project.status === "in-progress" ? "In Progress" : project.status}
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground font-semibold flex flex-wrap items-center gap-2">
            <span className="text-blue-400">{project.role}</span>
          </p>
        </div>

        {/* Wide Visual Banner */}
        <div className="relative w-full h-[240px] sm:h-[400px] rounded-3xl overflow-hidden border border-border/80 shadow-lg mb-10 shrink-0">
          <Image 
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 w-full items-start">
          
          {/* Main Column (Overview, Features, Challenges) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Overview */}
            <div className="flex flex-col gap-4 animate-in fade-in duration-500">
              <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">
                Project Overview
              </h2>
              <p className="text-[15px] sm:text-base text-muted-foreground leading-relaxed text-pretty whitespace-pre-wrap">
                {project.longDescription}
              </p>
            </div>

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-500">
                <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">
                  Key Features
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-muted-foreground">
                  {project.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-blue-500 shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges & Solutions */}
            <div className="flex flex-col gap-5 animate-in fade-in duration-500">
              <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">
                Challenges & Solutions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2.5 bg-zinc-900/40 border border-zinc-900/60 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                    ⚠️ Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.challenges}
                  </p>
                </div>

                <div className="flex flex-col gap-2.5 bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                    🚀 Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {project.solutions}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Metadata & Links */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-24 animate-in fade-in duration-500">
            
            {/* Info Card */}
            <div className="border border-border bg-card rounded-2xl p-6 flex flex-col gap-5 shadow-sm">
              <h3 className="text-sm font-bold text-card-foreground border-b border-border pb-2 uppercase tracking-wider">
                Project Details
              </h3>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Role</span>
                  <span className="text-sm font-semibold text-foreground">{project.role}</span>
                </div>
                
                <div className="flex flex-col">
                  <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Status</span>
                  <span className="text-sm font-semibold text-foreground capitalize">{project.status === "in-progress" ? "In Progress" : project.status}</span>
                </div>

                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-col">
                    <span className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider">Technologies</span>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {project.tags.map((tag: string) => (
                        <span 
                          key={tag} 
                          className="text-[10px] font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 border-t border-border pt-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 hover:bg-muted border border-border px-4 py-2.5 rounded-xl text-xs font-bold text-foreground transition-all duration-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    Source Code
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2.5 rounded-xl text-xs font-bold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Live Preview
                  </a>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
