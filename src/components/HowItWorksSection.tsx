import { motion } from "framer-motion";
import { Upload, Cpu, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Fornisci il Contenuto Originale",
    description: "Carica un video, podcast, articolo o presentazione. Basta un singolo contenuto per iniziare.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Cpu,
    step: "02",
    title: "I Nostri Workflow AI Analizzano e Processano",
    description: "La nostra tecnologia avanzata elabora, analizza e riadatta il contenuto in modo intelligente.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Ricevi Decine di Asset Pronti all'Uso",
    description: "Social posts, newsletter, articoli blog, infografiche — tutto ottimizzato e pronto per la pubblicazione.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function HowItWorksSection() {
  return (
    <section id="come-funziona" className="py-24 relative">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-accent uppercase tracking-wider">Processo</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mt-3">
            Come <span className="text-gradient">Funziona</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <step.icon className={`w-7 h-7 ${step.color}`} />
              </div>
              <span className="text-xs font-mono text-muted-foreground mb-2">STEP {step.step}</span>
              <h3 className="text-lg font-semibold font-display mb-3">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
