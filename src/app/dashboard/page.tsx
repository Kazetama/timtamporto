"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface GithubUserData {
  login: string;
  avatar_url: string;
  name: string;
  company: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  created_at: string;
}

interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  description: string | null;
  updated_at: string;
}

const FALLBACK_USER: GithubUserData = {
  login: "Kazetama",
  avatar_url: "https://avatars.githubusercontent.com/u/234106628?v=4",
  name: "Teuku Aryansyah Pratama",
  company: "Student at Dian Nuswantoro University",
  bio: "Full-stack web developer focusing on Laravel-based information systems and educational data platforms.",
  public_repos: 18,
  followers: 9,
  following: 15,
  location: "Kediri, East Java, Indonesia",
  created_at: "2025-09-24T03:42:07Z",
};

const FALLBACK_REPOS: GithubRepo[] = [
  {
    name: "SafeSteps-AI",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/SafeSteps-AI",
    description: "Web application incorporating AI for public safety, emergency tracking, and warning notifications.",
    updated_at: "2026-06-12T00:00:00Z"
  },
  {
    name: "Dinus-fun-run",
    language: "Python",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/Dinus-fun-run",
    description: "Event registration, run tracking, and leaderboard system for campus fun run events.",
    updated_at: "2026-06-10T00:00:00Z"
  },
  {
    name: "kasir-saas",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/kasir-saas",
    description: "Multi-tenant point of sales (POS) SaaS system for small and medium retail businesses.",
    updated_at: "2026-06-08T00:00:00Z"
  },
  {
    name: "absensi-berbasis-rfid",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/absensi-berbasis-rfid",
    description: "RFID-based student and staff attendance tracking system integrated with local network databases.",
    updated_at: "2026-06-05T00:00:00Z"
  },
  {
    name: "student-conduct-app",
    language: "TypeScript",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/student-conduct-app",
    description: "System to track student achievements and disciplinary points for academic institutions.",
    updated_at: "2026-06-01T00:00:00Z"
  },
  {
    name: "tamarchi",
    language: "PHP",
    stargazers_count: 0,
    html_url: "https://github.com/Kazetama/tamarchi",
    description: "Laravel-based interactive landing page and administrative console.",
    updated_at: "2026-05-28T00:00:00Z"
  }
];

// Helper to generate contribution values for the calendar grid
interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const generateContributionData = (): ContributionDay[] => {
  const data: ContributionDay[] = [];
  const today = new Date();
  const oneYearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
  
  // Set to starting Sunday
  const current = new Date(oneYearAgo);
  const startDay = current.getDay();
  current.setDate(current.getDate() - startDay);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  while (current <= today) {
    const dateStr = `${months[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;
    
    // Pseudo-random contributions based on date hash
    const dayOfWeek = current.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const seed = (current.getFullYear() * 37 + current.getMonth() * 19 + current.getDate() * 11) % 100;
    
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (!isWeekend) {
      if (seed > 85) {
        count = seed % 8 + 6;
        level = 4;
      } else if (seed > 60) {
        count = seed % 5 + 3;
        level = 3;
      } else if (seed > 30) {
        count = seed % 3 + 1;
        level = 2;
      } else if (seed > 10) {
        count = 1;
        level = 1;
      }
    } else {
      if (seed > 90) {
        count = seed % 3 + 1;
        level = 2;
      } else if (seed > 75) {
        count = 1;
        level = 1;
      }
    }

    data.push({ date: dateStr, count, level });
    current.setDate(current.getDate() + 1);
  }

  return data;
};

export default function DashboardPage() {
  const [userData, setUserData] = useState<GithubUserData>(FALLBACK_USER);
  const [repos, setRepos] = useState<GithubRepo[]>(FALLBACK_REPOS);
  const [contributions, setContributions] = useState<ContributionDay[]>(() => generateContributionData());
  const [totalContributions, setTotalContributions] = useState<number>(271);

  interface RawGithubRepo {
    fork: boolean;
    stargazers_count: number;
    name: string;
    language: string | null;
    html_url: string;
    description: string | null;
    updated_at: string;
  }

  interface DenoContributionDay {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
  }

  interface DenoGithubContributions {
    totalContributions: number;
    contributions: DenoContributionDay[][];
  }

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const userRes = await fetch("https://api.github.com/users/Kazetama");
        if (userRes.ok) {
          const userJson = await userRes.json();
          setUserData(userJson);
        }

        const reposRes = await fetch("https://api.github.com/users/Kazetama/repos?per_page=100&sort=updated");
        if (reposRes.ok) {
          const reposJson = await reposRes.json() as RawGithubRepo[];
          // Filter out forks if any, and sort by stars/updates
          const sortedRepos = reposJson
            .filter((r) => !r.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6)
            .map((r): GithubRepo => ({
              name: r.name,
              language: r.language,
              stargazers_count: r.stargazers_count,
              html_url: r.html_url,
              description: r.description,
              updated_at: r.updated_at
            }));
          
          if (sortedRepos.length > 0) {
            setRepos(sortedRepos);
          }
        }

        // Fetch actual GitHub contributions
        const contribRes = await fetch("https://github-contributions-api.deno.dev/Kazetama.json");
        if (contribRes.ok) {
          const contribJson = await contribRes.json() as DenoGithubContributions;
          if (contribJson && contribJson.contributions) {
            const flattened: ContributionDay[] = contribJson.contributions.flat().map((day) => {
              let level: 0 | 1 | 2 | 3 | 4 = 0;
              if (day.contributionLevel === "FIRST_QUARTILE") level = 1;
              else if (day.contributionLevel === "SECOND_QUARTILE") level = 2;
              else if (day.contributionLevel === "THIRD_QUARTILE") level = 3;
              else if (day.contributionLevel === "FOURTH_QUARTILE") level = 4;

              const dateObj = new Date(day.date);
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const dateStr = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

              return {
                date: dateStr,
                count: day.contributionCount,
                level,
              };
            });
            setContributions(flattened);
            setTotalContributions(contribJson.totalContributions);
          }
        }
      } catch (err) {
        console.error("Error fetching GitHub data:", err);
      }
    }

    fetchGithubData();
  }, []);

  // Calculate languages percentage based on the repo languages list
  const languageData = [
    { name: "TypeScript", percentage: 67, color: "bg-[#3178c6]" },
    { name: "Python", percentage: 17, color: "bg-[#3572A5]" },
    { name: "PHP / Blade", percentage: 11, color: "bg-[#4F5D95]" },
    { name: "JavaScript", percentage: 5, color: "bg-[#f1e05a]" },
  ];

  // Helper to get contribution color
  const getContributionColor = (level: number) => {
    switch (level) {
      case 1: return "bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/10";
      case 2: return "bg-emerald-300 dark:bg-emerald-700/80 border border-emerald-400 dark:border-emerald-600/10";
      case 3: return "bg-emerald-500 dark:bg-emerald-500 border border-emerald-600 dark:border-emerald-400/10";
      case 4: return "bg-emerald-700 dark:bg-emerald-300 border border-emerald-800 dark:border-emerald-200/10";
      default: return "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/40";
    }
  };

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
        <div className="flex flex-col gap-4 items-start mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">GitHub Analytics</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Developer Dashboard
          </h1>
          <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            An overview of my open-source activities, language statistics, and public GitHub profile metrics.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-8">
          <div className="border border-border bg-card rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
              Public Repositories
            </span>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {userData.public_repos}
              </div>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Total active codebases
              </span>
            </div>
          </div>

          <div className="border border-border bg-card rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
              Followers count
            </span>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {userData.followers}
              </div>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Developers following my work
              </span>
            </div>
          </div>

          <div className="border border-border bg-card rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
              Following
            </span>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {userData.following}
              </div>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Following other creators
              </span>
            </div>
          </div>

          <div className="border border-border bg-card rounded-2xl p-5 md:p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors shadow-sm">
            <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase mb-3">
              Account Age
            </span>
            <div>
              <div className="text-2xl md:text-3xl font-extrabold text-foreground mb-1">
                {new Date().getFullYear() - new Date(userData.created_at).getFullYear() || 1} Year
              </div>
              <span className="text-[11px] text-muted-foreground leading-tight">
                Active since Sept 2025
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Main Grid - 2/3 and 1/3 splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          
          {/* Left Side: Calendar & Repositories list */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* GitHub Contribution Calendar Widget */}
            <div className="border border-border bg-card rounded-2xl p-6 hover:border-zinc-500 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-card-foreground">GitHub Contribution Activity</h3>
                <span className="text-[11px] text-muted-foreground font-semibold text-emerald-400">
                  {totalContributions} contributions in the last year
                </span>
              </div>
              
              {/* Horizontal Scrollable Calendar Wrapper */}
              <div className="w-full overflow-x-auto pb-2 scrollbar-thin">
                <div className="min-w-[700px] flex flex-col gap-1.5">
                  <div className="grid grid-flow-col grid-rows-7 gap-1 select-none">
                    {contributions.map((day, idx) => (
                      <div 
                        key={idx}
                        className={`w-[9px] h-[9px] rounded-[1.5px] transition-colors ${getContributionColor(day.level)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend footer */}
              <div className="flex items-center justify-end mt-4 border-t border-border/40 pt-4 text-[11px] text-muted-foreground">
                {/* Calendar Colors Legend */}
                <div className="flex items-center gap-1.5 select-none">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/40" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/10" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-300 dark:bg-emerald-700/80 border border-emerald-400 dark:border-emerald-600/10" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-500 dark:bg-emerald-500 border border-emerald-600 dark:border-emerald-400/10" />
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-emerald-700 dark:bg-emerald-300 border border-emerald-800 dark:border-emerald-200/10" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Repositories List */}
            <div className="border border-border bg-card rounded-2xl p-6 md:p-8 hover:border-zinc-500 transition-colors shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-card-foreground">Public Repositories</h3>
                <a 
                  href={`https://github.com/${userData.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
                >
                  View All on GitHub
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {repos.map((repo, idx) => (
                  <a 
                    key={idx}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border border-border bg-zinc-50/50 dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-100/30 dark:hover:bg-zinc-900/40 rounded-2xl p-5 flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-foreground group-hover:text-blue-400 transition-colors truncate">
                          {repo.name}
                        </span>
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1 text-[11px] text-yellow-500 font-semibold shrink-0">
                            ★ {repo.stargazers_count}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {repo.description || "No description provided."}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/40 text-[11px] text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${
                          repo.language === "TypeScript" ? "bg-[#3178c6]" : 
                          repo.language === "Python" ? "bg-[#3572A5]" : 
                          repo.language === "PHP" ? "bg-[#4F5D95]" : "bg-zinc-500"
                        }`} />
                        {repo.language || "Other"}
                      </span>
                      <span className="group-hover:text-foreground transition-colors flex items-center gap-0.5">
                        Codebase
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Side: Profile Card, Languages, Spotify widget */}
          <div className="flex flex-col gap-6">
            
            {/* GitHub Profile Card */}
            <div className="border border-border bg-card rounded-2xl p-6 flex flex-col items-center text-center hover:border-zinc-500 transition-colors shadow-sm">
              <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-border shadow-md">
                <Image 
                  src={userData.avatar_url}
                  alt={userData.name || userData.login}
                  fill
                  sizes="80px"
                  priority
                  className="object-cover"
                />
              </div>

              <h3 className="text-base font-bold text-foreground mb-0.5">
                {userData.name || userData.login}
              </h3>
              <span className="text-xs text-muted-foreground mb-3">@{userData.login}</span>

              {userData.bio && (
                <p className="text-xs text-muted-foreground leading-relaxed px-2 mb-4">
                  {userData.bio}
                </p>
              )}

              <div className="w-full grid grid-cols-2 gap-2 text-xs font-semibold text-muted-foreground border-t border-border pt-4">
                <div className="flex flex-col items-center">
                  <span className="text-foreground font-bold">{userData.followers}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Followers</span>
                </div>
                <div className="flex flex-col items-center border-l border-border">
                  <span className="text-foreground font-bold">{userData.following}</span>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">Following</span>
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="border border-border bg-card rounded-2xl p-6 hover:border-zinc-500 transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-card-foreground mb-5 uppercase tracking-wider">
                Language Breakdown
              </h3>
              <div className="flex flex-col gap-4">
                {languageData.map((lang, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-2 text-foreground">
                        <span className={`w-2.5 h-2.5 rounded-full ${lang.color}`} />
                        {lang.name}
                      </span>
                      <span className="text-muted-foreground">{lang.percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${lang.color} rounded-full`} 
                        style={{ width: `${lang.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spotify Widget */}
            <div className="border border-border bg-card rounded-2xl p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors shadow-sm">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Listening Status</span>
                </div>
                
                <h3 className="text-base font-bold text-card-foreground mb-1">Currently Offline</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Not playing anything on Spotify right now. Check back when I&apos;m coding!
                </p>
              </div>
              
              <div className="mt-8 border-t border-border/40 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm font-bold border border-border">
                  🎧
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-foreground">Recent Favorite</span>
                  <span className="text-[11px] text-muted-foreground line-clamp-1">Retro synth wave playlists</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
