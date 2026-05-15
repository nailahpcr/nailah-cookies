import StatCard from '../components/StatCard';
import { Users, ShoppingBag, TrendingUp, AlertCircle } from 'lucide-react';

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Ringkasan Bisnis</h1>
          <p className="text-gray-500">Data performa toko Anda hari ini.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700">
          Download Laporan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pelanggan" value="1,284" icon={<Users size={20} />} trend="+12%" color="bg-blue-500" />
        <StatCard title="Penjualan Hari Ini" value="Rp 4.250.000" icon={<ShoppingBag size={20} />} trend="+5%" color="bg-green-500" />
        <StatCard title="Tingkat Konversi" value="3.2%" icon={<TrendingUp size={20} />} trend="-0.4%" color="bg-purple-500" />
        <StatCard title="Stok Menipis" value="12" icon={<AlertCircle size={20} />} color="bg-red-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400 italic">
          [Grafik Penjualan Akan Muncul Di Sini]
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64 flex items-center justify-center text-gray-400 italic">
          [Daftar Aktivitas Terbaru]
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;