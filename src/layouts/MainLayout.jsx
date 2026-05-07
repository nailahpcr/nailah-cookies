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

        {/* Konten Halaman (Dashboard, dll.) */}
        {/* overflow-y-auto agar bagian ini saja yang bisa di-scroll */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}