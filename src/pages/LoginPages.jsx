import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineLogin } from 'react-icons/hi';

const LoginPages = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simulasi Logika Login
        if (email && password) {
            console.log("Mencoba login ke Cendekia...");
            // Arahkan ke dashboard setelah sukses
            navigate('/dashboard');
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleLogin} className="space-y-5">
                {/* Input Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Alamat Email
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineMail className="text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 sm:text-sm transition-all"
                            placeholder="admin@cendekia.com"
                            required
                        />
                    </div>
                </div>

                {/* Input Password */}
                <div>
                    <div className="flex justify-between mb-1.5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Kata Sandi
                        </label>
                        <a href="#" className="text-xs font-medium text-red-700 hover:text-red-800 transition-colors">
                            Lupa Password?
                        </a>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <HiOutlineLockClosed className="text-gray-400 group-focus-within:text-red-600 transition-colors" size={20} />
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 sm:text-sm transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 cursor-pointer">
                        Ingat saya di perangkat ini
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 transition-all transform active:scale-[0.98]"
                >
                    <HiOutlineLogin size={20} />
                    Masuk ke Sistem
                </button>
            </form>

            {/* Info Tambahan */}
            <div className="mt-8 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-start gap-3">
                <div className="bg-red-100 p-1 rounded-md mt-0.5">
                    <span className="text-red-700 font-bold text-[10px]">INFO</span>
                </div>
                <p className="text-[11px] text-red-700 leading-relaxed">
                    Gunakan akun administrator yang telah terdaftar untuk mengelola stok, transaksi, dan laporan harian.
                </p>
            </div>
        </div>
    );
};

export default LoginPages;