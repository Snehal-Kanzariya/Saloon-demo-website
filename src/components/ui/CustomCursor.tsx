"use client";
import { useEffect, useRef, useCallback } from "react";

// Uses RAF + lerp for butter-smooth 60fps tracking — zero React re-renders after mount
export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  // Raw mouse pos (updated every mousemove)
  const mouse  = useRef({ x: -200, y: -200 });
  // Lerped ring pos
  const ring   = useRef({ x: -200, y: -200 });
  const rafId  = useRef(0);
  const state  = useRef<"default" | "hover" | "canvas" | "text">("default");

  const applyState = useCallback((el: HTMLElement | null) => {
    if (!el || !ringRef.current || !dotRef.current || !labelRef.current) return;

    const tag  = el.tagName.toLowerCase();
    const role = el.getAttribute("role");
    const isCanvas  = tag === "canvas";
    const isLink    = tag === "a" || tag === "button" || role === "button";
    const isText    = ["p", "span", "h1", "h2", "h3", "h4", "li"].includes(tag);

    if (isCanvas) {
      state.current = "canvas";
      ringRef.current.style.width  = "56px";
      ringRef.current.style.height = "56px";
      ringRef.current.style.borderStyle = "solid";
      ringRef.current.style.opacity = "0.5";
      ringRef.current.style.mixBlendMode = "normal";
      dotRef.current.style.opacity = "0";
    } else if (isLink) {
      state.current = "hover";
      ringRef.current.style.width  = "64px";
      ringRef.current.style.height = "64px";
      ringRef.current.style.opacity = "1";
      ringRef.current.style.mixBlendMode = "difference";
      dotRef.current.style.opacity = "1";
      dotRef.current.style.transform = "scale(2)";
      const label = el.getAttribute("data-cursor") || "";
      labelRef.current.textContent = label;
      labelRef.current.style.opacity = label ? "1" : "0";
    } else if (isText) {
      state.current = "text";
      ringRef.current.style.width  = "2px";
      ringRef.current.style.height = "24px";
      ringRef.current.style.borderRadius = "1px";
      ringRef.current.style.opacity = "0.6";
      ringRef.current.style.mixBlendMode = "normal";
      dotRef.current.style.opacity = "0";
    } else {
      state.current = "default";
      ringRef.current.style.width  = "36px";
      ringRef.current.style.height = "36px";
      ringRef.current.style.borderRadius = "50%";
      ringRef.current.style.borderStyle = "solid";
      ringRef.current.style.opacity = "0.8";
      ringRef.current.style.mixBlendMode = "normal";
      dotRef.current.style.opacity = "1";
      dotRef.current.style.transform = "scale(1)";
      labelRef.current.style.opacity = "0";
    }
  }, []);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Apply dot instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top  = `${e.clientY}px`;
      }

      applyState(e.target as HTMLElement);
    };

    const onEnter = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = "1";
      if (ringRef.current) ringRef.current.style.opacity = "0.8";
    };
    const onLeave = () => {
      if (dotRef.current)  dotRef.current.style.opacity  = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    // RAF loop — lerps ring toward mouse
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [applyState]);

  return (
    <>
      {/* Dot — snaps to cursor */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99998,
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          background: "#b76e79",
          transform: "translate(-50%, -50%) scale(1)",
          transition: "opacity 0.2s, transform 0.2s",
          willChange: "left, top, transform",
          mixBlendMode: "normal",
        }}
      />

      {/* Ring — lerps behind cursor */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 99997,
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "1px solid rgba(183,110,121,0.7)",
          transform: "translate(-50%, -50%)",
          transition: "width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border-radius 0.35s, opacity 0.25s, mix-blend-mode 0.2s",
          willChange: "left, top, width, height",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontSize: "9px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#b76e79",
            opacity: 0,
            transition: "opacity 0.3s",
            whiteSpace: "nowrap",
            fontWeight: 300,
          }}
        />
      </div>
    </>
  );
}
