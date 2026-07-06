// src/pages/FeedbackPage.jsx
import React, { useState, useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import FeedbackCard from '../components/FeedbackCard';
import { feedbacks } from '../data/feedbacks'; 
import WhatsAppButton from '../components/WhatsAppButton';
import { Button } from '../components/ui/button';

export default function FeedbackPage() {
  const [broadcasts, setBroadcasts] = useState(() => {
    const saved = localStorage.getItem('cendekia_broadcasts');
    return saved ? JSON.parse(saved) : [
      { id: 'b1', title: 'Promo Bundling Sekolah', text: 'Dapatkan diskon 15% untuk paket Kurikulum Merdeka.', date: '2026-07-01 10:00' },
      { id: 'b2', title: 'Restock Kitab Kuning', text: 'Kitab Kuning Fathul Qorib tersedia 100 pcs baru.', date: '2026-07-03 14:30' }
    ];
  });

  const [promoTitle, setPromoTitle] = useState('');
  const [promoText, setPromoText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    localStorage.setItem('cendekia_broadcasts', JSON.stringify(broadcasts));
  }, [broadcasts]);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!promoTitle || !promoText) return;

    const newBroadcast = {
      id: `b-${Date.now()}`,
      title: promoTitle,
      text: promoText,
      date: new Date().toLocaleString('id-ID')
    };

    setBroadcasts([newBroadcast, ...broadcasts]);
    setPromoTitle('');
    setPromoText('');
    setSuccessMsg('Promo Berhasil Disiarkan ke Semua Akun Pelanggan!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <PageLayout>
      <div className="space-y-8 text-left font-sans max-w-5xl mx-auto p-4">
        
        {/* Title */}
        <div>
          <h1 className="text-3xl font-extrabold text-[#1E2A44] tracking-tight">Feedback & Broadcast Center</h1>
          <p className="text-sm text-gray-500 mt-1">Ukur tingkat kepuasan pelanggan secara real-time dan kirim pesan promosi.</p>
        </div>

        {/* CSAT Score Breakdown - Rich Visuals */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 text-center md:border-r border-gray-100 md:pr-8 space-y-2">
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block">Skor CSAT Toko</span>
            <div className="inline-flex items-center justify-center bg-[#FBF6EC] w-24 h-24 rounded-full border border-[#B8892B]/20">
              <h1 className="text-4xl font-black text-[#1E2A44]">4.8</h1>
            </div>
            <p className="text-xs text-amber-500 font-extrabold">★★★★★ (Luar Biasa)</p>
          </div>

          <div className="md:col-span-8 space-y-3">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Detail Peringkat Kepuasan</h3>
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Sangat Puas (5 Bintang)</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#B23A2E] h-full rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Puas (4 Bintang)</span>
                  <span>12%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#B8892B] h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                  <span>Cukup (3 Bintang)</span>
                  <span>3%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#3E6E5E] h-full rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kelola Broadcast Promo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-[#1E2A44] tracking-tight">Kirim Broadcast Promo / Restock</h2>
            
            {successMsg && (
              <div className="p-3 bg-green-50 text-green-700 text-xs rounded-xl border border-green-100 font-semibold animate-pulse">
                ✓ {successMsg}
              </div>
            )}

            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Judul Notifikasi:</label>
                <input 
                  type="text" 
                  value={promoTitle}
                  onChange={(e) => setPromoTitle(e.target.value)}
                  placeholder="Contoh: Diskon Novel Fiksi 20%" 
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#B23A2E] transition-all font-semibold"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5">Pesan Promo:</label>
                <textarea 
                  value={promoText}
                  onChange={(e) => setPromoText(e.target.value)}
                  placeholder="Masukkan isi pesan notifikasi promosi atau ketersediaan stok buku secara mendalam..." 
                  rows="4"
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:border-[#B23A2E] transition-all resize-none font-medium leading-relaxed"
                  required
                />
              </div>
              <Button type="submit" variant="default" className="w-full py-3.5 text-xs font-bold rounded-xl shadow-md transition-all">
                📢 Siarkan Notifikasi Ke Semua Pelanggan
              </Button>
            </form>
          </div>

          {/* Broadcast Log */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1E2A44] tracking-tight mb-4">Log Broadcast Terkirim</h2>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {broadcasts.map((b) => (
                  <div key={b.id} className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs space-y-1 hover:border-[#B23A2E]/25 transition-all">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-gray-800">{b.title}</span>
                      <span className="text-[9px] text-gray-400 font-bold">{b.date}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed font-medium">{b.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Loop Data Masukan Feedback */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1E2A44] tracking-tight">Daftar Feedback Pelanggan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B23A2E] to-[#B8892B]"></div>
                
                <FeedbackCard 
                  name={fb.name}
                  date={fb.date}
                  comment={fb.comment}
                  rating={fb.rating}
                />
                
                <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                  <span className="text-[10px] text-gray-400 font-bold uppercase">Customer Support</span>
                  <WhatsAppButton 
                    phoneNumber={fb.phone || "628123456789"}
                    message={`Halo ${fb.name}, terima kasih atas ulasan Bintang ${fb.rating} Anda di CendekiaBook. Masukan Anda sangat berarti bagi kami.`} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </PageLayout>
  );
}