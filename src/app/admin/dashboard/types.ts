export interface DbProject {
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
