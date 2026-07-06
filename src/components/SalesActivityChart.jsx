// src/components/SalesActivityChart.jsx
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// 1. Data koordinat grafik yang disesuaikan persis dengan lekukan ombak Figma DashStack
const data = [
  { name: '5k', sales: 25 },
  { name: '10k', sales: 49 },
  { name: '15k', sales: 35 },
  { name: '20k', sales: 92 }, // Titik puncak tertinggi sesuai indikator figma
  { name: '25k', sales: 45 },
  { name: '30k', sales: 55 },
  { name: '35k', sales: 28 },
  { name: '40k', sales: 62 },
  { name: '45k', sales: 58 },
  { name: '50k', sales: 40 },
  { name: '55k', sales: 50 },
  { name: '60k', sales: 42 },
];

// 2. Custom Tooltip minimalis saat kursor mouse melayang di atas grafik
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#4880FF] text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-md border border-blue-400">
        {`${payload[0].value}%`}
      </div>
    );
  }
  return null;
};

export default function SalesActivityChart() {
  return (
    <div className="w-full h-[320px] mt-4">
      <ResponsiveContainer width="100%" h="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* Gradien Warna Biru Transparan (Efek Fade-out di bawah garis) */}
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4880FF" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#4880FF" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          {/* Garis Grid Horizontal Tipis (Garis vertikal dimatikan sesuai figma) */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F3F9" />
          
          {/* Konfigurasi Sumbu X (Horizontal) */}
          <XAxis 
            dataKey="name" 
            tickLine={false} 
            axisLine={false} 
            stroke="#94A3B8" 
            style={{ fontSize: '11px', fontWeight: 500 }}
          />
          
          {/* Konfigurasi Sumbu Y (Vertikal) */}
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            tickCount={6}
            tickLine={false} 
            axisLine={false} 
            stroke="#94A3B8"
            style={{ fontSize: '11px', fontWeight: 500 }}
          />
          
          {/* Tooltip & Garis Bantu Putus-putus saat Hover */}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#4880FF', strokeWidth: 1, strokeDasharray: '4 4' }} 
          />
          
          {/* Garis Ombak Utama & Efek Isi Gradien */}
          <Area 
            type="monotone" 
            dataKey="sales" 
            stroke="#4880FF" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorSales)" 
            dot={{ r: 4, strokeWidth: 2, fill: '#4880FF', stroke: '#FFF' }}
            activeDot={{ r: 6, strokeWidth: 0, fill: '#4880FF' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}