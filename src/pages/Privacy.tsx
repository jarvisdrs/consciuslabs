import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16 pt-24">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy — ConsciusLabs</h1>
        <p className="text-muted-foreground mb-8"><strong>Ultimo aggiornamento:</strong> 16 Febbraio 2026</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Informazioni raccolte</h2>
          <p className="text-muted-foreground mb-2">Raccogliamo le seguenti informazioni:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Nome e cognome</li>
            <li>Indirizzo email</li>
            <li>Informazioni sul progetto richiesto</li>
            <li>File audio/video caricati per l'elaborazione</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Come utilizziamo i dati</h2>
          <p className="text-muted-foreground mb-2">I tuoi dati vengono utilizzati per:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Fornire i servizi richiesti di content repurposing</li>
            <li>Comunicare con te riguardo al progetto</li>
            <li>Inviare fatture e ricevute di pagamento</li>
            <li>Migliorare i nostri servizi (solo dati anonimizzati)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Conservazione dei dati</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>I file caricati vengono conservati per 30 giorni dopo la consegna</li>
            <li>I contenuti output vengono conservati per 12 mesi</li>
            <li>I dati di contatto vengono conservati per 24 mesi dopo l'ultimo progetto</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Condivisione dei dati</h2>
          <p className="text-muted-foreground mb-2">Non vendiamo né condividiamo i tuoi dati personali con terze parti, eccetto:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Google Drive (per la consegna dei file)</li>
            <li>Stripe (per i pagamenti)</li>
            <li>Obblighi legali se richiesto dalle autorità</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. I tuoi diritti</h2>
          <p className="text-muted-foreground mb-2">Hai il diritto di:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Accedere ai tuoi dati personali</li>
            <li>Richiedere la correzione di dati inaccurati</li>
            <li>Richiedere la cancellazione dei tuoi dati</li>
            <li>Opporsi al trattamento dei dati</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Cookie</h2>
          <p className="text-muted-foreground">Utilizziamo solo cookie tecnici necessari per il funzionamento del sito. Non utilizziamo cookie di profilazione o di terze parti.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contatti</h2>
          <p className="text-muted-foreground">Per esercitare i tuoi diritti o per domande sulla privacy:</p>
          <p className="text-muted-foreground mt-2">Email: consciuslabs@gmail.com</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
