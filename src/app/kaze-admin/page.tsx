"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email and password are required.");
      return;
    }

    setErrorMsg("");
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message || "Gagal masuk. Periksa kembali email dan sandi Anda.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch {
      setErrorMsg("Terjadi kesalahan sistem. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-6 overflow-hidden bg-background">
      
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] left-[20%] w-[35%] h-[35%] rounded-full bg-blue-500/10 blur-[130px]" />
        <div className="absolute bottom-[20%] right-[20%] w-[35%] h-[35%] rounded-full bg-teal-500/10 blur-[130px]" />
      </div>

      {/* Glassmorphic Login Card */}
      <div className="relative z-10 w-full max-w-md bg-card/45 backdrop-blur-xl border border-border/80 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 animate-in fade-in zoom-in duration-500">
        
        {/* Branding header */}
        <div className="flex flex-col items-center text-center gap-2">
          {/* Hexagonal admin logo widget */}
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-extrabold text-foreground tracking-tight">
            Kazeetama Admin Access
          </h1>
          <p className="text-xs text-muted-foreground leading-normal">
            Masukkan kredensial admin Anda untuk melanjutkan ke dasbor kontrol.
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          {/* Email input field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
              Email Admin
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@kazeetama.com"
              disabled={isLoading}
              className="w-full bg-muted/20 dark:bg-zinc-900/30 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Password input field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">
              Kata Sandi
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
              className="w-full bg-muted/20 dark:bg-zinc-900/30 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-6 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold text-sm flex items-center justify-center gap-2 group transition-all duration-300 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Memproses masuk...
              </>
            ) : (
              <>
                Masuk Kontrol Panel
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-0.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Back to Home link */}
        <div className="text-center mt-2 shrink-0">
          <Link
            href="/"
            className="text-[11px] font-bold text-muted-foreground hover:text-blue-500 transition-colors uppercase tracking-wider inline-flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Kembali ke Beranda
          </Link>
        </div>

      </div>

    </div>
  );
}
