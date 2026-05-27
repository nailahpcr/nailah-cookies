import { Link } from 'react-router-dom';
import LoyaltyBadge from './LoyaltyBadge';

export default function CustomerTable({ data }) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Nama Pelanggan</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider">Loyalty Tier</th>
            <th className="py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((customer) => (
            <tr key={customer.id} className="hover:bg-gray-50/70 transition-colors">
              {/* Kolom Nama */}
              <td className="py-4 px-6 text-sm font-semibold text-gray-800">
                {customer.name}
              </td>
              
              {/* Kolom Badge Loyalty */}
              <td className="py-4 px-6">
                <LoyaltyBadge points={customer.points} />
              </td>
              
              {/* Kolom Aksi (View Detail) dibuat rata kanan seperti standarisasi tabel figma */}
              <td className="py-4 px-6 text-right">
                <Link 
                  to={`/customers/${customer.id}`} 
                  className="inline-flex items-center text-sm font-bold text-[#4880FF] hover:text-blue-700 hover:underline transition-colors"
                >
                  View Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}