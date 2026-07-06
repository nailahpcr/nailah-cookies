import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../services/authAPI";

// Import komponen terpisah
import SegmentFilter from "../components/SegmentFilter";
import EditCustomerModal from "../components/EditCustomerModal";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Filter & Pencarian
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  // State untuk Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);

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

  const getLoyaltyTier = (poin) => {
    const pts = Number(poin) || 0;
    if (pts >= 500) return { label: "Platinum", color: "bg-purple-100 text-purple-800" };
    if (pts >= 150) return { label: "Gold", color: "bg-amber-100 text-amber-800" };
    return { label: "Silver", color: "bg-slate-100 text-slate-800" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  const handleEditClick = (customer) => {
    setEditingCustomer({ ...customer });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      const tierInfo = getLoyaltyTier(editingCustomer.total_poin);
      const updatedData = {
        nama_pelanggan: editingCustomer.nama_pelanggan,
        no_handphone: editingCustomer.no_handphone,
        alamat: editingCustomer.alamat,
        segmentasi: editingCustomer.segmentasi,
        nama_institusi: editingCustomer.nama_institusi,
        tanggal_lahir: editingCustomer.tanggal_lahir || null,
        total_poin: Number(editingCustomer.total_poin) || 0,
        status_pelanggan: editingCustomer.total_poin > 0 ? `${tierInfo.label} Member` : "New Customer"
      };

      await authAPI.updateCustomer(editingCustomer.id, updatedData);
      alert("Data pelanggan berhasil diperbarui!");
      setIsEditModalOpen(false);
      loadCustomers();
    } catch (error) {
      alert("Gagal memperbarui data: " + error.message);
    }
  };

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

  // Filter Data Gabungan
  const filteredCustomers = customers.filter((cust) => {
    const matchSegment = activeTab === "Semua" || cust.segmentasi === activeTab;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch = 
      (cust.nama_pelanggan || "").toLowerCase().includes(searchLower) ||
      (cust.id_pelanggan || "").toLowerCase().includes(searchLower);
    return matchSegment && matchSearch;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">Customer List</h1>
        <p className="text-sm text-slate-500">Manage your customers data, loyalty points, and segments</p>
      </div>

      {/* Kontrol Filter & Pencarian */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 gap-4 rounded-xl border border-slate-200 shadow-sm">
        <input 
          type="text"
          placeholder="Cari nama atau ID pelanggan..."
          className="px-4 py-2 border border-slate-300 rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <span className="text-xs font-bold text-slate-400 hidden lg:inline">Segmen:</span>
          <SegmentFilter 
            options={["Semua", "Orang Tua Murid", "Mahasiswa / Umum", "Santri", "Institusi (B2B)"]} 
            activeSegment={activeTab} 
            onSelect={setActiveTab} 
          />
        </div>
      </div>

      {/* Tabel Utama */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">ID Pelanggan</th>
                <th className="p-4">Nama Pelanggan</th>
                <th className="p-4">Segmentasi</th>
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
                  <td colSpan="8" className="p-8 text-center text-slate-400">Memuat data dari Supabase...</td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-slate-400">Tidak ada data pelanggan yang cocok.</td>
                </tr>
              ) : (
                filteredCustomers.map((c) => {
                  const tier = getLoyaltyTier(c.total_poin);
                  return (
                    <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-mono font-bold text-slate-600">{c.id_pelanggan || "CEND-?"}</td>
                      <td className="p-4">
                        <Link to={`/customers/${c.id}`} className="group">
                          <div className="font-semibold text-slate-900 group-hover:text-blue-600 group-hover:underline transition-all">
                            {c.nama_pelanggan}
                          </div>
                        </Link>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold shadow-sm ${
                          c.segmentasi === 'Orang Tua Murid' ? 'bg-blue-100 text-blue-700' :
                          c.segmentasi === 'Mahasiswa / Umum' ? 'bg-emerald-100 text-emerald-700' :
                          c.segmentasi === 'Santri' ? 'bg-amber-100 text-amber-700' : 
                          c.segmentasi === 'Institusi (B2B)' ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {c.segmentasi || "Belum Set"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600 font-medium">{formatDate(c.tanggal_lahir)}</td>
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

      {/* Gunakan Komponen Modal Terpisah */}
      <EditCustomerModal 
        isOpen={isEditModalOpen}
        customer={editingCustomer}
        onClose={() => setIsEditModalOpen(false)}
        onChange={handleInputChange}
        onSave={handleSaveChanges}
      />
    </div>
  );
}