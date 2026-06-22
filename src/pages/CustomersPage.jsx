import { useState, useEffect } from 'react';
import CustomerTable from '../components/CustomerTable';
import SegmentFilter from '../components/SegmentFilter';
import { authAPI } from '../services/authAPI';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSegment, setActiveSegment] = useState('All');

  // State untuk menangani edit data
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ nama_pelanggan: "", no_handphone: "", alamat: "" });

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await authAPI.fetchCustomers();
      setCustomers(data);
    } catch (err) {
      alert("Gagal memuat data pelanggan: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  // ─── FUNGSI DELETE ───
  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data pelanggan ini dari Supabase?")) {
      try {
        await authAPI.deleteCustomer(id);
        alert("Pelanggan berhasil dihapus!");
        loadCustomers(); // Reload tabel otomatis
      } catch (err) {
        alert(err.message);
      }
    }
  };

  // ─── FUNGSI MENGAKTIFKAN MODE EDIT ───
  const handleStartEdit = (customer) => {
    setEditingId(customer.id);
    setEditForm({
      nama_pelanggan: customer.nama_pelanggan,
      no_handphone: customer.no_handphone || "",
      alamat: customer.alamat || ""
    });
  };

  // ─── FUNGSI UPDATE (SUBMIT DATA BARU) ───
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await authAPI.updateCustomer(editingId, editForm);
      alert("Data pelanggan berhasil diperbarui!");
      setEditingId(null); // Tutup panel form edit
      loadCustomers(); // Reload tabel otomatis
    } catch (err) {
      alert(err.message);
    }
  };

  const getCustomerTier = (pts) => {
    const points = pts || 0; 
    if (points >= 1000) return 'Platinum';
    if (points >= 500) return 'Gold';
    return 'Silver';
  };

  const filteredCustomers = customers.filter(customer => {
    if (activeSegment === 'All') return true;
    return getCustomerTier(customer.points) === activeSegment;
  });

  return (
    <div className="space-y-6 p-6 bg-[#F5F6FA] min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your customers data and segments</p>
        </div>
      </div>

      {/* TAMPILKAN PANEL EDIT HANYA JIKA TOMBOL EDIT DIKLIK */}
      {editingId && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl max-w-md shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-amber-800 uppercase tracking-wider">Mode Edit Data Pelanggan</h3>
          <form onSubmit={handleUpdateSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Nama Pelanggan"
              value={editForm.nama_pelanggan}
              onChange={(e) => setEditForm({ ...editForm, nama_pelanggan: e.target.value })}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm" required
            />
            <input
              type="text"
              placeholder="No. Handphone"
              value={editForm.no_handphone}
              onChange={(e) => setEditForm({ ...editForm, no_handphone: e.target.value })}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm"
            />
            <input
              type="text"
              placeholder="Alamat Rumah"
              value={editForm.alamat}
              onChange={(e) => setEditForm({ ...editForm, alamat: e.target.value })}
              className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-sm"
            />
            <div className="flex gap-2 pt-1">
              <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition">Simpan Perubahan</button>
              <button type="button" onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-xl text-xs font-bold transition">Batal</button>
            </div>
          </form>
        </div>
      )}

      <SegmentFilter 
        options={['All', 'Silver', 'Gold', 'Platinum']} 
        activeSegment={activeSegment} 
        onSelect={setActiveSegment} 
      />

      {loading ? (
        <div className="p-8 text-center text-gray-500 bg-white rounded-xl shadow-sm border">
          Sedang mengambil data dari database...
        </div>
      ) : (
        /* Kirim fungsi edit & delete ke komponen tabel */
        <CustomerTable 
          data={filteredCustomers} 
          onEdit={handleStartEdit} 
          onDelete={handleDelete} 
        />
      )}
    </div>
  );
}