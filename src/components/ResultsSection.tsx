import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 10, suffix: "x", label: "Più Contenuti Prodotti" },
  { value: 80, suffix: "%", label: "Tempo Risparmiato" },
  { value: 500, suffix: "+", label: "Asset Generati al Mese" },
  { value: 98, suffix: "%", label: "Soddisfazione Clienti" },
];

const testimonials = [
  {
    quote: "ConsciusLabs ha rivoluzionato il nostro workflow di contenuti. Da un singolo webinar produciamo una settimana intera di contenuti social.",
    name: "Marco R.",
    role: "Marketing Director, TechCo",
  },
  {
    quote: "Risparmio incredibile di tempo e risorse. La qualità degli output è sorprendente e sempre coerente con il nostro brand.",
    name: "Laura B.",
    role: "Content Manager, StartupXYZ",
  },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-5xl sm:text-6xl font-bold font-display text-gradient">
      {display}{suffix}
    </span>
  );
}

export function ResultsSection() {
  return (
    <section id="risultati" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Risultati</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mt-3">
            Numeri che <span className="text-gradient">Parlano</span>
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="p-6 rounded-2xl bg-gradient-card border border-border"
            >
              <p className="text-foreground/90 mb-4 italic leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
