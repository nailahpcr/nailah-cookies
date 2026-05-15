import { Link } from "react-router-dom";
import { UserPlus, Filter, Eye } from "lucide-react";
import { customersData } from "../data/customers"; 


const CustomersPage = () => {
  // Langsung pakai customersData, tidak perlu state atau hooks
  const customers = customersData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pelanggan</h1>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <UserPlus size={16} /> Tambah Pelanggan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Nama</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{c.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    c.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' : 
                    c.tier === 'Gold' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/customers/${c.id}`} className="text-indigo-600 hover:underline flex items-center gap-1">
                    <Eye size={14} /> Lihat Detail
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomersPage;