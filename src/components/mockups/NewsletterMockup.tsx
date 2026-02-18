export function NewsletterMockup() {
  return (
    <div className="w-full max-w-[500px] mx-auto bg-white rounded-lg shadow-lg overflow-hidden border">
      {/* Email Header */}
      <div className="bg-slate-50 dark:bg-slate-900 px-4 py-3 border-b flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <div className="flex-1 bg-white dark:bg-slate-800 rounded px-3 py-1 text-xs text-muted-foreground text-center">
          Newsletter ConsciusLabs — Oggetto: I 3 errori del content marketing
        </div>
      </div>

      {/* Email Content */}
      <div className="p-6">
        {/* Logo/Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
            <span className="font-bold text-lg">ConsciusLabs</span>
          </div>
          <span className="text-xs text-muted-foreground">18 Febbraio 2026</span>
        </div>

        {/* Subject */}
        <h2 className="text-xl font-bold mb-4">
          I 3 errori che fanno fallire il 90% dei business B2B online
        </h2>

        {/* Preview */}
        <p className="text-sm text-muted-foreground mb-4">
          Ciao [Nome],\n\n
          ho analizzato oltre 100 business B2B. La differenza tra chi scala e chi rimane fermo 
          si riduce a questi 3 errori. Evitali e sarai avanti al 90% dei tuoi competitor.
        </p>

        {/* Divider */}
        <hr className="my-4 border-t" />

        {/* Content Sections */}
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0 text-red-600 dark:text-red-400 font-bold text-sm">
              1
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Pubblicare lo stesso contenuto ovunque</h4>
              <p className="text-sm text-muted-foreground">
                Ogni piattaforma ha il suo linguaggio. LinkedIn ≠ Instagram ≠ X.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center flex-shrink-0 text-orange-600 dark:text-orange-400 font-bold text-sm">
              2
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Creare nuovo contenuto ogni giorno</h4>
              <p className="text-sm text-muted-foreground">
                1 video ben fatto vale più di 20 post frettolosi. Moltiplica, non moltiplicare lo sforzo.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0 text-yellow-600 dark:text-yellow-400 font-bold text-sm">
              3
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">Mancanza di consistenza</h4>
              <p className="text-sm text-muted-foreground">
                Postare "quando si ha tempo" non funziona. La frequenza batte la perfezione.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <div className="inline-block px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg font-medium">
            Scopri come trasformare 1 video in 20 contenuti →
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t text-center">
          <p className="text-xs text-muted-foreground">
            ConsciusLabs — L'AI Content Lab che Amplifica le Tue Idee\n
            <a href="#" className="text-primary">consciuslabs.com</a>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <a href="#" className="underline">Disiscriviti</a> | 
            <a href="#" className="underline">Aggiorna preferenze</a>
          </p>
        </div>
      </div>
    </div>
  );
}
