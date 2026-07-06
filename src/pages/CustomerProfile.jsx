// src/pages/CustomerProfile.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { calculateLoyaltyTier, loyaltyRules } from '../lib/loyaltyEngine';
import { transactionsData } from '../data/transactionsData';

export default function CustomerProfile() {
  const { user } = useAuth();
  
  // Fetch details
  const myTrxs = transactionsData.filter(t => t.customerId === user.id || t.customerName === user.name);
  const mySuccessfulTrxs = myTrxs.filter(t => t.status === 'Success' || t.status === 'Siap Diambil' || t.status === 'Sedang Diproses');
  
  const trxCount = mySuccessfulTrxs.length;
  const totalSpend = mySuccessfulTrxs.reduce((sum, t) => sum + t.totalPrice, 0);
  const activeTier = calculateLoyaltyTier(trxCount, totalSpend);
  const tierInfo = loyaltyRules[activeTier];

  return (
    <div className="space-y-8 font-sans text-left max-w-5xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-[#1E2A44] tracking-tight">Profil & Tingkat Loyalitas</h1>
        <p className="text-sm text-gray-500 mt-1">Kelola data keanggotaan dan tingkat diskon loyalitas Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card & Info */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex items-center gap-4">
            <img 
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=B23A2E&color=fff`} 
              alt="Profile" 
              className="w-16 h-16 rounded-full border border-gray-100 shadow-sm"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.email}</p>
              <span className="inline-block mt-1 text-[10px] bg-[#B8892B] text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                {activeTier} Member
              </span>
            </div>
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">ID Pelanggan</span>
              <span className="text-gray-800 font-bold">{user.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Banyak Pembelian</span>
              <span className="text-gray-800 font-bold">{trxCount} Kali Transaksi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400 font-medium">Total Akumulasi Belanja</span>
              <span className="text-gray-800 font-bold">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalSpend)}
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Rules & Progress */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900">Ketentuan Peringkat Loyalitas Cendekia</h3>
          
          <div className="space-y-4">
            {Object.keys(loyaltyRules).map((key) => {
              const rule = loyaltyRules[key];
              const isCurrent = key === activeTier;
              return (
                <div 
                  key={key} 
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent 
                      ? 'bg-[#FBF6EC] border-[#B8892B] shadow-sm' 
                      : 'bg-gray-50/50 border-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-800 text-sm">{rule.name}</span>
                    {isCurrent && (
                      <span className="text-[10px] bg-[#B8892B] text-white px-2 py-0.5 rounded-full font-bold">
                        Tingkat Anda Sekarang
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    Minimal transaksi: {rule.minTrx}x atau Belanja: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(rule.minSpend)}
                  </p>
                  <div className="space-y-1 pl-3 border-l-2 border-[#B8892B]/30">
                    {rule.benefits.map((b, i) => (
                      <p key={i} className="text-[11px] text-gray-600 font-medium">• {b}</p>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
