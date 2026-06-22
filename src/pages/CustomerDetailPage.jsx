import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authAPI } from '../services/authAPI'; // Import service Supabase
import { ArrowLeft, Phone, MapPin, Calendar, CreditCard, Award, Clock } from 'lucide-react';
import LoyaltyBadge from '../components/LoyaltyBadge';
import CustomerCard from '../components/CustomerCard';
import FeedbackCard from '../components/FeedbackCard';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil data detail pelanggan dari database Supabase saat halaman dibuka
  useEffect(() => {
    const getDetailData = async () => {
      try {
        setLoading(true);
        const data = await authAPI.fetchCustomerById(id);
        if (!data) {
          setError("Data pelanggan tidak ditemukan di database!");
        } else {
          setCustomer(data);
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };
    getDetailData();
  }, [id]);

  if (loading) return <div className="p-10 text-center text-sm text-gray-500">Sedang memuat data profil...</div>;
  if (error || !customer) return <div className="p-10 text-center text-red-500 font-semibold">{error || "Data pelanggan tidak ditemukan!"}</div>;

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen max-w-5xl mx-auto space-y-6">
      {/* Header Top Nav */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Profil Pelanggan</h1>
        <Link to="/customers" className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold hover:bg-gray-50 text-sm shadow-sm transition-all">
          <ArrowLeft size={16} /> Kembali
        </Link>
      </div>

      {/* Grid Layout Detail Informasi */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri */}
        <div className="lg:col-span-1 space-y-6">
          <CustomerCard 
            name={customer.nama_pelanggan} 
            email={customer.email} 
            joinDate={customer.created_at ? new Date(customer.created_at).toLocaleDateString('id-ID') : '01-01-2024'} 
          />
          
          <FeedbackCard 
            user={customer.nama_pelanggan} 
            rating={5} 
            comment="Sangat puas dengan respon layanan operasional logistik akun dashboard ini!" 
          />
        </div>

        {/* Kolom Kanan */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 text-base">Informasi Akun Lengkap</h3>
            <LoyaltyBadge points={customer.points || 0} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Phone size={18} />} label="No. Handphone" value={customer.no_handphone} />
            <InfoItem icon={<MapPin size={18} />} label="Alamat Rumah" value={customer.alamat} />
            <InfoItem icon={<Calendar size={18} />} label="Tanggal Lahir" value={customer.tgl_lahir} />
            <InfoItem icon={<CreditCard size={18} />} label="Total Belanja" value={customer.totalSpend ? `Rp ${customer.totalSpend.toLocaleString('id-ID')}` : 'Rp 0'} />
            <InfoItem icon={<Award size={18} />} label="Loyalty Points" value={`${(customer.points || 0).toLocaleString('id-ID')} Pts`} />
            <InfoItem icon={<Clock size={18} />} label="Aktivitas Terakhir (Terdaftar)" value={customer.created_at ? new Date(customer.created_at).toLocaleDateString('id-ID') : '-'} />
          </div>
        </div>

      </div>
    </div>
  );
}

// Komponen Pembantu InfoItem
function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-all">
      <div className="p-2 bg-blue-50 text-[#4880FF] rounded-xl shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="font-bold text-gray-800 mt-0.5 text-sm">{value || '-'}</p>
      </div>
    </div>
  );
}