import { useState } from 'react';
import { productsData } from '../data/productsData';
import SegmentFilter from '../components/SegmentFilter';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Logika Filter Berdasarkan Kategori Utama (Semua / Buku / Alat Tulis)
  const filteredByCategory = productsData.filter(product => {
    if (activeCategory === 'Semua') return true;
    // Menyamakan opsi filter dengan kategori yang ada di JSON
    return product.category === activeCategory;
  });

  // 2. Logika Filter Pencarian Berdasarkan Nama atau ID Produk
  const finalFilteredProducts = filteredByCategory.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-6">
      
      {/* ================= BARIS HEADER & PENCARIAN ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola katalog, pantau sisa kuantitas, dan perbarui harga komoditas tokomu.
          </p>
        </div>
        
        {/* Input Pencarian Modul Dashboard */}
        <div className="w-full md:w-80 relative">
          <input
            type="text"
            placeholder="Cari nama atau ID produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20 focus:border-[#4880FF] transition-all shadow-sm placeholder:text-gray-400"
          />
          <span className="absolute left-3 top-3 text-gray-400 text-sm">🔍</span>
        </div>
      </div>

      {/* ================= BARIS FILTER KATEGORI ================= */}
      <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-fit">
        <SegmentFilter 
          options={['Semua', 'Buku', 'Alat Tulis']} 
          activeSegment={activeCategory} 
          onSelect={setActiveCategory} 
        />
      </div>

      {/* ================= GRID DATA KATALOG PRODUK ================= */}
      {finalFilteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {finalFilteredProducts.map((product) => {
            // Indikator otomatis jika stok tipis (dibawah 10 unit)
            const isLowStock = product.stock <= 10;

            return (
              <div 
                key={product.id} 
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative"
              >
                {/* Area Foto Produk */}
                <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  
                  {/* Badge Kategori Produk */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-sm ${
                    product.category === 'Buku' 
                      ? 'bg-purple-100/90 text-purple-700 border border-purple-200' 
                      : 'bg-blue-100/90 text-blue-700 border border-blue-200'
                  }`}>
                    {product.category}
                  </span>

                  {/* Badge Alert Jika Stok Kritis */}
                  {isLowStock && (
                    <span className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider animate-pulse shadow-sm">
                      Stok Tipis
                    </span>
                  )}
                </div>

                {/* Area Detail Deskripsi */}
                <div className="p-5 flex flex-col flex-grow space-y-3">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span>{product.id}</span>
                    {/* Warna teks kuantitas stok berubah merah jika kritis */}
                    <span className={`font-bold ${isLowStock ? 'text-red-600 underline' : 'text-gray-500'}`}>
                      {product.stock} Tersedia
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-[#4880FF] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  
                  {/* Rating Bintang Karakter */}
                  <div className="flex items-center text-amber-400 text-xs tracking-tight">
                    {"★".repeat(product.rating)}
                    {"☆".repeat(5 - product.rating)}
                    <span className="text-gray-400 ml-1.5 text-[11px] font-medium">({product.rating}.0)</span>
                  </div>

                  {/* Bagian Bawah: Harga & Tombol Edit */}
                  <div className="border-t border-gray-50 pt-3 flex items-center justify-between mt-auto">
                    <span className="text-base font-black text-[#4880FF] tracking-tight">
                      {product.price}
                    </span>
                    
                    <button className="px-3 py-1.5 bg-gray-50 hover:bg-[#4880FF] text-gray-600 hover:text-white text-xs font-bold rounded-xl border border-gray-100 hover:border-[#4880FF] transition-all active:scale-95">
                      Edit Data
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* State Kosong Jika Pencarian Tidak Ditemukan */
        <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
          <span className="text-4xl">📦</span>
          <h3 className="text-lg font-bold text-gray-800 mt-4">Produk Tidak Ditemukan</h3>
          <p className="text-gray-400 text-sm mt-1">
            Maaf, barang dengan kata kunci atau kategori <span className="font-semibold text-gray-700">"{searchQuery || activeCategory}"</span> tidak tersedia dalam sistem inventaris.
          </p>
          <button 
            onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
            className="mt-4 text-xs font-bold text-[#4880FF] hover:underline"
          >
            Reset Pencarian
          </button>
        </div>
      )}
    </div>
  );
}