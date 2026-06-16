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
