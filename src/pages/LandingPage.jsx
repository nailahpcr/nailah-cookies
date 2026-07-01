import LandingNavbar from '../components/LandingNavbar';
import HeroSection from '../components/HeroSection';

export default function LandingPage() {
  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Placeholder sections untuk PRD v2 dan v3 */}
      <div id="fitur" className="h-20"></div>
      <div id="harga" className="h-20"></div>
      <div id="faq" className="h-20"></div>
    </div>
  );
}
