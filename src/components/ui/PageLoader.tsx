"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BRAND = "LUMIÈRE".split("");

export default function PageLoader() {
  const [phase, setPhase] = useState<"count" | "brand" | "exit" | "done">("count");
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 1800; // ms for counter

  useEffect(() => {
    // Block scroll during load
    document.documentElement.style.overflow = "hidden";

    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease-out expo for the counter
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setPhase("brand");
        setTimeout(() => {
          setPhase("exit");
          setTimeout(() => {
            setPhase("done");
            document.documentElement.style.overflow = "";
          }, 900);
        }, 900);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#0a0a0a" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Top-left logo mark */}
          <div className="absolute top-8 left-8 flex items-center gap-3">
            <div
              className="w-6 h-6 border flex items-center justify-center"
              style={{ borderColor: "rgba(183,110,121,0.4)" }}
            >
              <div
                className="w-2.5 h-2.5"
                style={{ background: "#b76e79", clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }}
              />
            </div>
          </div>

          {/* Counter */}
          <AnimatePresence mode="wait">
            {phase === "count" && (
              <motion.div
                key="counter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative flex items-baseline gap-1"
              >
                <span
                  className="font-display text-[clamp(5rem,20vw,14rem)] font-light leading-none tabular-nums"
                  style={{ color: "#b76e79" }}
                >
                  {String(count).padStart(2, "0")}
                </span>
                <span className="text-white/20 font-light text-2xl self-end mb-4">%</span>
              </motion.div>
            )}

            {/* Brand name reveal */}
            {phase === "brand" && (
              <motion.div
                key="brand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-[0.06em]"
              >
                {BRAND.map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, rotateX: -60 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-display text-[clamp(2.5rem,10vw,6rem)] font-light tracking-[0.25em] text-white inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            )}

            {phase === "exit" && (
              <motion.div
                key="brand-exit"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, letterSpacing: "0.6em" }}
                transition={{ duration: 0.6, ease: "easeIn" }}
                className="font-display text-[clamp(2.5rem,10vw,6rem)] font-light tracking-[0.25em] text-white"
              >
                LUMIÈRE
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading bar */}
          <div
            className="absolute bottom-10 left-8 right-8 h-px"
            style={{ background: "rgba(255,255,255,0.06)" }}
          >
            <motion.div
              className="h-full origin-left"
              style={{ background: "#b76e79" }}
              animate={{ scaleX: count / 100 }}
              transition={{ duration: 0.05, ease: "linear" }}
            />
          </div>

          {/* Corner decorations */}
          {[
            "top-8 right-8",
            "bottom-8 left-8",
          ].map((pos) => (
            <div key={pos} className={`absolute ${pos} w-10 h-10`}>
              <div
                className="absolute top-0 right-0 w-4 h-px"
                style={{ background: "rgba(183,110,121,0.3)" }}
              />
              <div
                className="absolute top-0 right-0 w-px h-4"
                style={{ background: "rgba(183,110,121,0.3)" }}
              />
            </div>
          ))}

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "count" ? 1 : 0 }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.5em] uppercase font-light"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Loading Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
