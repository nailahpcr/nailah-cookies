import { useState, useRef } from 'react'; // 
import { productsData } from '../data/productsData';
import SegmentFilter from '../components/SegmentFilter';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table, TableBody, TableCaption, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const searchRef = useRef(null); // 🆕 buat ref untuk input pencarian

  const filteredByCategory = productsData.filter(product => {
    if (activeCategory === 'Semua') return true;
    return product.category === activeCategory;
  });

  const finalFilteredProducts = filteredByCategory.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const adaStokTipis = productsData.some(p => p.stock <= 10);

  // 🆕 Fungsi untuk fokus otomatis ke input saat kategori diubah
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    searchRef.current?.focus();
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products List</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola katalog, pantau sisa kuantitas, dan perbarui harga komoditas tokomu.
          </p>
        </div>

        {/* Input pencarian — sekarang pakai ref */}
        <div className="w-full md:w-80 relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm z-10">🔍</span>
          <Input
            ref={searchRef} // 🆕 pasang ref ke input
            placeholder="Cari nama atau ID produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Alert stok tipis */}
      {adaStokTipis && (
        <Alert variant="destructive">
          <AlertTitle>⚠️ Peringatan Stok Tipis!</AlertTitle>
          <AlertDescription>
            Terdapat produk dengan stok di bawah 10 unit. Segera lakukan restok untuk menghindari kekosongan barang.
          </AlertDescription>
        </Alert>
      )}

      {/* FILTER KATEGORI + TOGGLE VIEW */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="bg-white p-2 rounded-xl border border-gray-100 shadow-sm w-fit">
          <SegmentFilter
            options={['Semua', 'Buku', 'Alat Tulis']}
            activeSegment={activeCategory}
            onSelect={handleCategoryChange} // 🆕 ganti dari setActiveCategory ke handleCategoryChange
          />
        </div>

        {/* Toggle Grid / Table */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              viewMode === 'grid'
                ? 'bg-[#4880FF] text-white border-[#4880FF]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#4880FF]'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all ${
              viewMode === 'table'
                ? 'bg-[#4880FF] text-white border-[#4880FF]'
                : 'bg-white text-gray-500 border-gray-200 hover:border-[#4880FF]'
            }`}
          >
            Tabel
          </button>
        </div>
      </div>

      {/* Sisa kode tabel & grid tidak berubah — tetap sama seperti aslinya */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <Table>
            <TableCaption>Katalog produk Toko Buku Cendekia</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nama Produk</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Harga</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {finalFilteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="text-gray-400 text-xs">{product.id}</TableCell>
                  <TableCell className="font-medium text-gray-800">{product.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      product.category === 'Buku'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {product.category}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={product.stock <= 10 ? 'text-red-600 font-bold' : 'text-gray-700'}>
                      {product.stock} {product.stock <= 10 && '⚠️'}
                    </span>
                  </TableCell>
                  <TableCell>{'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}</TableCell>
                  <TableCell className="text-right font-bold text-[#4880FF]">{product.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        finalFilteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {finalFilteredProducts.map((product) => {
              const isLowStock = product.stock <= 10;
              return (
                <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group relative">
                  <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"/>
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm backdrop-blur-sm ${
                      product.category === 'Buku' ? 'bg-purple-100/90 text-purple-700 border border-purple-200' : 'bg-blue-100/90 text-blue-700 border border-blue-200'
                    }`}>{product.category}</span>
                    {isLowStock && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider animate-pulse shadow-sm">Stok Tipis</span>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow space-y-3">
                    <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                      <span>{product.id}</span>
                      <span className={`font-bold ${isLowStock ? 'text-red-600 underline' : 'text-gray-500'}`}>{product.stock} Tersedia</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem] group-hover:text-[#4880FF] transition-colors leading-snug">{product.name}</h3>
                    <div className="flex items-center text-amber-400 text-xs tracking-tight">
                      {'★'.repeat(product.rating)}{'☆'.repeat(5 - product.rating)}
                      <span className="text-gray-400 ml-1.5 text-[11px] font-medium">({product.rating}.0)</span>
                    </div>
                    <div className="border-t border-gray-50 pt-3 flex items-center justify-between mt-auto">
                      <span className="text-base font-black text-[#4880FF] tracking-tight">{product.price}</span>
                      <button className="px-3 py-1.5 bg-gray-50 hover:bg-[#4880FF] text-gray-600 hover:text-white text-xs font-bold rounded-xl border border-gray-100 hover:border-[#4880FF] transition-all active:scale-95">Edit Data</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm max-w-xl mx-auto">
            <span className="text-4xl">📦</span>
            <h3 className="text-lg font-bold text-gray-800 mt-4">Produk Tidak Ditemukan</h3>
            <p className="text-gray-400 text-sm mt-1">
              Maaf, barang dengan kata kunci <span className="font-semibold text-gray-700">"{searchQuery || activeCategory}"</span> tidak tersedia.
            </p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }} className="mt-4 text-xs font-bold text-[#4880FF] hover:underline">
              Reset Pencarian
            </button>
          </div>
        )
      )}
    </div>
  );
}