"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileData {
  name: string;
  avatar: string;
  location: string;
  email: string;
  bio: string;
  rotatingWords: string[];
  education: { shortName: string };
  venture: { role: string; shortName: string };
  stats: {
    repos: number;
    stars: number;
    followers: number;
    contributions: string | number;
  };
  socials: { github: string };
  nextgenx: { youtube: string; instagram: string; playstore: string };
}

// BlurText animation component
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap justify-center ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView
              ? "translateY(0)"
              : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * delay}ms`,
            willChange: "filter, opacity, transform",
            minWidth: segment === " " ? "0.3em" : undefined,
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
};

// Animated counter for stats
const AnimatedNumber: React.FC<{ value: number; delay?: number }> = ({ value, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1500;
          const steps = 30;
          const stepValue = value / steps;
          let current = 0;

          setTimeout(() => {
            const interval = setInterval(() => {
              current += stepValue;
              if (current >= value) {
                setCount(value);
                clearInterval(interval);
              } else {
                setCount(Math.floor(current));
              }
            }, duration / steps);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [value, delay, hasAnimated]);

  return <span ref={ref}>{count}</span>;
};

export default function Hero({ profile }: { profile: ProfileData }) {
  const firstName = "MITHUN";
  const lastName = "GOWDA B";
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContent = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <section
      id="hero"
      className="min-h-[100dvh] relative overflow-hidden bg-[#0a0a0a]"
    >
      {/* Main Content */}
      <main className="relative min-h-[100dvh] flex flex-col">
        {/* Centered Main Name - Always Perfectly Centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-2 sm:px-4 pointer-events-none">
          <div className="relative text-center">
            {/* First Name */}
            <h1 className="block">
              <BlurText
                text={firstName}
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[160px] leading-[0.85] tracking-tighter uppercase"
                style={{
                  color: "#f97316",
                  fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                }}
              />
            </h1>
            {/* Last Name */}
            <h1 className="block mt-1 sm:mt-2">
              <BlurText
                text={lastName}
                delay={80}
                animateBy="letters"
                direction="top"
                className="font-bold text-[17vw] sm:text-[15vw] md:text-[13vw] lg:text-[160px] leading-[0.85] tracking-tighter uppercase"
                style={{
                  color: "#f97316",
                  fontFamily: "var(--font-fira-code), 'Fira Code', monospace",
                }}
              />
            </h1>

            {/* Profile Picture - Centered Overlay */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto transition-all duration-700 delay-500 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <div className="relative w-[55px] h-[90px] sm:w-[75px] sm:h-[120px] md:w-[95px] md:h-[155px] lg:w-[115px] lg:h-[185px] rounded-full overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-110 cursor-pointer border-2 border-orange-500/40 hover:border-orange-500/80">
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 640px) 55px, (max-width: 768px) 75px, (max-width: 1024px) 95px, 115px"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Online indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom Section - Tagline & Stats */}
        <div
          className={`absolute bottom-0 left-0 right-0 pb-14 sm:pb-16 px-4 sm:px-6 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-screen-xl mx-auto">
            {/* Tagline */}
            <p className="flex justify-center mb-5 sm:mb-6">
              <BlurText
                text="Full-Stack Developer | AI Enthusiast | Cybersecurity"
                delay={60}
                animateBy="words"
                direction="bottom"
                className="text-[12px] sm:text-sm md:text-base text-center text-neutral-400"
                style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
              />
            </p>

            {/* Stats Row */}
            <div className="flex items-center justify-center gap-8 sm:gap-12 md:gap-16 mb-5 sm:mb-6">
              {[
                { label: "Repos", value: profile.stats.repos, delay: 0 },
                { label: "Stars", value: profile.stats.stars, delay: 150 },
                { label: "Followers", value: profile.stats.followers, delay: 300 },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-white tabular-nums"
                    style={{ fontFamily: "var(--font-fira-code), 'Fira Code', monospace" }}
                  >
                    <AnimatedNumber value={stat.value} delay={stat.delay} />
                    <span className="text-neutral-600">+</span>
                  </div>
                  <div className="text-[9px] sm:text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-center gap-3">
              <Link
                href="/projects"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-orange-500 text-black font-semibold rounded-full text-xs sm:text-sm hover:bg-orange-400 transition-all duration-300 active:scale-95 hover:shadow-lg hover:shadow-orange-500/25"
              >
                View Projects
              </Link>
              <Link
                href="/contact"
                className="px-5 sm:px-6 py-2.5 sm:py-3 border border-neutral-700 text-white rounded-full text-xs sm:text-sm hover:border-orange-500 hover:text-orange-400 transition-all duration-300 active:scale-95"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          className={`absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 p-2 transition-all duration-500 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Scroll to content"
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600 hover:text-orange-400 transition-colors duration-300 animate-bounce" />
        </button>
      </main>
    </section>
  );
}
