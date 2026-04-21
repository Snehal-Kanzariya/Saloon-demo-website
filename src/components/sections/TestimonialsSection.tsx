"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    quote:
      "Isabelle transformed my hair from something I tolerated to my most complimented feature. The color lives in my memory like a piece of art.",
    author: "Amélie Dubois",
    role: "Fashion Editor, Paris",
    rating: 5,
  },
  {
    id: 2,
    quote:
      "Walking out of Lumière felt like stepping into a different version of myself. Marcus understood exactly what I couldn't articulate.",
    author: "Jonathan Hayes",
    role: "Creative Director, NYC",
    rating: 5,
  },
  {
    id: 3,
    quote:
      "My bridal look was nothing short of breathtaking. Sofia's artistry made me feel like a modern goddess on the most important day of my life.",
    author: "Elena Marchetti",
    role: "Bride, Milano",
    rating: 5,
  },
  {
    id: 4,
    quote:
      "James's grooming technique is the finest I've experienced anywhere in the world. A ritual I now refuse to give up.",
    author: "Sebastian Kroft",
    role: "Hotel Magnate, London",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="#b76e79">
          <polygon points="6,1 7.8,4.4 11.7,4.9 9,7.5 9.7,11.4 6,9.5 2.3,11.4 3,7.5 0.3,4.9 4.2,4.4" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section id="testimonials" className="relative py-40 px-6 bg-charcoal overflow-hidden">
      {/* Decorative quote mark */}
      <div
        className="absolute top-20 left-10 font-display text-[20rem] font-light leading-none select-none pointer-events-none opacity-[0.03]"
        style={{ color: "#b76e79" }}
      >
        "
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="h-px w-12" style={{ background: "#b76e79" }} />
            <span className="text-xs tracking-[0.35em] uppercase font-light" style={{ color: "#b76e79" }}>
              Client Stories
            </span>
            <div className="h-px w-12" style={{ background: "#b76e79" }} />
          </motion.div>

          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white"
          >
            Voices of{" "}
            <span className="italic" style={{ color: "#b76e79" }}>
              Experience
            </span>
          </motion.h2>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-center mb-16"
            >
              <StarRating count={testimonials[active].rating} />
              <blockquote className="font-display text-[clamp(1.4rem,3vw,2.2rem)] font-light italic leading-relaxed text-white mt-8 mb-10">
                "{testimonials[active].quote}"
              </blockquote>
              <div>
                <p className="text-white font-light tracking-wide text-sm">{testimonials[active].author}</p>
                <p className="text-xs mt-1 font-light tracking-widest" style={{ color: "#b76e79" }}>
                  {testimonials[active].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={prev}
              className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 text-xs tracking-widest uppercase font-light"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                <path d="M19 12H5M5 12L10 7M5 12L10 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
              Prev
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="relative w-8 h-px transition-all duration-300"
                  style={{ background: i === active ? "#b76e79" : "rgba(255,255,255,0.15)" }}
                  aria-label={`Testimonial ${i + 1}`}
                >
                  {i === active && (
                    <motion.span
                      layoutId="dot"
                      className="absolute inset-0"
                      style={{ background: "#b76e79" }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 text-xs tracking-widest uppercase font-light"
            >
              Next
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M5 12H19M19 12L14 7M19 12L14 17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mini cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-24">
          {testimonials.map((t, i) => (
            <motion.button
              key={t.id}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass p-6 text-left relative overflow-hidden group cursor-pointer"
              style={{
                borderColor: i === active ? "rgba(183,110,121,0.4)" : "rgba(183,110,121,0.1)",
              }}
            >
              {i === active && (
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "#b76e79" }} />
              )}
              <StarRating count={t.rating} />
              <p className="text-white/35 text-xs font-light leading-relaxed mt-3 line-clamp-2">
                "{t.quote}"
              </p>
              <p className="text-white text-xs mt-4 font-light">{t.author}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
