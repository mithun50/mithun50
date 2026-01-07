"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Search, X, Sparkles, ArrowUpDown, Clock, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

export interface Project {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  homepage?: string;
  topics: string[];
  category: string;
  featured: boolean;
  isForked: boolean;
  isContribution?: boolean; // True if user is in contributors list
  icon: string;
  updatedAt: string;
}

type SortOption = "stars" | "recent" | "name";
type OwnershipFilter = "all" | "original" | "contributed";

export interface Category {
  name: string;
  icon: string;
}

const languageColors: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Kotlin: "#A97BFF",
  Java: "#b07219",
  "C++": "#f34b7d",
  Dart: "#00B4AB",
  Shell: "#89e051",
  Liquid: "#67b8de",
  EJS: "#a91e50",
  JSON: "#292929",
  Markdown: "#083fa1",
};

function Project3DCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative cursor-pointer"
    >
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-300">
        {/* Header with gradient accent */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-6" style={{ transform: "translateZ(20px)" }}>
          {/* Top Row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <DynamicIcon name={project.icon} className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-white/90 transition-colors">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  {project.featured && (
                    <span className="flex items-center gap-1 text-[10px] text-white/40">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  {project.isContribution && (
                    <span className="text-[10px] text-purple-400/60">Contributor</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.homepage && (
                <a
                  href={project.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-white/40 text-sm line-clamp-2 mb-4 leading-relaxed">
            {project.description || "No description available"}
          </p>

          {/* Topics */}
          {project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-[10px] text-white/40 font-mono"
                >
                  {topic}
                </span>
              ))}
              {project.topics.length > 3 && (
                <span className="px-2 py-0.5 text-[10px] text-white/30">
                  +{project.topics.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Homepage Link - Always Visible */}
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 mb-4 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors w-fit"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="text-xs font-mono">View Live</span>
            </a>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              {/* Language */}
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: languageColors[project.language] || "#6e7681" }}
                />
                <span className="text-xs text-white/40 font-mono">{project.language || "N/A"}</span>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-white/30">
                  <Star className="w-3.5 h-3.5" />
                  <span className="text-xs font-mono">
                    {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                  </span>
                </div>
                {project.forks > 0 && (
                  <div className="flex items-center gap-1 text-white/30">
                    <GitFork className="w-3.5 h-3.5" />
                    <span className="text-xs font-mono">{project.forks}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

interface ProjectsProps {
  projects: Project[];
  categories: Category[];
}

export default function Projects({ projects, categories }: ProjectsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("stars");
  const [ownershipFilter, setOwnershipFilter] = useState<OwnershipFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [projects]);

  // Count for ownership filters (contributions = validated contributors only)
  const ownershipCounts = useMemo(() => {
    const original = projects.filter((p) => !p.isForked).length;
    const contributed = projects.filter((p) => p.isContribution).length;
    return { all: projects.length, original, contributed };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || project.featured;
      const matchesOwnership =
        ownershipFilter === "all" ||
        (ownershipFilter === "original" && !project.isForked) ||
        (ownershipFilter === "contributed" && project.isContribution);
      return matchesCategory && matchesSearch && matchesFeatured && matchesOwnership;
    });

    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stars - a.stars;
        case "recent":
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [projects, activeCategory, searchQuery, showFeaturedOnly, ownershipFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * projectsPerPage;
    return filteredProjects.slice(startIndex, startIndex + projectsPerPage);
  }, [filteredProjects, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, showFeaturedOnly, ownershipFilter, sortBy]);

  return (
    <section id="projects" className="pt-24 pb-20 bg-[#121212] relative overflow-hidden" ref={ref}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white/30 font-mono text-sm">02</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Projects</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Things I&apos;ve built
            <br />
            <span className="text-white/30">&amp; contributed to.</span>
          </h2>
          <p className="text-white/40 mt-4">
            {projects.length} repositories spanning AI, mobile, web, and developer tools
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 space-y-6"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-white/[0.02] border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors font-mono text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Console */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/[0.02]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-white/30 font-mono ml-2">filter --projects</span>
              <div className="flex-1" />
              <span className="text-[10px] text-white/20 font-mono">{filteredProjects.length} matches</span>
            </div>

            {/* Filter Content */}
            <div className="p-4 space-y-4">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-1">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "group relative px-3 py-2 text-xs font-mono transition-all flex items-center gap-2 rounded-lg",
                      activeCategory === category.name
                        ? "text-white"
                        : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {activeCategory === category.name && (
                      <motion.div
                        layoutId="activeCategory"
                        className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-lg border border-white/20"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <DynamicIcon name={category.icon} className="w-3.5 h-3.5 relative z-10" />
                    <span className="relative z-10">{category.name}</span>
                    <span className={cn(
                      "relative z-10 text-[10px] opacity-60",
                      activeCategory === category.name && "opacity-100"
                    )}>
                      [{categoryCounts[category.name] || 0}]
                    </span>
                  </button>
                ))}
              </div>

              {/* Command Line Style Filters */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 border-t border-white/5">
                <span className="text-white/20 text-xs font-mono">$</span>

                {/* Toggle Filters */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5",
                      showFeaturedOnly
                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                        : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Sparkles className="w-3 h-3" />
                    --featured
                  </button>
                  <button
                    onClick={() => setOwnershipFilter(ownershipFilter === "original" ? "all" : "original")}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5",
                      ownershipFilter === "original"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <Github className="w-3 h-3" />
                    --mine
                  </button>
                  <button
                    onClick={() => setOwnershipFilter(ownershipFilter === "contributed" ? "all" : "contributed")}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-mono transition-all flex items-center gap-1.5",
                      ownershipFilter === "contributed"
                        ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        : "text-white/30 hover:text-white/60"
                    )}
                  >
                    <GitFork className="w-3 h-3" />
                    --contrib
                  </button>
                </div>

                <span className="text-white/10">|</span>

                {/* Sort */}
                <div className="flex items-center gap-1">
                  <span className="text-white/30 text-xs font-mono">sort:</span>
                  {[
                    { key: "stars" as SortOption, label: "stars", icon: Star },
                    { key: "recent" as SortOption, label: "date", icon: Clock },
                    { key: "name" as SortOption, label: "name", icon: TrendingUp },
                  ].map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setSortBy(key)}
                      className={cn(
                        "px-2 py-1 rounded text-xs font-mono transition-all flex items-center gap-1",
                        sortBy === key
                          ? "bg-white/10 text-white border border-white/20"
                          : "text-white/30 hover:text-white/60"
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/30 mb-8 font-mono text-sm"
        >
          Showing {paginatedProjects.length} of {filteredProjects.length} results
          {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
        </motion.p>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.map((project, index) => (
              <Project3DCard key={project.name} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mt-12"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={cn(
                "p-2 rounded-lg transition-all flex items-center gap-1",
                currentPage === 1
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
              )}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs font-mono hidden sm:inline">Prev</span>
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and neighbors
                  return (
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1
                  );
                })
                .map((page, idx, arr) => (
                  <div key={page} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                      <span className="text-white/20 px-1">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={cn(
                        "w-8 h-8 rounded-lg text-xs font-mono transition-all",
                        currentPage === page
                          ? "bg-white text-black"
                          : "text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
                      )}
                    >
                      {page}
                    </button>
                  </div>
                ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={cn(
                "p-2 rounded-lg transition-all flex items-center gap-1",
                currentPage === totalPages
                  ? "text-white/20 cursor-not-allowed"
                  : "text-white/50 hover:text-white hover:bg-white/10 border border-white/10"
              )}
            >
              <span className="text-xs font-mono hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/40 mb-4">No projects found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setShowFeaturedOnly(false);
                setOwnershipFilter("all");
                setSortBy("stars");
                setCurrentPage(1);
              }}
              className="text-white/60 hover:text-white font-mono text-sm underline underline-offset-4"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
