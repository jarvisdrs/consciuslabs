import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = ["Come Funziona", "Servizi", "Risultati", "Contatti"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <span className="text-xl font-bold font-display text-gradient cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          ConsciusLabs
        </span>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item.toLowerCase().replace(/ /g, "-"))}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item}
            </button>
          ))}
          <Button variant="hero" size="sm" onClick={() => scrollTo("contatti")}>
            Richiedi Demo
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(/ /g, "-"))}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                >
                  {item}
                </button>
              ))}
              <Button variant="hero" size="sm" onClick={() => scrollTo("contatti")}>
                Richiedi Demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
