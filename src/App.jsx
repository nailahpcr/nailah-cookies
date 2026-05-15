import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Import Pages
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import CustomerDetailPage from './pages/CustomerDetailPage'; 
import TransactionsPage from './pages/TransactionsPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* ========================================= */}
        {/* 1. RUTE AUTH (Login, dll)                */}
        {/* ========================================= */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        {/* ========================================= */}
        {/* 2. RUTE UTAMA (Dengan Sidebar & Header)  */}
        {/* ========================================= */}
        <Route element={<MainLayout />}>
          {/* Redirect otomatis dari "/" ke "/dashboard" */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Customers Routes */}
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          
          {/* Transactions Routes */}
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/transactions/:id" element={<div>Detail Transaksi (WIP)</div>} />
        </Route>

        {/* ========================================= */}
        {/* 3. CATCH-ALL (Jika path salah)           */}
        {/* ========================================= */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;