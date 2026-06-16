"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Message {
  id: string;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  isSelf: boolean;
  replyTo?: {
    id: string;
    sender: string;
    content: string;
  };
}

export default function PublicChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Teuku Aryansyah",
      avatar: "https://github.com/kazetama.png",
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
      avatar: "https://github.com/kazetama.png",
      content: "Terima kasih banyak! Ini dibangun menggunakan Next.js dan Tailwind CSS. Silakan tinggalkan pesan!",
      timestamp: "10:45 AM",
      isSelf: true,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const now = new Date();
    const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "Teuku Aryansyah",
      avatar: "https://github.com/kazetama.png",
      content: inputValue.trim(),
      timestamp: timestamp,
      isSelf: true,
    };

    if (replyingTo) {
      newMessage.replyTo = {
        id: replyingTo.id,
        sender: replyingTo.sender,
        content: replyingTo.content,
      };
      setReplyingTo(null);
    }

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");

    // Simulate an automatic response from Visitor 1.5 seconds later
    setTimeout(() => {
      const visitorReplies = [
        "Wah menarik sekali! Fitur reply chat-nya mulus banget seperti aplikasi chat sungguhan.",
        "Keren sekali kodenya! Boleh bagikan repositori GitHub-nya?",
        "Desain antarmukanya premium dan bersih sekali. Suka sekali dengan glassmorphism-nya!",
        "Halo Teuku! Sukses terus untuk projek portofolionya. Sangat inspiratif!",
      ];
      const randomReply = visitorReplies[Math.floor(Math.random() * visitorReplies.length)];

      const visitorMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "Visitor",
        avatar: "V",
        content: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSelf: false,
        replyTo: {
          id: newMessage.id,
          sender: newMessage.sender,
          content: newMessage.content,
        }
      };
      setMessages((prev) => [...prev, visitorMsg]);
    }, 1500);
  };

  const handleQuoteClick = (replyToId: string) => {
    const targetElement = document.getElementById(`msg-${replyToId}`);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      targetElement.classList.add("bg-blue-500/10", "dark:bg-blue-500/20");
      setTimeout(() => {
        targetElement.classList.remove("bg-blue-500/10", "dark:bg-blue-500/20");
      }, 1000);
    }
  };

  return (
    <div className="relative w-full min-h-screen md:h-screen md:min-h-0 pt-12 md:pt-8 pb-12 md:pb-6 px-6 md:px-12 flex flex-col items-center md:items-start md:overflow-hidden">
      
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/8" />
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-teal-500/10 blur-[130px] dark:bg-teal-500/8" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-8 md:mt-0 md:flex-1 md:flex md:flex-col md:min-h-0">
        
        {/* Header Section */}
        <div className="flex flex-col gap-3 md:gap-1.5 items-start mb-8 md:mb-4 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">Interaktif</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Ruang Obrolan Publik
          </h1>
          <p className="text-[15px] md:text-sm text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Tinggalkan pesan, berikan masukan, atau sapa saya secara langsung di ruang obrolan simulasi interaktif ini.
          </p>
        </div>

        {/* Chat Box (Centered, fills screen on desktop) */}
        <div className="w-full border border-border/80 bg-card/50 backdrop-blur-lg rounded-3xl overflow-hidden flex flex-col shadow-2xl md:flex-1 md:min-h-0">
          
          {/* Chat Room Header */}
          <div className="px-6 py-4 border-b border-border/60 flex items-center justify-between bg-card/60 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-bold text-foreground">Live Simulation Room</span>
            </div>
            <span className="text-[10px] text-muted-foreground bg-muted border border-border/40 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider">
              Interactive Demo
            </span>
          </div>

          {/* Messages Container */}
          <div 
            ref={messagesContainerRef}
            className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 bg-card/10 scrollbar-thin md:min-h-0"
          >
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex gap-3 max-w-[85%] group ${
                  message.isSelf ? "self-end flex-row-reverse" : "self-start"
                }`}
              >
                {/* Avatar */}
                <div className="relative w-9 h-9 rounded-full overflow-hidden border border-border flex-shrink-0 flex items-center justify-center text-xs font-bold shadow-sm bg-muted text-foreground">
                  {message.isSelf ? (
                    <Image
                      src={message.avatar}
                      alt="My Profile Picture"
                      fill
                      sizes="36px"
                      priority
                      className="object-cover"
                    />
                  ) : (
                    message.avatar
                  )}
                </div>

                {/* Bubble & Action Container */}
                <div className={`flex items-start gap-2 ${message.isSelf ? "flex-row-reverse" : ""}`}>
                  
                  {/* Bubble Content */}
                  <div 
                    id={`msg-${message.id}`}
                    className={`flex flex-col gap-1 rounded-2xl border px-4 py-2.5 transition-colors duration-300 shadow-sm ${
                      message.isSelf
                        ? "bg-blue-600/10 border-blue-500/25 rounded-tr-none text-foreground"
                        : "bg-muted/70 border-border/60 rounded-tl-none text-foreground"
                    }`}
                  >
                    {/* Quoted Message (Reply Box) */}
                    {message.replyTo && (
                      <div 
                        onClick={() => handleQuoteClick(message.replyTo!.id)}
                        className="mb-2 p-2 rounded-lg bg-black/10 dark:bg-black/25 border-l-2 border-blue-500 text-[11px] text-muted-foreground flex flex-col gap-0.5 cursor-pointer max-w-full hover:bg-black/15 dark:hover:bg-black/35 transition-colors"
                      >
                        <span className="font-extrabold text-[10px] text-blue-500">{message.replyTo.sender}</span>
                        <span className="truncate max-w-[250px] sm:max-w-sm">{message.replyTo.content}</span>
                      </div>
                    )}

                    <div className="flex items-baseline gap-2 justify-between">
                      <span className="text-[11px] font-bold text-foreground">
                        {message.isSelf ? "Anda" : message.sender}
                      </span>
                      <span className="text-[9px] text-muted-foreground font-medium select-none">
                        {message.timestamp}
                      </span>
                    </div>

                    <p className="text-[13px] sm:text-sm leading-relaxed mt-1 text-balance whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>

                  {/* Reply Action Trigger (appears on hover) */}
                  <button
                    onClick={() => setReplyingTo(message)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-center p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground mx-1 shrink-0"
                    title="Balas pesan"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <polyline points="9 17 4 12 9 7" />
                      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
                    </svg>
                  </button>

                </div>

              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Reply Preview Banner */}
          {replyingTo && (
            <div className="px-6 py-2.5 bg-muted/60 border-t border-border flex items-center justify-between shrink-0 animate-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center gap-3 border-l-2 border-blue-500 pl-3">
                <div className="flex flex-col gap-0.5 text-xs">
                  <span className="font-bold text-[10px] text-blue-500 uppercase tracking-wide">
                    Membalas ke {replyingTo.isSelf ? "Anda" : replyingTo.sender}
                  </span>
                  <span className="text-muted-foreground line-clamp-1 max-w-[200px] sm:max-w-md md:max-w-xl">
                    {replyingTo.content}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-muted-foreground hover:text-foreground p-1 hover:bg-muted rounded-full transition-colors"
                title="Batal balas"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}

          {/* Chat Input Form */}
          <div className="p-4 border-t border-border/60 bg-muted/30 shrink-0">
            <form onSubmit={handleSendMessage} className="flex gap-2.5 relative">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Tuliskan pesan Anda di sini..."
                className="w-full bg-card border border-border rounded-xl px-4 py-3.5 text-xs md:text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button 
                type="submit"
                className="bg-foreground hover:bg-foreground/90 text-background px-6 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-[0.98] shadow-md hover:shadow-lg"
              >
                Kirim
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
