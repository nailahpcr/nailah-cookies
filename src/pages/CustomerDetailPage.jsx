import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MdArrowBack, MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { customersData } from "../data/customers";

const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Cari data pelanggan berdasarkan ID dari URL
  const customer = customersData.find((c) => c.id === parseInt(id));

  if (!customer) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">Pelanggan tidak ditemukan</h2>
        <button onClick={() => navigate("/customers")} className="text-red-700 underline mt-4">
          Kembali ke Daftar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-600 hover:text-red-700 transition-colors font-medium"
      >
        <MdArrowBack size={20} /> Kembali
      </button>

      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-3xl font-bold">
            {customer.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800">{customer.name}</h1>
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-bold">
              {customer.tier} Member
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="p-4 border border-slate-50 rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <MdPhone /> <span className="text-xs font-bold uppercase">Telepon</span>
            </div>
            <p className="font-semibold text-slate-800">{customer.phone || "-"}</p>
          </div>
          <div className="p-4 border border-slate-50 rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <MdEmail /> <span className="text-xs font-bold uppercase">Email</span>
            </div>
            <p className="font-semibold text-slate-800">{customer.email || "-"}</p>
          </div>
          <div className="p-4 border border-slate-50 rounded-xl bg-slate-50/50">
            <div className="flex items-center gap-3 text-slate-500 mb-2">
              <MdLocationOn /> <span className="text-xs font-bold uppercase">Total Belanja</span>
            </div>
            <p className="font-bold text-red-700 text-lg">Rp {customer.totalSpend?.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailPage;