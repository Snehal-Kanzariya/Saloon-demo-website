"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Stylists", href: "#stylists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(183,110,121,0.1)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className="w-8 h-8 border flex items-center justify-center transition-all duration-300 group-hover:border-rose-gold"
            style={{ borderColor: "rgba(183,110,121,0.4)" }}
          >
            <div
              className="w-3 h-3"
              style={{
                background: "#b76e79",
                clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
              }}
            />
          </div>
          <span className="font-display text-xl font-light text-white tracking-wider">
            Lumière
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/40 hover:text-white transition-colors duration-300 text-xs tracking-[0.25em] uppercase font-light relative group"
            >
              {link.label}
              <span
                className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px transition-all duration-300"
                style={{ background: "#b76e79" }}
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+33123456789"
            className="text-white/30 hover:text-white/60 transition-colors text-xs tracking-widest font-light"
          >
            +33 1 23 45 67 89
          </a>
          <a
            href="#booking"
            className="group relative px-6 py-3 overflow-hidden border transition-all duration-500"
            style={{ borderColor: "rgba(183,110,121,0.5)" }}
          >
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400"
              style={{ background: "#b76e79" }}
            />
            <span className="relative z-10 text-xs tracking-widest uppercase font-light text-white group-hover:text-obsidian transition-colors duration-300">
              Book Now
            </span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "#b76e79",
              transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "none",
            }}
          />
          <span
            className="block w-4 h-px transition-all duration-300"
            style={{
              background: "rgba(255,255,255,0.4)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="block w-6 h-px transition-all duration-300"
            style={{
              background: "#b76e79",
              transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        className="lg:hidden overflow-hidden"
        style={{ background: "rgba(10,10,10,0.97)", backdropFilter: "blur(20px)" }}
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/40 text-sm tracking-widest uppercase font-light border-b py-4"
              style={{ borderColor: "rgba(255,255,255,0.05)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="text-center py-4 border text-xs tracking-widest uppercase font-light text-white mt-2"
            style={{ borderColor: "#b76e79" }}
          >
            Book Appointment
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
