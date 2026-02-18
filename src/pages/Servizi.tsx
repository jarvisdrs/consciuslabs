import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  FileText, 
  Video, 
  Share2, 
  Zap, 
  Workflow,
  ArrowRight
} from "lucide-react";

const servizi = [
  {
    icon: FileText,
    title: "Content Multiplication",
    description: "Trasformiamo un singolo contenuto long-form in decine di asset ottimizzati per ogni piattaforma.",
    features: ["Blog post SEO-optimized", "Newsletter settimanali", "Thread X/Twitter", "LinkedIn carousels"]
  },
  {
    icon: Video,
    title: "Video Repurposing",
    description: "I tuoi video diventano reel, short, clip virali e contenuti per ogni social network.",
    features: ["Reel Instagram/TikTok", "YouTube Shorts", "Clip LinkedIn", "Stories"]
  },
  {
    icon: Share2,
    title: "Multi-Platform Publishing",
    description: "Ogni contenuto viene adattato allo stile e al formato specifico di ogni piattaforma.",
    features: ["Adattamento formato", "Tone of voice personalizzato", "Hashtag research", "Timing ottimale"]
  },
  {
    icon: Zap,
    title: "Workflow Automation",
    description: "Processi automatizzati che riducono i tempi di produzione e garantiscono consistenza.",
    features: ["AI-powered transcription", "Auto-formatting", "Scheduling automatico", "Quality check"]
  },
  {
    icon: Workflow,
    title: "Brand Consistency",
    description: "Manteniamo la coerenza del tuo brand su tutti i canali e formati.",
    features: ["Brand voice guidelines", "Visual consistency", "Content calendar", "Style guide"]
  }
];

export default function Servizi() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container px-4 mx-auto pt-24 pb-16"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              I Nostri <span className="text-gradient">Servizi</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluzioni complete per moltiplicare la tua presenza online 
              senza moltiplicare il tuo tempo
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servizi.map((servizio, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <servizio.icon className="w-6 h-6 text-primary" />
                    </div>
                    
                    <h3 className="text-xl font-semibold font-display mb-3">{servizio.title}</h3>
                    
                    <p className="text-muted-foreground mb-4">{servizio.description}</p>
                    
                    <ul className="space-y-2">
                      {servizio.features.map((feature, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <ArrowRight size={14} className="text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a 
              href="/preventivo" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Richiedi un Preventivo
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
