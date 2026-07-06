import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center">
        {/* Value Proposition */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
          Ubah pengelolaan pelanggan bisnis Anda menjadi lebih cerdas dan terstruktur sekarang.
        </h2>

        {/* Description */}
        <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
          Ratusan UMKM telah merasakan peningkatan efisiensi bisnis mereka. Bergabunglah dengan komunitas CendekiaBook hari ini.
        </p>

        {/* Primary CTA Button */}
        <Link
          to="/register"
          className="inline-flex items-center justify-center px-8 sm:px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
        >
          Mulai Gratis Sekarang
          <ArrowRight className="ml-3 w-6 h-6" />
        </Link>

        {/* Subtext */}
        <p className="mt-6 text-sm text-blue-100">
          ✓ Tidak perlu kartu kredit • ✓ Setup hanya 5 menit • ✓ Akses penuh ke fitur dasar
        </p>
      </div>
    </section>
  );
}
