import { useNavigate } from 'react-router-dom';
import NotificationBell from './NotificationBell';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user ? user.name : 'Tamu Cendekia';
  const displayRole = user ? user.role : 'GUEST';

  return (
    <header className="h-16 bg-white flex items-center justify-between px-6 z-10 shadow-sm border-b border-gray-100">
      {/* Search Bar */}
      <div className="flex-1 flex items-center">
        <div className="relative w-96">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-xs">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Cari..." 
            className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-full py-1.5 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-[#B23A2E]/50 focus:bg-white text-xs transition-all"
          />
        </div>
      </div>

      {/* Profil & Notifikasi */}
      <div className="flex items-center gap-6">
        <NotificationBell />
        
        {/* Tombol Profil yang difungsikan sebagai Logout */}
        <div 
          onClick={handleLogout} 
          className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <img 
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=B23A2E&color=fff`} 
            alt="Profile" 
            className="w-8 h-8 rounded-full shadow-sm"
          />
          <div className="hidden md:block text-left text-xs">
            <p className="font-bold text-gray-700">{displayName}</p>
            <p className="text-red-500 font-bold hover:underline">Logout ({displayRole})</p>
          </div>
        </div>
      </div>
    </header>
  );
}