import { useState } from "react";
import { Linkedin, Twitter, Instagram, Send } from "lucide-react";

const links = {
  Servizi: ["Content Multiplication", "Workflow Automation", "Multi-Platform", "Brand Consistency"],
  "Chi Siamo": ["Il Team", "La Mission"],
  Supporto: ["Contatti", "Pricing", "FAQ"],
};

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/ConsciusLabs", label: "X" },
  { icon: Instagram, href: "https://www.instagram.com/consciuslabs/", label: "Instagram" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img 
                src="/logo.png" 
                alt="ConsciusLabs Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold font-display text-gradient">ConsciusLabs</span>
            </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
              L'AI Content Lab che trasforma i tuoi video in decine di contenuti ottimizzati.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Email: <a href="mailto:consciuslabs@gmail.com" className="hover:text-foreground transition-colors">consciuslabs@gmail.com</a>
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold font-display mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-border pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-sm font-semibold font-display mb-3">Iscriviti alla Newsletter</h4>
            {subscribed ? (
              <p className="text-sm text-accent">✓ Iscritto con successo!</p>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="La tua email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} ConsciusLabs. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
