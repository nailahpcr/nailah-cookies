import { BarChart3, Users, AlertTriangle } from 'lucide-react';

export default function FeatureSection() {
  const features = [
    {
      id: 1,
      icon: BarChart3,
      title: "Analitik Penjualan Real-Time",
      description: "Pantau total sales, total order, dan grafik metrik pertumbuhan bisnis Anda dalam satu dasbor terintegrasi.",
      mockupPlaceholder: "Dashboard Preview"
    },
    {
      id: 2,
      icon: Users,
      title: "Manajemen Data Pelanggan",
      description: "Kelola data kontak, riwayat transaksi, dan tingkatkan loyalitas pelanggan dengan sistem tiering yang rapi.",
      mockupPlaceholder: "Customers Preview"
    },
    {
      id: 3,
      icon: AlertTriangle,
      title: "Peringatan Stok Otomatis",
      description: "Sistem alert pintar yang otomatis mengingatkan Anda saat kuantitas stok produk atau komoditas toko mulai menipis.",
      mockupPlaceholder: "Stock Alert Preview"
    }
  ];

  return (
    <section className="py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Fitur Unggulan CendekiaBook
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Solusi CRM lengkap untuk mengelola bisnis Anda dengan lebih efisien dan terukur
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
              >
                {/* Icon */}
                <div className="mb-4 inline-block">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Mini Mockup Container */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl mb-2">📦</div>
                      <p className="text-gray-600 font-medium text-sm">{feature.mockupPlaceholder}</p>
                      <p className="text-gray-500 text-xs mt-1">Mockup akan ditampilkan di sini</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
