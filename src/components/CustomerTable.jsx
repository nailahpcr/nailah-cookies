import { Link } from 'react-router-dom';
import LoyaltyBadge from './LoyaltyBadge';

export default function CustomerTable({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">ID Pelanggan</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Pelanggan</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty Tier</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50/70 transition-colors">
              <td className="py-4 px-6 text-sm font-mono font-bold text-gray-500">
                {customer.id_pelanggan || `-`}
              </td>

              <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                {customer.nama_pelanggan}
              </td>
              
              <td className="py-4 px-6">
                <LoyaltyBadge points={customer.points} />
              </td>
              
              {/* Kolom Aksi Gabungan (Detail, Edit, Hapus) */}
              <td className="py-4 px-6 flex justify-center items-center gap-3 text-sm">
                <Link 
                  to={`/customers/${customer.id}`} 
                  className="font-bold text-[#4880FF] hover:text-blue-700 hover:underline transition-colors"
                >
                  View
                </Link>
                
                <button 
                  onClick={() => onEdit(customer)}
                  className="font-bold text-amber-500 hover:text-amber-700 hover:underline transition-colors"
                >
                  Edit
                </button>

                <button 
                  onClick={() => onDelete(customer.id)}
                  className="font-bold text-red-500 hover:text-red-700 hover:underline transition-colors"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="4" className="p-8 text-center text-gray-400 text-sm">Tidak ada data pelanggan.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}