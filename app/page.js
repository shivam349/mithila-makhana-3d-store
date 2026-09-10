import HeroSection from '@/components/HeroSection';
import ProductShowcase from '@/components/ProductShowcase';
import BuildYourBox from '@/components/BuildYourBox';
import MakhanaSizeLab from '@/components/MakhanaSizeLab';
import NutritionVisualizer from '@/components/NutritionVisualizer';
import WhyMithilaSection from '@/components/WhyMithilaSection';
import FromMithilaToYourTable from '@/components/FromMithilaToYourTable';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFFDF9]">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. OUR ARTISAN MAKHANA COLLECTION */}
      <ProductShowcase />

      {/* 3. BUILD YOUR MAKHANA BOX (AOV Lever & Bundling) */}
      <BuildYourBox />

      {/* 4. MAKHANA GRADE GUIDE */}
      <MakhanaSizeLab />

      {/* 5. NUTRITION AT A GLANCE */}
      <NutritionVisualizer />

      {/* 6. MITHILA HERITAGE & GI PROVENANCE */}
      <WhyMithilaSection />

      {/* 7. FROM MITHILA TO YOUR TABLE (Farm-to-Table Journey) */}
      <FromMithilaToYourTable />

      {/* 8. CUSTOMER REVIEWS */}
      <TestimonialSection />

      {/* 9. FAQ */}
      <FAQSection />

      {/* 10. FINAL CTA */}
      <CTABanner />

      {/* 11. FOOTER */}
      <Footer />
    </main>
  );
}
