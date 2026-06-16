"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { DbProject } from "./types";

// Import modular subcomponents
import { StatsGrid } from "@/components/admin/StatsGrid";
import { OverviewTab } from "@/components/admin/OverviewTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { ContactsTab } from "@/components/admin/ContactsTab";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Projects CRUD State
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);
  const [isEditing, setIsEditing] = useState(false); 
  const [currentEditProject, setCurrentEditProject] = useState<DbProject | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Check auth status
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
        // Load projects immediately
        fetchProjects();
      }
      setLoading(false);
    }
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [supabase, router]);

  // Fetch projects from Supabase
  const fetchProjects = async () => {
    setIsFetchingProjects(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setDbProjects(data || []);
      }
    } catch (err) {
      console.error("System error fetching projects:", err);
    } finally {
      setIsFetchingProjects(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // Open Create Form
  const openCreateForm = () => {
    setFormError("");
    setCurrentEditProject(null);
    setIsEditing(true);
  };

  // Open Edit Form
  const openEditForm = (proj: DbProject) => {
    setFormError("");
    setCurrentEditProject(proj);
    setIsEditing(true);
  };

  // Save Project (Insert or Update)
  const handleSaveProject = async (projectPayload: Omit<DbProject, "created_at">) => {
    setFormError("");
    setIsSaving(true);

    try {
      if (currentEditProject) {
        // Edit mode (Update)
        const { error } = await supabase
          .from("projects")
          .update(projectPayload)
          .eq("slug", currentEditProject.slug);

        if (error) throw error;
      } else {
        // Create mode (Insert)
        // Check if slug already exists
        const { data: existingProj } = await supabase
          .from("projects")
          .select("slug")
          .eq("slug", projectPayload.slug)
          .maybeSingle();

        if (existingProj) {
          setFormError(`Slug "${projectPayload.slug}" sudah digunakan. Silakan gunakan slug lain.`);
          setIsSaving(false);
          return;
        }

        const { error } = await supabase.from("projects").insert([projectPayload]);
        if (error) throw error;
      }

      // Success
      setIsEditing(false);
      fetchProjects();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gagal menyimpan projek. Periksa koneksi atau schema tabel Anda.";
      setFormError(message);
    } finally {
      setIsSaving(false);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projSlug: string, projTitle: string) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus projek "${projTitle}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    try {
      const { error } = await supabase.from("projects").delete().eq("slug", projSlug);
      if (error) throw error;
      fetchProjects();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      alert(`Gagal menghapus projek: ${message}`);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <svg className="animate-spin h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm text-muted-foreground font-semibold">Mengautentikasi sesi admin...</span>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="relative w-full min-h-screen pt-12 md:pt-24 pb-12 px-6 md:px-12 flex flex-col items-center md:items-start overflow-hidden bg-background">
      
      {/* Dynamic Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at center, currentColor 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] dark:bg-blue-500/8" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px] dark:bg-teal-500/8" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-8 md:mt-12">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 w-full border-b border-border/40 pb-6">
          <div className="flex flex-col gap-2.5 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-xs font-bold text-blue-500 tracking-wide uppercase">Admin Dashboard Securitas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
              Kazeetama Control Center
            </h1>
            <p className="text-sm text-muted-foreground">
              Selamat datang kembali, <strong className="text-foreground">{user.email}</strong>
            </p>
          </div>

          {/* Action Header Buttons */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <Link 
              href="/dashboard"
              className="px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-xs font-bold text-foreground transition-all duration-300 shadow-sm flex items-center gap-1.5"
            >
              Lihat Statistik Publik
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all duration-300 shadow-sm flex items-center gap-1.5"
            >
              Keluar Sesi
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats Summary Grid */}
        <StatsGrid 
          dbProjectsCount={dbProjects.length} 
          userEmail={user.email || null} 
          userId={user.id} 
        />

        {/* Dashboard Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full items-start">
          
          {/* Navigation/Sidebar Admin */}
          <div className="flex flex-col gap-3">
            {[
              { id: "overview", name: "Ringkasan Sistem", desc: "Status database & statistik portofolio", icon: "📊" },
              { id: "projects", name: "Kelola Projek", desc: "Manajemen data projek di Supabase", icon: "📁" },
              { id: "contacts", name: "Pesan Masuk", desc: "Daftar kontak formulir portofolio", icon: "✉️" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsEditing(false); // Reset form view when switching tabs
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                  activeTab === tab.id
                    ? "bg-card border-blue-500/40 shadow-md translate-x-1"
                    : "bg-card/40 border-border hover:bg-card/75"
                }`}
              >
                <div className="text-2xl">{tab.icon}</div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-foreground">{tab.name}</span>
                  <span className="text-[11px] text-muted-foreground leading-normal">{tab.desc}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Main Workspace Area (2/3 width) */}
          <div className="lg:col-span-2 border border-border/80 bg-card/50 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-xl min-h-[450px]">
            
            {activeTab === "overview" && <OverviewTab />}

            {activeTab === "projects" && !isEditing && (
              <ProjectsTab 
                dbProjects={dbProjects}
                isFetchingProjects={isFetchingProjects}
                openCreateForm={openCreateForm}
                openEditForm={openEditForm}
                handleDeleteProject={handleDeleteProject}
              />
            )}

            {activeTab === "projects" && isEditing && (
              <ProjectForm 
                project={currentEditProject}
                onCancel={() => setIsEditing(false)}
                onSave={handleSaveProject}
                isSaving={isSaving}
                formError={formError}
                setFormError={setFormError}
              />
            )}

            {activeTab === "contacts" && <ContactsTab />}

          </div>

        </div>

      </div>
    </div>
  );
}
