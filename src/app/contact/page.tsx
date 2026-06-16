"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamic import of Leaflet Map to prevent SSR "window is not defined" issues
const ContactMap = dynamic(() => import("@/components/widgets/ContactMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] md:min-h-[450px] bg-muted/30 dark:bg-zinc-900/30 rounded-2xl flex items-center justify-center border border-border/80 animate-pulse">
      <div className="flex flex-col items-center gap-3">
        <svg className="animate-spin h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <span className="text-xs text-muted-foreground font-medium">Loading map widget...</span>
      </div>
    </div>
  ),
});

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }
    if (!subject.trim()) newErrors.subject = "Subject is required";
    if (!message.trim()) newErrors.message = "Message is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      // Clear success alert after 6 seconds
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1800);
  };

  const socials = [
    {
      id: "mail",
      name: "Email Address",
      handle: "teukuaryansyah@gmail.com",
      href: "mailto:teukuaryansyah@gmail.com",
      colorClass: "hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/10 text-red-500 bg-red-500/5 dark:bg-red-500/10 border-red-500/10",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: "github",
      name: "GitHub Profile",
      handle: "@kazetama",
      href: "https://github.com/kazetama",
      colorClass: "hover:text-foreground hover:border-foreground/30 hover:bg-foreground/10 text-zinc-600 dark:text-zinc-400 bg-zinc-500/5 dark:bg-zinc-500/10 border-zinc-500/10",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ),
    },
    {
      id: "linkedin",
      name: "LinkedIn Network",
      handle: "Teuku Aryansyah Pratama",
      href: "https://linkedin.com/in/teukuaryansyahpratama",
      colorClass: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10 text-blue-500 bg-blue-500/5 dark:bg-blue-500/10 border-blue-500/10",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      id: "instagram",
      name: "Instagram",
      handle: "@kazeetama",
      href: "https://instagram.com/kazeetama",
      colorClass: "hover:text-pink-500 hover:border-pink-500/30 hover:bg-pink-500/10 text-pink-500 bg-pink-500/5 dark:bg-pink-500/10 border-pink-500/10",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full min-h-screen md:h-screen md:min-h-0 pt-12 md:pt-8 pb-12 md:pb-6 px-6 md:px-12 flex flex-col items-center md:items-start md:overflow-hidden">
      
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
        <div className="absolute top-[10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-blue-500/10 blur-[130px] dark:bg-blue-500/8" />
        <div className="absolute bottom-[10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-teal-500/10 blur-[130px] dark:bg-teal-500/8" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-8 md:mt-0 md:flex-1 md:flex md:flex-col md:min-h-0">
        
        {/* Header Section */}
        <div className="flex flex-col gap-3 md:gap-1.5 items-start mb-10 md:mb-4 shrink-0">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border shadow-sm backdrop-blur-md">
            <span className="text-xs font-semibold text-foreground tracking-wide uppercase">Hubungi Saya</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Hubungi &amp; Kolaborasi
          </h1>
          <p className="text-[15px] md:text-sm text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Ada ide projek, ajakan kerja sama, atau sekadar ingin menyapa? Kirimkan pesan atau hubungi saya langsung di media sosial.
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-6 w-full items-start md:flex-1 md:min-h-0">
          
          {/* Left Column: Glassmorphic Contact Form (7/12 width) */}
          <div className="lg:col-span-7 w-full md:h-full md:flex md:flex-col md:min-h-0">
            <div className="border border-border/80 bg-card/50 backdrop-blur-lg rounded-3xl p-6 md:p-6 shadow-xl relative overflow-hidden group md:h-full md:flex md:flex-col md:min-h-0">
              
              {/* Submission Success Screen Overlay */}
              {submitSuccess && (
                <div className="absolute inset-0 bg-background/95 backdrop-blur-md z-30 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-500 mb-6 animate-bounce">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Pesan Berhasil Terkirim!</h3>
                  <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
                    Terima kasih telah menghubungi saya. Pesan Anda telah diterima dengan baik, dan saya akan membalasnya secepat mungkin melalui email yang Anda berikan.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 text-xs font-bold text-blue-500 hover:text-blue-400 border border-blue-500/25 hover:border-blue-500/50 bg-blue-500/5 px-4 py-2 rounded-xl transition-all duration-300"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              )}

              <h2 className="text-xl font-bold text-foreground mb-4 md:mb-3 flex items-center gap-2.5 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500">
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
                Kirim Pesan Langsung
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-3.5 md:flex-1 md:min-h-0">
                
                {/* Name & Email Field Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-3 shrink-0">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                      }}
                      placeholder="Masukkan nama Anda"
                      className={`w-full bg-muted/30 dark:bg-zinc-900/30 border rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 ${
                        errors.name ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-border/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      }`}
                    />
                    {errors.name && <span className="text-[11px] text-red-500 font-medium pl-1">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: "" }));
                      }}
                      placeholder="nama@email.com"
                      className={`w-full bg-muted/30 dark:bg-zinc-900/30 border rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 ${
                        errors.email ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-border/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      }`}
                    />
                    {errors.email && <span className="text-[11px] text-red-500 font-medium pl-1">{errors.email}</span>}
                  </div>
                </div>

                {/* Subject Field */}
                <div className="flex flex-col gap-1.5 md:gap-1 shrink-0">
                  <label htmlFor="subject" className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Subjek Pesan
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => {
                      setSubject(e.target.value);
                      if (errors.subject) setErrors(prev => ({ ...prev, subject: "" }));
                    }}
                    placeholder="Apa hal yang ingin didiskusikan?"
                    className={`w-full bg-muted/30 dark:bg-zinc-900/30 border rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 ${
                      errors.subject ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-border/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }`}
                  />
                  {errors.subject && <span className="text-[11px] text-red-500 font-medium pl-1">{errors.subject}</span>}
                </div>

                {/* Message Field */}
                <div className="flex flex-col gap-1.5 md:gap-1 md:flex-1 md:min-h-0">
                  <label htmlFor="message" className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                    Pesan Detail
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors(prev => ({ ...prev, message: "" }));
                    }}
                    placeholder="Tuliskan detail projek atau pesan Anda di sini..."
                    className={`w-full bg-muted/30 dark:bg-zinc-900/30 border border-border/80 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-all duration-300 focus:bg-background/80 resize-none md:flex-1 md:min-h-[80px] ${
                      errors.message ? "border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-border/80 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    }`}
                  />
                  {errors.message && <span className="text-[11px] text-red-500 font-medium pl-1">{errors.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-1 md:mt-0 py-3 md:py-3.5 px-6 rounded-xl bg-foreground hover:bg-foreground/90 text-background font-bold text-sm flex items-center justify-center gap-2 group transition-all duration-300 active:scale-[0.98] disabled:opacity-75 disabled:cursor-not-allowed shadow-md shrink-0"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-background" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sedang Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Pesan
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                      </svg>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

          {/* Right Column: Dynamic Leaflet Map & Details (5/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-4 w-full md:h-full md:min-h-0">
            
            {/* Location & Map Card */}
            <div className="border border-border/80 bg-card/40 backdrop-blur-md rounded-3xl p-5 md:p-5 shadow-lg flex flex-col gap-4 md:gap-3.5 hover:border-zinc-500/50 transition-colors duration-300 md:flex-1 md:min-h-0">
              <div className="flex flex-col gap-1 shrink-0">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-0.5">Negara &amp; Kota Asal</span>
                <h3 className="text-base font-bold text-foreground flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-blue-500">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Kediri, Jawa Timur, Indonesia
                </h3>
              </div>

              {/* Dynamic Map Component */}
              <div className="w-full h-[300px] md:h-full md:flex-1 rounded-2xl overflow-hidden relative border border-border/60 md:min-h-0">
                <ContactMap />
              </div>
            </div>

            {/* Quick Contact & Socials Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full shrink-0">
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group border border-border bg-card hover:shadow-lg rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:border-zinc-500/50 ${social.colorClass}`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest">{social.name}</span>
                    <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-muted-foreground group-hover:text-inherit">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-1">
                    <div className="shrink-0">
                      {social.icon}
                    </div>
                    <span className="text-[13px] font-bold text-foreground group-hover:text-inherit truncate pr-2">
                      {social.handle}
                    </span>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
