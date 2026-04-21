"use client";
import { useEffect, useRef } from "react";

// Pure DOM — zero re-renders, maximum performance
export default function ScrollProgress() {
  const barRef  = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const rafRef  = useRef(0);
  const prevPct = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docH > 0 ? Math.min(scrollTop / docH, 1) : 0;

      // Only paint if value changed meaningfully
      if (Math.abs(pct - prevPct.current) > 0.0005) {
        prevPct.current = pct;
        if (barRef.current)  barRef.current.style.transform  = `scaleX(${pct})`;
        if (dotRef.current)  dotRef.current.style.left        = `${pct * 100}%`;
      }
      rafRef.current = requestAnimationFrame(update);
    };

    rafRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      aria-hidden
      className="fixed top-0 left-0 right-0 z-[9990]"
      style={{ height: "2px", background: "rgba(183,110,121,0.08)" }}
    >
      {/* Fill bar */}
      <div
        ref={barRef}
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, #8b4d57, #b76e79, #d4a0a8)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
          willChange: "transform",
          boxShadow: "0 0 8px rgba(183,110,121,0.6)",
        }}
      />
      {/* Leading dot */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "0%",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#d4a0a8",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 10px rgba(212,160,168,0.9)",
          willChange: "left",
          transition: "opacity 0.3s",
        }}
      />
    </div>
  );
}
