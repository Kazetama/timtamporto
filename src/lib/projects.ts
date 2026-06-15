export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  status: "completed" | "in-progress" | "archived";
  imageUrl: string;
  role: string;
  features: string[];
  challenges: string;
  solutions: string;
}

export const projects: Project[] = [
  {
    slug: "timtam-porto-v2",
    title: "Timtam Porto v2.0",
    description: "A dark-themed personal portfolio designed for speed, responsiveness, and premium aesthetics. Focuses on minimal design and smooth micro-interactions.",
    longDescription: "Timtam Porto v2.0 adalah sebuah portofolio digital pribadi berestetika premium yang dirancang khusus untuk meminimalkan beban rendering browser, mengoptimalkan skor LCP (Largest Contentful Paint), dan memberikan interaksi mikro yang sangat halus. Proyek ini mengintegrasikan router modern Next.js 16 (Turbopack) untuk efisiensi kompilasi maksimal.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    githubUrl: "https://github.com/kazetama/timtamporto",
    liveUrl: "https://segera-di-deploy.vercel.app",
    status: "completed",
    imageUrl: "/images/timtam_porto.png",
    role: "UI/UX & Full-Stack Developer",
    features: [
      "Optimasi SEO lengkap & sitemap otomatis dinamis.",
      "Desain Glassmorphism gelap dengan pencahayaan orbs gradient.",
      "Animasi mikro responsif pada navigasi sidebar dan drawer mobile.",
      "Pemrosesan gambar dinamis adaptif dengan Next.js Image Optimization."
    ],
    challenges: "Mengoptimalkan Largest Contentful Paint (LCP) dari gambar profil beresolusi tinggi tanpa merusak aspek estetika visual di layar mobile.",
    solutions: "Mengimplementasikan preloading dengan tag priority, konfigurasi sizes yang tepat, serta pemetaan background menggunakan orbs CSS gradient daripada gambar statis."
  },
  {
    slug: "biro-ti-udinus-kediri-portal",
    title: "Biro TI UDINUS Kediri Portal",
    description: "The official academic portal and information hub for the IT Bureau of Dian Nuswantoro University (UDINUS) Kediri. Integrates academic management features.",
    longDescription: "Portal Akademik Biro TI Universitas Dian Nuswantoro (UDINUS) Kediri adalah platform internal terintegrasi untuk dosen, mahasiswa, dan staf administrasi. Sistem ini mengotomatisasi manajemen jadwal kuliah, pelaporan nilai, serta distribusi pengumuman secara real-time.",
    tags: ["Laravel", "PostgreSQL", "Tailwind CSS", "Alpine.js"],
    githubUrl: "https://github.com/kazetama",
    liveUrl: "#",
    status: "completed",
    imageUrl: "/images/udinus_portal.png",
    role: "Lead Back-End & System Architect",
    features: [
      "Dashboard statistik akademik dosen & mahasiswa.",
      "Sistem penjadwalan kuliah otomatis anti-bentrok.",
      "Autentikasi tingkat lanjut dengan kontrol hak akses (RBAC).",
      "Ekspor data laporan nilai berformat PDF dan Excel."
    ],
    challenges: "Menangani bentrokan jadwal kuliah pada jam-jam sibuk saat algoritma penjadwalan memproses ribuan data mahasiswa secara paralel.",
    solutions: "Membangun constraint solver berbasis query PostgreSQL teroptimasi dengan indeks transaksional untuk mendeteksi konflik sebelum data disimpan."
  },
  {
    slug: "supachat",
    title: "SupaChat",
    description: "A secure, real-time chat application with group channels, direct messages, online presence tracking, and dynamic media sharing.",
    longDescription: "SupaChat adalah aplikasi perpesanan real-time instan dengan enkripsi end-to-end yang tangguh. Dirancang dengan React dan Supabase untuk sinkronisasi pesan instan tanpa penundaan (low-latency), menjamin pengalaman mengobrol yang mulus layaknya aplikasi pesan komersial.",
    tags: ["React", "Supabase", "TypeScript", "Tailwind CSS"],
    githubUrl: "https://github.com/kazetama",
    status: "in-progress",
    imageUrl: "/images/supachat.png",
    role: "Full-Stack Developer",
    features: [
      "Sinkronisasi pesan real-time instan berlatensi rendah.",
      "Status online & kehadiran pengguna secara langsung (Presence).",
      "Manajemen ruang obrolan (Group Channels & DMs).",
      "Unggah file & media secara real-time ke Supabase Storage."
    ],
    challenges: "Sinkronisasi status kehadiran pengguna (Online/Offline) secara akurat saat koneksi internet terputus mendadak.",
    solutions: "Memanfaatkan Supabase Realtime Presence dengan deteksi heartbeat websocket untuk memperbarui status pengguna secara otomatis."
  },
  {
    slug: "devops-pipelines-infrastructure",
    title: "DevOps Pipelines & Infrastructure",
    description: "Production-ready automated CI/CD pipelines, container orchestration, and server monitoring templates optimized for cloud environments.",
    longDescription: "Automasi infrastruktur berskala besar yang mengintegrasikan pipeline CI/CD modern dengan Docker, AWS, dan GitHub Actions. Solusi ini mengurangi waktu deployment dari 30 menit menjadi kurang dari 2 menit dengan jaminan uptime 99.9%.",
    tags: ["Docker", "GitHub Actions", "AWS", "Nginx", "Linux"],
    githubUrl: "https://github.com/kazetama",
    status: "completed",
    imageUrl: "/images/devops_infra.png",
    role: "DevOps & Cloud Engineer",
    features: [
      "Pipeline build & deploy otomatis terintegrasi GitHub Actions.",
      "Containerization multi-stage build untuk memperkecil ukuran image Docker.",
      "Konfigurasi Reverse Proxy Nginx berkeamanan tinggi dengan SSL Let's Encrypt.",
      "Sistem monitoring resource server real-time dengan Prometheus & Grafana."
    ],
    challenges: "Lama waktu build container Docker yang membengkak karena dependensi Node.js yang besar.",
    solutions: "Menerapkan multi-stage Docker build, caching layer NPM yang agresif, serta deployment otomatis ke instance EC2 hanya ketika tes unit lolos."
  }
];
