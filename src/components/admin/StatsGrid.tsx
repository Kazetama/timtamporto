import React from "react";

interface StatsGridProps {
  dbProjectsCount: number;
  userEmail: string | null;
  userId: string;
}

export function StatsGrid({ dbProjectsCount, userEmail, userId }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
      {/* Total Projects */}
      <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
            Total Projects (Database)
          </span>
          <div className="text-3xl font-extrabold text-foreground">
            {dbProjectsCount}
          </div>
          <span className="text-xs text-muted-foreground">Loaded from Supabase</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
          </svg>
        </div>
      </div>

      {/* Database Provider */}
      <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
            Database Provider
          </span>
          <div className="text-3xl font-extrabold text-teal-400">
            Supabase
          </div>
          <span className="text-xs text-muted-foreground">Status: Connected</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
        </div>
      </div>

      {/* Auth Session */}
      <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
            Sesi Autentikasi
          </span>
          <div className="text-2xl font-extrabold text-purple-400 truncate max-w-[200px]" title={userEmail || ""}>
            Active Admin
          </div>
          <span className="text-xs text-muted-foreground">ID: {userId.substring(0, 8)}...</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
