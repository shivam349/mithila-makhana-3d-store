import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import ChooseYourMakhana from '@/components/ChooseYourMakhana';
import BuildYourBox from '@/components/BuildYourBox';
import MakhanaSizeLab from '@/components/MakhanaSizeLab';
import NutritionVisualizer from '@/components/NutritionVisualizer';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import FromMithilaToYourTable from '@/components/FromMithilaToYourTable';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import WhyMithilaSection from '@/components/WhyMithilaSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. OUR ARTISAN MAKHANA COLLECTION */}
      <ProductShowcase />

      {/* 3. CHOOSE YOUR MAKHANA */}
      <ChooseYourMakhana />

      {/* 4. BUILD YOUR MAKHANA BOX */}
      <BuildYourBox />

      {/* 5. MAKHANA GRADE GUIDE */}
      <MakhanaSizeLab />

      {/* 6. NUTRITION AT A GLANCE */}
      <NutritionVisualizer />

      {/* 7. WHY CHOOSE MITHILA MAKHANA */}
      <WhyChooseUsSection />

      {/* 8. FROM MITHILA TO YOUR TABLE */}
      <FromMithilaToYourTable />

      {/* 9. CUSTOMER REVIEWS */}
      <TestimonialSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. MITHILA STORY */}
      <WhyMithilaSection />

      {/* 12. FINAL CTA */}
      <CTABanner />

      {/* 13. FOOTER */}
      <Footer />
    </main>
  );
}
