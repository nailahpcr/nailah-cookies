import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault();
    }

    setLoading(true);
    setError("");

    try {
      const loggedUser = await login(email, password);
      if (loggedUser.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/akun/beranda", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full mx-auto text-left">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Cendekia CRM Login</h2>
      <p className="text-xs text-gray-400 text-center mb-6">Silakan masuk ke akun Anda</p>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="masukkan email"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-[#B23A2E] hover:bg-[#9c2f25] text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Demo Credentials Box */}
      <div className="mt-6 p-4 bg-[#FBF6EC] rounded-2xl border border-[#B8892B]/20 text-xs space-y-2">
        <p className="font-bold text-[#B8892B] mb-1">Akun Demo Instan:</p>
        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
          <div>
            <p className="font-semibold text-gray-700">Admin Store Owner</p>
            <p className="text-gray-500 text-[10px]">admin@cendekia.com / admin123</p>
          </div>
          <button 
            onClick={() => handleQuickLogin("admin@cendekia.com", "admin123")}
            className="px-2 py-1 bg-[#1E2A44] text-white rounded text-[10px] font-bold"
          >
            Gunakan
          </button>
        </div>
        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-gray-100">
          <div>
            <p className="font-semibold text-gray-700">Pelanggan Setia</p>
            <p className="text-gray-500 text-[10px]">pelanggan@cendekia.com / pelanggan123</p>
          </div>
          <button 
            onClick={() => handleQuickLogin("pelanggan@cendekia.com", "pelanggan123")}
            className="px-2 py-1 bg-[#1E2A44] text-white rounded text-[10px] font-bold"
          >
            Gunakan
          </button>
        </div>
      </div>

      <p className="text-[11px] text-gray-400 text-center mt-6">
        Belum punya akun?{" "}
        <a href="/register" className="text-blue-500 font-semibold hover:underline">Daftar Akun Baru</a>
      </p>
    </div>
  );
}