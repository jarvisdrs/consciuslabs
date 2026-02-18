import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const BOT_TOKEN = "8236930637:AAHO6C0qVGDWHLR1g4xwPkpBbGk9WEVnz34";
const CHAT_ID = "655621828";
const N8N_WEBHOOK = "https://simonsan.app.n8n.cloud/webhook/conscius-binary";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    audioLink: "",
    termsAccepted: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendTelegramAlert = async (data: typeof formData) => {
    const text = `🚨 NUOVO LEAD CONSCIUSLABS!\n\n👤 Nome: ${data.name}\n📧 Email: ${data.email}\n🔗 Link Audio: ${data.audioLink || "N/D"}`;
    
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: "HTML"
      })
    });
  };

  const triggerN8NWorkflow = async (data: typeof formData) => {
    await fetch(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        audioUrl: data.audioLink,
        timestamp: new Date().toISOString()
      })
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.termsAccepted) {
      toast.error("Devi accettare i Termini di Servizio");
      return;
    }

    setIsSubmitting(true);

    try {
      await sendTelegramAlert(formData);
      await triggerN8NWorkflow(formData);
      
      toast.success("Messaggio inviato! Ti contatteremo entro 24h.");
      
      setFormData({
        name: "",
        email: "",
        audioLink: "",
        termsAccepted: false
      });
    } catch (error) {
      toast.error("Errore invio. Riprova o contattaci direttamente.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Nome *</label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Mario Rossi"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email *</label>
        <Input
          required
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="mario@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Link al tuo video *</label>
        <Input
          required
          value={formData.audioLink}
          onChange={(e) => setFormData({...formData, audioLink: e.target.value})}
          placeholder="https://drive.google.com/... o WeTransfer"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Carica su Google Drive, WeTransfer o Dropbox
        </p>
      </div>

      <div className="flex items-start space-x-3">
        <Checkbox
          id="terms"
          checked={formData.termsAccepted}
          onCheckedChange={(checked: boolean) => 
            setFormData({...formData, termsAccepted: checked})
          }
        />
        <label htmlFor="terms" className="text-sm">
          Accetto i{" "}
          <a href="/termini" className="text-primary hover:underline">Termini</a>
          {" "}e{" "}
          <a href="/privacy" className="text-primary hover:underline">Privacy</a>
          {" "}*
        </label>
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Invio in corso..." : "Invia richiesta"}
      </Button>
    </form>
  );
}
