import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { FileText, Video, MessageSquare, Instagram, Linkedin, Twitter, Sparkles, Zap, Building2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PaymentModal } from "@/components/PaymentModal";
import { getPriceId, PLAN_DETAILS } from "@/lib/stripe";

const formati = [
  { id: "blog", label: "Blog Post", icon: FileText },
  { id: "reel", label: "Reel/Short", icon: Video },
  { id: "newsletter", label: "Newsletter", icon: MessageSquare },
  { id: "linkedin", label: "LinkedIn Post", icon: Linkedin },
  { id: "instagram", label: "Instagram Post", icon: Instagram },
  { id: "twitter", label: "X/Tweet Thread", icon: Twitter },
];

const piani = [
  { 
    id: "starter",
    nome: "STARTER", 
    prezzo: "€147",
    prezzoAnnuale: "€118",
    descrizione: "2 video → 15 contenuti",
    target: "Freelancer, test",
    popular: false,
    dettagli: ["2 video al mese", "15 contenuti output", "LinkedIn + Instagram", "Consegna 48h", "Supporto email"]
  },
  { 
    id: "professional",
    nome: "PROFESSIONAL", 
    prezzo: "€247",
    prezzoAnnuale: "€198",
    descrizione: "4 video → 30 contenuti",
    target: "Coach, creator B2B",
    popular: true,
    dettagli: ["4 video al mese", "30 contenuti output", "LinkedIn + Instagram + X + Newsletter", "Consegna 24h", "Supporto WhatsApp", "1 call strategica/mese", "Analytics report"]
  },
  { 
    id: "business",
    nome: "BUSINESS", 
    prezzo: "€447",
    prezzoAnnuale: "€358",
    descrizione: "8 video → 50+ contenuti",
    target: "Agenzie, team",
    popular: false,
    dettagli: ["8 video al mese", "50+ contenuti output", "Tutte le piattaforme + YouTube Shorts", "Consegna 24h garantita", "Supporto prioritario", "2 call strategiche/mese", "Content calendar planning"]
  },
];

export default function Preventivo() {
  const [inviaEmail, setInviaEmail] = useState(false);
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof piani[0] | null>(null);

  const handleSelectPlan = (piano: typeof piani[0]) => {
    setSelectedPlan(piano);
    setPaymentModalOpen(true);
  };

  const getPlanAmount = (piano: typeof piani[0]) => {
    const planId = piano.id as 'starter' | 'professional' | 'business';
    return PLAN_DETAILS[planId][billingCycle];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 mx-auto pt-24 pb-16"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">
              Scegli il tuo <span className="text-gradient">Piano</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Inizia a moltiplicare i tuoi contenuti. Scegli il piano più adatto alle tue esigenze.
            </p>
          </div>

          {/* Toggle Mensile/Annuale */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center bg-secondary rounded-lg p-1">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  billingCycle === "monthly" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Mensile
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                  billingCycle === "annual" 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annuale
                <Badge variant="secondary" className="bg-accent text-accent-foreground text-xs">
                  -20%
                </Badge>
              </button>
            </div>
          </div>

          {/* Piani */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {piani.map((piano, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-6 rounded-2xl border transition-all ${
                  piano.popular 
                    ? "bg-gradient-to-b from-primary/10 to-background border-primary/50 shadow-lg shadow-primary/10" 
                    : "bg-secondary/50 border-border hover:border-primary/30"
                }`}
              >
                {piano.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Zap className="w-3 h-3 mr-1" />
                      BEST VALUE
                    </Badge>
                  </div>
                )}
                
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-1">{piano.nome}</h3>
                  <p className="text-xs text-muted-foreground">{piano.target}</p>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gradient">
                      {billingCycle === "monthly" ? piano.prezzo : piano.prezzoAnnuale}
                    </span>
                    <span className="text-muted-foreground">/mese</span>
                  </div>
                  {billingCycle === "annual" && (
                    <p className="text-xs text-accent">
                      Risparmi €{(parseInt(piano.prezzo.slice(1)) - parseInt(piano.prezzoAnnuale.slice(1))) * 12}/anno
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground mt-1">{piano.descrizione}</p>
                </div>

                <ul className="space-y-2 mb-6">
                  {piano.dettagli.map((dettaglio, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0"></span>
                      {dettaglio}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={piano.popular ? "hero" : "outline"} 
                  className="w-full"
                  onClick={() => handleSelectPlan(piano)}
                >
                  {piano.popular ? "Scegli Professional" : "Seleziona"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Preferisci parlare prima?{" "}
                  <a 
                    href="https://calendly.com/consciuslabs/intro" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    Prenota call gratuita
                  </a>
                </p>
              </motion.div>
            ))}
          </div>

          {/* Calcolatore Risparmio Annuale */}
          {billingCycle === "annual" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-12 p-6 rounded-xl bg-secondary border border-border"
            >
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Vantaggio Piano Annuale</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-background">
                  <p className="text-2xl font-bold text-gradient">€348</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Starter</p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-accent/30">
                  <p className="text-2xl font-bold text-gradient">€588</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Professional</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <p className="text-2xl font-bold text-gradient">€1.068</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Business</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Paghi 12 mesi, ma spendi meno. E il prezzo è bloccato per sempre.
              </p>
            </motion.div>
          )}

          {/* CTA Finale - Solo Call */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20"
          >
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-display mb-3">
              Non sei sicuro di quale piano scegliere?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Prenota una call gratuita di 15 minuti. Ti aiutiamo a capire quale piano 
              è più adatto alle tue esigenze, senza impegno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/consciuslabs/intro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                Prenota Call Gratuita
                <ArrowRight size={18} />
              </a>
              <span className="text-sm text-muted-foreground flex items-center justify-center">
                oppure scrivi a consciuslabs@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Footer />

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={paymentModalOpen}
          onClose={() => setPaymentModalOpen(false)}
          planId={(() => {
            const priceId = getPriceId(selectedPlan.id as 'starter' | 'professional' | 'business', billingCycle);
            console.log('Price ID:', priceId);
            return priceId;
          })()}
          planName={selectedPlan.nome}
          amount={getPlanAmount(selectedPlan)}
          billingCycle={billingCycle}
        />
      )}
    </div>
  );
}
