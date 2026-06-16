"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

interface DbProject {
  slug: string;
  title: string;
  description: string;
  long_description: string;
  tags: string[];
  github_url?: string;
  live_url?: string;
  status: string;
  image_url: string;
  role: string;
  features: string[];
  challenges: string;
  solutions: string;
  created_at?: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const supabase = createClient();
  
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Projects CRUD State
  const [dbProjects, setDbProjects] = useState<DbProject[]>([]);
  const [isFetchingProjects, setIsFetchingProjects] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Show the project form (Create/Edit)
  const [currentEditSlug, setCurrentEditSlug] = useState<string | null>(null); // Null means Create, string means Edit
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  // Image Upload State
  const [isUploading, setIsUploading] = useState(false);

  // Project Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [tagsInput, setTagsInput] = useState(""); // Comma separated
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [status, setStatus] = useState("completed");
  const [imageUrl, setImageUrl] = useState("/images/placeholder.webp");
  const [role, setRole] = useState("");
  const [featuresInput, setFeaturesInput] = useState(""); // Line separated
  const [challenges, setChallenges] = useState("");
  const [solutions, setSolutions] = useState("");

  // Check auth status
  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/kaze-admin");
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

  // Helper to slugify title
  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  // Handle title input change to auto-fill slug if not custom editing slug
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!currentEditSlug) {
      setSlug(slugify(val));
    }
  };

  // Handle Image File Upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError("");

    try {
      const fileExt = file.name.split(".").pop();
      // Generate a unique path/name for the file
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      // Upload file to Supabase Storage bucket 'project-images'
      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err: unknown) {
      console.error("Storage upload error:", err);
      const message = err instanceof Error ? err.message : String(err);
      setFormError(`Gagal mengunggah gambar: ${message}. Pastikan bucket 'project-images' sudah dibuat di menu Storage Supabase Anda dan di-set ke 'Public'.`);
    } finally {
      setIsUploading(false);
    }
  };

  // Open Create Form
  const openCreateForm = () => {
    setFormError("");
    setCurrentEditSlug(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setLongDescription("");
    setTagsInput("");
    setGithubUrl("");
    setLiveUrl("");
    setStatus("completed");
    setImageUrl("/images/placeholder.webp");
    setRole("");
    setFeaturesInput("");
    setChallenges("");
    setSolutions("");
    setIsEditing(true);
  };

  // Open Edit Form
  const openEditForm = (proj: DbProject) => {
    setFormError("");
    setCurrentEditSlug(proj.slug);
    setTitle(proj.title);
    setSlug(proj.slug);
    setDescription(proj.description);
    setLongDescription(proj.long_description);
    setTagsInput(proj.tags ? proj.tags.join(", ") : "");
    setGithubUrl(proj.github_url || "");
    setLiveUrl(proj.live_url || "");
    setStatus(proj.status);
    setImageUrl(proj.image_url);
    setRole(proj.role);
    setFeaturesInput(proj.features ? proj.features.join("\n") : "");
    setChallenges(proj.challenges || "");
    setSolutions(proj.solutions || "");
    setIsEditing(true);
  };

  // Save Project (Insert or Update)
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    
    // Validations (Only Title, Slug, Description, Long Description, and Role are mandatory)
    if (!title.trim() || !slug.trim() || !description.trim() || !longDescription.trim() || !role.trim()) {
      setFormError("Mohon lengkapi semua kolom wajib (Judul, Slug, Deskripsi, Deskripsi Lengkap, dan Peran)!");
      return;
    }

    setIsSaving(true);

    // Parse arrays (Allow empty)
    const tags = tagsInput.trim()
      ? tagsInput
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t.length > 0)
      : [];

    const features = featuresInput.trim()
      ? featuresInput
          .split("\n")
          .map((f) => f.trim())
          .filter((f) => f.length > 0)
      : [];

    const projectPayload = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      long_description: longDescription.trim(),
      tags,
      github_url: githubUrl.trim() || null,
      live_url: liveUrl.trim() || null,
      status,
      image_url: imageUrl.trim() || "/images/placeholder.webp",
      role: role.trim(),
      features,
      challenges: challenges.trim() || "",
      solutions: solutions.trim() || "",
    };

    try {
      if (currentEditSlug) {
        // Edit mode (Update)
        const { error } = await supabase
          .from("projects")
          .update(projectPayload)
          .eq("slug", currentEditSlug);

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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
          <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                Total Projects (Database)
              </span>
              <div className="text-3xl font-extrabold text-foreground">
                {dbProjects.length}
              </div>
              <span className="text-xs text-muted-foreground">Loaded from Supabase</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </div>
          </div>

          <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                Database Provider
              </span>
              <div className="text-3xl font-extrabold text-teal-400">
                Supabase
              </div>
              <span className="text-xs text-muted-foreground">Status: Connected</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                <path d="M3 12A9 3 0 0 0 21 12" />
              </svg>
            </div>
          </div>

          <div className="border border-border/80 bg-card/60 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between hover:border-zinc-500 transition-all duration-300 shadow-sm">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
                Sesi Autentikasi
              </span>
              <div className="text-2xl font-extrabold text-purple-400 truncate max-w-[200px]" title={user.email}>
                Active Admin
              </div>
              <span className="text-xs text-muted-foreground">ID: {user.id.substring(0, 8)}...</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
          </div>
        </div>

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
            
            {activeTab === "overview" && (
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
            )}

            {activeTab === "projects" && !isEditing && (
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
            )}

            {/* CREATE / EDIT PROJECT FORM */}
            {activeTab === "projects" && isEditing && (
              <div className="flex flex-col gap-6 animate-in zoom-in duration-300">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-foreground">
                      {currentEditSlug ? `Edit Projek: ${title}` : "Buat Projek Baru"}
                    </h3>
                    <p className="text-xs text-muted-foreground">Isi detail lengkap projek portofolio Anda di bawah.</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(false)}
                    className="px-3 py-1.5 text-xs border border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg transition-colors"
                  >
                    Kembali
                  </button>
                </div>

                {formError && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-3 flex items-start gap-2.5 text-xs text-red-500 font-medium">
                    <span>⚠️ {formError}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProject} className="flex flex-col gap-4 text-xs">
                  {/* Grid for basics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Judul Projek *</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={handleTitleChange} 
                        placeholder="Contoh: Kazeetama Portofolio"
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Slug Projek (URL) *</label>
                      <input 
                        type="text" 
                        value={slug} 
                        onChange={(e) => setSlug(slugify(e.target.value))} 
                        placeholder="Contoh: kazeetama-portofolio"
                        disabled={!!currentEditSlug} // Cannot edit slug once created (primary key)
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Peran / Role *</label>
                      <input 
                        type="text" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        placeholder="Contoh: Full-Stack Developer"
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Status Projek *</label>
                      <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Upload Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border border-border/40 p-4 rounded-2xl bg-muted/5">
                    <div className="flex flex-col gap-1.5 justify-center">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Unggah Gambar Projek (.webp/.png) *</label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        disabled={isUploading}
                        className="bg-muted/20 border border-border/80 rounded-xl px-3 py-2 text-foreground outline-none cursor-pointer focus:border-blue-500"
                      />
                      {isUploading && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-blue-400">
                          <svg className="animate-spin h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Sedang mengunggah file...</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 justify-center">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">URL Gambar Hasil Upload</label>
                      <input 
                        type="text" 
                        value={imageUrl} 
                        onChange={(e) => setImageUrl(e.target.value)} 
                        placeholder="Path gambar (akan terisi otomatis setelah upload)"
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Deskripsi Singkat (Card) *</label>
                    <input 
                      type="text" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Ringkasan pendek 1-2 kalimat untuk kartu projek"
                      className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Project Overview (Deskripsi Lengkap) *</label>
                    <textarea 
                      value={longDescription} 
                      onChange={(e) => setLongDescription(e.target.value)} 
                      placeholder="Jelaskan detail detail projek Anda secara mendalam..."
                      rows={4}
                      className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Teknologi (Tags) (Opsional)</label>
                      <input 
                        type="text" 
                        value={tagsInput} 
                        onChange={(e) => setTagsInput(e.target.value)} 
                        placeholder="Next.js, Tailwind CSS, TypeScript (pisahkan dengan koma)"
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Key Features (Fitur Utama) (Opsional)</label>
                      <textarea 
                        value={featuresInput} 
                        onChange={(e) => setFeaturesInput(e.target.value)} 
                        placeholder="Fitur A&#10;Fitur B&#10;Fitur C (Tuliskan satu fitur per baris)"
                        rows={3}
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">GitHub Repo URL</label>
                      <input 
                        type="text" 
                        value={githubUrl} 
                        onChange={(e) => setGithubUrl(e.target.value)} 
                        placeholder="https://github.com/..."
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Live Demo URL</label>
                      <input 
                        type="text" 
                        value={liveUrl} 
                        onChange={(e) => setLiveUrl(e.target.value)} 
                        placeholder="https://..."
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Tantangan (Challenge) (Opsional)</label>
                      <textarea 
                        value={challenges} 
                        onChange={(e) => setChallenges(e.target.value)} 
                        placeholder="Apa kendala/tantangan terbesar saat membuat projek ini?"
                        rows={3}
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-muted-foreground uppercase tracking-wider pl-1">Solusi (Solution) (Opsional)</label>
                      <textarea 
                        value={solutions} 
                        onChange={(e) => setSolutions(e.target.value)} 
                        placeholder="Bagaimana cara Anda memecahkan kendala tersebut?"
                        rows={3}
                        className="bg-muted/20 border border-border/80 rounded-xl px-3.5 py-2.5 text-foreground outline-none transition-all duration-300 focus:bg-background/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSaving || isUploading}
                    className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2 shadow"
                  >
                    {isSaving ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Menyimpan ke Database...
                      </>
                    ) : (
                      "Simpan Projek"
                    )}
                  </button>
                </form>
              </div>
            )}

            {activeTab === "contacts" && (
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
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
