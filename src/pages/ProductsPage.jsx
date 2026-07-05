import { useState, useRef, useEffect } from 'react'; 
import { productsData } from '../data/productsData';
import SegmentFilter from '../components/SegmentFilter';
import { Input } from "@/components/ui/input";
import PreOrderProductCard from '../components/PreOrderProductCard'; // 🌟 Import yang benar
import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentSlide, setCurrentSlide] = useState(0);

  const bundleSectionRef = useRef(null);
  const preOrderSectionRef = useRef(null);

  const scrollToBundle = () => {
    setActiveCategory('Semua');
    setTimeout(() => {
      bundleSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToPreOrder = () => {
    preOrderSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const promoSlides = [
    {
      id: 1,
      dateRange: "September 12 - 22",
      title: "Promo Paket Bundling Buku Sekolah Kurikulum Merdeka",
      description: "Dapatkan paket lengkap buku paket SD/SMP/SMA semester ganjil lebih hemat hingga 25% + Gratis Sampul Buku.",
      buttonText: "Cek Paket Sekarang",
      bgClass: "bg-gradient-to-r from-[#4880FF] to-[#3A6FE2]",
      action: scrollToBundle
    },
    {
      id: 2,
      dateRange: "September 15 - Oktober 5",
      title: "Pre-Order Buku Terbaru: Dapatkan Koleksi Eksklusif & Edisi Ber-Tanda Tangan",
      description: "Jadilah yang pertama membaca rilis buku best-seller bulan ini. Amankan slot pre-order kamu sekarang dan dapatkan bonus merchandise spesial serta diskon 15%.",
      buttonText: "Ikut Pre-Order Sekarang",
      bgClass: "bg-gradient-to-r from-emerald-600 to-teal-600",
      action: scrollToPreOrder
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === promoSlides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? promoSlides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [currentSlide]); 

  const bundleProducts = productsData.filter(p => p.category === "Paket Bundling" || p.category === "Bundle Paket");

  const preOrderProducts = productsData.filter(p => 
    p.isPreOrder === true || 
    p.category?.toLowerCase().replace('-', ' ') === 'pre order'
  );

  const filteredByCategory = productsData.filter(product => {
    const isBundle = product.category === "Paket Bundling" || product.category === "Bundle Paket";
    const isPO = product.isPreOrder === true || product.category?.toLowerCase().replace('-', ' ') === 'pre order';
    
    if (isBundle || isPO) return false; 
    if (activeCategory === 'Semua') return true;
    return product.category === activeCategory;
  });

  const finalFilteredProducts = filteredByCategory.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Buku Paket': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Buku Umum': return 'bg-teal-50 text-teal-600 border-teal-100';
      case 'Buku Islami': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Buku Tulis': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Alat Tulis': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-8 font-sans">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Products List</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola katalog produk Toko Buku Cendekia.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm z-10">🔍</span>
          <Input
            placeholder="Cari nama atau ID produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white border-gray-200 focus:ring-2 focus:ring-[#4880FF] rounded-xl"
          />
        </div>
      </div>

      {/* CARD SLIDE PROMO */}
      <div className="relative overflow-hidden rounded-3xl shadow-sm border border-gray-100/50">
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {promoSlides.map((slide) => (
            <div key={slide.id} className={`w-full flex-shrink-0 ${slide.bgClass} text-white p-8 md:p-12 relative min-h-[220px] flex flex-col justify-center`}>
              <div className="max-w-xl space-y-2 relative z-10">
                <span className="text-xs font-semibold tracking-wider opacity-90 block">{slide.dateRange}</span>
                <h2 className="text-xl md:text-3xl font-extrabold leading-tight tracking-tight">{slide.title}</h2>
                <p className="text-xs md:text-sm text-white/80 font-normal line-clamp-2 pt-1">{slide.description}</p>
                <div className="pt-3">
                  <button 
                    onClick={slide.action} 
                    className="px-6 py-2.5 bg-[#FF993A] hover:bg-[#e0832b] text-white text-xs font-bold rounded-xl transition-all shadow-sm active:scale-95"
                  >
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md z-20">‹</button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full backdrop-blur-md z-20">›</button>
      </div>

      {/* BUNDLE HEMAT SLIDER */}
      <div ref={bundleSectionRef} className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📦</span>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">Bundle Hemat Cendekia</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => document.getElementById('bundle-cards-container').scrollBy({ left: -310, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-all active:scale-90"
            >‹</button>
            <button 
              onClick={() => document.getElementById('bundle-cards-container').scrollBy({ left: 310, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-50 flex items-center justify-center font-bold text-gray-600 transition-all active:scale-90"
            >›</button>
          </div>
        </div>

        <div id="bundle-cards-container" className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {bundleProducts.map((product) => (
            <div key={product.id} className="w-[280px] flex-shrink-0 bg-white border border-gray-100 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative group">
              <div>
                <div className="absolute top-3 left-3 bg-orange-500 text-white px-2.5 py-0.5 text-[10px] font-black rounded-full z-10">BUNDLE</div>
                <div className="aspect-[4/3] bg-[#F9FAFC] rounded-2xl mb-4 overflow-hidden flex items-center justify-center p-2">
                  <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"/>
                </div>
                <h3 className="font-bold text-gray-800 text-sm line-clamp-2 leading-snug h-10">{product.name}</h3>
              </div>
              <div className="mt-4">
                <div className="text-[#4880FF] font-black text-base">{product.price}</div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                  <div className="text-amber-400 text-xs">{'★'.repeat(product.rating || 5)}</div>
                  <button className="px-3 py-1.5 bg-[#F5F6FA] hover:bg-[#4880FF] hover:text-white text-gray-600 text-xs font-bold rounded-xl transition-all">Edit Product</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZONA EKSKLUSIF PRE-ORDER */}
      <div ref={preOrderSectionRef} className="space-y-4 pt-2 scroll-mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl animate-spin" style={{ animationDuration: '3s' }}>⏳</span>
            <h2 className="text-xl font-black text-gray-800 tracking-tight">Koleksi Eksklusif Pre-Order</h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => document.getElementById('po-cards-container').scrollBy({ left: -310, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-amber-500 hover:text-white flex items-center justify-center font-bold text-gray-600 transition-all active:scale-90"
            >‹</button>
            <button 
              onClick={() => document.getElementById('po-cards-container').scrollBy({ left: 310, behavior: 'smooth' })}
              className="w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-amber-500 hover:text-white flex items-center justify-center font-bold text-gray-600 transition-all active:scale-90"
            >›</button>
          </div>
        </div>

        <div id="po-cards-container" className="flex gap-6 overflow-x-auto scroll-smooth pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {preOrderProducts.length > 0 ? (
            preOrderProducts.map((product) => (
              <PreOrderProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="w-full bg-amber-50/50 border border-dashed border-amber-200 rounded-3xl p-6 text-center py-8">
              <p className="text-sm text-amber-800 font-medium">Belum ada katalog buku pre-order aktif saat ini.</p>
            </div>
          )}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* FILTER & PRODUK NORMAL */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
            <SegmentFilter
              options={['Semua', 'Buku Paket', 'Buku Umum', 'Buku Islami', 'Buku Tulis', 'Alat Tulis']}
              activeSegment={activeCategory}
              onSelect={handleCategoryChange} 
            />
          </div>
          <div className="flex gap-2 bg-white p-1.5 rounded-xl border border-gray-100 shadow-sm">
            <button onClick={() => setViewMode('grid')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${viewMode === 'grid' ? 'bg-[#4880FF] text-white shadow-sm' : 'text-gray-500'}`}>Grid</button>
            <button onClick={() => setViewMode('table')} className={`px-4 py-1.5 text-xs font-bold rounded-lg ${viewMode === 'table' ? 'bg-[#4880FF] text-white shadow-sm' : 'text-gray-500'}`}>Tabel</button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {finalFilteredProducts.length > 0 ? (
              finalFilteredProducts.map((product) => (
                <div key={product.id} className="bg-white border border-gray-100/80 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative">
                   <div>
                     <div className="relative aspect-[4/3] bg-[#F9FAFC] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-4">
                        <img src={product.image} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" alt={product.name} />
                        <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${getCategoryColor(product.category)}`}>{product.category}</span>
                     </div>
                     <h3 className="font-bold text-gray-800 text-sm line-clamp-2 h-10 leading-snug">{product.name}</h3>
                   </div>
                   <div className="mt-4">
                     <div className="text-base font-black text-[#4880FF]">{product.price}</div>
                     <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                       <div className="text-amber-400 text-xs">{'★'.repeat(product.rating || 5)}</div>
                       <span className="text-[10px] font-bold text-gray-400">Stock: {product.stock}</span>
                     </div>
                   </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white rounded-3xl p-8 border border-gray-100 text-center py-12 flex flex-col items-center justify-center">
                <span className="text-4xl mb-2">📦</span>
                <h3 className="text-lg font-bold text-gray-800">Produk Tidak Ditemukan</h3>
                <p className="text-sm text-gray-400 mt-1 max-w-sm">Maaf, kategori "{activeCategory}" belum tersedia.</p>
              </div>
            )}
          </div>
        ) : (
           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
             <Table>
               <TableHeader>
                 <TableRow>
                   <TableHead>ID</TableHead>
                   <TableHead>Nama Produk</TableHead>
                   <TableHead>Kategori</TableHead>
                   <TableHead>Harga</TableHead>
                   <TableHead className="text-center">Rating</TableHead>
                 </TableRow>
               </TableHeader>
               <TableBody>
                 {finalFilteredProducts.map((product) => (
                   <TableRow key={product.id}>
                     <TableCell className="font-medium text-gray-500 text-xs">{product.id}</TableCell>
                     <TableCell className="font-bold text-gray-800">{product.name}</TableCell>
                     <TableCell>{product.category}</TableCell>
                     <TableCell className="text-[#4880FF] font-black">{product.price}</TableCell>
                     <TableCell className="text-amber-400 text-center text-xs">{'★'.repeat(product.rating || 5)}</TableCell>
                   </TableRow>
                 ))}
               </TableBody>
             </Table>
           </div>
        )}
      </div>
    </div>
  );
}

// 🌟 SUB-KOMPONEN LAMA DI SINI SUDAH DIHAPUS AGAR TIDAK BENTROK DENGAN FILE EKSTERNAL 🌟