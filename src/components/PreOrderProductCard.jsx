import React from 'react';

export default function PreOrderProductCard({ product }) {
  const ratingStars = '★'.repeat(product.rating || 5);

  return (
    <div className="w-[280px] flex-shrink-0 bg-white border-2 border-amber-100 hover:border-amber-400 rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
      
      <div>
        {/* BADGE PRE-ORDER */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2.5 py-0.5 text-[10px] font-black rounded-full z-10 shadow-sm flex items-center gap-1 animate-pulse">
          ⏳ PRE-ORDER
        </div>

        {/* GAMBAR PRODUK */}
        <div className="relative aspect-[4/3] bg-gradient-to-b from-amber-50/10 to-[#F9FAFC] rounded-xl overflow-hidden flex items-center justify-center p-2 mb-4">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300" 
          />
        </div>

        {/* INFO ESTIMASI RILIS */}
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
            Slot Terbatas
          </span>
          <span className="text-[10px] text-gray-400 font-medium">
            Est. Rilis: {product.releaseEstimate || "2-3 Minggu"}
          </span>
        </div>

        {/* NAMA PRODUK */}
        <h3 className="font-bold text-gray-800 text-sm line-clamp-2 h-10 leading-snug group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
      </div>
      
      {/* SEKTOR HARGA & AKSI */}
      <div className="mt-4 pt-2 border-t border-dashed border-gray-100">
        {product.originalPrice && (
          <div className="text-xs text-gray-400 line-through -mb-1">
            {product.originalPrice}
          </div>
        )}
        
        <div className="text-base font-black text-amber-600">
          {product.price}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="text-amber-400 text-xs">
            {ratingStars}
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
            Sisa Slot: {product.stock || 15}
          </span>
        </div>

        <button className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-black rounded-xl transition-all shadow-sm active:scale-95">
          Booking Slot PO
        </button>
      </div>

    </div>
  );
}