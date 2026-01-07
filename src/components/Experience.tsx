"use client";

import { motion, useScroll, useSpring, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap, GitPullRequest, Calendar, ArrowUpRight } from "lucide-react";
import { experience } from "@/data/profile";
import { GlassCard } from "@/components/ui/glass-card";

const typeIcons = {
  contribution: GitPullRequest,
  education: GraduationCap,
  work: Briefcase,
};

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="experience" className="pt-24 pb-20 bg-[#121212] relative overflow-hidden" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
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
            <span className="text-white/30 font-mono text-sm">03</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="text-white/30 font-mono text-sm uppercase tracking-widest">Experience</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
            My journey
            <br />
            <span className="text-white/30">so far.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2">
            <motion.div
              className="absolute top-0 left-0 right-0 bg-white origin-top"
              style={{ scaleY: smoothProgress }}
            />
          </div>

          {/* Glowing dot that follows scroll */}
          <motion.div
            className="absolute left-0 md:left-1/2 w-3 h-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            style={{
              top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
            }}
          />

          <div className="space-y-16 md:space-y-24">
            {experience.map((item, index) => {
              const Icon = typeIcons[item.type as keyof typeof typeIcons] || Briefcase;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className={`relative flex items-center ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-[#121212] border-2 border-white/30 z-10" />

                  {/* Date - shown on opposite side on desktop */}
                  <div
                    className={`hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 ${
                      isLeft ? "translate-x-8" : "-translate-x-[calc(100%+2rem)]"
                    }`}
                  >
                    <span className="text-white/30 font-mono text-sm flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {item.period}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-3rem)] ${
                      isLeft ? "md:pr-0 pl-8 md:pl-0" : "md:pl-0 pl-8 md:pr-0"
                    }`}
                  >
                    <GlassCard hover3D={true}>
                      <div className="p-6">
                        {/* Type Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-white/60" />
                            </div>
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                              {item.type}
                            </span>
                          </div>
                          {/* Mobile date */}
                          <span className="md:hidden text-xs font-mono text-white/30">
                            {item.period}
                          </span>
                        </div>

                        {/* Content */}
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-white/50 text-sm mb-3 flex items-center gap-1">
                          {item.company}
                          <ArrowUpRight className="w-3 h-3" />
                        </p>
                        <p className="text-white/40 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* GitHub Contribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32"
        >
          <GlassCard>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    Contribution Activity
                  </h3>
                  <p className="text-white/40 text-sm">
                    Consistent contributions across open-source projects
                  </p>
                </div>
                <a
                  href="https://github.com/mithun50"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors flex items-center gap-2 text-sm font-mono"
                >
                  @mithun50
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              {/* Mobile: Horizontal scroll, Desktop: Centered */}
              <div className="overflow-x-auto pb-2">
                <div className="min-w-[700px] md:min-w-0 md:flex md:justify-center">
                  <img
                    src="https://ghchart.rshah.org/40c463/mithun50"
                    alt="GitHub Contribution Chart"
                    className="w-full max-w-2xl rounded-lg hover:opacity-90 transition-opacity"
                  />
                </div>
              </div>
              <p className="text-center text-white/20 text-xs mt-2 md:hidden">
                ← Scroll to see full chart →
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
