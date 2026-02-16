import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Send, CheckCircle } from "lucide-react";

export function CTASection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contatti" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/[0.03] to-transparent" />
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display mb-4">
              Pronto a <span className="text-gradient">Moltiplicare</span> il Tuo Impatto?
            </h2>
            <p className="text-muted-foreground mb-10">
              Richiedi una demo gratuita e scopri come possiamo trasformare la tua strategia di contenuti.
            </p>
          </motion.div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-2xl bg-gradient-card border border-accent/30 flex flex-col items-center gap-4"
            >
              <CheckCircle className="w-12 h-12 text-accent" />
              <h3 className="text-xl font-semibold font-display">Richiesta Inviata!</h3>
              <p className="text-muted-foreground text-sm">Ti contatteremo entro 24 ore.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl bg-gradient-card border border-border space-y-4"
            >
              <input
                type="text"
                placeholder="Il tuo nome"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
              <input
                type="text"
                placeholder="Azienda"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
              <Button type="submit" variant="hero" size="lg" className="w-full">
                Richiedi Demo Gratuita
                <Send className="ml-2" size={18} />
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
