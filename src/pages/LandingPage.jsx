import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';
import FooterSection from '../components/FooterSection';

export default function LandingPage() {
  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Feature Section - PRD v2 */}
      <FeatureSection />

      {/* FAQ Section - PRD v3 */}
      <FAQSection />

      {/* Final CTA Section - PRD v3 */}
      <FinalCTASection />

      {/* Footer Section - PRD v3 */}
      <FooterSection />
    </div>
  );
}
