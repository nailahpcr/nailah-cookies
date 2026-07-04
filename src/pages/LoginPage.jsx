import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/authAPI";

export default function LoginPage() {
  const navigate = useNavigate();
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
      const user = await authAPI.login(email, password);

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user_token", user.id);
      localStorage.setItem("user_email", user.email);

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Login to Account</h2>
      <p className="text-xs text-gray-400 text-center mb-6">Please enter your email and password to continue</p>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">{error}</div>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Email :</label>
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
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-medium text-gray-600">Password :</label>
            <a href="#" className="text-[11px] text-gray-400 hover:underline">Forgot Password?</a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div className="flex items-center pt-1">
          <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="remember" className="ml-2 block text-[11px] text-gray-500">
            Remember Password
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-[#4c84ff] hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="text-[11px] text-gray-400 text-center mt-6">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 font-semibold hover:underline">Create Account</a>
      </p>
    </div>
  );
}