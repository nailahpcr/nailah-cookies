import React from "react";
import { Link } from "react-router-dom"; // Tambahkan Link untuk navigasi ke detail
import { UserPlus, Filter, Eye } from 'lucide-react';
import { customersData } from "../data/customers";

const CustomersPage = () => {
  // Langsung gunakan customersData tanpa loading (karena tidak pakai hooks)
  const customers = customersData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Pelanggan</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Filter size={16} /> Filter
          </button>
          <button className="flex items-center gap-2 bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-800 transition-colors">
            <UserPlus size={16} /> Tambah Pelanggan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Belanja</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    c.tier === 'Platinum' ? 'bg-purple-100 text-purple-700' : 
                    c.tier === 'Gold' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {c.tier}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600 font-mono text-sm">
                  Rp {c.totalSpend?.toLocaleString() || 0}
                </td>
                <td className="px-6 py-4 text-center">
                  <Link 
                    to={`/customers/${c.id}`} 
                    className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 font-medium text-sm"
                  >
                    <Eye size={16} /> Detail
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