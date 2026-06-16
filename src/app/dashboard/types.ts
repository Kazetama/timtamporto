export interface GithubUserData {
  login: string;
  avatar_url: string;
  name: string;
  company: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  created_at: string;
}

export interface GithubRepo {
  name: string;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  description: string | null;
  updated_at: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface RawGithubRepo {
  fork: boolean;
  stargazers_count: number;
  name: string;
  language: string | null;
  html_url: string;
  description: string | null;
  updated_at: string;
}

export interface DenoContributionDay {
  color: string;
  contributionCount: number;
  contributionLevel: string;
  date: string;
}

export interface DenoGithubContributions {
  totalContributions: number;
  contributions: DenoContributionDay[][];
}

export interface SpotifyData {
  isPlaying: boolean;
  song: string;
  artist: string;
  album: string;
  albumArtUrl: string;
}
