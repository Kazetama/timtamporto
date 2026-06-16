"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Home01Icon,
  Folder01Icon,
  DashboardSquare01Icon,
  BubbleChatIcon,
  Mail01Icon,
  ArrowDown01Icon,
  ArrowUp01Icon,
  ArrowUpRight01Icon
} from "@hugeicons/core-free-icons";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
} from "@/components/ui/drawer";
import Image from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

const navItems = [
  { name: "Home", href: "/", icon: Home01Icon },
  { name: "Projects", href: "/projects", icon: Folder01Icon },
  { name: "Dashboard", href: "/dashboard", icon: DashboardSquare01Icon },
  { name: "Public Chat", href: "/public-chat", icon: BubbleChatIcon },
  { name: "Contact", href: "/contact", icon: Mail01Icon },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] md:hidden">
        <div className="bg-[#141414]/90 backdrop-blur-xl border border-zinc-800 rounded-full px-4 py-3 flex items-center gap-5 shadow-2xl">
          
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            
            return isActive ? (
              <div key={item.href} className="bg-zinc-800/50 p-2 rounded-full border border-zinc-700/50 flex items-center justify-center transition-all duration-300 scale-105 shadow-inner">
                <Link href={item.href} className="text-white hover:text-white transition-colors">
                  <HugeiconsIcon icon={item.icon} className="w-[20px] h-[20px] drop-shadow-md" />
                </Link>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="text-zinc-500 hover:text-white transition-all duration-300 active:scale-90 hover:-translate-y-0.5">
                <HugeiconsIcon icon={item.icon} className="w-[22px] h-[22px]" />
              </Link>
            );
          })}

          <div className="w-[1px] h-6 bg-zinc-800 mx-1"></div>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <button className={`text-zinc-400 hover:text-white transition-all duration-300 outline-none focus:outline-none active:scale-90 ${open ? 'text-white' : ''}`}>
                <HugeiconsIcon icon={open ? ArrowDown01Icon : ArrowUp01Icon} className="w-[22px] h-[22px] transition-transform duration-300 drop-shadow-md" />
              </button>
            </DrawerTrigger>
            
            {/* Dark Mode Drawer overlay handles itself, but we should make sure the DrawerContent looks like the sidebar */}
            <DrawerContent className="bg-background border-none px-4 pb-8 flex flex-col gap-6 outline-none">
              <DrawerTitle className="sr-only">Mobile Menu</DrawerTitle>
              
              <div className="flex-1 flex flex-col gap-6 pb-2">

                {/* Profile Section inside Drawer */}
                <div className="flex items-center gap-4 group cursor-pointer mt-2">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-muted border border-border flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-active:scale-95">
                    <Image
                      src="/images/profile.webp"
                      alt="Profile Picture"
                      fill
                      sizes="56px"
                      priority
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-1 group-hover:text-white transition-colors text-foreground">
                      <h2 className="text-[16px] font-bold tracking-tight line-clamp-1">Teuku Aryansyah Pratama</h2>
                      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] text-[#1D9BF0] flex-shrink-0" fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.8-2.95-2.02-3.74.46-1.5.14-3.23-1.06-4.43-1.2-1.2-2.92-1.52-4.43-1.06C14.2 2.05 12.83 1.25 11.25 1.25s-2.95.8-3.74 2.02C6 2.8 4.27 3.12 3.07 4.32c-1.2 1.2-1.52 2.92-1.06 4.43C.8 9.55 0 10.92 0 12.5s.8 2.95 2.02 3.74c-.46 1.5-.14 3.23 1.06 4.43 1.2 1.2 2.92 1.52 4.43 1.06 1.18 1.22 2.55 2.02 4.13 2.02s2.95-.8 3.74-2.02c1.5.46 3.23.14 4.43-1.06 1.2-1.2 1.52-2.92 1.06-4.43 1.22-1.18 2.02-2.55 2.02-4.13zm-13.5 3l-3-3 1.41-1.42L9 12.59l5.59-5.59 1.41 1.42-7 7z"></path>
                      </svg>
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] mt-0.5">
                      <div className="flex items-center gap-1.5 text-green-500 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Online
                      </div>
                      <span className="text-muted-foreground">|</span>
                      <span className="text-muted-foreground">@kazeetama</span>
                    </div>
                  </div>
                  <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                {/* Theme Toggle Area */}
                <div className="bg-card border border-border rounded-xl p-3 shadow-sm hover:border-zinc-500 transition-colors">
                  <ThemeToggle />
                </div>

                {/* Navigation Menu */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Menu</h3>
                  
                  {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link 
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 px-3 py-3 rounded-lg group transition-all duration-300 active:scale-[0.98] ${isActive ? 'bg-accent text-accent-foreground font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'}`}
                      >
                        <HugeiconsIcon icon={item.icon} className={`w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110 ${isActive ? '' : 'group-hover:-rotate-6'}`} />
                        <span className="text-[14px] flex-1">{item.name}</span>
                        {isActive && (
                          <HugeiconsIcon icon={ArrowUpRight01Icon} className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rotate-45" />
                        )}
                      </Link>
                    )
                  })}
                </div>

                {/* Spacer strictly for floating capsule clearance */}
                <div className="h-[90px] w-full flex-shrink-0"></div>

              </div> {/* End Scrollable Area */}
            </DrawerContent>
          </Drawer>

        </div>
      </div>
    </>
  );
}
