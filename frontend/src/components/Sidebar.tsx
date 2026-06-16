import Link from "next/link";
import { LayoutDashboard, Bot, CreditCard, Settings, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-[#0a0118] border-r border-white/10 flex flex-col text-white fixed left-0 top-0">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">ChatBot<span className="text-purple-400">PRO</span></span>
        </Link>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300 hover:text-white">
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Tổng quan</span>
        </Link>
        <Link href="/dashboard/bot" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300 hover:text-white">
          <Bot className="w-5 h-5" />
          <span className="font-medium">Quản lý Bot AI</span>
        </Link>
        <Link href="/dashboard/billing" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300 hover:text-white">
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Thanh toán & Gói</span>
        </Link>
      </div>

      <div className="p-4 border-t border-white/10 space-y-2">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-gray-300 hover:text-white">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Cài đặt</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors text-gray-300 hover:text-red-400">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
}
