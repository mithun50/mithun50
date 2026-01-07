"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Star, GitFork, ExternalLink, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/data/profile";
import { DynamicIcon } from "@/components/ui/dynamic-icon";

const featuredProjects = projects.filter((p) => p.featured).slice(0, 6);

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

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
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative"
    >
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl overflow-hidden group-hover:border-white/[0.15] transition-all duration-300">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="p-6" style={{ transform: "translateZ(15px)" }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <DynamicIcon name={project.icon} className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
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

          {/* Title */}
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-white/40 text-sm mb-4 line-clamp-2 leading-relaxed">
            {project.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-white/30">
                <Star className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{project.stars}</span>
              </span>
              <span className="flex items-center gap-1 text-white/30">
                <GitFork className="w-3.5 h-3.5" />
                <span className="text-xs font-mono">{project.forks}</span>
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] text-white/40 font-mono">
              {project.language}
            </span>
          </div>

          {/* Homepage Link */}
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/50 hover:text-white hover:border-white/20 hover:bg-white/10 transition-colors w-fit text-xs font-mono"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Live
            </a>
          )}

          {project.isForked && !project.homepage && (
            <div className="mt-3 text-[10px] text-white/30 flex items-center gap-1 font-mono">
              <GitFork className="w-3 h-3" />
              Contributed
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function FeaturedProjects() {
  return (
    <section id="featured" className="py-32 relative overflow-hidden bg-[#121212]">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Featured</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Selected work
            <br />
            <span className="text-white/30">& open source.</span>
          </h2>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors font-mono text-sm group mt-4"
          >
            View all projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all group"
          >
            <span>Explore all {projects.length} projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
