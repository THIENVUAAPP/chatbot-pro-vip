"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Users, Settings, Play, CreditCard, 
  Upload, Link as LinkIcon, Database, CheckCircle2, 
  Zap, LayoutDashboard, BrainCircuit, Blocks, Crown, X, Store,
  Send, User, Phone, Bot, Power, PowerOff, Pencil, Trash2
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [user, setUser] = useState<any>(null); // Mock Google Auth User

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden">
      
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-black/80 border-r border-white/10 flex flex-col justify-between">
        <div className="p-6">
          <div className="mb-10">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              CHATBOT PRO
            </h1>
            <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">Workspace</p>
            
            {/* Google Login / User Profile */}
            <div className="mt-6">
              {user ? (
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center font-bold">{user.name[0]}</div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user.email}</p>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={() => setUser({ name: "Nguyễn Văn A", email: "nguyenvana@gmail.com" })}
                  className="w-full bg-white text-black font-bold py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors text-sm"
                >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google"/>
                  Đăng nhập Gmail
                </button>
              )}
            </div>
          </div>
          
          <nav className="space-y-2">
            <SidebarItem active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<LayoutDashboard size={20}/>} label="Tổng Quan" />
            <SidebarItem active={activeTab === 'industries'} onClick={() => setActiveTab('industries')} icon={<Store size={20}/>} label="30+ Ngành Nghề" />
            <SidebarItem active={activeTab === 'crm-chat'} onClick={() => setActiveTab('crm-chat')} icon={<Users size={20}/>} label="CRM & Live Chat" />
            <SidebarItem active={activeTab === 'automation'} onClick={() => setActiveTab('automation')} icon={<Zap size={20}/>} label="Tự Động Hóa" />
            <SidebarItem active={activeTab === 'knowledge'} onClick={() => setActiveTab('knowledge')} icon={<BrainCircuit size={20}/>} label="Huấn Luyện AI" />
            <SidebarItem active={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} icon={<Blocks size={20}/>} label="Đa Nền Tảng" />
          </nav>
        </div>

        <div className="p-6 border-t border-white/5">
          {isVIP ? (
            <div className="w-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2">
              <Crown size={20} /> Đang dùng gói VIP
            </div>
          ) : (
            <button 
              onClick={() => setShowPaymentModal(true)}
              className="w-full bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all"
            >
              <Crown size={20} /> Nâng Cấp VIP
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'industries' && <IndustriesTab />}
          {activeTab === 'crm-chat' && <CrmChatTab />}
          {activeTab === 'automation' && <AutomationTab />}
          {activeTab === 'knowledge' && <KnowledgeTab />}
          {activeTab === 'integrations' && <IntegrationsTab />}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <PaymentModal onClose={() => setShowPaymentModal(false)} onUpgrade={() => setIsVIP(true)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick} 
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </button>
  );
}

function OverviewTab() {
  const [stats, setStats] = useState({ total_messages: 0, customers: 0, orders_closed: 0, conversion_rate: "0%" });
  const [botConfig, setBotConfig] = useState({ bot_name: "Loading...", industry: "", system_prompt: "", voice_enabled: false, bot_active: true });

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard/stats").then(res => res.json()).then(setStats).catch(console.error);
    fetch("http://localhost:8000/api/dashboard/bot-config").then(res => res.json()).then(setBotConfig).catch(console.error);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">Tổng Quan Hệ Thống</h2>
        <p className="text-gray-400 mt-2">Theo dõi hiệu suất và cài đặt cơ bản của AI Agent.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng tin nhắn" value={stats.total_messages.toLocaleString()} icon={<MessageSquare className="text-blue-400" />} />
        <StatCard title="Khách hàng" value={stats.customers.toLocaleString()} icon={<Users className="text-cyan-400" />} />
        <StatCard title="Đơn chốt thành công" value={stats.orders_closed.toLocaleString()} icon={<CreditCard className="text-emerald-400" />} />
        <StatCard title="Tỷ lệ chuyển đổi" value={stats.conversion_rate} icon={<Play className="text-purple-400" />} />
      </div>

      {/* Bot Config Preview */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Settings className="text-gray-400" /> Cấu Hình Bot Hiện Tại: <span className="text-cyan-400">{botConfig.bot_name}</span>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Ngành Nghề</label>
              <div className="bg-black/50 border border-white/5 p-4 rounded-xl text-lg">{botConfig.industry || "Đang tải..."}</div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Trạng thái Hoạt Động Của Bot</label>
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => setBotConfig({...botConfig, bot_active: !botConfig.bot_active})}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${botConfig.bot_active ? 'bg-emerald-500' : 'bg-red-500'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${botConfig.bot_active ? 'translate-x-6' : ''}`}></div>
                </div>
                <span className={botConfig.bot_active ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {botConfig.bot_active ? "Đang Bật (Tự động trả lời)" : "Đã Tắt (Chờ Admin)"}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Tính năng Voice AI (Gọi điện)</label>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-6 rounded-full p-1 transition-colors ${botConfig.voice_enabled ? 'bg-cyan-500' : 'bg-gray-700'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${botConfig.voice_enabled ? 'translate-x-6' : ''}`}></div>
                </div>
                <span className={botConfig.voice_enabled ? 'text-cyan-400 font-medium' : 'text-gray-500'}>
                  {botConfig.voice_enabled ? "Đã Kích Hoạt VIP PRO" : "Đã Tắt"}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">System Prompt (Chỉ thị hành vi)</label>
              <textarea 
                readOnly 
                value={botConfig.system_prompt || "Đang tải..."}
                className="w-full h-32 bg-black/50 border border-white/5 rounded-xl p-4 text-gray-300 focus:outline-none resize-none leading-relaxed text-sm"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AutomationTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Zap className="text-yellow-400" size={32} /> Kịch Bản Tự Động Hóa</h2>
        <p className="text-gray-400 mt-2 max-w-3xl">Xây dựng luồng chốt sale tự động và phân luồng thông minh dựa trên hành vi khách hàng.</p>
      </header>

      <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border border-purple-500/30 rounded-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Phễu Thu Thập Thông Tin</h3>
                <p className="text-sm text-gray-400 mt-1">Bắt buộc Bot xin Tên, SĐT, Địa chỉ khi khách muốn mua.</p>
              </div>
              <div className="w-12 h-6 bg-cyan-500 rounded-full p-1 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full translate-x-6"></div></div>
            </div>
          </div>

          <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Tung Khuyến Mãi Bám Đuổi</h3>
                <p className="text-sm text-gray-400 mt-1">Gợi ý Mã giảm giá / Freeship nếu khách chần chừ do dự về giá.</p>
              </div>
              <div className="w-12 h-6 bg-cyan-500 rounded-full p-1 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full translate-x-6"></div></div>
            </div>
          </div>

          <div className="bg-black/50 border border-white/10 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Auto-Inbox Khi Comment</h3>
                <p className="text-sm text-gray-400 mt-1">Tự động trả lời bình luận Fanpage và nhắn tin Inbox riêng.</p>
              </div>
              <div className="w-12 h-6 bg-cyan-500 rounded-full p-1 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full translate-x-6"></div></div>
            </div>
          </div>

          <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-red-400">SOS Chuyển Tiếp Nhân Viên</h3>
                <p className="text-sm text-gray-400 mt-1">Báo động qua Telegram/Zalo khi Bot bị tắt, khách cáu gắt hoặc yêu cầu gặp nhân viên.</p>
              </div>
              <div className="w-12 h-6 bg-red-500 rounded-full p-1 cursor-pointer"><div className="w-4 h-4 bg-white rounded-full translate-x-6"></div></div>
            </div>
            <input type="text" placeholder="Nhập ID Telegram nhận cảnh báo (VD: @admin_shop)" className="w-full mt-4 bg-black/50 border border-white/10 rounded-lg p-3 text-sm text-white focus:border-red-400 outline-none" defaultValue="@boss_zalo" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function KnowledgeTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3"><BrainCircuit className="text-purple-400" size={32} /> Trung Tâm Huấn Luyện AI</h2>
        <p className="text-gray-400 mt-2 max-w-3xl">Cung cấp tài liệu và website để AI tự động đọc hiểu và học thuộc mọi thông tin về doanh nghiệp của bạn.</p>
      </header>

      <div className="grid grid-cols-1 gap-8">
        
        {/* Upload File - 1 Clear Box */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/50 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform"><Upload className="text-cyan-400" size={28}/></div>
            <h2 className="text-xl font-bold">Tải lên Tài Liệu</h2>
          </div>
          <p className="text-gray-400 text-sm mb-6">Hỗ trợ PDF, DOCX, TXT, CSV. Dung lượng tối đa 50MB.</p>
          
          <div className="border-2 border-dashed border-white/20 rounded-xl p-16 flex flex-col items-center justify-center text-center hover:border-cyan-400 transition-colors cursor-pointer bg-black/30">
            <p className="font-semibold text-lg mb-2">Kéo thả file vào đây</p>
            <p className="text-gray-500 text-sm mb-6">hoặc</p>
            <button className="bg-cyan-600 text-white px-10 py-4 rounded-full font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-500/20">Chọn File Từ Máy Tính</button>
          </div>
        </div>

        {/* Manage Data */}
        <div className="md:col-span-2 bg-black/40 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Database className="text-emerald-400" /> Kho Dữ Liệu Đã Học</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-white/5 text-gray-200 uppercase font-semibold">
                <tr>
                  <th className="px-6 py-4 rounded-tl-lg">Tên / Nguồn</th>
                  <th className="px-6 py-4">Loại</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4 rounded-tr-lg">Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Chinh_sach_doi_tra_2026.pdf</td>
                  <td className="px-6 py-4">Tài liệu (PDF)</td>
                  <td className="px-6 py-4 text-emerald-400 flex items-center gap-1"><CheckCircle2 size={14}/> Đã học xong</td>
                  <td className="px-6 py-4">Hôm qua</td>
                  <td className="px-6 py-4"><button className="text-red-400 hover:text-red-300">Xóa</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IntegrationsTab() {
  // Trạng thái lưu trữ việc hiển thị Modal cho từng nền tảng
  const [activeIntegration, setActiveIntegration] = useState<{name: string, type: string, color: string, fields: any[]} | null>(null);
  
  // Dữ liệu mô phỏng trạng thái kết nối
  const [connections, setConnections] = useState({
    facebook: false,
    zalo: false,
    shopee: false,
    tiktok: false
  });

  const integrationList = [
    { 
      id: 'facebook', name: "Facebook Messenger", desc: "Tự động trả lời Inbox Fanpage.", color: "bg-blue-600",
      fields: [{id: 'page_id', label: 'Page ID'}, {id: 'access_token', label: 'Page Access Token'}]
    },
    { 
      id: 'zalo', name: "Zalo ZCA / OA", desc: "Gửi tin nhắn Zalo ZNS, tự động tư vấn qua Zalo OA.", color: "bg-blue-500",
      fields: [{id: 'oa_id', label: 'Zalo OA ID'}, {id: 'access_token', label: 'OA Access Token'}]
    },
    { 
      id: 'shopee', name: "Shopee API", desc: "Đồng bộ kho hàng, trả lời tin nhắn người mua.", color: "bg-orange-500",
      fields: [{id: 'shop_id', label: 'Shop ID'}, {id: 'partner_id', label: 'Partner ID'}, {id: 'partner_key', label: 'Partner Key'}]
    },
    { 
      id: 'tiktok', name: "TikTok Shop", desc: "Tương tác livestream, phản hồi giỏ hàng.", color: "bg-black",
      fields: [{id: 'app_key', label: 'App Key'}, {id: 'app_secret', label: 'App Secret'}]
    }
  ];

  const handleConnectSubmit = (id: string) => {
    setConnections(prev => ({...prev, [id]: true}));
    setActiveIntegration(null);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Blocks className="text-orange-400" size={32} /> Kết Nối Đa Nền Tảng</h2>
        <p className="text-gray-400 mt-2 max-w-3xl">Gắn API Token để đồng bộ AI Agent lên Facebook, Zalo, Shopee và TikTok Shop.</p>
      </header>

      {/* Embed Script */}
      <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/20 border border-cyan-500/30 rounded-2xl p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Mã Nhúng Website (Embed Widget)</h2>
          <p className="text-gray-300 text-sm mb-6 max-w-2xl">Copy đoạn mã dưới đây và dán vào thẻ <code className="bg-black/50 px-1 rounded text-cyan-300">&lt;head&gt;</code> trên website cá nhân của bạn. Bot sẽ lập tức xuất hiện và hoạt động.</p>
          
          <div className="bg-black/80 border border-white/10 rounded-xl p-4 flex justify-between items-start font-mono text-sm text-emerald-400">
            <pre className="whitespace-pre-wrap">
{`<script>
  window.CHATBOT_PRO_ID = "usr_live_8f92jxc1";
</script>
<script src="https://api.chatbotpro.vn/v1/widget.js" async></script>`}
            </pre>
            <button className="bg-white text-black px-4 py-2 rounded-lg font-bold text-xs hover:bg-gray-200">COPY</button>
          </div>
        </div>
      </div>

      {/* App Store (Social Media Connect) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {integrationList.map((item) => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:bg-white/10 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center font-bold text-white shadow-lg text-xl`}>
                  {item.name[0]}
                </div>
                <h3 className="font-bold text-lg">{item.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mb-6 h-12">{item.desc}</p>
            </div>
            {connections[item.id as keyof typeof connections] ? (
              <button 
                onClick={() => setConnections(prev => ({...prev, [item.id]: false}))}
                className="w-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/50"
              >
                <CheckCircle2 size={18} /> Đã Kết Nối (Bấm để ngắt)
              </button>
            ) : (
              <button 
                onClick={() => setActiveIntegration({name: item.name, type: item.id, color: item.color, fields: item.fields})}
                className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-xl transition-colors shadow-lg"
              >
                Cấu Hình Kết Nối
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Integration Modal */}
      <AnimatePresence>
        {activeIntegration && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
            >
              <div className={`${activeIntegration.color} p-6 flex justify-between items-center`}>
                <h3 className="text-xl font-bold text-white">Kết Nối {activeIntegration.name}</h3>
                <button onClick={() => setActiveIntegration(null)} className="text-white/80 hover:text-white bg-black/20 p-2 rounded-full">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-gray-400 text-sm">Vui lòng cung cấp chính xác các thông tin API dưới đây để hệ thống AI có quyền truy cập và tự động trả lời khách hàng.</p>
                
                {activeIntegration.fields.map(field => (
                  <div key={field.id}>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">{field.label}</label>
                    <input 
                      type={field.id.includes('token') || field.id.includes('secret') || field.id.includes('key') ? 'password' : 'text'} 
                      placeholder={`Nhập ${field.label}...`}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none"
                    />
                  </div>
                ))}

                <button 
                  onClick={() => handleConnectSubmit(activeIntegration.type)}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl mt-4 transition-all"
                >
                  Xác Nhận & Kết Nối
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-32 hover:border-cyan-500/50 transition-colors shadow-lg">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        {icon}
      </div>
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
    </div>
  );
}

// Modal Thanh Toán Cao Cấp
function PaymentModal({ onClose, onUpgrade }: { onClose: () => void, onUpgrade: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }}
        className="bg-gradient-to-b from-[#1a1a1a] to-black border border-yellow-500/30 rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_0_50px_rgba(234,179,8,0.15)] relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white bg-white/5 p-2 rounded-full z-10 transition-colors">
          <X size={24} />
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Left: Info */}
          <div className="p-10 lg:w-1/2 border-r border-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-500/5 blur-[100px]"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-bold mb-6">
                <Crown size={14}/> GÓI DOANH NGHIỆP
              </div>
              <h2 className="text-4xl font-extrabold mb-4">Nâng Tầm<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600">Đế Chế Bán Hàng</span></h2>
              <p className="text-gray-400 mb-8 leading-relaxed">Mở khóa toàn bộ sức mạnh của "Nhân Viên Số AI". Trả lời không giới hạn, kết nối full đa nền tảng và nhận hỗ trợ 24/7 từ đội ngũ Kỹ sư AI.</p>
              
              <ul className="space-y-4 mb-8">
                {['Không giới hạn Data Huấn luyện', 'Tích hợp 5 Fanpage & Zalo OA', 'Truy cập Flow Automation Cao cấp', 'Gỡ Logo Watermark CHATBOT PRO', 'Hỗ trợ kỹ thuật 1-kèm-1'].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <CheckCircle2 className="text-yellow-500" size={18} /> {feature}
                  </li>
                ))}
              </ul>
              
              <div className="text-5xl font-black font-mono tracking-tighter">
                $49<span className="text-xl text-gray-500 font-normal">/tháng</span>
              </div>
            </div>
          </div>
          
          {/* Right: Payment Method */}
          <div className="p-10 lg:w-1/2 bg-black/50">
            <h3 className="text-xl font-bold mb-6 border-b border-white/10 pb-4">Thông tin thanh toán</h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tên chủ thẻ</label>
                <input type="text" placeholder="NGUYEN VAN A" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 outline-none uppercase" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Số thẻ</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                  <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-yellow-500 outline-none font-mono" />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Hết hạn (MM/YY)</label>
                  <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 outline-none font-mono text-center" />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">CVC</label>
                  <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-500 outline-none font-mono text-center" />
                </div>
              </div>

              <button 
                onClick={() => { onUpgrade(); onClose(); }}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-black font-extrabold py-4 rounded-xl mt-6 shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:shadow-[0_0_50px_rgba(234,179,8,0.5)] transition-all transform hover:-translate-y-1"
              >
                THANH TOÁN NGAY ($49)
              </button>
              
              <div className="text-center mt-4 text-xs text-gray-600 flex items-center justify-center gap-1">
                <CheckCircle2 size={12}/> Thanh toán an toàn qua cổng Stripe. Hủy bất cứ lúc nào.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function IndustriesTab() {
  const [selectedIndustry, setSelectedIndustry] = useState("fashion");
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);
  
  const [industries, setIndustries] = useState<any[]>([
    { id: "fashion", name: "Thời Trang & Quần Áo", desc: "Tư vấn size, mix đồ, chốt sale nhanh", icon: "👗", color: "from-pink-500 to-rose-500", agent: "Fashion AI Agent", skills: "Tư vấn size, Chốt đơn, Tung mã giảm giá", prompt: "Bạn là chuyên gia tư vấn thời trang. Hãy chốt đơn nhanh." },
    { id: "cosmetics", name: "Mỹ Phẩm & Skincare", desc: "Soi da, tư vấn liệu trình, chốt đơn", icon: "💄", color: "from-rose-400 to-red-500", agent: "Cosmetics AI Agent", skills: "Tư vấn liệu trình, Soi da, Bán chéo mỹ phẩm", prompt: "Bạn là chuyên gia skincare. Hãy tư vấn liệu trình và chốt đơn." },
    { id: "dental", name: "Nha Khoa", desc: "Khám răng, niềng răng, chốt Đặt Lịch", icon: "🦷", color: "from-cyan-400 to-blue-500", agent: "Dental AI Agent", skills: "Đặt lịch hẹn, Tư vấn răng miệng", prompt: "Bạn là trợ lý nha khoa. Hãy đặt lịch hẹn khám răng." },
    { id: "spa", name: "Spa & Làm Đẹp", desc: "Chăm sóc da, massage, chốt Đặt Lịch", icon: "💆‍♀️", color: "from-fuchsia-500 to-purple-600", agent: "Spa AI Agent", skills: "Đặt lịch hẹn, Tư vấn dịch vụ massage", prompt: "Bạn là trợ lý spa. Hãy đặt lịch chăm sóc da." },
    { id: "clinic", name: "Phòng Khám Bệnh", desc: "Tư vấn bệnh lý cơ bản, chốt Khám", icon: "🏥", color: "from-red-500 to-red-700", agent: "Clinic AI Agent", skills: "Hẹn khám bệnh, Hỏi triệu chứng cơ bản", prompt: "Bạn là trợ lý y tế. Hãy tư vấn bệnh lý cơ bản." },
    { id: "real_estate", name: "Bất Động Sản", desc: "Tư vấn dự án, xin SĐT Sale gọi lại", icon: "🏢", color: "from-amber-500 to-orange-600", agent: "Property AI Agent", skills: "Thu thập SĐT khách quan tâm, Tư vấn căn hộ", prompt: "Bạn là chuyên viên bất động sản. Hãy thu thập SĐT để gọi lại." },
    { id: "restaurant", name: "Nhà Hàng & Quán Ăn", desc: "Gửi menu, chốt Đặt Bàn", icon: "🍽️", color: "from-orange-400 to-red-500", agent: "Restaurant AI Agent", skills: "Đặt bàn ăn, Gửi thực đơn", prompt: "Bạn là lễ tân nhà hàng. Hãy chốt đặt bàn." },
    { id: "cafe", name: "Trà Sữa & Cafe", desc: "Tư vấn size, topping, chốt Ship", icon: "🧋", color: "from-amber-600 to-yellow-600", agent: "Barista AI Agent", skills: "Nhận order nước uống, Tính tiền", prompt: "Bạn là nhân viên order cafe. Hãy chốt ship nước." },
    { id: "education", name: "Giáo Dục & Khóa Học", desc: "Tư vấn lộ trình, xin test đầu vào", icon: "🎓", color: "from-blue-500 to-indigo-600", agent: "Tutor AI Agent", skills: "Tư vấn lộ trình học, Hẹn lịch test", prompt: "Bạn là chuyên viên tư vấn giáo dục." },
    { id: "gym", name: "Gym & Fitness", desc: "Tư vấn PT, tặng buổi tập thử", icon: "🏋️‍♂️", color: "from-zinc-600 to-zinc-800", agent: "Fitness AI Agent", skills: "Đặt lịch tập thử, Tư vấn PT", prompt: "Bạn là huấn luyện viên gym ảo." },
    { id: "furniture", name: "Nội Thất", desc: "Báo giá thi công, gửi mẫu 3D", icon: "🛋️", color: "from-stone-500 to-stone-700", agent: "Furniture AI Agent", skills: "Báo giá thi công, Gửi mẫu thiết kế", prompt: "Bạn là kiến trúc sư nội thất ảo." },
    { id: "recruitment", name: "Tuyển Dụng", desc: "Nhận CV, tư vấn JD, hẹn phỏng vấn", icon: "💼", color: "from-blue-700 to-blue-900", agent: "HR Recruiter Agent", skills: "Lên lịch phỏng vấn, Hỏi thông tin ứng viên", prompt: "Bạn là chuyên viên tuyển dụng HR." },
    { id: "travel", name: "Du Lịch & Tour", desc: "Báo giá tour, chốt Booking", icon: "✈️", color: "from-sky-400 to-cyan-500", agent: "Travel Guide Agent", skills: "Báo giá tour du lịch, Đặt chỗ tour", prompt: "Bạn là tư vấn viên du lịch." },
    { id: "shoes", name: "Giày Dép", desc: "Tư vấn size chân, chốt đơn freeship", icon: "👟", color: "from-orange-500 to-rose-500", agent: "Shoe AI Agent", skills: "Tư vấn chọn size giày, Chốt đơn freeship", prompt: "Bạn là nhân viên bán giày." },
    { id: "tech", name: "Điện Thoại & Phụ Kiện", desc: "Tư vấn cấu hình, chốt bảo hành", icon: "📱", color: "from-slate-600 to-slate-800", agent: "Tech Expert Agent", skills: "Tư vấn cấu hình máy, Chốt bảo hành", prompt: "Bạn là chuyên gia tư vấn công nghệ." },
    { id: "car", name: "Ô Ô & Xe Máy", desc: "Báo giá lăn bánh, chốt lái thử", icon: "🚗", color: "from-red-600 to-red-800", agent: "Car Expert Agent", skills: "Hẹn lái thử, Báo giá lăn bánh ô tô", prompt: "Bạn là tư vấn viên ô tô." },
    { id: "pharmacy", name: "Nhà Thuốc", desc: "Tư vấn liều dùng, chốt ship thuốc", icon: "💊", color: "from-emerald-500 to-teal-600", agent: "Pharmacist AI Agent", skills: "Tư vấn liều dùng, Chốt đơn ship thuốc", prompt: "Bạn là dược sĩ tư vấn online." },
  ]);

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa ngành nghề này? Tất cả kịch bản AI Agent & Kỹ năng phụ thuộc sẽ bị loại bỏ.")) {
      const updated = industries.filter(ind => ind.id !== id);
      setIndustries(updated);
      if (selectedIndustry === id && updated.length > 0) {
        setSelectedIndustry(updated[0].id);
      }
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 pb-10">
      <header className="mb-8 flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-3"><Store className="text-cyan-400" size={32} /> Kho Kịch Bản AI Chuyên Gia</h2>
          <p className="text-gray-400 mt-2 max-w-3xl">Tùy biến toàn diện kịch bản kinh doanh. Có thể thêm mới, sửa đổi hay xóa bỏ các lĩnh vực AI Agent kèm kỹ năng (Skill) hỗ trợ bất kỳ lúc nào.</p>
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {industries.map((ind) => (
          <div 
            key={ind.id}
            onClick={() => setSelectedIndustry(ind.id)}
            className={`relative cursor-pointer group rounded-2xl p-4 border transition-all duration-300 ${selectedIndustry === ind.id ? 'bg-white/10 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}
          >
            {/* Action buttons (Edit & Delete) */}
            <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-black/80 p-1.5 rounded-lg border border-white/10">
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setEditData(ind); 
                  setShowCustomModal(true); 
                }}
                className="p-1 hover:text-cyan-400 transition-colors"
                title="Sửa"
              >
                <Pencil size={14} />
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleDelete(ind.id); 
                }}
                className="p-1 hover:text-red-400 transition-colors"
                title="Xóa"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {selectedIndustry === ind.id && (
              <div className="absolute top-2 right-2 text-cyan-400 group-hover:hidden">
                <CheckCircle2 size={18} className="fill-cyan-400/20" />
              </div>
            )}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${ind.color || 'from-cyan-600 to-blue-700'} flex items-center justify-center text-2xl mb-3 shadow-lg`}>
              {ind.icon || '✨'}
            </div>
            <h3 className="font-bold text-sm text-white mb-1">{ind.name}</h3>
            <p className="text-xs text-gray-500 leading-snug line-clamp-2 mb-3">{ind.desc}</p>
            
            <div className="pt-2 border-t border-white/5 space-y-1.5 text-[10px] text-gray-400">
              <div className="flex items-center gap-1.5">
                <span>🤖</span>
                <span className="text-cyan-300 font-semibold truncate">{ind.agent || "Sales Agent"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚡</span>
                <span className="truncate text-emerald-400" title={ind.skills || "Tư vấn & Chốt đơn"}>Skill: {ind.skills || "Tư vấn & Chốt đơn"}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* Custom Industry Card */}
        <div 
          onClick={() => {
            setEditData(null);
            setShowCustomModal(true);
          }}
          className="relative cursor-pointer group rounded-2xl p-4 border border-dashed border-white/20 bg-black/40 hover:border-cyan-400/50 hover:bg-white/5 transition-all duration-300 flex flex-col items-center justify-center text-center min-h-[180px]"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-3 text-gray-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all">
            +
          </div>
          <h3 className="font-bold text-sm text-gray-300 group-hover:text-white mb-1">Thêm Ngành Nghề</h3>
          <p className="text-xs text-gray-500 leading-snug">Thiết lập linh hồn AI & Kỹ năng mới</p>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-cyan-900/40 to-blue-900/20 border border-cyan-500/30 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Cấu hình kịch bản</h3>
          <p className="text-gray-400 text-sm">Bot của bạn hiện đang chạy kịch bản: <b className="text-cyan-400">{industries.find(i => i.id === selectedIndustry)?.name || "Chưa chọn"}</b></p>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
          Áp dụng Ngay
        </button>
      </div>

      <AnimatePresence>
        {showCustomModal && (
          <CustomIndustryModal 
            initialData={editData}
            onClose={() => {
              setShowCustomModal(false);
              setEditData(null);
            }} 
            onSave={(newInd) => {
              if (editData) {
                setIndustries(industries.map(ind => ind.id === editData.id ? { ...ind, ...newInd } : ind));
              } else {
                setIndustries([...industries, newInd]);
                setSelectedIndustry(newInd.id);
              }
              setShowCustomModal(false);
              setEditData(null);
            }} 
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CustomIndustryModal({ onClose, onSave, initialData }: { onClose: () => void, onSave: (ind: any) => void, initialData?: any }) {
  const [name, setName] = useState(initialData?.name || "");
  const [desc, setDesc] = useState(initialData?.desc || "");
  const [agentName, setAgentName] = useState(initialData?.agent || "");
  const [skills, setSkills] = useState(initialData?.skills || "");
  const [prompt, setPrompt] = useState(initialData?.prompt || "");

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col"
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Store className="text-cyan-400" size={24}/> {initialData ? "Chỉnh Sửa Ngành Nghề" : "Tạo Ngành Nghề Mới"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white bg-black/20 p-2 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-8 space-y-5 overflow-y-auto max-h-[calc(80vh-8rem)]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Tên Lĩnh Vực / Ngành Nghề</label>
              <input 
                value={name} onChange={e => setName(e.target.value)}
                type="text" placeholder="Ví dụ: Bán Yến Sào..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Mô Tả Ngắn</label>
              <input 
                value={desc} onChange={e => setDesc(e.target.value)}
                type="text" placeholder="Ví dụ: Tư vấn liệu trình, chốt đơn yến..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Tên AI Agent</label>
              <input 
                value={agentName} onChange={e => setAgentName(e.target.value)}
                type="text" placeholder="Ví dụ: YếnSào AI Expert"
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-2">Kỹ Năng Hỗ Trợ (Skills)</label>
              <input 
                value={skills} onChange={e => setSkills(e.target.value)}
                type="text" placeholder="Đặt lịch hẹn, Tư vấn giá, Bán sỉ..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-400 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-2">Chỉ Thị Lõi AI (System Prompt)</label>
            <textarea 
              value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder="Bạn là chuyên gia tư vấn yến sào. Hãy luôn thân thiện, hướng dẫn khách hàng cách chưng yến và xin SĐT để giao hàng..."
              className="w-full h-36 bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:border-cyan-400 outline-none resize-none"
            ></textarea>
          </div>

          <button 
            onClick={() => {
              if(!name) return;
              onSave({
                id: initialData?.id || 'custom_' + Date.now(),
                name: name,
                desc: desc || "Kịch bản tự định nghĩa",
                agent: agentName || name + " Agent",
                skills: skills || "Tư vấn & Chốt đơn",
                prompt: prompt || "Bạn là chuyên gia trong lĩnh vực " + name,
                icon: initialData?.icon || "✨",
                color: initialData?.color || "from-cyan-600 to-blue-700"
              });
            }}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all text-sm"
          >
            {initialData ? "Cập Nhật Kịch Bản" : "Lưu & Áp Dụng Ngành Nghề"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function CrmChatTab() {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [botActive, setBotActive] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");

  const channels = [
    { id: "all", name: "Tất cả", icon: "🌐" },
    { id: "facebook_profile", name: "FB Cá Nhân", icon: "👤" },
    { id: "facebook_page", name: "Fanpage", icon: "📄" },
    { id: "facebook_group", name: "FB Nhóm", icon: "👥" },
    { id: "tiktok", name: "TikTok Shop", icon: "🎵" },
    { id: "shopee", name: "Shopee Store", icon: "🛍️" },
    { id: "website", name: "Website", icon: "💻" }
  ];

  const customers = [
    { id: 1, name: "Nguyễn Văn Anh", phone: "0901234567", lastMessage: "Cho mình xin giá nhé", time: "10:30", unread: 2, status: "COLLECT_INFO", channel: "facebook_page" },
    { id: 2, name: "Trần Thị Bé", phone: "0987654321", lastMessage: "Đã đặt lịch hẹn 14h chiều", time: "09:15", unread: 0, status: "BOOKING_APPOINTMENT", channel: "facebook_page" },
    { id: 3, name: "Khách Vãng Lai", phone: "Chưa có", lastMessage: "Sản phẩm này có màu đỏ không?", time: "Hôm qua", unread: 0, status: "NORMAL", channel: "website" },
    { id: 4, name: "Lê Văn Cường", phone: "0911223344", lastMessage: "Cho gặp nhân viên thật đi", time: "Hôm qua", unread: 1, status: "SOS_HANDOFF", channel: "tiktok" },
    { id: 5, name: "Nguyễn Hoàng Nam", phone: "0934556677", lastMessage: "Shop tư vấn giúp mình với", time: "11:20", unread: 0, status: "COLLECT_INFO", channel: "facebook_profile" },
    { id: 6, name: "Phạm Minh Thư", phone: "0922334455", lastMessage: "Cần mua sỉ số lượng lớn", time: "Hôm qua", unread: 0, status: "NORMAL", channel: "shopee" },
    { id: 7, name: "Trần Ngọc Lân", phone: "0944556688", lastMessage: "Admin duyệt bài hộ em", time: "3 ngày trước", unread: 0, status: "NORMAL", channel: "facebook_group" },
  ];

  const chatHistory = [
    { sender: 'bot', text: 'Chào anh! Em là trợ lý AI. Em có thể giúp gì cho anh hôm nay?' },
    { sender: 'user', text: 'Cho mình xin giá sản phẩm này nhé' },
    { sender: 'bot', text: 'Dạ sản phẩm này hiện đang có giá ưu đãi là 599.000đ. Anh vui lòng cho em xin số điện thoại để em tư vấn kỹ hơn nhé.' }
  ];

  const filteredCustomers = selectedChannel === "all" 
    ? customers 
    : customers.filter(c => c.channel === selectedChannel);

  const getChannelBadge = (ch: string) => {
    const found = channels.find(c => c.id === ch);
    return found ? `${found.icon} ${found.name}` : "";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-3"><Users className="text-cyan-400" size={32} /> Quản Lý CRM & Live Chat</h2>
        <p className="text-gray-400 mt-2">Theo dõi data khách hàng tách biệt rõ ràng theo từng kênh kết nối để tránh chồng chéo.</p>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left: Customer List */}
        <div className="w-1/3 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-white/5">
            <h3 className="font-bold flex items-center gap-2 mb-3"><Database size={18} className="text-emerald-400"/> Data Khách Hàng</h3>
            
            {/* Connection Channel Selector */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {channels.map(ch => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setSelectedChannel(ch.id);
                    setSelectedChat(null);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium whitespace-nowrap transition-all ${selectedChannel === ch.id ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.3)] font-bold' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                >
                  <span>{ch.icon}</span>
                  <span>{ch.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(c => (
                <div 
                  key={c.id} 
                  onClick={() => setSelectedChat(c)}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${selectedChat?.id === c.id ? 'bg-cyan-900/30 border border-cyan-500/30' : 'bg-black/40 border border-white/5 hover:bg-white/5'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <h4 className="font-bold text-sm text-white">{c.name}</h4>
                      <span className="text-[10px] text-cyan-400 mt-0.5">{getChannelBadge(c.channel)}</span>
                    </div>
                    <span className="text-xs text-gray-500">{c.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate mb-2">{c.lastMessage}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-cyan-300">{c.status}</span>
                    {c.unread > 0 && <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold">{c.unread}</span>}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500 text-xs">
                Không có khách hàng nào từ kênh này
              </div>
            )}
          </div>
        </div>

        {/* Right: Chat Window */}
        <div className="flex-1 bg-[#0a0a0a] border border-white/5 rounded-2xl flex flex-col overflow-hidden relative">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold">
                    {selectedChat.name[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{selectedChat.name}</h3>
                    <p className="text-xs text-gray-400 flex items-center gap-1.5">
                      <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] text-cyan-300">{getChannelBadge(selectedChat.channel)}</span>
                      <Phone size={10}/> {selectedChat.phone}
                    </p>
                  </div>
                </div>
                
                {/* Bot Toggle Button */}
                <button 
                  onClick={() => setBotActive(!botActive)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${botActive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}
                >
                  {botActive ? <><Bot size={16}/> Bot Đang Chat</> : <><User size={16}/> Admin Trực Tiếp</>}
                  {botActive ? <Power size={16}/> : <PowerOff size={16}/>}
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/40">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-white/10 rounded-tl-sm' : 'bg-cyan-600 rounded-tr-sm'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {!botActive && (
                  <div className="flex justify-center">
                    <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">Bot đã tạm dừng. Bạn đang chat trực tiếp.</span>
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-white/5 bg-black/80 flex gap-3">
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={e => setChatMessage(e.target.value)}
                  placeholder={botActive ? "Đang ở chế độ Bot trả lời tự động..." : "Nhập tin nhắn để gửi cho khách..."}
                  disabled={botActive}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none disabled:opacity-50"
                />
                <button 
                  disabled={botActive || !chatMessage}
                  className="bg-cyan-600 w-12 rounded-xl flex items-center justify-center hover:bg-cyan-500 disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare size={48} className="mb-4 opacity-50"/>
              <p>Chọn một đoạn chat để xem chi tiết</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
