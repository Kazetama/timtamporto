"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const roles = ["Full-Stack Web Developer", "Cloud Engineer", "DevOps"];

export default function Home() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentWord = roles[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setCurrentText((prev) =>
          isDeleting
            ? currentWord.substring(0, prev.length - 1)
            : currentWord.substring(0, prev.length + 1)
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentRoleIndex]);

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
      <div className="relative z-10 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-8 md:mt-12">
        
        {/* ============================== */}
        {/* HEADER SECTION */}
        {/* ============================== */}
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 mb-10">
          
          {/* Main Title & Status */}
          <div className="flex flex-col gap-4 items-start">
            {/* Online Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-medium text-foreground tracking-wide">Available for Work</span>
              <span className="text-muted-foreground mx-1">|</span>
              <span className="text-xs text-muted-foreground font-medium">@kazeetama</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-[40px] font-extrabold tracking-tight text-foreground flex flex-wrap items-center gap-3 leading-tight">
              Teuku Aryansyah Pratama
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-10 md:h-10 text-blue-500 shrink-0 drop-shadow-sm translate-y-1">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </h1>
          </div>

          {/* Profile Picture */}
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-background shadow-xl ring-1 ring-border group self-start md:self-auto">
            <Image 
              src="https://github.com/kazetama.png" 
              alt="Profile" 
              fill
              sizes="(max-width: 768px) 96px, 128px"
              priority
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Inner Ring Glow */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none" />
          </div>

        </div>

        {/* ============================== */}
        {/* TYPING ANIMATION ROLE */}
        {/* ============================== */}
        <h2 className="text-xl md:text-3xl text-muted-foreground mb-6 flex items-center min-h-[40px] font-medium">
          I&apos;m a{" "}
          <span className="ml-[6px] md:ml-[8px] font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            {currentText}
          </span>
          <span className="w-[2px] md:w-[3px] h-6 md:h-8 bg-blue-500 ml-1 animate-pulse"></span>
        </h2>

        {/* ============================== */}
        {/* DESCRIPTION */}
        {/* ============================== */}
        <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-12 text-pretty">
          Passionate about <strong className="text-foreground font-semibold">web development</strong> and 
          enjoy creating <strong className="text-foreground font-semibold">creative and innovative solutions</strong>{" "}
          using modern technologies such as{" "}
          <strong className="text-foreground font-semibold">Next.js, React, TypeScript, Laravel,</strong> and{" "}
          <strong className="text-foreground font-semibold">Supabase</strong>. Constantly pushing boundaries 
          and committed to continuously improving my workflow and expertise to build outstanding digital experiences.
        </p>

        {/* ============================== */}
        {/* SOCIAL LINKS */}
        {/* ============================== */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 text-sm font-medium text-muted-foreground">
          <span className="uppercase tracking-widest text-[11px] font-bold text-muted-foreground/80">Connect with me</span>
          <div className="h-px bg-border flex-1 max-w-[40px] hidden sm:block"></div>
          <div className="flex items-center gap-3">
            {[
              { id: 'mail', href: 'mailto:teukuaryansyah@gmail.com', icon: MailIcon, hover: 'hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10' },
              { id: 'github', href: 'https://github.com/kazetama', icon: GithubIcon, hover: 'hover:text-foreground hover:border-foreground/30 hover:bg-foreground/10' },
              { id: 'linkedin', href: 'https://linkedin.com/in/kazetama', icon: LinkedinIcon, hover: 'hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10' },
              { id: 'instagram', href: 'https://instagram.com/kazeetama', icon: InstagramIcon, hover: 'hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10' }
            ].map((social) => (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-11 h-11 rounded-full border border-border bg-card flex items-center justify-center transition-all duration-300 shadow-sm ${social.hover} group hover:-translate-y-1`}
              >
                <social.icon className="w-[18px] h-[18px] text-muted-foreground group-hover:text-inherit transition-colors" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

// ==============================
// ICON COMPONENTS (Simple SVGs)
// ==============================
const MailIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);