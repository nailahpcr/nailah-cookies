const API_URL = "https://cxiiblevsalnlgliwyzr.supabase.co/rest/v1/customers";
const API_KEY = "sb_publishable_vP4NJyMYcHdHrYVLs3c-RA_UbOMde7U"; 

const headers = {
  "Content-Type": "application/json",
  "apikey": API_KEY,
  "Authorization": `Bearer ${API_KEY}`
};

export const authAPI = {
  // 1. CREATE: Registrasi Pelanggan Baru
  register: async (userData) => {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Gagal mendaftarkan akun.");
    }
    return true;
  },

  // 2. READ (SINGLE): Cocokkan email & password untuk Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}?email=eq.${email}&password=eq.${password}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error("Gagal melakukan autentikasi.");
    const data = await response.json();
    if (data.length === 0) throw new Error("Email atau password salah!");
    return data[0];
  },

  // 3. READ (ALL): Mengambil semua daftar pelanggan untuk Halaman Admin
  fetchCustomers: async () => {
    const response = await fetch(`${API_URL}?select=*`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error("Gagal memuat data pelanggan.");
    return await response.json();
  },

  // 4. UPDATE: Memperbarui data pelanggan berdasarkan ID internal
  updateCustomer: async (id, updatedData) => {
    const response = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "PATCH", // Menggunakan PATCH untuk pembaruan sebagian data
      headers: headers,
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) throw new Error("Gagal memperbarui data pelanggan.");
    return true;
  },

  // 5. DELETE: Menghapus data pelanggan berdasarkan ID internal
  deleteCustomer: async (id) => {
    const response = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "DELETE",
      headers: headers,
    });
    if (!response.ok) throw new Error("Gagal menghapus pelanggan.");
    return true;
  },
  
  // 6. READ SINGLE: Mengambil 1 data pelanggan secara spesifik berdasarkan ID
  fetchCustomerById: async (id) => {
    const response = await fetch(`${API_URL}?id=eq.${id}`, {
      method: "GET",
      headers: headers,
    });
    if (!response.ok) throw new Error("Gagal memuat detail pelanggan.");
    const data = await response.json();
    return data[0]; // Mengembalikan satu objek pelanggan saja
  }
};