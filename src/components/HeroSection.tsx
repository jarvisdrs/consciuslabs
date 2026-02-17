import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const contentTypes = [
  "📝 Blog Post", "🎬 Reel", "📧 Newsletter", "🐦 Tweet", "📊 Infografica",
  "🎙️ Podcast Clip", "📱 Story", "💼 LinkedIn Post", "📰 Articolo", "🎯 Ad Copy",
];

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-surface" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

      <div className="container relative z-10 px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
              AI Content Lab
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display leading-tight mb-6"
          >
            L'AI Content Lab che{" "}
            <span className="text-gradient">Amplifica le Tue Idee</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Trasformiamo un singolo contenuto in decine di asset ottimizzati grazie a flussi di automazione intelligenti
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="hero" size="lg" onClick={() => scrollTo("come-funziona")}>
              Scopri Come Funziona
              <ArrowRight className="ml-2" size={18} />
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="/preventivo">
                <ArrowRight size={18} className="mr-2" />
                Richiedi un Preventivo
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Floating content tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-20 relative h-20"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            {contentTypes.map((type, i) => (
              <motion.span
                key={type}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
                className="px-3 py-1.5 text-xs rounded-full bg-secondary border border-border text-muted-foreground animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {type}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
