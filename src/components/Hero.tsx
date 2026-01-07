"use client";

import { motion } from "framer-motion";
import { ArrowDown, MapPin, Github, ExternalLink, Copy, Check, GraduationCap, Rocket, Youtube, PlayCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { profile } from "@/data/profile";
import { TechGrid, NoiseTexture } from "@/components/ui/tech-background";
import { TextRotator } from "@/components/ui/text-rotator";
import { useState } from "react";

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#121212]">
      {/* Subtle Background Effects */}
      <TechGrid />
      <NoiseTexture />

      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#121212] to-transparent z-20 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <div className="relative mb-8">
            {/* Glow ring */}
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-violet-500/30 via-purple-500/10 to-violet-500/30 blur-md" />
            <div className="absolute -inset-0.5 rounded-full border border-violet-500/30" />

            {/* Profile Image */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-2 border-white/10">
              <Image
                src={profile.avatar}
                alt={profile.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Status indicator */}
            <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-[#121212] animate-pulse" />
          </div>

          {/* Badges Row - Education & Co-Founder */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6">
            {/* Education Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <GraduationCap className="w-4 h-4 text-violet-400" />
              <span className="font-mono text-sm text-white/70">
                {profile.education.shortName}
              </span>
            </div>

            {/* Co-Founder Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
              <Rocket className="w-4 h-4 text-violet-400" />
              <span className="font-mono text-sm text-white/70">
                {profile.venture.role} @ {profile.venture.shortName}
              </span>
            </div>
          </div>

          {/* Name */}
          <div className="relative mb-6">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter">
              <span className="text-white">Mithun </span>
              <span className="text-orange-500">Gowda B</span>
            </h1>
            {/* Decorative line */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
          </div>

          {/* Rotating role */}
          <div className="flex items-center gap-3 mb-8 text-lg sm:text-xl">
            <span className="text-white/30 font-mono">&lt;</span>
            <TextRotator
              words={profile.rotatingWords}
              className="text-white font-light"
            />
            <span className="text-white/30 font-mono">/&gt;</span>
          </div>

          {/* Bio */}
          <p className="text-white/50 max-w-xl leading-relaxed mb-8">
            {profile.bio}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-white/30 text-sm mb-12">
            <MapPin className="w-3 h-3" />
            <span className="font-mono">{profile.location}</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link
              href="/projects"
              className="group relative px-8 py-3 bg-white text-black font-medium rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                View Work
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>

            <button
              onClick={copyEmail}
              className="group px-8 py-3 border border-white/20 text-white font-medium rounded-full hover:border-white/40 hover:text-white transition-all flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12">
            {[
              { label: "Repos", value: profile.stats.repos },
              { label: "Stars", value: profile.stats.stars },
              { label: "Followers", value: profile.stats.followers },
              { label: "Contributions", value: profile.stats.contributions },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center group cursor-default"
              >
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1 font-mono tracking-tight group-hover:text-white/80 transition-colors">
                  {stat.value}
                  <span className="text-white/30">+</span>
                </div>
                <div className="text-xs text-white/30 uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-6 mt-16">
            {/* Personal Links */}
            <div className="flex items-center gap-6">
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <div className="w-[1px] h-4 bg-white/10" />
              <a
                href={`mailto:${profile.email}`}
                className="text-white/30 hover:text-white transition-colors font-mono text-sm"
              >
                {profile.email}
              </a>
            </div>

            {/* NextGenX Links */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/20 font-mono text-xs uppercase tracking-widest">NextGenX</span>
              <div className="flex items-center justify-center gap-3">
                <a
                  href={profile.nextgenx.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                  <span className="text-xs font-mono">YouTube</span>
                </a>
                <a
                  href={profile.nextgenx.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  title="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span className="text-xs font-mono">Instagram</span>
                </a>
                <a
                  href={profile.nextgenx.playstore}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:border-white/30 transition-colors"
                  title="Play Store"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span className="text-xs font-mono">Play Store</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/20"
          >
            <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent z-20 pointer-events-none" />
    </section>
  );
}
