import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../services/authAPI";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    id_pelanggan: `CEND-${Math.floor(100 + Math.random() * 900)}`, // Generate otomatis format Cendekia
    nama_pelanggan: "", 
    no_handphone: "",
    alamat: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setFormData({
        ...formData,
        username: e.target.value,
        nama_pelanggan: e.target.value // Disamakan agar masuk ke kolom nama_pelanggan database
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const { username, ...dataYangDikirim } = formData; // Kita kirim formData tanpa username karena sudah disamakan dengan nama_pelanggan
      // Kirim data ke Supabase
      await authAPI.register(dataYangDikirim);
      setSuccess("Account created successfully! Redirecting to login...");
      
      // Tunggu 2 detik lalu pindah ke halaman login
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to register account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-1">Create an Account</h2>
      <p className="text-xs text-gray-400 text-center mb-6">Create an account to continue</p>

      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-50 text-green-600 text-xs rounded-xl border border-green-100">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Email Address:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="masukkan email"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="masukkan username"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">No Handphone</label>
          <input
            type="text"
            name="no_handphone"
            value={formData.no_handphone}
            onChange={handleChange}
            required
            placeholder="08xxxxxxxxxx"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2.5 bg-[#f4f7ff] border border-transparent rounded-xl text-sm text-gray-700 focus:outline-none focus:bg-white focus:border-blue-400 transition"
          />
        </div>

        <div className="flex items-center pt-1">
          <input id="terms" type="checkbox" required className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="terms" className="ml-2 block text-[11px] text-gray-500">
            I accept terms and conditions
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-3 bg-[#4c84ff] hover:bg-blue-600 text-white font-semibold rounded-xl text-sm transition disabled:opacity-50"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-[11px] text-gray-400 text-center mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 font-semibold hover:underline">Login</a>
      </p>
    </div>
  );
}