export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Dashboard Toko Buku
      </h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-4 mb-6">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Total Penjualan</p>
          <h2 className="text-xl font-bold text-red-600">120 Buku</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Pelanggan</p>
          <h2 className="text-xl font-bold text-red-600">85 Orang</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Pre Order</p>
          <h2 className="text-xl font-bold text-red-600">20 Buku</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500">Pendapatan</p>
          <h2 className="text-xl font-bold text-red-600">
            Rp 12.000.000
          </h2>
        </div>

      </div>

      {/* CHART AREA */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-semibold mb-4">Grafik Penjualan</h2>

        <div className="h-40 bg-red-100 rounded flex items-center justify-center">
          <p className="text-red-500">Chart nanti di sini</p>
        </div>
      </div>
    </div>
  );
}