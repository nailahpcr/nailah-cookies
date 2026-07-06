import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { role } = useAuth();

  const adminMenu = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Customers', path: '/admin/customers', icon: '👥' },
    { name: 'Products', path: '/admin/products', icon: '📦' },
    { name: 'Transactions', path: '/admin/transactions', icon: '💰' },
    { name: 'Stock Inventory', path: '/admin/stock', icon: '🏬' },
    { name: 'Pre Order', path: '/admin/pre-order', icon: '⏳' },
    { name: 'Loyalty', path: '/admin/loyalty', icon: '⭐' },
    { name: 'Feedback', path: '/admin/feedback', icon: '💬' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' },
  ];

  const customerMenu = [
    { name: 'Beranda', path: '/akun/beranda', icon: '🏡' },
    { name: 'Katalog Buku', path: '/akun/katalog', icon: '📖' },
    { name: 'Pre-Order Inden', path: '/akun/pre-order', icon: '⏳' },
    { name: 'Riwayat Belanja', path: '/akun/riwayat', icon: '💰' },
    { name: 'Profil & Loyalty', path: '/akun/profil', icon: '⭐' },
    { name: 'Notifikasi', path: '/akun/notifikasi', icon: '🔔' },
  ];

  const activeMenu = role === 'ADMIN' ? adminMenu : customerMenu;

  return (
    <aside className="w-64 bg-[#1E2A44] text-white h-full flex flex-col font-sans select-none">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-[#2a3c61]">
        <span className="text-xl font-extrabold text-[#FBF6EC] tracking-wider">CendekiaBook</span>
        <span className="ml-2 text-[9px] bg-[#B23A2E] text-white px-2 py-0.5 rounded font-black tracking-widest uppercase">
          {role}
        </span>
      </div>

      {/* Menu Area */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {activeMenu.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all text-sm ${isActive
                  ? 'bg-[#B23A2E] text-white shadow-md shadow-[#B23A2E]/25'
                  : 'text-gray-300 hover:bg-[#2a3c61] hover:text-white'
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}