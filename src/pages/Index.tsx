import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CaseStudySection } from "@/components/CaseStudySection";
import { CaseStudiesSection } from "@/components/CaseStudiesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { ServicesSection } from "@/components/ServicesSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorksSection />
      <ServicesSection />
      <CaseStudySection />
      <CaseStudiesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
