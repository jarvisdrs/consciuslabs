import { motion } from "framer-motion";
import { Layers, Workflow, MonitorSmartphone, ShieldCheck } from "lucide-react";

const services = [
  {
    icon: Layers,
    title: "Content Multiplication",
    description: "Da 1 contenuto a 20+ formati diversi. Ogni asset è ottimizzato per il canale di destinazione.",
    stat: "20+",
    statLabel: "Formati",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Flussi personalizzati per ogni esigenza. Automatizza la produzione e risparmia ore di lavoro.",
    stat: "∞",
    statLabel: "Flussi Custom",
  },
  {
    icon: MonitorSmartphone,
    title: "Multi-Platform Optimization",
    description: "Contenuti ottimizzati per ogni canale: social, blog, email, ads — tutto perfettamente adattato.",
    stat: "15+",
    statLabel: "Piattaforme",
  },
  {
    icon: ShieldCheck,
    title: "Brand Consistency",
    description: "Mantiene voce, stile e identità del brand in ogni singolo asset prodotto.",
    stat: "100%",
    statLabel: "On-Brand",
  },
];

export function ServicesSection() {
  return (
    <section id="servizi" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Servizi</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mt-3">
            La Potenza dell'<span className="text-gradient">Automazione</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-gradient-card border border-border hover:border-primary/30 transition-all duration-500 hover:glow-primary"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold font-display text-gradient">{service.stat}</span>
                <span className="text-xs text-muted-foreground ml-2">{service.statLabel}</span>
              </div>
              <h3 className="text-base font-semibold font-display mb-2">{service.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
