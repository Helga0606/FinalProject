import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ShoppingCart, Receipt, LogIn } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Cart", path: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Transaksi", path: "/transactions", icon: <Receipt size={18} /> },
    { name: "Login", path: "/login", icon: <LogIn size={18} /> },
  ];

  return (
    <aside className="w-60 bg-[#1e293b] text-white flex flex-col p-6 min-h-screen">
      <h2 className="text-xl font-bold mb-10">Travel App</h2>
      <nav className="flex flex-col space-y-3">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
              location.pathname === item.path
                ? "bg-blue-600 text-white"
                : "hover:bg-blue-500 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
