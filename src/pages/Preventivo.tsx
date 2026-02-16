import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Send, FileText, Video, MessageSquare, Instagram, Linkedin, Twitter, Sparkles, Zap, Building2 } from "lucide-react";
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
    prezzo: "€297",
    prezzoAnnuale: "€237",
    descrizione: "2 asset → 15 formati",
    target: "Freelancer, test",
    popular: false,
    dettagli: ["2 asset al mese", "15 formati output", "LinkedIn + Instagram", "Consegna 48h", "Supporto email"]
  },
  { 
    id: "professional",
    nome: "PROFESSIONAL", 
    prezzo: "€497",
    prezzoAnnuale: "€397",
    descrizione: "4 asset → 30 formati",
    target: "Coach, creator B2B",
    popular: true,
    dettagli: ["4 asset al mese", "30 formati output", "LinkedIn + Instagram + X + Newsletter", "Consegna 24h", "Supporto WhatsApp", "1 call strategica/mese", "Analytics report"]
  },
  { 
    id: "business",
    nome: "BUSINESS", 
    prezzo: "€997",
    prezzoAnnuale: "€797",
    descrizione: "8 asset → 50+ formati",
    target: "Agenzie, team",
    popular: false,
    dettagli: ["8 asset al mese", "50+ formati output", "Tutte le piattaforme + YouTube Shorts", "Consegna 24h garantita", "Supporto prioritario", "2 call strategiche/mese", "Content calendar planning"]
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
              Inizia a moltiplicare i tuoi contenuti. Sconto del 50% sul primo mese per i primi 10 clienti.
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

          {/* Promo Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 border border-accent/30"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-accent" />
                <div>
                  <h3 className="font-semibold text-lg">🚀 Programma Founders — 50% OFF</h3>
                  <p className="text-sm text-muted-foreground">
                    Primi 10 clienti: 50% di sconto sul primo mese. Prezzo bloccato per sempre.
                  </p>
                </div>
              </div>
              <Badge className="bg-accent text-accent-foreground px-4 py-2 text-lg">
                Solo 10 posti!
              </Badge>
            </div>
          </motion.div>

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
                  <p className="text-2xl font-bold text-gradient">€720</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Starter</p>
                </div>
                <div className="p-4 rounded-lg bg-background border border-accent/30">
                  <p className="text-2xl font-bold text-gradient">€1.200</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Professional</p>
                </div>
                <div className="p-4 rounded-lg bg-background">
                  <p className="text-2xl font-bold text-gradient">€2.400</p>
                  <p className="text-xs text-muted-foreground">Risparmio su Business</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Paghi 12 mesi, ma spendi meno. E il prezzo è bloccato per sempre.
              </p>
            </motion.div>
          )}

          {/* Form Contatto */}
          <Card>
            <CardHeader>
              <CardTitle>Richiedi Informazioni</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" action="mailto:consciuslabs@gmail.com" method="post" encType="text/plain">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome e Cognome *</Label>
                    <Input id="nome" name="nome" placeholder="Mario Rossi" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" placeholder="mario@azienda.it" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="azienda">Azienda / Brand</Label>
                  <Input id="azienda" name="azienda" placeholder="Nome della tua azienda" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="piano">Piano di interesse *</Label>
                    <Select name="piano" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleziona un piano" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter — €297/mese</SelectItem>
                        <SelectItem value="professional">Professional — €497/mese ⭐</SelectItem>
                        <SelectItem value="business">Business — €997/mese</SelectItem>
                        <SelectItem value="custom">Personalizzato</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatturazione">Fatturazione</Label>
                    <Select name="fatturazione" defaultValue="mensile">
                      <SelectTrigger>
                        <SelectValue placeholder="Mensile o Annuale" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mensile">Mensile</SelectItem>
                        <SelectItem value="annuale">Annuale (-20%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Formati di output desiderati</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {formati.map((formato) => (
                      <div key={formato.id} className="flex items-center space-x-2">
                        <Checkbox id={formato.id} name="formati" value={formato.label} />
                        <Label htmlFor={formato.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                          <formato.icon size={16} className="text-muted-foreground" />
                          {formato.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descrizione">Descrivi il tuo progetto *</Label>
                  <Textarea 
                    id="descrizione" 
                    name="descrizione" 
                    placeholder="Descrivi il tipo di contenuto che produci, i tuoi obiettivi, la frequenza di pubblicazione..."
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="url">Link contenuto di esempio (opzionale)</Label>
                  <Input id="url" name="url" type="url" placeholder="https://youtube.com/... o https://drive.google.com/..." />
                  <p className="text-xs text-muted-foreground">
                    Se hai già un video, podcast o articolo da cui partire, inserisci il link
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="founders" 
                    name="founders"
                    value="interessato"
                  />
                  <Label htmlFor="founders" className="text-sm font-normal">
                    Sono interessato allo sconto Founders (50% OFF primo mese)
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2" size={18} />
                  Invia Richiesta
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Ti risponderemo entro 24 ore con tutti i dettagli.
                </p>
              </form>
            </CardContent>
          </Card>
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
