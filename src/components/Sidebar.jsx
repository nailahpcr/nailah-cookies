<<<<<<< HEAD
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ReceiptText, Package, MessageSquare, Settings } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Customers', path: '/customers', icon: <Users size={20} /> },
    { name: 'Transactions', path: '/transactions', icon: <ReceiptText size={20} /> },
    { name: 'Pre-Order', path: '/pre-order', icon: <Package size={20} /> },
    { name: 'Feedback', path: '/feedback', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">Cendekia App</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>
=======
import { NavLink } from "react-router-dom";
import { 
  MdDashboard, 
  MdGroup, // Icon untuk Customer
  MdLogout 
} from "react-icons/md";

// 1. Hanya menyisakan menu yang diinginkan
const menuItems = [
  { icon: MdDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MdGroup, label: "Customer", path: "/customers" }, // Mengarah ke path customers
];

export default function Sidebar() {
  
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3.5 px-4 py-3 rounded-lg transition-all duration-200 group ${
      isActive
        ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 font-semibold"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    }`;

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-full sticky top-0 z-40">
      
      {/* Logo DashStack */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-blue-500 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-base">D</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Dash<span className="text-blue-500"></span>
          </span>
        </div>
      </div>

      {/* Navigation - Hanya Dashboard & Customer */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} className={linkClasses}>
            <item.icon size={22} className="group-hover:scale-105 transition-transform" />
            <span className="text-[14px] tracking-wide">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions - Hanya Logout */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <button className="flex items-center gap-3.5 px-4 py-3 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all duration-200 w-full group">
          <MdLogout size={22} className="group-hover:scale-105 transition-transform" />
          <span className="text-[14px] font-medium tracking-wide">Logout</span>
        </button>
      </div>
>>>>>>> 9576723bce97312fdc17ad989ed1d6523a9bf6f5
    </aside>
  );
};

export default Sidebar;