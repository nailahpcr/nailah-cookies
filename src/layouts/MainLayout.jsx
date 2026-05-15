import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    // bg-[#F5F6FA] adalah abu-abu muda background sesuai Figma
    <div className="flex h-screen bg-[#F5F6FA] font-sans overflow-hidden">
      
      {/* Sidebar tetap di kiri */}
      <Sidebar />

      {/* Area Konten Utama di kanan */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header di atas */}
        <Header />

<<<<<<< HEAD
        <main className="flex-1 overflow-y-auto p-8">
          {/* Header Title Unik */}
          <div className="mb-8 flex items-end gap-3">
            <div className="h-12 w-2 bg-red-700 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Cendekia <span className="text-red-700">Dashboard</span>
              </h2>
              <p className="text-slate-500 font-medium">Selamat datang kembali di pusat literasi.</p>
            </div>
          </div>

          {/* Konten Utama dengan Glassmorphism Ringan */}
          <div className="bg-white/80 backdrop-blur-sm rounded-[2rem] shadow-xl shadow-red-100 border border-white p-8 min-h-[80%]">
            <Outlet />
          </div>

          <footer className="mt-10 text-center text-xs font-bold text-red-300 uppercase tracking-[0.2em]">
            &copy; 2026 Cendekia Red Series
          </footer>
=======
        {/* Konten Halaman (Dashboard, dll.) */}
        {/* overflow-y-auto agar bagian ini saja yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5
        </main>
      </div>
    </div>
  );
}