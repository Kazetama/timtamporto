"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { PROFILE_INFO, ROLES } from "@/constants/portfolio";

export function HeroSection() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 80;
    const currentWord = ROLES[currentRoleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
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
    <div className="flex flex-col gap-4 items-start w-full">
      {/* Header Profile Section */}
      <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-8 mb-4 w-full">
        
        {/* Main Title & Status */}
        <div className="flex flex-col gap-4 items-start">
          {/* Online Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-foreground tracking-wide">
              {PROFILE_INFO.status}
            </span>
            <span className="text-muted-foreground mx-1">|</span>
            <span className="text-xs text-muted-foreground font-medium">
              {PROFILE_INFO.username}
            </span>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-[40px] font-extrabold tracking-tight text-foreground flex flex-wrap items-center gap-3 leading-tight">
            {PROFILE_INFO.name}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-8 h-8 md:w-10 md:h-10 text-blue-500 shrink-0 drop-shadow-sm translate-y-1"
            >
              <path 
                fillRule="evenodd" 
                d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" 
                clipRule="evenodd" 
              />
            </svg>
          </h1>
        </div>

        {/* Profile Picture */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-muted flex-shrink-0 border-4 border-background shadow-xl ring-1 ring-border group self-start md:self-auto">
          <Image 
            src={PROFILE_INFO.avatarUrl} 
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

      {/* Typing Animation Role */}
      <h2 className="text-xl md:text-3xl text-muted-foreground mb-4 flex items-center min-h-[40px] font-medium">
        I&apos;m a{" "}
        <span className="ml-[6px] md:ml-[8px] font-bold bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
          {currentText}
        </span>
        <span className="w-[2px] md:w-[3px] h-6 md:h-8 bg-blue-500 ml-1 animate-pulse"></span>
      </h2>

      {/* Description */}
      <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8 text-pretty">
        Passionate about <strong className="text-foreground font-semibold">web development</strong> and 
        enjoy creating <strong className="text-foreground font-semibold">creative and innovative solutions</strong>{" "}
        using modern technologies such as{" "}
        <strong className="text-foreground font-semibold">Next.js, React, TypeScript, Laravel,</strong> and{" "}
        <strong className="text-foreground font-semibold">Supabase</strong>. Constantly pushing boundaries 
        and committed to continuously improving my workflow and expertise to build outstanding digital experiences.
      </p>
    </div>
  );
}
