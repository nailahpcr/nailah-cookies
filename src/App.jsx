import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import MainLayouts from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Loading Fallback
const Loading = () => (
  <div className="h-screen w-full flex items-center justify-center bg-red-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-700"></div>
      <p className="mt-4 text-red-700 font-medium italic">Memuat Pustaka Cendekia...</p>
    </div>
  </div>
);

// React Lazy Load Pages (Gunakan path relatif ./)
const LoginPage = lazy(() => import("./pages/LoginPages"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CustomersPage = lazy(() => import("./pages/CustomersPage"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* RUTE AUTH (Login, Register, dll) */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          {/* RUTE UTAMA (Dashboard, Stock, dll) */}
          <Route path="/" element={<MainLayouts />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="customers" element={<CustomersPage />} />
            {/* Tambahkan rute lain di bawah ini */}
          </Route>

          {/* Redirect jika rute tidak ditemukan */}
          <Route path="*" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;