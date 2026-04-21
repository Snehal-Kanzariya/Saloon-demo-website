"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import HeroScene from "../3d/HeroScene";

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll(".char");
        gsap.fromTo(
          chars,
          { opacity: 0, y: 60, rotateX: -90 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "power4.out",
            delay: 0.5,
          }
        );
      }
    };
    loadGsap();
  }, []);

  const words = ["Where", "Beauty", "Meets", "Precision"];

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* 3D Scene */}
      <HeroScene />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-obsidian pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 via-transparent to-obsidian/60 pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-rose-gold opacity-60" />
          <span
            className="text-xs tracking-[0.35em] uppercase font-light"
            style={{ color: "#b76e79" }}
          >
            Luxury Beauty Experience
          </span>
          <div className="h-px w-16 bg-rose-gold opacity-60" />
        </motion.div>

        {/* Main headline */}
        <h1
          ref={headlineRef}
          className="font-display text-[clamp(3rem,8vw,7rem)] font-light leading-[0.95] tracking-tight perspective-[800px] mb-8"
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-block mr-[0.2em]">
              {word.split("").map((char, ci) => (
                <span
                  key={ci}
                  className="char inline-block"
                  style={{
                    color:
                      word === "Beauty" || word === "Precision" ? "#b76e79" : "#f5f5f5",
                  }}
                >
                  {char}
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-white/50 font-light tracking-widest text-sm mb-12 max-w-md mx-auto"
        >
          Bespoke artistry. Uncompromising excellence. Your transformation awaits.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#booking"
            className="group relative px-10 py-4 overflow-hidden rounded-none border border-rose-gold/70 transition-all duration-500"
            style={{ borderColor: "#b76e79" }}
          >
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              style={{ background: "#b76e79" }}
            />
            <span className="relative z-10 font-light tracking-[0.25em] text-sm uppercase text-white group-hover:text-obsidian transition-colors duration-300">
              Book Appointment
            </span>
          </a>
          <a
            href="#services"
            className="text-white/40 hover:text-white/70 transition-colors text-sm font-light tracking-widest uppercase flex items-center gap-3"
          >
            <span>Explore Services</span>
            <svg width="20" height="1" viewBox="0 0 20 1">
              <line x1="0" y1="0.5" x2="20" y2="0.5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
      >
        <span className="text-white/30 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <div className="w-px h-14 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ background: "#b76e79", height: "50%" }}
            animate={{ y: ["0%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
