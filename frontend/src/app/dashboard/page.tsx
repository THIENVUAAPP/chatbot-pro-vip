"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, Users, CreditCard, Play, Database, 
  Send, Phone, Bot, User, Power, PowerOff, Plus, Bell
} from "lucide-react";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const [stats, setStats] = useState({ total_messages: 1420, customers: 384, orders_closed: 89, conversion_rate: "23.1%" });
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [botActive, setBotActive] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelType, setNewChannelType] = useState("website");

  const [channels, setChannels] = useState([
    { id: "all", name: "Tất cả", icon: "🌐" },
    { id: "facebook_profile", name: "FB Cá Nhân", icon: "👤" },
    { id: "facebook_page", name: "Fanpage", icon: "📄" },
    { id: "facebook_group", name: "FB Nhóm", icon: "👥" },
    { id: "tiktok", name: "TikTok Shop", icon: "🎵" },
    { id: "shopee", name: "Shopee Store", icon: "🛍️" },
    { id: "website", name: "Website", icon: "💻" },
    { id: "telegram", name: "Telegram Bot", icon: "🤖" }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: "Nguyễn Văn Anh", phone: "0901234567", lastMessage: "Cho mình xin giá nhé", time: "10:30", unread: 2, status: "COLLECT_INFO", channel: "facebook_page" },
    { id: 2, name: "Trần Thị Bé", phone: "0987654321", lastMessage: "Đã đặt lịch hẹn 14h chiều", time: "09:15", unread: 0, status: "BOOKING_APPOINTMENT", channel: "facebook_page" },
    { id: 3, name: "Khách Vãng Lai", phone: "Chưa có", lastMessage: "Sản phẩm này có màu đỏ không?", time: "Hôm qua", unread: 0, status: "NORMAL", channel: "website" },
    { id: 4, name: "Lê Văn Cường", phone: "0911223344", lastMessage: "Cho gặp nhân viên thật đi", time: "Hôm qua", unread: 1, status: "SOS_HANDOFF", channel: "tiktok" },
    { id: 5, name: "Nguyễn Hoàng Nam", phone: "0934556677", lastMessage: "Shop tư vấn giúp mình với", time: "11:20", unread: 0, status: "COLLECT_INFO", channel: "facebook_profile" },
    { id: 6, name: "Phạm Minh Thư", phone: "0922334455", lastMessage: "Cần mua sỉ số lượng lớn", time: "Hôm qua", unread: 0, status: "NORMAL", channel: "shopee" },
    { id: 7, name: "Trần Ngọc Lân", phone: "0944556688", lastMessage: "Admin duyệt bài hộ em", time: "3 ngày trước", unread: 0, status: "NORMAL", channel: "facebook_group" },
  ]);

  const chatHistory = [
    { sender: 'bot', text: 'Chào anh! Em là trợ lý AI. Em có thể giúp gì cho anh hôm nay?' },
    { sender: 'user', text: 'Cho mình xin giá sản phẩm này nhé' },
    { sender: 'bot', text: 'Dạ sản phẩm này hiện đang có giá ưu đãi là 599.000đ. Anh vui lòng cho em xin số điện thoại để em tư vấn kỹ hơn nhé.' }
  ];

  // Oscillator Beep for Notifications
  const playNotificationSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880.00, ctx.currentTime + 0.1); // A5
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (err) {
      console.error("Audio context error:", err);
    }
  };

  // Simulating incoming message notification
  useEffect(() => {
    const timer = setInterval(() => {
      const names = ["Lê Hoàng", "Phạm Bích", "Vũ Cường", "Đỗ Lan"];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomChannel = channels[Math.floor(Math.random() * (channels.length - 1)) + 1];
      const randomMsg = "Có tin nhắn mới từ khách hàng " + randomName + " trên kênh " + randomChannel.name;
      
      // Update customer unread count in state
      setCustomers(prev => prev.map(c => {
        if (c.channel === randomChannel.id) {
          return { ...c, unread: c.unread + 1, lastMessage: "Tin nhắn mới nhận..." };
        }
        return c;
      }));

      playNotificationSound();
      setNotifications(prev => [randomMsg, ...prev].slice(0, 3));
    }, 15000); // Trigger message simulation every 15s

    return () => clearInterval(timer);
  }, [channels]);

  const filteredCustomers = selectedChannel === "all" 
    ? customers 
    : customers.filter(c => c.channel === selectedChannel);

  const getChannelBadge = (ch: string) => {
    const found = channels.find(c => c.id === ch);
    return found ? `${found.icon} ${found.name}` : "";
  };

  const handleAddChannel = () => {
    if(!newChannelName) return;
    const newId = "custom_" + Date.now();
    const iconsMap: any = {
      facebook_profile: "👤",
      facebook_page: "📄",
      facebook_group: "👥",
      tiktok: "🎵",
      shopee: "🛍️",
      website: "💻",
      telegram: "🤖"
    };
    const newCh = {
      id: newId,
      name: newChannelName,
      icon: iconsMap[newChannelType] || "🌐"
    };
    setChannels([...channels, newCh]);
    setNewChannelName("");
    setShowAddChannelModal(false);
    alert("Đã kết nối thành công nền tảng: " + newChannelName);
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Top Notification Toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none max-w-sm">
        <AnimatePresence>
          {notifications.map((notif, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: 50, scale: 0.9 }} 
              animate={{ opacity: 1, x: 0, scale: 1 }} 
              exit={{ opacity: 0, x: 50, scale: 0.9 }} 
              className="bg-indigo-600/90 border border-indigo-400 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-3 pointer-events-auto"
            >
              <Bell className="w-5 h-5 text-yellow-300 animate-bounce" />
              <p className="text-sm font-medium leading-tight">{notif}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">Tổng Quan Hệ Thống</h1>
          <p className="text-gray-400 mt-2">Theo dõi thống kê kinh doanh và nhận tin nhắn đa kênh thời gian thực.</p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Tổng tin nhắn" value={stats.total_messages.toLocaleString()} icon={<MessageSquare className="text-blue-400" />} />
        <StatCard title="Khách hàng" value={stats.customers.toLocaleString()} icon={<Users className="text-cyan-400" />} />
        <StatCard title="Đơn chốt thành công" value={stats.orders_closed.toLocaleString()} icon={<CreditCard className="text-emerald-400" />} />
        <StatCard title="Tỷ lệ chuyển đổi" value={stats.conversion_rate} icon={<Play className="text-purple-400" />} />
      </div>

      {/* CRM Inbox section */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 flex flex-col h-[calc(100vh-22rem)] overflow-hidden">
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Left: Customer List */}
          <div className="w-1/3 border-r border-white/5 flex flex-col overflow-hidden pr-6">
            <div className="pb-4">
              <h3 className="font-bold text-lg flex items-center gap-2 mb-3">
                <Database size={20} className="text-emerald-400"/> Hộp Thư Đa Kênh
              </h3>
              
              {/* Horizontal Channels selection */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                {channels.map(ch => (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setSelectedChannel(ch.id);
                      setSelectedChat(null);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${selectedChannel === ch.id ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span>{ch.icon}</span>
                    <span>{ch.name}</span>
                  </button>
                ))}
                
                {/* Connect Platform Add Button */}
                <button 
                  onClick={() => setShowAddChannelModal(true)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all border border-dashed border-white/10 shrink-0"
                  title="Thêm nền tảng"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 no-scrollbar">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(c => (
                  <div 
                    key={c.id} 
                    onClick={() => setSelectedChat(c)}
                    className={`p-4 rounded-2xl cursor-pointer transition-all ${selectedChat?.id === c.id ? 'bg-blue-900/20 border border-blue-500/30' : 'bg-black/40 border border-white/5 hover:bg-white/5'}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex flex-col">
                        <h4 className="font-bold text-sm text-white">{c.name}</h4>
                        <span className="text-[10px] text-cyan-400 mt-0.5">{getChannelBadge(c.channel)}</span>
                      </div>
                      <span className="text-xs text-gray-500">{c.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate mt-1.5">{c.lastMessage}</p>
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5">
                      <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-gray-300">{c.status}</span>
                      {c.unread > 0 && <span className="px-1.5 py-0.5 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white">{c.unread} Tin Mới</span>}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-20 text-gray-500 text-xs">
                  Không có tin nhắn nào từ kênh này
                </div>
              )}
            </div>
          </div>

          {/* Right: Chat Window */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-bold">
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
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-black/40 rounded-2xl my-4 no-scrollbar">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                      <div className={`max-w-[70%] p-3.5 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-white/10 rounded-tl-sm' : 'bg-blue-600 rounded-tr-sm'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {!botActive && (
                    <div className="flex justify-center">
                      <span className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded-full border border-red-500/30">Bot đã tạm dừng. Bạn đang chat trực tiếp.</span>
                    </div>
                  )}
                </div>

                {/* Chat Input */}
                <div className="p-4 border border-white/5 rounded-2xl bg-black/80 flex gap-3">
                  <input 
                    type="text" 
                    value={chatMessage}
                    onChange={e => setChatMessage(e.target.value)}
                    placeholder={botActive ? "Đang ở chế độ Bot trả lời tự động..." : "Nhập tin nhắn để gửi cho khách..."}
                    disabled={botActive}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none disabled:opacity-50"
                  />
                  <button 
                    disabled={botActive || !chatMessage}
                    className="bg-blue-600 w-12 rounded-xl flex items-center justify-center hover:bg-blue-500 disabled:opacity-50 transition-colors"
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
      </div>

      {/* Add Connection Platform Modal */}
      <AnimatePresence>
        {showAddChannelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-6 space-y-4"
            >
              <h3 className="text-xl font-bold text-white">Kết Nối Đa Nền Tảng</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Loại Kênh Kết Nối</label>
                <select 
                  value={newChannelType} 
                  onChange={e => setNewChannelType(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blue-500 outline-none"
                >
                  <option value="facebook_profile">Facebook Cá Nhân</option>
                  <option value="facebook_page">Facebook Fanpage</option>
                  <option value="facebook_group">Facebook Group</option>
                  <option value="tiktok">TikTok Shop</option>
                  <option value="shopee">Shopee Store</option>
                  <option value="website">Website Livechat</option>
                  <option value="telegram">Telegram Bot</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-2">Tên Kết Nối / Thương Hiệu</label>
                <input 
                  value={newChannelName} 
                  onChange={e => setNewChannelName(e.target.value)}
                  type="text" 
                  placeholder="Ví dụ: Fanpage Trà Sữa Shop..." 
                  className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm text-white focus:border-blue-500 outline-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowAddChannelModal(false)}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Hủy
                </button>
                <button 
                  onClick={handleAddChannel}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  Kết Nối Ngay
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl flex justify-between items-center relative overflow-hidden group hover:border-white/10 transition-colors">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-extrabold text-white mt-2">{value}</h3>
      </div>
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
    </div>
  );
}
