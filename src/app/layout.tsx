import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/Sidebar";
import { MobileNav } from "@/components/MobileNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Teuku Aryansyah Pratama (Kazeetama) | Full-Stack Web Developer",
    template: "%s | Teuku Aryansyah Pratama",
  },
  description: "Portfolio resmi Teuku Aryansyah Pratama (Kazeetama). Full-Stack Web Developer spesialis Next.js, Laravel, dan pembuat antarmuka website super modern yang responsif di Indonesia.",
  keywords: ["Teuku Aryansyah Pratama", "Kazeetama", "Kazetama", "Full-stack Developer Indonesia", "Frontend Developer", "Web Designer", "Software Engineer UDINUS", "Next.js", "React", "Laravel"],
  authors: [{ name: "Teuku Aryansyah Pratama", url: "https://github.com/Kazetama" }],
  creator: "Teuku Aryansyah Pratama",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://github.com/Kazetama",
    title: "Teuku Aryansyah Pratama (Kazeetama) - Software Engineer",
    description: "Jelajahi karya dan portofolio Teuku Aryansyah Pratama (Kazeetama), seorang Full-Stack Developer yang memprioritaskan desain atraktif & performa mutakhir.",
    siteName: "Teuku Aryansyah Pratama Portfolio",
    images: [
      {
        url: "/images/profile.webp",
        width: 800,
        height: 800,
        alt: "Teuku Aryansyah Pratama (Kazeetama)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teuku Aryansyah Pratama (Kazeetama) | Dev",
    description: "Full-Stack Web Developer from Indonesia. Check out my latest modern web projects!",
    creator: "@kazeetama",
    images: ["/images/profile.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", figtree.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground flex">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Sidebar />
          <MobileNav />
          <main className="flex-1 ml-0 md:ml-[280px] pb-24 md:pb-0 bg-background min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
