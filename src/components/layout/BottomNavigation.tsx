
import { Home, User, ShoppingCart, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const navItems = [
    {
      icon: Home,
      label: 'Home',
      path: '/',
    },
    {
      icon: Calendar,
      label: 'Bookings',
      path: '/bookings',
    },
    {
      icon: ShoppingCart,
      label: 'Cart',
      path: '/cart',
    },
    {
      icon: User,
      label: 'Profile',
      path: '/profile',
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-30">
      {navItems.map((item) => {
        const isActive = currentPath === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              isActive ? 'text-teal-600' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} className={isActive ? 'animate-bounce-slow' : ''} />
            <span className="text-[10px]">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
