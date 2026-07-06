import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Pastikan semua halaman di-import di sini
import LandingPage from './pages/LandingPage';
import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import DashboardPage from './pages/DashboardPage';
import CustomersPage from './pages/CustomersPage';
import TransactionsPage from './pages/TransactionsPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import StockPage from './pages/StockPage';
import PreOrderPage from './pages/PreOrderPage';
import ProductsPage from './pages/ProductsPage';
import LoyaltyPage from './pages/LoyaltyPage';
// import SegmentationPage from './pages/SegmentationPage';
import FeedbackPage from './pages/FeedbackPage';
import TrackingPage from './pages/TrackingPage';
import ReportsPage from './pages/ReportsPage';


export default function App() {
  // Cek apakah user sudah login
  const isAuthenticated = !!localStorage.getItem('isAuthenticated');

  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page - Publik */}
        <Route path="/" element={<LandingPage />} />

        {/* Rute Publik */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Rute Terproteksi */}
        <Route element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/stock" element={<StockPage />} />
          <Route path="/pre-order" element={<PreOrderPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/loyalty" element={<LoyaltyPage />} />
          {/* <Route path="/segmentation" element={<SegmentationPage />} /> */}
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}