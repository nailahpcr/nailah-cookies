import { Outlet } from "react-router-dom";
import { MdAutoStories } from "react-icons/md";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 border-t-4 border-red-700">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-red-100 relative z-10">
        
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="bg-red-50 p-3 rounded-2xl mb-3 shadow-inner">
            <MdAutoStories className="text-4xl text-red-700" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center">
            Cendekia<span className="text-red-700">Book</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest font-semibold">Staff Portal</p>
        </div>

        <div className="py-2">
          <Outlet />
        </div>

        <div className="mt-10 pt-6 border-t border-red-50">
          <p className="text-center text-[11px] text-gray-400 leading-relaxed uppercase tracking-widest">
            © 2026 Toko Buku Cendekia <br /> 
            Memberdayakan Literasi Bangsa.
          </p>
        </div>
      </div>
      
      {/* Dekorasi Ikon Besar di Background */}
      <div className="fixed -bottom-10 -right-10 text-red-100 -z-0 opacity-50">
         <MdAutoStories size={400} />
      </div>
    </div>
  );
}