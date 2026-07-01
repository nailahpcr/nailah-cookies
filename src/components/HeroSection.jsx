import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Pre-title */}
          <div className="inline-block">
            <span className="text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full">
              ✨ Platform CRM Modern untuk Bisnis Anda
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight">
            Kelola Pelanggan Dengan <span className="text-blue-600">Lebih Mudah</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
            CendekiaBook membantu Anda mengelola pelanggan, transaksi, dan loyalitas pelanggan dalam satu platform terintegrasi. Tingkatkan efisiensi bisnis Anda mulai hari ini.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            {/* Primary CTA */}
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Mulai Gratis Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            {/* Secondary CTA */}
            <a
              href="#fitur"
              className="inline-flex items-center justify-center px-8 py-4 text-gray-700 font-semibold border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>

        {/* Right Visual Placeholder */}
        <div className="lg:flex hidden items-center justify-center">
          <div className="w-full h-96 bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-blue-200 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">📊</div>
              <p className="text-gray-600 font-medium">Placeholder untuk Visual/Mockup</p>
              <p className="text-gray-500 text-sm mt-2">Dashboard Preview akan ditampilkan di sini</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
