"use client";

import React, { useState } from "react";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
}

export default function PublicChatPage() {
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "Teuku Aryansyah",
      avatar: "TK",
      content: "Halo! Selamat datang di ruang obrolan publik portofolio saya. 👋",
      timestamp: "10:42 AM",
      isSelf: true,
    },
    {
      id: "2",
      sender: "Visitor",
      avatar: "V",
      content: "Wah keren banget websitenya, animasinya smooth dan performanya kenceng!",
      timestamp: "10:44 AM",
      isSelf: false,
    },
    {
      id: "3",
      sender: "Teuku Aryansyah",
      avatar: "TK",
      content: "Terima kasih banyak! Ini dibangun menggunakan Next.js dan Tailwind CSS v4. Silakan tinggalkan pesan!",
      timestamp: "10:45 AM",
      isSelf: true,
    },
  ]);

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
        <div className="flex flex-col gap-4 items-start mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">Interactive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Public Chat Room
          </h1>
          <p className="text-[15px] md:text-lg text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            An open chat space where you can say hello, give feedback, or leave a message.
          </p>
        </div>

        {/* Chat Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          
          {/* Left Column: Chat Area Box (2/3 width) */}
          <div className="lg:col-span-2 flex flex-col h-[520px] w-full">
            <div className="border border-border bg-card rounded-2xl flex-1 flex flex-col h-full overflow-hidden shadow-lg">
              
              {/* Chat Header */}
              <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between bg-card/60 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-bold text-foreground">Live Room</span>
                </div>
                <span className="text-[11px] text-muted-foreground bg-muted px-2.5 py-1 rounded border border-border/40 font-medium">
                  Read-Only Demo Mode
                </span>
              </div>

              {/* Message List */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5 bg-card/20 scrollbar-thin">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex gap-3 max-w-[85%] ${message.isSelf ? "self-end flex-row-reverse" : "self-start"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 select-none shadow-sm ${
                      message.isSelf 
                        ? "bg-blue-500/10 border-blue-500/30 text-blue-500" 
                        : "bg-muted border border-border text-foreground"
                    }`}>
                      {message.avatar}
                    </div>
                    
                    {/* Text bubble */}
                    <div className={`flex flex-col gap-1.5 ${message.isSelf ? "items-end" : "items-start"}`}>
                      <div className={`flex items-center gap-2 px-1 ${message.isSelf ? "flex-row-reverse" : ""}`}>
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-bold text-foreground">{message.sender}</span>
                          {message.isSelf && (
                            <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] text-[#1D9BF0] flex-shrink-0" fill="currentColor">
                              <path d="M22.5 12.5c0-1.58-.8-2.95-2.02-3.74.46-1.5.14-3.23-1.06-4.43-1.2-1.2-2.92-1.52-4.43-1.06C14.2 2.05 12.83 1.25 11.25 1.25s-2.95.8-3.74 2.02C6 2.8 4.27 3.12 3.07 4.32c-1.2 1.2-1.52 2.92-1.06 4.43C.8 9.55 0 10.92 0 12.5s.8 2.95 2.02 3.74c-.46 1.5-.14 3.23 1.06 4.43 1.2 1.2 2.92 1.52 4.43 1.06 1.18 1.22 2.55 2.02 4.13 2.02s2.95-.8 3.74-2.02c1.5.46 3.23.14 4.43-1.06 1.2-1.2 1.52-2.92 1.06-4.43 1.22-1.18 2.02-2.55 2.02-4.13zm-13.5 3l-3-3 1.41-1.42L9 12.59l5.59-5.59 1.41 1.42-7 7z"></path>
                            </svg>
                          )}
                        </div>
                        <span className="text-[9px] text-muted-foreground">{message.timestamp}</span>
                      </div>
                      
                      <div className={`border px-4 py-2.5 rounded-2xl text-[13px] sm:text-sm leading-relaxed shadow-sm ${
                        message.isSelf 
                          ? "bg-blue-50 dark:bg-blue-500/10 border-blue-200/60 dark:border-blue-500/20 rounded-tr-none text-foreground" 
                          : "bg-muted/70 border-border/60 rounded-tl-none text-foreground"
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border/60 bg-muted/30">
                <div className="flex gap-2 relative">
                  <input 
                    type="text" 
                    disabled 
                    placeholder="Real-time chat integration with Supabase coming soon..."
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-xs md:text-sm text-muted-foreground cursor-not-allowed outline-none select-none"
                  />
                  <button 
                    disabled
                    className="bg-accent border border-border px-5 rounded-xl text-xs md:text-sm font-bold text-muted-foreground cursor-not-allowed flex items-center justify-center"
                  >
                    Send
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Chat Info / Guidelines / Online List (1/3 width) */}
          <div className="flex flex-col gap-6 w-full">
            
            {/* Room Info & Guidelines */}
            <div className="border border-border bg-card rounded-2xl p-6 hover:border-zinc-500 transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-card-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">
                Room Guidelines
              </h3>
              <ul className="flex flex-col gap-3 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Respectful:</strong> Keep discussions friendly and professional.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Topics:</strong> Feel free to discuss Web Dev, React, Laravel, or UX.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">•</span>
                  <span><strong>Spam Free:</strong> Avoid self-promotion or flooding the feed.</span>
                </li>
              </ul>
            </div>

            {/* Active Members Mock */}
            <div className="border border-border bg-card rounded-2xl p-6 hover:border-zinc-500 transition-colors shadow-sm">
              <h3 className="text-sm font-bold text-card-foreground mb-4 uppercase tracking-wider border-b border-border pb-2">
                Who&apos;s Online (3)
              </h3>
              <div className="flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-500 shrink-0">
                    TK
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      Teuku Aryansyah
                      <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] text-[#1D9BF0] flex-shrink-0" fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.8-2.95-2.02-3.74.46-1.5.14-3.23-1.06-4.43-1.2-1.2-2.92-1.52-4.43-1.06C14.2 2.05 12.83 1.25 11.25 1.25s-2.95.8-3.74 2.02C6 2.8 4.27 3.12 3.07 4.32c-1.2 1.2-1.52 2.92-1.06 4.43C.8 9.55 0 10.92 0 12.5s.8 2.95 2.02 3.74c-.46 1.5-.14 3.23 1.06 4.43 1.2 1.2 2.92 1.52 4.43 1.06 1.18 1.22 2.55 2.02 4.13 2.02s2.95-.8 3.74-2.02c1.5.46 3.23.14 4.43-1.06 1.2-1.2 1.52-2.92 1.06-4.43 1.22-1.18 2.02-2.55 2.02-4.13zm-13.5 3l-3-3 1.41-1.42L9 12.59l5.59-5.59 1.41 1.42-7 7z"></path>
                      </svg>
                    </span>
                    <span className="text-[10px] text-muted-foreground">Host • Active</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center text-xs font-bold text-foreground shrink-0">
                    V1
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground">Guest-382</span>
                    <span className="text-[10px] text-muted-foreground">Active now</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex-shrink-0 flex items-center justify-center text-xs font-bold text-foreground">
                    V2
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-foreground">Guest-904</span>
                    <span className="text-[10px] text-muted-foreground">Active now</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
