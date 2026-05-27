import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import TableContainer from '../components/TableContainer';
import LoyaltyBadge from '../components/LoyaltyBadge';
// Mengimpor database utama pelanggan
import { customers } from '../data/customers'; 

export default function LoyaltyPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Ringkasan Benefit Tier Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Tier Platinum</h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">&gt; 1000 Poin</p>
            <span className="text-xs text-green-600 font-semibold">Diskon 15% + Prioritas Produksi CendekiaBook</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Tier Gold</h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">300 - 1000 Poin</p>
            <span className="text-xs text-amber-600 font-semibold">Diskon 10% + Free Ongkir Riau</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase">Tier Silver</h3>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">&lt; 300 Poin</p>
            <span className="text-xs text-slate-500 font-semibold">Diskon 5% Pembelian Buku</span>
          </div>
        </div>

        {/* Tabel Poin Loyalitas */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Daftar Poin & Tingkat Anggota</h2>
          <TableContainer>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase bg-gray-50">
                  <th className="p-4">ID Pelanggan</th>
                  <th className="p-4">Nama Lengkap</th>
                  <th className="p-4">Total Poin</th>
                  <th className="p-4">Status Tingkat (Tier)</th>
                  <th className="p-4">Total Kontribusi Pengeluaran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
                {customers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-[#4880FF]">{cust.id}</td>
                    <td className="p-4">{cust.name}</td>
                    <td className="p-4 text-gray-900 font-bold">{cust.points} Pts</td>
                    <td className="p-4">
                      {/* PANGGIL REUSABLE COMPONENT LOYALTY BADGE */}
                      <LoyaltyBadge points={cust.points} />
                    </td>
                    <td className="p-4 text-gray-500">
                      Rp {cust.totalSpend.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableContainer>
        </div>
      </div>
    </PageLayout>
  );
}