import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
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
import FeedbackPage from './pages/FeedbackPage';
import ReportsPage from './pages/ReportsPage';
import ForbiddenPage from './pages/ForbiddenPage';

// Customer Pages
import CustomerHome from './pages/CustomerHome';
import CustomerKatalog from './pages/CustomerKatalog';
import CustomerPreOrder from './pages/CustomerPreOrder';
import CustomerTransactions from './pages/CustomerTransactions';
import CustomerProfile from './pages/CustomerProfile';
import CustomerNotifications from './pages/CustomerNotifications';

function RouteGuard({ allowedRoles, children }) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#B23A2E]"></div>
      </div>
    );
  }

  if (!user || role === 'GUEST') {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/403" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing Page - Publik */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/403" element={<ForbiddenPage />} />

          {/* Rute Publik */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rute Terproteksi - ADMIN */}
          <Route element={
            <RouteGuard allowedRoles={['ADMIN']}>
              <MainLayout />
            </RouteGuard>
          }>
            <Route path="/admin/dashboard" element={<DashboardPage />} />
            <Route path="/admin/customers" element={<CustomersPage />} />
            <Route path="/admin/customers/:id" element={<CustomerDetailPage />} />
            <Route path="/admin/transactions" element={<TransactionsPage />} />
            <Route path="/admin/stock" element={<StockPage />} />
            <Route path="/admin/pre-order" element={<PreOrderPage />} />
            <Route path="/admin/products" element={<ProductsPage />} />
            <Route path="/admin/loyalty" element={<LoyaltyPage />} />
            <Route path="/admin/feedback" element={<FeedbackPage />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
          </Route>

          {/* Rute Terproteksi - CUSTOMER */}
          <Route element={
            <RouteGuard allowedRoles={['USER']}>
              <MainLayout />
            </RouteGuard>
          }>
            <Route path="/akun/beranda" element={<CustomerHome />} />
            <Route path="/akun/katalog" element={<CustomerKatalog />} />
            <Route path="/akun/pre-order" element={<CustomerPreOrder />} />
            <Route path="/akun/riwayat" element={<CustomerTransactions />} />
            <Route path="/akun/profil" element={<CustomerProfile />} />
            <Route path="/akun/notifikasi" element={<CustomerNotifications />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}