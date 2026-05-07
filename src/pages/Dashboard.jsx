import React from 'react';
import { 
  MdMenuBook, 
  MdShoppingCart, 
  MdPayments, 
  MdAssignmentReturn 
} from "react-icons/md";

// Data untuk Card Statistik Toko Buku
const statsData = [
  {
    title: "Total Judul Buku",
    value: "1,240",
    icon: <MdMenuBook className="text-[#8280FF]" size={28} />,
    bg: "bg-[#8280FF]/10",
    trend: "8.5% Up from yesterday",
    isUp: true
  },
  {
    title: "Buku Terjual",
    value: "452",
    icon: <MdShoppingCart className="text-[#FEC53D]" size={28} />,
    bg: "bg-[#FEC53D]/10",
    trend: "1.3% Up from past week",
    isUp: true
  },
  {
    title: "Total Pendapatan",
    value: "Rp 12.450.000",
    icon: <MdPayments className="text-[#4AD991]" size={28} />,
    bg: "bg-[#4AD991]/10",
    trend: "4.3% Down from yesterday",
    isUp: false
  },
  {
    title: "Stok Menipis",
    value: "12",
    icon: <MdAssignmentReturn className="text-[#FF9066]" size={28} />,
    bg: "bg-[#FF9066]/10",
    trend: "1.8% Up from yesterday",
    isUp: true
  }
];

// Data riwayat transaksi buku (Tabel)
const transactions = [
  {
    bookName: "Laskar Pelangi",
    category: "Novel",
    dateTime: "07.05.2026 - 10.20 AM",
    piece: 2,
    amount: "Rp 190.000",
    status: "Selesai"
  },
  {
    bookName: "Filosofi Teras",
    category: "Self Improvement",
    dateTime: "07.05.2026 - 11.45 AM",
    piece: 1,
    amount: "Rp 98.000",
    status: "Selesai"
  },
  {
    bookName: "Bumi (Tere Liye)",
    category: "Fiksi",
    dateTime: "07.05.2026 - 01.15 PM",
    piece: 3,
    amount: "Rp 285.000",
    status: "Diproses"
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-[#202224]">Dashboard Toko Buku</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-[#202224]/60 mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#202224]">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-xs font-medium">
              <span className={stat.isUp ? "text-green-500" : "text-red-500"}>
                {stat.isUp ? "▲" : "▼"} {stat.trend.split(" ")[0]}
              </span>
              <span className="text-gray-400 ml-1">{stat.trend.split(" ").slice(1).join(" ")}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Sales Details Placeholder (Grafik) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 h-80 flex flex-col">
        <h3 className="font-bold text-lg mb-4">Grafik Penjualan Buku</h3>
        <div className="flex-1 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
          Area Grafik Penjualan (Gunakan Chart.js/Recharts)
        </div>
      </div>

      {/* Deals Details (Tabel Transaksi Buku) */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-lg">Transaksi Terbaru</h3>
          <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm outline-none">
            <option>Mei</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm font-bold text-[#202224] bg-gray-50">
                <th className="px-4 py-3 rounded-l-xl">Judul Buku</th>
                <th className="px-4 py-3">Kategori</th>
                <th className="px-4 py-3">Waktu</th>
                <th className="px-4 py-3">Jumlah</th>
                <th className="px-4 py-3">Total Harga</th>
                <th className="px-4 py-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((t, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4 font-semibold">{t.bookName}</td>
                  <td className="px-4 py-4 text-gray-500">{t.category}</td>
                  <td className="px-4 py-4 text-gray-500">{t.dateTime}</td>
                  <td className="px-4 py-4">{t.piece} eks</td>
                  <td className="px-4 py-4 font-bold">{t.amount}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      t.status === "Selesai" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"
                    }`}>
                      {t.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}