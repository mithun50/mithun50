"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRotatorProps {
  words: string[];
  className?: string;
  interval?: number;
}

export function TextRotator({ words, className, interval = 3000 }: TextRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  const getGradientColor = (index: number, total: number) => {
    const hueStart = (currentIndex * 30) % 360;
    const hue = hueStart + (index / total) * 60;
    return `hsl(${hue}, 80%, 60%)`;
  };

  return (
    <span className={cn("relative inline-block min-w-[250px]", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          className="absolute inset-0 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {words[currentIndex].split("").map((letter, i, arr) => (
            <motion.span
              key={`${currentIndex}-${i}`}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { delay: i * 0.05, duration: 0.4 },
              }}
              exit={{
                opacity: 0,
                y: -20,
                filter: "blur(5px)",
                transition: { delay: i * 0.02, duration: 0.3 },
              }}
              style={{ color: getGradientColor(i, arr.length) }}
              className={letter === " " ? "ml-2" : ""}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-0">{words[0]}</span>
    </span>
  );
}
