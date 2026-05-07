import React from 'react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#4880FF]">
      {/* Ornamen Background (Opsional: Untuk membuat efek gelombang seperti di Figma) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-white blur-[120px]"></div>
      </div>

      {/* Kontainer Kartu Putih (Children adalah halaman Login/Register) */}
      <div className="relative z-10 w-full max-w-[520px] px-6 py-10">
        {children}
      </div>

      {/* Footer opsional di bagian bawah */}
      <div className="absolute bottom-6 w-full text-center text-white/60 text-xs">
        © 2026 DashStack CRM System
      </div>
    </div>
  );
}