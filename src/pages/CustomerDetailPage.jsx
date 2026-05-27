import { useParams, Link } from 'react-router-dom';
import { customers } from '../data/customers'; 
import { ArrowLeft, Phone, MapPin, Calendar, CreditCard, Award, Clock } from 'lucide-react';
import LoyaltyBadge from '../components/LoyaltyBadge';
import CustomerCard from '../components/CustomerCard';
import FeedbackCard from '../components/FeedbackCard';

export default function CustomerDetailPage() {
  const { id } = useParams();
  const customer = customers?.find((c) => String(c.id) === String(id));

  if (!customer) return <div className="p-10 text-center text-gray-500">Data pelanggan tidak ditemukan!</div>;

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
        
        {/* Kolom Kiri: Menggunakan Gabungan Komponen Reusable Baru */}
        <div className="lg:col-span-1 space-y-6">
          {/* Sinkronisasi Props ke Komponen CustomerCard */}
          <CustomerCard 
            name={customer.name} 
            email={`${customer.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`} 
            joinDate={customer.tgl_lahir || '01-01-2024'} 
          />
          
          {/* Sinkronisasi Props ke Komponen FeedbackCard */}
          <FeedbackCard 
            user={customer.name} 
            rating={5} 
            comment="Sangat puas dengan respon layanan operasional logistik akun dashboard ini!" 
          />
        </div>

        {/* Kolom Kanan: Detail Grid Meta Akun */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="font-bold text-gray-900 text-base">Informasi Akun Lengkap</h3>
            {/* Memanggil Komponen LoyaltyBadge berbasis Poin Asli */}
            <LoyaltyBadge points={customer.points || 0} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoItem icon={<Phone size={18} />} label="No. Handphone" value={customer.phone} />
            <InfoItem icon={<MapPin size={18} />} label="Alamat Rumah" value={customer.alamat} />
            <InfoItem icon={<Calendar size={18} />} label="Tanggal Lahir" value={customer.tgl_lahir} />
            <InfoItem icon={<CreditCard size={18} />} label="Total Belanja" value={`Rp ${customer.totalSpend?.toLocaleString('id-ID')}`} />
            <InfoItem icon={<Award size={18} />} label="Loyalty Points" value={`${customer.points?.toLocaleString('id-ID')} Pts`} />
            <InfoItem icon={<Clock size={18} />} label="Aktivitas Terakhir" value={customer.tgl_terakhir} />
          </div>
        </div>

      </div>
    </div>
  );
}

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