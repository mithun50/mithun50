"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Wrench, Cloud } from "lucide-react";
import { skills } from "@/data/profile";
import { DynamicIcon } from "@/components/ui/dynamic-icon";
import { GlassCard } from "@/components/ui/glass-card";

const skillCategories = [
  { title: "Languages", icon: Code2, items: skills.languages },
  { title: "Frameworks", icon: Layers, items: skills.frameworks },
  { title: "Tools", icon: Wrench, items: skills.tools },
  { title: "Platforms", icon: Cloud, items: skills.platforms },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-[#121212] relative overflow-hidden" ref={ref}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
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
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Skills</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Technologies
            <br />
            <span className="text-white/30">I work with.</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <GlassCard>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-white/60" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{category.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + skillIndex * 0.03,
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="group flex items-center gap-2 px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-white/50 text-sm cursor-default hover:border-white/30 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <DynamicIcon
                          name={skill.icon}
                          className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors"
                        />
                        <span className="font-mono text-xs">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Preferred Stack */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <GlassCard>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-semibold text-white">Primary Stack</h3>
                <span className="text-xs text-white/30 font-mono">most used</span>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { name: "Python", icon: "Code2" },
                  { name: "TypeScript", icon: "FileCode" },
                  { name: "React", icon: "Atom" },
                  { name: "Next.js", icon: "Triangle" },
                  { name: "Flutter", icon: "Smartphone" },
                  { name: "FastAPI", icon: "Zap" },
                  { name: "Node.js", icon: "Hexagon" },
                  { name: "Firebase", icon: "Flame" },
                ].map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                    className="group flex flex-col items-center gap-3 p-4 min-w-[80px]"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/10 transition-all">
                      <DynamicIcon
                        name={tech.icon}
                        className="w-6 h-6 text-white/40 group-hover:text-white transition-colors"
                      />
                    </div>
                    <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors font-mono">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
