"use client";

import { EXPERIENCES } from "@/constants/portfolio";

export function ExperienceSection() {
  return (
    <section className="flex flex-col gap-8 w-full mt-16">
      <div className="border-b border-border pb-4 w-full">
        <h2 className="text-xl sm:text-2xl font-bold text-foreground">
          Work & Organizational Experience
        </h2>
      </div>

      <div className="relative border-l border-border pl-6 ml-3 flex flex-col gap-10 w-full">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="relative group">
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-background border border-border group-hover:border-blue-500 transition-colors duration-300">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground group-hover:bg-blue-500 transition-colors duration-300"></span>
            </span>

            {/* Experience Card */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 w-full">
                <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-blue-400 transition-colors duration-300">
                  {exp.role}
                </h3>
                <span className="text-xs font-semibold text-muted-foreground bg-muted border border-border/60 px-2.5 py-1 rounded-full w-fit">
                  {exp.period}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-blue-500/95 dark:text-blue-400/90">
                {exp.organization}
              </h4>
              {exp.description && (
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-1">
                  {exp.description}
                </p>
              )}
              {exp.points && exp.points.length > 0 && (
                <ul className="list-disc list-inside text-xs sm:text-sm text-muted-foreground/90 pl-1 mt-2 flex flex-col gap-1.5">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="leading-relaxed pl-1">
                      <span className="relative -left-1">{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
