import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import FromMithilaSection from '@/components/FromMithilaSection';
import FarmToProductJourney from '@/components/FarmToProductJourney';
import BenefitsSection from '@/components/BenefitsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <FromMithilaSection />
      <FarmToProductJourney />
      <BenefitsSection />
      <TestimonialSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
