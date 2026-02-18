import { ThumbsUp, MessageCircle, Repeat2, Send } from 'lucide-react';

export function LinkedInPostMockup() {
  return (
    <div className="w-full max-w-[500px] mx-auto bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border">
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-sm">ConsciusLabs</h4>
            <span className="text-muted-foreground text-xs">• 2°</span>
          </div>
          <p className="text-xs text-muted-foreground">AI Content Lab</p>
          <p className="text-xs text-muted-foreground">12h • 🌐</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-sm leading-relaxed mb-3">
          Ho analizzato oltre 100 business B2B in crescita.\n\n
          La differenza tra chi scala e chi rimane fermo?\n\n
          <strong>I top performer non creano più contenuto — lo moltiplicano.</strong>\n\n
          1 video → 20+ asset ottimizzati per ogni piattaforma.\n\n
          Ecco i 3 errori che fanno fallire il 90% dei business online 👇
        </p>

        {/* Hashtags */}
        <div className="flex flex-wrap gap-1 text-xs text-primary">
          <span>#ContentMarketing</span>
          <span>#B2B</span>
          <span>#BusinessGrowth</span>
          <span>#ContentStrategy</span>
        </div>
      </div>

      {/* Image */}
      <div className="mx-4 mb-3 rounded-lg overflow-hidden border">
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 aspect-video flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-4xl font-bold text-gradient mb-2">90%</p>
            <p className="text-sm text-muted-foreground"> dei business fallisce su questi 3 errori</p>
            <div className="mt-4 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Scopri quali sono →
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-2 border-t border-b flex items-center justify-between text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">👍</div>
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">❤️</div>
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white">🎉</div>
          </div>
          <span>847 reazioni</span>
        </div>
        <div className="flex gap-3">
          <span>42 commenti</span>
          <span>18 condivisioni</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-2 py-1 flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground transition-colors">
          <ThumbsUp className="w-5 h-5" />
          <span className="hidden sm:inline">Consiglia</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground transition-colors">
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">Commenta</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground transition-colors">
          <Repeat2 className="w-5 h-5" />
          <span className="hidden sm:inline">Diffondi</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-secondary rounded-lg text-sm text-muted-foreground transition-colors">
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Invia</span>
        </button>
      </div>
    </div>
  );
}
