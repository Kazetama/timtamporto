import React from "react";

export function ContactsTab() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">Pesan Masuk</h3>
        <p className="text-xs text-muted-foreground">
          Sistem saat ini belum menyimpan data pesan kontak ke Supabase Database. Anda dapat melacaknya dengan membuat tabel &apos;contacts&apos; di Supabase.
        </p>
      </div>

      <div className="border border-dashed border-border/80 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-muted/10">
        <div className="text-3xl">📭</div>
        <h4 className="text-sm font-bold text-foreground">Belum ada Integrasi Database Pesan</h4>
        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
          Ingin menyimpan formulir kontak di Supabase? Anda bisa membuat tabel <strong className="text-foreground">contacts</strong> dengan field: <code className="bg-muted px-1.5 py-0.5 rounded font-mono">name, email, subject, message</code>.
        </p>
        <a 
          href="https://supabase.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-500 hover:text-blue-400 mt-2 flex items-center gap-1"
        >
          Buka Dokumentasi Supabase Database
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </div>
  );
}
