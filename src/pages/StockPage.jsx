// src/pages/StockPage.jsx
import { useState, useEffect } from 'react';
import StockAlert from '../components/StockAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import WhatsAppButton from '../components/WhatsAppButton';

// Mock Data Stok Barang Cendekia (Menyelaraskan dengan jenis katalog produk)
const initialStockData = [
  { id: 'STK001', name: 'Buku Paket Matematika Kelas X', category: 'Buku Paket', qty: 3, unit: 'Eks', status: 'Kritis' },
  { id: 'STK002', name: 'Novel Bumi Manusia', category: 'Buku Umum', qty: 1, unit: 'Eks', status: 'Kritis' },
  { id: 'STK003', name: 'Kitab Riyadhus Shalihin', category: 'Buku Islami', qty: 12, unit: 'Eks', status: 'Aman' },
  { id: 'STK004', name: 'Buku Tulis KIKY 40 Lembar', category: 'Buku Tulis', qty: 45, unit: 'Pack', status: 'Aman' },
  { id: 'STK005', name: 'Pensil 2B Castell-Castell', category: 'Alat Tulis', qty: 2, unit: 'Box', status: 'Kritis' },
];

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk Pencarian & Filter Tab
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Semua");

  useEffect(() => {
    const timer = setTimeout(() => {
      setStocks(initialStockData);
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Menyaring barang kritis untuk komponen Alert Box di atas
  const criticalItems = stocks.filter(item => item.status === 'Kritis');

  // Filter Data Gabungan (Berdasarkan Tab Kategori & Input Pencarian)
  const filteredStocks = stocks.filter((item) => {
    const matchCategory = activeTab === "Semua" || item.category === activeTab;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      (item.name || "").toLowerCase().includes(searchLower) ||
      (item.id || "").toLowerCase().includes(searchLower);
    return matchCategory && matchSearch;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Inventory Stock</h1>
          <p className="text-sm text-slate-500 mt-1">Pantau sisa kuantitas inventaris operasional produk secara real-time.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all text-sm shadow-sm">
          + Update Stok Baru
        </button>
      </div>

      {/* Grid Atas: Menerapkan Komponen StockAlert Secara Dinamis */}
      {criticalItems.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-red-500 uppercase tracking-wider flex items-center gap-1">
            <span>⚠️</span> Perhatian Diperlukan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalItems.map((item) => (
              <StockAlert key={item.id} item={item.name} currentStock={item.qty} />
            ))}
          </div>
        </div>
      )}

      {/* Kontrol Filter Kategori & Pencarian (Sesuai gaya ui-komponen project) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 gap-4 rounded-xl border border-slate-200 shadow-sm">
        <input 
          type="text"
          placeholder="Cari nama produk atau ID stok..."
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto whitespace-nowrap">
          {["Semua", "Buku Paket", "Buku Umum", "Buku Islami", "Buku Tulis", "Alat Tulis"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tabel Utama Inventaris */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-4 px-6">ID Barang</th>
                <th className="py-4 px-6">Nama Produk</th>
                <th className="py-4 px-6">Kategori</th>
                <th className="py-4 px-6">Jumlah Stok</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {filteredStocks.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-slate-400">Tidak ada inventaris barang yang cocok.</td>
                </tr>
              ) : (
                filteredStocks.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-slate-500">{item.id}</td>
                    <td className="py-4 px-6 font-bold text-slate-800">{item.name}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-md">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">{item.qty} {item.unit}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                        item.status === 'Aman' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.status === 'Kritis' ? (
                        <div className="flex justify-center">
                          <WhatsAppButton 
                            phoneNumber="6289911223344" 
                            message={`Halo Supplier Gudang Cendekia, kami ingin restock buku/barang kritis berikut:\n- Nama: ${item.name}\n- Sisa Stok: ${item.qty} ${item.unit}.\nMohon informasi ketersediaan kuantitas grosir. Terima kasih.`} 
                          />
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Stok Terpenuhi</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}