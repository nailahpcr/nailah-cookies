// src/pages/CustomerHome.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateLoyaltyTier, loyaltyRules } from '../lib/loyaltyEngine';
import { transactionsData } from '../data/transactionsData';
import { Link } from 'react-router-dom';

export default function CustomerHome() {
  const { user } = useAuth();
  
  // Get all customer transactions
  const myTrxs = transactionsData.filter(t => t.customerId === user.id || t.customerName === user.name);
  const mySuccessfulTrxs = myTrxs.filter(t => t.status === 'Success' || t.status === 'Siap Diambil' || t.status === 'Sedang Diproses');
  
  const trxCount = mySuccessfulTrxs.length;
  const totalSpend = mySuccessfulTrxs.reduce((sum, t) => sum + t.totalPrice, 0);
  const activeTier = calculateLoyaltyTier(trxCount, totalSpend);
  const tierInfo = loyaltyRules[activeTier];

  // Calculate points
  const points = mySuccessfulTrxs.reduce((sum, t) => sum + (t.pointsEarned || 0), 0);

  // Find most frequently purchased item
  const itemCounts = {};
  mySuccessfulTrxs.forEach(t => {
    t.items.forEach(item => {
      itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
    });
  });

  let favoriteBook = 'Belum Ada Transaksi';
  let maxQty = 0;
  Object.keys(itemCounts).forEach(name => {
    if (itemCounts[name] > maxQty) {
      maxQty = itemCounts[name];
      favoriteBook = name;
    }
  });

  return (
    <div className="space-y-8 font-sans text-left max-w-5xl mx-auto p-4">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1E2A44] to-[#B23A2E] text-white rounded-3xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 text-9xl select-none">📚</div>
        <div className="relative z-10 space-y-2">
          <span className="bg-[#B8892B] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {tierInfo.name}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight">Selamat Datang Kembali, {user.name}!</h1>
          <p className="text-sm text-gray-200 max-w-md">
            Terima kasih telah setia berbelanja di Toko Buku Cendekia. Nikmati keistimewaan tier {activeTier} Anda hari ini.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty Points</p>
            <h3 className="text-3xl font-black text-[#B8892B] mt-1">{points} Pts</h3>
            <p className="text-[11px] text-gray-400 mt-1">Dapatkan diskon khusus saat checkout</p>
          </div>
          <div className="text-3xl bg-[#FBF6EC] p-3.5 rounded-xl">⭐</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Belanja (6 bln)</p>
            <h3 className="text-2xl font-black text-gray-900 mt-1">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalSpend)}
            </h3>
            <p className="text-[11px] text-gray-400 mt-1">{trxCount} transaksi terverifikasi</p>
          </div>
          <div className="text-3xl bg-emerald-50 p-3.5 rounded-xl">💰</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Buku Terfavorit</p>
            <h3 className="text-sm font-bold text-gray-800 mt-2 line-clamp-2" title={favoriteBook}>
              {favoriteBook}
            </h3>
            {maxQty > 0 && <p className="text-[11px] text-emerald-600 font-semibold mt-1">Dibeli sebanyak {maxQty}x</p>}
          </div>
          <div className="text-3xl bg-blue-50 p-3.5 rounded-xl">📖</div>
        </div>
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tier Benefits */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Fasilitas & Keuntungan Tier {activeTier}</h2>
          <div className="space-y-3">
            {tierInfo.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          <hr className="border-gray-100" />
          <div className="flex gap-4">
            <Link 
              to="/akun/katalog" 
              className="flex-1 py-3 bg-[#B23A2E] text-white hover:bg-[#9c2f25] text-center font-bold rounded-xl text-xs transition shadow-sm"
            >
              📖 Belanja Buku
            </Link>
            <Link 
              to="/akun/profil" 
              className="flex-1 py-3 bg-[#1E2A44] text-white hover:bg-[#172135] text-center font-bold rounded-xl text-xs transition shadow-sm"
            >
              👤 Detail Profil
            </Link>
          </div>
        </div>

        {/* Personal Notifications */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Notifikasi Personal</h2>
            <Link to="/akun/notifikasi" className="text-xs font-semibold text-[#B23A2E] hover:underline">Lihat Semua</Link>
          </div>
          <div className="space-y-3">
            {favoriteBook !== 'Belum Ada Transaksi' ? (
              <>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-800">📦 Restock Buku Favorit</span>
                    <span className="text-[9px] text-gray-400">Baru Saja</span>
                  </div>
                  <p>Buku favorit Anda <strong>{favoriteBook}</strong> telah tersedia kembali di toko kami! Buruan pesan sekarang.</p>
                </div>
                <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-gray-700 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-800">🔥 Promo Relevan</span>
                    <span className="text-[9px] text-gray-400">1 jam yang lalu</span>
                  </div>
                  <p>Khusus member <strong>{activeTier}</strong>, dapatkan promo cashback 10% untuk pemesanan {favoriteBook} hari ini!</p>
                </div>
              </>
            ) : (
              <p className="text-xs text-gray-400 text-center py-6">Mulai berbelanja untuk mendapatkan notifikasi personal yang relevan.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
