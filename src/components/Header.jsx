import { HiOutlineSearch, HiOutlineBell, HiOutlineUserCircle } from "react-icons/hi";

export default function Header() {
  return (
    <header className="h-20 px-8 flex items-center justify-between">
      {/* Search Bar Minimalis */}
      <div className="relative group w-80">
        <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-red-300 group-focus-within:text-red-700 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Cari sesuatu di sini..." 
          className="w-full bg-white border-none rounded-2xl py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-red-200 outline-none text-sm transition-all italic text-slate-400"
        />
      </div>

      {/* Profile & Notif */}
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer text-slate-400 hover:text-red-700 transition-colors">
          <HiOutlineBell size={26} />
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full border-2 border-[#FFF5F5]"></span>
        </div>
        
        <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-full shadow-sm border border-red-50">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-700 overflow-hidden">
             <img src="https://avatar.iran.liara.run/public/30" alt="avatar" />
          </div>
          <div>
            <p className="text-xs font-black text-slate-800">Admin Cendekia</p>
            <p className="text-[10px] text-red-500 font-bold uppercase">Superuser</p>
          </div>
        </div>
      </div>
    </header>
  );
}