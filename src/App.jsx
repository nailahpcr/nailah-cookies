import { Routes, Route, Navigate } from 'react-router-dom';

// Import Layouts (Pastikan path folderlayouts sudah benar di VS Code)
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';

// Import Pages (Pastikan path folder pages sudah benar di VS Code)
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';

function App() {
  return (
    <Routes>
      
      {/* ========================================= */}
      {/* 1. RUTE AUTH (Tanpa Sidebar & Header)       */}
      {/* ========================================= */}
      {/* Kita bungkus Login/Register dengan AuthLayout */}
      <Route path="/login" element={
        <AuthLayout>
          <Login />
        </AuthLayout>
      } />
      
      {/* Tambahkan rute register di sini jika sudah buat filenya */}
      {/* <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} /> */}


      {/* ========================================= */}
      {/* 2. RUTE UTAMA (Nested Routes/Bersarang)   */}
      {/* ========================================= */}
      {/* MainLayout menjadi 'parent' (bingkai)      */}
      <Route path="/" element={<MainLayout />}>
        
        {/* Rute anak (Child Routes)                     */}
        {/* Saat diakses, komponen ini akan muncul di  */}
        {/* dalam <Outlet /> pada MainLayout.         */}
        
        {/* Ini rute default saat user sukses login     */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        
        {/* Halaman-halaman utama                       */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        
        {/* Tambahkan rute halaman lain di sini nanti */}
        {/* <Route path="products" element={<Products />} /> */}
      </Route>


      {/* ========================================= */}
      {/* 3. PROTEKSI (Catch-all)                  */}
      {/* ========================================= */}
      {/* Jika user ngetik path ngawur, lempar ke dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;