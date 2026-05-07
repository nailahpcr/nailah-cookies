import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineSpaceDashboard, MdOutlinePeople, MdOutlineMenuBook, MdOutlineReceiptLong } from 'react-icons/md';

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    { name: 'Dashboard', path: '/dashboard', icon: <MdOutlineSpaceDashboard /> },
    { name: 'Pelanggan', path: '/customers', icon: <MdOutlinePeople /> },
    { name: 'Buku & Stok', path: '/stock', icon: <MdOutlineMenuBook /> },
    { name: 'Transaksi', path: '/transactions', icon: <MdOutlineReceiptLong /> },
  ];

  return (
    <aside className="w-72 bg-[#740909] text-white flex flex-col p-6 shadow-2xl z-50">
      {/* Logo Branding */}
      <div className="mb-12 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
             <span className="text-red-700 font-black text-2xl">C</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter">CENDEKIA</h1>
        </div>
        <div className="h-[1px] w-full bg-red-400/20 mt-6"></div>
      </div>

      {/* Menu List */}
      <nav className="flex-1 space-y-3">
        {menus.map((menu) => {
          const isActive = location.pathname === menu.path;
          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-white text-red-800 shadow-lg shadow-black/20 translate-x-2 font-bold'
                  : 'text-red-100 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl">{menu.icon}</span>
              <span className="text-sm tracking-wide">{menu.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Upgrade Box Unik */}
      <div className="bg-red-800/50 p-5 rounded-[1.5rem] border border-red-400/30">
        <p className="text-xs text-red-200 leading-relaxed">
          Punya kendala akses sistem?
        </p>
        <button className="mt-3 w-full bg-white text-red-800 py-2 rounded-xl text-xs font-black shadow-md hover:bg-red-50">
          HUBUNGI TEKNISI
        </button>
      </div>
    </aside>
  );
}