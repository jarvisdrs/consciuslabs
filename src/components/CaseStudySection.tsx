import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Image, MessageSquare, Newspaper, CheckCircle, Clock, Zap, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Deliverable {
  type: 'reel' | 'linkedin' | 'carousel' | 'newsletter' | 'tweet';
  title: string;
  preview: string;
  icon: React.ReactNode;
}

const deliverables: Deliverable[] = [
  {
    type: 'reel',
    title: '5 Reels Verticali',
    preview: 'Clip virali da 15-30s con sottotitoli e hook',
    icon: <Play className="w-5 h-5" />
  },
  {
    type: 'linkedin',
    title: '3 Post LinkedIn',
    preview: 'Post ottimizzati per engagement professionale',
    icon: <FileText className="w-5 h-5" />
  },
  {
    type: 'carousel',
    title: '2 Caroselli',
    preview: 'Slide informative per LinkedIn/Instagram',
    icon: <Image className="w-5 h-5" />
  },
  {
    type: 'tweet',
    title: '3 Thread X',
    preview: 'Tweet storm per massima visibilità',
    icon: <MessageSquare className="w-5 h-5" />
  },
  {
    type: 'newsletter',
    title: '1 Newsletter',
    preview: 'Email pronta da inviare alla tua lista',
    icon: <Newspaper className="w-5 h-5" />
  }
];

export function CaseStudySection() {
  const [activeTab, setActiveTab] = useState<'before' | 'after'>('before');

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-accent/20 text-accent border-accent/30 hover:bg-accent/30 px-4 py-1.5 text-sm mb-4">
              Caso Studio Reale
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-4 mb-4">
              Come <span className="text-gradient">Cimena</span> ha moltiplicato la sua visibilità
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Casa di produzione che è passata da contenuti sporadici a 50+ asset mensili 
              con una strategia multi-piattaforma coerente.
            </p>
          </motion.div>
        </div>

        {/* Toggle Before/After */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-background rounded-lg p-1 border">
            <button
              onClick={() => setActiveTab('before')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'before'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Prima
            </button>
            <button
              onClick={() => setActiveTab('after')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'after'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Dopo
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          {activeTab === 'before' ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-background rounded-2xl p-8 border"
            >
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Video Preview */}
                <div className="relative aspect-video bg-black rounded-xl overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-medium">Backstage produzione video</p>
                    <p className="text-white/70 text-sm">8:45 • Pubblicato 1 volta</p>
                  </div>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">La Situazione Iniziale</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-destructive" />
                      <span>Contenuti pubblicati sporadicamente</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-destructive" />
                      <span>Nessuna strategia di distribuzione</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-destructive line-through">
                        Un video = un solo post
                      </span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground italic">
                      "Registravamo ottimi contenuti per i nostri clienti, ma poi li pubblicavamo 
                      una volta e li dimenticavamo. Non avevamo il tempo di creare versioni 
                      per ogni piattaforma."
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-background rounded-xl p-6 text-center border">
                  <ArrowUpRight className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gradient">+400%</p>
                  <p className="text-sm text-muted-foreground">Visibilità online</p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center border">
                  <Zap className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gradient">50+</p>
                  <p className="text-sm text-muted-foreground">Contenuti/mese</p>
                </div>
                <div className="bg-background rounded-xl p-6 text-center border">
                  <CheckCircle className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gradient">3</p>
                  <p className="text-sm text-muted-foreground">Nuovi clienti</p>
                </div>
              </div>

              {/* Deliverables Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {deliverables.map((item, index) => (
                  <motion.div
                    key={item.type}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background rounded-xl p-5 border hover:border-accent/50 transition-colors group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.preview}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="mt-8 bg-background rounded-xl p-6 border">
                <blockquote className="text-lg text-center italic text-muted-foreground mb-4">
                  "In 4 mesi siamo passati dalla confusione totale a una macchina 
                  ben oliata di contenuti. Ogni nostro video viene sfruttato al massimo 
                  e la brand recognition è aumentata in modo esponenziale."
                </blockquote>
                <div className="text-center">
                  <p className="font-semibold">Team Cimena</p>
                  <p className="text-sm text-muted-foreground">Casa di Produzione Video</p>
                  <Badge variant="outline" className="mt-2">Piano Business</Badge>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 text-center">
                <Button size="lg" className="gradient-button">
                  Ottieni risultati simili
                </Button>
                <p className="text-xs text-muted-foreground mt-3">
                  Prenota una call di 15 minuti
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
