// src/pages/StockPage.jsx
import { useState, useEffect } from 'react';
import StockAlert from '../components/StockAlert';
import LoadingSpinner from '../components/LoadingSpinner';
import WhatsAppButton from '../components/WhatsAppButton';

// Mock Data Stok Barang Gudang
const initialStockData = [
  { id: 'STK001', name: 'Kertas Thermal Struk', category: 'Operational', qty: 3, unit: 'Roll', status: 'Kritis' },
  { id: 'STK002', name: 'Ribbon Printer Kasir', category: 'Operational', qty: 1, unit: 'Pcs', status: 'Kritis' },
  { id: 'STK003', name: 'Barcode Scanner Wireless', category: 'Hardware', qty: 12, unit: 'Unit', status: 'Aman' },
  { id: 'STK004', name: 'Paperclip Besar Box', category: 'ATK', qty: 45, unit: 'Box', status: 'Aman' },
  { id: 'STK005', name: 'Label Thermal 100x150', category: 'Operational', qty: 2, unit: 'Roll', status: 'Kritis' },
];

export default function StockPage() {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Menyaring barang yang masuk kategori kritis untuk area peringatan
  const criticalItems = stocks.filter(item => item.status === 'Kritis');

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-6">
      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inventory Stock</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau sisa kuantitas inventaris operasional secara real-time.</p>
        </div>
        <button className="bg-[#4880FF] text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-600 transition-all text-sm shadow-sm">
          + Update Stok Baru
        </button>
      </div>

      {/* Grid Atas: Menerapkan Komponen StockAlert Secara Dinamis */}
      {criticalItems.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Perhatian Diperlukan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalItems.map((item) => (
              <StockAlert key={item.id} item={item.name} currentStock={item.qty} />
            ))}
          </div>
        </div>
      )}

      {/* Tabel Utama Inventaris */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">ID Barang</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Nama Produk</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Kategori</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Jumlah Stok</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tindakan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {stocks.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 text-sm text-gray-600 font-medium">{item.id}</td>
                <td className="py-4 px-6 text-sm font-bold text-gray-800">{item.name}</td>
                <td className="py-4 px-6 text-sm text-gray-500">{item.category}</td>
                <td className="py-4 px-6 text-sm font-bold text-gray-900">{item.qty} {item.unit}</td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Aman' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {item.status === 'Kritis' ? (
                    /* Menggunakan WhatsAppButton khusus untuk reorder ke supplier gudang */
                    <WhatsAppButton 
                      phoneNumber="6289911223344" 
                      message={`Halo Supplier, kami ingin restock barang kritis: ${item.name}. Mohon info harga.`} 
                    />
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">Stok Terpenuhi</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}