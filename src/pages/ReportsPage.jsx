// src/pages/ReportsPage.jsx
import React, { useState } from 'react';
import PageLayout from '../components/PageLayout';
import { transactionsData } from '../data/transactionsData';
import { productsData } from '../data/productsData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ReportsPage() {
  const [selectedMonth, setSelectedMonth] = useState('Juli');

  // Filter transactions for this month
  const monthlyTrxs = transactionsData.filter(t => t.month === selectedMonth);
  const successTrxs = monthlyTrxs.filter(t => t.status === 'Success' || t.status === 'Siap Diambil' || t.status === 'Sedang Diproses');
  const canceledCount = monthlyTrxs.filter(t => t.status === 'Canceled').length;

  // 1. Financial totals
  const totalRevenue = successTrxs.reduce((sum, t) => sum + t.totalPrice, 0);
  const avgTrxValue = successTrxs.length > 0 ? Math.round(totalRevenue / successTrxs.length) : 0;
  const totalPoints = successTrxs.reduce((sum, t) => sum + (t.pointsEarned || 0), 0);

  // 2. Payment methods counts
  const payments = { Tunai: 0, Transfer: 0, EWallet: 0 };
  successTrxs.forEach(t => {
    const pm = t.paymentMethod.toLowerCase();
    if (pm.includes('tunai') || pm.includes('cash')) payments.Tunai += t.totalPrice;
    else if (pm.includes('transfer') || pm.includes('va')) payments.Transfer += t.totalPrice;
    else payments.EWallet += t.totalPrice;
  });

  // 3. Channels count
  const channels = { Toko: 0, WA: 0, Shopee: 0 };
  successTrxs.forEach(t => {
    const ch = t.channel.toLowerCase();
    if (ch.includes('toko') || ch.includes('langsung')) channels.Toko += t.totalPrice;
    else if (ch.includes('whatsapp') || ch.includes('wa')) channels.WA += t.totalPrice;
    else if (ch.includes('shopee')) channels.Shopee += t.totalPrice;
  });

  // 4. Categories sales count
  const categories = {
    "Buku Paket": 0,
    "Buku Umum": 0,
    "Buku Islami": 0,
    "Buku Tulis": 0,
    "Alat Tulis": 0,
    "Paket Bundling": 0
  };

  successTrxs.forEach(t => {
    t.items.forEach(item => {
      const match = productsData.find(p => p.name.toLowerCase().includes(item.name.toLowerCase()) || item.name.toLowerCase().includes(p.name.toLowerCase()));
      const cat = match ? match.category : "Buku Umum";
      if (categories[cat] !== undefined) {
        categories[cat] += item.qty;
      } else {
        categories["Buku Umum"] += item.qty;
      }
    });
  });

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <PageLayout>
      <div className="space-y-8 text-left font-sans max-w-5xl mx-auto p-4">
        
        {/* Header Title with Print Option */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1E2A44] tracking-tight">Laporan CRM & Penjualan</h1>
            <p className="text-sm text-gray-500 mt-1">Audit rincian omset, kinerja kanal, dan akumulasi poin loyalitas bulanan.</p>
          </div>
          <div className="flex gap-3">
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-white border border-gray-200 text-gray-700 text-xs font-semibold rounded-xl py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#B23A2E]"
            >
              <option value="Mei">Laporan Mei 2026</option>
              <option value="Juni">Laporan Juni 2026</option>
              <option value="Juli">Laporan Juli 2026 (Berjalan)</option>
            </select>
            <button 
              onClick={() => window.print()}
              className="px-4 py-2 bg-[#B23A2E] text-white hover:bg-[#9c2f25] text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              🖨️ Cetak PDF Laporan
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Pendapatan Bersih</p>
            <h3 className="text-xl font-black text-gray-900 mt-1">{formatRupiah(totalRevenue)}</h3>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">✓ Transaksi Sukses</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rata-rata Per Transaksi</p>
            <h3 className="text-xl font-black text-gray-900 mt-1">{formatRupiah(avgTrxValue)}</h3>
            <span className="text-[10px] text-gray-400 font-semibold mt-1 block">Total {successTrxs.length} Nota</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Poin Loyalitas CRM Dihasilkan</p>
            <h3 className="text-xl font-black text-amber-500 mt-1">+{totalPoints.toLocaleString('id-ID')} Pts</h3>
            <span className="text-[10px] text-amber-600 font-semibold mt-1 block">Level Member Berkembang</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Transaksi Batal / Canceled</p>
            <h3 className="text-xl font-black text-red-500 mt-1">{canceledCount} Transaksi</h3>
            <span className="text-[10px] text-red-600 font-semibold mt-1 block">Batal/Refund</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Kanal & Metode Pembayaran */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 text-sm">Distribusi Kinerja Finansial</h3>
            
            {/* Kanal Penjualan */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Platform / Kanal Penjualan</h4>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Toko Langsung</span>
                    <span>{formatRupiah(channels.Toko)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#1E2A44] h-full" style={{ width: `${totalRevenue > 0 ? (channels.Toko / totalRevenue) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>WhatsApp Order</span>
                    <span>{formatRupiah(channels.WA)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#B23A2E] h-full" style={{ width: `${totalRevenue > 0 ? (channels.WA / totalRevenue) * 100 : 0}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold text-gray-700 mb-1">
                    <span>Shopee Online</span>
                    <span>{formatRupiah(channels.Shopee)}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#B8892B] h-full" style={{ width: `${totalRevenue > 0 ? (channels.Shopee / totalRevenue) * 100 : 0}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Metode Pembayaran */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Metode Pembayaran Terpilih</h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-semibold">Tunai / Cash</span>
                  <span className="font-bold text-gray-800">{formatRupiah(payments.Tunai)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-50">
                  <span className="text-gray-500 font-semibold">Transfer Bank / VA</span>
                  <span className="font-bold text-gray-800">{formatRupiah(payments.Transfer)}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500 font-semibold">E-Wallet / QRIS</span>
                  <span className="font-bold text-gray-800">{formatRupiah(payments.EWallet)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Kategori Terlaris */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-gray-900 text-sm">Volume Penjualan Kategori Buku (Buku & ATK)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Kategori</TableHead>
                  <TableHead className="text-right">Qty Terjual</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(categories).map((catName) => (
                  <TableRow key={catName}>
                    <TableCell className="font-bold text-gray-700">{catName}</TableCell>
                    <TableCell className="text-right font-black text-gray-900">{categories[catName]} Pcs</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Detailed Transactions Logs */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-900 text-sm">Daftar Audit Transaksi Masuk ({successTrxs.length} Nota Sukses)</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Nota</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Kanal</TableHead>
                <TableHead>Metode Bayar</TableHead>
                <TableHead className="text-right">Total Nominal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {successTrxs.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-bold text-[#B23A2E]">{t.id}</TableCell>
                  <TableCell className="font-bold text-gray-800">{t.customerName}</TableCell>
                  <TableCell className="text-xs font-semibold text-gray-600">{t.channel}</TableCell>
                  <TableCell className="text-xs text-gray-500">{t.paymentMethod}</TableCell>
                  <TableCell className="text-right font-black text-gray-900">{formatRupiah(t.totalPrice)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
    </PageLayout>
  );
}