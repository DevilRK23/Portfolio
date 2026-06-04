// lib/github.ts
export interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
}

/**
 * Fetch public repositories for a GitHub username.
 * Returns the top 12 repos sorted by star count.
 */
export async function fetchPublicRepos(username: string): Promise<Repo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }
  const data: Repo[] = await res.json();
  // sort by stars descending and take first 12
  return data
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);
}
