// src/components/OrderTimeline.jsx
import React from 'react';

export default function OrderTimeline({ steps = [], activeStep = 0 }) {
  // Pengaman tingkat 1: Jika steps kosong atau bukan array, jangan render apapun agar tidak crash
  if (!steps || !Array.isArray(steps)) return null;

  return (
    <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-8 pt-2 w-full">
      {steps.map((step, index) => {
        const isCompleted = index < activeStep;
        const isActive = index === activeStep;

        // PENGAMAN TINGKAT 2 (SOLUSI UTAMA):
        // Jika 'step' adalah sebuah objek (misal: {title, time, done}), ambil teks dari properti .title
        let stepTitle = "";
        let stepTime = "";

        if (step && typeof step === 'object') {
          stepTitle = step.title || step.textStatus || `Langkah ${index + 1}`;
          stepTime = step.time || ""; 
        } else {
          // Jika sudah berupa teks/string biasa, gunakan langsung
          stepTitle = String(step || '');
        }

        return (
          <div key={index} className="flex items-center space-x-3 md:flex-1 md:flex-col md:space-x-0 md:space-y-2 md:items-start">
            {/* Indikator Bulatan Angka */}
            <div className="flex items-center relative">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 z-10 transition-all ${
                  isActive
                    ? 'bg-[#4880FF] border-[#4880FF] text-white shadow-md'
                    : isCompleted
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'bg-white border-gray-200 text-gray-400'
                }`}
              >
                {index + 1}
              </div>
              
              {/* Garis Penghubung Horizontal (Hanya Desktop) */}
              {index < steps.length - 1 && (
                <div className={`hidden md:block absolute left-6 top-3 h-[2px] w-[130%] -z-0 ${
                  index < activeStep ? 'bg-green-500' : 'bg-gray-100'
                }`} />
              )}
            </div>

            {/* Area Konten Teks Informasi */}
            <div className="flex flex-col">
              {/* Menampilkan judul step yang murni bertipe string */}
              <p className={`text-xs font-bold ${
                isActive ? 'text-[#4880FF]' : isCompleted ? 'text-green-600' : 'text-gray-400'
              }`}>
                {stepTitle}
              </p>
              
              {/* Menampilkan sub-teks status waktu atau status antrean */}
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                {stepTime ? stepTime : (isActive ? 'Sedang Diproses' : isCompleted ? 'Selesai' : 'Antrean')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}