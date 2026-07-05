import { createClient } from "@supabase/supabase-js";

// 🛠️ PERBAIKAN: Mengembalikan ke basis domain URL Supabase murni tanpa path /rest/v1
const SUPABASE_URL = "https://cxiiblevsalnlgliwyzr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4aWlibGV2c2FsbmxnbGl3eXpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMTc5MjgsImV4cCI6MjA5NzU5MzkyOH0.Q9nP3mLf0d4r23ujWuLN2sNJUmPnDhNPUE__DbcgKaE";

// Menggunakan SDK Resmi Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const authAPI = {
  // 1. CREATE: Registrasi Akun Resmi + Profil CRM
  register: async (userData) => {
    // a. Daftarkan user ke sistem otentikasi aman Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) throw authError;

    // b. Setelah user terbuat di auth, masukkan data pelengkap ke tabel 'customers'
    if (authData?.user) {
      const { error: dbError } = await supabase
        .from("customers")
        .insert([
          {
            id: authData.user.id, // ID sinkron dengan Supabase Auth uuid
            id_pelanggan: userData.id_pelanggan,
            nama_pelanggan: userData.nama_pelanggan,
            email: userData.email,
            password: userData.password, // Sekarang password dikirim agar tidak memicu error NULL constraint
            no_handphone: userData.no_handphone,
            alamat: userData.alamat,
            segmentasi: userData.segmentasi,
            nama_institusi: userData.nama_institusi || null,
            tanggal_lahir: userData.tanggal_lahir || null, // 🛠️ TAMBAHAN: Kolom Tanggal Lahir Baru
            total_poin: 0, // Aman diset angka 0 langsung berkat perbaikan sebelumnya
            status_pelanggan: "New Customer"
          }
        ]);

      if (dbError) throw dbError;
    }
    return true;
  },

  // 2. READ: Login Menggunakan Fitur Session Token Supabase
  login: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data.user; // Mengembalikan data user yang sedang aktif login
  },

  // 3. READ (ALL): Mengambil daftar pelanggan untuk dashboard admin
  fetchCustomers: async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      // Menggunakan id_pelanggan atau created_at untuk pengurutan di SDK
      .order("id_pelanggan", { ascending: false });

    if (error) throw error;
    return data;
  },

  // 4. UPDATE: Edit detail data pelanggan
  updateCustomer: async (id, updatedData) => {
    const { error } = await supabase
      .from("customers")
      .update(updatedData)
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  // 5. DELETE: Hapus pelanggan
  deleteCustomer: async (id) => {
    const { error } = await supabase
      .from("customers")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return true;
  },

  // 6. READ SINGLE: Ambil data 1 pelanggan spesifik
  fetchCustomerById: async (id) => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  }
};