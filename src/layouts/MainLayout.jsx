import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-background font-sans">
      {/* Kiri: Sidebar statis */}
      <Sidebar />

      {/* Kanan: Area Konten Dinamis */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        {/* Area Scrollable untuk Pages */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}