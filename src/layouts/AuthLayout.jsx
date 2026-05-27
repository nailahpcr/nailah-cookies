import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    // 'w-full' dan 'min-h-screen' memastikan background memenuhi layar
    <div className="min-h-screen w-full flex items-center justify-center bg-blue-500">
      {/* Hapus 'max-w-md' dari sini agar tidak membatasi ukuran di level layout.
        Biar halaman Login (LoginPage.jsx) yang menentukan ukuran kartunya sendiri.
      */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
}