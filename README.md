# 🍫 Timtamporto

[![Next.js Version](https://img.shields.io/badge/Next.js-v16.2.2-black?style=flat-flat&logo=next.js)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/React-v19.2.4-blue?style=flat-flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat-flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database_%26_Auth-3ecf8e?style=flat-flat&logo=supabase)](https://supabase.com/)

A modern, highly-interactive developer portfolio built using Next.js 16 (App Router), Tailwind CSS v4, TypeScript, and Supabase. Features real-time interactions, a live Spotify/Discord widget, and a secured admin console for managing projects and viewing contact submissions.

---

## ✨ Features

- **🏠 Responsive Developer Landing Page**
  - Modern, clean layout with subtle background gradients and radial dot patterns.
  - Showcases dynamic **Hero**, **Social Links**, **Projects**, and **Experience** sections.

- **📊 Real-time Analytics Dashboard (`/dashboard`)**
  - Beautiful visual counters, charts, and statistics showing site status, total projects, and activity.

- **💬 Public Live Chat (`/public-chat`)**
  - An interactive public chatroom powered by **Supabase Realtime** for visitors to say hello.

- **🗺️ Interactive Map (`/contact`)**
  - Leaflet-based map integration to visualize location and enable custom visitor inquiries.

- **🔒 Secure Admin Console (`/login` & `/admin/dashboard`)**
  - Protected route using Supabase SSR authentication.
  - Fully featured dashboard to:
    - Oversee portfolio stats.
    - Create, update, or delete portfolio projects.
    - View and manage inbox/contact messages from visitors.

- **🎧 Live Presence Widget (Lanyard API)**
  - Dynamic integration showing current Discord/Spotify activity and listening state.

- **🌗 Light & Dark Theme Toggle**
  - Fully responsive, system-aware dark mode built with `next-themes`.

---

## 🛠️ Technology Stack

- **Core Framework**: [Next.js 16 (App Router)](https://nextjs.org) & [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/windy-dev/tw-animate-css)
- **Database / Auth / Realtime**: [Supabase](https://supabase.com/) (using `@supabase/ssr` & `@supabase/supabase-js`)
- **Map Library**: [Leaflet](https://leafletjs.com/) (`leaflet` & `@types/leaflet`)
- **UI Components & Transitions**: [Radix UI](https://www.radix-ui.com/), [Vaul Drawer](https://github.com/emilkowalski/vaul), and `class-variance-authority`
- **Icons**: [Hugeicons React](https://hugeicons.com/)

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18.x or newer) and `npm` installed.

### ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Kazetama/timtamporto.git
   cd timtamporto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### 💻 Running Locally

To run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live portfolio site.

---

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router pages & API routes
│   ├── admin/            # Admin dashboard route (/admin/dashboard)
│   ├── contact/          # Contact page with Leaflet Map
│   ├── dashboard/        # Public analytics dashboard
│   ├── login/            # Admin authentication (/login)
│   ├── projects/         # Projects list and detail views
│   ├── public-chat/      # Real-time message board
│   └── globals.css       # Global styling configuration
├── components/           # Reusable UI components
│   ├── admin/            # Admin-only components (Tabs, Stats, Forms)
│   ├── sections/         # Landing page sections (Hero, Projects, Socials)
│   ├── ui/               # Core atomic widgets (buttons, input fields)
│   └── ThemeProvider.tsx # Light/dark mode context provider
├── constants/            # Static config & portfolio data
├── lib/                  # External services config (Supabase client, helpers)
└── proxy.ts              # Proxy utilities
```

---

## 🔧 Building and Deployment

To build the application for production:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

You can easily deploy this repository to platforms like [Vercel](https://vercel.com) by linking your GitHub repository.
