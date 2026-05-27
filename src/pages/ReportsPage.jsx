// src/pages/ReportsPage.jsx
import PageLayout from '../components/PageLayout';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import StatCard from '../components/StatCard';
import SalesActivityChart from '../components/SalesActivityChart';

import { transactions } from '../data/transactions';

export default function ReportsPage() {
  return (
    <PageLayout>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#F5F6FA] p-6 space-y-6">
          <Header title="Laporan Analisis Pertumbuhan Bisnis" />

          {/* REUSABLE COMPONENT STATCARD (Data Tahunan) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Omzet Tahunan" value="$1.2M" icon="💹" trend="+24% Naik dari 2025" trendType="up" />
            <StatCard title="Akuisisi Member Baru" value="12,450" icon="👥" trend="+12% Lebih Loyal" trendType="up" />
            <StatCard title="Biaya Operasional Logistik" value="$34,000" icon="📦" trend="-2.1% Hemat Biaya" trendType="down" />
          </div>

          {/* REUSABLE COMPONENT SALES ACTIVITY CHART */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">Grafik Realisasi Kinerja Toko (2026)</h2>
              <p className="text-xs text-gray-400 font-semibold">Data pergerakan total omzet bulanan hasil rekapitulasi database CRM</p>
            </div>
            <div className="w-full">
              <SalesActivityChart />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}