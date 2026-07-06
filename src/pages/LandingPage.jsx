import React, { useState, useEffect } from 'react';
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

const promoBanners = [
  {
    id: 1,
    tag: "PROMO BUNDLE",
    title: "Paket Hemat Belajar Cendekia Pintar",
    desc: "Diskon 15% untuk pembelian bundle alat tulis + buku kurikulum merdeka SD/SMP/SMA.",
    bg: "from-[#1E2A44] to-[#B23A2E]"
  },
  {
    id: 2,
    tag: "TAHUN AJARAN BARU",
    title: "Back to School Special Deal 2026",
    desc: "Potongan langsung Rp 50.000 untuk pembelian buku cetak pelajaran sekolah paket lengkap.",
    bg: "from-[#B23A2E] to-[#B8892B]"
  },
  {
    id: 3,
    tag: "UPCOMING PRE-ORDER",
    title: "Kitab Tafsir Jalalain Edisi Lux 2026",
    desc: "Pre-order dibuka 15 Juli 2026 dengan kuota terbatas! Dapatkan bonus rehal kayu eksklusif.",
    bg: "from-[#3E6E5E] to-[#1E2A44]"
  }
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoBanners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-white relative text-left">
      {/* Splash Cursor background simulation */}
      <SplashCursor />

      {/* Navbar */}
      <LandingNavbar />

      {/* Auto-sliding Banner Section */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${promoBanners[currentSlide].bg} text-white p-8 shadow-lg transition-all duration-700 ease-in-out`}>
          <div className="absolute right-6 bottom-0 text-8xl opacity-10 font-bold select-none tracking-tighter">
            Cendekia
          </div>
          <div className="relative z-10 space-y-3 max-w-xl">
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {promoBanners[currentSlide].tag}
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight transition-all">
              {promoBanners[currentSlide].title}
            </h2>
            <p className="text-xs md:text-sm text-gray-100 font-medium">
              {promoBanners[currentSlide].desc}
            </p>
          </div>
          {/* Dots Indicator */}
          <div className="absolute bottom-4 right-6 flex gap-2">
            {promoBanners.map((_, idx) => (
              <span 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all ${currentSlide === idx ? 'bg-white scale-125' : 'bg-white/40'}`}
              ></span>
            ))}
          </div>
        </div>
      </div>


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