import { useState } from 'react';
import { transactionsData } from '../data/transactionsData';
import PageLayout from '../components/PageLayout';
import { Input } from "@/components/ui/input";

// Menggunakan komponen tabel global yang otomatis rapi dan seragam
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "../components/ui/table"; 

export default function TransactionsPage() {
  const [activeMonth, setActiveMonth] = useState('Semua');
  const [activeChannel, setActiveChannel] = useState('Semua');
  const [activeMethod, setActiveMethod] = useState('Semua'); // 🌟 State untuk Filter Metode
  const [searchQuery, setSearchQuery] = useState('');
  
  // State untuk mengontrol data nota/faktur yang sedang dibuka
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Filter Multi-Dimensi: Bulan + Channel + Metode + Search Box
  const filteredTransactions = transactionsData.filter(trx => {
    const matchesMonth = activeMonth === 'Semua' || trx.month === activeMonth;
    const matchesChannel = activeChannel === 'Semua' || trx.channel === activeChannel;
    
    // 🌟 PERBAIKAN LOGIKA: Menggunakan .includes() agar string "Tunai" cocok dengan "Tunai (Cash)", dst.
    const matchesMethod = activeMethod === 'Semua' || 
      trx.paymentMethod.toLowerCase().includes(activeMethod.toLowerCase());
      
    const matchesSearch = 
      trx.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trx.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesMonth && matchesChannel && matchesMethod && matchesSearch;
  });

  // Helper format mata uang Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  // Badge pewarnaan status pesanan
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Success': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'Sedang Diproses': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'Siap Diambil': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Canceled': return 'bg-rose-50 text-rose-600 border-rose-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  // Badge pewarnaan asal channel order retail
  const getChannelStyle = (channel) => {
    switch (channel) {
      case 'Toko Langsung': return 'bg-purple-100 text-purple-700';
      case 'WhatsApp': return 'bg-green-100 text-green-700';
      case 'Shopee': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <PageLayout>
      <div className="space-y-8 font-sans">
        
        {/* HEADER DASHBOARD */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Riwayat Transaksi</h1>
            <p className="text-sm text-gray-500 mt-1">Manajemen pencatatan omset, channel retail, dan perolehan poin CRM.</p>
          </div>
          <div className="w-full md:w-80 relative">
            <span className="absolute left-3 top-2.5 text-gray-400 text-sm z-10">🔍</span>
            <Input
              placeholder="Cari nama, ID, atau nama produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white border-gray-200 focus:ring-2 focus:ring-[#4880FF] rounded-xl"
            />
          </div>
        </div>

        {/* 🔄 CONTROLS FILTERS (3 DROPDOWNS ROW) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          {/* Dropdown Pilihan Bulan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pilih Bulan</label>
            <div className="relative">
              <select
                value={activeMonth}
                onChange={(e) => setActiveMonth(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 px-4 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#4880FF] focus:bg-white transition-all cursor-pointer font-medium"
              >
                <option value="Semua">Semua Bulan</option>
                <option value="Mei">Mei</option>
                <option value="Juni">Juni</option>
                <option value="Juli">Juli</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>
          </div>

          {/* Dropdown Pilihan Platform */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform / Channel</label>
            <div className="relative">
              <select
                value={activeChannel}
                onChange={(e) => setActiveChannel(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 px-4 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#4880FF] focus:bg-white transition-all cursor-pointer font-medium"
              >
                <option value="Semua">Semua Platform</option>
                <option value="Toko Langsung">Toko Langsung</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Shopee">Shopee</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>
          </div>

          {/* 🌟 Dropdown Pilihan Metode Pembayaran Berdasarkan Keyword Parsial */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Metode Pembayaran</label>
            <div className="relative">
              <select
                value={activeMethod}
                onChange={(e) => setActiveMethod(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl py-2.5 px-4 appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#4880FF] focus:bg-white transition-all cursor-pointer font-medium"
              >
                <option value="Semua">Semua Metode</option>
                <option value="Tunai">Tunai (Cash)</option>
                <option value="Transfer">Transfer Bank / VA</option>
                <option value="E-Wallet">E-Wallet / QRIS</option>
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</span>
            </div>
          </div>
        </div>

        {/* TABEL TRANSAKSI */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID / Tanggal</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Produk Yang Dibeli</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead>Total Belanja</TableHead>
              <TableHead className="text-center">Poin</TableHead>
              <TableHead className="text-center">Status Tracking</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((trx) => (
                <TableRow key={trx.id}>
                  {/* ID / TANGGAL */}
                  <TableCell>
                    <button 
                      onClick={() => setSelectedTransaction(trx)}
                      className="font-bold text-[#4880FF] hover:underline text-left block focus:outline-none"
                    >
                      {trx.id}
                    </button>
                    <div className="text-[11px] text-gray-400 font-normal mt-0.5">{trx.date}</div>
                  </TableCell>

                  {/* PELANGGAN */}
                  <TableCell>
                    <div className="font-bold text-gray-800">{trx.customerName}</div>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                      {trx.segment}
                    </span>
                  </TableCell>

                  {/* PRODUK YANG DIBELI */}
                  <TableCell className="max-w-[280px]">
                    <div className="space-y-1">
                      {trx.items.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex justify-between gap-4">
                          <span className="truncate font-medium" title={item.name}>• {item.name}</span>
                          <span className="text-gray-400 font-bold flex-shrink-0">x{item.qty}</span>
                        </div>
                      ))}
                    </div>
                  </TableCell>

                  {/* METODE RETAIL */}
                  <TableCell>
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-extrabold rounded mb-1 ${getChannelStyle(trx.channel)}`}>
                      {trx.channel}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">{trx.paymentMethod}</div>
                  </TableCell>

                  {/* TOTAL BELANJA */}
                  <TableCell className="font-bold text-gray-900">
                    {formatRupiah(trx.totalPrice)}
                  </TableCell>

                  {/* POIN LOYALITAS */}
                  <TableCell className="text-center">
                    <span className={`font-bold ${trx.status === 'Canceled' ? 'text-gray-300 line-through' : 'text-amber-500'}`}>
                      +{trx.pointsEarned} Pts
                    </span>
                  </TableCell>

                  {/* STATUS TRACKING */}
                  <TableCell className="text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(trx.status)}`}>
                      {trx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="p-8 text-center text-gray-400 text-sm">
                  📭 Tidak ditemukan data transaksi untuk kombinasi filter ini.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* MODAL DETAIL FAKTUR / NOTA DIGITAL */}
        {selectedTransaction && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
              
              {/* Header Nota */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-gray-900 text-base">Detail Faktur Penjualan</h3>
                  <p className="text-xs text-gray-400 mt-0.5">CendekiaBook Retail System</p>
                </div>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* Badan Nota */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">No. Invoice</span>
                    <span className="font-mono font-bold text-gray-800 text-base">{selectedTransaction.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Status</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mt-1 border ${getStatusStyle(selectedTransaction.status)}`}>
                      {selectedTransaction.status}
                    </span>
                  </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Pelanggan</span>
                    <span className="font-bold text-gray-800 block mt-0.5">{selectedTransaction.customerName}</span>
                    <span className="text-xs text-gray-500 font-medium px-1.5 py-0.2 bg-gray-100 rounded inline-block mt-1">
                      {selectedTransaction.segment}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Waktu / Tanggal</span>
                    <span className="font-medium text-gray-700 block mt-0.5">{selectedTransaction.date}</span>
                    <span className={`inline-block px-1.5 py-0.2 text-[11px] font-bold rounded mt-1 ${getChannelStyle(selectedTransaction.channel)}`}>
                      via {selectedTransaction.channel}
                    </span>
                  </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                <div>
                  <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider mb-2">Item Belanja</span>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 space-y-2.5">
                    {selectedTransaction.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs gap-4">
                        <div className="max-w-[70%]">
                          <p className="font-semibold text-gray-800">{item.name}</p>
                          <p className="text-gray-400 text-[11px] mt-0.5">Qty: {item.qty} pcs</p>
                        </div>
                        <span className="font-bold text-gray-700 whitespace-nowrap">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <hr className="border-dashed border-gray-200" />

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Metode Pembayaran</span>
                    <span className="font-semibold text-gray-700 mt-0.5 block">{selectedTransaction.paymentMethod}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Loyalitas CRM</span>
                    <span className={`font-bold text-xs ${selectedTransaction.status === 'Canceled' ? 'text-gray-300 line-through' : 'text-amber-500'}`}>
                      +{selectedTransaction.pointsEarned} Pts Diterima
                    </span>
                  </div>
                </div>

                <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                  <span className="font-bold text-gray-500 uppercase text-xs tracking-wider">Total Pembayaran</span>
                  <span className="text-lg font-black text-gray-900">
                    {formatRupiah(selectedTransaction.totalPrice)}
                  </span>
                </div>
              </div>

              {/* Footer Aksi Nota */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold transition-all"
                >
                  🖨️ Cetak Nota
                </button>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="px-4 py-2 bg-[#4880FF] hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  Selesai
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </PageLayout>
  );
}