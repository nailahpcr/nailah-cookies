<<<<<<< HEAD
import { Bell, Search, UserCircle } from 'lucide-react';
=======
import { MdSearch, MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5

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
=======
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative w-72">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <MdNotificationsNone size={22} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Language Selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <img 
            src="[flagcdn.com](https://flagcdn.com/w20/gb.png)" 
            alt="English" 
            className="w-5 h-4 object-cover rounded-sm"
          />
          <span className="text-sm text-gray-600">English</span>
          <MdKeyboardArrowDown className="text-gray-400" />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Moni Roy</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
          <img
            src="[i.pravatar.cc](https://i.pravatar.cc/40?img=5)"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
          />
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5
        </div>
      </div>
    </header>
  );
<<<<<<< HEAD
};

export default Header;
=======
}
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5
