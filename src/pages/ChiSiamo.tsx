import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Heart, Lightbulb, Users, Sparkles, ArrowRight } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Passione per i Contenuti",
    description: "Amiamo trasformare idee in storie che risuonano con il pubblico giusto."
  },
  {
    icon: Lightbulb,
    title: "Innovazione Continua",
    description: "Sfruttiamo l'AI e le tecnologie emergenti per offrire soluzioni all'avanguardia."
  },
  {
    icon: Target,
    title: "Risultati Concreti",
    description: "Non ci fermiamo alla teoria: misuriamo ogni risultato e ottimizziamo costantemente."
  },
  {
    icon: Users,
    title: "Partnership Veri",
    description: "Lavoriamo come estensione del tuo team, non come fornitori esterni."
  }
];

const stats = [
  { number: "10x", label: "Contenuti Generati" },
  { number: "24h", label: "Tempo di Consegna" },
  { number: "100%", label: "Clienti Soddisfatti" },
  { number: "∞", label: "Possibilità Creative" }
];

export default function ChiSiamo() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container px-4 mx-auto pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">La Nostra Storia</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Chi <span className="text-gradient">Siamo</span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              ConsciusLabs nasce dalla convinzione che ogni contenuto meriti 
              di essere valorizzato al massimo delle sue potenzialità.
            </p>
          </div>

          <div className="prose prose-lg max-w-none mb-16">
            <Card>
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Siamo un team di appassionati di contenuti digitali, esperti di marketing 
                  e tecnologia. La nostra missione è semplice: <strong>aiutare creatori 
                  e aziende a massimizzare il valore dei loro contenuti</strong>.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  In un mondo dove creare contenuti di qualità richiede tempo ed energia, 
                  crediamo che il repurposing intelligente sia la chiave per una presenza 
                  online sostenibile ed efficace.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Non sostituiamo la creatività umana: la <strong>amplifichiamo</strong>. 
                  Usiamo l'intelligenza artificiale come alleato per liberare tempo prezioso 
                  e permettere ai nostri clienti di concentrarsi su ciò che sanno fare meglio.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold font-display text-center mb-12">I Nostri Valori</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <h3 className="text-lg font-semibold font-display mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold font-display text-center mb-12">In Numeri</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-secondary"
                >
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold font-display mb-4">Pronto a collaborare?</h2>
            <p className="text-muted-foreground mb-6">
              Scopri come possiamo aiutarti a valorizzare i tuoi contenuti
            </p>
            
            <a 
              href="/preventivo" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Inizia Ora
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
