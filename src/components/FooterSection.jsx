import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-white">CendekiaBook</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Platform CRM modern untuk mengelola pelanggan dan bisnis Anda dengan lebih efisien.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <span className="text-gray-400">Pekanbaru, Indonesia</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <a href="mailto:support@cendekiabook.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                  support@cendekiabook.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-400" />
                <a href="tel:+6212345678900" className="text-gray-400 hover:text-blue-400 transition-colors">
                  +62 (123) 456-7890
                </a>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold mb-6">Produk</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/customers" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Manajemen Pelanggan
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Manajemen Produk
                </Link>
              </li>
              <li>
                <Link to="/loyalty" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Program Loyalitas
                </Link>
              </li>
            </ul>
          </div>


          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Perusahaan</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Karir
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm text-gray-400">
              © {currentYear} CendekiaBook. All rights reserved.
            </p>
          </div>

          {/* Social Links (Optional) */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              LinkedIn
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
