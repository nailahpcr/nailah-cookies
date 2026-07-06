import { useState } from 'react';
import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import TableContainer from '../components/TableContainer';
import LoyaltyBadge from '../components/LoyaltyBadge';
// Mengimpor database utama pelanggan
import { customers } from '../data/customers'; 

export default function LoyaltyPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTierFilter, setSelectedTierFilter] = useState('Semua');

  // Helper fungsi untuk mencocokkan logika poin dengan kategori Tier secara konsisten
  const getTierCategory = (points) => {
    if (points > 1000) return 'Platinum';
    if (points >= 300) return 'Gold';
    return 'Silver';
  };

  // Proses Filter Gabungan (Pencarian Nama/ID + Filter Kategori Tier)
  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch = 
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      cust.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const custTier = getTierCategory(cust.points);
    const matchesTier = selectedTierFilter === 'Semua' || custTier === selectedTierFilter;

    return matchesSearch && matchesTier;
  });

  // Statistik Dinamis Berdasarkan Data yang Terfilter atau Keseluruhan
  const totalPlatinum = customers.filter(c => getTierCategory(c.points) === 'Platinum').length;
  const totalGold = customers.filter(c => getTierCategory(c.points) === 'Gold').length;
  const totalSilver = customers.filter(c => getTierCategory(c.points) === 'Silver').length;

  return (
    <PageLayout>
      <div className="space-y-8 text-left font-sans">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Loyalty & Rewards Program</h1>
          <p className="text-sm text-gray-500 mt-1">Pantau kontribusi transaksi, distribusi poin, dan manajemen tier loyalitas member.</p>
        </div>

        {/* Ringkasan Benefit Tier Banner (Sekarang Berwarna & Hidup) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Platinum */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-6 rounded-2xl shadow-xl shadow-slate-950/10 text-white border border-slate-700/50 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 font-black tracking-tighter select-none pointer-events-none">PT</div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Tier Platinum</h3>
                <p className="text-3xl font-black mt-1">&gt; 1.000 Poin</p>
              </div>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-200 border border-white/10 backdrop-blur-sm">
                {totalPlatinum} Member
              </span>
            </div>
            <p className="text-xs text-indigo-200 font-medium mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
              💎 Diskon 15% + Prioritas Antrean Produksi Utama CendekiaBook
            </p>
          </div>

          {/* Card Gold */}
          <div className="bg-gradient-to-br from-amber-600 via-amber-500 to-yellow-600 p-6 rounded-2xl shadow-xl shadow-amber-600/10 text-white border border-amber-400/30 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 font-black tracking-tighter select-none pointer-events-none">GD</div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-amber-100 uppercase tracking-widest">Tier Gold</h3>
                <p className="text-3xl font-black mt-1">300 - 1.000 Poin</p>
              </div>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-xs font-bold text-amber-100 border border-white/10 backdrop-blur-sm">
                {totalGold} Member
              </span>
            </div>
            <p className="text-xs text-amber-50 font-medium mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
              ⭐ Diskon 10% + Layanan Free Ongkir Seluruh Wilayah Riau
            </p>
          </div>

          {/* Card Silver */}
          <div className="bg-gradient-to-br from-slate-400 via-slate-500 to-zinc-600 p-6 rounded-2xl shadow-xl shadow-slate-500/10 text-white border border-slate-300/30 relative overflow-hidden group">
            <div className="absolute -right-6 -bottom-6 text-9xl opacity-10 font-black tracking-tighter select-none pointer-events-none">SV</div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest">Tier Silver</h3>
                <p className="text-3xl font-black mt-1">&lt; 300 Poin</p>
              </div>
              <span className="bg-white/10 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-200 border border-white/10 backdrop-blur-sm">
                {totalSilver} Member
              </span>
            </div>
            <p className="text-xs text-slate-100 font-medium mt-4 bg-white/5 p-2.5 rounded-xl border border-white/5">
              💿 Diskon 5% Khusus Pembelian Kategori Buku Umum
            </p>
          </div>
          
        </div>

        {/* AREA TABEL UTAMA & UTILITY CONTROLS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5">
          
          {/* Filter Toolbar (Search + Segment Filter) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Database Tingkat Anggota</h2>
              <p className="text-xs text-gray-400 mt-0.5">Ditemukan {filteredCustomers.length} pelanggan yang cocok</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Input Pencarian */}
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Cari nama atau ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-xs w-full sm:w-56 focus:outline-none focus:border-blue-500 focus:bg-white font-medium transition-all"
                />
              </div>

              {/* Segmented Filter Buttons */}
              <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200/50">
                {['Semua', 'Platinum', 'Gold', 'Silver'].map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTierFilter(tier)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      selectedTierFilter === tier 
                        ? 'bg-white text-gray-900 shadow-sm' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Komponen Wadah Tabel */}
          <TableContainer>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50/70">
                  <th className="p-4 rounded-l-xl">ID Pelanggan</th>
                  <th className="p-4">Nama Lengkap</th>
                  <th className="p-4">Total Poin</th>
                  <th className="p-4">Status Tingkat (Tier)</th>
                  <th className="p-4 rounded-r-xl">Total Kontribusi Pengeluaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((cust) => (
                    <tr key={cust.id} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-4 text-[#4880FF] font-mono text-xs">{cust.id}</td>
                      <td className="p-4 text-gray-900 font-bold">{cust.name}</td>
                      <td className="p-4">
                        <span className="text-gray-900 font-black">{cust.points.toLocaleString('id-ID')}</span>
                        <span className="text-[10px] text-gray-400 font-bold ml-1">Pts</span>
                      </td>
                      <td className="p-4">
                        {/* PANGGIL REUSABLE COMPONENT LOYALTY BADGE */}
                        <LoyaltyBadge points={cust.points} />
                      </td>
                      <td className="p-4 text-slate-500 font-mono text-xs">
                        Rp {cust.totalSpend.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-12 text-center text-sm text-gray-400 font-medium bg-gray-50/30 rounded-xl">
                      🔍 Tidak ada data pelanggan yang sesuai dengan filter pencarian.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TableContainer>

        </div>
      </div>
    </PageLayout>
  );
}