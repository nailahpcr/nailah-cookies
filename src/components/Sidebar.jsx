import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Transactions', path: '/transactions', icon: '💰' },
    { name: 'Stock Inventory', path: '/stock', icon: '🏬' },
    { name: 'Pre Order', path: '/pre-order', icon: '⏳' },
    { name: 'Loyalty', path: '/loyalty', icon: '⭐' },
    { name: 'Segmentation', path: '/segmentation', icon: '🔍' },
    { name: 'Feedback', path: '/feedback', icon: '💬' },
    { name: 'Tracking', path: '/tracking', icon: '📍' },
    { name: 'Reports', path: '/reports', icon: '📈' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border h-full flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <span className="text-2xl font-extrabold text-primary tracking-wider">CendekiaBook</span>
      </div>

      {/* Menu Area */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname.includes(item.path);
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-semibold transition-all ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-textMuted hover:bg-gray-100 hover:text-textMain'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}