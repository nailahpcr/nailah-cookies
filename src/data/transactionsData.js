export const transactionsData = [
  // ==========================================
  // BULAN MEI 2026
  // ==========================================
  {
    id: "TRX-20260510-001",
    month: "Mei",
    date: "2026-05-10 09:15",
    customerId: "CEND-001",
    customerName: "Budi Santoso",
    segment: "Orang Tua Murid", // Sesuai Laporan: Kategori pelanggan
    channel: "Toko Langsung", // Sesuai Laporan: Channel Pembelian
    paymentMethod: "Tunai (Cash)", // Sesuai Laporan: Metode pembayaran
    items: [
      { name: "Paket Buku Kurikulum Merdeka SD Kelas 1", qty: 1, price: 185000 },
      { name: "Buku Tulis Cendekia Pack", qty: 2, price: 15000 }
    ],
    totalPrice: 215000,
    pointsEarned: 21, // Kelipatan Rp 10.000 = 1 Poin
    status: "Success" // Sesuai Laporan: Status Pesanan
  },
  {
    id: "TRX-20260515-002",
    month: "Mei",
    date: "2026-05-15 14:30",
    customerId: "CEND-002",
    customerName: "Siti Aminah",
    segment: "Santri",
    channel: "WhatsApp",
    paymentMethod: "Transfer Bank / VA",
    items: [
      { name: "Kitab Al-Qur'an Hafalan Tajwid Blok", qty: 1, price: 85000 },
      { name: "Buku Sirah Nabawiyah Pilihan", qty: 1, price: 40000 }
    ],
    totalPrice: 125000,
    pointsEarned: 12,
    status: "Success"
  },

  // ==========================================
  // BULAN JUNI 2026
  // ==========================================
  {
    id: "TRX-20260602-001",
    month: "Juni",
    date: "2026-06-02 11:05",
    customerId: "CEND-005",
    customerName: "Rian Hidayat",
    segment: "Mahasiswa/Umum",
    channel: "Shopee",
    paymentMethod: "E-Wallet / QRIS",
    items: [
      { name: "Novel Bumi Manusia - Pramoedya Ananta Toer", qty: 1, price: 125000 }
    ],
    totalPrice: 125000,
    pointsEarned: 12,
    status: "Success"
  },
  {
    id: "TRX-20260618-002",
    month: "Juni",
    date: "2026-06-18 19:10",
    customerId: "CEND-003",
    customerName: "Pondok Pesantren Al-Hikmah",
    segment: "Santri",
    channel: "WhatsApp",
    paymentMethod: "Transfer Bank / VA",
    items: [
      { name: "Kitab Kuning Fathul Qorib", qty: 20, price: 25000 },
      { name: "Buku Tulis Santri", qty: 2, price: 15000 }
    ],
    totalPrice: 530000,
    pointsEarned: 53,
    status: "Siap Diambil" // Sesuai Laporan: Tracking Status pre-order/WA
  },

  // ==========================================
  // BULAN JULI 2026 (Bulan Berjalan)
  // ==========================================
  {
    id: "TRX-20260704-001",
    month: "Juli",
    date: "2026-07-04 10:00",
    customerId: "CEND-004",
    customerName: "Dewi Lestari",
    segment: "Mahasiswa/Umum",
    channel: "Toko Langsung",
    paymentMethod: "E-Wallet / QRIS",
    items: [
      { name: "Buku Self Improvement: Atomic Habits", qty: 1, price: 108000 }
    ],
    totalPrice: 108000,
    pointsEarned: 10,
    status: "Success"
  },
  {
    id: "TRX-20260705-002",
    month: "Juli",
    date: "2026-07-05 13:20",
    customerId: "CEND-006",
    customerName: "Lani Cahyani",
    segment: "Orang Tua Murid",
    channel: "Shopee",
    paymentMethod: "Transfer Bank / VA",
    items: [
      { name: "Bundle Hemat Cendekia Belajar Pintar", qty: 2, price: 225000 }
    ],
    totalPrice: 450000,
    pointsEarned: 45,
    status: "Sedang Diproses" // Sedang dipacking untuk dikirim kurir
  },
  {
    id: "TRX-20260705-003",
    month: "Juli",
    date: "2026-07-05 14:00",
    customerId: "CEND-007",
    customerName: "Ahmad Subarjo",
    segment: "Mahasiswa/Umum",
    channel: "WhatsApp",
    paymentMethod: "Tunai (Cash)",
    items: [
      { name: "Alat Tulis Set Lengkap Joyko", qty: 3, price: 20000 }
    ],
    totalPrice: 60000,
    pointsEarned: 6,
    status: "Canceled" // Transaksi batal, poin otomatis tidak terakumulasi
  }
];