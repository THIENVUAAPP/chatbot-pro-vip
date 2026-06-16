"use client";

import Link from "next/link";
import { LayoutDashboard, Bot, CreditCard, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Tổng quan", icon: <LayoutDashboard className="w-5 h-5" /> },
    { href: "/dashboard/bot", label: "Quản lý Bot AI", icon: <Bot className="w-5 h-5" /> },
    { href: "/dashboard/billing", label: "Thanh toán & Gói", icon: <CreditCard className="w-5 h-5" /> },
  ];

  return (
    <div className="w-64 h-screen bg-[#07020d] border-r border-white/5 flex flex-col text-white fixed left-0 top-0 z-40">
      <div className="p-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-black text-xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-500 shadow-sm">
            AI_SAAS_PRO
          </span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href}
              href={item.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border-l-2 border-blue-500 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5 space-y-1 bg-black/20">
        <Link 
          href="/dashboard/settings" 
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${pathname === '/dashboard/settings' ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/10 border-l-2 border-blue-500 text-white font-bold' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Cài đặt</span>
        </Link>
        <button 
          onClick={() => alert("Đã đăng xuất hệ thống!")}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-gray-400 hover:text-red-400"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
