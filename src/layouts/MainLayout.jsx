import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayouts() {
  return (
    <div className="flex h-screen bg-[#FFF5F5] font-sans">
      {/* Sidebar - Tema Merah Gelap */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header Title Unik */}
          <div className="mb-8 flex items-end gap-3">
            <div className="h-12 w-2 bg-red-700 rounded-full"></div>
            <div>
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Cendekia <span className="text-red-700">Management</span>
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
        </main>
      </div>
    </div>
  );
}