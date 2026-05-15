import { Bell, Search, UserCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8">
      <div className="relative w-64">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          placeholder="Cari data..."
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-indigo-600 relative">
          <Bell size={22} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle size={28} className="text-gray-400" />
          <span className="text-sm font-semibold text-gray-700">Admin Utama</span>
        </div>
      </div>
    </header>
  );
};

export default Header;