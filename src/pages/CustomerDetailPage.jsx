import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, History } from 'lucide-react';
import { customersData } from '../data/customers'; // Mengambil mock data

const CustomerDetailPage = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const navigate = useNavigate();

  // Cari data pelanggan berdasarkan ID dari parameter URL
  const customer = customersData.find(c => c.id === parseInt(id));

  if (!customer) {
    return <div className="p-10 text-center">Pelanggan tidak ditemukan.</div>;
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
      >
        <ArrowLeft size={20} /> Kembali
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Profil Singkat */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
              {customer.name.charAt(0)}
            </div>
            <h2 className="text-xl font-bold text-gray-800">{customer.name}</h2>
            <p className="text-indigo-600 font-medium mb-4">{customer.tier} Member</p>
            
            <div className="w-full space-y-3 text-sm text-gray-600 border-t pt-4">
              <div className="flex items-center gap-3">
                <Phone size={16} /> <span>+{customer.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} /> <span>{customer.name.toLowerCase().replace(' ', '.')}@email.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} /> <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Aktivitas & Riwayat */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <History size={18} /> Riwayat Transaksi Terbaru
            </h3>
            <div className="space-y-4">
              {/* Dummy Transaction List */}
              {[1, 2].map((item) => (
                <div key={item} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">Order #120{item}</p>
                    <p className="text-xs text-gray-500">12 Mei 2026 • 14:20 WIB</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm">Rp 1.250.000</p>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Sukses</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;