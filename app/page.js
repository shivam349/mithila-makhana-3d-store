import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import ChooseYourMakhana from '@/components/ChooseYourMakhana';
import MakhanaSizeLab from '@/components/MakhanaSizeLab';
import BuildYourBox from '@/components/BuildYourBox';
import NutritionVisualizer from '@/components/NutritionVisualizer';
import TasteJourney from '@/components/TasteJourney';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FromMithilaToYourTable from '@/components/FromMithilaToYourTable';
import TestimonialSection from '@/components/TestimonialSection';
import CinematicMithilaStory from '@/components/CinematicMithilaStory';
import WhyMithilaSection from '@/components/WhyMithilaSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      <Navigation />
      <HeroSection />
      <ProductShowcase />
      <ChooseYourMakhana />
      <MakhanaSizeLab />
      <BuildYourBox />
      <NutritionVisualizer />
      <TasteJourney />
      
      {/* Harmonized UI/UX Sequence: Why Choose -> From Mithila to Your Table -> Customer Reviews */}
      <WhyChooseUsSection />
      <FromMithilaToYourTable />
      <TestimonialSection />

      <CinematicMithilaStory />
      <WhyMithilaSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
