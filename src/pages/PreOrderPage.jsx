// src/pages/PreOrderPage.jsx
import React, { useState, useEffect } from 'react';
import { preorderProducts, preorders as initialPOs } from '../data/preorders';
import OrderTimeline from '../components/OrderTimeline';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '../components/ui/button';

export default function PreOrderPage() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('cendekia_po_products');
    return saved ? JSON.parse(saved) : preorderProducts;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('cendekia_preorders');
    return saved ? JSON.parse(saved) : initialPOs;
  });

  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('cendekia_po_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cendekia_preorders', JSON.stringify(orders));
  }, [orders]);

  // Filter participants of the selected product
  const participants = orders.filter(o => o.productId === selectedProduct?.id);
  const quotaUsed = participants.length;

  const toggleDP = (orderId) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, dpPaid: !o.dpPaid };
      }
      return o;
    }));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, dpPaid: !prev.dpPaid }));
    }
  };

  const updateStatusStep = (orderId, step) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return { ...o, statusStep: Number(step) };
      }
      return o;
    }));
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(prev => ({ ...prev, statusStep: Number(step) }));
    }
  };

  const steps = [
    { title: "Pesanan Diterima", desc: "Pemesanan berhasil diverifikasi dan masuk antrian" },
    { title: "Sedang Diproses / Menunggu Stok", desc: "Distributor sedang memproses stok buku Anda" },
    { title: "Siap Diambil / Dikirim", desc: "Buku sudah siap diambil di counter atau dalam pengiriman" }
  ];

  const getTimelineSteps = (statusStep) => {
    return [
      { title: 'Pesanan Diterima', time: 'Diverifikasi', done: statusStep >= 0 },
      { title: 'Sedang Diproses / Menunggu Stok', time: statusStep >= 1 ? 'Selesai' : 'Sedang Berjalan', done: statusStep >= 1 },
      { title: 'Siap Diambil / Dikirim', time: statusStep >= 2 ? 'Selesai' : 'Belum Dimulai', done: statusStep >= 2 }
    ];
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
  };

  return (
    <div className="p-6 bg-[#F5F6FA] min-h-screen space-y-8 font-sans text-left">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1E2A44] tracking-tight">Kelola Produk Pre-Order & Peserta</h1>
        <p className="text-sm text-gray-500 mt-1">Pilih kartu produk untuk melihat detail peserta, status uang muka (DP), dan progres timeline.</p>
      </div>

      {/* Grid Kartu Produk PO */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((prod) => {
          const currentCount = orders.filter(o => o.productId === prod.id).length;
          const isFull = currentCount >= prod.maxQuota;
          const isSelected = selectedProduct?.id === prod.id;

          return (
            <div 
              key={prod.id}
              onClick={() => {
                setSelectedProduct(prod);
                setSelectedOrder(null);
              }}
              className={`bg-white rounded-3xl p-5 border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-sm hover:shadow-md ${
                isSelected ? 'border-[#B23A2E] ring-2 ring-[#B23A2E]/10' : 'border-gray-100'
              }`}
            >
              <div className="flex gap-4 items-start">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-16 h-16 object-contain bg-gray-50 rounded-xl"
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500'; }}
                />
                <div className="space-y-1 flex-1">
                  <span className="text-[9px] bg-[#FBF6EC] border border-[#B8892B]/20 text-[#B8892B] font-bold px-2 py-0.5 rounded uppercase">
                    ID: {prod.id}
                  </span>
                  <h3 className="font-bold text-gray-800 text-xs line-clamp-2">{prod.name}</h3>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-gray-400">Kuota Terisi:</span>
                  <span className={isFull ? 'text-red-500 font-extrabold' : 'text-gray-700'}>
                    {currentCount} / {prod.maxQuota} {isFull && '(Penuh)'}
                  </span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-300 ${isFull ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((currentCount / prod.maxQuota) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {isFull && (
                <div className="p-2.5 bg-red-50 rounded-xl border border-red-100 text-[10px] text-red-600 font-semibold">
                  ⚠️ Kuota Penuh. Batch selanjutnya dibuka {prod.nextBatchDate}.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Participant Table */}
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">
              Peserta Pre-Order: <span className="text-[#B23A2E]">{selectedProduct.name}</span> ({quotaUsed} Orang)
            </h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Peserta</TableHead>
                  <TableHead>Kontak WA</TableHead>
                  <TableHead className="text-center">Status DP</TableHead>
                  <TableHead className="text-center">Tahapan Progres</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {participants.length > 0 ? (
                  participants.map((o) => (
                    <TableRow 
                      key={o.id}
                      onClick={() => setSelectedOrder(o)}
                      className={`cursor-pointer transition-colors ${selectedOrder?.id === o.id ? 'bg-[#FBF6EC]' : 'hover:bg-gray-50'}`}
                    >
                      <TableCell className="font-bold text-gray-800">{o.name}</TableCell>
                      <TableCell className="font-semibold text-[#B23A2E]">{o.phone}</TableCell>
                      <TableCell className="text-center">
                        <span 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDP(o.id);
                          }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition-all ${
                            o.dpPaid 
                              ? 'bg-green-50 text-green-700 border border-green-100 hover:bg-green-100' 
                              : 'bg-red-50 text-red-700 border border-red-100 hover:bg-red-100'
                          }`}
                        >
                          {o.dpPaid ? 'Lunas DP' : 'Belum DP'}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          o.statusStep === 2 ? 'bg-green-50 text-green-700' :
                          o.statusStep === 1 ? 'bg-amber-50 text-amber-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {o.statusStep === 2 ? 'Siap Kirim' : o.statusStep === 1 ? 'Diproses' : 'Diterima'}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="p-8 text-center text-gray-400 text-sm">
                      📭 Belum ada peserta yang mengikuti pre-order produk ini.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Edit Panel Drawer */}
          <div className="lg:col-span-4">
            {selectedOrder ? (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B23A2E]"></div>
                
                <div>
                  <h3 className="text-lg font-black text-gray-900">{selectedOrder.name}</h3>
                  <p className="text-xs text-gray-400">Order ID: {selectedOrder.id}</p>
                </div>

                <div className="space-y-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-gray-600"><strong>Besar Uang Muka (DP):</strong> {formatRupiah(selectedOrder.dpAmount)}</p>
                  <p className="text-gray-600"><strong>Total Tagihan:</strong> {formatRupiah(selectedOrder.totalPrice)}</p>
                  <p className="text-gray-600"><strong>Catatan Khusus:</strong> "{selectedOrder.customNote || '-'}"</p>
                </div>

                <hr className="border-gray-100" />

                {/* Status Update Controls */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Status Pembayaran DP:</label>
                    <button 
                      onClick={() => toggleDP(selectedOrder.id)}
                      className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all border ${
                        selectedOrder.dpPaid 
                          ? 'bg-green-500 text-white hover:bg-green-600 border-green-600' 
                          : 'bg-red-500 text-white hover:bg-red-600 border-red-600'
                      }`}
                    >
                      {selectedOrder.dpPaid ? '✓ DP Sudah Dilunasi' : '✗ Belum Melunasi DP'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Tahap Progress Pesanan:</label>
                    <select 
                      value={selectedOrder.statusStep}
                      onChange={(e) => updateStatusStep(selectedOrder.id, e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 px-3 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#B23A2E]"
                    >
                      <option value="0">Tahap 1: Pesanan Diterima</option>
                      <option value="1">Tahap 2: Sedang Diproses / Menunggu Stok</option>
                      <option value="2">Tahap 3: Siap Diambil / Dikirim</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-gray-800 mb-3">🏭 Visual Progress</p>
                  <OrderTimeline steps={getTimelineSteps(selectedOrder.statusStep)} />
                </div>

                <a 
                  href={`https://wa.me/${selectedOrder.phone}?text=Halo%20${encodeURIComponent(selectedOrder.name)},%20kami%20ingin%20mengabarkan%20update%20pre-order%20Anda%20(${selectedOrder.id}).%20Status%20DP:%20${selectedOrder.dpPaid ? 'LUNAS' : 'BELUM%20LUNAS'}.%20Progres:%20${steps[selectedOrder.statusStep].title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
                >
                  💬 Kirim Update via WhatsApp
                </a>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-3xl border border-gray-100 text-center text-gray-400 text-sm">
                💡 Pilih nama peserta di tabel untuk mengelola data detail individu.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}