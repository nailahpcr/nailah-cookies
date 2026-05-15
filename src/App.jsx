<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import CustomersPage from './pages/CustomersPage';
import CustomerDetailPage from './pages/CustomerDetailPage'; // Halaman baru
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Customers Dynamic Routes */}
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          
          {/* Transactions Dynamic Routes */}
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/:id" element={<div>Detail Transaksi (WIP)</div>} />
        </Route>
      </Routes>
    </Router>
=======
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
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5
  );
}

export default App;