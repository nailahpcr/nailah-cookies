import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import NotificationBell from './NotificationBell';

import { notifications } from '../data/notifications';

export default function Header() {
  const navigate = useNavigate(); // 2. Inisialisasi hook

  const handleLogout = () => {
    // Menghapus status login dari penyimpanan
    localStorage.removeItem('isAuthenticated');
    // Arahkan ke halaman login
    navigate('/login');
  };

  return (
    <header className="h-16 bg-surface flex items-center justify-between px-6 z-10 shadow-sm">
      {/* Search Bar ala DashStack */}
      <div className="flex-1 flex items-center">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-textMuted">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-background text-textMain rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Profil & Notifikasi */}
      <div className="flex items-center gap-6">
        <NotificationBell />
        
        {/* Tombol Profil yang difungsikan sebagai Logout */}
        <div 
          onClick={handleLogout} 
          className="flex items-center gap-3 border-l border-border pl-6 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src="https://ui-avatars.com/api/?name=Admin+User&background=4880FF&color=fff" 
            alt="Profile" 
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block text-sm">
            <p className="font-bold text-textMain">Admin User</p>
            <p className="text-danger text-xs font-bold">Logout</p> {/* Indikator Logout */}
          </div>
        </div>
      </div>
    </header>
  );
}