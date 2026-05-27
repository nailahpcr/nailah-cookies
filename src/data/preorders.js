// src/data/preorders.js
export const preorders = [
  { 
    id: "PO-CEND-003", 
    name: "Andi Wijaya", 
    product: "Cetak Buku Profil Institusi", 
    qty: 500, 
    statusStep: 1, 
    textStatus: "Proses Cetak",
    steps: ["Pesanan Masuk", "Masak/Cetak", "QC Kelayakan", "Kurir Jalan"]
  },
  { 
    id: "PO-CEND-006", 
    name: "Lani Cahyani", 
    product: "Custom Meja Perpustakaan Kayu", 
    qty: 25, 
    statusStep: 2, 
    textStatus: "Quality Control",
    steps: ["Pesanan Masuk", "Masak/Cetak", "QC Kelayakan", "Kurir Jalan"]
  },
  { 
    id: "PO-CEND-009", 
    name: "Fajar Ramadhan", 
    product: "Buku Agenda Kerja Guru 2027", 
    qty: 200, 
    statusStep: 0, 
    textStatus: "Pesanan Masuk",
    steps: ["Pesanan Masuk", "Masak/Cetak", "QC Kelayakan", "Kurir Jalan"]
  }
];