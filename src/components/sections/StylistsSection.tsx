"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

// ── Stylist data with Unsplash portrait images ────────────────────────────────
const stylists = [
  {
    name: "Isabelle Laurent",
    role: "Creative Director & Master Colorist",
    speciality: "Balayage · Editorial Color",
    years: "12 yrs",
    bio: "Trained at L'Oréal Paris Académie and featured in Vogue Italia. Signature: luminous lived-in color.",
    image: "/images/stylists/isabelle-laurent.jpg",
    accent: "#b76e79",
    socials: { ig: "#", pinterest: "#" },
  },
  {
    name: "Marcus Chen",
    role: "Senior Hair Sculptor",
    speciality: "Precision Cuts · Avant-garde",
    years: "9 yrs",
    bio: "Formerly of the Sassoon Academy London. Guest educator at NAHA. Obsessed with geometric silhouettes.",
    image: "/images/stylists/marcus-chen.jpg",
    accent: "#c9a96e",
    socials: { ig: "#", pinterest: "#" },
  },
  {
    name: "Sofia Reyes",
    role: "Bridal & Occasion Specialist",
    speciality: "Bridal Styling · Updos",
    years: "8 yrs",
    bio: "Styled 300+ brides across five countries. Published in Brides Magazine. Every look tells a love story.",
    image: "/images/stylists/sofia-reyes.jpg",
    accent: "#d4a0a8",
    socials: { ig: "#", pinterest: "#" },
  },
  {
    name: "James Okafor",
    role: "Master Barber & Grooming Expert",
    speciality: "Beard Artistry · Hot Shave",
    years: "11 yrs",
    bio: "GQ-endorsed barber. Master of the traditional straight-razor shave. Where old-world craft meets modern style.",
    image: "/images/stylists/james-okafor.jpg",
    accent: "#b76e79",
    socials: { ig: "#", pinterest: "#" },
  },
];

// ── 3D magnetic tilt hook — pure RAF, zero re-renders ────────────────────────
function useCardTilt(maxTilt = 13) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glareRef   = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef   = useRef<HTMLDivElement>(null);

  const target  = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, scale: 1 });
  const current = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, scale: 1 });
  const rafId   = useRef(0);
  const active  = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width)  * 2 - 1; // −1…+1
      const ny = ((e.clientY - rect.top)  / rect.height) * 2 - 1;

      target.current.ry    = nx * maxTilt;
      target.current.rx    = -ny * maxTilt;
      target.current.gx    = 50 + nx * 40;
      target.current.gy    = 50 + ny * 40;
      target.current.scale = 1.025;
    };

    const onEnter = () => { active.current = true; };
    const onLeave = () => {
      active.current = false;
      target.current = { rx: 0, ry: 0, gx: 50, gy: 50, scale: 1 };
    };

    const tick = () => {
      const ease = active.current ? 0.1 : 0.055;
      const c = current.current;
      const t = target.current;

      c.rx    = lerp(c.rx,    t.rx,    ease);
      c.ry    = lerp(c.ry,    t.ry,    ease);
      c.gx    = lerp(c.gx,    t.gx,    ease);
      c.gy    = lerp(c.gy,    t.gy,    ease);
      c.scale = lerp(c.scale, t.scale, 0.07);

      // Apply tilt to wrapper
      el.style.transform = `perspective(900px) rotateX(${c.rx}deg) rotateY(${c.ry}deg) scale(${c.scale})`;

      // Glare — simulates specular highlight from a point light source
      if (glareRef.current) {
        const dist    = Math.sqrt((c.gx - 50) ** 2 + (c.gy - 50) ** 2) / 50;
        const opacity = active.current ? dist * 0.22 : 0;
        glareRef.current.style.background =
          `radial-gradient(circle at ${c.gx}% ${c.gy}%, rgba(255,240,230,${opacity * 1.6}) 0%, rgba(212,160,168,${opacity * 0.6}) 40%, transparent 65%)`;
        glareRef.current.style.opacity = active.current ? "1" : "0";
      }

      // Content floats forward on hover (depth parallax)
      if (contentRef.current) {
        const lift = active.current
          ? `translateZ(38px) translateY(${-c.rx * 0.4}px)`
          : "translateZ(38px)";
        contentRef.current.style.transform = lift;
      }

      // Badge lifts even more
      if (badgeRef.current) {
        badgeRef.current.style.transform = active.current
          ? `translateZ(56px) scale(1.04)`
          : "translateZ(56px)";
      }

      rafId.current = requestAnimationFrame(tick);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId.current);
    };
  }, [maxTilt]);

  return { wrapperRef, glareRef, contentRef, badgeRef };
}

// ── Social icon SVGs ──────────────────────────────────────────────────────────
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4"         stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.5" cy="6.5" r="1"      fill="currentColor" />
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
    <path
      d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.03-2.83.19-.77 1.25-5.31 1.25-5.31s-.32-.64-.32-1.58c0-1.48.86-2.59 1.93-2.59.91 0 1.35.68 1.35 1.5 0 .91-.58 2.28-.88 3.55-.25 1.06.53 1.92 1.57 1.92 1.88 0 3.14-2.4 3.14-5.24 0-2.16-1.46-3.77-4.09-3.77-2.98 0-4.83 2.23-4.83 4.72 0 .86.25 1.46.64 1.93"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
    />
  </svg>
);

// ── Individual card ───────────────────────────────────────────────────────────
function StylistCard({
  stylist,
  index,
}: {
  stylist: (typeof stylists)[0];
  index: number;
}) {
  const { wrapperRef, glareRef, contentRef, badgeRef } = useCardTilt(13);
  const outerRef = useRef<HTMLDivElement>(null);
  const inView   = useInView(outerRef, { once: true, margin: "-60px" });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered]     = useState(false);

  return (
    <motion.div
      ref={outerRef}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      /* perspective owner — do NOT put overflow:hidden here */
      style={{ perspective: "900px", perspectiveOrigin: "50% 50%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tilt target — preserve-3d allows children to use translateZ */}
      <div
        ref={wrapperRef}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          cursor: "none",
          position: "relative",
          aspectRatio: "3 / 4",
        }}
      >
        {/* ── Layer 0 · Photo ──────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(0px)",
            overflow: "hidden",
          }}
        >
          {/* Skeleton shimmer */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)" }}
            />
          )}
          <img
            src={stylist.image}
            alt={stylist.name}
            loading="lazy"
            decoding="async"
            onLoad={() => setImgLoaded(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
              transition: "transform 0.7s cubic-bezier(0.22,1,0.36,1), opacity 0.5s",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              opacity: imgLoaded ? 1 : 0,
              filter: "saturate(0.85) brightness(0.88)",
            }}
          />
        </div>

        {/* ── Layer 1 · Gradient vignette ──────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(8px)",
            background:
              "linear-gradient(to top, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.55) 45%, rgba(10,10,10,0.1) 75%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Layer 2 · Side vignettes ─────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(9px)",
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(10,10,10,0.5) 100%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Layer 3 · Rose accent overlay on hover ───────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(10px)",
            background: `radial-gradient(ellipse at 30% 20%, ${stylist.accent}18 0%, transparent 60%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.6s",
            pointerEvents: "none",
          }}
        />

        {/* ── Layer 4 · Glare (specular) ───────────────────── */}
        <div
          ref={glareRef}
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(18px)",
            pointerEvents: "none",
            transition: "opacity 0.4s",
            mixBlendMode: "soft-light",
          }}
        />

        {/* ── Layer 5 · Top badge ──────────────────────────── */}
        <div
          ref={badgeRef}
          style={{
            position: "absolute",
            top: "1.5rem",
            right: "1.5rem",
            transform: "translateZ(56px)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "9px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 300,
              color: stylist.accent,
              background: "rgba(10,10,10,0.7)",
              backdropFilter: "blur(8px)",
              border: `1px solid ${stylist.accent}40`,
              padding: "0.35rem 0.75rem",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s, transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {stylist.years} exp
          </span>
        </div>

        {/* ── Layer 6 · Info panel ─────────────────────────── */}
        <div
          ref={contentRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "2rem",
            transform: "translateZ(38px)",
            transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Speciality tag */}
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontWeight: 300,
              color: stylist.accent,
              marginBottom: "0.5rem",
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {stylist.speciality}
          </p>

          {/* Name */}
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.25rem,1.8vw,1.6rem)",
              fontWeight: 300,
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "0.25rem",
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {stylist.name}
          </h3>

          {/* Role */}
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.38)",
              fontWeight: 300,
              transform: hovered ? "translateY(-4px)" : "translateY(0)",
              transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {stylist.role}
          </p>

          {/* Revealed content */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: hovered ? "120px" : "0px",
              opacity: hovered ? 1 : 0,
              transition: "max-height 0.5s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.28)",
                fontWeight: 300,
                lineHeight: 1.7,
                marginTop: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              {stylist.bio}
            </p>

            {/* Social row */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span
                style={{
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.2)",
                  fontWeight: 300,
                }}
              >
                Follow
              </span>
              {[
                { key: "ig",        label: "Instagram", Icon: IgIcon },
                { key: "pinterest", label: "Pinterest", Icon: PinIcon },
              ].map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={stylist.socials[key as keyof typeof stylist.socials]}
                  aria-label={label}
                  style={{ color: "rgba(255,255,255,0.25)", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = stylist.accent)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >
                  <Icon />
                </a>
              ))}

              {/* Book CTA */}
              <a
                href="#booking"
                style={{
                  marginLeft: "auto",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  fontWeight: 300,
                  color: stylist.accent,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "gap 0.3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = "10px")}
                onMouseLeave={(e) => (e.currentTarget.style.gap = "6px")}
              >
                Book
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── Layer 7 · Border frame ───────────────────────── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "translateZ(65px)",
            border: `1px solid ${stylist.accent}`,
            opacity: hovered ? 0.35 : 0,
            transition: "opacity 0.5s",
            pointerEvents: "none",
          }}
        />

        {/* Corner accents (always faintly visible) */}
        {[
          { t: "0.75rem", l: "0.75rem", borderT: true, borderL: true },
          { t: "0.75rem", r: "0.75rem", borderT: true, borderR: true },
          { b: "0.75rem", l: "0.75rem", borderB: true, borderL: true },
          { b: "0.75rem", r: "0.75rem", borderB: true, borderR: true },
        ].map((c, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: c.t,
              left: c.l,
              right: c.r,
              bottom: c.b,
              width: "20px",
              height: "20px",
              transform: "translateZ(66px)",
              pointerEvents: "none",
              borderTop:    c.borderT ? `1px solid ${stylist.accent}60` : undefined,
              borderLeft:   c.borderL ? `1px solid ${stylist.accent}60` : undefined,
              borderRight:  c.borderR ? `1px solid ${stylist.accent}60` : undefined,
              borderBottom: c.borderB ? `1px solid ${stylist.accent}60` : undefined,
              opacity: hovered ? 1 : 0.4,
              transition: "opacity 0.4s",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function StylistsSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView   = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section id="stylists" className="relative py-36 px-6 overflow-hidden" style={{ background: "#111111" }}>
      {/* Ambient background orb */}
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "#b76e79",
          filter: "blur(180px)",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "-5%",
          bottom: "10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "#c9a96e",
          filter: "blur(140px)",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12" style={{ background: "#b76e79" }} />
              <span
                className="text-xs tracking-[0.35em] uppercase font-light"
                style={{ color: "#b76e79" }}
              >
                Meet the Artists
              </span>
            </motion.div>

            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-light leading-tight text-white"
              style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
            >
              Our{" "}
              <em style={{ color: "#b76e79", fontStyle: "italic" }}>Master</em>
              <br />
              Stylists
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-light text-sm leading-relaxed max-w-sm"
            style={{ color: "rgba(255,255,255,0.32)" }}
          >
            Each artist brings decades of international experience — blending technical
            mastery with an intuitive understanding of individual beauty. Move your
            cursor over each card to feel the depth.
          </motion.p>
        </div>

        {/* ── Card grid ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          /* No overflow:hidden here — perspective needs to bleed outside */
        >
          {stylists.map((s, i) => (
            <StylistCard key={s.name} stylist={s} index={i} />
          ))}
        </div>

        {/* ── Hint ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-center mt-12 font-light"
          style={{ fontSize: "10px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}
        >
          Hover over a card — feel the 3D depth
        </motion.p>
      </div>
    </section>
  );
}
