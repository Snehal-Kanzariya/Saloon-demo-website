"use client";
import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

// ── Real Unsplash images — explicit masonry grid placement ────────────────────
const GALLERY = [
  {
    id: 1,
    label: "Balayage Masterpiece",
    category: "Color",
    col: 1, row: 1, rowSpan: 2,
    // Salon chair, warm balayage color
    src: "/images/gallery/balayage-masterpiece.jpg",
    thumb: "/images/gallery/thumbs/balayage-masterpiece.jpg",
  },
  {
    id: 2,
    label: "Editorial Precision",
    category: "Cut",
    col: 2, row: 1, rowSpan: 1,
    // Hairstylist cutting hair
    src: "/images/gallery/editorial-precision.jpg",
    thumb: "/images/gallery/thumbs/editorial-precision.jpg",
  },
  {
    id: 3,
    label: "Bridal Updo",
    category: "Bridal",
    col: 3, row: 1, rowSpan: 2,
    // Bride with elegant updo
    src: "/images/gallery/bridal-updo.jpg",
    thumb: "/images/gallery/thumbs/bridal-updo.jpg",
  },
  {
    id: 4,
    label: "Gentleman's Shave",
    category: "Grooming",
    col: 2, row: 2, rowSpan: 1,
    // Barber at work
    src: "/images/gallery/gentlemans-shave.jpg",
    thumb: "/images/gallery/thumbs/gentlemans-shave.jpg",
  },
  {
    id: 5,
    label: "Ombré Waves",
    category: "Color",
    col: 1, row: 3, rowSpan: 2,
    // Woman with wavy ombre hair
    src: "/images/gallery/ombre-waves.jpg",
    thumb: "/images/gallery/thumbs/ombre-waves.jpg",
  },
  {
    id: 6,
    label: "Precision Bob",
    category: "Cut",
    col: 2, row: 3, rowSpan: 1,
    // Modern bob cut styling
    src: "/images/gallery/precision-bob.jpg",
    thumb: "/images/gallery/thumbs/precision-bob.jpg",
  },
  {
    id: 7,
    label: "Beard Sculpture",
    category: "Grooming",
    col: 3, row: 3, rowSpan: 1,
    // Barber grooming beard
    src: "/images/gallery/beard-sculpture.jpg",
    thumb: "/images/gallery/thumbs/beard-sculpture.jpg",
  },
  {
    id: 8,
    label: "Color Melt",
    category: "Color",
    col: 2, row: 4, rowSpan: 1,
    // Hair color treatment
    src: "/images/gallery/color-melt.jpg",
    thumb: "/images/gallery/thumbs/color-melt.jpg",
  },
  {
    id: 9,
    label: "Soft Highlights",
    category: "Color",
    col: 3, row: 4, rowSpan: 1,
    // Highlighting foils / salon treatment
    src: "/images/gallery/soft-highlights.jpg",
    thumb: "/images/gallery/thumbs/soft-highlights.jpg",
  },
];

const CATEGORIES = ["All", "Color", "Cut", "Bridal", "Grooming"] as const;
type Category = (typeof CATEGORIES)[number];

// ── Image tile with parallax + hover glare ────────────────────────────────────
function GalleryTile({
  item,
  index,
  onOpen,
  dimmed,
}: {
  item: (typeof GALLERY)[0];
  index: number;
  onOpen: (item: (typeof GALLERY)[0]) => void;
  dimmed: boolean;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const inView  = useInView(tileRef, { once: true, margin: "-40px" });
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [glare, setGlare]   = useState({ x: 50, y: 50 });

  const { scrollYProgress } = useScroll({
    target: tileRef,
    offset: ["start end", "end start"],
  });
  // Alternate odd/even for depth variety
  const imgY = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? "-8%" : "8%", index % 2 === 0 ? "8%" : "-8%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setGlare({
      x: ((e.clientX - r.left) / r.width)  * 100,
      y: ((e.clientY - r.top)  / r.height) * 100,
    });
  };

  return (
    <motion.div
      ref={tileRef}
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={inView ? { opacity: dimmed ? 0.25 : 1, scale: dimmed ? 0.97 : 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        gridColumn: item.col,
        gridRow: `${item.row} / span ${item.rowSpan}`,
        position: "relative",
        overflow: "hidden",
        cursor: "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => !dimmed && onOpen(item)}
    >
      {/* ── Skeleton ── */}
      {!loaded && (
        <div
          style={{
            position: "absolute", inset: 0, zIndex: 2,
            background: "linear-gradient(135deg, #1a1a1a 0%, #242424 50%, #1a1a1a 100%)",
          }}
        >
          {/* Blur-up thumb */}
          <img
            src={item.thumb}
            alt=""
            aria-hidden
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "blur(12px)", transform: "scale(1.1)", opacity: 0.5 }}
          />
        </div>
      )}

      {/* ── Parallax image ── */}
      <motion.div
        style={{ y: imgY, position: "absolute", inset: "-10% 0", willChange: "transform" }}
      >
        <img
          src={item.src}
          alt={item.label}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), filter 0.5s",
            filter: hovered ? "brightness(0.75) saturate(1.1)" : "brightness(0.88) saturate(0.9)",
          }}
        />
      </motion.div>

      {/* ── Permanent bottom vignette ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 55%)",
        }}
      />

      {/* ── Hover glare specular ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
          background: hovered
            ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(247,231,206,0.12) 0%, transparent 55%)`
            : "transparent",
          transition: "background 0.1s",
          mixBlendMode: "soft-light",
        }}
      />

      {/* ── Hover overlay ── */}
      <div
        style={{
          position: "absolute", inset: 0, zIndex: 5, pointerEvents: "none",
          background: "rgba(10,10,10,0.38)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
        }}
      />

      {/* ── Label ── */}
      <div
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.5rem",
          zIndex: 6,
          transform: hovered ? "translateY(0)" : "translateY(6px)",
          opacity: hovered ? 1 : 0.85,
          transition: "transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.4s",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase",
            fontWeight: 300, color: "#b76e79", marginBottom: "0.3rem",
          }}
        >
          {item.category}
        </span>
        <h3
          className="font-display"
          style={{ fontSize: "1.15rem", fontWeight: 300, color: "#fff", lineHeight: 1.2 }}
        >
          {item.label}
        </h3>
      </div>

      {/* ── Corner accents (visible on hover) ── */}
      {[
        { top: "1rem", right: "1rem", borderTop: "1px solid rgba(183,110,121,0.6)", borderRight: "1px solid rgba(183,110,121,0.6)" },
        { bottom: "1rem", left: "1rem", borderBottom: "1px solid rgba(183,110,121,0.6)", borderLeft: "1px solid rgba(183,110,121,0.6)" },
      ].map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute", width: "22px", height: "22px", zIndex: 7,
            pointerEvents: "none",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.4s",
            ...s,
          }}
        />
      ))}

      {/* ── Expand icon ── */}
      <div
        style={{
          position: "absolute", top: "1rem", right: "1rem", zIndex: 8,
          width: "32px", height: "32px", borderRadius: "50%",
          background: "rgba(183,110,121,0.85)",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.6)",
          transition: "opacity 0.35s, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          pointerEvents: "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2H6M2 2V6M2 2L6 6M12 2H8M12 2V6M12 2L8 6M2 12H6M2 12V8M2 12L6 8M12 12H8M12 12V8M12 12L8 8"
            stroke="#0a0a0a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </motion.div>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function Lightbox({
  item,
  onClose,
}: {
  item: (typeof GALLERY)[0] | null;
  onClose: () => void;
}) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 99900,
          background: "rgba(5,5,5,0.94)",
          backdropFilter: "blur(16px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2rem",
          cursor: "none",
        }}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.88, opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            maxWidth: "min(90vw, 900px)",
            maxHeight: "90vh",
            overflow: "hidden",
          }}
        >
          <img
            src={item.src}
            alt={item.label}
            style={{
              width: "100%",
              maxHeight: "80vh",
              objectFit: "contain",
              display: "block",
            }}
          />

          {/* Info bar */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "1.5rem 2rem",
              background: "linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            }}
          >
            <div>
              <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#b76e79", textTransform: "uppercase", marginBottom: "0.3rem" }}>
                {item.category}
              </p>
              <h3 className="font-display" style={{ fontSize: "1.5rem", fontWeight: 300, color: "#fff" }}>
                {item.label}
              </h3>
            </div>
            <a
              href="#booking"
              onClick={onClose}
              style={{
                fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase",
                fontWeight: 300, color: "#b76e79",
                border: "1px solid rgba(183,110,121,0.4)",
                padding: "0.6rem 1.2rem",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "#b76e79";
                (e.currentTarget as HTMLAnchorElement).style.color = "#0a0a0a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color = "#b76e79";
              }}
            >
              Book This Style
            </a>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(183,110,121,0.9)",
              border: "none", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2L12 12M12 2L2 12" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Frame corners */}
          {[
            { top: 0, left: 0,    borderTop: "2px solid rgba(183,110,121,0.5)", borderLeft: "2px solid rgba(183,110,121,0.5)" },
            { top: 0, right: 0,   borderTop: "2px solid rgba(183,110,121,0.5)", borderRight: "2px solid rgba(183,110,121,0.5)" },
            { bottom: 0, left: 0, borderBottom: "2px solid rgba(183,110,121,0.5)", borderLeft: "2px solid rgba(183,110,121,0.5)" },
            { bottom: 0, right: 0,borderBottom: "2px solid rgba(183,110,121,0.5)", borderRight: "2px solid rgba(183,110,121,0.5)" },
          ].map((s, i) => (
            <div key={i} style={{ position: "absolute", width: "28px", height: "28px", pointerEvents: "none", ...s }} />
          ))}
        </motion.div>

        {/* ESC hint */}
        <div
          style={{
            position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
            fontSize: "10px", letterSpacing: "0.35em", color: "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
          }}
        >
          Click outside or press ESC to close
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function GallerySection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const [activeFilter, setActiveFilter] = useState<Category>("All");
  const [lightbox, setLightbox] = useState<(typeof GALLERY)[0] | null>(null);

  // Close lightbox on ESC
  if (typeof window !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- handled at module scope
  }

  return (
    <section id="gallery" className="relative py-36 px-6 bg-obsidian overflow-hidden">
      {/* Background glow */}
      <div
        style={{
          position: "absolute", left: "50%", top: "20%", transform: "translate(-50%,-50%)",
          width: "800px", height: "600px", borderRadius: "50%",
          background: "#b76e79", filter: "blur(200px)", opacity: 0.04, pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-12" style={{ background: "#b76e79" }} />
            <span className="text-xs tracking-[0.35em] uppercase font-light" style={{ color: "#b76e79" }}>
              Portfolio
            </span>
            <div className="h-px w-12" style={{ background: "#b76e79" }} />
          </motion.div>

          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-light leading-tight text-white"
            style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
          >
            The Art of{" "}
            <em style={{ color: "#b76e79", fontStyle: "italic" }}>Transformation</em>
          </motion.h2>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                position: "relative",
                padding: "0.5rem 1.4rem",
                fontSize: "10px",
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                fontWeight: 300,
                border: "1px solid",
                borderColor: activeFilter === cat ? "#b76e79" : "rgba(255,255,255,0.1)",
                color: activeFilter === cat ? "#b76e79" : "rgba(255,255,255,0.3)",
                background: activeFilter === cat ? "rgba(183,110,121,0.08)" : "transparent",
                transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                cursor: "none",
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(183,110,121,0.4)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)";
                }
              }}
            >
              {cat}
              {activeFilter === cat && (
                <motion.span
                  layoutId="filter-pill"
                  style={{
                    position: "absolute", inset: 0,
                    background: "rgba(183,110,121,0.08)",
                    zIndex: -1,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ── Masonry grid (explicit placement) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(4, 240px)",
            gap: "10px",
          }}
        >
          {GALLERY.map((item, i) => (
            <GalleryTile
              key={item.id}
              item={item}
              index={i}
              onOpen={setLightbox}
              dimmed={activeFilter !== "All" && item.category !== activeFilter}
            />
          ))}
        </div>

        {/* ── View all CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 flex items-center justify-center gap-6"
        >
          <div className="h-px w-16" style={{ background: "rgba(183,110,121,0.2)" }} />
          <button
            className="inline-flex items-center gap-4 font-light tracking-widest uppercase"
            style={{ fontSize: "11px", color: "rgba(255,255,255,0.3)", cursor: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#b76e79")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.3)")}
          >
            View Full Portfolio
            <svg width="28" height="10" viewBox="0 0 28 10" fill="none">
              <path d="M0 5H26M26 5L22 1M26 5L22 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          </button>
          <div className="h-px w-16" style={{ background: "rgba(183,110,121,0.2)" }} />
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
