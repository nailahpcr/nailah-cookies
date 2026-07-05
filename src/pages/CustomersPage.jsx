import React, { useState, useEffect } from "react";
import { authAPI } from "../services/authAPI"; // Sesuaikan path ini dengan project kamu

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Load data pelanggan saat pertama kali halaman dibuka
  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await authAPI.fetchCustomers();
      setCustomers(data || []);
    } catch (error) {
      alert("Gagal mengambil data pelanggan: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menentukan Tier secara dinamis berdasarkan Poin
  const getLoyaltyTier = (poin) => {
    const pts = Number(poin) || 0;
    if (pts >= 500) return { label: "Platinum", color: "bg-purple-100 text-purple-800" };
    if (pts >= 150) return { label: "Gold", color: "bg-amber-100 text-amber-800" };
    return { label: "Silver", color: "bg-slate-100 text-slate-800" };
  };

  // Helper memformat tampilan tanggal Indonesia (DD/MM/YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  // Picu pembukaan Modal Edit
  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
    setIsEditModalOpen(true);
  };

  // Handle perubahan input di dalam modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Simpan hasil edit ke database Supabase
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      // Hitung ulang status pelanggan berdasarkan tier barunya secara otomatis
      const tierInfo = getLoyaltyTier(editingCustomer.total_poin);
      const updatedData = {
        nama_pelanggan: editingCustomer.nama_pelanggan,
        no_handphone: editingCustomer.no_handphone,
        alamat: editingCustomer.alamat,
        segmentasi: editingCustomer.segmentasi,
        nama_institusi: editingCustomer.nama_institusi,
        tanggal_lahir: editingCustomer.tanggal_lahir || null, // Menyimpan Tanggal Lahir Hasil Edit
        total_poin: Number(editingCustomer.total_poin) || 0,
        status_pelanggan: editingCustomer.total_poin > 0 ? `${tierInfo.label} Member` : "New Customer"
      };

      await authAPI.updateCustomer(editingCustomer.id, updatedData);
      alert("Data pelanggan berhasil diperbarui!");
      setIsEditModalOpen(false);
      loadCustomers(); // Reload tabel utama
    } catch (error) {
      alert("Gagal memperbarui data: " + error.message);
    }
  };

  // Hapus pelanggan
  const handleDeleteClick = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus pelanggan ini secara permanen?")) {
      try {
        await authAPI.deleteCustomer(id);
        alert("Pelanggan berhasil dihapus.");
        loadCustomers();
      } catch (error) {
        alert("Gagal menghapus pelanggan: " + error.message);
      }
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Customer List</h1>
        <p className="text-sm text-slate-500">Manage your customers data, loyalty points, and segments</p>
      </div>

      {/* Tabel Utama */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">ID Pelanggan</th>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Tanggal Lahir</th>
                <th className="p-4">Kontak / Email</th>
                <th className="p-4">Alamat & Institusi</th>
                <th className="p-4">Loyalty Tier</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">Memuat data dari Supabase...</td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-slate-400">Belum ada data pelanggan.</td>
                </tr>
              ) : (
                customers.map((c) => {
                  const tier = getLoyaltyTier(c.total_poin);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-600">{c.id_pelanggan || "CEND-?"}</td>
                      <td className="p-4">
                        <div className="font-semibold text-slate-900">{c.nama_pelanggan}</div>
                        <div className="text-xs text-slate-400">{c.segmentasi}</div>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">
                        {formatDate(c.tanggal_lahir)}
                      </td>
                      <td className="p-4">
                        <div>{c.no_handphone}</div>
                        <div className="text-xs text-slate-400">{c.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="max-w-xs truncate">{c.alamat}</div>
                        {c.nama_institusi && <div className="text-xs text-indigo-600 font-medium">🏫 {c.nama_institusi}</div>}
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${tier.color}`}>
                          ★ {tier.label} ({c.total_poin || 0} pts)
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center space-x-3 text-xs font-semibold">
                          <button onClick={() => handleEditClick(c)} className="text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
                          <span className="text-slate-300">|</span>
                          <button onClick={() => handleDeleteClick(c.id)} className="text-red-500 hover:text-red-700 transition-colors">Hapus</button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── MODAL DIALOG POPUP EDIT (MELAYANG) ─── */}
      {isEditModalOpen && editingCustomer && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-scale-up">
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Edit Data Pelanggan</h3>
                <p className="text-xs text-slate-400">ID: {editingCustomer.id_pelanggan}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-white text-xl">&times;</button>
            </div>
            
            <form onSubmit={handleSaveChanges} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nama Pelanggan</label>
                <input type="text" name="nama_pelanggan" value={editingCustomer.nama_pelanggan || ""} onChange={handleInputChange} required className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">No. Handphone (WA)</label>
                  <input type="text" name="no_handphone" value={editingCustomer.no_handphone || ""} onChange={handleInputChange} required className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tanggal Lahir</label>
                  <input type="date" name="tanggal_lahir" value={editingCustomer.tanggal_lahir || ""} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Kategori (Segmentasi)</label>
                  <select name="segmentasi" value={editingCustomer.segmentasi || ""} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="Orang Tua Murid">Orang Tua Murid</option>
                    <option value="Mahasiswa / Umum">Mahasiswa / Umum</option>
                    <option value="Santri">Santri</option>
                    <option value="Institusi (B2B)">Institusi (B2B)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Total Loyalty Poin (Pts)</label>
                  <input type="number" name="total_poin" value={editingCustomer.total_poin || 0} onChange={handleInputChange} min="0" required className="w-full border border-slate-300 bg-amber-50 font-bold text-amber-900 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nama Institusi (Opsional)</label>
                <input type="text" name="nama_institusi" value={editingCustomer.nama_institusi || ""} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Contoh: PCR" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Alamat Pengiriman Utama</label>
                <textarea name="alamat" value={editingCustomer.alamat || ""} onChange={handleInputChange} required rows="2" className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">Simpan Perubahan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}