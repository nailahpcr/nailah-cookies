import { transactions } from '../data/transactions';
import { customers } from '../data/customers';
import OrderTimeline from '../components/OrderTimeline';

export default function TransactionsPage() {
  // Dummy data steps untuk menyuplai komponen OrderTimeline agar ter-render sempurna
  const trackingSteps = [
    { title: 'Pembayaran Dikonfirmasi', time: 'Hari ini, 14:30 WIB', done: true },
    { title: 'Paket Diproses Gudang', time: 'Hari ini, 16:00 WIB', done: true },
    { title: 'Dalam Pengiriman Kurir', time: 'Menunggu Kurir Arrived', done: false }
  ];

  return (
    <div className="space-y-6 p-6 bg-[#F5F6FA] min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Riwayat Transaksi</h1>
        <p className="text-sm text-gray-500 mt-1">Daftar transaksi pelanggan dan status pembayaran terbaru.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Tabel Data Transaksi */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">ID Trx</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Nama Pelanggan</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tanggal</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Total</th>
                <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx) => {
                const customer = customers.find((c) => c.id === trx.customerId);
                return (
                  <tr key={trx.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm text-gray-600">{trx.id}</td>
                    <td className="py-4 px-6 text-sm font-semibold text-gray-800">{customer?.name}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{trx.date}</td>
                    <td className="py-4 px-6 text-sm font-bold text-gray-900">Rp {trx.amount.toLocaleString('id-ID')}</td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        trx.status === 'Berhasil' ? 'bg-green-100 text-green-700' : 
                        trx.status === 'Diproses' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Kolom Kanan: Mengaktifkan Komponen OrderTimeline */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Live Tracking Logistik</h2>
          <OrderTimeline steps={trackingSteps} />
        </div>

      </div>
    </div>
  );
}