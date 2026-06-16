"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { DbProject } from "@/app/admin/dashboard/types";

interface ProjectFormProps {
  project: DbProject | null; // Null means Create, DbProject means Edit
  onCancel: () => void;
  onSave: (payload: Omit<DbProject, "created_at">) => Promise<void>;
  isSaving: boolean;
  formError: string;
  setFormError: (err: string) => void;
}

export function ProjectForm({
  project,
  onCancel,
  onSave,
  isSaving,
  formError,
  setFormError,
}: ProjectFormProps) {
  const supabase = createClient();

  // Local form states initialized from project prop
  const [title, setTitle] = useState(project?.title || "");
  const [slug, setSlug] = useState(project?.slug || "");
  const [role, setRole] = useState(project?.role || "");
  const [status, setStatus] = useState(project?.status || "completed");
  const [imageUrl, setImageUrl] = useState(project?.image_url || "/images/placeholder.webp");
  const [description, setDescription] = useState(project?.description || "");
  const [longDescription, setLongDescription] = useState(project?.long_description || "");
  const [tagsInput, setTagsInput] = useState(project?.tags ? project.tags.join(", ") : "");
  const [featuresInput, setFeaturesInput] = useState(project?.features ? project.features.join("\n") : "");
  const [githubUrl, setGithubUrl] = useState(project?.github_url || "");
  const [liveUrl, setLiveUrl] = useState(project?.live_url || "");
  const [challenges, setChallenges] = useState(project?.challenges || "");
  const [solutions, setSolutions] = useState(project?.solutions || "");

  const [isUploading, setIsUploading] = useState(false);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!project) {
      setSlug(slugify(val));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setFormError("");

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim() || !slug.trim() || !description.trim() || !longDescription.trim() || !role.trim()) {
      setFormError("Mohon lengkapi semua kolom wajib (Judul, Slug, Deskripsi, Deskripsi Lengkap, dan Peran)!");
      return;
    }

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

    const payload: Omit<DbProject, "created_at"> = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      long_description: longDescription.trim(),
      tags,
      github_url: githubUrl.trim() || undefined,
      live_url: liveUrl.trim() || undefined,
      status,
      image_url: imageUrl.trim(),
      role: role.trim(),
      features,
      challenges: challenges.trim(),
      solutions: solutions.trim(),
    };

    await onSave(payload);
  };

  return (
    <div className="flex flex-col gap-6 animate-in zoom-in duration-300">
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-foreground">
            {project ? `Edit Projek: ${title}` : "Buat Projek Baru"}
          </h3>
          <p className="text-xs text-muted-foreground">Isi detail lengkap projek portofolio Anda di bawah.</p>
        </div>
        <button 
          type="button"
          onClick={onCancel}
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
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
              disabled={!!project} // Cannot edit slug once created
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
  );
}
