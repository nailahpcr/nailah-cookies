// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'; 
import StatCard from '../components/StatCard';
import StockAlert from '../components/StockAlert';
import WhatsAppButton from '../components/WhatsAppButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SalesActivityChart from '../components/SalesActivityChart'; 

// Data Segmentasi Pelanggan berdasarkan gambar asli
const customerSegments = [
  { name: 'Orang Tua Murid', value: 450, color: '#A63A2B' },  
  { name: 'Mahasiswa / Umum', value: 350, color: '#1E293B' }, 
  { name: 'Santri', value: 280, color: '#B48424' },            
  { name: 'Institusi (B2B)', value: 168, color: '#336655' },   
];

const totalCustomers = customerSegments.reduce((sum, item) => sum + item.value, 0);

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('Oktober');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-[#F5F6FA] min-h-screen relative">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
      </div>

      {/* Grid untuk Statistik Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pengguna" value="40.689" icon="👥" trend="+8.5% Naik dari kemarin" trendType="up" />
        <StatCard title="Total Pesanan" value="10.293" icon="📦" trend="+1.3% Naik dari minggu lalu" trendType="up" />
        <StatCard title="Total Penjualan" value="Rp 89.000.000" icon="💹" trend="-4.3% Turun dari kemarin" trendType="down" />
        <StatCard title="Total Tertunda" value="2.040" icon="⏳" trend="+1.8% Naik dari kemarin" trendType="up" />
      </div>

      {/* Baris Utama: Grafik Penjualan & Peringatan Stok */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Kolom Grafik Pendapatan */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Detail Pendapatan</h2>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#4880FF] cursor-pointer"
            >
              <option value="Januari">Januari</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="Desember">Desember</option>
            </select>
          </div>
          <SalesActivityChart />
        </div>

        {/* Kolom Peringatan Stok */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Peringatan Sistem</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            <StockAlert item="Kertas Thermal Struk" currentStock={3} />
            <StockAlert item="Ribbon Printer" currentStock={1} />
            <StockAlert item="Buku Panduan Santri/Murid" currentStock={5} />
          </div>
        </div>
      </div>

      {/* Baris Baru: Donut Chart Segmentasi Pelanggan (Tanpa Sub-judul) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          
          <div className="flex-1 w-full">
            {/* Judul langsung tanpa tulisan strategi / akuisisi */}
            <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-4">Segmentasi Pelanggan</h2>
            
            {/* Legend / Keterangan Warna */}
            <div className="space-y-3">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: segment.color }}></span>
                    <span className="font-medium text-gray-700">{segment.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{segment.value} pelanggan</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sisi Donut Chart */}
          <div className="w-56 h-56 relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}  
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            
            <div className="absolute text-center select-none pointer-events-none">
              <span className="block text-2xl font-bold text-gray-900 tracking-tight">{totalCustomers.toLocaleString('id-ID')}</span>
              <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Pelanggan</span>
            </div>
          </div>

        </div>

        {/* Kolom widget tambahan sebelah kanan */}
        <div className="hidden lg:block bg-gradient-to-br from-[#4880FF]/5 to-[#4880FF]/10 p-6 rounded-2xl border border-dashed border-[#4880FF]/20 flex items-center justify-center text-center">
          <p className="text-sm font-medium text-[#4880FF]">Gunakan area ini untuk widget performa atau log aktivitas tambahan.</p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton phoneNumber="628123456789" message="Halo Admin DashStack, saya butuh bantuan mengenai sistem." />
      </div>
    </div>
  );
}