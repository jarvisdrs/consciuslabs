import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ResultsSection } from "@/components/ResultsSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <ResultsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
