// src/pages/CustomerKatalog.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { productsData } from '../data/productsData';
import { transactionsData } from '../data/transactionsData';

const defaultReviews = [
  { productId: 'PKT-001', userName: 'Budi Santoso', rating: 5, comment: 'Sangat direkomendasikan untuk belajar di sekolah.', date: '2026-05-12' },
  { productId: 'PKT-002', userName: 'Siti Aminah', rating: 4, comment: 'Buku paket lengkap dan penjelasannya mudah dipahami.', date: '2026-05-16' },
  { productId: 'UMM-002', userName: 'Dewi Lestari', rating: 5, comment: 'Buku self improvement terbaik abad ini!', date: '2026-07-04' }
];

export default function CustomerKatalog() {
  const { user } = useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('cendekia_reviews');
    return saved ? JSON.parse(saved) : defaultReviews;
  });

  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Semua');

  useEffect(() => {
    localStorage.setItem('cendekia_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Check if logged in user has purchased the selected product
  const hasPurchased = (productId) => {
    if (!user) return false;
    const product = productsData.find(p => p.id === productId);
    if (!product) return false;

    // Scan my successful transactions
    const myTrxs = transactionsData.filter(t => t.customerId === user.id || t.customerName === user.name);
    const successful = myTrxs.filter(t => t.status === 'Success' || t.status === 'Siap Diambil' || t.status === 'Sedang Diproses');
    
    return successful.some(t => 
      t.items.some(item => item.name.toLowerCase().includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(item.name.toLowerCase()))
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    setReviewError('');
    setReviewSuccess('');

    if (!user) {
      setReviewError('Anda harus login terlebih dahulu.');
      return;
    }

    if (!hasPurchased(selectedProduct.id)) {
      setReviewError('Maaf, Anda hanya dapat memberikan ulasan untuk produk yang sudah pernah Anda beli.');
      return;
    }

    if (!newComment.trim()) {
      setReviewError('Komentar ulasan tidak boleh kosong.');
      return;
    }

    const reviewObj = {
      productId: selectedProduct.id,
      userName: user.name,
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };

    setReviews([...reviews, reviewObj]);
    setNewComment('');
    setReviewSuccess('Ulasan Anda berhasil dikirim!');
  };

  // Helper to get stats for a product
  const getProductStats = (productId) => {
    const prodReviews = reviews.filter(r => r.productId === productId);
    if (prodReviews.length === 0) {
      return { avg: 5, count: 0 };
    }
    const sum = prodReviews.reduce((s, r) => s + r.rating, 0);
    return { avg: Math.round((sum / prodReviews.length) * 10) / 10, count: prodReviews.length };
  };

  // Filter products based on search term and category tab
  const filteredProducts = productsData.filter(prod => {
    const matchCategory = activeTab === 'Semua' || prod.category === activeTab;
    const matchSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        prod.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8 font-sans text-left max-w-6xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1E2A44] tracking-tight">Katalog Produk</h1>
        <p className="text-sm text-gray-500 mt-1">Jelajahi koleksi buku dan ulasan jujur dari pembeli kami.</p>
      </div>

      {/* Filter and Search Box */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-4 gap-4 rounded-3xl border border-gray-100 shadow-sm">
        <input 
          type="text"
          placeholder="Cari buku atau alat tulis..."
          className="px-4 py-2 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#B23A2E] text-xs font-semibold rounded-xl w-full md:w-64 focus:outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className="flex flex-wrap gap-2">
          {["Semua", "Buku Paket", "Buku Umum", "Buku Islami", "Buku Tulis", "Alat Tulis", "Paket Bundling"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-[#B23A2E] text-white shadow-sm' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Katalog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => {
          const stats = getProductStats(prod.id);
          return (
            <div 
              key={prod.id} 
              onClick={() => {
                setSelectedProduct(prod);
                setReviewError('');
                setReviewSuccess('');
              }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col h-full"
            >
              <div className="h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
                <img 
                  src={prod.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'} 
                  alt={prod.name} 
                  className="h-full object-contain p-4 hover:scale-105 transition-transform"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'; }}
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{prod.category}</span>
                  <h3 className="font-bold text-gray-800 text-sm mt-1 line-clamp-2" title={prod.name}>{prod.name}</h3>
                </div>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-extrabold text-[#B23A2E] text-sm">{prod.price}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-xs font-bold text-gray-700">{stats.avg}</span>
                    <span className="text-[10px] text-gray-400 font-medium">({stats.count})</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Details View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-all">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-900 text-base">Detail & Ulasan Produk</h3>
                <p className="text-xs text-gray-400 mt-0.5">CendekiaBook Quality Review</p>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm">
              <div className="flex flex-col md:flex-row gap-6">
                <img 
                  src={selectedProduct.image || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'} 
                  alt={selectedProduct.name} 
                  className="w-full md:w-40 h-40 object-contain bg-gray-50 p-2 rounded-xl"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'; }}
                />
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] bg-[#FBF6EC] text-[#B8892B] border border-[#B8892B]/10 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                    {selectedProduct.category}
                  </span>
                  <h2 className="text-lg font-extrabold text-gray-900 leading-snug">{selectedProduct.name}</h2>
                  <p className="text-xl font-black text-[#B23A2E]">{selectedProduct.price}</p>
                  <p className="text-xs text-gray-400 font-semibold">Tersedia stok: {selectedProduct.stock} buku</p>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Reviews List */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 text-sm">Ulasan Pelanggan ({reviews.filter(r => r.productId === selectedProduct.id).length})</h3>
                <div className="space-y-3">
                  {reviews.filter(r => r.productId === selectedProduct.id).map((r, i) => (
                    <div key={i} className="p-4 bg-gray-50/50 border border-gray-100 rounded-2xl space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-gray-800">{r.userName}</span>
                        <span className="text-gray-400 font-medium">{r.date}</span>
                      </div>
                      <div className="flex items-center text-amber-400 text-xs mb-1">
                        {Array.from({ length: r.rating }).map((_, idx) => <span key={idx}>★</span>)}
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                  {reviews.filter(r => r.productId === selectedProduct.id).length === 0 && (
                    <p className="text-xs text-gray-400 text-center py-4">Belum ada ulasan untuk produk ini.</p>
                  )}
                </div>
              </div>

              {/* Write Review Form */}
              {user && (
                <div className="border-t border-gray-100 pt-6 space-y-4">
                  <h3 className="font-bold text-gray-800 text-sm">Tulis Ulasan Anda</h3>
                  
                  {reviewError && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl border border-red-100">{reviewError}</div>}
                  {reviewSuccess && <div className="p-3 bg-green-50 text-green-600 text-xs rounded-xl border border-green-100">{reviewSuccess}</div>}

                  {hasPurchased(selectedProduct.id) ? (
                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div className="flex gap-4 items-center">
                        <label className="text-xs font-bold text-gray-600">Rating Bintang:</label>
                        <select 
                          value={newRating} 
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          className="bg-gray-50 border border-gray-200 rounded-lg py-1 px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B23A2E]"
                        >
                          <option value="5">★★★★★ (5)</option>
                          <option value="4">★★★★☆ (4)</option>
                          <option value="3">★★★☆☆ (3)</option>
                          <option value="2">★★☆☆☆ (2)</option>
                          <option value="1">★☆☆☆☆ (1)</option>
                        </select>
                      </div>

                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Berikan penilaian mengenai isi buku, cetakan, dan pengemasan..."
                        rows="3"
                        className="w-full p-3 bg-gray-50 border border-gray-200 focus:bg-white focus:border-[#B23A2E] rounded-xl text-xs focus:outline-none resize-none"
                      />

                      <button 
                        type="submit" 
                        className="px-5 py-2.5 bg-[#B23A2E] text-white hover:bg-[#9c2f25] text-xs font-bold rounded-xl shadow-sm transition-all"
                      >
                        Kirim Ulasan Resmi
                      </button>
                    </form>
                  ) : (
                    <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-[11px] text-amber-700 font-medium">
                      🔒 Anda hanya dapat mengulas produk ini jika tercatat pernah membelinya di riwayat transaksi.
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="px-5 py-2.5 bg-[#1E2A44] text-white hover:bg-[#172135] rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                Selesai
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
