// src/pages/PreOrderPage.jsx
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
  { 
    id: 'PO-7721', 
    customer: 'Rian Anggara', 
    phone: '628123456789',
    productId: 'PO-001', 
    Product: 'CRM Module Premium v2', 
    date: '25 May 2026', 
    dp: 'Rp 500,000', 
    totalPrice: 'Rp 1,500,000',
    status: 'Produksi',
    progress: 45,
    customNote: 'Mohon agar proses perakitan dicek teliti ya min, tidak apa lambat sedikit yang penting aman.'
  },
  { 
    id: 'PO-7722', 
    customer: 'Siti Aminah', 
    phone: '628987654321',
    productId: 'PO-002', 
    Product: 'Hardware Server Mini Stack', 
    date: '26 May 2026', 
    dp: 'Rp 2,500,000', 
    totalPrice: 'Rp 5,000,000',
    status: 'Q&A Check',
    progress: 80,
    customNote: 'Kirim pakai packing kayu ekstra ya.'
  },
  { 
    id: 'PO-7723', 
    customer: 'Budi Santoso', 
    phone: '628554433221',
    productId: 'PO-001', 
    Product: 'CRM Module Premium v2', 
    date: '27 May 2026', 
    dp: 'Rp 500,000', 
    totalPrice: 'Rp 1,500,000',
    status: 'Selesai',
    progress: 100,
    customNote: 'Ditunggu pengiriman nomor resinya.'
  },
];

export default function PreOrderPage() {
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedOrder, setSelectedOrder] = useState(initialPOOrders[0]);

  const factorySteps = [
    { title: 'Pengumpulan Pendanaan DP', time: '10 Mei 2026, 09:00 WIB', done: true },
    { title: 'Proses Perakitan & Produksi Massal', time: '18 Mei 2026, 14:00 WIB', done: true },
    { title: 'Pengecekan Kualitas Akhir (QC)', time: selectedOrder.status === 'Q&A Check' || selectedOrder.status === 'Selesai' ? 'Selesai' : 'Sedang Berjalan', done: selectedOrder.status === 'Q&A Check' || selectedOrder.status === 'Selesai' },
    { title: 'Siap Dikirim / Selesai', time: selectedOrder.status === 'Selesai' ? 'Selesai' : 'Belum Dimulai', done: selectedOrder.status === 'Selesai' }
  ];

  const totalOrders = initialPOOrders.length;
  const inProduction = initialPOOrders.filter(o => o.status === 'Produksi' || o.status === 'Q&A Check').length;
  const isDone = initialPOOrders.filter(o => o.status === 'Selesai').length;

  const filteredOrders = initialPOOrders.filter(order => {
    if (activeTab === 'Semua') return true;
    return order.status === activeTab;
  });

  const getProductName = (productId, fallbackName) => {
    const product = productsData?.find(p => p.id === productId);
    return product ? product.name : fallbackName;
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-8 font-sans text-left">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Pre-Order Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau, filter, dan telusuri progres pengerjaan inden komitmen pelanggan.</p>
        </div>
        <div className="text-xs text-slate-400 bg-slate-200/60 rounded-lg px-3 py-1.5 font-medium border border-slate-200">
          💡 Klik baris tabel untuk memfokuskan detail pengerjaan
        </div>
      </div>

      {/* METRIC STATS CARDS BLOCK */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Antrean PO</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">{totalOrders} Antrean</h3>
          </div>
          <span className="text-2xl bg-blue-50 p-3 rounded-xl">📦</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sedang Diproses</p>
            <h3 className="text-2xl font-black text-amber-600 mt-1">{inProduction} Antrean</h3>
          </div>
          <span className="text-2xl bg-amber-50 p-3 rounded-xl">⚙️</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Siap Dikirim</p>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">{isDone} Transaksi</h3>
          </div>
          <span className="text-2xl bg-emerald-50 p-3 rounded-xl">✅</span>
        </div>
      </div>

      {/* LAYOUT UTAMA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* TABEL ANTRIAN UTAMA */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h3 className="text-base font-bold text-gray-800">📋 Antrean Masuk ({filteredOrders.length})</h3>
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
                  <TableHead className="py-4 px-4 font-bold text-gray-400 text-xs">ID PO</TableHead>
                  <TableHead className="font-bold text-gray-400 text-xs">Pelanggan</TableHead>
                  <TableHead className="font-bold text-gray-400 text-xs">Produk Inden</TableHead>
                  <TableHead className="font-bold text-gray-400 text-xs">Uang Muka</TableHead>
                  <TableHead className="font-bold text-gray-400 text-xs text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow 
                    key={order.id} 
                    onClick={() => setSelectedOrder(order)}
                    className={`cursor-pointer transition-all ${
                      selectedOrder.id === order.id 
                        ? 'bg-blue-50/70 hover:bg-blue-50' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <TableCell className="py-4 px-4 font-semibold text-[#4880FF] text-xs">
                      {order.id} {selectedOrder.id === order.id && '🎯'}
                    </TableCell>
                    <TableCell className="font-bold text-gray-800">{order.customer}</TableCell>
                    <TableCell className="text-gray-500 max-w-[150px] truncate">
                      {getProductName(order.productId, order.Product)}
                    </TableCell>
                    <TableCell className="font-extrabold text-gray-900 text-xs">{order.dp}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold inline-block border ${
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

        {/* SIDEBAR DETIL FOKUS DINAMIS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md shadow-blue-500/5 space-y-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
            
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] bg-slate-100 border text-slate-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                  Fokus Detail Pesanan
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-1">{selectedOrder.customer}</h3>
                <p className="text-xs text-gray-400 mt-0.5">Dibuat pada {selectedOrder.date}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {selectedOrder.id}
                </span>
              </div>
            </div>

            <hr className="border-gray-100" />

            <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Produk</p>
                <p className="text-xs font-bold text-gray-800 mt-0.5 truncate">{getProductName(selectedOrder.productId, selectedOrder.Product)}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Komitmen DP</p>
                <p className="text-xs font-extrabold text-emerald-600 mt-0.5">{selectedOrder.dp}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Total Harga</p>
                <p className="text-xs font-bold text-gray-700 mt-0.5">{selectedOrder.totalPrice}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase">Status Produksi</p>
                <p className="text-xs font-bold text-amber-600 mt-0.5">{selectedOrder.status}</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-gray-500">Estimasi Kesiapan Progres</span>
                <span className="font-black text-blue-600">{selectedOrder.progress}%</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${selectedOrder.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-xs font-bold text-gray-800 mb-3 flex items-center gap-1.5">
                <span>🏭</span> Tracking Timeline Manufaktur
              </p>
              <div className="bg-white border rounded-xl p-3 max-h-[190px] overflow-y-auto">
                <OrderTimeline steps={factorySteps} />
              </div>
            </div>

            <div className="pt-1 space-y-3">
              <FeedbackCard 
                user="Catatan / Permintaan Khusus" 
                rating={5} 
                comment={selectedOrder.customNote || 'Tidak ada catatan khusus.'} 
              />

              <a 
                href={`https://wa.me/${selectedOrder.phone}?text=Halo%20${encodeURIComponent(selectedOrder.customer)},%20kami%20ingin%20mengabarkan%20bahwa%20pesanan%20Pre-Order%20Anda%20(${selectedOrder.id})%20saat%20ini%20berstatus:%20${selectedOrder.status}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                💬 Hubungi & Update Progres via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}