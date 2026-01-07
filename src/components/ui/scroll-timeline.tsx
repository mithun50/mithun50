"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  tags?: string[];
}

interface ScrollTimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function ScrollTimeline({ items, className }: ScrollTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
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
    <div ref={containerRef} className={cn("relative py-20", className)}>
      {/* Timeline line with progress */}
      <div className="absolute left-[50%] md:left-8 top-0 bottom-0 w-[1px] bg-white/10">
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-white via-white to-white/50 origin-top"
          style={{ scaleY: smoothProgress }}
        />
      </div>

      {/* Glowing dot that follows scroll */}
      <motion.div
        className="absolute left-[50%] md:left-8 w-3 h-3 -ml-[5px] rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
        style={{
          top: useTransform(smoothProgress, [0, 1], ["0%", "100%"]),
        }}
      />

      {/* Timeline items */}
      <div className="relative space-y-24">
        {items.map((item, index) => (
          <TimelineEntry
            key={item.id}
            item={item}
            index={index}
            total={items.length}
          />
        ))}
      </div>
    </div>
  );
}

function TimelineEntry({
  item,
  index,
  total,
}: {
  item: TimelineItem;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="relative pl-0 md:pl-20"
    >
      {/* Connection dot */}
      <div className="absolute left-[50%] md:left-8 w-2 h-2 -ml-[3px] rounded-full bg-white/30 border border-white/50" />

      {/* Date badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute left-[50%] md:left-8 -translate-x-[calc(100%+20px)] md:translate-x-0 md:-translate-x-[calc(100%+30px)] top-0 text-sm font-mono text-white/60"
      >
        {item.date}
      </motion.div>

      {/* Content card */}
      <motion.div
        style={{ x, scale }}
        className="ml-auto md:ml-0 w-[calc(50%-40px)] md:w-auto max-w-2xl"
      >
        <div className="relative group p-6 rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.04] hover:border-white/[0.15] transition-all duration-300">
          {/* Hover glow */}
          <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.05] to-transparent" />
          </div>

          <div className="relative">
            {/* Icon */}
            {item.icon && (
              <div className="mb-4 w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white">
                {item.icon}
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-white/60 leading-relaxed">
              {item.description}
            </p>

            {/* Tags */}
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-mono rounded-full bg-white/5 text-white/50 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function HorizontalTimeline({ items }: { items: TimelineItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="relative">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/10">
        <motion.div
          className="h-full bg-white origin-left"
          style={{ scaleX: scrollXProgress }}
        />
      </div>

      {/* Scrollable container */}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto py-12 px-4 scrollbar-hide snap-x snap-mandatory"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 w-80 snap-center"
          >
            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] transition-all duration-300">
              <div className="text-sm font-mono text-white/50 mb-2">
                {item.date}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-white/60">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
