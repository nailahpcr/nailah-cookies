import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  // Figma default state: checked=false (unchecked)
  const [rememberMe, setRememberMe] = useState(false);

  return (
    // Card Container Utama
    <div className="bg-white rounded-[24px] p-10 shadow-[0_10px_60px_-15px_rgba(0,0,0,0.1)] w-full transform transition-all duration-300">
      
      {/* 1. Bagian Judul (Teks & Deskripsi) */}
      <div className="text-center mb-10">
        <h2 className="text-[28px] font-bold text-[#202224] tracking-tight leading-tight mb-2">
          Login to Account
        </h2>
        <p className="text-[14px] text-[#646464] font-medium leading-relaxed">
          Please enter your email and password to continue
        </p>
      </div>

      <form className="space-y-7">
        
        {/* 2. Email Field */}
        <div>
          <label className="block text-[14px] font-semibold text-[#202224] mb-2.5">
            Email address:
          </label>
          <input
            type="email"
            placeholder="esteban_schiller@gmail.com"
            className="w-full px-5 py-3.5 bg-white border border-[#D8D8D8] rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4880FF] focus:border-[#4880FF] transition-all duration-200"
          />
        </div>

        {/* 3. Password Field */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <label className="block text-[14px] font-semibold text-[#202224]">
              Password
            </label>
            <Link
              to="/forgot-password"
              className="text-[12px] text-[#646464] hover:text-[#4880FF] font-medium transition-colors"
            >
              Forget Password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="••••••••••"
            className="w-full px-5 py-3.5 bg-white border border-[#D8D8D8] rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#4880FF] focus:border-[#4880FF] transition-all duration-200"
          />
        </div>

        {/* 4. Remember Password */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            // Custom styling for checkbox using accent color
            className="w-4.5 h-4.5 border-[#D8D8D8] rounded focus:ring-[#4880FF] cursor-pointer accent-[#4880FF]"
          />
          <label
            htmlFor="remember"
            className="text-[13px] text-[#646464] font-medium cursor-pointer"
          >
            Remember Password
          </label>
        </div>

        {/* 5. Sign In Button (Biru DashStack) */}
        <button
          type="submit"
          className="w-full py-3.5 bg-[#4880FF] hover:bg-[#3d6edb] text-white text-[15px] font-bold rounded-xl transition-all duration-200 shadow-md shadow-blue-500/20 active:scale-[0.98] mt-3"
        >
          Sign In
        </button>

        {/* 6. Create Account Link */}
        <p className="text-center text-[13px] text-[#646464] mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#4880FF] hover:underline font-semibold"
          >
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}