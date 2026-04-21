"use client";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-24 px-6 bg-charcoal border-t" style={{ borderColor: "rgba(183,110,121,0.1)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-8 h-8 border flex items-center justify-center"
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
              <span className="font-display text-xl font-light text-white">Lumière</span>
            </div>
            <p className="text-white/30 text-xs font-light leading-relaxed max-w-xs">
              An award-winning luxury salon where artistry meets precision. Redefining
              beauty since 2012.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: "#b76e79" }}>
              Services
            </h4>
            <ul className="space-y-3">
              {["Haircut & Style", "Hair Coloring", "Balayage", "Bridal", "Facial", "Grooming"].map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Salon */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: "#b76e79" }}>
              Salon
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Meet the Team", "Portfolio", "Gift Cards", "Press", "Careers"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-xs text-white/30 hover:text-white/60 transition-colors font-light tracking-wide"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase font-light mb-6" style={{ color: "#b76e79" }}>
              Contact
            </h4>
            <ul className="space-y-4 text-white/30 text-xs font-light">
              <li>12 Rue de la Lumière<br />Paris, 75008, France</li>
              <li>
                <a href="tel:+33123456789" className="hover:text-white/60 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li>
                <a href="mailto:bonjour@lumiere-salon.com" className="hover:text-white/60 transition-colors">
                  bonjour@lumiere-salon.com
                </a>
              </li>
            </ul>

            {/* Social */}
            <div className="flex gap-4 mt-8">
              {[
                {
                  label: "Instagram",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                    </svg>
                  ),
                },
                {
                  label: "Pinterest",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 16c.5-1.5.7-2 1.5-4.5-.4-.7-.4-1.5-.4-2 0-1.2.7-2 1.7-2s1.5.8 1.5 1.8c0 1.3-.8 3.2-.8 4.8 0 1 .7 1.7 1.7 1.7 2 0 3.5-2.5 3.5-5.5 0-2.3-1.5-3.8-3.8-3.8-2.6 0-4.2 1.9-4.2 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ),
                },
              ].map(({ label, icon }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="text-white/25 hover:text-rose-gold transition-colors duration-300"
                  style={{ transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#b76e79")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t gap-4"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          <p className="text-white/20 text-xs font-light tracking-wide">
            © {year} Lumière Salon. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms", "Cookie Policy"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-white/20 hover:text-white/40 transition-colors text-xs font-light"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
