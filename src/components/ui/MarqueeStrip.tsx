"use client";
import { motion } from "framer-motion";

const items = [
  "Precision Haircuts",
  "★",
  "Award-Winning Color",
  "★",
  "Bridal Styling",
  "★",
  "Hot Towel Shave",
  "★",
  "Swiss Facials",
  "★",
  "Editorial Styling",
  "★",
  "12+ Years Excellence",
  "★",
];

export default function MarqueeStrip() {
  const duplicated = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{
        background: "rgba(183,110,121,0.05)",
        borderColor: "rgba(183,110,121,0.15)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {duplicated.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center text-xs tracking-[0.25em] uppercase font-light px-6"
            style={{ color: item === "★" ? "#b76e79" : "rgba(255,255,255,0.3)" }}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
