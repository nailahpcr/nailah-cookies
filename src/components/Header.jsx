import React from "react";
import { MdSearch, MdNotificationsNone, MdKeyboardArrowDown } from "react-icons/md";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="relative w-72">
        <MdSearch 
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
          size={20} 
        />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <MdNotificationsNone size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* Language Selector */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors">
          <img 
            src="https://flagcdn.com/w20/gb.png" 
            alt="English" 
            className="w-5 h-4 object-cover rounded-sm"
          />
          <span className="text-sm text-gray-600 font-medium">English</span>
          <MdKeyboardArrowDown className="text-gray-400" />
        </button>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-gray-200 mx-1"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 cursor-pointer p-1 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 leading-tight">Admin Utama</p>
            <p className="text-xs text-red-500 font-semibold uppercase tracking-wider">Cendekia</p>
          </div>
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;