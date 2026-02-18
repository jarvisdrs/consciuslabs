import { Play, Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

export function ReelMockup() {
  return (
    <div className="w-[200px] mx-auto">
      {/* Phone Frame */}
      <div className="bg-black rounded-[2rem] p-2 shadow-2xl">
        <div className="bg-black rounded-[1.5rem] overflow-hidden aspect-[9/16] relative">
          {/* Video Content */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-black/30 to-black/80 flex items-center justify-center">
            <div className="text-center px-4">
              <p className="text-white font-bold text-lg leading-tight mb-2">
                3 ERRORI che\nFANNO FAILire\nil tuo business B2B
              </p>
              <div className="inline-block px-3 py-1 bg-white/20 rounded-full">
                <p className="text-white text-xs">Guarda fino alla fine 👇</p>
              </div>
            </div>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white ml-1" />
            </div>
          </div>

          {/* UI Elements */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
            <span className="text-white/80 text-sm font-medium">Reels</span>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20" />
              <div className="w-8 h-8 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="absolute right-3 bottom-24 flex flex-col gap-4">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs">2.4K</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs">89</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <Send className="w-6 h-6 text-white" />
              </div>
              <span className="text-white text-xs">156</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
              <span className="text-white text-sm font-medium">consciuslabs</span>
            </div>
            <div className="bg-black/50 rounded-lg p-2 mb-2">
              <p className="text-white text-xs">Scopri il metodo che usa il 90% dei top performer 🚀</p>
            </div>
            <div className="flex items-center gap-2 text-white/60 text-xs">
              <div className="w-4 h-4 rounded-full bg-gray-600" />
              <span>Musica originale</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div className="h-full bg-white w-1/3" />
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-3">Reel Instagram (0:28)</p>
    </div>
  );
}
