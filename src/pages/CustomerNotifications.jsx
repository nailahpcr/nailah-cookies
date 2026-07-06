// src/pages/CustomerNotifications.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionsData } from '../data/transactionsData';

export default function CustomerNotifications() {
  const { user } = useAuth();

  // Find user's favorite book
  const myTrxs = transactionsData.filter(t => t.customerId === user.id || t.customerName === user.name);
  const mySuccessfulTrxs = myTrxs.filter(t => t.status === 'Success' || t.status === 'Siap Diambil' || t.status === 'Sedang Diproses');
  
  const itemCounts = {};
  mySuccessfulTrxs.forEach(t => {
    t.items.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });

  let favoriteBook = '';
  let maxQty = 0;
  Object.keys(itemCounts).forEach(name => {
    if (itemCounts[name] > maxQty) {
      maxQty = itemCounts[name];
      favoriteBook = name;
    }
  });

  // Generate dynamic notification list based on purchased history
  const [personalNotifs, setPersonalNotifs] = useState(
    favoriteBook 
      ? [
          {
            id: 'n-p1',
            title: '📢 Stok Buku Favorit Tersedia (Restock)',
            text: `Buku "${favoriteBook}" yang sering Anda beli kini telah kembali di-restock oleh distributor! Hubungi kami untuk mengamankan stok Anda.`,
            time: '5 Menit Yang Lalu',
            unread: true,
            type: 'restock'
          },
          {
            id: 'n-p2',
            title: '🔥 Diskon Spesial Promo Untuk Anda',
            text: `Sebagai pelanggan setia, nikmati diskon khusus untuk pembelian buku dalam rumpun yang relevan dengan "${favoriteBook}".`,
            time: '2 Jam Yang Lalu',
            unread: true,
            type: 'promo'
          },
          {
            id: 'n-p3',
            title: '🎉 Ulang Tahun / Kejutan Poin Ganda',
            text: 'Dapatkan poin ganda (2x) untuk setiap pembelian buku fiksi sepanjang minggu ini.',
            time: '1 Hari Yang Lalu',
            unread: false,
            type: 'system'
          }
        ]
      : [
          {
            id: 'n-p0',
            title: '👋 Selamat bergabung di CendekiaBook!',
            text: 'Mulai belanja buku pilihan Anda dan kumpulkan poin loyalitas untuk naik ke tier Gold atau Platinum.',
            time: 'Baru saja',
            unread: true,
            type: 'system'
          }
        ]
  );

  const markAllRead = () => {
    setPersonalNotifs(personalNotifs.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="space-y-8 font-sans text-left max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#1E2A44] tracking-tight">Notifikasi Personal</h1>
          <p className="text-sm text-gray-500 mt-1">Pemberitahuan khusus promo & ketersediaan stok buku favorit Anda.</p>
        </div>
        <button 
          onClick={markAllRead} 
          className="text-xs font-bold text-[#B23A2E] hover:underline whitespace-nowrap bg-[#FBF6EC] border border-[#B8892B]/10 px-3 py-1.5 rounded-xl"
        >
          Tandai Semua Dibaca
        </button>
      </div>

      <div className="space-y-4">
        {personalNotifs.map((n) => (
          <div 
            key={n.id} 
            className={`p-5 rounded-2xl border transition-all ${
              n.unread 
                ? 'bg-white border-[#B23A2E]/20 shadow-md shadow-[#B23A2E]/5 ring-1 ring-[#B23A2E]/5' 
                : 'bg-white border-gray-100 opacity-80'
            }`}
          >
            <div className="flex justify-between items-start mb-2 gap-4">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                {n.unread && <span className="w-2 h-2 bg-[#B23A2E] rounded-full inline-block animate-ping"></span>}
                {n.title}
              </h3>
              <span className="text-[10px] text-gray-400 font-semibold whitespace-nowrap">{n.time}</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
