"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Search, X, Sparkles } from "lucide-react";
import { projects, categories, type Project } from "@/data/profile";
import { cn } from "@/lib/utils";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

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
                  {project.isForked && (
                    <span className="text-[10px] text-white/30">Contributed</span>
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

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesFeatured = !showFeaturedOnly || project.featured;
      return matchesCategory && matchesSearch && matchesFeatured;
    });
  }, [activeCategory, searchQuery, showFeaturedOnly]);

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

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveCategory(category.name)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2",
                  activeCategory === category.name
                    ? "bg-white text-black"
                    : "bg-white/[0.02] border border-white/10 text-white/50 hover:text-white hover:border-white/30"
                )}
              >
                <DynamicIcon name={category.icon} className="w-3.5 h-3.5" />
                <span>{category.name}</span>
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px]",
                  activeCategory === category.name
                    ? "bg-[#121212]/10"
                    : "bg-white/5"
                )}>
                  {categoryCounts[category.name] || 0}
                </span>
              </motion.button>
            ))}

            {/* Featured Toggle */}
            <button
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 flex items-center gap-2",
                showFeaturedOnly
                  ? "bg-white text-black"
                  : "bg-white/[0.02] border border-white/10 text-white/50 hover:text-white hover:border-white/30"
              )}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Featured
            </button>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/30 mb-8 font-mono text-sm"
        >
          {filteredProjects.length} results
        </motion.p>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <Project3DCard key={project.name} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

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
