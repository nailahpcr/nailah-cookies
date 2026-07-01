import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';

export default function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              CendekiaBook
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#fitur" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Fitur
            </a>
            <a href="#harga" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Harga
            </a>
            <a href="#faq" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              FAQ
            </a>
          </div>

          {/* Secondary CTA Button */}
          <Link
            to="/login"
            className="hidden md:inline-block px-6 py-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Masuk ke Aplikasi
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <a
              href="#fitur"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fitur
            </a>
            <a
              href="#harga"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Harga
            </a>
            <a
              href="#faq"
              className="block py-2 text-gray-700 hover:text-blue-600 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <Link
              to="/login"
              className="block mt-4 px-6 py-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg text-center hover:bg-blue-50 transition-colors"
            >
              Masuk ke Aplikasi
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
