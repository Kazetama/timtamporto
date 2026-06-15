"use client";

import React from "react";

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  href: string;
  description: string;
  borderColorClass: string;
  iconBgClass: string;
  iconColorClass: string;
  buttonClass: string;
  icon: React.ReactNode;
}

export default function SocialLinksPage() {
  const socials: SocialLink[] = [
    {
      id: "mail",
      name: "Email Address",
      handle: "tamaketuahimpunan@gmail.com",
      href: "mailto:tamaketuahimpunan@gmail.com",
      description: "Inquiries, collaborations, or job opportunities.",
      borderColorClass: "hover:border-red-500/40 hover:shadow-red-500/5 dark:hover:shadow-red-500/10",
      iconBgClass: "bg-red-500/5 dark:bg-red-500/10 border-red-500/10 dark:border-red-500/20",
      iconColorClass: "text-red-500",
      buttonClass: "hover:bg-red-500/10 hover:text-red-500 border-red-500/20 text-red-500 dark:text-red-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: "github",
      name: "GitHub Profile",
      handle: "@kazetama",
      href: "https://github.com/kazetama",
      description: "Explore open-source repositories and active codebases.",
      borderColorClass: "hover:border-zinc-400/40 hover:shadow-zinc-400/5 dark:hover:shadow-zinc-400/10",
      iconBgClass: "bg-zinc-500/5 dark:bg-zinc-500/10 border-zinc-500/10 dark:border-zinc-500/20",
      iconColorClass: "text-zinc-600 dark:text-zinc-400",
      buttonClass: "hover:bg-foreground/10 hover:text-foreground border-foreground/20 text-zinc-700 dark:text-zinc-300",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "LinkedIn Network",
      handle: "Teuku Aryansyah Pratama",
      href: "https://linkedin.com/in/teukuaryansyahpratama",
      description: "Connect with me, view credentials, and network.",
      borderColorClass: "hover:border-blue-500/40 hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10",
      iconBgClass: "bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10 dark:border-blue-500/20",
      iconColorClass: "text-blue-500",
      buttonClass: "hover:bg-blue-500/10 hover:text-blue-500 border-blue-500/20 text-blue-500 dark:text-blue-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram Profile",
      handle: "@kazeetama",
      href: "https://instagram.com/kazeetama",
      description: "Follow personal updates, stories, and activities.",
      borderColorClass: "hover:border-pink-500/40 hover:shadow-pink-500/5 dark:hover:shadow-pink-500/10",
      iconBgClass: "bg-pink-500/5 dark:bg-pink-500/10 border-pink-500/10 dark:border-pink-500/20",
      iconColorClass: "text-pink-500",
      buttonClass: "hover:bg-pink-500/10 hover:text-pink-500 border-pink-500/20 text-pink-500 dark:text-pink-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

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
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">Connect</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Social Links
          </h1>
          <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Feel free to reach out, connect, or check out my work across different platforms.
          </p>
        </div>

        {/* Social Links Grid - Modern 4-column Card Deck */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {socials.map((social) => (
            <a
              key={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center justify-between text-center border border-border bg-card rounded-3xl p-6 md:p-8 transition-all duration-500 hover:-translate-y-1.5 shadow-sm hover:shadow-lg ${social.borderColorClass} min-h-[320px]`}
            >
              {/* Top Section: Styled Avatar Icon */}
              <div className="flex flex-col items-center gap-5 w-full">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-all duration-500 group-hover:scale-105 shrink-0 ${social.iconBgClass} ${social.iconColorClass}`}>
                  {social.icon}
                </div>

                {/* Middle Section: Handles */}
                <div className="flex flex-col gap-1 w-full px-2">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {social.name}
                  </span>
                  <span className="text-base font-extrabold text-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
                    {social.handle}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 text-balance">
                    {social.description}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Action Button */}
              <div className="w-full mt-6">
                <span className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl border border-border/80 text-xs font-bold transition-all duration-300 group-hover:shadow-sm ${social.buttonClass}`}>
                  Connect
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
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
  );
}
