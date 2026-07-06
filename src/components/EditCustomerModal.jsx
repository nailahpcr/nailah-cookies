import React from "react";

export default function EditCustomerModal({ isOpen, customer, onClose, onChange, onSave }) {
  if (!isOpen || !customer) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-lg overflow-hidden animate-scale-up">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-lg">Edit Data Pelanggan</h3>
            <p className="text-xs text-slate-400">ID: {customer.id_pelanggan}</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-xl">
            &times;
          </button>
        </div>
        
        {/* Modal Body / Form */}
        <form onSubmit={onSave} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nama Pelanggan</label>
            <input 
              type="text" 
              name="nama_pelanggan" 
              value={customer.nama_pelanggan || ""} 
              onChange={onChange} 
              required 
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">No. Handphone (WA)</label>
              <input 
                type="text" 
                name="no_handphone" 
                value={customer.no_handphone || ""} 
                onChange={onChange} 
                required 
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tanggal Lahir</label>
              <input 
                type="date" 
                name="tanggal_lahir" 
                value={customer.tanggal_lahir || ""} 
                onChange={onChange} 
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Kategori (Segmentasi)</label>
              <select 
                name="segmentasi" 
                value={customer.segmentasi || ""} 
                onChange={onChange} 
                className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Orang Tua Murid">Orang Tua Murid</option>
                <option value="Mahasiswa / Umum">Mahasiswa / Umum</option>
                <option value="Santri">Santri</option>
                <option value="Institusi (B2B)">Institusi (B2B)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Total Loyalty Poin (Pts)</label>
              <input 
                type="number" 
                name="total_poin" 
                value={customer.total_poin || 0} 
                onChange={onChange} 
                min="0" 
                required 
                className="w-full border border-slate-300 bg-amber-50 font-bold text-amber-900 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Nama Institusi (Opsional)</label>
            <input 
              type="text" 
              name="nama_institusi" 
              value={customer.nama_institusi || ""} 
              onChange={onChange} 
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Contoh: PCR" 
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Alamat Pengiriman Utama</label>
            <textarea 
              name="alamat" 
              value={customer.alamat || ""} 
              onChange={onChange} 
              required 
              rows="2" 
              className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors"
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors"
            >
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}