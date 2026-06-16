import React from "react";

export function OverviewTab() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-2">Ringkasan Sistem</h3>
        <p className="text-xs text-muted-foreground">
          Semua sistem berjalan dengan normal. Autentikasi dikunci melalui middleware internal portofolio.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <div className="bg-muted/30 border border-border/60 p-4 rounded-xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Supabase Auth URL</span>
          <span className="text-xs text-foreground font-mono break-all select-all">
            {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </span>
        </div>
        <div className="bg-muted/30 border border-border/60 p-4 rounded-xl">
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-2">Client Environment</span>
          <span className="text-xs text-foreground font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
            Next.js Production / Dev Mode
          </span>
        </div>
      </div>

      <div className="border-t border-border/40 pt-4 flex flex-col gap-3">
        <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Langkah Keamanan Berikutnya:</h4>
        <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
          <li>Pastikan Anda telah menonaktifkan <strong className="text-foreground font-semibold">Self-Signup</strong> di panel Auth Supabase untuk keamanan penuh.</li>
          <li>Sesi login Anda dilindungi oleh cookie berbasis HTTP-Only yang didekripsi secara aman oleh server-side middleware.</li>
          <li>Seluruh data dinamis dimuat menggunakan Supabase JS client secara real-time.</li>
        </ul>
      </div>
    </div>
  );
}
