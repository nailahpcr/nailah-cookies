// src/pages/ForbiddenPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FBF6EC] p-6 text-center font-sans">
      <div className="text-9xl mb-4">🚫</div>
      <h1 className="text-4xl font-extrabold text-[#1E2A44] tracking-tight">403 - Akses Ditolak</h1>
      <p className="text-sm text-gray-500 mt-2 max-w-md">
        Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini dilindungi oleh Route Guard CRM CendekiaBook.
      </p>
      <div className="mt-6">
        <Link 
          to="/login"
          className="px-6 py-3 bg-[#B23A2E] hover:bg-[#9c2f25] text-white font-bold rounded-xl shadow-md transition-all inline-block"
        >
          Kembali ke Login
        </Link>
      </div>
    </div>
  );
}
