import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  MessageCircle, 
  FileQuestion, 
  Clock, 
  Send,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

const faq = [
  {
    question: "Quanto tempo ci vuole per ricevere i contenuti?",
    answer: "Solitamente consegniamo entro 24-48 ore dalla ricezione del materiale originale. Per progetti più complessi o volumi elevati, ti comunicheremo tempistiche specifiche."
  },
  {
    question: "Che tipo di contenuti posso inviarvi?",
    answer: "Accettiamo video (YouTube, webinar, podcast video), audio (podcast, interviste), articoli e presentazioni. Quasi qualsiasi formato può essere trasformato!"
  },
  {
    question: "I contenuti generati sono pronti per la pubblicazione?",
    answer: "Sì, tutti i contenuti vengono consegnati pronti per essere pubblicati. Rispettiamo il tone of voice del tuo brand e ottimizziamo per ogni piattaforma."
  },
  {
    question: "Posso richiedere modifiche?",
    answer: "Assolutamente sì! Ogni piano include un ciclo di revisione. Per il piano Pro sono incluse revisioni illimitate."
  },
  {
    question: "Come funziona il pagamento?",
    answer: "Accettiamo pagamenti mensili ricorrenti o annuali con sconto. Per progetti custom, concordiamo un piano di pagamento adatto alle tue esigenze."
  }
];

export default function Supporto() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    messaggio: ""
  });

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
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
              <span className="text-gradient">Supporto</span> & Contatti
            </h1>
            <p className="text-xl text-muted-foreground">
              Siamo qui per aiutarti. Scegli il modo migliore per contattarci.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scrivici per richieste e preventivi
                </p>
                <a 
                  href="mailto:consciuslabs@gmail.com"
                  className="text-primary hover:underline"
                >
                  consciuslabs@gmail.com
                </a>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Tempi di Risposta</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Solitamente entro 24 ore
                </p>
                <p className="text-xs text-muted-foreground">
                  Lun-Ven: 9:00-18:00
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Social</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Scrivici sui social
                </p>
                <div className="flex justify-center gap-2">
                  <a href="https://www.instagram.com/consciuslabs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">Instagram</a>
                  <span className="text-muted-foreground">•</span>
                  <a href="https://x.com/ConsciusLabs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">X</a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send size={20} />
                  Invia un Messaggio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form 
                  action="mailto:consciuslabs@gmail.com" 
                  method="post" 
                  encType="text/plain"
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome</Label>
                    <Input 
                      id="nome" 
                      name="nome" 
                      placeholder="Il tuo nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email-supporto">Email *</Label>
                    <Input 
                      id="email-supporto" 
                      name="email" 
                      type="email" 
                      placeholder="tu@email.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="messaggio">Messaggio *</Label>
                    <Textarea 
                      id="messaggio" 
                      name="messaggio" 
                      placeholder="Come possiamo aiutarti?"
                      rows={4}
                      required
                      value={formData.messaggio}
                      onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="mr-2" size={16} />
                    Invia Email
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileQuestion size={20} />
                  FAQ Rapida
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faq.map((item, index) => (
                  <div key={index} className="border-b border-border last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-sm mb-2">{item.question}</h4>
                    <p className="text-sm text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Preferisci parlare direttamente? Richiedi una call gratuita
            </p>
            <a 
              href="/preventivo" 
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition"
            >
              Richiedi una Call
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
