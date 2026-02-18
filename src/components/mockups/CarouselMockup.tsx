import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    number: "01",
    title: "L'errore #1",
    content: "Pubblicare lo stesso contenuto su tutte le piattaforme senza adattarlo al formato nativo.",
    highlight: "Ogni piattaforma ha il suo linguaggio."
  },
  {
    number: "02", 
    title: "L'errore #2",
    content: "Creare contenuto nuovo ogni giorno invece di sfruttare ciò che hai già prodotto.",
    highlight: "1 video = 20+ contenuti."
  },
  {
    number: "03",
    title: "L'errore #3", 
    content: "Mancanza di consistenza. Postare solo quando 'si ha tempo'.",
    highlight: "La frequenza batte la perfezione."
  },
  {
    number: "✓",
    title: "La Soluzione",
    content: "ConsciusLabs trasforma i tuoi contenuti esistenti in asset ottimizzati per ogni piattaforma.",
    highlight: "48h. Zero sforzo. Massimo risultato."
  }
];

export function CarouselMockup() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full max-w-[400px] mx-auto">
      {/* Phone Frame */}
      <div className="bg-black rounded-[2rem] p-2 shadow-2xl">
        <div className="bg-gradient-to-br from-purple-900 to-slate-900 rounded-[1.5rem] overflow-hidden aspect-square relative">
          {/* Header */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
              <span className="text-white text-sm font-medium">consciuslabs</span>
            </div>
            <span className="text-white/60 text-xs">{currentSlide + 1}/4</span>
          </div>

          {/* Slide Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <span className="text-6xl font-bold text-white/20 mb-4">
              {slides[currentSlide].number}
            </span>
            <h3 className="text-2xl font-bold text-white mb-4">
              {slides[currentSlide].title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              {slides[currentSlide].content}
            </p>
            <div className="inline-block px-4 py-2 bg-accent/20 border border-accent/30 rounded-full">
              <p className="text-accent text-sm font-medium">
                {slides[currentSlide].highlight}
              </p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-3">Carosello Instagram/LinkedIn (4 slide)</p>
    </div>
  );
}
