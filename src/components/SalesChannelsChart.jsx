// src/components/SalesChannelsChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Simulasi data penjualan berdasarkan kanal (dalam Rupiah)
const channelData = [
  { name: 'Senin', Toko: 4000000, Shopee: 2400000 },
  { name: 'Selasa', Toko: 3000000, Shopee: 1398000 },
  { name: 'Rabu', Toko: 2000000, Shopee: 9800000 },
  { name: 'Kamis', Toko: 2780000, Shopee: 3908000 },
  { name: 'Jumat', Toko: 1890000, Shopee: 4800000 },
  { name: 'Sabtu', Toko: 6390000, Shopee: 3800000 },
  { name: 'Minggu', Toko: 8490000, Shopee: 4300000 },
];

const formatRupiah = (value) => {
  return `Rp ${(value / 1000000).toFixed(1)}M`;
};

export default function SalesChannelsChart() {
  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={channelData}
          margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          barGap={6}
        >
          {/* 🌟 SUDAH DIPERBAIKI: Menggunakan CartesianGrid yang benar */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 12 }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#94A3B8', fontSize: 11 }}
            tickFormatter={formatRupiah}
          />
          <Tooltip 
            formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`]}
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E2E8F0' }}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '13px', fontWeight: 500 }}
          />
          {/* Warna Biru untuk Toko, Warna Oranye Khas Shopee */}
          <Bar dataKey="Toko" fill="#4880FF" radius={[4, 4, 0, 0]} name="Langsung di Toko" />
          <Bar dataKey="Shopee" fill="#EE4D2D" radius={[4, 4, 0, 0]} name="Shopee Marketplace" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}