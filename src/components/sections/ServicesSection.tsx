"use client";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    id: "01",
    title: "Haircut & Style",
    description:
      "Precision cutting tailored to your face structure, lifestyle, and personal aesthetic. Every strand considered.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M8 8 L20 20 M20 20 L32 8 M20 20 L20 34" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="14" cy="28" r="4" stroke="#b76e79" strokeWidth="1.5" />
        <circle cx="26" cy="28" r="4" stroke="#b76e79" strokeWidth="1.5" />
      </svg>
    ),
    duration: "45 – 75 min",
    price: "From $85",
  },
  {
    id: "02",
    title: "Hair Coloring",
    description:
      "Balayage, ombré, full color, highlights — artistically applied using premium pigments for luminous results.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M20 6 C20 6 10 14 10 22 C10 27.5 14.5 32 20 32 C25.5 32 30 27.5 30 22 C30 14 20 6 20 6Z" stroke="#b76e79" strokeWidth="1.5" />
        <path d="M15 22 C15 19.2 17.2 17 20 17" stroke="#d4a0a8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    duration: "2 – 4 hours",
    price: "From $150",
  },
  {
    id: "03",
    title: "Hair Styling",
    description:
      "Bridal, editorial, or evening looks crafted by masters of the craft. Your vision, flawlessly executed.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 34 C12 34 8 24 14 18 C20 12 26 16 24 22 C22 28 16 26 18 20" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M28 8 L32 12" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="12" r="3" stroke="#b76e79" strokeWidth="1.5" />
      </svg>
    ),
    duration: "60 – 90 min",
    price: "From $120",
  },
  {
    id: "04",
    title: "Facial Treatment",
    description:
      "Deep-cleansing, anti-aging, and luminosity facials using Swiss skincare formulas. Reveal radiant skin.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <circle cx="20" cy="20" r="12" stroke="#b76e79" strokeWidth="1.5" />
        <path d="M15 22 C15 25 18 27 20 27 C22 27 25 25 25 22" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="15.5" cy="17.5" r="1.5" fill="#b76e79" />
        <circle cx="24.5" cy="17.5" r="1.5" fill="#b76e79" />
      </svg>
    ),
    duration: "60 min",
    price: "From $110",
  },
  {
    id: "05",
    title: "Beard Grooming",
    description:
      "Hot towel shave, beard sculpting, and conditioning. Masculine precision with old-world luxury.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <path d="M12 14 L12 28 C12 31 15.5 34 20 34 C24.5 34 28 31 28 28 L28 14" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 18 C8 20 8 26 12 28" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M30 18 C32 20 32 26 28 28" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="20" cy="11" r="5" stroke="#b76e79" strokeWidth="1.5" />
      </svg>
    ),
    duration: "45 min",
    price: "From $65",
  },
];

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative glass rounded-sm p-8 cursor-pointer overflow-hidden"
    >
      {/* Hover fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "linear-gradient(135deg, rgba(183,110,121,0.08) 0%, transparent 60%)" }}
      />

      {/* Top border accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
        style={{ background: "linear-gradient(90deg, #b76e79, transparent)" }}
      />

      {/* Number */}
      <span
        className="absolute top-6 right-6 font-display text-5xl font-light opacity-5 group-hover:opacity-10 transition-opacity duration-500"
        style={{ color: "#b76e79" }}
      >
        {service.id}
      </span>

      {/* Icon */}
      <div className="mb-6">{service.icon}</div>

      {/* Title */}
      <h3 className="font-display text-2xl font-light text-white mb-3 group-hover:text-rose-gold-light transition-colors duration-300">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-white/40 text-sm leading-relaxed font-light mb-8">
        {service.description}
      </p>

      {/* Meta row */}
      <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: "rgba(183,110,121,0.15)" }}>
        <span className="text-xs text-white/30 tracking-widest uppercase">{service.duration}</span>
        <span className="text-sm font-light" style={{ color: "#b76e79" }}>
          {service.price}
        </span>
      </div>

      {/* CTA arrow */}
      <div className="absolute bottom-8 right-8 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="#b76e79" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="services" ref={sectionRef} className="relative py-40 px-6 bg-obsidian overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-40 opacity-20"
        style={{ background: "linear-gradient(to bottom, transparent, #b76e79)" }}
      />
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[160px] opacity-5"
        style={{ background: "#b76e79" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-24 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12" style={{ background: "#b76e79" }} />
            <span
              className="text-xs tracking-[0.35em] uppercase font-light"
              style={{ color: "#b76e79" }}
            >
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-white"
          >
            Curated{" "}
            <span className="italic" style={{ color: "#b76e79" }}>
              Services
            </span>
            <br />
            for the Discerning
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
