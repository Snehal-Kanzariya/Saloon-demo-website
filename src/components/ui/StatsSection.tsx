"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "12+", label: "Years of Excellence" },
  { value: "8K+", label: "Happy Clients" },
  { value: "4", label: "Master Stylists" },
  { value: "300+", label: "Bridal Looks" },
];

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-24 px-6 bg-charcoal border-y"
      style={{ borderColor: "rgba(183,110,121,0.1)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(183,110,121,0.1)" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              className="bg-charcoal text-center py-16 px-8"
            >
              <div
                className="font-display text-[clamp(3rem,6vw,5rem)] font-light leading-none mb-3"
                style={{ color: "#b76e79" }}
              >
                {stat.value}
              </div>
              <div className="text-white/35 text-xs tracking-[0.25em] uppercase font-light">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
