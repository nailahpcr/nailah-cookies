// src/data/preorders.js

export const preorderProducts = [
  {
    id: "PO-PROD-001",
    name: "CRM Module Premium v2 - Edisi Eksklusif",
    maxQuota: 10,
    nextBatchDate: "15 Juli 2026",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/product-metas/aesint4-lt.jpg"
  },
  {
    id: "PO-PROD-002",
    name: "Hardware Server Mini Stack - Cendekia Special Edition",
    maxQuota: 5,
    nextBatchDate: "20 Juli 2026",
    image: "https://image.gramedia.net/rs:fit:256:0/plain/https://cdn.gramedia.com/uploads/product-metas/er4aaza-ta.jpg"
  },
  {
    id: "PO-PROD-003",
    name: "Modul Praktikum Jaringan Komputer & IoT",
    maxQuota: 15,
    nextBatchDate: "25 Juli 2026",
    image: "https://image.gramedia.net/rs:fit:0:0/plain/https://cdn.gramedia.com/uploads/items/9786024452308.jpg"
  }
];

export const preorders = [
  { 
    id: 'PO-7721', 
    productId: 'PO-PROD-001',
    name: 'Budi Santoso', 
    phone: '628123456789',
    dpPaid: true,
    dpAmount: 500000, 
    totalPrice: 1500000,
    statusStep: 1,
    customNote: 'Mohon agar proses cetak dicek teliti ya min.'
  },
  { 
    id: 'PO-7722', 
    productId: 'PO-PROD-002',
    name: 'Siti Aminah', 
    phone: '628987654321',
    dpPaid: false,
    dpAmount: 2500000, 
    totalPrice: 5000000,
    statusStep: 0,
    customNote: 'Kirim pakai packing kayu ekstra ya.'
  },
  { 
    id: 'PO-7723', 
    productId: 'PO-PROD-001',
    name: 'Rian Hidayat', 
    phone: '628112233445',
    dpPaid: true,
    dpAmount: 500000, 
    totalPrice: 1500000,
    statusStep: 2,
    customNote: 'Ditunggu pengiriman nomor resinya.'
  }
];