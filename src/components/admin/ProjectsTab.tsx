import React from "react";
import { DbProject } from "@/app/admin/dashboard/types";

interface ProjectsTabProps {
  dbProjects: DbProject[];
  isFetchingProjects: boolean;
  openCreateForm: () => void;
  openEditForm: (proj: DbProject) => void;
  handleDeleteProject: (slug: string, title: string) => void;
}

export function ProjectsTab({
  dbProjects,
  isFetchingProjects,
  openCreateForm,
  openEditForm,
  handleDeleteProject,
}: ProjectsTabProps) {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center border-b border-border/40 pb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Kelola Projek</h3>
          <p className="text-xs text-muted-foreground">Daftar projek portofolio dinamis di database Supabase.</p>
        </div>
        <button 
          onClick={openCreateForm}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          + Tambah Projek
        </button>
      </div>

      {isFetchingProjects ? (
        <div className="w-full py-20 flex items-center justify-center">
          <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : dbProjects.length === 0 ? (
        <div className="text-center py-20 text-xs text-muted-foreground">
          Belum ada projek di database. Klik tombol &quot;+ Tambah Projek&quot; untuk membuat projek baru!
        </div>
      ) : (
        <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-2 scrollbar-thin">
          {dbProjects.map((proj, idx) => (
            <div key={idx} className="flex justify-between items-center p-4 border border-border/60 bg-muted/10 rounded-xl hover:border-zinc-500 transition-colors">
              <div className="flex flex-col gap-1 pr-4 truncate">
                <span className="text-sm font-bold text-foreground truncate">{proj.title}</span>
                <span className="text-[10px] text-muted-foreground font-mono">{proj.role} • {proj.slug}</span>
              </div>
              <div className="flex items-center gap-2.5 shrink-0">
                <span className={`text-[10px] px-2 py-0.5 font-bold rounded-full ${
                  proj.status === "completed" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                }`}>
                  {proj.status}
                </span>
                
                {/* Edit Button */}
                <button 
                  onClick={() => openEditForm(proj)}
                  className="p-1.5 hover:bg-muted rounded text-xs text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit Projek"
                >
                  ✏️
                </button>
                
                {/* Delete Button */}
                <button 
                  onClick={() => handleDeleteProject(proj.slug, proj.title)}
                  className="p-1.5 hover:bg-red-500/10 rounded text-xs text-red-500 transition-colors"
                  title="Hapus Projek"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
