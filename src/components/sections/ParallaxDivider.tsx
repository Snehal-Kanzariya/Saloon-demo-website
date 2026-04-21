"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Props {
  quote?: string;
  sub?: string;
}

export default function ParallaxDivider({
  quote = "Crafted with Intention.",
  sub   = "Every detail considered. Every client celebrated.",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring-wrapped progress for silky parallax
  const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const bgY    = useTransform(spring, [0, 1], ["-12%", "12%"]);
  const textY  = useTransform(spring, [0, 1], ["10%",  "-10%"]);
  const opacity= useTransform(spring, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: "clamp(320px, 42vw, 600px)" }}
      aria-hidden
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-[-15%] will-change-transform"
      >
        {/* Dark textured gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 60%, rgba(183,110,121,0.18) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 75% 30%, rgba(201,169,110,0.10) 0%, transparent 50%), " +
              "linear-gradient(135deg, #0d0d0d 0%, #131313 40%, #0a0a0a 100%)",
          }}
        />

        {/* Grain texture SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.06]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <filter id="pdivnoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#pdivnoise)" />
        </svg>

        {/* Horizontal rule lines */}
        <div
          className="absolute left-0 right-0"
          style={{
            top: "30%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(183,110,121,0.15) 30%, rgba(183,110,121,0.15) 70%, transparent)",
          }}
        />
        <div
          className="absolute left-0 right-0"
          style={{
            top: "70%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.08) 30%, rgba(201,169,110,0.08) 70%, transparent)",
          }}
        />
      </motion.div>

      {/* Content — scrolls opposite direction for depth */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6 will-change-transform"
      >
        {/* Top animated line */}
        <div className="relative mb-10 flex items-center gap-6 w-full max-w-xl justify-center">
          <motion.div
            style={{ width: lineW, background: "linear-gradient(90deg, transparent, #b76e79)", height: "1px", maxWidth: "120px" }}
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <span
            className="font-light text-center"
            style={{ fontSize: "9px", letterSpacing: "0.5em", color: "rgba(183,110,121,0.6)", textTransform: "uppercase" }}
          >
            Lumière Philosophy
          </span>
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: "linear-gradient(90deg, #b76e79, transparent)", height: "1px", maxWidth: "120px" }}
          />
        </div>

        {/* Main quote */}
        <motion.h2
          initial={{ opacity: 0, y: 30, letterSpacing: "0.08em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-center font-light"
          style={{
            fontSize: "clamp(2rem, 5.5vw, 5rem)",
            color: "#f5f5f5",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {quote.split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                color: i === 0 || i === 2 ? "#b76e79" : "#f5f5f5",
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Sub text */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-light text-center"
          style={{
            fontSize: "clamp(0.7rem, 1.4vw, 0.875rem)",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}
        >
          {sub}
        </motion.p>

        {/* Decorative diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10"
          style={{
            width: "6px",
            height: "6px",
            background: "#b76e79",
            transform: "rotate(45deg)",
            boxShadow: "0 0 16px rgba(183,110,121,0.6)",
          }}
        />
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #111111)" }}
      />
    </section>
  );
}
