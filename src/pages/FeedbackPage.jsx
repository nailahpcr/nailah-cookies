import PageLayout from '../components/PageLayout';
import Header from '../components/Header';
import FeedbackCard from '../components/FeedbackCard';
// Mengimpor data ulasan seragam
import { feedbacks } from '../data/feedbacks'; 
import WhatsAppButton from '../components/WhatsAppButton';

export default function FeedbackPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Ringkasan Skor Kepuasan Statis */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900">4.8</h1>
            <p className="text-xs text-gray-400 font-bold mt-1">Skor Indeks CSAT</p>
          </div>
          <div className="border-l border-gray-200 pl-8 space-y-1 text-sm font-semibold text-gray-500">
            <p>⭐⭐⭐⭐ Wilk. Pekanbaru & Riau Sekitarnya</p>
            <p className="text-xs text-gray-400 font-normal">Dihitung otomatis berdasarkan total 20 Review Masuk.</p>
          </div>
        </div>

        {/* Grid Loop Data Masukan Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.map((fb) => (
            <div key={fb.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-4">
              
              {/* Komponen Card Ulasan Utama */}
              <FeedbackCard 
                name={fb.name}
                date={fb.date}
                comment={fb.comment}
                rating={fb.rating}
              />

            {/* Tombol WhatsApp untuk Tindak Lanjut Ulasan */}
              <div className="border-t border-gray-50 pt-3 flex justify-end">
                <WhatsAppButton 
                  phoneNumber={fb.phone || "628xxxxxxx"} // Mengambil data nomor hp dari file data/feedbacks.js
                  message={`Halo ${fb.name}, terima kasih atas ulasan Bintang ${fb.rating} 
                  yang Anda berikan di CendekiaBook terkait: "${fb.comment}". Kami akan terus meningkatkan kualitas cetak kami.`} 
                />
              </div>

            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
}