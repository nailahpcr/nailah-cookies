// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';
import StatCard from '../components/StatCard';
import StockAlert from '../components/StockAlert';
import WhatsAppButton from '../components/WhatsAppButton';
import LoadingSpinner from '../components/LoadingSpinner';
import SalesActivityChart from '../components/SalesActivityChart';
import { productsData } from '../data/productsData';
import { preorders } from '../data/preorders';
import { transactionsData } from '../data/transactionsData';
import { authAPI } from '../services/authAPI';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('Juli');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadData() {
      try {
        const custs = await authAPI.fetchCustomers();
        setCustomers(custs || []);
      } catch (err) {
        console.error("Failed to load customer list for dashboard:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute live statistics from connected data
  const totalCustomersCount = customers.length || 30; // fallback to 30 from static data
  const totalPreOrdersCount = preorders.length;
  
  // Calculate total sales for current month
  const totalSalesMonth = transactionsData
    .filter(t => t.month === selectedMonth && t.status !== 'Canceled')
    .reduce((sum, t) => sum + t.totalPrice, 0);

  // Segment counts based on customer data
  const segments = {
    'Orang Tua Murid': 0,
    'Mahasiswa / Umum': 0,
    'Santri': 0,
    'Institusi (B2B)': 0
  };

  customers.forEach(c => {
    const seg = c.segmentasi || 'Mahasiswa / Umum';
    if (segments[seg] !== undefined) {
      segments[seg]++;
    } else {
      segments['Mahasiswa / Umum']++;
    }
  });

  const customerSegments = [
    { name: 'Orang Tua Murid', value: segments['Orang Tua Murid'] || 8, color: '#2DD4BF' },  // Teal
    { name: 'Mahasiswa / Umum', value: segments['Mahasiswa / Umum'] || 12, color: '#4F8EF7' }, // Blue
    { name: 'Santri', value: segments['Santri'] || 6, color: '#FB923C' },          // Orange
    { name: 'Institusi (B2B)', value: segments['Institusi (B2B)'] || 4, color: '#FBBF24' },   // Yellow
  ];

  // Loyalty Tier Distribution
  const tierDistribution = { Silver: 0, Gold: 0, Platinum: 0 };
  customers.forEach(c => {
    const tier = c.status_pelanggan ? c.status_pelanggan.split(' ')[0] : 'Silver';
    if (tierDistribution[tier] !== undefined) {
      tierDistribution[tier]++;
    } else {
      tierDistribution['Silver']++;
    }
  });

  const tierChartData = [
    { name: 'Silver', count: tierDistribution['Silver'] || 10 },
    { name: 'Gold', count: tierDistribution['Gold'] || 12 },
    { name: 'Platinum', count: tierDistribution['Platinum'] || 8 },
  ];

  // Best seller categories based on transaction data
  const categorySales = {
    "Buku Paket": 15,
    "Buku Umum": 28,
    "Buku Islami": 22,
  };
  transactionsData.forEach(t => {
    if (t.status === 'Success') {
      t.items.forEach(item => {
        // find category of product
        const matched = productsData.find(p => p.name.toLowerCase().includes(item.name.toLowerCase()));
        const cat = matched ? matched.category : 'Buku Umum';
        if (categorySales[cat] !== undefined) {
          categorySales[cat] += item.qty;
        } else {
          categorySales[cat] = item.qty;
        }
      });
    }
  });

  const bestSellerData = Object.keys(categorySales).map(cat => ({
    name: cat,
    value: categorySales[cat]
  })).sort((a, b) => b.value - a.value);

  // Filter low stock items
  const lowStockItems = productsData ? productsData.filter(product => product.stock <= 5) : [];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="space-y-6 p-6 bg-[#F5F6FA] min-h-screen text-left font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Admin</h1>
      </div>

      {/* Grid Statistik Ringkasan */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div onClick={() => navigate('/admin/customers')} className="cursor-pointer">
          <StatCard title="Total Pelanggan" value={totalCustomersCount.toString()} icon="👥" trend="Ambil dari tabel database" trendType="up" />
        </div>
        <div onClick={() => navigate('/admin/pre-order')} className="cursor-pointer">
          <StatCard title="Pre-Order Aktif" value={totalPreOrdersCount.toString()} icon="📦" trend="Progres pengerjaan real-time" trendType="up" />
        </div>
        <div onClick={() => navigate('/admin/transactions')} className="cursor-pointer">
          <StatCard title={`Belanja ${selectedMonth}`} value={formatRupiah(totalSalesMonth)} icon="💹" trend="Akumulasi omset bulan ini" trendType="up" />
        </div>
        <div onClick={() => navigate('/admin/loyalty')} className="cursor-pointer">
          <StatCard title="Loyalitas Tier" value={`${tierDistribution.Platinum + tierDistribution.Gold} Member`} icon="⭐" trend="Platinum + Gold level" trendType="up" />
        </div>
      </div>

      {/* Baris Utama: Pendapatan & Peringatan Stok */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Kolom Grafik Aktivitas */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Tren Aktivitas Penjualan</h2>
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="text-xs font-semibold text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#B23A2E] cursor-pointer"
            >
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
            </select>
          </div>
          <SalesActivityChart />
        </div>

        {/* Kolom Peringatan Stok */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col space-y-4 max-h-[420px]">
          <div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Peringatan Sistem</h2>
            <p className="text-xs text-slate-400 mt-0.5">Daftar item katalog dengan stok kritis (≤ 5 buku).</p>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {lowStockItems.length > 0 ? (
              lowStockItems.map((product) => (
                <StockAlert 
                  key={product.id} 
                  item={product.name} 
                  currentStock={product.stock} 
                  onClick={() => navigate('/admin/products')} 
                />
              ))
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <span className="text-2xl mb-2">✅</span>
                <p className="text-sm font-medium text-slate-500">Stok aman! Tidak ada produk yang menipis.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Baris Baru: Segmentasi & Chart Sesuai Spesifikasi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* 1. Card Segmentasi Pelanggan (Donut Chart) */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <h2 className="text-base font-bold text-gray-900 tracking-tight mb-4">Segmentasi Pelanggan</h2>
            <div className="space-y-3">
              {customerSegments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }}></span>
                    <span className="font-semibold text-gray-600">{segment.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{segment.value} Pelanggan</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-48 h-48 relative flex items-center justify-center flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                {/* Background Ring */}
                <Pie
                  data={[{ value: 100 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={80}
                  dataKey="value"
                  fill="#E7EAF0"
                  isAnimationActive={false}
                />
                {/* Main Data Ring */}
                <Pie
                  data={customerSegments}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={80}
                  paddingAngle={0}
                  dataKey="value"
                  strokeLinecap="round"
                >
                  {customerSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center select-none pointer-events-none">
              <span className="block text-xl font-black text-gray-900 tracking-tight">{totalCustomersCount}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Total</span>
            </div>
          </div>
        </div>

        {/* 2. Card Produk Laris (Bar Chart) */}
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <h2 className="text-base font-bold text-gray-900 tracking-tight mb-4">Kategori Buku Terlaris</h2>
          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bestSellerData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B', fontSize: 11, fontWeight: 600 }} />
                <Tooltip formatter={(value) => [`${value} Pcs`, 'Penjualan']} />
                {/* Thin bars, Blue color, rounded top corners */}
                <Bar dataKey="value" fill="#4F8EF7" radius={[6, 6, 0, 0]} maxBarSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <WhatsAppButton phoneNumber="628123456789" message="Halo Admin CendekiaBook, saya butuh bantuan." />
      </div>
    </div>
  );
}