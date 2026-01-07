const GITHUB_USERNAME = "mithun50";
const GITHUB_API = "https://api.github.com";

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  parent?: {
    full_name: string;
    html_url: string;
    stargazers_count: number;
    description: string | null;
  };
  isValidContribution?: boolean; // True if user is in contributors list
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  contributions: number;
}

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string | null;
  featured: boolean;
  stars: number;
  forks: number;
}

// Fetch user profile
export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

// Fetch single repo details (to get parent info for forks)
async function fetchRepoDetails(fullName: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(`${GITHUB_API}/repos/${fullName}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// Check if user is a contributor to a repository
async function checkIsContributor(repoFullName: string): Promise<boolean> {
  try {
    const res = await fetch(
      `${GITHUB_API}/repos/${repoFullName}/contributors?per_page=100`,
      {
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return false;
    const contributors: { login: string }[] = await res.json();
    return contributors.some(
      (c) => c.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()
    );
  } catch {
    return false;
  }
}

// Fetch all repositories (including forks/contributions with parent stars)
export async function fetchGitHubRepos(includeContributions = true): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );
    if (!res.ok) return [];
    let repos: GitHubRepo[] = await res.json();

    // Filter out archived repos
    repos = repos.filter((repo) => !repo.archived);

    if (!includeContributions) {
      return repos.filter((repo) => !repo.fork);
    }

    // For forked repos, fetch parent details and validate contribution
    const reposWithParentInfo = await Promise.all(
      repos.map(async (repo) => {
        if (repo.fork) {
          const details = await fetchRepoDetails(repo.full_name);
          if (details?.parent) {
            // Check if user is actually a contributor to the parent repo
            const isContributor = await checkIsContributor(details.parent.full_name);
            return {
              ...repo,
              parent: details.parent,
              isValidContribution: isContributor,
            };
          }
        }
        return { ...repo, isValidContribution: false };
      })
    );

    return reposWithParentInfo;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}

// Get total stars across all repos (including contributions)
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const [user, repos] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubRepos(true), // Include contributions
  ]);

  // Count stars from both owned and contributed repos
  const ownedRepos = repos.filter((repo) => !repo.fork);
  const contributedRepos = repos.filter((repo) => repo.fork);

  const ownedStars = ownedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const contributedStars = contributedRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalStars = ownedStars + contributedStars;

  // Estimate contributions (this is approximate - real count needs GraphQL API)
  const contributions = repos.reduce((sum, repo) => {
    const daysSinceCreated = Math.floor(
      (Date.now() - new Date(repo.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );
    return sum + Math.min(daysSinceCreated, 100); // Rough estimate
  }, 0);

  return {
    repos: user?.public_repos || repos.length,
    stars: totalStars,
    followers: user?.followers || 0,
    contributions: Math.min(contributions, 500), // Cap at reasonable number
  };
}

// Extract languages/skills from repos
export async function fetchSkillsFromRepos(): Promise<Map<string, number>> {
  const repos = await fetchGitHubRepos();
  const languageCount = new Map<string, number>();

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount.set(
        repo.language,
        (languageCount.get(repo.language) || 0) + 1
      );
    }
  });

  return languageCount;
}

// Convert repos to project format
export async function fetchProjects(): Promise<ProjectData[]> {
  const repos = await fetchGitHubRepos();

  // Sort by stars, then by recent activity
  const sortedRepos = repos.sort((a, b) => {
    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });

  return sortedRepos.map((repo, index) => ({
    id: repo.id.toString(),
    title: formatRepoName(repo.name),
    description: repo.description || "No description available",
    image: `https://opengraph.githubassets.com/1/${repo.full_name}`,
    technologies: [repo.language, ...repo.topics.slice(0, 4)].filter(Boolean) as string[],
    github: repo.html_url,
    live: repo.homepage || null,
    featured: index < 6, // Top 6 repos are featured
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  }));
}

// Format repo name to title case
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Get featured projects (top starred or manually marked)
export async function fetchFeaturedProjects(): Promise<ProjectData[]> {
  const projects = await fetchProjects();
  return projects.filter((p) => p.featured).slice(0, 6);
}
