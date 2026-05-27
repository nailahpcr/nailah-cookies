// src/pages/DashboardPage.jsx
import { useState, useEffect } from 'react';
import StatCard from '../components/StatCard';
import StockAlert from '../components/StockAlert';
import WhatsAppButton from '../components/WhatsAppButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SalesActivityChart from '../components/SalesActivityChart'; // Sudah diimport dengan benar 👍

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('October'); // State untuk kontrol dropdown bulan

  useEffect(() => {
    // Simulasi loading state agar komponen LoadingSpinner terpakai
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

      {/* Grid untuk Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value="40,689" icon="👥" trend="+8.5% Up from yesterday" trendType="up" />
        <StatCard title="Total Order" value="10,293" icon="📦" trend="+1.3% Up from past week" trendType="up" />
        <StatCard title="Total Sales" value="$89,000" icon="💹" trend="-4.3% Down from yesterday" trendType="down" />
        <StatCard title="Total Pending" value="2,040" icon="⏳" trend="+1.8% Up from yesterday" trendType="up" />
      </div>

      {/* Baris Alert Utama & Detail Penjualan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        
        {/* Kolom Grafik (Lebar 2/3 Halaman) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          
          {/* Header Grafik: Judul & Dropdown  */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Sales Details</h2>
            
            {/* Dropdown Pemilih Bulan */}
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 
              focus:outline-none focus:border-[#4880FF] cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <option value="January">January</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* 🌟 PENERAPAN GRAFIK ASLI FIGMA RECHARTS */}
          <SalesActivityChart />
          
        </div>

        {/* Kolom Kanan (Lebar 1/3 Halaman): Penerapan Komponen StockAlert */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col space-y-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">System Alerts</h2>
          <div className="space-y-3 flex-1 overflow-y-auto">
            <StockAlert item="Kertas Thermal Struk" currentStock={3} />
            <StockAlert item="Ribbon Printer" currentStock={1} />
          </div>
        </div>
      </div>

      {/* Float Action WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton phoneNumber="628123456789" message="Halo Admin DashStack, saya butuh bantuan." />
      </div>
    </div>
  );
}