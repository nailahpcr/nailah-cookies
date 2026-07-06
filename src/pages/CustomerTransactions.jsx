// src/pages/CustomerTransactions.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionsData } from '../data/transactionsData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export default function CustomerTransactions() {
  const { user } = useAuth();
  
  const myTrxs = transactionsData.filter(trx => trx.customerId === user.id || trx.customerName === user.name);
  const [selectedTrx, setSelectedTrx] = useState(null);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="space-y-8 font-sans text-left max-w-5xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-[#1E2A44] tracking-tight">Riwayat Belanja Anda</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar nota pembelian resmi Anda di Toko Buku Cendekia.</p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID / Tanggal</TableHead>
            <TableHead>Produk Dibeli</TableHead>
            <TableHead>Metode Bayar</TableHead>
            <TableHead>Total Belanja</TableHead>
            <TableHead className="text-center">Poin Diterima</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {myTrxs.length > 0 ? (
            myTrxs.map((trx) => (
              <TableRow key={trx.id}>
                <TableCell>
                  <button 
                    onClick={() => setSelectedTrx(trx)}
                    className="font-bold text-[#B23A2E] hover:underline"
                  >
                    {trx.id}
                  </button>
                  <div className="text-[10px] text-gray-400 font-normal mt-0.5">{trx.date}</div>
                </TableCell>
                <TableCell className="max-w-[250px]">
                  <div className="space-y-1">
                    {trx.items.map((item, idx) => (
                      <div key={idx} className="text-xs text-gray-600 flex justify-between gap-4">
                        <span className="truncate">• {item.name}</span>
                        <span className="text-gray-400 font-bold flex-shrink-0">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-xs font-semibold text-gray-700">{trx.paymentMethod}</TableCell>
                <TableCell className="font-bold text-gray-900">{formatRupiah(trx.totalPrice)}</TableCell>
                <TableCell className="text-center font-bold text-amber-500">+{trx.pointsEarned} Pts</TableCell>
                <TableCell className="text-center">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    trx.status === 'Success' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'
                  }`}>
                    {trx.status}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="p-8 text-center text-gray-400 text-sm">
                📭 Anda belum memiliki riwayat transaksi belanja.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {selectedTrx && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Faktur Belanja Pelanggan</h3>
                <p className="text-xs text-gray-400 mt-0.5">Toko Buku Cendekia</p>
              </div>
              <button onClick={() => setSelectedTrx(null)} className="text-gray-400 hover:text-gray-600 text-lg font-bold">✕</button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">No. Invoice</span>
                  <span className="font-mono font-bold text-gray-800 text-base">{selectedTrx.id}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-medium uppercase tracking-wider">Status</span>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-green-700 bg-green-50 mt-1">{selectedTrx.status}</span>
                </div>
              </div>

              <hr className="border-dashed border-gray-200" />

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                {selectedTrx.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-gray-700 font-medium">{item.name} (x{item.qty})</span>
                    <span className="text-gray-900 font-bold">{formatRupiah(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-400 block">Metode Pembayaran</span>
                  <span className="font-semibold text-gray-700">{selectedTrx.paymentMethod}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Akumulasi Poin CRM</span>
                  <span className="font-bold text-amber-500">+{selectedTrx.pointsEarned} Pts</span>
                </div>
              </div>

              <div className="bg-[#F8F9FA] rounded-xl p-4 border border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-500 text-xs uppercase tracking-wider">Total Belanja</span>
                <span className="text-lg font-black text-gray-900">{formatRupiah(selectedTrx.totalPrice)}</span>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 rounded-xl text-xs font-bold transition-all">🖨️ Cetak</button>
              <button onClick={() => setSelectedTrx(null)} className="px-4 py-2 bg-[#B23A2E] text-white hover:bg-[#9c2f25] rounded-xl text-xs font-bold transition-all shadow-sm">Selesai</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
