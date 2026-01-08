"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Users, GitFork, Sparkles, Terminal, Zap, Globe, GraduationCap, Rocket, Youtube, PlayCircle, Github, Linkedin, Twitter, ExternalLink, MapPin } from "lucide-react";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { GlassCard } from "@/components/ui/glass-card";
import Image from "next/image";

interface ProfileData {
  name: string;
  avatar: string;
  bio: string;
  email: string;
  location: string;
  education: {
    institution: string;
    shortName: string;
    degree: string;
    year: string;
    period: string;
  };
  venture: {
    name: string;
    shortName: string;
    role: string;
    description: string;
  };
  stats: {
    repos: number;
    stars: number;
    followers: number;
    contributions: string | number;
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    discord: string;
    pypi: string;
    npmjs: string;
    orcid: string;
    huggingface: string;
  };
  nextgenx: {
    instagram: string;
    youtube: string;
    playstore: string;
    email: string;
  };
  achievements: { name: string; count: number; icon: string }[];
  organizations: string[];
}

export default function About({ profile }: { profile: ProfileData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="pt-24 pb-20 bg-[#0a0a0a] relative overflow-hidden" ref={ref}>
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white/30 font-mono text-sm">01</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">About</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Building the future,
            <br />
            <span className="text-white/30">one commit at a time.</span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {/* Profile Image Card - Professional Developer Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="col-span-1 md:col-span-2 md:row-span-2"
          >
            <div className="relative h-full group">
              {/* Main Card Container */}
              <div className="relative h-full rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-sm overflow-hidden flex flex-col">

                {/* Top Bar - Terminal Style */}
                <div className="px-4 py-3 border-b border-white/[0.06] bg-black/40 backdrop-blur-md flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30">developer.profile</span>
                  </div>
                </div>

                {/* Image Container - Fixed aspect ratio */}
                <div className="relative mx-4 mt-4 rounded-xl overflow-hidden flex-shrink-0" style={{ aspectRatio: "1/1" }}>
                  <Image
                    src={profile.avatar}
                    alt={profile.name}
                    fill
                    className="object-cover object-top transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-green-400">Available</span>
                  </div>

                  {/* Decorative corner brackets on image */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-orange-500/50 rounded-tl" />
                  <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-orange-500/50 rounded-tr" />
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-orange-500/50 rounded-bl" />
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-orange-500/50 rounded-br" />
                </div>

                {/* Info Section - Below image */}
                <div className="p-4 flex-1 flex flex-col">
                  {/* Name with code style */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-orange-500/60 font-mono text-xs">const</span>
                      <span className="text-purple-400/80 font-mono text-xs">developer</span>
                      <span className="text-white/40 font-mono text-xs">=</span>
                      <span className="text-white/40 font-mono text-xs">{"{"}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight pl-4 border-l-2 border-orange-500">
                      {profile.name}
                    </h3>
                  </div>

                  {/* Role & Details */}
                  <div className="space-y-1.5 pl-4 text-sm flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 font-mono text-[11px]">role:</span>
                      <span className="text-orange-400 font-mono text-xs">&quot;{profile.venture.role}&quot;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 font-mono text-[11px]">org:</span>
                      <span className="text-white/60 font-mono text-xs">&quot;{profile.venture.shortName}&quot;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 font-mono text-[11px]">edu:</span>
                      <span className="text-white/50 font-mono text-xs">&quot;{profile.education.shortName}&quot;</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white/30 font-mono text-[11px]">loc:</span>
                      <span className="text-white/40 font-mono text-xs">&quot;{profile.location}&quot;</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-4 mt-2">
                    <span className="text-white/40 font-mono text-xs">{"}"}</span>
                  </div>

                  {/* Social links footer */}
                  <div className="mt-3 pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-orange-400 transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                        <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-orange-400 transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-orange-400 transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      </div>
                      <span className="text-[10px] font-mono text-orange-500/50">// open to work</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            </div>
          </motion.div>

          {/* Main Bio Card - Spans 4 columns */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="col-span-1 md:col-span-4"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Terminal className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Who I am</h3>
                    <p className="text-sm text-white/40">The short version</p>
                  </div>
                </div>
                <p className="text-white/60 leading-relaxed mb-6">
                  I&apos;m an engineering student at <span className="text-white/80">{profile.education.institution}</span> from Karnataka, India,
                  with a deep passion for software development and artificial intelligence. As <span className="text-white/80">{profile.venture.role}</span> of{" "}
                  <span className="text-white/80">{profile.venture.name}</span>, I lead a tech exploration and innovation community.
                </p>
                <p className="text-white/60 leading-relaxed">
                  My journey started with curiosity about how things work, leading me to explore everything
                  from mobile apps to AI frameworks. As an active open-source contributor, I&apos;ve built
                  projects that gained traction in the developer community.
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* What I Do Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 md:col-span-2"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Focus Areas</h3>
                </div>
                <div className="space-y-3">
                  {["AI & ML", "Open Source", "Mobile Dev", "Web Dev"].map((area, index) => (
                    <div
                      key={area}
                      className="flex items-center gap-3 text-white/50 text-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="col-span-1 md:col-span-2"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <GraduationCap className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Education</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-white/80 font-medium">{profile.education.institution}</p>
                  <p className="text-white/50 text-sm">{profile.education.degree} - {profile.education.year}</p>
                  <p className="text-white/30 text-xs font-mono">{profile.education.period}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* NextGenX Venture Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="col-span-1 md:col-span-4"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-white/60" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{profile.venture.name}</h3>
                      <p className="text-sm text-white/40">{profile.venture.role}</p>
                    </div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {profile.venture.description} - Building a community of tech enthusiasts and creators exploring the latest in technology.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={profile.nextgenx.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <Youtube className="w-4 h-4" />
                    <span>YouTube</span>
                  </a>
                  <a
                    href={profile.nextgenx.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href={profile.nextgenx.playstore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Play Store</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Organizations Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="col-span-1 md:col-span-2"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Globe className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Organizations</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.organizations.map((org) => (
                    <span
                      key={org}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-mono"
                    >
                      {org}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Developer Profiles Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.52 }}
            className="col-span-1 md:col-span-4"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <ExternalLink className="w-5 h-5 text-white/60" />
                  <h3 className="text-lg font-semibold text-white">Developer Profiles</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </a>
                  <a
                    href={profile.socials.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <span className="text-lg">🤗</span>
                    <span>Hugging Face</span>
                  </a>
                  <a
                    href={profile.socials.npmjs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z"/>
                    </svg>
                    <span>npm</span>
                  </a>
                  <a
                    href={profile.socials.pypi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.042 0L3.46 4.962v14.076L12.042 24l8.58-4.962V4.962L12.042 0zM6.464 17.17V6.83L12 3.866l5.537 2.965v10.338L12 20.134l-5.536-2.965z"/>
                    </svg>
                    <span>PyPI</span>
                  </a>
                  <a
                    href={profile.socials.orcid}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-2.016-1.284-3.722-4.097-3.722h-2.222z"/>
                    </svg>
                    <span>ORCID</span>
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Achievements Card - Full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="col-span-1 md:col-span-6"
          >
            <GlassCard>
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-semibold text-white">GitHub Achievements</h3>
                  <span className="text-xs text-white/30 font-mono">
                    {profile.achievements.length} unlocked
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 gap-4">
                  {profile.achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.05 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="group text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                        <DynamicIcon
                          name={achievement.icon}
                          className="w-5 h-5 text-white/40 group-hover:text-white transition-colors"
                        />
                      </div>
                      <div className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors truncate">
                        {achievement.name}
                      </div>
                      {achievement.count > 1 && (
                        <div className="text-[10px] text-white/20 font-mono">x{achievement.count}</div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
