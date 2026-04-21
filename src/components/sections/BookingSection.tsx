"use client";
import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  "Haircut & Style",
  "Hair Coloring",
  "Hair Styling",
  "Facial Treatment",
  "Beard Grooming",
  "Bridal Package",
];

const times = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30",
];

function InputField({
  label,
  type = "text",
  name,
  placeholder,
  required,
  delay,
  inView,
}: {
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  delay: number;
  inView: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <label
        className="block text-xs tracking-[0.25em] uppercase font-light mb-3 transition-colors duration-300"
        style={{ color: focused ? "#b76e79" : "rgba(255,255,255,0.35)" }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            setFocused(false);
            setHasValue(e.target.value !== "");
          }}
          onChange={(e) => setHasValue(e.target.value !== "")}
          className="w-full bg-transparent border-b py-4 text-sm font-light text-white placeholder-white/20 outline-none transition-all duration-300"
          style={{
            borderColor: focused ? "#b76e79" : "rgba(255,255,255,0.1)",
          }}
        />
        {/* Animated bottom line */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-500 origin-left"
          style={{
            background: "#b76e79",
            width: focused ? "100%" : "0%",
            boxShadow: focused ? "0 0 8px rgba(183,110,121,0.5)" : "none",
          }}
        />
      </div>
    </motion.div>
  );
}

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const formInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const [selectedService, setSelectedService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="relative py-40 px-6 bg-obsidian overflow-hidden"
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(183,110,121,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Vertical line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 w-px opacity-5"
        style={{ background: "#b76e79" }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Info */}
          <div className="sticky top-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={titleInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-px w-12" style={{ background: "#b76e79" }} />
              <span className="text-xs tracking-[0.35em] uppercase font-light" style={{ color: "#b76e79" }}>
                Reserve Your Time
              </span>
            </motion.div>

            <motion.h2
              ref={titleRef}
              initial={{ opacity: 0, y: 40 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-tight text-white mb-8"
            >
              Begin Your{" "}
              <span className="italic" style={{ color: "#b76e79" }}>
                Journey
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white/35 font-light leading-relaxed text-sm max-w-sm mb-12"
            >
              Reserve your appointment with one of our master stylists. We'll confirm
              your booking within 2 hours and send you a personalized preparation guide.
            </motion.p>

            {/* Info blocks */}
            <div className="space-y-8">
              {[
                { label: "Hours", value: "Mon – Sat  9am – 8pm\nSunday  10am – 6pm" },
                { label: "Location", value: "12 Rue de la Lumière\nParis, 75008" },
                { label: "Contact", value: "+33 1 23 45 67 89\nbonjour@lumiere-salon.com" },
              ].map(({ label, value }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="flex gap-8"
                >
                  <span className="text-xs tracking-widest uppercase font-light w-20 shrink-0 mt-0.5" style={{ color: "#b76e79" }}>
                    {label}
                  </span>
                  <span className="text-white/40 text-sm font-light whitespace-pre-line">{value}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-8"
                  style={{ borderColor: "#b76e79" }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L19 7" stroke="#b76e79" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-light text-white mb-4">
                  Appointment Requested
                </h3>
                <p className="text-white/40 text-sm font-light leading-relaxed">
                  Thank you. We'll confirm your appointment within 2 hours. A personalized
                  preparation guide will be sent to your contact details.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-xs tracking-widest uppercase font-light"
                  style={{ color: "#b76e79" }}
                >
                  Book Another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <InputField
                  label="Full Name"
                  name="name"
                  placeholder="Your full name"
                  required
                  delay={0.1}
                  inView={formInView}
                />
                <InputField
                  label="Phone Number"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  required
                  delay={0.2}
                  inView={formInView}
                />

                {/* Service select */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label className="block text-xs tracking-[0.25em] uppercase font-light mb-3 text-white/35">
                    Service
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {services.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedService(s)}
                        className="py-3 px-4 text-xs font-light tracking-wide text-left transition-all duration-300 border"
                        style={{
                          borderColor:
                            selectedService === s
                              ? "#b76e79"
                              : "rgba(255,255,255,0.08)",
                          color: selectedService === s ? "#b76e79" : "rgba(255,255,255,0.4)",
                          background:
                            selectedService === s
                              ? "rgba(183,110,121,0.08)"
                              : "transparent",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Date */}
                <InputField
                  label="Preferred Date"
                  type="date"
                  name="date"
                  placeholder=""
                  required
                  delay={0.4}
                  inView={formInView}
                />

                {/* Time slots */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <label className="block text-xs tracking-[0.25em] uppercase font-light mb-3 text-white/35">
                    Preferred Time
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {times.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTime(t)}
                        className="py-2.5 text-xs font-light transition-all duration-300 border"
                        style={{
                          borderColor:
                            selectedTime === t
                              ? "#b76e79"
                              : "rgba(255,255,255,0.08)",
                          color:
                            selectedTime === t ? "#b76e79" : "rgba(255,255,255,0.35)",
                          background:
                            selectedTime === t
                              ? "rgba(183,110,121,0.08)"
                              : "transparent",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="pt-4"
                >
                  <button
                    type="submit"
                    className="group relative w-full py-5 overflow-hidden border transition-all duration-500"
                    style={{ borderColor: "#b76e79" }}
                  >
                    <span
                      className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                      style={{ background: "#b76e79" }}
                    />
                    <span className="relative z-10 text-sm font-light tracking-[0.3em] uppercase text-white group-hover:text-obsidian transition-colors duration-300">
                      Confirm Appointment
                    </span>
                  </button>
                  <p className="text-center text-white/20 text-xs mt-4 font-light">
                    No payment required to reserve your slot
                  </p>
                </motion.div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
