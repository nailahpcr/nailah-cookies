import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import { ShuffleHero } from '../components/ui/shuffle-grid';
import SplashCursor from '../components/ui/SplashCursor';
import CircularGallery from '../components/ui/CircullarGallery';
import FeatureSection from '../components/FeatureSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import FooterSection from '../components/FooterSection';

const catalogItems = [
  { image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400", text: "Buku Novel" },
  { image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&q=80&w=400", text: "Sastra & Puisi" },
  { image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400", text: "Buku Anak" },
  { image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400", text: "Kitab Islam" },
  { image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400", text: "Alat Tulis" },
  { image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400", text: "Kamus Bahasa" }
];

export default function LandingPage() {
  return (
    <div className="w-full bg-white relative">
      {/* Splash Cursor background simulation */}
      <SplashCursor />

      {/* Navbar */}
      <LandingNavbar />



      {/* Shuffle Grid Showcase */}
      <ShuffleHero />

      {/* Feature Section - PRD v2 */}
      <FeatureSection />

      {/* 3D Catalog Showcase */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden select-none">
        <div className="max-w-6xl mx-auto px-8 mb-12 text-center relative z-10">
          <span className="text-xs md:text-sm font-extrabold uppercase tracking-widest text-blue-400">
            Katalog Populer 3D
          </span>
          <h2 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
            Eksplorasi Koleksi Terbaik Kami
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto mt-4 leading-relaxed">
            Drag/geser galeri melingkar di bawah ini untuk melihat koleksi kategori buku dan alat tulis unggulan CendekiaBook.
          </p>
        </div>
        
        <div className="relative w-full h-[500px] overflow-hidden select-none z-10">
          <CircularGallery 
            items={catalogItems} 
            bend={2.5} 
            textColor="#ffffff" 
            borderRadius={0.06} 
            scrollEase={0.03}
          />
        </div>
      </section>

      {/* FAQ Section - PRD v3 */}
      <FAQSection />

      {/* Final CTA Section - PRD v3 */}
      <FinalCTASection />

      {/* Footer Section - PRD v3 */}
      <FooterSection />
    </div>
  );
}