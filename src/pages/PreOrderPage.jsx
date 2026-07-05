import { useState } from 'react';
import { productsData } from '../data/productsData'; // 🌟 Sinkronisasi data katalog pusat
import SegmentFilter from '../components/SegmentFilter';
import OrderTimeline from '../components/OrderTimeline';
import FeedbackCard from '../components/FeedbackCard';
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table"; // 🌟 Penggunaan komponen Tabel seragam

const initialPOOrders = [
  { id: 'PO-7721', customer: 'Rian Anggara', productId: 'PO-001', Product: 'CRM Module Premium v2', date: '25 May 2026', dp: 'Rp 500,000', status: 'Produksi' },
  { id: 'PO-7722', customer: 'Siti Aminah', productId: 'PO-002', Product: 'Hardware Server Mini Stack', date: '26 May 2026', dp: 'Rp 2,500,000', status: 'Q&A Check' },
  { id: 'PO-7723', customer: 'Budi Santoso', productId: 'PO-001', Product: 'CRM Module Premium v2', date: '27 May 2026', dp: 'Rp 500,000', status: 'Selesai' },
];

export default function PreOrderPage() {
  const [activeTab, setActiveTab] = useState('Semua');

  const factorySteps = [
    { title: 'Pengumpulan Pendanaan DP', time: '10 Mei 2026, 09:00 WIB', done: true },
    { title: 'Proses Perakitan & Produksi Massal', time: '18 Mei 2026, 14:00 WIB', done: true },
    { title: 'Pengecekan Kualitas Akhir (QC)', time: 'Sedang Berjalan', done: false },
    { title: 'Pengiriman Ke Kurir Internal', time: 'Belum Dimulai', done: false }
  ];

  // Hitung Data Statistik Ringkasan Dinamis (User-Friendly Improvement)
  const totalOrders = initialPOOrders.length;
  const inProduction = initialPOOrders.filter(o => o.status === 'Produksi' || o.status === 'Q&A Check').length;
  const isDone = initialPOOrders.filter(o => o.status === 'Selesai').length;

  const filteredOrders = initialPOOrders.filter(order => {
    if (activeTab === 'Semua') return true;
    return order.status === activeTab;
  });

  const getProductName = (productId, fallbackName) => {
    const product = productsData.find(p => p.id === productId);
    return product ? product.name : fallbackName;
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-8 font-sans">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pre-Order Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola daftar pesanan komitmen awal/inden rilis produk baru.</p>
      </div>

      {/* METRIC STATS CARDS BLOCK */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Antrean PO</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{totalOrders} Antrean</h3>
          </div>
          <span className="text-2xl bg-blue-50 p-3 rounded-xl">📦</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sedang Diproses</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{inProduction} Antrean</h3>
          </div>
          <span className="text-2xl bg-amber-50 p-3 rounded-xl">⚙️</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Siap Dikirim</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{isDone} Transaksi</h3>
          </div>
          <span className="text-2xl bg-emerald-50 p-3 rounded-xl">✅</span>
        </div>
      </div>

      {/* LAYOUT UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* TABEL ANTRIAN UTAMA */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-base font-bold text-gray-800">📋 Daftar Antrean Masuk</h3>
            <div className="bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
              <SegmentFilter 
                options={['Semua', 'Produksi', 'Q&A Check', 'Selesai']} 
                activeSegment={activeTab} 
                onSelect={setActiveTab} 
              />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <Table>
              <TableHeader className="bg-gray-50/80">
                <TableRow>
                  <TableHead className="py-4 px-6 font-bold text-gray-400">ID PO</TableHead>
                  <TableHead className="font-bold text-gray-400">Pelanggan</TableHead>
                  <TableHead className="font-bold text-gray-400">Produk Inden</TableHead>
                  <TableHead className="font-bold text-gray-400">Uang Muka (DP)</TableHead>
                  <TableHead className="font-bold text-gray-400 text-center">Tahapan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="py-4 px-6 font-medium text-[#4880FF] text-xs">{order.id}</TableCell>
                    <TableCell className="font-bold text-gray-800">{order.customer}</TableCell>
                    <TableCell className="text-gray-500">{getProductName(order.productId, order.Product)}</TableCell>
                    <TableCell className="font-extrabold text-gray-900">{order.dp}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold inline-block border ${
                        order.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-100' :
                        order.status === 'Q&A Check' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                        'bg-blue-50 text-blue-700 border-blue-100'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* TIMELINE & FEEDBACK SIDEBAR */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-base">Alur Produksi Manufaktur</h3>
            <OrderTimeline steps={factorySteps} />
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Catatan Suara Konsumen PO</h3>
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