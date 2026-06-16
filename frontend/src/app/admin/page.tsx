"use client";

import { motion } from "framer-motion";
import { 
  Users, Activity, CreditCard, Key, Settings, 
  ShieldAlert, Zap, Database, Globe, 
  LayoutDashboard, ServerCrash, ScrollText
} from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="flex h-screen bg-[#02000a] text-white overflow-hidden font-sans">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-black/80 border-r border-red-900/30 flex flex-col justify-between relative z-20">
        <div className="p-6">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-950 border border-red-500/50 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.3)]">
              <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                GOD MODE
              </h1>
              <p className="text-red-400/80 font-mono text-[10px] tracking-widest mt-1 uppercase">Super Admin</p>
            </div>
          </div>
          
          <nav className="space-y-2">
            <SidebarItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={20}/>} label="Trang Chủ" />
            <SidebarItem active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={<Users size={20}/>} label="Quản Lý Users" />
            <SidebarItem active={activeTab === 'billing'} onClick={() => setActiveTab('billing')} icon={<ScrollText size={20}/>} label="Doanh Thu" />
            <SidebarItem active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<ServerCrash size={20}/>} label="Hệ Thống" />
          </nav>
        </div>

        <div className="p-6 border-t border-white/5 space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-colors backdrop-blur-md">
            <Settings size={16} /> Cài Đặt Hệ Thống
          </button>
          <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)]">
            <Zap size={16} /> REBOOT SYSTEM
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <OverviewContent />}
          {activeTab === 'users' && <div className="text-2xl text-gray-500 p-20 text-center font-bold">Chức năng quản lý Users đang được cập nhật...</div>}
          {activeTab === 'billing' && <div className="text-2xl text-gray-500 p-20 text-center font-bold">Chức năng thống kê Doanh Thu đang được cập nhật...</div>}
          {activeTab === 'system' && <div className="text-2xl text-gray-500 p-20 text-center font-bold">Bảng điều khiển máy chủ đang được cập nhật...</div>}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-red-600/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

function OverviewContent() {
  const [metrics, setMetrics] = useState({
    revenue: "$124,500",
    active_subs: 4281,
    api_requests: "15,402",
    available_keys: "Free: 450 | Paid: 12"
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/admin/metrics")
      .then(res => res.json())
      .then(data => setMetrics(data))
      .catch(err => console.error("API Fetch Error", err));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">
      {/* Global Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="TOTAL REVENUE" value={metrics.revenue} trend="+24.5% vs last month" trendUp={true} icon={<CreditCard className="text-emerald-400" />} />
        <MetricCard title="ACTIVE BOTS" value={metrics.active_subs.toString()} trend="+125 deployed today" trendUp={true} icon={<Users className="text-blue-400" />} />
        <MetricCard title="API REQUESTS / MIN" value={metrics.api_requests} trend="Peak Load Detected" trendUp={false} icon={<Activity className="text-orange-400" />} />
        <MetricCard title="AI KEY POOL" value={metrics.available_keys} trend="System Healthy" trendUp={true} icon={<Key className="text-purple-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Server Status & Logs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl hover:border-red-500/30 transition-colors">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-3">
                <Database className="text-red-400" /> SERVER LOAD (LIVE)
              </h2>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                <span className="text-red-400 font-mono text-sm">LIVE</span>
              </div>
            </div>
            
            {/* Mock Chart Area */}
            <div className="h-64 flex items-end justify-between gap-2 border-b border-white/10 pb-4">
              {[40, 65, 45, 80, 55, 90, 70, 85, 100, 75, 60, 40].map((h, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ type: "spring", stiffness: 50, delay: i * 0.05 }}
                  className={`w-full rounded-t-md ${h > 80 ? 'bg-gradient-to-t from-red-900 to-red-500' : 'bg-gradient-to-t from-indigo-900 to-cyan-500'}`}
                ></motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-gray-500 font-mono text-xs">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>NOW</span>
            </div>
          </div>

          <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl">
            <h2 className="text-xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <Globe className="text-blue-400" /> GLOBAL INTEGRATIONS (OMNICHANNEL)
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Facebook API", status: "Active", count: "12.4k bots" },
                { name: "Zalo ZCA", status: "Active", count: "8.2k bots" },
                { name: "Shopee Open", status: "Syncing", count: "3.1k bots" },
                { name: "TikTok API", status: "Active", count: "5.5k bots" },
              ].map((plat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                  <span className="font-bold text-gray-200 mb-1">{plat.name}</span>
                  <span className="text-xs text-gray-400 mb-3">{plat.count}</span>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${plat.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    {plat.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Activity */}
        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex flex-col h-full">
          <h2 className="text-xl font-bold tracking-tight mb-6">RECENT TRANSACTIONS</h2>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {[
              { email: "khachhang_vip@gmail.com", plan: "PRO VIP", amount: "499,000đ", status: "SUCCESS", time: "Just now" },
              { email: "congty_abc@doanhnghiep.vn", plan: "ENTERPRISE", amount: "Liên Hệ", status: "PENDING", time: "2 mins ago" },
              { email: "hieu_bui@startup.io", plan: "PRO VIP", amount: "499,000đ", status: "SUCCESS", time: "15 mins ago" },
              { email: "user_test_123@yahoo.com", plan: "FREE TRIAL", amount: "0đ", status: "ACTIVATED", time: "1 hour ago" },
              { email: "nguyen_van_a@shop.vn", plan: "STARTER", amount: "Miễn phí", status: "ACTIVATED", time: "2 hours ago" },
              { email: "luxury_store@brand.com", plan: "ENTERPRISE", amount: "Liên Hệ", status: "SUCCESS", time: "5 hours ago" },
            ].map((tx, idx) => (
              <div key={idx} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded-lg transition-colors cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium text-sm text-gray-200">{tx.email}</span>
                  <span className="text-xs text-purple-400 font-semibold">{tx.plan}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm">{tx.amount}</div>
                  <div className={`text-[10px] font-mono mt-1 ${tx.status === 'SUCCESS' || tx.status === 'ACTIVATED' ? 'text-emerald-400' : 'text-orange-400'}`}>
                    {tx.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 rounded-xl transition-colors text-sm">
            VIEW FULL LEDGER
          </button>
        </div>

      </div>
    </motion.div>
  );
}

function MetricCard({ title, value, trend, trendUp, icon }: { title: string, value: string, trend: string, trendUp: boolean, icon: React.ReactNode }) {
  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-black/50 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex flex-col justify-between h-44 relative overflow-hidden group shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start relative z-10">
        <h3 className="text-xs font-bold tracking-widest text-gray-400">{title}</h3>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          {icon}
        </div>
      </div>
      <div className="relative z-10">
        <div className="text-4xl font-light tracking-tight">{value}</div>
        <div className={`text-xs mt-2 font-medium ${trendUp ? 'text-emerald-400' : 'text-orange-400'}`}>
          {trend}
        </div>
      </div>
    </motion.div>
  );
}
