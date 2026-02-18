import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Termini() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-16 pt-24">
        <h1 className="text-3xl font-bold mb-6">Termini di Servizio — ConsciusLabs</h1>
        <p className="text-muted-foreground mb-8"><strong>Ultimo aggiornamento:</strong> 16 Febbraio 2026</p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">1. Descrizione del Servizio</h2>
          <p className="mb-2">ConsciusLabs fornisce servizi di content repurposing tramite intelligenza artificiale:</p>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Trascrizione audio/video</li>
            <li>Trasformazione contenuti in formati multipli</li>
            <li>Creazione asset pronti per la distribuzione</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">2. Prezzi e Pagamento</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Tutti i prezzi sono in Euro (€) e esclusi IVA</li>
            <li>Il pagamento è anticipato tramite bonifico bancario</li>
            <li>Nessun rimborso una volta iniziato il lavoro</li>
            <li>Pagamenti in ritardo possono comportare sospensione del servizio</li>
          </ul>
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="font-semibold">Dati Bonifico:</p>
            <p className="text-muted-foreground">IBAN: IT46M0347501605CC0011118160</p>
            <p className="text-muted-foreground">Intestato a: Santus Simone</p>
            <p className="text-muted-foreground">Banca: Santander</p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">3. Consegna e Tempistiche</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Consegna standard: 3-5 giorni lavorativi</li>
            <li>Consegna rapida (24h): sovrapprezzo 50%</li>
            <li>Consegna tramite cartella condivisa Google Drive</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">4. Proprietà del Contenuto</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Il cliente mantiene piena proprietà dei contenuti originali e derivati</li>
            <li>ConsciusLabs può utilizzare esempi anonimizzati per portfolio (con permesso)</li>
            <li>Il cliente è responsabile dei diritti sui contenuti originali</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">5. Limitazioni</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Durata massima audio/video per progetto: 60 minuti</li>
            <li>Revisioni incluse: 1 round per deliverable</li>
            <li>Revisioni aggiuntive: €50/ora</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">6. Cancellazione</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Cancellazioni accettate entro 24h dal pagamento (rimborso totale)</li>
            <li>Dopo 24h: nessun rimborso, credito per lavori futuri</li>
            <li>Nessuna cancellazione dopo consegna primo draft</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">7. Responsabilità</h2>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>Responsabilità ConsciusLabs limitata all'importo pagato per il servizio</li>
            <li>Non responsabile per danni indiretti, consequenziali</li>
            <li>Il cliente assume piena responsabilità per l'uso dei contenuti</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">8. Legge Applicabile</h2>
          <p className="text-muted-foreground">Questi Termini sono regolati dalla legge italiana.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Contatti</h2>
          <p className="text-muted-foreground">Email: consciuslabs@gmail.com</p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
