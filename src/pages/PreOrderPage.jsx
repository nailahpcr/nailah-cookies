// src/pages/PreOrderPage.jsx
import { useState } from 'react';
import SegmentFilter from '../components/SegmentFilter';
import OrderTimeline from '../components/OrderTimeline';
import FeedbackCard from '../components/FeedbackCard';

// Mock Data Antrean PO
const initialPOOrders = [
  { id: 'PO-7721', customer: 'Rian Anggara', Product: 'CRM Module Premium v2', date: '25 May 2026', dp: 'Rp 500,000', status: 'Produksi' },
  { id: 'PO-7722', customer: 'Siti Aminah', Product: 'Hardware Server Mini Stack', date: '26 May 2026', dp: 'Rp 2,500,000', status: 'Q&A Check' },
  { id: 'PO-7723', customer: 'Budi Santoso', Product: 'CRM Module Premium v2', date: '27 May 2026', dp: 'Rp 500,000', status: 'Selesai' },
];

export default function PreOrderPage() {
  const [activeTab, setActiveTab] = useState('Semua');

  // Struktur alur pabrik untuk disalurkan ke komponen OrderTimeline
  const factorySteps = [
    { title: 'Pengumpulan Pendanaan DP', time: '10 Mei 2026, 09:00 WIB', done: true },
    { title: 'Proses Perakitan & Produksi Massal', time: '18 Mei 2026, 14:00 WIB', done: true },
    { title: 'Pengecekan Kualitas Akhir (QC)', time: 'Sedang Berjalan', done: false },
    { title: 'Pengiriman Ke Kurir Internal', time: 'Belum Dimulai', done: false }
  ];

  const filteredOrders = initialPOOrders.filter(order => {
    if (activeTab === 'Semua') return true;
    return order.status === activeTab;
  });

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pre-Order Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola daftar pesanan komitmen awal/inden rilis produk baru.</p>
      </div>

      {/* Filter Segmentasi Antrean */}
      <SegmentFilter 
        options={['Semua', 'Produksi', 'Q&A Check', 'Selesai']} 
        activeSegment={activeTab} 
        onSelect={setActiveTab} 
      />

      {/* Grid Layout Konten */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri & Tengah: Tabel Antrean PreOrder */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">ID PO</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Pelanggan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Produk Inden</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Uang Muka (DP)</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tahapan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-[#4880FF]">{order.id}</td>
                  <td className="py-4 px-6 text-sm font-bold text-gray-800">{order.customer}</td>
                  <td className="py-4 px-6 text-sm text-gray-500">{order.Product}</td>
                  <td className="py-4 px-6 text-sm font-extrabold text-gray-900">{order.dp}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                      order.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                      order.status === 'Q&A Check' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Kolom Kanan: Pelacakan Manufaktur Pabrik & Kotak Suara Konsumen */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Implementasi Komponen OrderTimeline */}
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-base">Alur Produksi Manufaktur</h3>
            <OrderTimeline steps={factorySteps} />
          </div>

          {/* Implementasi Komponen FeedbackCard untuk Catatan Khusus PO */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Catatan Suara Konsumen PO</h3>
            <FeedbackCard 
              user="Rian Anggara (PO-7721)" 
              rating={4} 
              comment="Mohon agar proses perakitan dicek teliti ya min, tidak apa lambat sedikit yang penting aman." 
            />
          </div>

        </div>

      </div>
    </div>
  );
}
