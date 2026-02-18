import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Come Funziona", href: "/#come-funziona" },
  { label: "Servizi", href: "/servizi" },
  { label: "Chi Siamo", href: "/chi-siamo" },
  { label: "Supporto", href: "/supporto" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-total-black border-b border-border/20">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img 
            src="/logo.png" 
            alt="ConsciusLabs Logo" 
            className="h-8 w-auto"
          />
          <span className="text-xl font-bold font-display text-gradient">ConsciusLabs</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => {
                if (item.href.startsWith("/#")) {
                  const id = item.href.replace("/#", "");
                  setTimeout(() => scrollTo(id), 100);
                }
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/preventivo">
            <Button variant="hero" size="sm">
              Richiedi Preventivo
            </Button>
          </Link>
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
            className="md:hidden bg-total-black border-t border-border"
          >
            <div className="flex flex-col gap-4 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    setOpen(false);
                    if (item.href.startsWith("/#")) {
                      const id = item.href.replace("/#", "");
                      setTimeout(() => scrollTo(id), 100);
                    }
                  }}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/preventivo" onClick={() => setOpen(false)}>
                <Button variant="hero" size="sm" className="w-full">
                  Richiedi Preventivo
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
