export interface SocialLink {
  id: string;
  href: string;
  icon: string;
  hover: string;
}

export interface Experience {
  role: string;
  organization: string;
  period: string;
  description?: string;
  points?: string[];
}

export interface ProfileInfo {
  name: string;
  username: string;
  avatarUrl: string;
  status: string;
  description: string;
}
