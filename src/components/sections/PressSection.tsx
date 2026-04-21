"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const pressItems = [
  { name: "Vogue",          tagline: "Best Salon in Paris 2024" },
  { name: "Harper's Bazaar", tagline: "Editor's Pick — Color" },
  { name: "GQ",             tagline: "Grooming Excellence Award" },
  { name: "Elle",           tagline: "Top 10 Luxury Salons" },
  { name: "InStyle",        tagline: "Readers' Choice 2023" },
  { name: "Allure",         tagline: "Best of Beauty Winner" },
];

function PressLogo({ item, index }: { item: (typeof pressItems)[0]; index: number }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center gap-3 px-8 py-10 border-r last:border-r-0 relative overflow-hidden cursor-default"
      style={{ borderColor: "rgba(183,110,121,0.1)" }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(183,110,121,0.06) 0%, transparent 70%)" }}
      />

      {/* Publication name — stylised as serif logotype */}
      <span
        className="font-display text-xl font-light tracking-wide transition-colors duration-400 group-hover:text-white"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        {item.name}
      </span>

      {/* Tagline — revealed on hover */}
      <span
        className="text-[10px] tracking-[0.25em] uppercase font-light opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-2 group-hover:translate-y-0"
        style={{ color: "#b76e79" }}
      >
        {item.tagline}
      </span>
    </motion.div>
  );
}

export default function PressSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-20 px-6 bg-obsidian overflow-hidden">
      {/* Top separator line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 opacity-20"
        style={{ background: "linear-gradient(to bottom, #b76e79, transparent)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(183,110,121,0.2)" }} />
          <span className="text-[10px] tracking-[0.45em] uppercase font-light" style={{ color: "rgba(255,255,255,0.25)" }}>
            As featured in
          </span>
          <div className="h-px flex-1 max-w-[80px]" style={{ background: "rgba(183,110,121,0.2)" }} />
        </motion.div>

        {/* Logo grid */}
        <div
          className="grid"
          style={{ gridTemplateColumns: `repeat(${pressItems.length}, 1fr)` }}
        >
          {pressItems.map((item, i) => (
            <PressLogo key={item.name} item={item} index={i} />
          ))}
        </div>

        {/* Awards ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-6"
        >
          {[
            "Awwwards Honorable Mention 2024",
            "NAHA Salon of the Year",
            "Allure Best of Beauty × 3",
          ].map((award) => (
            <span
              key={award}
              className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase font-light px-5 py-2.5 border"
              style={{ borderColor: "rgba(183,110,121,0.2)", color: "rgba(255,255,255,0.25)" }}
            >
              <span style={{ color: "#b76e79", fontSize: "8px" }}>★</span>
              {award}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
