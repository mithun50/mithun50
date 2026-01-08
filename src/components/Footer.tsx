"use client";

import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Youtube, PlayCircle } from "lucide-react";
import Link from "next/link";
import { staticProfile } from "@/lib/data";

const footerLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.05]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Name & Bio */}
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-3">
              <h3 className="text-2xl font-bold tracking-tight">
                <span className="text-white">Mithun </span>
                <span className="text-orange-500">Gowda B</span>
              </h3>
            </Link>
            <p className="text-white/30 text-sm max-w-xs mb-4">
              Engineering Student @ {staticProfile.education.shortName} | {staticProfile.venture.role} @ {staticProfile.venture.shortName}
            </p>
            {/* Social Links */}
            <div className="flex flex-wrap gap-3">
              <a href={staticProfile.socials.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/20 transition-all" title="GitHub">
                <Github className="w-4 h-4" />
              </a>
              <a href={staticProfile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/20 transition-all" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={staticProfile.socials.huggingface} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/20 transition-all" title="Hugging Face">
                <span className="text-sm">🤗</span>
              </a>
              <a href={staticProfile.socials.npmjs} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/20 transition-all" title="npm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/></svg>
              </a>
              <a href={staticProfile.socials.pypi} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/[0.03] border border-white/[0.08] rounded-lg text-white/30 hover:text-white hover:border-white/20 transition-all" title="PyPI">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.922 12.357c-.062-.354-.193-.67-.398-.944a2.1 2.1 0 0 0-.784-.639c.044-.354-.015-.67-.177-.945a1.89 1.89 0 0 0-.636-.66 1.94 1.94 0 0 0-.176-1.06 1.97 1.97 0 0 0-.709-.732c.015-.383-.073-.727-.265-1.03a2.1 2.1 0 0 0-.723-.696 2.44 2.44 0 0 0-.383-1.074 2.14 2.14 0 0 0-.797-.681c-.044-.28-.118-.531-.221-.755a2.43 2.43 0 0 0-.398-.59 2.58 2.58 0 0 0-.561-.449c-.236-.133-.5-.222-.797-.266a4.01 4.01 0 0 0-.871-.059c-.545.015-.987.118-1.326.31a2.23 2.23 0 0 0-.797.714c-.192.295-.325.624-.398.988-.206-.073-.442-.11-.708-.11-.192 0-.398.015-.619.044a3.77 3.77 0 0 0-.634.147 2.25 2.25 0 0 0-.531.25 1.51 1.51 0 0 0-.383.383c-.104.148-.177.325-.221.531-.03.162-.044.325-.044.487 0 .22.03.435.088.645l-1.844.634a3.26 3.26 0 0 0-.192-.737 2.41 2.41 0 0 0-.383-.649 2.01 2.01 0 0 0-.561-.472c-.207-.118-.442-.206-.708-.265a4.53 4.53 0 0 0-.871-.089c-.561 0-1.015.089-1.361.265-.347.177-.62.412-.82.708-.192.288-.325.606-.398.954a4.8 4.8 0 0 0-.089.708L0 10.513v1.416l1.565.532v.486c0 .28.03.54.088.783a2.18 2.18 0 0 0 .28.66c.13.191.295.353.494.486.207.133.457.236.753.31l.885.221v.472c0 .28.03.546.088.797.059.251.162.479.31.686.147.206.339.38.575.52.244.141.545.251.9.332l.975.192v.457c0 .266.03.52.088.768.059.243.163.46.31.652.148.192.34.357.576.494.243.133.545.236.9.31l1.756.428c.118.022.243.044.376.066.14.022.28.037.413.044.148.015.295.022.442.022.162 0 .31-.007.443-.022.147-.014.28-.03.398-.044.133-.022.258-.052.376-.088l1.668-.487.088.022c.118.03.236.052.354.066.133.022.266.03.398.03.133 0 .258-.008.376-.022.118-.015.236-.03.354-.044l2.128-.575c.429-.118.783-.295 1.059-.531.28-.236.494-.516.641-.841.148-.325.236-.679.265-1.06.03-.383.015-.775-.044-1.178a4.67 4.67 0 0 0 .457-.133c.281-.103.531-.243.753-.413.221-.177.398-.383.531-.619.133-.236.206-.502.221-.797zm-9.2-5.73c.03-.266.096-.502.199-.708.104-.206.243-.383.42-.531.176-.148.39-.265.641-.354.25-.088.53-.133.841-.133.295 0 .568.045.82.133.251.088.465.214.641.376.177.162.31.361.398.597.088.236.118.502.088.797-.029.295-.11.561-.243.797-.125.236-.287.442-.487.62a2.32 2.32 0 0 1-.679.427c-.252.103-.523.162-.812.177-.302 0-.582-.044-.841-.133a1.85 1.85 0 0 1-.664-.39 1.72 1.72 0 0 1-.412-.605 2.01 2.01 0 0 1-.132-.679c0-.089.007-.191.022-.31zm-1.565 5.068c.295.044.575.133.841.265.266.125.501.295.708.509.206.206.376.449.509.723.133.28.22.582.265.9.059.338.059.67 0 .988a2.68 2.68 0 0 1-.354.916 2.16 2.16 0 0 1-.664.679 2.16 2.16 0 0 1-.943.354c-.31.044-.605.03-.884-.044a2.22 2.22 0 0 1-.783-.354 2.11 2.11 0 0 1-.576-.605 2.22 2.22 0 0 1-.31-.813c-.059-.295-.059-.583 0-.862a2.35 2.35 0 0 1 .31-.797c.148-.236.331-.442.553-.62a2.2 2.2 0 0 1 .724-.413c.265-.103.545-.154.841-.154.28 0 .531.037.753.11l-.044-.088-.102-.17a2.76 2.76 0 0 0-.442-.428 1.78 1.78 0 0 0-.531-.266 1.64 1.64 0 0 0-.545-.088c-.236 0-.457.03-.664.088-.206.059-.39.148-.553.265-.162.118-.302.265-.42.443a1.91 1.91 0 0 0-.251.575zm-4.245 6.18c-.162.029-.31.029-.442 0a.96.96 0 0 1-.354-.148.82.82 0 0 1-.243-.265.95.95 0 0 1-.133-.376v-3.527l1.506-.509v3.954c0 .162-.022.31-.066.443a.93.93 0 0 1-.199.354c-.088.103-.199.177-.331.221-.133.044-.28.059-.442.044-.163.015-.31 0-.442-.044a.96.96 0 0 1-.34-.208 1.04 1.04 0 0 1-.213-.331c-.05-.125-.073-.265-.066-.42l.765-.265v.487c0 .088.015.17.044.243.037.074.081.133.133.177a.52.52 0 0 0 .185.103c.066.022.133.03.199.022.073-.007.14-.03.199-.066a.53.53 0 0 0 .147-.133c.037-.052.059-.118.073-.199a.8.8 0 0 0 .015-.206V8.888l3.762-1.371c.096-.029.192-.044.288-.044.103 0 .199.015.287.044.096.037.177.081.244.133.073.052.125.118.162.199a.61.61 0 0 1 .059.25.67.67 0 0 1-.044.251.62.62 0 0 1-.133.199.69.69 0 0 1-.199.14 1.12 1.12 0 0 1-.243.073l-2.643.87v1.92l2.951-.885c.096-.03.191-.044.288-.044.103 0 .198.014.287.044.096.029.177.073.243.133.074.051.133.117.17.198.037.081.059.163.059.251s-.014.17-.044.251a.63.63 0 0 1-.133.199.65.65 0 0 1-.198.14 1.13 1.13 0 0 1-.244.073l-3.379.988v.022zm6.92-1.357a.96.96 0 0 1-.354-.148.81.81 0 0 1-.243-.265.96.96 0 0 1-.133-.376v-3.527l1.506-.509v3.954c0 .162-.022.31-.066.443a.93.93 0 0 1-.199.354.9.9 0 0 1-.331.221c-.133.044-.28.059-.442.044a.98.98 0 0 1-.442-.044.97.97 0 0 1-.34-.206 1.05 1.05 0 0 1-.213-.332c-.051-.125-.074-.265-.066-.42l.768-.265v.487c0 .088.015.17.044.243.036.074.08.133.132.177a.51.51 0 0 0 .185.103c.066.022.133.03.199.022a.4.4 0 0 0 .199-.066.53.53 0 0 0 .147-.133c.037-.052.059-.118.073-.199a.8.8 0 0 0 .015-.206v-5.818l1.506-.531v6.568c0 .162-.022.31-.066.443a.93.93 0 0 1-.199.354.93.93 0 0 1-.331.221c-.133.044-.28.059-.442.044a.98.98 0 0 1-.442-.044.96.96 0 0 1-.34-.206 1.04 1.04 0 0 1-.213-.332c-.051-.125-.073-.265-.066-.42l.765-.265v.487c0 .088.015.17.044.243.036.074.08.133.133.177a.51.51 0 0 0 .184.103c.066.022.133.03.199.022.073-.007.14-.03.199-.066a.53.53 0 0 0 .147-.133c.037-.052.059-.118.073-.199a.79.79 0 0 0 .015-.206v-6.64l1.506-.516v7.582c0 .28-.03.54-.088.783a2.17 2.17 0 0 1-.28.66 1.55 1.55 0 0 1-.494.486c-.206.133-.457.236-.752.31l-1.877.472z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/30 hover:text-white transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* NextGenX */}
          <div>
            <h4 className="text-white/50 text-xs font-mono uppercase tracking-widest mb-4">{staticProfile.venture.shortName}</h4>
            <div className="flex flex-col gap-2">
              <a href={staticProfile.nextgenx.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm">
                <Youtube className="w-4 h-4" />
                <span>YouTube</span>
              </a>
              <a href={staticProfile.nextgenx.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span>Instagram</span>
              </a>
              <a href={staticProfile.nextgenx.playstore} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-sm">
                <PlayCircle className="w-4 h-4" />
                <span>Play Store</span>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll to Top - Floating */}
        <motion.button
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-white/[0.05] border border-white/[0.1] rounded-full text-white/30 hover:text-white hover:border-white/30 transition-all z-50 backdrop-blur-sm"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-white/20 font-mono text-xs">
            &copy; {new Date().getFullYear()} <span className="text-white/30">Mithun</span> <span className="text-orange-500/50">Gowda B</span>
          </p>

          <p className="text-white/20 text-xs flex items-center gap-2">
            <span>Built with</span>
            <span className="text-white/40">Next.js</span>
            <span className="text-white/10">•</span>
            <span className="text-white/40">Tailwind</span>
            <span className="text-white/10">•</span>
            <span className="text-white/40">Framer Motion</span>
          </p>

          <a
            href={staticProfile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/20 hover:text-white/60 transition-colors"
          >
            <Github className="w-4 h-4" />
            <span className="font-mono text-xs">Source</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
