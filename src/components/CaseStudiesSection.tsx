import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Play, FileText, Instagram, Linkedin } from "lucide-react";

const casiStudio = [
  {
    cliente: "Marco B.",
    settore: "Business Coach",
    prima: "1 video a settimana, 3K follower su LinkedIn",
    dopo: "15 contenuti/settimana, 12K follower (+300%)",
    risultati: [
      "+400% engagement su LinkedIn",
      "3 lead qualificati/week",
      "5 ore settimanali risparmiate"
    ],
    tempo: "3 mesi",
    piano: "Professional"
  },
  {
    cliente: "Studio Progetti Digitali",
    settore: "Agenzia Web",
    prima: "Solo portfolio, nessun contenuto social",
    dopo: "2 video case study → 20 contenuti/mese",
    risultati: [
      "+200% visibilità su Instagram",
      "4 richieste commerciali/mese",
      "1 cliente acquisito (€15K progetto)"
    ],
    tempo: "2 mesi",
    piano: "Business"
  },
  {
    cliente: "Elena R.",
    settore: "Nutrizionista",
    prima: "Blog poco trafficato, pochi pazienti online",
    dopo: "1 video settimanale → contenuti multi-piattaforma",
    risultati: [
      "+150% traffico sul sito",
      "8 consulenze/mese da social",
      "€3K fatturato extra/mese"
    ],
    tempo: "4 mesi",
    piano: "Starter"
  }
];

export function CaseStudiesSection() {
  return (
    <section id="casi-studio" className="py-24 bg-secondary/30">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-6"
            >
              <ArrowUpRight size={16} />
              <span className="text-sm font-medium">Risultati Concreti</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl font-bold font-display mb-4"
            >
              Cosa Dicono i Nostri <span className="text-gradient">Clienti</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              Storie reali di creator e aziende che hanno moltiplicato la loro presenza online
            </motion.p>
          </div>

          {/* Casi Studio Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {casiStudio.map((caso, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-all group">
                  <CardContent className="p-6">
                    {/* Header Card */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {caso.settore}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{caso.tempo}</span>
                      </div>
                      <h3 className="text-lg font-semibold font-display">{caso.cliente}</h3>
                      <p className="text-xs text-accent">Piano {caso.piano}</p>
                    </div>

                    {/* Before/After */}
                    <div className="space-y-3 mb-6">
                      <div className="p-3 rounded-lg bg-background/50">
                        <p className="text-xs text-muted-foreground mb-1">Prima:</p>
                        <p className="text-sm">{caso.prima}</p>
                      </div>
                      <div className="flex justify-center">
                        <ArrowUpRight className="text-accent rotate-45" size={20} />
                      </div>
                      <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                        <p className="text-xs text-accent mb-1">Dopo:</p>
                        <p className="text-sm font-medium">{caso.dopo}</p>
                      </div>
                    </div>

                    {/* Risultati */}
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Risultati chiave:</p>
                      {caso.risultati.map((risultato, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></span>
                          <p className="text-sm text-muted-foreground">{risultato}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-muted-foreground mb-4">
              Vuoi risultati simili per il tuo business?
            </p>
            <a
              href="https://calendly.com/consciuslabs/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Prenota Call Gratuita
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
