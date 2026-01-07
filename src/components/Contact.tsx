"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Copy,
  Check,
  MessageCircle,
} from "lucide-react";
import { profile } from "@/data/profile";
import { GlassCard } from "@/components/ui/glass-card";

const socialLinks = [
  { name: "GitHub", icon: Github, href: profile.socials.github, handle: "@mithun50" },
  { name: "LinkedIn", icon: Linkedin, href: profile.socials.linkedin, handle: "@mithungowdab" },
  { name: "Twitter", icon: Twitter, href: profile.socials.twitter, handle: "@MithunGowdaB" },
  { name: "Discord", icon: MessageCircle, href: profile.socials.discord, handle: "Server" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="pt-24 pb-20 bg-[#121212] relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-white/30 font-mono text-sm">04</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Contact</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Let&apos;s work together.
            <br />
            <span className="text-white/30">Get in touch.</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Email Card - Primary CTA */}
            <GlassCard hover3D>
              <button
                onClick={copyEmail}
                className="w-full p-8 text-left group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/30 transition-all">
                    <Mail className="w-6 h-6 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 text-white/30">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-xs font-mono text-green-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 group-hover:text-white transition-colors" />
                        <span className="text-xs font-mono group-hover:text-white transition-colors">Click to copy</span>
                      </>
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Email me</h3>
                <p className="text-white/50 font-mono">{profile.email}</p>
              </button>
            </GlassCard>

            {/* Location */}
            <GlassCard>
              <div className="p-6 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white/60" />
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Location</p>
                  <p className="text-white/70">{profile.location}</p>
                </div>
              </div>
            </GlassCard>

            {/* Status */}
            <GlassCard>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-white/50">Currently available for</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Internships", "Collaborations", "Open Source", "Freelance"].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/50 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Side - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="h-full">
              <div className="p-8 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-6">Connect</h3>
                <div className="flex-1 flex flex-col justify-between gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="group flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-xl hover:border-white/20 hover:bg-white/[0.05] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <social.icon className="w-5 h-5 text-white/40 group-hover:text-white transition-colors" />
                        <div>
                          <p className="text-white/70 group-hover:text-white transition-colors">{social.name}</p>
                          <p className="text-xs text-white/30 font-mono">{social.handle}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </motion.a>
                  ))}
                </div>

                {/* Additional Links */}
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-xs text-white/30 mb-3">Other profiles</p>
                  <div className="flex gap-3">
                    <a
                      href={profile.socials.pypi}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50 hover:text-white hover:border-white/30 transition-all font-mono"
                    >
                      PyPI
                    </a>
                    <a
                      href={profile.socials.orcid}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-white/50 hover:text-white hover:border-white/30 transition-all font-mono"
                    >
                      ORCID
                    </a>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
