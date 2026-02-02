import { fetchGitHubUser, fetchGitHubRepos, fetchGitHubStats, GitHubRepo } from "./github";

// Static profile data (doesn't change)
export const staticProfile = {
  name: "Mithun Gowda B",
  tagline: "Full-Stack Developer | AI Enthusiast | Cybersecurity",
  bio: "Engineering student at Don Bosco Institute of Technology, passionate about building innovative solutions through code. Co-Founder of NextGenXplorrers (NextGenX) and active open-source contributor with expertise in AI frameworks, mobile development, and web technologies.",
  email: "mithungowda.b7411@gmail.com",
  location: "Akkur, Akkur Post, Ramanagara Taluk & District, Karnataka, India",
  resumeUrl: "#",

  education: {
    institution: "Don Bosco Institute of Technology",
    shortName: "DBIT",
    degree: "Engineering",
    year: "1st Year",
    period: "2025 - Present",
  },

  venture: {
    name: "NextGenXplorrers",
    shortName: "NextGenX",
    role: "Co-Founder",
    description: "Tech exploration and innovation community",
  },

  rotatingWords: ["Developer", "Innovator", "Creator", "Engineer", "Co-Founder", "Security Enthusiast"],

  socials: {
    github: "https://github.com/mithun50",
    linkedin: "https://linkedin.com/in/mithungowdab",
    twitter: "https://twitter.com/MithunGowdaB",
    instagram: "https://instagram.com/mithun.gowda.b",
    discord: "https://discord.gg/eamXcxtd",
    pypi: "https://pypi.org/user/mithungowda.b",
    npmjs: "https://www.npmjs.com/~mithun50",
    orcid: "https://orcid.org/0009-0000-7572-8379",
    huggingface: "https://huggingface.co/Mithun501",
  },

  nextgenx: {
    instagram: "https://www.instagram.com/nexgenxplorerr",
    youtube: "https://youtube.com/@nexgenxplorer",
    playstore: "https://play.google.com/store/apps/dev?id=8262374975871504599",
    email: "nxgextra@gmail.com",
  },

  achievements: [
    { name: "Pair Extraordinaire", count: 2, icon: "Users" },
    { name: "Starstruck", count: 2, icon: "Star" },
    { name: "Pull Shark", count: 2, icon: "GitPullRequest" },
    { name: "YOLO", count: 1, icon: "Zap" },
    { name: "Quickdraw", count: 1, icon: "Timer" },
  ],

  organizations: ["SuperClaude-Org", "NextGenXplorer"],
};

// Fetch dynamic profile data from GitHub
export async function getDynamicProfile() {
  const [user, stats] = await Promise.all([
    fetchGitHubUser(),
    fetchGitHubStats(),
  ]);

  return {
    ...staticProfile,
    avatar: user?.avatar_url || "/99024517.jpeg",
    location: user?.location || staticProfile.location,
    status: `Engineering Student @ ${staticProfile.education.shortName}`,
    stats: {
      repos: stats.repos,
      followers: stats.followers,
      stars: stats.stars,
      contributions: stats.contributions > 100 ? `${stats.contributions}+` : stats.contributions.toString(),
    },
  };
}

// Language to skill mapping with icons
const languageIcons: Record<string, string> = {
  Python: "Code2",
  TypeScript: "FileCode",
  JavaScript: "Braces",
  Dart: "Palette",
  Java: "Coffee",
  Kotlin: "Smartphone",
  "C++": "Cpu",
  C: "Cpu",
  HTML: "Globe",
  CSS: "Paintbrush",
  Shell: "Terminal",
  Jupyter: "BookOpen",
  Markdown: "FileText",
  Liquid: "Droplet",
  Go: "Hexagon",
  Rust: "Cog",
  PHP: "Server",
  Ruby: "Gem",
  Swift: "Smartphone",
};

// Fetch skills from GitHub repos
export async function getDynamicSkills() {
  const repos = await fetchGitHubRepos();
  const languageCount = new Map<string, number>();

  repos.forEach((repo) => {
    if (repo.language) {
      languageCount.set(repo.language, (languageCount.get(repo.language) || 0) + 1);
    }
  });

  // Sort by usage count
  const sortedLanguages = Array.from(languageCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10); // Top 10 languages

  const languages = sortedLanguages.map(([name, count]) => ({
    name,
    icon: languageIcons[name] || "Code",
    count,
  }));

  // Keep static frameworks and tools
  const frameworks = [
    { name: "React", icon: "Atom" },
    { name: "Next.js", icon: "Triangle" },
    { name: "Flask", icon: "Flask" },
    { name: "FastAPI", icon: "Zap" },
    { name: "Flutter", icon: "Smartphone" },
    { name: "React Native", icon: "Layers" },
    { name: "Express.js", icon: "Server" },
    { name: "Node.js", icon: "Hexagon" },
  ];

  const tools = [
    { name: "Git", icon: "GitBranch" },
    { name: "Linux", icon: "Terminal" },
    { name: "Docker", icon: "Container" },
    { name: "Firebase", icon: "Flame" },
    { name: "Google Colab", icon: "Cloud" },
    { name: "Pandas", icon: "Table" },
    { name: "TensorFlow", icon: "Brain" },
  ];

  const platforms = [
    { name: "Vercel", icon: "Triangle" },
    { name: "Netlify", icon: "Globe" },
    { name: "GitHub Pages", icon: "Github" },
    { name: "Google Cloud", icon: "Cloud" },
    { name: "Termux", icon: "Terminal" },
  ];

  const cybersecurity = [
    { name: "Kali Linux", icon: "Shield" },
    { name: "Burp Suite", icon: "Bug" },
    { name: "Wireshark", icon: "Network" },
    { name: "Nmap", icon: "Radar" },
    { name: "Metasploit", icon: "Skull" },
    { name: "OWASP", icon: "ShieldAlert" },
    { name: "Pentesting", icon: "KeyRound" },
    { name: "CTF", icon: "Flag" },
  ];

  return { languages, frameworks, tools, platforms, cybersecurity };
}

// Category mapping for repos
function getCategoryFromTopics(topics: string[], language: string | null): string {
  const topicsLower = topics.map((t) => t.toLowerCase());

  if (topicsLower.some((t) => ["ai", "ml", "machine-learning", "llm", "claude", "gemini", "gpt"].includes(t))) {
    return "AI/ML Frameworks";
  }
  if (topicsLower.some((t) => ["mcp", "devtools", "automation", "sdk", "api"].includes(t))) {
    return "MCP & DevTools";
  }
  if (topicsLower.some((t) => ["android", "ios", "mobile", "flutter", "react-native", "expo"].includes(t))) {
    return "Mobile Apps";
  }
  if (topicsLower.some((t) => ["website", "web", "nextjs", "react", "frontend"].includes(t))) {
    return "Web Development";
  }
  if (topicsLower.some((t) => ["dsa", "algorithms", "learning", "course"].includes(t))) {
    return "Learning & DSA";
  }
  if (language === "Dart" || language === "Kotlin" || language === "Swift") {
    return "Mobile Apps";
  }

  return "Open Source";
}

// Icon mapping for repos
function getIconFromCategory(category: string, topics: string[]): string {
  const iconMap: Record<string, string> = {
    "AI/ML Frameworks": "Brain",
    "MCP & DevTools": "Wrench",
    "Mobile Apps": "Smartphone",
    "Web Development": "Globe",
    "Learning & DSA": "BookOpen",
    "Open Source": "GitFork",
  };
  return iconMap[category] || "Code";
}

// Fetch projects from GitHub repos (including contributions)
export async function getDynamicProjects() {
  const repos = await fetchGitHubRepos(true); // Include contributions

  // Map repos with proper star counts (use parent stars for validated contributions)
  const projectsWithStars = repos.map((repo) => {
    // For validated contributions, use parent's star count
    const isContribution = !!(repo.fork && repo.isValidContribution && repo.parent);
    const stars = isContribution ? repo.parent!.stargazers_count : repo.stargazers_count;
    const description = isContribution && !repo.description
      ? repo.parent!.description
      : repo.description;
    const parentUrl = isContribution ? repo.parent!.html_url : undefined;

    return {
      ...repo,
      effectiveStars: stars,
      effectiveDescription: description,
      parentUrl,
      isContribution, // boolean: true if user is actually a contributor
    };
  });

  // Sort by effective stars (highest first), then by recent push
  const sortedRepos = projectsWithStars.sort((a, b) => {
    if (b.effectiveStars !== a.effectiveStars) {
      return b.effectiveStars - a.effectiveStars;
    }
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });

  return sortedRepos.map((repo, index) => {
    const category = getCategoryFromTopics(repo.topics, repo.language);
    // Featured = top 8 repos OR any repo with 5+ stars
    const isFeatured = index < 8 || repo.effectiveStars >= 5;
    return {
      name: formatRepoName(repo.name),
      description: repo.effectiveDescription || "No description available",
      language: repo.language || "Unknown",
      stars: repo.effectiveStars,
      forks: repo.forks_count,
      url: repo.html_url,
      parentUrl: repo.parentUrl,
      homepage: repo.homepage || undefined,
      topics: repo.topics,
      category,
      featured: isFeatured,
      isForked: repo.fork,
      isContribution: repo.isContribution, // Validated: user is in contributors list
      icon: getIconFromCategory(category, repo.topics),
      updatedAt: repo.pushed_at,
    };
  });
}

// Fetch featured projects for home page
// Shows top starred projects (contributions or owned) - purely by star count
export async function getTopStarredProjects(limit = 6) {
  const projects = await getDynamicProjects();

  // Get all valid projects: validated contributions + owned repos
  const validProjects = projects.filter((p) => p.isContribution || !p.isForked);

  // Sort by stars and return top ones
  return validProjects
    .sort((a, b) => b.stars - a.stars)
    .slice(0, limit);
}

// Format repo name to title case
function formatRepoName(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

// Get categories from projects
export function getCategories(projects: Awaited<ReturnType<typeof getDynamicProjects>>) {
  const categorySet = new Set(projects.map((p) => p.category));
  const categoryIcons: Record<string, string> = {
    "All": "Sparkles",
    "AI/ML Frameworks": "Brain",
    "MCP & DevTools": "Wrench",
    "Mobile Apps": "Smartphone",
    "Web Development": "Globe",
    "Learning & DSA": "BookOpen",
    "Open Source": "GitFork",
  };

  return [
    { name: "All", icon: "Sparkles" },
    ...Array.from(categorySet).map((name) => ({
      name,
      icon: categoryIcons[name] || "Folder",
    })),
  ];
}

// Static experience data
export const experience = [
  {
    title: "Co-Founder",
    company: "NextGenXplorrers (NextGenX)",
    period: "2024 - Present",
    description: "Leading tech exploration and innovation community with presence on YouTube, Instagram, and Play Store",
    type: "venture",
    icon: "Rocket",
  },
  {
    title: "Engineering Student",
    company: "Don Bosco Institute of Technology",
    period: "2025 - Present",
    description: "Pursuing engineering degree with focus on computer science and software development",
    type: "education",
    icon: "GraduationCap",
  },
  {
    title: "Open Source Contributor",
    company: "SuperClaude Organization",
    period: "2024 - Present",
    description: "Contributing to AI framework development and MCP tooling",
    type: "contribution",
    icon: "Code",
  },
  {
    title: "Developer",
    company: "AOSSIE - Devr.AI",
    period: "2024 - Present",
    description: "Building AI-powered Developer Relations assistant",
    type: "contribution",
    icon: "Bot",
  },
  {
    title: "Contributor",
    company: "Engineering Kannada",
    period: "2024 - Present",
    description: "Accessibility initiative for regional language support",
    type: "contribution",
    icon: "Languages",
  },
];
