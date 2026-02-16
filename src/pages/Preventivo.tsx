import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Send, FileText, Video, MessageSquare, Instagram, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

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
    nome: "Base", 
    prezzo: "€300/mese", 
    descrizione: "2 asset → 20 formati",
    dettagli: ["Trascrizione automatica", "5 formati di output", "Revisione inclusa", "Consegna 24-48h"]
  },
  { 
    nome: "Standard", 
    prezzo: "€700/mese", 
    descrizione: "4 asset → 40 formati",
    dettagli: ["Tutto del piano Base", "10+ formati di output", "Copywriting avanzato", "Supporto prioritario", "Analisi performance"]
  },
  { 
    nome: "Pro", 
    prezzo: "€1.500/mese", 
    descrizione: "Asset illimitati",
    dettagli: ["Volume illimitato", "Tutti i formati", "Strategia contenuti", "Account manager", "Report mensili"]
  },
];

export default function Preventivo() {
  const [inviaEmail, setInviaEmail] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 mx-auto pt-24 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-display mb-4">
              Richiedi un <span className="text-gradient">Preventivo</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Compila il form e ti invieremo un preventivo personalizzato entro 24 ore
            </p>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>I Nostri Piani</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                {piani.map((piano, index) => (
                  <div key={index} className="p-6 rounded-xl bg-secondary border border-border hover:border-primary/50 transition-colors">
                    <h3 className="font-semibold text-lg mb-2">{piano.nome}</h3>
                    <p className="text-2xl font-bold text-gradient mb-1">{piano.prezzo}</p>
                    <p className="text-sm text-muted-foreground mb-4">{piano.descrizione}</p>
                    <ul className="space-y-2">
                      {piano.dettagli.map((dettaglio, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                          {dettaglio}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dettaglia la tua Richiesta</CardTitle>
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

                <div className="space-y-2">
                  <Label htmlFor="piano">Piano di interesse *</Label>
                  <Select name="piano" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleziona un piano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="base">Base (€300/mese)</SelectItem>
                      <SelectItem value="standard">Standard (€700/mese)</SelectItem>
                      <SelectItem value="pro">Pro (€1.500/mese)</SelectItem>
                      <SelectItem value="custom">Personalizzato</SelectItem>
                    </SelectContent>
                  </Select>
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
                    id="inviaEmail" 
                    checked={inviaEmail}
                    onCheckedChange={(checked) => setInviaEmail(checked as boolean)}
                  />
                  <Label htmlFor="inviaEmail" className="text-sm font-normal">
                    Inviami copia via email
                  </Label>
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2" size={18} />
                  Invia Richiesta Preventivo
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Cliccando invia, si aprirà la tua app di posta con i dati precompilati. 
                  Invia l'email a consciuslabs@gmail.com
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
