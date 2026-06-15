"use client";

import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Folder01Icon,
  DashboardSquare01Icon,
  BubbleChatIcon,
  Link01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/", icon: Home01Icon, hoverRotate: "-rotate-6" },
  { name: "Projects", href: "/projects", icon: Folder01Icon, hoverRotate: "rotate-6" },
  { name: "Dashboard", href: "/dashboard", icon: DashboardSquare01Icon, hoverRotate: "-rotate-3" },
  { name: "Public Chat", href: "/public-chat", icon: BubbleChatIcon, hoverRotate: "rotate-12" },
  { name: "Social Links", href: "/social-links", icon: Link01Icon, hoverRotate: "-rotate-12" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-[280px] bg-background text-muted-foreground hidden md:flex flex-col p-4 z-50">

      {/* Profile Section */}
      <div className="flex flex-col mb-6 group cursor-pointer mt-2">
        <div className="relative w-16 h-16 rounded-full overflow-hidden bg-muted mb-4 ml-2 border border-border flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
          <Image
            src="/images/profile.png"
            alt="Profile Picture"
            fill
            sizes="(max-width: 768px) 100vw, 64px"
            priority
            className="object-cover"
          />
        </div>

        <div className="flex items-center gap-1 ml-2 group-hover:text-white transition-colors text-foreground">
          <h2 className="text-[17px] font-bold tracking-tight">Teuku Aryansyah Pratama</h2>
          <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] text-[#1D9BF0] flex-shrink-0 transition-transform duration-300 group-hover:scale-110" fill="currentColor">
            <path d="M22.5 12.5c0-1.58-.8-2.95-2.02-3.74.46-1.5.14-3.23-1.06-4.43-1.2-1.2-2.92-1.52-4.43-1.06C14.2 2.05 12.83 1.25 11.25 1.25s-2.95.8-3.74 2.02C6 2.8 4.27 3.12 3.07 4.32c-1.2 1.2-1.52 2.92-1.06 4.43C.8 9.55 0 10.92 0 12.5s.8 2.95 2.02 3.74c-.46 1.5-.14 3.23 1.06 4.43 1.2 1.2 2.92 1.52 4.43 1.06 1.18 1.22 2.55 2.02 4.13 2.02s2.95-.8 3.74-2.02c1.5.46 3.23.14 4.43-1.06 1.2-1.2 1.52-2.92 1.06-4.43 1.22-1.18 2.02-2.55 2.02-4.13zm-13.5 3l-3-3 1.41-1.42L9 12.59l5.59-5.59 1.41 1.42-7 7z"></path>
          </svg>
        </div>

        <div className="flex items-center gap-1.5 text-[13px] ml-2 mt-0.5">
          <div className="flex items-center gap-1.5 text-green-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Online
          </div>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">@kazeetama</span>
        </div>
      </div>

      {/* Position Card */}
      <div className="bg-card border border-border rounded-xl p-3.5 mb-6 hover:border-zinc-500 transition-colors cursor-pointer group flex flex-row items-center justify-between shadow-sm">
        <div className="flex flex-col">
          <span className="text-card-foreground font-semibold text-sm mb-0.5">Ketua Umum</span>
          <span className="text-[11px] text-muted-foreground leading-snug">
            Biro Teknik Informatika <br /> UDINUS Kediri
          </span>
        </div>
        <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all duration-300 group-hover:scale-110" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col flex-1 gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg group transition-all duration-300 active:scale-[0.98] ${isActive ? 'bg-accent text-accent-foreground font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}
            >
              <HugeiconsIcon icon={item.icon} className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 ${isActive ? '' : `group-hover:${item.hoverRotate}`}`} />
              <span className="text-[14px] flex-1">{item.name}</span>
              {isActive && (
                <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rotate-45" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Theming Section */}
      <div className="mt-auto mb-2">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">Theming</h3>
        <ThemeToggle />
      </div>
    </aside>
  );
}
