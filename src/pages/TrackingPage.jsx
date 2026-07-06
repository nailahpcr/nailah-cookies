// src/pages/TrackingPage.jsx
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import OrderTimeline from '../components/OrderTimeline';
import PageLayout from '../components/PageLayout';

import { preorders } from '../data/preorders';

export default function TrackingPage() {
  return (
    <PageLayout>
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#F5F6FA] p-6 space-y-6">
          <Header title="Lacak Antrean Status Pesanan" />

          {/* Blok Info Resi Pesanan Aktif */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Nomor Faktur: #ORD-99201A</h3>
                <p className="text-xs text-gray-400 font-semibold">Nama Pemesan: Esteban Schiller (Kue Balok Cokelat Premium)</p>
              </div>
              <span className="bg-blue-100 text-[#4880FF] text-xs font-bold px-3 py-1.5 rounded-lg animate-pulse">
                Sedang Diproses Manufaktur
              </span>
            </div>

            {/* REUSABLE COMPONENT ORDER TIMELINE (Antrean Proses Ke-2 Aktif) */}
            <div className="py-4">
              <OrderTimeline 
                steps={['Pesanan Masuk', 'Proses Masak', 'Quality Control', 'Kurir Ekspedisi']} 
                activeStep={1} 
              />
            </div>
          </div>

          {/* Detail Histori Logistik */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Log Riwayat Perjalanan Logistik</h3>
            <div className="space-y-4 text-xs font-semibold text-gray-600 border-l-2 border-gray-200 pl-4 ml-2">
              <p className="text-[#4880FF]">⏰ [Hari Ini - 10:30 WIB] Adonan produk kue masuk tahap oven oven cetak utama.</p>
              <p>⏰ [Kemarin - 15:00 WIB] Pembayaran divalidasi sukses oleh Admin DashStack.</p>
              <p>⏰ [Kemarin - 14:15 WIB] Tiket prapesan baru dibuat otomatis oleh sistem konsumen.</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
