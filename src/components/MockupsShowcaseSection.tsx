import { motion } from 'framer-motion';
import { ReelMockup, LinkedInPostMockup, CarouselMockup, NewsletterMockup } from './mockups';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function MockupsShowcaseSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Esempi Reali
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-display mt-4 mb-4">
              Cosa ricevi <span className="text-gradient">esattamente</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ecco gli esempi realistici dei contenuti che creiamo partendo dal tuo video.
              <br />
              Click e interagisci con i mockup!
            </p>
          </motion.div>
        </div>

        {/* Mockups Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-background rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-center">Reels/Shorts Verticali</h3>
                <ReelMockup />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-background rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-center">Post LinkedIn</h3>
                <LinkedInPostMockup />
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-background rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-center">Caroselli Multi-Step</h3>
                <CarouselMockup />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="bg-background rounded-2xl p-6 border">
                <h3 className="text-lg font-semibold mb-4 text-center">Newsletter Email</h3>
                <NewsletterMockup />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="gradient-button" asChild>
            <a href="/preventivo">
              Ottieni contenuti come questi
              <ArrowRight className="ml-2" size={18} />
            </a>
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Consegna in 48 ore • Formati pronti da pubblicare
          </p>
        </motion.div>
      </div>
    </section>
  );
}
