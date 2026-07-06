// src/pages/CustomerPreOrder.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { preorders } from '../data/preorders';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';

export default function CustomerPreOrder() {
  const { user } = useAuth();
  
  // Filter preorders by customer name (e.g. Budi Santoso)
  const myPreOrders = preorders.filter(po => po.name.toLowerCase().includes(user.name.toLowerCase()));
  
  const [selectedPO, setSelectedPO] = useState(myPreOrders[0] || null);

  const getStepStatus = (statusStep, index) => {
    if (statusStep > index) return 'completed';
    if (statusStep === index) return 'current';
    return 'upcoming';
  };

  const steps = [
    { title: "Pesanan Diterima", desc: "Pemesanan berhasil diverifikasi dan masuk antrian" },
    { title: "Sedang Diproses / Menunggu Stok", desc: "Distributor sedang memproses stok buku Anda" },
    { title: "Siap Diambil / Dikirim", desc: "Buku sudah siap diambil di counter atau dalam pengiriman" }
  ];

  return (
    <div className="space-y-8 font-sans text-left max-w-5xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold text-[#1E2A44] tracking-tight">Pre-Order Tracking</h1>
        <p className="text-sm text-gray-500 mt-1">Pantau status pengerjaan pesanan indent buku Anda secara real-time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table List of POs */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-lg font-bold text-gray-800">Daftar Pre-Order Anda</h2>
          {myPreOrders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID PO</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myPreOrders.map((po) => (
                  <TableRow 
                    key={po.id} 
                    onClick={() => setSelectedPO(po)}
                    className={`cursor-pointer transition-colors ${selectedPO?.id === po.id ? 'bg-[#FBF6EC]' : 'hover:bg-gray-50'}`}
                  >
                    <TableCell className="font-bold text-[#B23A2E]">{po.id}</TableCell>
                    <TableCell className="font-medium text-gray-800">{po.product}</TableCell>
                    <TableCell className="text-center font-semibold text-gray-700">{po.qty}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        po.statusStep === 2 ? 'bg-green-50 text-green-700 border border-green-100' :
                        po.statusStep === 1 ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                        'bg-blue-50 text-blue-700 border border-blue-100'
                      }`}>
                        {po.statusStep === 2 ? 'Selesai / Kirim' : po.statusStep === 1 ? 'Diproses' : 'Diterima'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="bg-white p-8 rounded-2xl border text-center text-gray-400 text-sm">
              📭 Anda belum memiliki data pre-order.
            </div>
          )}
        </div>

        {/* Stepper Details */}
        <div className="lg:col-span-5">
          {selectedPO ? (
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#B23A2E]"></div>
              
              <div>
                <span className="text-[10px] bg-[#FBF6EC] border border-[#B8892B]/20 text-[#B8892B] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  Detail Progres Inden
                </span>
                <h3 className="text-xl font-black text-gray-900 mt-2">{selectedPO.product}</h3>
                <p className="text-xs text-gray-400">ID Pre-order: {selectedPO.id} ({selectedPO.qty} pcs)</p>
              </div>

              <hr className="border-gray-100" />

              {/* Stepper Component */}
              <div className="relative pl-6 space-y-8 border-l border-gray-200">
                {steps.map((step, idx) => {
                  const status = getStepStatus(selectedPO.statusStep, idx);
                  return (
                    <div key={idx} className="relative">
                      {/* Circle indicator */}
                      <span className={`absolute -left-10 top-0.5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                        status === 'completed' ? 'bg-emerald-500 text-white' :
                        status === 'current' ? 'bg-[#B23A2E] text-white ring-4 ring-[#B23A2E]/20' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {status === 'completed' ? '✓' : idx + 1}
                      </span>

                      <div>
                        <h4 className={`text-sm font-bold ${
                          status === 'completed' ? 'text-emerald-600' :
                          status === 'current' ? 'text-[#B23A2E]' :
                          'text-gray-400'
                        }`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-gray-400 mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <hr className="border-gray-100" />

              <a 
                href={`https://wa.me/628123456789?text=Halo%20Admin%20CendekiaBook,%20saya%20ingin%20bertanya%20mengenai%20status%20Pre-Order%20saya%20${selectedPO.id}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-center font-bold rounded-xl text-xs transition shadow-md flex items-center justify-center gap-2"
              >
                💬 Tanyakan Detail via WhatsApp
              </a>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-gray-100 text-center text-gray-400 text-sm">
              💡 Pilih salah satu pesanan untuk melacak progres detail.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
