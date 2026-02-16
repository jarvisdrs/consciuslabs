import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle, Mail, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container px-4 mx-auto pt-24 pb-16"
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <h1 className="text-4xl font-bold font-display mb-4">
            Pagamento <span className="text-gradient">Completato!</span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            Grazie per aver scelto ConsciusLabs. Il tuo abbonamento è ora attivo.
          </p>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h2 className="font-semibold text-lg mb-4">Cosa succede ora?</h2>
              
              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email di conferma</p>
                    <p className="text-sm text-muted-foreground">
                      Hai ricevuto una email con i dettagli dell'abbonamento e la fattura.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call di onboarding</p>
                    <p className="text-sm text-muted-foreground">
                      Ti contatteremo entro 24 ore per fissare la call di benvenuto e configurare tutto.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Inizia a inviare contenuti</p>
                    <p className="text-sm text-muted-foreground">
                      Puoi già iniziare a inviarci i tuoi video/podcast per il repurposing.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Link to="/">
              <Button variant="hero" size="lg">
                Torna alla Home
              </Button>
            </Link>
            
            <p className="text-sm text-muted-foreground">
              Hai domande? Scrivici a{" "}
              <a href="mailto:consciuslabs@gmail.com" className="text-primary hover:underline">
                consciuslabs@gmail.com
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}
